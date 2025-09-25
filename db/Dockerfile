FROM ghcr.io/osgeo/gdal:ubuntu-small-3.11.4

# Install system dependencies
RUN apt-get update && apt-get install -y postgresql-client curl wget && rm -rf /var/lib/apt/lists/*


# Copy your init script
COPY generate_database.sh /tmp/generate_database.sh
RUN chmod +x /tmp/generate_database.sh