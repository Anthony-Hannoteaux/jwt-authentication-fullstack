# JWT Authentication App — Fullstack

## 1. Présentation

Ce projet est une application fullstack mettant en place un système complet d’authentification sécurisé basé sur **JWT (Access Token)** et **Refresh Token**.

Il simule un système d'authentification complet que l'on pourrait retrouver dans d'autres applications réelles.

L’objectif est de démontrer la capacité à concevoir :

* une API sécurisée
* une interface utilisateur cohérente
* une architecture propre et maintenable

---

##  2. Stack technique

### Backend

* **Node.js**
* **Express**
* **PostgreSQL**
* **JWT (jsonwebtoken)**
* **bcrypt**

### Frontend

* **React**
* **React Router**
* **Context API**
* **SCSS**

---

## 3. Fonctionnalités principales

* Création de compte utilisateur
* Connexion sécurisée
* Gestion des sessions (Access + Refresh Token)
* Redirection avec routes protégées
* Accès à un espace profil
* Modification des informations utilisateur
* Changement de mot de passe

---

## 4. Architecture du projet

Le projet est structuré en deux parties :

* `/backend` → API REST sécurisée (architecture MVC)
* `/frontend` → application React (SPA)

Chaque partie possède sa propre documentation détaillée.

---

## 5. Sécurité

Le système d’authentification repose sur :

* Access Token (JWT) à durée de vie courte
* Refresh Token sécurisé (cookie httpOnly)
* Sessions stockées en base de données
* Vérifications côté serveur (signature, expiration, session)

Des mesures supplémentaires sont mises en place :

* protection contre l’énumération des comptes
* gestion sécurisée des tokens
* révocation des sessions

---

## 6. Documentation

*  [Backend README](./backend/README.md)
*  [Frontend README](./frontend/README.md)

---

## 7. Lancer le projet

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Remarque

Ce projet est une démonstration technique mettant en avant :

* la gestion de l’authentification sécurisée
* la structuration d’une application fullstack
* l’application de bonnes pratiques frontend et backend