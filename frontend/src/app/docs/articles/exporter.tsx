import { LanguagesEnum } from "../page";
import React from "react";
import { Download, MapPin, Terminal, FileText, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ExporterFR() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-deepteal-50 to-ocean-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Introduction */}
                <section className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Vue d&apos;ensemble</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Ce tutoriel fournit des instructions détaillées sur l&apos;extraction d&apos;un sous-ensemble de
                        données du jeu de données SeatizenAtlas. Le processus implique la configuration de paramètres
                        spatiaux et temporels, la sélection de champs de métadonnées, et l&apos;utilisation
                        d&apos;outils automatisés pour récupérer les images correspondantes depuis les dépôts distants.
                    </p>
                </section>

                {/* Dataset Extraction Section */}
                <section className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-7 h-7 text-ocean-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            {`Processus d'extraction du sous-jeu de données`}
                        </h2>
                    </div>

                    <div className="mb-6">
                        <Image
                            width={1200}
                            height={1200}
                            src="/tutorials/exporter/exporter_explication.jpg"
                            alt="Explication de l'interface d'exportation"
                            className="w-full rounded-lg border border-gray-200 shadow-sm"
                        />
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        La page Explorer est organisée en trois composants principaux : la carte interactive, la section
                        Data configuration et la section Model configuration.
                    </p>

                    <div className="space-y-6">
                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        1
                                    </span>
                                </div>{" "}
                                Définition des limites spatiales
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Cet outil permet aux utilisateurs de délimiter des zones géographiques spécifiques sur
                                la carte. L&apos;opération d&apos;exportation inclura exclusivement les images situées
                                dans ces limites définies. Plusieurs zones peuvent être créées pour accommoder des
                                exigences spatiales complexes.
                            </p>
                            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-md p-3">
                                <p className="text-amber-800 text-sm font-medium">
                                    <strong>Important :</strong> Si aucune limite spatiale n&apos;est définie,
                                    l&apos;exportation traitera toutes les images affichées sur la carte, ce qui peut
                                    entraîner des temps de traitement prolongés (potentiellement plusieurs minutes).
                                </p>
                            </div>
                        </div>

                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        2
                                    </span>
                                </div>{" "}
                                Visualisation de la zone dessinée
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Cet exemple montre une zone d&apos;exportation définie englobant un regroupement de
                                quatre sessions de planches situées dans la région nord de Saint-Leu. La visualisation
                                fournit un retour immédiat sur l&apos;étendue spatiale de votre sélection de données.
                            </p>
                        </div>

                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        3
                                    </span>
                                </div>{" "}
                                Sélection de la plateforme
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Ce sélecteur permet aux utilisateurs de filtrer les données par plateforme
                                d&apos;acquisition. Plusieurs plateformes peuvent être sélectionnées simultanément,
                                chacune étant distinguée par un code couleur unique sur la carte. La carte se met à jour
                                dynamiquement pour afficher uniquement les données des plateformes sélectionnées.
                            </p>
                        </div>

                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        4
                                    </span>
                                </div>{" "}
                                Filtrage temporel
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Les utilisateurs peuvent affiner leur jeu de données en spécifiant une plage temporelle.
                                La carte affichera exclusivement les données collectées dans la période sélectionnée.
                            </p>
                        </div>

                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        5
                                    </span>
                                </div>{" "}
                                Sélection des champs de métadonnées
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Cette section permet la sélection des champs de métadonnées à inclure dans
                                l&apos;exportation. Pour une récupération réussie du jeu de données, deux champs doivent
                                être sélectionnés :
                            </p>
                            <ul className="mt-2 space-y-1 text-gray-700 ml-4">
                                <li className="flex items-start">
                                    <span className="text-ocean-600 mr-2">•</span>
                                    <span>
                                        <strong>version_doi :</strong> DOI pointant vers le dépôt Zenodo
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-ocean-600 mr-2">•</span>
                                    <span>
                                        <strong>relative_file_path :</strong> Spécifie le chemin de l&apos;image dans le
                                        répertoire de sa session
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Section Model configuration</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Bien que non requise pour l&apos;extraction de base du jeu de données, la section de
                            configuration du modèle fournit des fonctionnalités avancées pour les utilisateurs
                            travaillant avec des prédictions de classification :
                        </p>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex items-start gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        6
                                    </span>
                                </div>
                                <p>
                                    Sélection des modèles de classification multilabel (note : les plateformes drones ne
                                    fournissent pas de prédictions multilabel)
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        7
                                    </span>
                                </div>
                                <p>Spécification des classes à conserver de la sortie du modèle multilabel</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        8
                                    </span>
                                </div>
                                <p>
                                    Option pour exporter les scores de prédiction bruts ou les valeurs binaires
                                    présence/absence après application du seuil
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        9
                                    </span>
                                </div>
                                <p>
                                    Bouton d&apos;exportation pour générer et télécharger le fichier CSV contenant le
                                    jeu de données configuré
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
                        <p className="text-red-800 text-sm leading-relaxed">
                            <strong>Avertissement :</strong> Les prédictions présentées dans cette interface sont
                            produites par des algorithmes d&apos;intelligence artificielle et sont fournies à titre
                            informatif uniquement. Elles peuvent contenir des inexactitudes. L&apos;éditeur de
                            l&apos;application décline toute responsabilité quant à leur interprétation ou utilisation.
                        </p>
                    </div>
                </section>

                {/* Image Retrieval Section */}
                <section className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <ImageIcon className="w-7 h-7 text-ocean-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Processus de récupération des images</h2>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Structure de l&apos;export CSV</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        L&apos;opération d&apos;exportation génère un fichier CSV avec la structure suivante :
                    </p>

                    <div className="bg-background rounded-lg p-4 overflow-x-auto mb-6">
                        <pre className="text-sage-800 text-sm font-mono">
                            {`FileName,GPSLatitude,GPSLongitude,version_doi,relative_file_path
20231110_REU-ST-LEU_ASV-1_04_5_567.jpeg,-21.16281806626762,55.2865898413734,https://doi.org/10.5281/zenodo.12760339,20231110_REU-ST-LEU_ASV-1_04/PROCESSED_DATA/FRAMES/20231110_REU-ST-LEU_ASV-1_04_5_567.jpeg
20231110_REU-ST-LEU_ASV-1_04_5_990.jpeg,-21.16282476635246,55.28659116164465,https://doi.org/10.5281/zenodo.12760339,20231110_REU-ST-LEU_ASV-1_04/PROCESSED_DATA/FRAMES/20231110_REU-ST-LEU_ASV-1_04_5_990.jpeg
20231110_REU-ST-LEU_ASV-1_04_5_1409.jpeg,-21.162930832467936,55.28655471331759,https://doi.org/10.5281/zenodo.12760339,20231110_REU-ST-LEU_ASV-1_04/PROCESSED_DATA/FRAMES/20231110_REU-ST-LEU_ASV-1_04_5_1409.jpeg
...`}
                        </pre>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Récupération des images</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Il existe <strong>deux méthodes</strong> pour configurer l&apos;environnement nécessaire au
                        téléchargement des images depuis Zenodo :
                    </p>

                    <div className="border-t-4 border-ocean-600 bg-ocean-50 rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Terminal className="w-6 h-6 text-ocean-600" />
                            Méthode 1 : Utilisation d&apos;un environnement Python
                        </h4>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Vous pouvez suivre le guide d&apos;installation détaillé pour configurer un environnement
                            Python local :
                        </p>
                        <Link
                            href="https://github.com/SeatizenDOI/zenodo-tools/blob/master/README.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-800 font-semibold mb-4"
                        >
                            <FileText className="w-5 h-5" />
                            README du dépôt GitHub
                        </Link>

                        <p className="text-gray-700 font-semibold mb-2">Exécutez la commande :</p>
                        <div className="bg-background rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sage-800 text-sm font-mono whitespace-pre-wrap break-all">
                                {`python zenodo-download.py -ecf -pcf /chemin/vers/fichier/csv/fourni/par/seatizen/monitoring -po /chemin/ou/vous/voulez/votre/dossier/frames`}
                            </pre>
                        </div>
                    </div>

                    <div className="border-t-4 border-sage-600 bg-gradient-to-br from-sage-50 to-emerald-50 rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Download className="w-6 h-6 text-sage-600" />
                            Méthode 2 : Utilisation de Docker (Recommandé pour la simplicité)
                        </h4>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Si vous préférez éviter l&apos;installation manuelle des dépendances, vous pouvez utiliser{" "}
                            <strong>Docker Desktop</strong>.
                        </p>

                        <p className="text-gray-700 mb-3 leading-relaxed">
                            Une fois installé, exécutez simplement la commande suivante :
                        </p>

                        <div className="bg-background rounded-lg p-4 overflow-x-auto mb-4">
                            <pre className="text-sage-800 text-sm font-mono whitespace-pre-wrap break-all">
                                {`docker run -it --user 1000 --rm \\
  -v ./chemin/ou/vous/voulez/votre/dossier/frames:/home/seatizen/plancha \\
  -v ./chemin/dossier/ou/fichier/csv/fourni/par/seatizen/monitoring:/home/seatizen/app/csv_inputs \\
  --name zenodo-manager seatizendoi/zenodo-manager:latest bash`}
                            </pre>
                        </div>

                        <div className="bg-white border border-sage-200 rounded-lg p-4 mb-4">
                            <p className="text-gray-900 font-semibold mb-2">Cette commande :</p>
                            <ul className="text-gray-700 space-y-2 ml-4">
                                <li className="flex items-start">
                                    <span className="text-sage-600 mr-2">•</span>
                                    <span>
                                        Télécharge automatiquement l&apos;image Docker{" "}
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                            seatizendoi/zenodo-manager:latest
                                        </code>
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sage-600 mr-2">•</span>
                                    <span>
                                        Monte vos dossiers locaux (
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">plancha</code> et{" "}
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">csv_inputs</code>) à
                                        l&apos;intérieur du conteneur
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sage-600 mr-2">•</span>
                                    <span>Ouvre une session interactive prête à exécuter les scripts Zenodo Tools</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-gray-700 mb-3 leading-relaxed">
                            Une fois votre environnement prêt, exécutez la commande suivante{" "}
                            <strong>à l&apos;intérieur du conteneur</strong> :
                        </p>

                        <div className="bg-background rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sage-800 text-sm font-mono whitespace-pre-wrap break-all">
                                {`python zenodo-download.py -ecf -pcf /home/seatizen/app/csv_inputs/seatizen_monitoring.csv -po /home/seatizen/plancha`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Paramètres de la commande :</h4>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="font-mono text-ocean-600 mr-3">-ecf</span>
                                <span>Active le mode de traitement de fichier CSV</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-mono text-ocean-600 mr-3">-pcf</span>
                                <span>Chemin vers le fichier CSV exporté depuis SeatizenAtlas</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-mono text-ocean-600 mr-3">-po</span>
                                <span>
                                    Chemin vers le répertoire de sortie où les images téléchargées seront stockées
                                </span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Final Output Section */}
                <section className="bg-gradient-to-br from-sage-50 to-emerald-50 rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Résultat final</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">Vous disposez maintenant :</p>
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg p-5 border border-sage-200">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-sage-600" />
                                Du fichier CSV
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Généré par Seatizen Monitoring, que vous pouvez importer dans <strong>QGIS</strong> pour
                                visualiser la position exacte de chaque image.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-5 border border-sage-200">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-sage-600" />
                                D&apos;un dossier
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Situé à{" "}
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                    /chemin/ou/vous/voulez/votre/dossier/FRAMES
                                </code>{" "}
                                contenant toutes les images téléchargées.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-gray-600 text-sm">
                        Tutoriel Exportateur de données SeatizenAtlas · Pour le support technique, veuillez consulter le
                        dépôt GitHub
                    </p>
                </div>
            </div>
        </div>
    );
}

