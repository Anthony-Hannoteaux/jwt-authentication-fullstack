# JWT Authentication App — Frontend

## 1. Présentation

Ce projet est une application frontend développée avec React dans le cadre d’un projet fullstack autour de l’authentification JWT.

Il simule un système d'authentification complet que l'on pourrait retrouver dans d'autres applications réelles.

L’objectif est de proposer une interface utilisateur complète permettant :

* l’inscription
* la connexion
* la gestion du profil utilisateur
* la modification des informations personnelles
* la gestion du mot de passe

Ce projet a pour but de mettre l’accent sur la **structure du code**, la **gestion de l’authentification** et les **bonnes pratiques frontend (a11y, SEO, UX)**.

---

## 2. Stack technique

* **React**
* **React Router**
* **SCSS (architecture modulaire)**
* **Context API (gestion de l’authentification)**
* **API REST (backend Node.js / JWT)**

---

## 3. Fonctionnalités principales

* Création de compte utilisateur
* Connexion sécurisée
* Redirection avec routes protégées
* Accès à un espace profil
* Modification des informations utilisateur
* Changement de mot de passe
* Gestion des erreurs (frontend & backend)
* Messages utilisateurs (succès / erreur)

---

## 4. Architecture du projet

Le projet est structuré de manière modulaire :

* `Components/`

  * `ui/` => composants réutilisables (Input, Button, Layout…)
  * `meta/` => gestion des métadonnées SEO

* `pages/`

  * LoginPage
  * RegisterPage
  * ProfilePage
  * SettingsPage
  * ChangePasswordPage
  * NotFoundPage

* `Context/`

  * AuthContext => gestion globale de l’utilisateur et des tokens

* `Hooks/`

  * useForm => gestion des formulaires

* `api/`

  * appels à l’API backend

* `styles/`

  * `__global.scss` => styles globaux de l'application 
  * `__mixin.scss` => mixins réutilisables (breakpoints, éléménts répétés d'une page à l'autre)
  * `__var.scss` => variables (couleurs, typographie, etc...)
  * `index.scss` => point d'entrée des styles globaux

---

## 5. Points techniques clés

* Mise en place d’un **AuthContext** pour centraliser l’état utilisateur
* Gestion des appels API avec logique métier séparée
* Routing protégé via des composants dédiés (ProtectedRoute / PublicRoute)
* Gestion des formulaires avec un hook personnalisé
* Validation des données côté frontend
* Gestion du focus sur les champs invalides (UX + a11y)

---

## 6. Accessibilité & SEO

Des améliorations de base ont été mises en place :

### Accessibilité (a11y)

* Utilisation correcte des balises HTML (main, section, h1, dl…)
* Labels associés aux inputs
* Gestion du focus sur erreurs
* Utilisation de `role="alert"` et `role="status"`
* Compatibilité avec lecteurs d’écran

### SEO (SPA)

* Mise à jour dynamique du `<title>` et des meta descriptions
* Composant dédié `PageMeta`
* Structuration sémantique des pages

---

## 7. Améliorations possibles

* Amélioration de la navigation (ajout d'un accès à l'accueil sur l'ensemble des pages)
* Accessibilité avancée
* Responsive plus poussé (mobile complet)
* Ajout de tests (unitaires / fonctionnels / e2e)
* Amélioration UX des formulaires
* Optimisation SEO
* Gestion plus avancée des erreurs API
* Homogénéisation des messages d'erreurs
* Optimisation du CSS en centralisant certaines répétitions (notamment les boutons d'actions)

---

## 8. Installation

### Prérequis

* Node.js

### Lancer le projet

```bash
git clone git@github.com:Anthony-Hannoteaux/jwt-authentication-fullstack.git
cd frontend
npm install
npm run dev
```

---

## Remarque

Ce projet est une démonstation technique orienté bonnes pratiques frontend.

Il a pour objectif de démontrer la capacité à :

* Structurer une application React maintenable
* Gérer des flux d'authentification sécurisés
* Appliquer des bonne pratiques en matière d'UX, d'accessibilité et SEO