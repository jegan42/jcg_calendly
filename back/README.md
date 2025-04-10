# 🗓️ Calendly Backend

Backend Node.js/Express pour une app type Calendly, avec :
- Authentification Google via Passport
- JWT sécurisé via cookie
- Base de données gérée par Supabase
- Environnement prêt pour production (Render)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org) (version LTS recommandée)
- [npm](https://www.npmjs.com/)

---

## Configuration Google OAuth

1. Crée un projet sur [Google Cloud Console](https://console.cloud.google.com/).
2. Active l'API Google OAuth 2.0.
3. Génère un `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` dans la section "Identifiants" du projet

---

## Configuration Supabase

1. Crée un projet sur [Supabase](https://supabase.com).
2. Récupère l'URL de ton projet Supabase (supabase_url) et la clé de service (SUPABASE_SERVICE_KEY) depuis la section API de ton projet.

---

## 🚀 Stack utilisée

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com)
- [Passport.js](http://www.passportjs.org/)
- [JWT](https://jwt.io)
- [Render](https://render.com)

---

## 📁 Structure du projet

* back/
    * src/
        * controllers/ # Contient les logiques des contrôleurs
        * lib/ # Client Supabase et autres utilitaires
        * middleware/ # Middlewares pour la sécurité, l'authentification, etc.
        * routes/ # Routes de l'API
        * services/ # Logiques liées aux événements et autres services
        * supabase/ # Configuration de Supabase (clients, fonctions) 
        * types/ # Définition des types TypeScript
        * tsconfig.json # Configuration TypeScript
        * package.json # Dépendances et scripts

---

## ⚙️ Setup local

1. Cloner le repo :

```bash
git clone https://github.com/jegan42/jcg_calendly.git
cd back
```

2. Installer les dépendances

```bash
npm install
```

3. Créer un fichier `.env` à la racine de `back/` :

```env
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
JWT_SECRET=une_phrase_bien_longue_et_sécurisée
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

⚠️ Note de sécurité : Ne partagez jamais vos clés d'API (`SUPABASE_SERVICE_KEY`, `GOOGLE_CLIENT_ID`, `JWT_SECRET`, etc.) publiquement. Gardez-les dans un environnement sécurisé.

1. Démarrer en dev :

```bash
npm run dev
```

---

## 🔐 Authentification

L’app utilise Google OAuth 2.0 :

 - `/auth/google` → démarre le login Google

 - `/auth/google/callback` → callback après login

 - Cookie JWT sécurisé pour maintenir la session

Middleware :

 - `requireJWTAuth` protège les routes comme `/dashboard`, `/user/me`, etc.

---

## 🧪 Routes utiles

| Route                                      | Méthode HTTP | Description                                                       | Middleware               |
|--------------------------------------------|--------------|-------------------------------------------------------------------|--------------------------|
| `/`                                        | `GET`        | Vérification de l'état de l'application (health check)            | -                        |
| `/auth/google`                             | `GET`        | Redirection pour l'authentification via Google                     | `passport.authenticate("google")` |
| `/auth/google/callback`                    | `GET`        | Callback après l'authentification via Google                       | `passport.authenticate("google")` |
| `/auth/me`                                 | `GET`        | Récupère les données de l'utilisateur connecté                    | `requireJWTAuth`         |
| `/auth/logout`                             | `GET`        | Déconnexion (suppression du cookie JWT)                            | -                        |
| `/event`                                   | `POST`       | Création d'un événement                                            | `requireJWTAuth`, `validateEvent` |
| `/event`                                   | `GET`        | Récupère tous les événements de l'utilisateur connecté            | `requireJWTAuth`         |
| `/event/:id`                               | `GET`        | Récupère un événement spécifique par ID                            | `requireJWTAuth`         |
| `/event/:id`                               | `PUT`        | Mise à jour d'un événement spécifique par ID                       | `requireJWTAuth`         |
| `/event/:id`                               | `DELETE`     | Suppression d'un événement spécifique par ID                       | `requireJWTAuth`         |
| `/event/check-availability`                | `POST`       | Vérifie la disponibilité d'un créneau horaire                      | `requireJWTAuth`         |
| `/event/book/:slug`                        | `GET`        | Récupère les détails d'un type d'événement par "slug" (public)    | -                        |
| `/notification/send-event-notification`    | `POST`       | Envoi d'une notification de confirmation d'événement               | `requireJWTAuth`         |
| `/notification/send-event-reminder`        | `POST`       | Envoi d'un rappel pour un événement                                | `requireJWTAuth`         |



---

## 🛠 Déploiement sur Render

🟢 Prêt pour le déploiement sur Render.
Ce projet est prêt à être déployé sur [Render](https://render.com). Voici les étapes à suivre :

1. Crée un compte sur [Render](https://render.com).
2. Crée un nouveau service de type Node.js.
3. Définis le répertoire racine comme `back`.
4. Utilise les commandes suivantes pour le déploiement :
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
5. N'oublie pas de définir les variables d'environnement dans Render, qui sont nécessaires pour la connexion à Supabase et Google OAuth.

```env
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
JWT_SECRET=...
CLIENT_URL=https://tonfrontend.vercel.app
NODE_ENV=production
```

⚠️ Rappel : ne partage pas tes clés API publiquement, et assure-toi qu'elles sont définies dans les variables d'environnement lors du déploiement.

---

## 🛠 Gestion des erreurs

La gestion des erreurs sera améliorée dans une future mise à jour. Actuellement, les erreurs sont renvoyées directement au client, mais nous prévoyons d'implémenter un système de gestion centralisée des erreurs.

---

## 🧪 Tests unitaires

Les tests unitaires seront ajoutés plus tard pour garantir la stabilité et la fiabilité du backend. En attendant, il est conseillé de tester les différentes routes manuellement.

---

## ✅ À faire

 Auth Google + JWT (OK)

 Cookie sécurisé (OK)

 Middleware protégé (OK)

 Intégration avec le frontend (plus tard)

 Tests unitaires (plus tard)
 
 Gestion des erreurs (améliorer la gestion des erreurs globales)

📬 Contact
Made with ❤️ by jegan42 >> https://github.com/jegan42
