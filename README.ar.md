# ترجمة تلقائية 📘

[![GitHub Action Badge](https://img.shields.io/badge/Action-Auto%20Translate-blue?style=flat-square)](https://github.com/offensive-vk/auto-translate)

قم بترجمة ملف Markdown تلقائيًا (على سبيل المثال، README.md) إلى لغات أخرى وأرسل النسخة المترجمة مرة أخرى إلى مستودعك.

## 📖 نظرة عامة

**ترجمة تلقائية**هو إجراء GitHub يستخدم ترجمة Google لإنشاء نسخ مترجمة من ملفات Markdown في مستودعك. وهذا مفيد بشكل خاص للمستودعات ذات الجمهور العالمي، مما يجعل الوثائق متاحة بلغات متعددة.

## اللغات

للحصول على معلومات حول رموز لغة ISO، يرجى الانتقال إلى موقع Google الرسمي<https://cloud.google.com/translate/docs/languages>.

## ✨ المميزات

-   يترجم ملفات Markdown إلى أي لغة محددة.
-   يرسل الملف المترجم إلى المستودع.
-   رسالة التزام قابلة للتكوين، وملتزم، وخيارات التزام إضافية.

## 🚀 الاستخدام

### مثال أساسي

لإجراء اختبار إطلاق النار المباشر، من فضلك انقر[هنا](https://github.com/offensive-vk/auto-translate/tree/master/.github/workflows/test.yml)لنرى مثالا مثاليا لهذا الإجراء.

أضف ما يلي إلى الخاص بك`.github/workflows/translate.yml`ملف سير العمل للإعداد**ترجمة تلقائية**في مستودعك:

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

هذا المثال يترجم`README.md`ملف إلى الإسبانية (`es`) ويرتكب الملف المترجم`README.es.md`العودة إلى المستودع.

### المدخلات

| اسم الإدخال      | وصف                                                                                    | مطلوب | تقصير                                                                |
| ---------------- | -------------------------------------------------------------------------------------- | ----- | -------------------------------------------------------------------- |
| `file`           | مسار الملف المراد ترجمته (بالنسبة إلى جذر المستودع).                                   | لا    | `README.md`                                                          |
| `repo-token`     | يستخدم رمز GitHub لمصادقة الالتزامات. يستخدم`${{ secrets.GITHUB_TOKEN }}`في سير العمل. | نعم   |                                                                      |
| `committer`      | اسم الملتزم بالالتزام.                                                                 | لا    | `github-actions[bot] <github-actions[bot]@users.noreply.github.com>` |
| `commit-message` | رسالة الالتزام لالتزام الترجمة.                                                        | لا    | `Translated and Added README`                                        |
| `commit-options` | خيارات إضافية لل`git commit`يأمر.                                                      | لا    |                                                                      |
| `language`       | رمز اللغة الهدف للترجمة (على سبيل المثال،`es`,`zh-CN`,`fr`).                           | لا    | `es`                                                                 |

### مثال لسير العمل مع رسالة الالتزام المخصصة

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

## ⚙️ اللغات المدعومة

استخدم أي رمز لغة تدعمه خدمة الترجمة من Google (على سبيل المثال،`es`للإسبانية،`zh-CN`للصينية المبسطة،`fr`للفرنسية). للحصول على القائمة الكاملة، انظر[رموز لغة ترجمة جوجل](https://cloud.google.com/translate/docs/languages).

## 🛠 التطوير

إذا كنت ترغب في إنشاء الإجراء واختباره محليًا، فيمكنك استخدامه[يمثل](https://github.com/nektos/act)لتشغيل إجراءات GitHub في بيئتك المحلية.

```bash
# Install dependencies
npm install

# Run action locally
act -j translate
```

## 📝 ملاحظات

-   تأكد من إضافة صالح`github-token`في سير العمل الخاص بك لمصادقة الالتزام.
-   تعتمد جودة الترجمة على خدمة الترجمة من Google وقد تختلف باختلاف اللغة.

## 🤝 المساهمة

المساهمات هي موضع ترحيب! لا تتردد في إرسال المشكلات أو طلبات الميزات أو طلبات السحب.

## 🧑‍💻 المؤلف

تم إنشاؤها بواسطة فيدانش ([هجوم-vk](https://github.com/offensive-vk)).

## 📜 الترخيص

هذا المشروع مرخص بموجب ترخيص MIT.
