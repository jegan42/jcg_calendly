# 🗓️ Calendly Backend

Backend Node.js/Express pour une app type Calendly, avec :
- Authentification Google via Passport
- JWT sécurisé via cookie
- Base de données gérée par Supabase
- Environnement prêt pour production (Render)

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

4. Démarrer en dev :

```bash
npm run dev
```

## 🔐 Authentification

L’app utilise Google OAuth 2.0 :

 - `/auth/google` → démarre le login Google

 - `/auth/google/callback` → callback après login

 - Cookie JWT sécurisé pour maintenir la session

Middleware :

 - `requireJWTAuth` protège les routes comme `/dashboard`, `/user/me`, etc.

## 🧪 Routes utiles

| Route  | Description |
| ------------- | ------------- |
| `/auth/google`  | Démarre le login Google  |
| `/auth/google/callback`  | Callback OAuth  |
| `/auth/logout`  | Déconnecte (supprime le cookie)  |
| `/auth/me`  | Récupère l’utilisateur courant  |
| `/dashboard`  | Page protégée (JWT requis)  |



## 🛠 Déploiement Render

🟢 Prêt pour le déploiement sur Render.

Configuration Render :
 - Root Directory: `back`

 - Build Command: `npm install && npm run build`

 - Start Command: `npm run start`

 - Environment: Node

Variables d’environnement :

```env
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
JWT_SECRET=...
CLIENT_URL=https://tonfrontend.vercel.app
NODE_ENV=production
```
⚠️ Note de sécurité : Ne partagez jamais vos clés d'API (`SUPABASE_SERVICE_KEY`, `GOOGLE_CLIENT_ID`, `JWT_SECRET`, etc.) publiquement. Gardez-les dans un environnement sécurisé.


## ✅ À faire

 Auth Google + JWT (OK)

 Cookie sécurisé (OK)

 Middleware protégé (OK)

 Intégration avec le frontend (plus tard)

 Tests unitaires (plus tard)
 
 Gestion des erreurs (améliorer la gestion des erreurs globales)

📬 Contact
Made with ❤️ by jegan42 >> https://github.com/jegan42
