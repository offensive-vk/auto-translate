# 自动翻译 📘

[![GitHub Action Badge](https://img.shields.io/badge/Action-Auto%20Translate-blue?style=flat-square)](https://github.com/offensive-vk/auto-translate)

自动将 Markdown 文件（例如 README.md）翻译为其他语言，并将翻译后的版本提交回您的存储库。

## 📖 概述

**自动翻译**是一个 GitHub Action，它使用 Google Translate 在存储库中创建 Markdown 文件的翻译副本。这对于拥有全球受众的存储库特别有用，可以以多种语言访问文档。

## 语言

有关 ISO 语言代码的信息，请导航至 google 官方网站<https://cloud.google.com/translate/docs/languages>.

## ✨ 特点

-   将 Markdown 文件翻译为任何指定的语言。
-   将翻译后的文件提交到存储库。
-   可配置的提交消息、提交者和其他提交选项。

## 🚀 用法

### 基本示例

如需实弹测试，请点击[这里](https://github.com/offensive-vk/auto-translate/tree/master/.github/workflows/test.yml)查看此操作的完美示例。

将以下内容添加到您的`.github/workflows/translate.yml`要设置的工作流程文件**自动翻译**在你的存储库中：

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

这个例子翻译的是`README.md`文件为西班牙语 (`es`) 并提交翻译后的文件`README.es.md`返回到存储库。

### 输入

| 输入名称             | 描述                                                     | 必需的 | 默认                                                                   |
| ---------------- | ------------------------------------------------------ | --- | -------------------------------------------------------------------- |
| `file`           | 要翻译的文件的路径（相对于存储库根）。                                    | 不   | `README.md`                                                          |
| `repo-token`     | GitHub 令牌用于验证提交。使用`${{ secrets.GITHUB_TOKEN }}`在工作流程中。 | 是的  |                                                                      |
| `committer`      | 提交的提交者的名称。                                             | 不   | `github-actions[bot] <github-actions[bot]@users.noreply.github.com>` |
| `commit-message` | 翻译提交的提交消息。                                             | 不   | `Translated and Added README`                                        |
| `commit-options` | 附加选项`git commit`命令。                                    | 不   |                                                                      |
| `language`       | 翻译的目标语言代码（例如，`es`,`zh-CN`,`fr`).                       | 不   | `es`                                                                 |

### 具有自定义提交消息的示例工作流程

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

## ⚙️ 支持的语言

使用 Google 翻译支持的任何语言代码（例如，`es`对于西班牙语，`zh-CN`对于简体中文，`fr`对于法语）。有关完整列表，请参阅[谷歌翻译语言代码](https://cloud.google.com/translate/docs/languages).

## 🛠 发展

如果您想在本地构建和测试操作，您可以使用[行为](https://github.com/nektos/act)在本地环境中运行 GitHub Actions。

```bash
# Install dependencies
npm install

# Run action locally
act -j translate
```

## 📝 注释

-   确保您添加了有效的`github-token`在您的提交身份验证工作流程中。
-   翻译质量取决于 Google 翻译，并且可能因语言而异。

## 🤝 贡献

欢迎贡献！请随意提交问题、功能请求或拉取请求。

## 🧑‍💻 作者

创建者：Vedansh ([进攻-vk](https://github.com/offensive-vk)).

## 📜 许可证

该项目已获得 MIT 许可证的许可。
