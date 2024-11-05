

# Auto Translate 📘

Automatically translate a Markdown file (e.g., README.md) to other languages and commit the translated version back to your repository.

# Current Translation
[Hindi](./README.hi.md) -  [French](./README.fr.md) - [Arabic](./README.ar.md) - [Chinese](./README.zh-CN.md) - [Espanol](./README.es.md) - 

## 📖 Overview

**Auto Translate** is a GitHub Action that uses Google Translate to create translated copies of Markdown files in your repository. This is especially useful for repositories with a global audience, making documentation accessible in multiple languages.

## ✨ Features

- Translates Markdown files to any specified language.
- Commits the translated file to the repository.
- Configurable commit message, committer, and additional commit options.

## 🚀 Usage

For an live firetest, please click [here](https://github.com/offensive-vk/auto-translate/tree/master/.github/workflows/test.yml) to see a perfect example of this Action.

Add the following to your `.github/workflows/translate.yml` workflow file to set up **Auto Translate** in your repository:

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
        uses: offensive-vk/auto-translate-action@master
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
          message: 'CI: Translated Markdown Files.'
```

This example translates the `README.md` file to Spanish (`es`) and commits the translated file `README.es.md` back to the repository.

### Inputs

| Input Name       | Description                                                                                  | Required | Default                                 |
|------------------|----------------------------------------------------------------------------------------------|----------|-----------------------------------------|
| `file`           | Path of the file to translate (relative to repository root). | No | `README.md` |
| `repo-token`   | GitHub token used to authenticate commits. Use `${{ secrets.GITHUB_TOKEN }}` in workflows.  | No | |
| `committer`      | The name of the committer for the commit. | No | `github-actions[bot] <github-actions[bot]@users.noreply.github.com>` |
| `commit-options` | Additional options for the `git commit` command. | No | |
| `language`       | The target language code for translation (e.g., `es`, `zh-CN`, `fr`). | No | `es` |

### Example Workflow

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

## ⚙️ Supported Languages

Use any language code supported by Google Translate (e.g., `es` for Spanish, `zh-CN` for Simplified Chinese, `fr` for French). For a full list, see [Google Translate Language Codes](https://cloud.google.com/translate/docs/languages).

## 🛠 Development

If you want to build and test the action locally, you can use [act](https://github.com/nektos/act) to run GitHub Actions in your local environment.

```bash
# Install dependencies
pnpm i

# Run action locally
act -j translate
```

## 📝 Notes

- Ensure that you add a valid `github-token` in your workflow for commit authentication.
- Translation quality depends on Google Translate and may vary based on language.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

## 🧑‍💻 Author

Created by Vedansh ([offensive-vk](https://github.com/offensive-vk)).

## 📜 License

This project is licensed under the MIT License.
