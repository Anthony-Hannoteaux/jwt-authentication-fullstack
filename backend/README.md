# JWT Authentication App — Backend

## 1. Présentation

Ce projet est une API backend développée avec Node.js et Express dans le cadre d’un projet fullstack d’authentification.

Il implémente un système d’authentification sécurisé basé sur l’utilisation combinée de **JWT (Access Token)** et **Refresh Token**.

Il simule un système d'authentification complet que l'on pourrait retrouver dans d'autres applications réelles.

---

## 2. Stack technique

* **Node.js**
* **Express**
* **PostgreSQL**
* **pg**
* **dotenv**
* **JWT (jsonwebtoken)**
* **bcrypt**
* **validator**
* **cors**
* **cookie-parser**

---

## 3. Fonctionnalités

### Authentification

* Création de session utilisateur
* Génération d’Access Token
* Génération de Refresh Token
* Rafraîchissement de session
* Modification données utilisateur
* Déconnexion utilisateur

### Endpoints principaux

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/refresh`
* `POST /api/auth/logout`

### Routes protégées

* `GET /api/user/me`
* `PATCH /api/user/me`
* `PATCH /api/user/password`

---

## 4. Architecture du projet

Le projet suit une architecture de type **MVC** :

* `controllers/` => logique métier des routes
* `models/` => interaction avec la base de données
* `routes/` => définition des endpoints
* `middlewares/` => gestion de l’authentification et des vérifications

---

## 5. Points techniques clés

* Implémentation d’un système **Access Token / Refresh Token**
* Séparation claire des responsabilités (MVC)
* Vérification des tokens via middleware
* Gestion des sessions en base de données
* Validation des entrées utilisateur
* Gestion centralisée des erreurs

---

## 6. Sécurité

### Access Token

* JWT signé avec une clé secrète
* Durée de vie courte (15 minutes)
* Contient l’identifiant utilisateur (`sub`)

### Refresh Token

* Généré via `crypto.randomBytes`
* Hashé (`SHA-256`) avant stockage en base => Fonction de hachage
* Stocké côté client via cookie `httpOnly` => Protection faille XSS
* Durée de vie : 7 jours
* Révocation possible (logout)

### Mesures de sécurité implémentées

* Messages d’erreur génériques (anti-énumération)
* Vérification du header `Authorization: Bearer`
* Vérification de la signature JWT
* Vérification de l’expiration des tokens
* Vérification des sessions actives en base
* Révocation des sessions

---

## 7. Améliorations possibles

* Affiner les vérifications des données (contrôles plus stricts)
* Mise en place de la rotation des Refresh Tokens
* Ajout d’un nettoyage automatique des sessions expirées
* Sécurisation des cookies en production (HTTPS, SameSite) => Protection attaque CSRF
* Mise en place de tests (unitaires / intégration)
* Ajout de logs structurés (monitoring)

---

## 8. Installation

### Prérequis

* Node.js
* PostgreSQL

### Installation

```bash
git clone https://github.com/Anthony-Hannoteaux/jwt-authentication-fullstack
cd backend
npm install
```

Créer un fichier `.env` (voir `.env.example`) :

```bash
PORT=
PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=
JWT_SECRET=
```

Lancer le serveur :

```bash
npm run dev
```

---

## Remarque

Ce projet est une démonstration technique mettant en valeur la mise en place d’un système d’authentification sécurisé côté backend.

Il a pour objectif de démontrer la capacité à :

* Gérer des flux d’authentification
* Sécuriser des sessions utilisateur
* Structurer une API maintenable et évolutive