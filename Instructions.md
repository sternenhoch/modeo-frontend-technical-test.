# Test Technique Stage Frontendrecords

## Instructions

Le but de cet exercice est de récupérer la liste des Vélib disponibles via l'API `opendata.paris.fr` et d'afficher les résultats dans la fenêtre du navigateur en respectant le design de la maquette. Tu es libre d'utiliser la solution css qui te conviendra le mieux. 😊

### Informations Pratiques

Url de la ressource pour récupérer les stations de Velibs:

`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records`

[Lien du Figma](https://www.figma.com/file/PdloYqAcFhaxksNHY7zRtp/Stage-Frontend-Modeo)

### Fonctionnalitées attendues

#### Affichage des résultats dans la liste

En tant qu'utilisateur, je veux pouvoir voir les bornes de Vélib disponibles dans ma liste avec pour chaque borne, les informations suivantes :
* Le nom de la borne
* Le nombre de vélos disponibles / Le nombre de vélos total de la borne
* Le nombre de vélos mécaniques
* Le nombre de vélos électriques

#### Gestion de la pagination

En tant qu'utilisateur, une fois que mes résultats sont affichés, je veux pouvoir en afficher plus en cliquant sur le bouton "Charger plus de résultats", à chaque click sur le bouton, afficher 5 résultats supplémentaires.