# SeatizenMonitoring

**SeatizenAtlas** is an open-access platform to explore, visualize, and download **georeferenced marine data** collected by several acquisition platforms such as autonomous surface vehicles (ASVs), drones, and SCUBA divers.  

With more than **300 sessions**, over **2 million images**, and **12 TB of data**, SeatizenAtlas offers one of the most complete resources for lagoon mapping, bathymetry, and ecological monitoring in the Indian Ocean.  

You can **filter sessions**, **compare maps side-by-side**, and even **download metadata, images, and AI predictions** to use in tools like **QGIS** or your own analysis.

---

## What is a Session?

A **session** corresponds to a single data collection mission.  
We start the platform (ASV, drone, diver), upload a predefined survey plan, let it execute the mission, and stop once it returns to the starting point.  

This allows for **consistent, repeatable acquisitions** across time and space, which is essential for long-term ecological monitoring.  
All sessions are stored in a **unified directory structure**, regardless of how the data was collected, and archived on **Zenodo** for open access.

---

## What Data is Available?

SeatizenAtlas provides both **raw** and **processed** data:

- **Raw data** – direct output from acquisition platforms.  
  (Some ASV and citizen science data are not public to protect privacy — for example, beachgoers may appear in GoPro images.)
- **Processed data**, including:
  - **Photogrammetry**
  - **Georeferenced images** (centimeter precision using PPK)
  - **Bathymetric rasters**
  - **Metadata CSV files**
  - **AI prediction rasters** (e.g. habitat classification, coral detection)

All processed data are stored in a **GeoPackage database** (SQLite with spatial capabilities) and published on **Zenodo**.  
For more details, see our reference paper: *SeatizenAtlas Nature*.

---

## Explore the Data

- **Database Viewer**: browse all sessions, filter by acquisition platform, date, or geographic extent. Export metadata, predictions, and model classes for further analysis.
- **Map Explorer**: visualize ASV and drone orthophotos, overlay prediction rasters, click to see predicted habitat labels or bathymetry values, and compare two areas side-by-side.
- **ASV Explorer**: view ASV predictions by label and date.
- **GCRMN & eDNA Points**: locate long-term monitoring sites (GCRMN) and eDNA sampling points with protocol details and results.

This makes it easy to understand **where**, **when**, and **what** has been observed — from a single dive to a large-scale lagoon mapping campaign.

---

## Artificial Intelligence

AI models are trained to help scale up analysis:

1. **Multilabel Image Classification**
   - 14,492 ASV & SCUBA images manually annotated using FiftyOne
   - Fine-tuned **DINOv2 Transformers** for multilabel predictions

2. **Drone Data**
   - Used ASV predictions as *pseudo-labels* for drone orthophotos
   - **Multilabel classification**: [Publication](https://doi.org/10.1016/j.ecoinf.2025.103149)
   - **Weakly supervised semantic segmentation** to generate habitat maps: [arXiv link](http://dx.doi.org/10.48550/arXiv.2508.18958)

This approach allows us to combine the **precision of ASV surveys** with the **coverage of drones**, producing detailed ecological maps at scale.

---

## Project Background

### SEATIZEN (2020–2022)
Development of a **citizen science underwater device** combining a GoPro and GPS.  
Goal: make lagoon monitoring accessible to the public.  
[Learn more](https://ocean-indien.ifremer.fr/Projets/Innovations-technologiques/SEATIZEN-2020-2022)

### PLANCHA (2021–2023)
Development of an **instrumented autonomous surface vehicle (ASV)** with:
- Differential GPS (centimeter accuracy)
- Autopilot & twin motors
- Single-beam echosounder
- GoPro camera

This platform maps ~3,000 m² in 1 hour, capturing GoPro images down to 10 m depth and bathymetry up to 100 m depth.  
Drone flights are performed simultaneously for comparison.  
[Learn more](https://ocean-indien.ifremer.fr/en/Projects/Technological-innovations/PLANCHA-2021-2023)

### PPUMPIT
Development of a **DNA-sampling catamaran**:
- Blue Robotics catamaran base
- Smith-Root DNA pump
- Remotely controlled from shore or boat
- Collects 18 L water samples filtered through DNA-specific membranes
- Supports multiple replicates per trip

---

## Key Concepts

- **Raster**: [What is a raster?](https://naturagis.fr/cartographie-sig/difference-vecteur-raster/)
- **Prediction**: AI model output
- **Multilabel classification**: List of all labels present in an image
- **Semantic segmentation**: A label for every pixel
- **Acquisition platform**: Device used to collect data (ASV, UAV, SCUBA...)

---
