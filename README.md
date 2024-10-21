# Auto Translate Action

## README Translation
- [English](README.md)
- [简体中文](README.zh-CN.md)
- [繁体中文](README.zh-TW.md)
- [हिंदी](README.hi.md)
- [Française](README.fr.md)
- [عربى](README.ar.md)

**GitHub Action to translate Readme to any language**

This is a GitHub Action that automatically translate the readme in your repo to a specified language. Currently it's in development for <> Tags. It doesn't work perfectly.

## Setup

1. **Add a workflow file** to your project (e.g. `.github/workflows/readme.yml`):
```yaml
name: Translate Files

on:
  push:
    branches:
      - master
jobs:
  translate:
    name: Translate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - name: Adding README - Chinese Simplified
        uses: offensive-vk/auto-translate@master
        with:
          lang: zh-CN

      - name: Adding README - Chinese Traditional
        uses: offensive-vk/auto-translate@master
        with:
          lang: zh-TW

      - name: Adding README - Hindi
        uses: offensive-vk/auto-translate@master
        with:
          lang: hi

      - name: Adding README - Arabic
        uses: offensive-vk/auto-translate@master
        with:
          lang: ar

      - name: Adding README - French
        uses: offensive-vk/auto-translate@master
        with:
          lang: fr
```

## Configuration

| `github-token` | Github Token for Bearer Authorization. | `${{ secrets.GITHUB_TOKEN }} | 

### Options

You can configure the action further with the following options:

- `lang`: The language you want to translate your readme to. The default is Simplified Chinese. (I'm a Ghanaian) The supported languages can be found below.
  (default: `zh-CH`) (required: `false`)

## Supported languages

languages supported can be found here https://cloud.google.com/translate/docs/languages

### Issues

Check [here](https://github.com/offensive-vk/auto-translate/issues/1) for issues related to this action.

### Development

Suggestions and contributions are always welcome!

### LICENSE

[MIT](./LICENSE)
