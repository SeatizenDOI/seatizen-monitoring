FROM postgis/postgis:17-3.5

# Copy your init script
COPY generate_database.sh /docker-entrypoint-initdb.d/generate_database.sh
RUN chmod +x /docker-entrypoint-initdb.d/generate_database.sh