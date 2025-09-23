# Un peu de vocabulaire

Une session correspond au déploiement de la planche ou bien d'une mission de drône ou à une sortie de masque. On allume l'appareil sur la plage, on lui rentre un plan de vol. Celui-ci l'exécute puis revient à son point de lancement. Une fois quil revient, la session est fini et on peut en commencer une suivante.

Les données sont stockés dans une arborescence uni agnostic au mode d'acquisition. Le but est de pouvoir stocker la donnée de la même façon.

Chaque session est stocké sur zenodo en séparant les données brutes (données récupéré en sortie d'acquisition sans traitement) et les données processée.

Pour les sessions de planches et d'acquistion citoyenne, les données brutes ne sont pas accessible pour des raisons du droit à l'image . En effet, on peut parfois apercevoir des promeneurs sur la plage.

Les données procéssé se présentent sous la forme suivante :
- Photogrammétrie
- Image géoréférencé (La plupart des images de planches sont géoréférencé au centimètre grâce à la technique du PPK)
- Raster de bathymétrie
- Fichier de métadonnées csv
- Rasters de prédictions IA


Un papier décrit ce mode de fonctionnement : SeatizenAtlas Nature.
La base de donnée est stocké au format geopackage (Sqlite + dimension géospatail) et sur la platforme Zenodo.

# Définition 

- un raster https://naturagis.fr/cartographie-sig/difference-vecteur-raster/

- prédiction : Résultat donnée par un modèle d'intelligence artificielle.

- classification multilabel: Sur une image, on donne tous les labels présent sans donnée leur position.
- segmentation semantique: On attribue un label à chaque pixel de l'image

- une platforme d'acquisitoin correspond au moyen déployé pour acquérir la donnée (ASV (planche), UAV (drone), SCUBA, ...) 


# Intelligence artificiel

* Annotation de 14492 images de planche / scuba diving avec l'outil fiftyone => classificaiton multilabel => Image sous marine
* Entrainement d'une IA : Dinov2 transformers. On fine tune le modèle pour faire des prédictions multilabels.

Précis mais : Couverture de la planche trop faible et couteux par rapport au drône.
Problème du drône : annotation difficile 
Solution : utilisation des prédictions de planches comme annotation pour le drone.

* Entrainement d'une IA tâche classification multilabel sur des tuiles d'orthophoto de drone avec l'annotation : prédiction de planche. (https://doi.org/10.1016/j.ecoinf.2025.103149)
* Entrainement d'une IA tâche segmentation semantic sur des tuiles d'orthophoto de drone avec l'annotation : prédiction de planche (weakly supervised semantic segmentation).
Les rasters de planche sont grossier mais comme on finetune et on refined, le modèle arrive à un résultat satisfaisant. (http://dx.doi.org/10.48550/arXiv.2508.18958)



# Histoire

Projet seatizen : https://ocean-indien.ifremer.fr/Projets/Innovations-technologiques/SEATIZEN-2020-2022

* développement d'un objet d'acquisition sous marin avec gopro + GPS

But : objet de science citoyenne pour le grand public


Projet plancha : https://ocean-indien.ifremer.fr/en/Projects/Technological-innovations/PLANCHA-2021-2023

* développement d'une planche instrumenté avec un GPS différentiel, autopilot, echosondeur monofaisceau, gopro, et 2 moteurs.
=> Planche autonome pour carthographier des lagons. Gopro visibilité jusqua 10m de fond. Bathy jusqua 100m.
On peut couvrir des zones d'environ 3000m² en environ 1H.

* On fait aussi des acquisions de drones sur la même plage temporelle que les acquisitions de planches.


Projet ppumpit : 

* développement d'un catamaran embarquant une pompe à adn avec une base de catamaran blue robotics et une pompe smith root.
La ompe est connecté à l'ordinateur du catamran et peut être piloté depuis la plage ou du bateau.
Le catamran va sur un point précis et va pomper 18 litres d'eau. L'eau pompé passe par 3 filtres ayant une membrane spécial retenant l'ADN.
Le catamaran peut emmener plusieurs triplicat de filtres en même temps.



# Donnée à disposition 

Ce site met à disposition plusieurs données :

* Exporter : visualisation de la base de données SeatizenAtlas. On peut voir toutes les sessions. On peut filtrer les sessions par platformes d'acquisition, date et par emprise spatiale. On peut exporter les métadonnées des images de l'emprise sélectionné ainsi que les prédictions et les classes du modèle choisi.
Cela permet de visualiser les données dans QGIS ou bien de voir les images associé


* Explorer : visualition des orthophotos de planche et de drone. visualisation des prédictions de drones (segmentation) label en cliquant sur le raster. Visualisation des rasters de bathymétrie. Profondeur en temps réel en cliquant dessus. La carte est divisé en deux parties et on peut comparer la sélection de gauche et la sélection de droite.




* ASV Explorer : visualisation des rasters de prédictions de planche par label et par date.


Points GCRMN correspondent aux points de suivi GCRMN à la réunion platier et pente externe. Ils sont la à titre indicatif.

Point eDNA : Prélèvement DNA  informations sur la position, le protocole et les résultats

# Stats

300 sessions
 2 000 000 d'images
 n images de panches
 n images de drones
 n images géoréférencé avec une précision centimtrique 

nombre de platformes d'acquisition


12Tb de données