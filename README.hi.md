# स्वतः अनुवाद 📘

मार्कडाउन फ़ाइल (उदाहरण के लिए, README.md) का स्वचालित रूप से अन्य भाषाओं में अनुवाद करें और अनुवादित संस्करण को अपने भंडार में वापस भेजें।

## वर्तमान अनुवाद

[नहीं](./README.hi.md)-[फ़्रेंच](./README.fr.md)-[अरबी](./README.ar.md)-[चीनी](./README.zh-CN.md)-[एस्पैनॉल](./README.es.md)-

## 📖अवलोकन

**स्वतः अनुवाद**एक GitHub एक्शन है जो आपके रिपॉजिटरी में मार्कडाउन फ़ाइलों की अनुवादित प्रतियां बनाने के लिए Google अनुवाद का उपयोग करता है। यह वैश्विक दर्शकों वाले रिपॉजिटरी के लिए विशेष रूप से उपयोगी है, जिससे दस्तावेज़ीकरण कई भाषाओं में सुलभ हो जाता है।

## ✨ विशेषताएँ

-   मार्कडाउन फ़ाइलों का किसी निर्दिष्ट भाषा में अनुवाद करता है।
-   अनुवादित फ़ाइल को भंडार में जमा करता है।
-   कॉन्फ़िगर करने योग्य प्रतिबद्ध संदेश, कमिटर, और अतिरिक्त प्रतिबद्ध विकल्प।

## 🚀 उपयोग

लाइव फायरटेस्ट के लिए कृपया क्लिक करें[यहाँ](https://github.com/offensive-vk/auto-translate/tree/master/.github/workflows/test.yml)इस कार्रवाई का एक आदर्श उदाहरण देखने के लिए।

निम्नलिखित को अपने में जोड़ें`.github/workflows/translate.yml`सेट अप करने के लिए वर्कफ़्लो फ़ाइल**स्वतः अनुवाद**आपके भंडार में:

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

यह उदाहरण अनुवाद करता है`README.md`स्पैनिश में फ़ाइल करें (`es`) और अनुवादित फ़ाइल`README.es.md`भंडार के लिए.

### इनपुट

| इनपुट नाम        | विवरण                                                                                                                       | आवश्यक | गलती करना                                                            |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| `file`           | अनुवाद करने के लिए फ़ाइल का पथ (रिपॉजिटरी रूट के सापेक्ष)।                                                                  | नहीं   | `README.md`                                                          |
| `repo-token`     | GitHub टोकन का उपयोग प्रतिबद्धताओं को प्रमाणित करने के लिए किया जाता है। उपयोग`${{ secrets.GITHUB_TOKEN }}`कार्यप्रवाह में. | नहीं   |                                                                      |
| `committer`      | कमिट के लिए कमिटर का नाम.                                                                                                   | नहीं   | `github-actions[bot] <github-actions[bot]@users.noreply.github.com>` |
| `commit-options` | के लिए अतिरिक्त विकल्प`git commit`आज्ञा।                                                                                    | नहीं   |                                                                      |
| `language`       | अनुवाद के लिए लक्ष्य भाषा कोड (जैसे,`es`,`zh-CN`,`fr`).                                                                     | नहीं   | `es`                                                                 |

### उदाहरण वर्कफ़्लो

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

## ⚙️ समर्थित भाषाएँ

Google Translate द्वारा समर्थित किसी भी भाषा कोड का उपयोग करें (उदाहरण के लिए,`es`स्पैनिश के लिए,`zh-CN`सरलीकृत चीनी के लिए,`fr`फ़्रेंच के लिए)। पूरी सूची के लिए देखें[Google अनुवाद भाषा कोड](https://cloud.google.com/translate/docs/languages).

## 🛠विकास

यदि आप स्थानीय स्तर पर कार्रवाई का निर्माण और परीक्षण करना चाहते हैं, तो आप इसका उपयोग कर सकते हैं[कार्य](https://github.com/nektos/act)अपने स्थानीय परिवेश में GitHub क्रियाएँ चलाने के लिए।

```bash
# Install dependencies
pnpm i

# Run action locally
act -j translate
```

## 📝 नोट्स

-   सुनिश्चित करें कि आप एक वैध जोड़ें`github-token`प्रतिबद्ध प्रमाणीकरण के लिए आपके वर्कफ़्लो में।
-   अनुवाद की गुणवत्ता Google अनुवाद पर निर्भर करती है और भाषा के आधार पर भिन्न हो सकती है।

## 🤝योगदान

योगदान का स्वागत है! मुद्दे, सुविधा अनुरोध, या पुल अनुरोध सबमिट करने के लिए स्वतंत्र महसूस करें।

## 🧑‍💻लेखक

Created by Vedansh ([आक्रामक-वीके](https://github.com/offensive-vk)).

## 📜 लाइसेंस

यह प्रोजेक्ट एमआईटी लाइसेंस के तहत लाइसेंस प्राप्त है।
