# Configurateur PASTEL

Configurateur de salle de bain Roth construit avec React, Vite, Zustand et React Three Fiber.

## Architecture

- `src/api` — appels HTTP et transformation des payloads ;
- `src/store` — état du configurateur et de la scène ;
- `src/ui` — contrôles de sélection ;
- `src/scene` — Canvas, caméra et éclairage ;
- `src/models` — modèles GLTF et matériaux Three.js ;
- `src/visualisation` — résultat généré, produits et QR code PDF ;
- `public` — modèles, textures et images statiques ;
- `docs` — sortie production build destinée au déploiement.

## Configuration

Vite charge les variables suivantes depuis `.env.development` ou `.env.production` :

- `VITE_API_BASE_URL` — origine du backend et du catalogue ;
- `VITE_PHOTOS_BASE_URL` — base des photos produit.

## Commandes

```bash
npm ci
npm run dev
npm run lint
npm run build
npm audit
```

Node.js 22 ou une version compatible avec Vite 8 est recommandé.