function ExporterEN() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-deepteal-50 to-ocean-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Introduction */}
                <section className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                    <p className="text-gray-700 leading-relaxed">
                        This comprehensive tutorial provides detailed instructions on extracting a subset of data from
                        the SeatizenAtlas dataset. The process involves configuring spatial and temporal parameters,
                        selecting metadata fields, and utilizing automated tools to retrieve the corresponding imagery
                        from remote repositories.
                    </p>
                </section>

                {/* Dataset Extraction Section */}
                <section className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-7 h-7 text-ocean-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Dataset Extraction Process</h2>
                    </div>

                    <div className="mb-6">
                        <Image
                            width={1200}
                            height={1200}
                            src="/tutorials/exporter/exporter_explication.jpg"
                            alt="Exporter explanation"
                            className="w-full rounded-lg border border-gray-200 shadow-sm"
                        />
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        The Explorer interface is organized into three primary components: the interactive map, the data
                        configuration section, and the model configuration section. Each component serves a specific
                        function in the data extraction workflow.
                    </p>

                    <div className="space-y-6">
                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        1
                                    </span>
                                </div>
                                Spatial Boundary Definition
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                This tool enables users to delineate specific geographic zones on the map. The export
                                operation will exclusively include images located within these defined boundaries.
                                Multiple zones can be created to accommodate complex spatial requirements.
                            </p>
                            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-md p-3">
                                <p className="text-amber-800 text-sm font-medium">
                                    <strong>Important:</strong> If no spatial boundaries are defined, the export will
                                    process all images displayed on the map, which may result in extended processing
                                    times (potentially several minutes).
                                </p>
                            </div>
                        </div>

                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        2
                                    </span>
                                </div>{" "}
                                Drawn Zone Visualization
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                This example demonstrates a defined export zone encompassing a cluster of four plankton
                                board sessions located in the northern region of Saint-Leu. The visualization provides
                                immediate feedback on the spatial extent of your data selection.
                            </p>
                        </div>

                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        3
                                    </span>
                                </div>{" "}
                                Platform Selection
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                This selector allows users to filter data by acquisition platform. Multiple platforms
                                can be selected simultaneously, each distinguished by a unique color code on the map.
                                The map dynamically updates to display only data from the selected platforms.
                            </p>
                        </div>

                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        4
                                    </span>
                                </div>{" "}
                                Temporal Filtering
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Users can refine their dataset by specifying a temporal range. The map will exclusively
                                display data collected within the selected time period.
                            </p>
                        </div>

                        <div className="border-l-4 border-ocean-600 pl-6 py-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex flex-row items-center justify-left gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        5
                                    </span>
                                </div>{" "}
                                Metadata Field Selection
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                This section enables selection of metadata fields to include in the export. For
                                successful dataset retrieval, two fields must be selected:
                            </p>
                            <ul className="mt-2 space-y-1 text-gray-700 ml-4">
                                <li className="flex items-start">
                                    <span className="text-ocean-600 mr-2">•</span>
                                    <span>
                                        <strong>version_doi:</strong> Doi pointing to the Zenodo deposit.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-ocean-600 mr-2">•</span>
                                    <span>
                                        <strong>relative_file_path:</strong> Specifies the images path within its parent
                                        session directory
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Model Configuration Section</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            While not required for basic dataset extraction, the model configuration section provides
                            advanced functionality for users working with classification predictions:
                        </p>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex items-start gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        6
                                    </span>
                                </div>
                                <p>
                                    Selection of multilabel classification models (note: drone platforms do not provide
                                    multilabel predictions)
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        7
                                    </span>
                                </div>
                                <p>Specification of classes to retain from the multilabel model output</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        8
                                    </span>
                                </div>
                                <p>
                                    Option to export raw prediction scores or binary presence/absence values after
                                    threshold application
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="rounded-full bg-[#ED595C] w-8 h-8">
                                    {" "}
                                    <span className="font-black text-[#2D2D2D] flex items-baseline pt-0.5 justify-center">
                                        9
                                    </span>
                                </div>
                                <p>
                                    Export button to generate and download the CSV file containing the configured
                                    dataset
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
                        <p className="text-red-800 text-sm leading-relaxed">
                            <strong>Disclaimer:</strong> Predictions presented in this interface are generated by
                            artificial intelligence algorithms and are provided for informational purposes only. They
                            may contain inaccuracies. The application publisher disclaims all responsibility for their
                            interpretation or use.
                        </p>
                    </div>
                </section>

                {/* Image Retrieval Section */}
                <section className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <ImageIcon className="w-7 h-7 text-ocean-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Image Retrieval Process</h2>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">1. CSV Export Structure</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        The export operation generates a CSV file with the following structure:
                    </p>

                    <div className="bg-background rounded-lg p-4 overflow-x-auto mb-6">
                        <pre className="text-sage-800 text-sm font-mono">
                            {`FileName,GPSLatitude,GPSLongitude,version_doi,relative_file_path
20231110_REU-ST-LEU_ASV-1_04_5_567.jpeg,-21.16281806626762,55.2865898413734,https://doi.org/10.5281/zenodo.12760339,20231110_REU-ST-LEU_ASV-1_04/PROCESSED_DATA/FRAMES/20231110_REU-ST-LEU_ASV-1_04_5_567.jpeg
20231110_REU-ST-LEU_ASV-1_04_5_990.jpeg,-21.16282476635246,55.28659116164465,https://doi.org/10.5281/zenodo.12760339,20231110_REU-ST-LEU_ASV-1_04/PROCESSED_DATA/FRAMES/20231110_REU-ST-LEU_ASV-1_04_5_990.jpeg
20231110_REU-ST-LEU_ASV-1_04_5_1409.jpeg,-21.162930832467936,55.28655471331759,https://doi.org/10.5281/zenodo.12760339,20231110_REU-ST-LEU_ASV-1_04/PROCESSED_DATA/FRAMES/20231110_REU-ST-LEU_ASV-1_04_5_1409.jpeg
...`}
                        </pre>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Retrieving the Images</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        There are <strong>two ways</strong> to set up the environment required to download the images
                        from Zenodo:
                    </p>

                    <div className="border-t-4 border-ocean-600 bg-ocean-50 rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Terminal className="w-6 h-6 text-ocean-600" />
                            Method 1: Using a Python Environment
                        </h4>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            You can follow the detailed installation guide to set up a local Python environment:
                        </p>
                        <Link
                            href="https://github.com/SeatizenDOI/zenodo-tools/blob/master/README.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-800 font-semibold mb-4"
                        >
                            <FileText className="w-5 h-5" />
                            GitHub Repository README
                        </Link>

                        <p className="text-gray-700 font-semibold mb-2">Run the command:</p>
                        <div className="bg-background rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sage-800 text-sm font-mono whitespace-pre-wrap break-all">
                                {`python zenodo-download.py -ecf -pcf /path/to/csv/file/provided/by/seatizen/monitoring -po /path/where/you/want/your/frames/folder`}
                            </pre>
                        </div>
                    </div>

                    <div className="border-t-4 border-sage-600 bg-gradient-to-br from-sage-50 to-emerald-50 rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Download className="w-6 h-6 text-sage-600" />
                            Method 2: Using Docker (Recommended for Simplicity)
                        </h4>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If you prefer to avoid installing dependencies manually, you can use{" "}
                            <Link
                                href="https://docs.docker.com/desktop/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold"
                            >
                                Docker Desktop.
                            </Link>
                        </p>

                        <p className="text-gray-700 mb-3 leading-relaxed">
                            Once installed, simply run the following command:
                        </p>

                        <div className="bg-background rounded-lg p-4 overflow-x-auto mb-4">
                            <pre className="text-sage-800 text-sm font-mono whitespace-pre-wrap break-all">
                                {`docker run -it --user 1000 --rm \\
  -v ./path/where/you/want/your/frames/folder:/home/seatizen/plancha \\
  -v ./path/folder/where/csv/file/provided/by/seatizen/monitoring:/home/seatizen/app/csv_inputs \\
  --name zenodo-manager seatizendoi/zenodo-manager:latest bash`}
                            </pre>
                        </div>

                        <div className="bg-white border border-sage-200 rounded-lg p-4 mb-4">
                            <p className="text-gray-900 font-semibold mb-2">This command:</p>
                            <ul className="text-gray-700 space-y-2 ml-4">
                                <li className="flex items-start">
                                    <span className="text-sage-600 mr-2">•</span>
                                    <span>
                                        Automatically downloads the Docker image{" "}
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                            seatizendoi/zenodo-manager:latest
                                        </code>
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sage-600 mr-2">•</span>
                                    <span>
                                        Mounts your local folders (
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">plancha</code> and{" "}
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">csv_inputs</code>)
                                        inside the container
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sage-600 mr-2">•</span>
                                    <span>Opens an interactive session ready to run the Zenodo Tools scripts</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-gray-700 mb-3 leading-relaxed">
                            Once your environment is ready, run the following command{" "}
                            <strong>inside the container</strong>:
                        </p>

                        <div className="bg-background rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sage-800 text-sm font-mono whitespace-pre-wrap break-all">
                                {`python zenodo-download.py -ecf -pcf /home/seatizen/app/csv_inputs/seatizen_monitoring.csv -po /home/seatizen/plancha`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Command Parameters:</h4>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="font-mono text-ocean-600 mr-3">-ecf</span>
                                <span>Enable CSV file processing mode</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-mono text-ocean-600 mr-3">-pcf</span>
                                <span>Path to the CSV file exported from SeatizenAtlas</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-mono text-ocean-600 mr-3">-po</span>
                                <span>Path to the output directory where downloaded images will be stored</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Final Output Section */}
                <section className="bg-gradient-to-br from-sage-50 to-emerald-50 rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Output</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Upon successful completion of the download process, you will have access to two key components:
                    </p>
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg p-5 border border-sage-200">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-sage-600" />
                                CSV Metadata File
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                A structured CSV file containing comprehensive metadata for each image, including
                                precise GPS coordinates. This file can be imported into QGIS or other GIS software for
                                spatial visualization and analysis of image locations.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-5 border border-sage-200">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-sage-600" />
                                Images Directory
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                A FRAMES subdirectory located at{" "}
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                    /path/where/you/want/your/frames/folder/Frames
                                </code>{" "}
                                containing all downloaded images organized according to their original session
                                structure.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-gray-600 text-sm">
                        SeatizenAtlas Data Exporter Tutorial · For technical support, please refer to the GitHub
                        repository
                    </p>
                </div>
            </div>
        </div>
    );
}

export function Exporter(language: LanguagesEnum) {
    return language === LanguagesEnum.ENGLISH ? ExporterEN() : ExporterFR();
}
