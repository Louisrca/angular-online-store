# AngularOnlineStore

Une application e-commerce moderne développée avec Angular 20.3.1, déployée sur Vercel et configurée en Progressive Web App (PWA).

🌐 **Application en ligne** : [https://angular-online-store-one.vercel.app/](https://angular-online-store-one.vercel.app/)

## 🚀 Fonctionnalités

### 🛍️ Partie Shop (Client)

- **Catalogue produits** : Navigation et recherche dans le catalogue
- **Panier d'achat** : Ajout/suppression d'articles avec gestion des quantités
- **Validation du panier** : Récapitulatif avant commande
- **Système de paiement** : Processus de paiement
- **Historique des commandes** : Consultation des commandes passées

### 👨‍💼 Partie Admin

- **Dashboard** : Vue d'ensemble avec les chiffres clés
  - Nombre total de commandes passées
  - Nombre d'utilisateurs enregistrés
  - Revenus générés par les commandes
- **Gestionnaire de catalogue** : Ajout, suppression et modification de la quantité des produits 
- **Gestionnaire d'utilisateurs** : Administration des comptes utilisateurs

### ⚡ Technologies utilisées

- **Framework** : [Angular CLI](https://github.com/angular/angular-cli) v20.3.1
- **Composants UI** : [PrimeNG](https://primeng.org/) - Bibliothèque de composants riche et moderne
- **Icônes** : [ng-icons](https://ng-icons.github.io/ng-icons/#/) - Collection d'icônes pour Angular
- **PWA** : Progressive Web App pour une expérience mobile
- **Déploiement** : [Vercel](https://vercel.com/) pour un déploiement continu

## 🛠️ Développement

### Serveur de développement

Pour démarrer un serveur de développement local :

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200/`. Le rechargement automatique est activé lors des modifications de fichiers.

### Génération de code

Angular CLI inclut des outils de scaffolding puissants. Pour générer un nouveau composant :

```bash
ng generate component component-name
```

Pour voir la liste complète des schémas disponibles (composants, directives, pipes, etc.) :

```bash
ng generate --help
```

### Build de production

Pour compiler le projet :

```bash
ng build
```

Les artefacts de build seront stockés dans le répertoire `dist/`. Par défaut, le build de production optimise l'application pour les performances.

## 🧪 Tests

### Tests unitaires

Les tests unitaires utilisent **Karma** et **Jasmine** :

```bash
ng test
```

## 📱 Progressive Web App (PWA)

L'application est configurée en PWA, offrant :

- Installation sur l'écran d'accueil
- Fonctionnement hors ligne
- Notifications push
- Performance optimisée

## 🚀 Déploiement

L'application est automatiquement déployée sur Vercel à chaque push sur la branche principale.

**URL de production** : [https://angular-online-store-one.vercel.app/](https://angular-online-store-one.vercel.app/)

## 📚 Ressources supplémentaires

- [Documentation Angular CLI](https://angular.dev/tools/cli)
- [Guide PrimeNG](https://primeng.org/installation)
- [Documentation ng-icons](https://ng-icons.github.io/ng-icons/#/)
- [Guide PWA Angular](https://angular.dev/guide/service-workers)

## 🤝 Contribution

Pour contribuer au projet :

1. Fork le repository
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request
