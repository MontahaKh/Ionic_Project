# Ionic Project

Application mobile Ionic/Angular de gestion de films. Le projet utilise Firebase
pour l'authentification et le stockage des profils utilisateurs.

## État actuel du projet

### Fonctionnalités implémentées

- **Création de compte** depuis `/register` avec les champs prénom, nom, âge,
  e-mail, mot de passe et confirmation du mot de passe.
- **Validation de l'inscription** :
  - tous les champs sont obligatoires ;
  - l'âge doit être compris entre 13 et 120 ans ;
  - le mot de passe doit contenir au moins 6 caractères ;
  - les deux mots de passe doivent être identiques.
- **Connexion** depuis `/login` avec e-mail et mot de passe.
- **Déconnexion** depuis l'accueil ou le profil.
- **Gestion des profils dans Firestore** : la création d'un compte crée un
  document dans la collection `users`, avec le rôle `user`, le statut actif et
  la date de création.
- **Page d'accueil protégée** (`/home`) accessible uniquement après connexion.
- **Page profil** (`/profile`) affichant le prénom, le nom, l'e-mail, l'âge, le
  rôle et le statut du compte.
- **Blocage des comptes désactivés** : un compte dont le champ `active` vaut
  `false` est déconnecté lors de la connexion.
- **Messages d'erreur utilisateur** pour les erreurs courantes Firebase
  (identifiants invalides, e-mail déjà utilisé, e-mail invalide, trop de
  tentatives, mot de passe faible).
- **Protection contre les attentes infinies** lors du chargement de l'état
  d'authentification et du profil, avec des délais d'expiration explicites.

### Écrans présents mais pas encore fonctionnels

Les routes suivantes existent et sont protégées par l'authentification, mais
leur interface est encore une page Ionic de base sans logique métier :

- `/movies` : liste des films ;
- `/movie-details` : détails d'un film ;
- `/favorites` : films favoris ;
- `/matching` : matching ;
- `/admin/dashboard` : tableau de bord administrateur ;
- `/admin/users` : gestion des utilisateurs ;
- `/admin/movies` : gestion des films.

Les services `Movie`, `Favorite` et `Matching` ainsi que les gardes
`activeUserGuard` et `adminGuard` sont actuellement des squelettes. Les routes
administrateur utilisent pour le moment `authGuard` uniquement : le contrôle
effectif du rôle administrateur reste à implémenter.

## Technologies utilisées

- [Ionic](https://ionicframework.com/) 9
- Angular 22 avec composants standalone
- Capacitor 8
- Firebase 12 :
  - Firebase Authentication (e-mail / mot de passe) ;
  - Cloud Firestore (profils utilisateurs) ;
  - Firebase Storage (initialisé, mais pas encore utilisé par une fonctionnalité
    d'interface).
- TypeScript 6

## Prérequis

- Node.js et npm ;
- un projet Firebase configuré avec :
  - le fournisseur **E-mail/Mot de passe** activé dans Authentication ;
  - Cloud Firestore activé ;
  - Storage activé si la gestion des photos est ajoutée.

La configuration Firebase est définie dans :

- `src/environments/environment.ts` pour le développement ;
- `src/environments/environment.prod.ts` pour la production.

## Installation

```bash
npm install
```

## Lancer l'application

```bash
npm start
```

L'application est ensuite disponible à l'adresse indiquée par Angular CLI
(généralement `http://localhost:4200`).

## Commandes disponibles

| Commande | Description |
| --- | --- |
| `npm start` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run watch` | Compile en mode développement avec surveillance des fichiers |
| `npm test` | Lance les tests unitaires |
| `npm run lint` | Vérifie le code TypeScript et les templates Angular |

## Organisation principale

```text
src/
└── app/
    ├── guards/       # Protection des routes
    ├── home/         # Accueil après connexion
    ├── models/       # Modèles UserProfile, Movie et Favorite
    ├── pages/        # Pages publiques, utilisateur et administration
    └── services/     # Authentification, Firebase et futurs services métier
```

### Flux d'authentification

1. L'utilisateur crée un compte ou se connecte avec Firebase Authentication.
2. À l'inscription, son profil est enregistré dans `users/{uid}` dans Firestore.
3. `authGuard` attend la résolution de l'état Firebase avant de laisser
   accéder aux routes protégées.
4. L'utilisateur est redirigé vers `/login` s'il n'est pas authentifié.
5. Après une connexion réussie, il est redirigé vers `/home`.

## Routes

| Route | Accès | État |
| --- | --- | --- |
| `/login` | Public | Connexion fonctionnelle |
| `/register` | Public | Inscription fonctionnelle |
| `/home` | Authentifié | Accueil et déconnexion fonctionnels |
| `/profile` | Authentifié | Consultation du profil fonctionnelle |
| `/movies` | Authentifié | Placeholder |
| `/movie-details` | Authentifié | Placeholder |
| `/favorites` | Authentifié | Placeholder |
| `/matching` | Authentifié | Placeholder |
| `/admin/dashboard` | Authentifié | Placeholder |
| `/admin/users` | Authentifié | Placeholder |
| `/admin/movies` | Authentifié | Placeholder |

## Modèle utilisateur

Les profils stockés dans Firestore suivent la structure suivante :

```ts
{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  photoUrl?: string;
  role: 'user' | 'admin';
  active: boolean;
  createdAt?: string;
}
```

## Limites connues

- La récupération et la modification de la photo de profil ne sont pas encore
  exposées dans l'interface.
- La recherche de films, les détails, les favoris et le matching ne sont pas
  encore reliés à une API ou à Firestore.
- Les fonctionnalités d'administration et la vérification du rôle `admin`
  doivent encore être développées.
