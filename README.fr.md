# Traduction automatique 📘

[![GitHub Action Badge](https://img.shields.io/badge/Action-Auto%20Translate-blue?style=flat-square)](https://github.com/offensive-vk/auto-translate)

Traduisez automatiquement un fichier Markdown (par exemple, README.md) dans d'autres langues et renvoyez la version traduite à votre référentiel.

## 📖 Aperçu

**Traduction automatique**est une action GitHub qui utilise Google Translate pour créer des copies traduites des fichiers Markdown dans votre référentiel. Ceci est particulièrement utile pour les référentiels ayant une audience mondiale, rendant la documentation accessible dans plusieurs langues.

## Langues

Pour plus d'informations sur les codes de langue ISO, veuillez accéder au site officiel de Google.<https://cloud.google.com/translate/docs/languages>.

## ✨ Caractéristiques

-   Traduit les fichiers Markdown dans n'importe quelle langue spécifiée.
-   Valide le fichier traduit dans le référentiel.
-   Message de validation configurable, committer et options de validation supplémentaires.

## 🚀 Usage

### Exemple de base

Pour un test d'incendie en direct, veuillez cliquer[ici](https://github.com/offensive-vk/auto-translate/tree/master/.github/workflows/test.yml)pour voir un exemple parfait de cette action.

Ajoutez ce qui suit à votre`.github/workflows/translate.yml`fichier de workflow à configurer**Traduction automatique**dans votre dépôt :

```yaml
name: Translate README
on:
  push:
    branches:
      - main

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Auto Translate README
        uses: offensive-vk/auto-translate-action@master
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          file: 'README.md'
          language: 'es'
```

Cet exemple traduit le`README.md`fichier en espagnol (`es`) et valide le fichier traduit`README.es.md`retour au référentiel.

### Entrées

| Nom d'entrée     | Description                                                                                                        | Requis | Défaut                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------ | -------------------------------------------------------------------- |
| `file`           | Chemin du fichier à traduire (par rapport à la racine du référentiel).                                             | Non    | `README.md`                                                          |
| `repo-token`     | Jeton GitHub utilisé pour authentifier les commits. Utiliser`${{ secrets.GITHUB_TOKEN }}`dans les flux de travail. | Oui    |                                                                      |
| `committer`      | Le nom du committer pour la validation.                                                                            | Non    | `github-actions[bot] <github-actions[bot]@users.noreply.github.com>` |
| `commit-message` | Le message de validation pour la validation de traduction.                                                         | Non    | `Translated and Added README`                                        |
| `commit-options` | Options supplémentaires pour le`git commit`commande.                                                               | Non    |                                                                      |
| `language`       | Le code de la langue cible pour la traduction (par exemple,`es`,`zh-CN`,`fr`).                                     | Non    | `es`                                                                 |

### Exemple de flux de travail avec un message de validation personnalisé

```yaml
name: Translate README
on:
  workflow_dispatch:

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Auto Translate README to French
        uses: offensive-vk/auto-translate-action@master
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          file: 'README.md'
          language: 'fr'
```

## ⚙️ Langues prises en charge

Utilisez n'importe quel code de langue pris en charge par Google Translate (par exemple,`es`pour l'espagnol,`zh-CN`pour le chinois simplifié,`fr`pour le français). Pour une liste complète, voir[Codes de langue Google Translate](https://cloud.google.com/translate/docs/languages).

## 🛠 Développement

Si vous souhaitez créer et tester l'action localement, vous pouvez utiliser[acte](https://github.com/nektos/act)pour exécuter GitHub Actions dans votre environnement local.

```bash
# Install dependencies
npm install

# Run action locally
act -j translate
```

## 📝 Remarques

-   Assurez-vous d'ajouter un`github-token`dans votre flux de travail pour l'authentification de validation.
-   La qualité de la traduction dépend de Google Translate et peut varier en fonction de la langue.

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des problèmes, des demandes de fonctionnalités ou des demandes d'extraction.

## 🧑‍💻 Auteur

Créé par Vedansh ([offensive-vk](https://github.com/offensive-vk)).

## 📜 Licence

Ce projet est sous licence MIT.
