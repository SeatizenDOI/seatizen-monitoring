#!/usr/bin/env bash
set -e

# Load .env file
export $(grep -v '^#' .env | xargs)

# Now you can use $DB_NAME, $DB_USER, etc.
echo "Database name is $DB_NAME"

mkdir -p "$(dirname "$GPKG_PATH")"

REDIRECT=$(curl -s https://zenodo.org/api/records/11125847)

NEW_ID=$(echo "$REDIRECT" | grep -oP '(?<=>/api/records/)\d+')

echo "🔹 Downloading new geopackage from ${NEW_ID}..."

curl -L -o $GPKG_PATH "https://zenodo.org/records/${NEW_ID}/files/seatizen_atlas_db.gpkg?download=1"

# === POSTGRES SUPERUSER ===


# === DROP EXISTING CONNECTIONS ===
echo "🔹 Terminating connections to $DB_NAME..."
sudo -i -u $PG_SUPERUSER psql -d postgres -c \
"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='$DB_NAME';"

# === DROP DATABASE & USER IF EXISTS ===
echo "🔹 Dropping old database and user if they exist..."
sudo -i -u $PG_SUPERUSER psql -c "DROP DATABASE IF EXISTS $DB_NAME;"
sudo -i -u $PG_SUPERUSER psql -c "DROP USER IF EXISTS $DB_USER;"

# === CREATE USER AND DATABASE ===
echo "🔹 Creating user $DB_USER and database $DB_NAME..."
sudo -i -u $PG_SUPERUSER psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
sudo -i -u $PG_SUPERUSER psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

# === ENABLE POSTGIS ===
echo "🔹 Enabling PostGIS on $DB_NAME..."
sudo -i -u $PG_SUPERUSER psql -d $DB_NAME -c "CREATE EXTENSION postgis;"

# === IMPORT GPKG INTO POSTGIS ===
echo "🔹 Import deposit..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} deposit -lco GEOMETRY_NAME=footprint -lco FID=gid -lco LAUNDER=NO -overwrite
echo "🔹 Import deposit_linestring..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} deposit_linestring -lco GEOMETRY_NAME=footprint_linestring -lco FID=id -lco LAUNDER=NO -overwrite
echo "🔹 Import frame..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} frame -lco GEOMETRY_NAME=GPSPosition -lco FID=id -lco LAUNDER=NO -overwrite
echo "🔹 Import version..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} version -lco FID=gid -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_annotation..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_annotation -lco FID=id -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_annotation_session..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_annotation_session -lco FID=id -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_class..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_class -lco FID=id -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_label..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_label -lco FID=id -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_model..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_model -lco FID=id -lco LAUNDER=NO -overwrite
echo "🔹 Import multilabel_prediction..."
ogr2ogr -f "PostgreSQL" PG:"dbname=${DB_NAME} user=${DB_USER} password=${DB_PASS}" ${GPKG_PATH} multilabel_prediction -lco FID=id -lco LAUNDER=NO -overwrite

echo "🔹 Add all constraints and index..."
psql -U ${DB_USER} -d ${DB_NAME} <<EOF

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

ALTER TABLE deposit ALTER COLUMN session_date TYPE DATE USING session_date::date;

EOF

