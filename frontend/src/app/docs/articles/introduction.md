# Introduction

Bienvenue dans le monde de Seatizen monitoring

Basée dans l'océan indien sur l'ile de la réunion, nous sommes une petite équipe de recherche avec plusieurs entreprise (IFREMER, CNRS, IRD, COOOL).

Notre est but est d'oeuvrer à la préservation des récifs coralliens en mettant des outils de monitoring à la disposition des décideurs.


Notre démarche se découpe en plusieurs parties :

* Méthodes d'acquisition de données.
* Création et extraction de métadonnées.
* Stockage de la donnée.
* Création d'outils d'intelligence artificielle pour aider à monitorer les environnements marins.
* Médiation scientifique.


## Méthodes d'acquisition scientifique

<!-- Intro -->
La surveillance des écosystèmes marins dans les lagons nécessite des méthodes précises, peu couteuses et reproductibles.

<!-- Existant -->
Il existe actuellement un suivi annuel appelé le GCRMN ou des plongeurs suivent un protocole. 

C'est une méthode couteuse en temps et peu représentative car le splongeurs ne couvrent pas tout le lagon.

<!-- Première méthode -->
Dans le cadre du projet plancha, nous avons développé une planche autonome aka un ASV (Autonomous surface vehicle) qui est motorisé et embarque un autopilot avec un gps différentiel. Nous l'avons équipé d'un échosondeur et d'une caméra pour filmer les fonds marins. celle-ci va effectuer des transects dans une zone prédéfini à une vitesse de 1m/s. Elle va couvrir une zone d'environ 3000 m2 en heure avec un espacement inter transect d'un mètre et en quadrillage. 

<!-- TODO Ajouter une image de mission planner. -->

[Planche présentation](https://www.youtube.com/watch?v=kM8BlmeyVmg)

<!-- Deuxième méthode -->
Une autre façon de monitorer les fonds marins est d'utiliser la force de la science citoyenne. En effet, il existe un certain nombre de personnes qui réalise des sorties hebdomdaire de scuba diving dans la lagon. Nous avons créer un dispositif composé d'un gps différentiel et d'une caméra pour équiper des volontaires et on récupre leur donnée de plongée. L'avantage de ce dispositif est qu'il peut déployer sur une planche de surf, un kayak, un paddle ou bien une planche de kitesurf. Tous les usagers de la mer peuvent participer à la collecte de données.

<!-- TODO Ajouter une image du masque. -->


<!-- Troisième méthode -->
Afin de monitorer à une échelle plus grande, nous effetuons aussi un survol en drone aka UAV (Unmaned Aerial Vehicle) des zones. La zone couverte est beaucoup plus importante sur le même temps malgré que nous manquons quelques informations nécessaire (tout ce qui est caché par les coraux ne sera pas interprété)



<!-- Introduction d'une session -->
Dans ce contexte d'acquisition de données de sources multiples, nous avons réfléchi à une façon de rassembler, mettre en commun et stocké cette donnée dans un référentiel commun. Chaque sortie d'un des systèmes d'acquisitions est appelé une **Session**. Cela correspond au moment ou on allume la caméra sur la plage jusquau moment ou la caméra revient sur la plage et est eteinte.

Toutes les données extraites juste après la session est appelé données brutes et on obtient ce type de donnée suivent la méthode d'acquisition :

- ASV : Vidéo MP4 en 4K 24 FPS, Donnée GPS et Fichier de l'autopilot (IMU + Bathymétry)  
- UAV : Image géoréférencé + IMU 
- Scuba diving : Image ou Vidéo plus GPS.

Toutes ces données sont stocké dans une architecture définit comme ceci :

```
YYYYMMDD_COUNTRYCODE-optionalplace_device_session-number 
├── DCIM :  folder to store videos and photos depending on the media collected. 
├── GPS :  folder to store any positioning related file. If any kind of correction is possible on files (e.g. Post-Processed Kinematic thanks to rinex data) then the distinction between device data and base data is made. If, on the other hand, only device position data are present and the files cannot be corrected by post-processing techniques (e.g. gpx files), then the distinction between base and device is not made and the files are placed directly at the root of the GPS folder. 
│   ├── BASE :  files coming from rtk station or any static positioning instrument. 
│   └── DEVICE : files coming from the device. 
├── METADATA : folder with general information files about the session. 
├── PROCESSED_DATA : contain all the folders needed to store the results of the data processing of the current session. 
│   ├── BATHY :  output folder for bathymetry raw data extracted from mission logs. 
│   ├── FRAMES :  output folder for georeferenced frames extracted from DCIM videos. 
│   ├── IA :  destination folder for image recognition predictions. 
│   └── PHOTOGRAMMETRY :  destination folder for reconstructed models in photogrammetry. 
└── SENSORS : folder to store files coming from other sources (bathymetry data from the echosounder, log file from the autopilot,  mission plan etc.).      
```

```
YYYYMMDD_COUNTRYCODE-optionalplace_device_session-number 
├── DCIM : dossier destiné à stocker les vidéos et les photos selon le type de média collecté.
├── GPS :  dossier destiné à stocker tout fichier lié au positionnement. Si une correction des fichiers est possible (par exemple en mode cinématique post-traité grâce aux données RINEX), alors une distinction est faite entre les données de l’appareil et celles de la station de base. En revanche, si seules les données de position de l’appareil sont présentes et qu’aucune correction par post-traitement n’est possible (par exemple des fichiers GPX), alors la distinction entre base et appareil n’est pas faite et les fichiers sont placés directement à la racine du dossier GPS.
│   ├── BASE :  fichiers provenant d’une station RTK ou de tout instrument de positionnement statique.
│   └── DEVICE : fichiers provenant de l’appareil.
├── METADATA : dossier contenant les fichiers d’informations générales sur la session.
├── PROCESSED_DATA : contient tous les dossiers nécessaires pour stocker les résultats du traitement des données de la session en cours.
│   ├── BATHY : dossier de sortie pour les données brutes de bathymétrie extraites des journaux de mission.
│   ├── FRAMES : dossier de sortie pour les images géoréférencées extraites des vidéos du dossier DCIM. 
│   ├── IA :  destination folder for image recognition predictions. 
│   └── PHOTOGRAMMETRY : dossier de destination pour les modèles reconstruits en photogrammétrie.
└── SENSORS : dossier destiné à stocker les fichiers provenant d’autres sources (données bathymétriques issues de l’échosondeur, fichier journal du pilote automatique, plan de mission, etc.).      
```

Exemple : `20231110_REU-ST-LEU_ASV-1_01`, `20211201_REU-TROU-DEAU_SCUBA-1_01`, `20250210_REU-BOUCAN-CANOT_UAV-1_01`

## Création et extraction de métadonnées.

Pour mieux interpréter les données brutes, nous avons crée un workflow qui extrait des métadonnées des données brutes. Par exemple, avec les données de la planche, nous allons découper les vidéos en images puis géoréférence les images avec une précision centimétriques. POur cela, nous utilisons les données d'une base RTK connecté au réseau centipède ou bien les données RGP de l'IGN et on applique la technique du post-processing kinematics (PPK) pour recaler nos points GPS. Ensuite, nous synchronisons nos données temporellements. 

## Stockage de la donnée.
## Création d'outils d'intelligence artificielle pour aider à monitorer les environnements marins.



## Médiation scientifique.

On prends par à des événements tels que l'office


