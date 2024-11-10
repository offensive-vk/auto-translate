# Traduction automatique 📘

Cette action traduit automatiquement un fichier Markdown (par exemple, README.md) dans n'importe quelle autre langue à l'aide des options. Cependant, cette action ne traite pas les balises HTML et autres formats complexes dans le fichier markdown.

## Traduction actuelle

[Anglais](./README.md)-[Non](./README.hi.md)-[Français](./README.fr.md)-[arabe](./README.ar.md)-[Chinois](./README.zh-CN.md)-[espagnol](./README.es.md)

## 📖 Aperçu

**Traduction automatique**est une action GitHub qui utilise Google Translate pour créer des copies traduites des fichiers Markdown dans votre référentiel. Ceci est particulièrement utile pour les référentiels ayant une audience mondiale, rendant la documentation accessible dans plusieurs langues.

## ✨ Caractéristiques

-   Traduit les fichiers Markdown dans n'importe quelle langue spécifiée.
-   Valide le fichier traduit dans le référentiel.
-   Message de validation configurable, committer et options de validation supplémentaires.

## 🚀 Usage

Pour un test d'incendie en direct, veuillez cliquer[ici](https://github.com/offensive-vk/auto-translate/tree/master/.github/workflows/test.yml)pour voir un exemple parfait de cette action.

Ajoutez ce qui suit à votre`.github/workflows/translate.yml`fichier de workflow à configurer**Traduction automatique**dans votre dépôt :

```yaml
name: Translate Action
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

      - name: Auto Translate
        uses: offensive-vk/auto-translate@v7
        with:
          file: 'README.md'
          language: 'es'

      - name: Commit and Push
        uses: offensive-vk/auto-commit-push@v7
        with: 
          branch: 'master'
          name: 'TheHamsterBot'
          email: 'TheHamsterBot@outlook.com'
          github-token: ${{ secrets.BOT_TOKEN }}
          message: 'CI: Translated Markdown File.'
```

Cet exemple traduit le`README.md`fichier en espagnol (`es`) et le fichier traduit`README.es.md`au référentiel.

### Entrées

| Nom d'entrée     | Description                                                                                                        | Requis | Défaut                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------ | -------------------------------------------------------------------- |
| `file`           | Chemin du fichier à traduire (par rapport à la racine du référentiel).                                             | Non    | `README.md`                                                          |
| `repo-token`     | Jeton GitHub utilisé pour authentifier les commits. Utiliser`${{ secrets.GITHUB_TOKEN }}`dans les flux de travail. | Non    |                                                                      |
| `committer`      | Le nom du committer pour la validation.                                                                            | Non    | `github-actions[bot] <github-actions[bot]@users.noreply.github.com>` |
| `commit-options` | Options supplémentaires pour le`git commit`commande.                                                               | Non    |                                                                      |
| `language`       | Le code de la langue cible pour la traduction (par exemple,`es`,`zh-CN`,`fr`).                                     | Non    | `es`                                                                 |

### Exemple de flux de travail

```yaml
name: Translate Multilingual Readme
on:
  workflow_dispatch:

jobs:
  translate:
    strategy:
      matrix:
        lang: ['es', 'hi', 'fr', 'zh-CN', 'ar']
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Auto Translate README to French
        uses: offensive-vk/auto-translate@master
        with:
          file: 'README.md'
          language: ${{ matrix.lang }}

      - name: Commit and Push
        uses: offensive-vk/auto-commit-push@v7
        with: 
          branch: 'master'
          name: 'TheHamsterBot'
          email: 'TheHamsterBot@outlook.com'
          github-token: ${{ secrets.BOT_TOKEN }}
          message: 'Translated Markdown ${{ matrix.lang }} File.'
```

## ⚙️ Langues prises en charge

Utilisez n'importe quel code de langue pris en charge par Google Translate (par exemple,`es`pour l'espagnol,`zh-CN`pour le chinois simplifié,`fr`pour le français). Pour une liste complète, voir[Codes de langue Google Translate](https://cloud.google.com/translate/docs/languages).

## 🛠 Développement

Si vous souhaitez créer et tester l'action localement, vous pouvez utiliser[acte](https://github.com/nektos/act)pour exécuter GitHub Actions dans votre environnement local.

```bash
# Install dependencies
pnpm i

# Run action locally
act -j translate
```

## 📝 Remarques

-   Assurez-vous d'ajouter un nom valide`github-token`dans votre flux de travail pour l'authentification de validation.
-   La qualité de la traduction dépend de Google Translate et peut varier en fonction de la langue.

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des problèmes, des demandes de fonctionnalités ou des demandes d'extraction.

## 🧑‍💻 Auteur

Créé par Vedansh ([offensive-vk](https://github.com/offensive-vk)).

## 📜 Licence

Ce projet est sous licence[AVEC](LICENSE)Licence.

* * *

<p align="center">
  <i>&copy; <a href="https://github.com/offensive-vk/">Vedansh </a> 2020 - Present</i><br>
  <i>Licensed under <a href="https://github.com/offensive-vk/auto-translate?tab=MIT-1-ov-file">MIT</a></i><br>
  <a href="https://github.com/TheHamsterBot"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" alt="hamster"/></a><br>
  <sup>Thanks for visiting :)</sup>
</p>
