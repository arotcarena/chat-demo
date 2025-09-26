# Configuration TanStack Router

## Structure des routes

L'application utilise maintenant TanStack Router avec la structure suivante :

```
src/
├── routes/
│   ├── __root.tsx          # Route racine avec navigation
│   ├── index.tsx           # Page d'accueil (/)
│   └── about.tsx           # Page à propos (/about)
├── router.tsx              # Configuration du router
└── routeTree.gen.ts        # Arbre de routes généré automatiquement
```

## Routes disponibles

1. **/** - Page d'accueil
   - Affiche le chat si l'utilisateur est connecté
   - Affiche le formulaire de connexion sinon

2. **/about** - Page à propos
   - Page d'information sur l'application
   - Exemple de route simple

## Fonctionnalités

- Navigation type-safe avec TypeScript
- Layout partagé avec navigation en haut
- Gestion de l'authentification intégrée
- DevTools pour le développement

## Installation des dépendances

Pour installer TanStack Router, exécutez :

```bash
npm install @tanstack/react-router @tanstack/router-vite-plugin @tanstack/router-devtools
```

## Configuration Vite

Le plugin Vite est configuré dans `vite.config.ts` pour la génération automatique des routes.

## Utilisation

Les routes sont automatiquement générées à partir des fichiers dans le dossier `src/routes/`. 
Chaque fichier `.tsx` dans ce dossier devient une route.
