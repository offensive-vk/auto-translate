# Автоматический перевод 📘

Автоматически переведите файл Markdown (например, README.md) на другие языки и зафиксируйте переведенную версию обратно в свой репозиторий.

## Текущий перевод

[Неа](./README.hi.md)-[Французский](./README.fr.md)-[арабский](./README.ar.md)-[китайский](./README.zh-CN.md)-[испанский](./README.es.md)-

## 📖 Обзор

**Автоматический перевод**— это действие GitHub, которое использует Google Translate для создания переведенных копий файлов Markdown в вашем репозитории. Это особенно полезно для репозиториев с глобальной аудиторией, поскольку документация становится доступной на нескольких языках.

## ✨ Особенности

-   Переводит файлы Markdown на любой указанный язык.
-   Фиксирует переведенный файл в репозиторий.
-   Настраиваемое сообщение о фиксации, коммиттер и дополнительные параметры фиксации.

## 🚀 Использование

Для живого огневого испытания, пожалуйста, нажмите[здесь](https://github.com/offensive-vk/auto-translate/tree/master/.github/workflows/test.yml)чтобы увидеть прекрасный пример этого действия.

Добавьте следующее в свой`.github/workflows/translate.yml`файл рабочего процесса для настройки**Автоматический перевод**в вашем репозитории:

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

Этот пример переводит`README.md`файл на испанский (`es`) и переведенный файл`README.es.md`в хранилище.

### Входы

| Имя входа        | Описание                                                                                                              | Необходимый | По умолчанию                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| `file`           | Путь к файлу для перевода (относительно корня репозитория).                                                           | Нет         | `README.md`                                                          |
| `repo-token`     | Токен GitHub, используемый для аутентификации коммитов. Использовать`${{ secrets.GITHUB_TOKEN }}`в рабочих процессах. | Нет         |                                                                      |
| `committer`      | Имя коммиттера коммита.                                                                                               | Нет         | `github-actions[bot] <github-actions[bot]@users.noreply.github.com>` |
| `commit-options` | Дополнительные возможности для`git commit`команда.                                                                    | Нет         |                                                                      |
| `language`       | Код целевого языка для перевода (например,`es`,`zh-CN`,`fr`).                                                         | Нет         | `es`                                                                 |

### Пример рабочего процесса

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

## ⚙️ Поддерживаемые языки

Используйте любой код языка, поддерживаемый Google Translate (например,`es`для испанского,`zh-CN`для упрощенного китайского,`fr`для французского языка). Полный список см.[Коды языков Google Translate](https://cloud.google.com/translate/docs/languages).

## 🛠 Развитие

Если вы хотите создать и протестировать действие локально, вы можете использовать[действовать](https://github.com/nektos/act)для запуска действий GitHub в вашей локальной среде.

```bash
# Install dependencies
pnpm i

# Run action locally
act -j translate
```

## 📝 Заметки

-   Убедитесь, что вы добавили действительный`github-token`в вашем рабочем процессе для аутентификации фиксации.
-   Качество перевода зависит от Google Translate и может различаться в зависимости от языка.

## 🤝 Содействие

Вклады приветствуются! Не стесняйтесь сообщать о проблемах, запросах функций или запросах на включение.

## 🧑‍💻 Автор

Создано Веданш ([наступление-вк](https://github.com/offensive-vk)).

## 📜 Лицензия

Этот проект лицензируется по лицензии MIT.
