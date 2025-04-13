![Build Status](https://img.shields.io/github/workflow/status/jegan42/jcg_calendly/CI?style=flat-square)

# 🗓️ Calendly Backend

Backend Node.js/Express pour une app type Calendly, avec :

-   Authentification Google via Passport
-   JWT sécurisé via cookie
-   Base de données gérée par Supabase
-   Environnement prêt pour production (Render)

---

## 🚀 Stack utilisée

### 🛠️ Framework et Environnement
- **[Node.js](https://nodejs.org/en/)** (version 20.17.0) : Environnement d'exécution JavaScript pour le backend.
- **[Express](https://expressjs.com/)** (version 5.1.0) : Framework pour la gestion des requêtes HTTP et la création d'applications web.
- **[TypeScript](https://www.typescriptlang.org/)** (version 5.8.3) : Langage surensemble de JavaScript qui ajoute un typage statique.
- **[Prisma ORM](https://www.prisma.io/)** (version 6.5.0) : ORM pour interagir avec la base de données.
- **[Supabase](https://supabase.com/)** (version 2.20.5) : Backend-as-a-Service offrant des fonctionnalités comme la base de données et l'authentification.

### 🔐 Authentification et Sécurité
- **[Passport.js](http://www.passportjs.org/)** (version 0.7.0) : Middleware pour l'authentification.
- **[passport-google-oauth20](https://www.npmjs.com/package/passport-google-oauth20)** (version 2.0.0) : Stratégie d'authentification OAuth 2.0 avec Google.
- **[Google OAuth2](https://developers.google.com/identity/protocols/oauth2)** : Stratégie d'authentification via Google.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** (version 9.0.2) : Gestion des tokens JWT pour l'authentification.
- **[csrf-tokens](https://www.npmjs.com/package/csrf-tokens)** (version 1.0.4) : Protection contre les attaques CSRF.
- **[csurf](https://www.npmjs.com/package/csurf)** (version 1.2.2) : Protection contre les attaques Cross-Site Request Forgery (CSRF).
- **[express-rate-limit](https://www.npmjs.com/package/express-rate-limit)** (version 7.5.0) : Protection contre les attaques par déni de service (DDoS).
- **[helmet](https://www.npmjs.com/package/helmet)** (version 8.1.0) : Sécurisation des headers HTTP.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** (version 1.4.7) : Middleware pour parser les cookies.
- **[express-session](https://www.npmjs.com/package/express-session)** (version 1.18.1) : Gestion des sessions utilisateurs.
- **[express-validator](https://www.npmjs.com/package/express-validator)** (version 7.2.1) : Middleware pour la validation des données des requêtes HTTP.

### 💾 Base de données et ORM
- **[Prisma](https://www.prisma.io/)** (version 6.5.0) : ORM pour interagir avec la base de données.
- **[Supabase](https://supabase.com/)** (version 2.20.5) : Fournisseur de services de base de données PostgreSQL.

### ⚙️ Fonctionnalités supplémentaires
- **[node-cron](https://www.npmjs.com/package/node-cron)** (version 3.0.3) : Planification des tâches cron.
- **[nodemailer](https://nodemailer.com/)** (version 6.10.0) : Envoi d'emails via SMTP.
- **[googleapis](https://www.npmjs.com/package/googleapis)** (version 148.0.0) : Interaction avec les API Google.
- **[morgan](https://www.npmjs.com/package/morgan)** (version 1.10.0) : Middleware de logging des requêtes HTTP.

### 🌱 Environnement et gestion des variables
- **[dotenv](https://www.npmjs.com/package/dotenv)** (version 16.4.7) : Chargement des variables d'environnement.
- **[@bearz/dotenv](https://www.npmjs.com/package/@bearz/dotenv)** (version 0.1.0) : Gestion des variables d'environnement de manière optimisée.
- **[Render](https://render.com/)** : Plateforme de déploiement cloud offrant des services pour héberger des applications web, des bases de données, et des fonctions serverless. Elle permet un déploiement rapide et facile avec une gestion automatique des ressources et des mises à jour.

### 🛠️ Dépendances de développement
- **[nodemon](https://www.npmjs.com/package/nodemon)** (version 3.1.9) : Outil pour redémarrer automatiquement l'application pendant le développement.
- **[ts-node](https://www.npmjs.com/package/ts-node)** (version 10.9.2) : Exécution de fichiers TypeScript sans compilation préalable.
- **[ts-node-dev](https://www.npmjs.com/package/ts-node-dev)** (version 2.0.0) : Outil pour le développement rapide en TypeScript.
- **[@types/node](https://www.npmjs.com/package/@types/node)** (version 22.14.0) : Types TypeScript pour Node.js.
- **[@types/express](https://www.npmjs.com/package/@types/express)** (version 5.0.1) : Types TypeScript pour Express.
- **[@types/passport](https://www.npmjs.com/package/@types/passport)** (version 1.0.17) : Types TypeScript pour Passport.
- **[@types/express-session](https://www.npmjs.com/package/@types/express-session)** (version 1.18.1) : Types TypeScript pour express-session.
- **[@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken)** (version 9.0.9) : Types TypeScript pour jsonwebtoken.
- **[@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser)** (version 1.4.8) : Types TypeScript pour cookie-parser.
- **[@types/cors](https://www.npmjs.com/package/@types/cors)** (version 2.8.17) : Types TypeScript pour cors.

---

## 🚀 Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

-   [Node.js](https://nodejs.org) (version utilisé pour ce projet 22.14.0)
-   [npm](https://www.npmjs.com/)
-   [Supabase](https://supabase.com/) Compte Supabase pour la gestion de la base de données et des fonctionnalités back-end (authentification, stockage, etc.)

### Étapes d'installation

1. Clonez le repository :
    ```bash
    git clone https://github.com/jegan42/jcg_calendly.git
    ```
2. Allez dans le dossier du projet :
    ```bash
    cd jcg_calendly
    ```
3. Installez les dépendances :
    - Avec npm :
        ```bash
        npm install
        ```
    - Avec yarn :
        ```bash
        yarn install
        ```
4. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement suivantes :
   `    PORT=5000
    CLIENT_URL=http://localhost:3000
    DATABASE_URL=postgresql://user:password@localhost:5432/dbname
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    JWT_SECRET=your-jwt-secret
   `
   ⚠️ Note de sécurité : Ne partagez jamais vos clés d'API (`SUPABASE_SERVICE_KEY`, `GOOGLE_CLIENT_ID`, `JWT_SECRET`, etc.) publiquement. Gardez-les dans un environnement sécurisé.

5. Lancez le projet en mode développement :
    ```bash
    npm run dev
    ```
    ou, si vous utilisez Yarn :
    ```bash
    yarn dev
    ```

Le serveur sera accessible à l'adresse `http://localhost:5000`.

---

## ⚙️ Configuration

### Google OAuth

1. Crée un projet sur [Google Cloud Console](https://console.cloud.google.com/).
2. Active l'API Google OAuth 2.0.
3. Génère un `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` dans la section "Identifiants" du projet

### Supabase

1. Crée un projet sur [Supabase](https://supabase.com).
2. Récupère l'URL de ton projet Supabase (supabase_url) et la clé de service (SUPABASE_SERVICE_KEY) depuis la section API de ton projet.

---

## 📁 Structure du projet

-   `back/` - Dossier principal contenant tout le code du backend.
    -   `src/` - Contient les fichiers source du projet backend.
        -   `cron/` - pour les tâches planifiées (reminderScheduler, recurringInstances)
        -   `lib/` - Bibliothèques et utilitaires spécifiques au projet.
        -   `mailer/` - Envoi d'emails via SMTP.
        -   `middleware/` - Contient les middlewares pour la gestion des sécurités, authentifications, etc.
        -   `routes/` - Définition des routes de l'API.
        -   `services/` - Logique métier, par exemple, pour la gestion des événements.
        -   `supabase/` - Contient la configuration spécifique à Supabase.
        -   `types/` - Définition des types TypeScript pour garantir la sécurité du typage.
        -   `tsconfig.json` - Fichier de configuration de TypeScript.
        -   `package.json` - Liste des dépendances et des scripts npm.

---

## 📚 Références API (routes)

| Route                                   | Méthode HTTP | Description                                                          | Middleware                         |
| --------------------------------------- | ------------ | --------------------------------------------------------------       | ---------------------------------  |
| `/`                                     | `GET`        | Vérification de l'état de l'application (health check)               | -                                  |
| `/auth/google`                          | `GET`        | Redirection pour l'authentification via Google                       | `passport.authenticate("google")`  |
| `/auth/google/callback`                 | `GET`        | Callback pour l'authentification Google après la redirection         | `passport.authenticate("google")`  |
| `/auth/me`                              | `GET`        | Récupérer les données de l'utilisateur connecté                      | `requireJWTAuth`                   |
| `/auth/logout`                          | `GET`        | Déconnexion et suppression du cookie JWT                             | -                                  |
| `/availability`                         | `GET`        | Récupérer tous les créneaux de disponibilité pour l'utilisateur      | `requireJWTAuth`                   |
| `/availability`                         | `POST`       | Ajouter un nouveau créneau de disponibilité                          | `requireJWTAuth`                   |
| `/availability/:id`                     | `PUT`        | Mettre à jour un créneau de disponibilité                            | `requireJWTAuth`                   |
| `/availability/:id`                     | `DELETE`     | Supprimer un créneau de disponibilité                                | `requireJWTAuth`                   |
| `/events`                               | `POST`       | Créer un événement avec validation                                   | `requireJWTAuth` , `validateEvent` |
| `/events`                               | `GET`        | Récupérer tous les événements pour l'utilisateur                     | `requireJWTAuth`                   |
| `/events/:id`                           | `GET`        | Récupérer un événement spécifique par son ID                         | `requireJWTAuth`                   |
| `/events/:id`                           | `PUT`        | Mettre à jour un événement spécifique                                | `requireJWTAuth`                   |
| `/events/:id`                           | `DELETE`     | Supprimer un événement spécifique                                    | `requireJWTAuth`                   |
| `/events/check-availability`            | `POST`       | Vérifier la disponibilité d'un créneau pour un événement             | `requireJWTAuth`                   |
| `/events/google-calendar`               | `POST`       | Créer un événement dans Google Calendar                              | `requireJWTAuth`                   |
| `/events/:eventId/guests`               | `POST`       | Ajouter un invité à un événement                                     | `requireJWTAuth`                   |
| `/events/:eventId/guests`               | `GET`        | Récupérer tous les invités d'un événement                            | `requireJWTAuth`                   |
| `/events/:eventId/guests/:guestId`      | `PUT`        | Mettre à jour le statut d'un invité                                  | `requireJWTAuth`                   |
| `/events/:eventId/guests/:guestId`      | `DELETE`     | Supprimer un invité d'un événement                                   | `requireJWTAuth`                   |
| `/response`                             | `POST`       | Mettre à jour la réponse d'un invité pour un événement               | `requireJWTAuth`                   |
| `/public/book/:slug`                    | `GET`        | Récupérer un événement public par son slug                           | -                                  |
| `/public/book/:slug`                    | `POST`       | Réserver un créneau pour un événement public                         | -                                  |
| `/event-bookings/        `              | `POST`       | Créer une nouvelle réservation                                       | `requireJWTAuth`                   |
| `/event-bookings/:eventId`              | `GET`        | Récupérer toutes les réservations d'un événement spécifique          | `requireJWTAuth`                   |
| `/event-bookings/:bookingId`            | `DELETE`     | Supprimer une réservation par ID                                     | `requireJWTAuth`                   |
| `/event-bookings/:bookingId`            | `PUT`        | Mettre à jour le statut d'une réservation (confirmé, annulé, etc.)   | `requireJWTAuth`                   |
| `/event-bookings/user/:userId`          | `GET`        | Voir les réservations d’un utilisateur                               | `requireJWTAuth`                   |
| `/notification/send-event-notification` | `POST`       | Envoyer une notification de confirmation d'événement                 | `requireJWTAuth`                   |
| `/notification/send-event-reminder`     | `POST`       | Envoyer un rappel pour un événement                                  | `requireJWTAuth`                   |
| `/recurring`                            | `POST`       | Créer un événement récurrent                                         | `requireJWTAuth`                   |
| `/recurring`                            | `GET`        | Récupérer tous les événements récurrents pour un utilisateur         | `requireJWTAuth`                   |
| `/recurring/:id`                        | `GET`        | Récupérer un événement récurrent par son ID                          | `requireJWTAuth`                   |
| `/recurring/:id`                        | `PUT`        | Mettre à jour un événement récurrent                                 | `requireJWTAuth`                   |
| `/recurring/:id`                        | `DELETE`     | Supprimer un événement récurrent                                     | `requireJWTAuth`                   |
| `/recurring/generate/:id`               | `POST`       | Générer des instances d'événements à partir d'un événement récurrent | `requireJWTAuth`                   |

---

## 🔐 Authentification

L’app utilise Google OAuth 2.0 :

-   `/auth/google` → démarre le login Google

-   `/auth/google/callback` → callback après login

-   Cookie JWT sécurisé pour maintenir la session

Middleware :

-   `requireJWTAuth` protège les routes comme `/dashboard`, `/user/me`, etc.

---

## 🛠 Déploiement sur Render

🟢 Prêt pour le déploiement sur Render.

Suivez les étapes ci-dessous pour déployer ce projet sur [Render](https://render.com) :

1. Crée un compte sur [Render](https://render.com).
2. Crée un nouveau service de type **Node.js**.
3. Définis le répertoire racine comme `back`.
4. Utilise les commandes suivantes pour le déploiement :

    - **Build Command** : `npm install && npm run build`
    - **Start Command** : `npm run start`

5. N'oublie pas de configurer les **variables d'environnement** dans l'interface de Render pour la connexion à Supabase et Google OAuth.

Exemple de variables à configurer :

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

## ⚙️ Fonctionnalités supplémentaires

### 🕒 Rappels d'événements (Automatiques via Cron)

Les rappels d'événements sont envoyés automatiquement en arrière-plan grâce à un cron job. Ce processus est géré par la fonction `scheduleEventReminders`, qui s'exécute toutes les minutes et vérifie les événements prévus pour les 1 heure et 24 heures à venir.

-   **Comment ça marche ?**

    -   À chaque exécution, la fonction récupère les événements qui doivent avoir lieu dans les 1h ou 24h.
    -   Ensuite, elle envoie des emails de rappel aux invités et à l'organisateur de l'événement.

-   **Comment vérifier que le cron job fonctionne ?**
    -   Vous pouvez vérifier les logs des tâches cron pour toute activité d'exécution en arrière-plan.
    -   Assurez-vous qu'un événement de test avec un rappel prévu dans l'heure suivante est correctement rappelé par email.

Cette fonctionnalité fonctionne automatiquement en arrière-plan et n'est pas accessible via une route API, mais elle garantit que les utilisateurs reçoivent des rappels en temps voulu pour leurs événements.

### 📅 Gestion des événements

Ce projet permet aux utilisateurs de créer et de gérer leurs événements via une interface API RESTful. Les utilisateurs peuvent :

-   Créer un événement avec des détails (titre, date, etc.).
-   Mettre à jour ou supprimer des événements.
-   Vérifier la disponibilité d'un créneau horaire pour planifier un événement.

Les événements sont stockés dans Supabase, qui offre une base de données PostgreSQL gérée avec une authentification intégrée.

### 🔁 Événements récurrents

- Les événements récurrents peuvent être créés avec une fréquence (quotidienne, hebdomadaire, mensuelle).
- Un cron job se charge de générer automatiquement les instances futures d’événements à partir de leur modèle de récurrence.

Voir la route :
`/recurring` (CRUD) et `/recurring/generate/:id` (génération manuelle)

### 👥 Gestion des invités

- Les utilisateurs peuvent inviter des personnes (même non inscrites).
- Suivi de leur réponse : accepté, refusé, peut-être
- Possibilité de mettre à jour ou supprimer un invité

Voir les routes :  
`/events/:eventId/guests` (POST/GET)  
`/events/:eventId/guests/:guestId` (PUT/DELETE)  
`/response` (GET via lien public)

### 📆 Réservations publiques

- Les événements publics peuvent être consultés par slug.
- Un utilisateur ou un visiteur peut réserver un créneau (si libre).
- Cela crée une entrée dans la table `event_bookings`.

Routes : `/public/book/:slug` (GET), `/public/book/:slug` (POST)

---

## 🛠 Gestion des erreurs

Actuellement, la gestion des erreurs est basique, mais nous prévoyons d'ajouter une gestion centralisée des erreurs avec des logs et une meilleure gestion des réponses d'erreur.

**Prochaines étapes** :

-   Implémentation d'un middleware de gestion des erreurs.
-   Envoi de notifications ou d'alertes en cas d'erreurs critiques.
-   Amélioration de la gestion des erreurs pour les routes API.

Actuellement, les erreurs sont renvoyées directement au client, mais cela sera amélioré dans une future mise à jour.

---

## 🧪 Tests unitaires

Les tests unitaires seront ajoutés plus tard pour garantir la stabilité et la fiabilité du backend. En attendant, il est conseillé de tester les différentes routes manuellement.

Pour exécuter les tests (si configurés dans le futur), vous pouvez utiliser la commande suivante :

```bash
npm run test
```

---

## ✅ À faire

Auth Google + JWT (OK)

Cookie sécurisé (OK)

Middleware protégé (OK)

Intégration avec le frontend (plus tard)

Tests unitaires (plus tard)

Gestion des erreurs (améliorer la gestion des erreurs globales)

---

## 🤝 Contribuer

Si vous souhaitez contribuer à ce projet, voici les étapes à suivre :

1. Fork ce repository.
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalité`).
3. Faites vos changements et ajoutez des tests (si applicable).
4. Soumettez vos changements (`git commit -am 'Ajout d\'une nouvelle fonctionnalité'`).
5. Poussez la branche (`git push origin feature/nouvelle-fonctionnalité`).
6. Ouvrez une pull request.

Merci de vous conformer aux [guidelines de style de code](#) pour assurer une bonne intégration dans le projet.

---

## ⚠️ Erreurs courantes

-   **Erreur : "Port déjà utilisé"**  
    Cette erreur se produit lorsque le port `5000` est déjà utilisé par un autre processus. Vous pouvez changer le port en modifiant la variable d'environnement `PORT` dans votre fichier `.env`.

-   **Erreur : "Erreur d'authentification Google"**  
    Si vous obtenez une erreur liée à Google OAuth, assurez-vous que vos clés API Google sont correctes et que votre projet Google Cloud est correctement configuré pour accepter les connexions.

---

📬 Contact
Made with ❤️ by **[jegan42](https://github.com/jegan42)**
