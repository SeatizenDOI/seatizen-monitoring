#!/bin/bash
set -e

echo "🔹 DB_USER=$DB_USER DB_NAME=$DB_NAME GPKG_PATH=$GPKG_PATH"

# Now you can use $DB_NAME, $DB_USER, etc.
echo "Database name is $DB_NAME"

mkdir -p "$(dirname "$GPKG_PATH")"

if [ ! -f $GPKG_PATH ]; then

    REDIRECT=$(curl -s https://zenodo.org/api/records/11125847)

    NEW_ID=$(echo "$REDIRECT" | grep -oP '(?<=>/api/records/)\d+')

    echo "🔹 Downloading new geopackage from ${NEW_ID}..."

    curl --no-buffer --progress-bar -L -o $GPKG_PATH "https://zenodo.org/records/${NEW_ID}/files/seatizen_atlas_db.gpkg?download=1" 2>&1
fi


# === POSTGRES SUPERUSER ===
export PGPASSWORD=$POSTGRES_PASSWORD
# Wait for DB to be ready
until psql -h $DB_HOST -p $DB_PORT -U $PG_SUPERUSER -d postgres -c '\q'; do
  echo "Waiting for Postgres..."
  sleep 2
done

# === DROP EXISTING CONNECTIONS ===
echo "🔹 Terminating connections to $DB_NAME..."
psql -h $DB_HOST -p $DB_PORT -U $PG_SUPERUSER -d postgres -c \
"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='$DB_NAME';"

# === DROP DATABASE & USER IF EXISTS ===
echo "🔹 Dropping old database and user if they exist..."
psql -h $DB_HOST -p $DB_PORT -U $PG_SUPERUSER -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
psql -h $DB_HOST -p $DB_PORT -U $PG_SUPERUSER -d postgres -c "DROP USER IF EXISTS $DB_USER;"

# === CREATE USER AND DATABASE ===
echo "🔹 Creating user $DB_USER and database $DB_NAME..."
psql -h $DB_HOST -p $DB_PORT -U $PG_SUPERUSER -d postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
psql -h $DB_HOST -p $DB_PORT -U $PG_SUPERUSER -d postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

# === ENABLE POSTGIS ===
echo "🔹 Enabling PostGIS on $DB_NAME..."
psql -h $DB_HOST -p $DB_PORT -U $PG_SUPERUSER -d $DB_NAME -c "CREATE EXTENSION postgis;"

echo "🔹 Import deposit..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} deposit -lco GEOMETRY_NAME=footprint -lco FID=gid -lco LAUNDER=NO -overwrite
echo "🔹 Import deposit_linestring..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} deposit_linestring -lco GEOMETRY_NAME=footprint_linestring -preserve_fid -lco LAUNDER=NO -overwrite
echo "🔹 Import frame..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} frame -lco GEOMETRY_NAME=GPSPosition -preserve_fid -lco LAUNDER=NO -overwrite
echo "🔹 Import version..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} version -lco FID=gid -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_annotation..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_annotation -preserve_fid -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_annotation_session..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_annotation_session -preserve_fid -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_class..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_class -preserve_fid -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_label..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_label -preserve_fid -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_model..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_model -preserve_fid -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_prediction..."
ogr2ogr -f "PostgreSQL" PG:"host=$DB_HOST port=$DB_PORT dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_prediction -preserve_fid -lco LAUNDER=NO -overwrite

export PGPASSWORD=$DB_PASS
echo "🔹 Add all constraints and index..."
psql -h $DB_HOST -p $DB_PORT -U ${DB_USER} -d ${DB_NAME} <<EOF

ALTER TABLE deposit DROP CONSTRAINT deposit_pkey;
ALTER TABLE deposit ADD PRIMARY KEY (doi);
ALTER TABLE version DROP CONSTRAINT version_pkey;
ALTER TABLE version ADD PRIMARY KEY (doi);


CREATE INDEX idx_deposit_geom ON deposit USING GIST (footprint);
CREATE INDEX idx_deposit_linestring_geom ON deposit_linestring USING GIST (footprint_linestring);
CREATE INDEX idx_frame_geom ON frame USING GIST ("GPSPosition");


ALTER TABLE deposit_linestring ADD CONSTRAINT fk_deposit_deposit_linestring FOREIGN KEY (deposit_doi) REFERENCES deposit(doi);

ALTER TABLE version ADD CONSTRAINT fk_deposit_version FOREIGN KEY (deposit_doi) REFERENCES deposit(doi);

ALTER TABLE frame ADD CONSTRAINT fk_frame_version FOREIGN KEY (version_doi) REFERENCES version(doi);

ALTER TABLE multilabel_class ADD CONSTRAINT fk_ml_class_ml_label FOREIGN KEY (ml_label_id) REFERENCES multilabel_label(id);
ALTER TABLE multilabel_class ADD CONSTRAINT fk_ml_class_ml_model FOREIGN KEY (ml_model_id) REFERENCES multilabel_model(id);

ALTER TABLE multilabel_prediction ADD CONSTRAINT fk_ml_prediction_version FOREIGN KEY (version_doi) REFERENCES version(doi);
ALTER TABLE multilabel_prediction ADD CONSTRAINT fk_ml_prediction_frame FOREIGN KEY (frame_id) REFERENCES frame(id);
ALTER TABLE multilabel_prediction ADD CONSTRAINT fk_ml_prediction_ml_class FOREIGN KEY (ml_class_id) REFERENCES multilabel_class(id);

ALTER TABLE multilabel_annotation ADD CONSTRAINT fk_ml_annotation_frame FOREIGN KEY (frame_id) REFERENCES frame(id);
ALTER TABLE multilabel_annotation ADD CONSTRAINT fk_ml_annotation_ml_label FOREIGN KEY (ml_label_id) REFERENCES multilabel_label(id);
ALTER TABLE multilabel_annotation ADD CONSTRAINT fk_ml_annotation_ml_anno_session FOREIGN KEY (ml_annotation_session_id) REFERENCES multilabel_annotation_session(id);

CREATE INDEX IF NOT EXISTS idx_frame_id ON frame (id);
CREATE INDEX IF NOT EXISTS idx_filename_version_doi ON frame (filename, version_doi);
CREATE INDEX IF NOT EXISTS idx_multilabel_prediction_frame_id_version ON multilabel_prediction (frame_id, version_doi);

-- Add index on join
CREATE INDEX IF NOT EXISTS idx_frame_version_doi ON frame (version_doi);
CREATE INDEX IF NOT EXISTS idx_version_deposit_doi ON version (deposit_doi);

CREATE INDEX IF NOT EXISTS idx_deposit_session_date ON deposit (session_date);
CREATE INDEX IF NOT EXISTS idx_deposit_platform_date ON deposit (platform_type, session_date);

-- Index to speedup querying on ml_pred
CREATE INDEX IF NOT EXISTS idx_mlpred_frame_class ON multilabel_prediction (frame_id, ml_class_id);

ANALYZE multilabel_prediction;


ALTER TABLE deposit ALTER COLUMN session_date TYPE DATE USING session_date::date;

EOF

touch /tmp/data/READY