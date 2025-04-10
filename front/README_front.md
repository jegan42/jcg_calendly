# 🗓️ Calendly Frontend

Frontend React.js pour une application de type Calendly, avec :
- Gestion de l'authentification via JWT
- UI rapide avec Styled Components
- Gestion de l'état avec Redux
- Requêtes API avec Axios et React Query
- Formulaires avec React Hook Form

---

## 🚀 Stack utilisée

- [React.js](https://reactjs.org) : Framework principal pour construire l'UI
- [TypeScript](https://www.typescriptlang.org/) : Langage pour la gestion des types statiques
- [Redux](https://redux.js.org) (avec [Redux Toolkit](https://redux-toolkit.js.org/)) : Pour la gestion de l'état global
- [Styled Components](https://styled-components.com/) : Framework CSS pour créer des composants de style avec JavaScript
- [Axios](https://axios-http.com/) : Pour effectuer des appels API
- [React Router](https://reactrouter.com/) : Pour la gestion de la navigation entre les pages
- [SWR](https://swr.vercel.app/) : Pour l'optimisation des requêtes API
- [React Hook Form](https://react-hook-form.com/) : Pour la gestion des formulaires et la validation
- [JWT](https://jwt.io/) : Pour l'authentification avec des tokens JWT

---

## 📁 Structure du projet

* frontend/
    * src/
        * components/   # Composants réutilisables
        * pages/        # Pages de l'application
        * redux/        # Configuration Redux (store, reducers, etc.)
        * hooks/        # Hooks personnalisés
        * services/     # Services pour les appels API (Axios)
        * styles/       # Styles globaux et configuration de Styled Components
        * utils/        # Utilitaires
        * App.tsx       # Composant principal de l'application
        * index.tsx     # Point d'entrée de l'application
        * tsconfig.json # Configuration TypeScript
        * package.json  # Dépendances et scripts
    * public/
        * index.html    # Fichier HTML de base
        * favicon.ico   # Icône de l'application
    * styled-components.d.ts # Déclarations TypeScript pour Styled Components

---

## ⚙️ Setup local

1. Cloner le repo :

```bash
git clone https://github.com/jegan42/jcg_calendly_frontend.git
cd frontend
```

2. Installer les dépendances

```bash
npm install
```

3. Créer un fichier `.env` à la racine de `front/` :

```env
REACT_APP_API_URL=https://calendly-back-x0eh.onrender.com   # URL de l'API backend
REACT_APP_JWT_SECRET=une_phrase_bien_longue_et_sécurisée  # Clé secrète JWT (si nécessaire)

```

⚠️ Note de sécurité : Ne partagez jamais vos clés d'API (`SUPABASE_SERVICE_KEY`, `GOOGLE_CLIENT_ID`, `JWT_SECRET`, etc.) publiquement. Gardez-les dans un environnement sécurisé.

4. Démarrer en dev :

```bash
npm run start
```

L'application sera disponible à `http://localhost:3000`.


## 🔐 Authentification

* Connexion via JWT : Utilisation de tokens JWT pour sécuriser les pages de l'application.

* Gestion de l'état avec Redux : Les informations d'utilisateur et le token JWT sont stockés dans le store Redux.

## 🧑‍💻 Routes et Pages

| Route  | Description |
| ------------- | ------------- |
| `/`  | Page d'accueil  |
| `/login`  | Page de connexion  |
| `/dashboard`  | Page protégée, nécessite un JWT valide  |
| `/profile`  | Page du profil utilisateur  |
| `/events`  | Page pour gérer les événements  |

## 💡 Développement

* Pages dynamiques avec React Router : L'application dispose de plusieurs pages, comme le dashboard et le profil, protégées par un JWT valide.

* Optimisation des requêtes avec React Query : Utilisation de React Query pour optimiser les requêtes API et améliorer l'expérience utilisateur.

* Gestion des formulaires avec React Hook Form : Simplifie la gestion des formulaires et la validation côté client.

## 🧪 Tests

Pour les tests, nous utiliserons probablement Jest et React Testing Library pour tester les composants React et les hooks.

## 🛠 Déploiement Render

Une fois prêt, l'application pourra être déployée sur des services comme Render.


📬 Contact
Made with ❤️ by jegan42 >> https://github.com/jegan42
