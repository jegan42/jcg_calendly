# 🗓️ **Calendly Project** - Backend & Frontend

Une application complète de type **Calendly**, permettant aux utilisateurs de gérer des événements, de s'authentifier, et de recevoir des notifications. Ce projet est divisé en deux parties : **Frontend** et **Backend**.

## 🚀 **Stack utilisée**

### **Frontend** :
- **[React.js](https://reactjs.org/)** : Framework principal pour construire l'UI
- **[TypeScript](https://www.typescriptlang.org/)** : Langage pour la gestion des types statiques
- **[Redux](https://redux.js.org)** (avec **[Redux Toolkit](https://redux-toolkit.js.org/)**) : Pour la gestion de l'état global
- **[Styled Components](https://styled-components.com/)** : Framework CSS pour créer des composants de style avec JavaScript
- **[Axios](https://axios-http.com/)** : Pour effectuer des appels API
- **[React Router](https://reactrouter.com/)** : Pour la gestion de la navigation entre les pages
- **[SWR](https://swr.vercel.app/)** : Pour l'optimisation des requêtes API
- **[React Hook Form](https://react-hook-form.com/)** : Pour la gestion des formulaires et la validation
- **[JWT](https://jwt.io/)** : Pour l'authentification avec des tokens JWT

### **Backend** :
- **[Express](https://expressjs.com/)** : Framework pour le serveur Node.js
- **[Node.js](https://nodejs.org)** : Environnement d'exécution JavaScript côté serveur
- **[TypeScript](https://www.typescriptlang.org/)** : Superset de JavaScript avec typage statique
- **[Supabase](https://supabase.io/)** : Base de données en temps réel
- **[Passport.js](https://www.passportjs.org/)** : Authentification OAuth (Google) et gestion de sessions
- **[JWT](https://jwt.io/)** : Utilisation de JSON Web Tokens pour sécuriser les routes
- **[Render](https://render.com)** : Plateforme cloud pour déployer des applications web et API

---

## 📁 **Structure du projet**

* **frontend/** : 
  * Composants, pages, hooks personnalisés, services API, gestion de l'état (Redux), et configuration des styles (Styled Components).
  
* **backend/** :
  * Routes pour l'authentification, la gestion des événements, la gestion des notifications et des utilisateurs, ainsi que des services pour interagir avec la base de données (Supabase).

---

## 🧑‍💻 **Développement**

### **Frontend** :
1. **Cloner le repo** :
    ```bash
    git clone https://github.com/jegan42/jcg_calendly_frontend.git
    cd frontend
    ```

2. **Installer les dépendances** :
    ```bash
    npm install
    ```

3. **Créer un fichier `.env`** à la racine de `frontend/` :
    ```env
    REACT_APP_API_URL=https://calendly-back-x0eh.onrender.com   # URL de l'API backend
    REACT_APP_JWT_SECRET=une_phrase_bien_longue_et_sécurisée  # Clé secrète JWT (si nécessaire)
    ```

4. **Démarrer en mode développement** :
    ```bash
    npm run start
    ```
    L'application sera disponible à `http://localhost:3000`.

---

### **Backend** :
1. **Cloner le repo** :
    ```bash
    git clone https://github.com/jegan42/jcg_calendly_backend.git
    cd backend
    ```

2. **Installer les dépendances** :
    ```bash
    npm install
    ```

3. **Créer un fichier `.env`** à la racine de `backend/` :
    ```env
    SUPABASE_URL=https://supabase.co
    SUPABASE_KEY=your_supabase_service_key
    JWT_SECRET=your_jwt_secret
    ```

4. **Démarrer en mode développement** :
    ```bash
    npm run dev
    ```
    Le serveur sera accessible sur `http://localhost:5000`.

---

## 🔐 **Authentification**

- **Frontend** : L'authentification est gérée avec **JWT**. Les utilisateurs se connectent via Google OAuth, et un **token JWT** est généré et stocké dans le Redux store.
  
- **Backend** : Le backend utilise **Passport.js** pour l'authentification OAuth via Google et **JWT** pour sécuriser les routes sensibles. Le token JWT est envoyé dans les cookies HTTP-Only pour assurer la sécurité.

---

## 🧩 **Fonctionnalités**

### **Frontend** :
- **Page d'accueil** : Affiche les informations de base et les événements.
- **Page de connexion** : Authentification via Google OAuth.
- **Dashboard** : Affichage des événements et possibilité de les gérer.
- **Page Profil** : Affichage et mise à jour des informations de l'utilisateur.
- **Gestion des événements** : Créer, afficher, mettre à jour et supprimer des événements.

### **Backend** :
- **Routes Authentification** : Connexion avec Google OAuth, récupération des données utilisateurs.
- **Gestion des événements** : Création, mise à jour, suppression, et récupération des événements utilisateurs.
- **Notifications** : Envoi de rappels ou confirmations par email aux utilisateurs.
- **Gestion des utilisateurs** : Inscription, authentification et récupération des informations de l'utilisateur.

---

## 🧑‍💻 **Routes et Pages du Frontend**

| Route  | Description |
| ------------- | ------------- |
| `/`  | Page d'accueil  |
| `/login`  | Page de connexion avec Google OAuth |
| `/dashboard`  | Page protégée pour la gestion des événements  |
| `/profile`  | Page du profil utilisateur  |
| `/events`  | Page pour gérer les événements (création, modification, suppression) |

---

## 🔧 **Développement et Déploiement**

### **Frontend** :
- Utilise **React Query** pour optimiser les appels API et maintenir l'état global du frontend.
- **Redux** gère l'état de l'utilisateur (authentification et profil).
- **Styled Components** permet de créer des composants réutilisables avec des styles encapsulés.

### **Backend** :
- **Supabase** est utilisé pour gérer la base de données des utilisateurs et des événements en temps réel.
- **JWT** sécurise l'API pour empêcher l'accès non autorisé aux routes sensibles.
- Le **middleware JWT** est utilisé pour protéger les routes sur le backend.

---

## 🧪 **Tests**

Les tests seront probablement ajoutés à l'aide de **Jest** pour le backend (tests des routes, des services) et **React Testing Library** pour les composants frontend.

---

## 🛠 **Déploiement**

1. **Frontend** : Une fois prêt, le frontend pourra être déployé sur des services comme **Netlify**, **Vercel**, ou **Render**.

2. **Backend** : Le backend peut être déployé sur des services comme **Render**, **Heroku**, ou **Vercel**.

---

## 📬 **Contact**

Projet réalisé avec ❤️ par **jegan42**.

[GitHub](https://github.com/jegan42)

