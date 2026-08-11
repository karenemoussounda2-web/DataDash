# DataDash (Dashboard Météo Interactif)  

Le concept : Concevoir un dashboard interactif.  

API Recommandée : OpenWeatherMap API (Gratuite, nécessite une clé API). Alternative sans  

clé : l'API publique de CoinGecko pour un dashboard Crypto.  

Fonctionnalités attendues  

**Niveau 1 :** Les Fondamentaux (Requis)  

● Données initiales : Appeler l'API pour récupérer la météo actuelle d'une ville par
défaut (ex: Brazzaville, Paris, ou Montréal).  
● Affichage (DOM) : Créer un layout de type "Dashboard" (utilisant intelligemment CSS
Grid pour agencer les widgets). Afficher la température, la description (nuageux,
soleil), l'humidité, et l'icône correspondante fournie par l'API.  

**Niveau 2 :** L'Interactivité (Manipulation et Algorithmique)  

● Moteur de recherche : Permettre à l'utilisateur de taper le nom d'une ville et de
mettre à jour tout le dashboard avec ces nouvelles données.  
● Formatage des données : Le JavaScript doit arrondir les températures (ex:
transformer 22.45 en 22) et convertir les dates/heures UNIX fournies par l'API en
heures lisibles (ex: "18:00").  

**Niveau 3 :** Le Bonus (Prévisions et Persistance)  

● Prévisions sur 5 jours : Utiliser l'endpoint "Forecast" pour afficher une liste ou un
graphique simplifié des jours à venir (nécessite de filtrer de gros tableaux d'objets, un
excellent exercice logique).  
● Historique de recherche : Sauvegarder les 5 dernières villes recherchées dans le
localStorage et les afficher sous forme de tags cliquables.
