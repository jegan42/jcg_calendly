![Build Status](https://img.shields.io/github/workflow/status/jegan42/jcg_calendly/CI?style=flat-square)

# 🗓️ Calendly Backend

Backend Node.js/Express pour une app type Calendly, avec :

-   Authentification Google via Passport
-   JWT sécurisé via cookie
-   Base de données gérée par Supabase
-   Environnement prêt pour production (Render)

---

## 🚀 Stack utilisée

-   **[Node.js](https://nodejs.org/en/)** (version 22.14.0) : Serveur backend pour gérer les requêtes HTTP.
-   **[Express](https://expressjs.com/)** (version 5.1.0) : Framework pour la gestion des routes et middlewares.
-   **[Supabase](https://supabase.com/)** : Plateforme de backend-as-a-service pour gérer l'authentification, les fonctions serverless et la base de données (PostgreSQL).
-   **[Prisma ORM](https://www.prisma.io/)** : Outil pour interagir avec la base de données et gérer les modèles.
-   **[JWT (JSON Web Tokens)](https://jwt.io/)** : Utilisé pour l'authentification et l'autorisation des utilisateurs.
-   **[Google OAuth2](https://developers.google.com/identity/protocols/oauth2)** : Stratégie d'authentification via Google.
-   **[Passport.js](http://www.passportjs.org/)** : Middleware pour l'authentification via différentes stratégies (incluant Google OAuth).
-   **[Node-cron](https://www.npmjs.com/package/node-cron)** : Utilisé pour exécuter des tâches récurrentes côté serveur (ex. rappels programmés).
-   **[Helmet](https://helmetjs.github.io/)** : Middleware de sécurité pour Express, protégeant contre les vulnérabilités courantes.
-   **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** et **[express-session](https://www.npmjs.com/package/express-session)** : Gestion des sessions et des cookies dans l'application.
-   **[csrf-tokens](https://www.npmjs.com/package/csrf-tokens)** et **[csurf](https://www.npmjs.com/package/csurf)** : Protection contre les attaques Cross-Site Request Forgery (CSRF).
-   **[TypeScript](https://www.typescriptlang.org/)** : Langage de programmation utilisé pour ce projet, offrant un typage statique pour une meilleure maintenance du code.
-   **[nodemon](https://www.npmjs.com/package/nodemon)** et **[ts-node-dev](https://www.npmjs.com/package/ts-node-dev)** : Outils pour le développement en temps réel et le redémarrage automatique du serveur.
-   **[Render](https://render.com/)** : Plateforme de déploiement cloud offrant des services pour héberger des applications web, des bases de données, et des fonctions serverless. Elle permet un déploiement rapide et facile avec une gestion automatique des ressources et des mises à jour.

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
        -   `controllers/` - Contient les logiques des contrôleurs pour la gestion des requêtes.
        -   `lib/` - Bibliothèques et utilitaires spécifiques au projet.
        -   `middleware/` - Contient les middlewares pour la gestion des sécurités, authentifications, etc.
        -   `routes/` - Définition des routes de l'API.
        -   `services/` - Logique métier, par exemple, pour la gestion des événements.
        -   `supabase/` - Contient la configuration spécifique à Supabase.
        -   `types/` - Définition des types TypeScript pour garantir la sécurité du typage.
        -   `tsconfig.json` - Fichier de configuration de TypeScript.
        -   `package.json` - Liste des dépendances et des scripts npm.

---

## 🧪 Routes utiles

| Route                                   | Méthode HTTP | Description                                                    | Middleware                        |
| --------------------------------------- | ------------ | -------------------------------------------------------------- | --------------------------------- |
| `/`                                     | `GET`        | Vérification de l'état de l'application (health check)         | -                                 |
| `/auth/google`                          | `GET`        | Redirection pour l'authentification via Google                 | `passport.authenticate("google")` |
| `/auth/google/callback`                 | `GET`        | Callback après l'authentification via Google                   | `passport.authenticate("google")` |
| `/auth/me`                              | `GET`        | Récupère les données de l'utilisateur connecté                 | `requireJWTAuth`                  |
| `/auth/logout`                          | `GET`        | Déconnexion (suppression du cookie JWT)                        | -                                 |
| `/events`                               | `POST`       | Création d'un événement                                        | `requireJWTAuth`, `validateEvent` |
| `/events`                               | `GET`        | Récupère tous les événements de l'utilisateur connecté         | `requireJWTAuth`                  |
| `/events/:id`                           | `GET`        | Récupère un événement spécifique par ID                        | `requireJWTAuth`                  |
| `/events/:id`                           | `PUT`        | Mise à jour d'un événement spécifique par ID                   | `requireJWTAuth`                  |
| `/events/:id`                           | `DELETE`     | Suppression d'un événement spécifique par ID                   | `requireJWTAuth`                  |
| `/events/check-availability`            | `POST`       | Vérifie la disponibilité d'un créneau horaire                  | `requireJWTAuth`                  |
| `/events/book/:slug`                    | `GET`        | Récupère les détails d'un type d'événement par "slug" (public) | -                                 |
| `/notification/send-event-notification` | `POST`       | Envoi d'une notification de confirmation d'événement           | `requireJWTAuth`                  |
| `/notification/send-event-reminder`     | `POST`       | Envoi d'un rappel pour un événement                            | `requireJWTAuth`                  |

---

## 🔐 Authentification

L’app utilise Google OAuth 2.0 :

-   `/auth/google` → démarre le login Google

-   `/auth/google/callback` → callback après login

-   Cookie JWT sécurisé pour maintenir la session

Middleware :

-   `requireJWTAuth` protège les routes comme `/dashboard`, `/user/me`, etc.

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
Made with ❤️ by jegan42 >> https://github.com/jegan42
