# Traducción automática 📘

[![GitHub Action Badge](https://img.shields.io/badge/Action-Auto%20Translate-blue?style=flat-square)](https://github.com/offensive-vk/auto-translate)

Traduzca automáticamente un archivo Markdown (por ejemplo, README.md) a otros idiomas y envíe la versión traducida a su repositorio.

## 📖 Descripción general

**Traducción automática**es una acción de GitHub que utiliza Google Translate para crear copias traducidas de archivos Markdown en su repositorio. Esto es especialmente útil para repositorios con una audiencia global, ya que hace que la documentación sea accesible en varios idiomas.

## Idiomas

Para obtener información sobre los códigos de idioma ISO, navegue hasta el sitio web oficial de Google.<https://cloud.google.com/translate/docs/languages>.

## ✨ Características

-   Traduce archivos Markdown a cualquier idioma especificado.
-   Envía el archivo traducido al repositorio.
-   Mensaje de confirmación configurable, confirmador y opciones de confirmación adicionales.

## 🚀 Uso

### Ejemplo básico

Para una prueba de fuego real, haga clic[aquí](https://github.com/offensive-vk/auto-translate/tree/master/.github/workflows/test.yml)para ver un ejemplo perfecto de esta Acción.

Añade lo siguiente a tu`.github/workflows/translate.yml`archivo de flujo de trabajo para configurar**Traducción automática**en tu repositorio:

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

Este ejemplo traduce el`README.md`archivo al español (`es`) y confirma el archivo traducido`README.es.md`volver al repositorio.

### Entradas

| Nombre de entrada | Descripción                                                                                                          | Requerido | Por defecto                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------- |
| `file`            | Ruta del archivo a traducir (relativa a la raíz del repositorio).                                                    | No        | `README.md`                                                          |
| `repo-token`      | Token de GitHub utilizado para autenticar confirmaciones. Usar`${{ secrets.GITHUB_TOKEN }}`en los flujos de trabajo. | Sí        |                                                                      |
| `committer`       | El nombre del confirmador de la confirmación.                                                                        | No        | `github-actions[bot] <github-actions[bot]@users.noreply.github.com>` |
| `commit-message`  | El mensaje de confirmación para la confirmación de traducción.                                                       | No        | `Translated and Added README`                                        |
| `commit-options`  | Opciones adicionales para el`git commit`dominio.                                                                     | No        |                                                                      |
| `language`        | El código del idioma de destino para la traducción (p. ej.,`es`,`zh-CN`,`fr`).                                       | No        | `es`                                                                 |

### Flujo de trabajo de ejemplo con mensaje de confirmación personalizado

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

## ⚙️ Idiomas admitidos

Utilice cualquier código de idioma admitido por Google Translate (p. ej.,`es`para español,`zh-CN`para chino simplificado,`fr`para francés). Para obtener una lista completa, consulte[Códigos de idioma del Traductor de Google](https://cloud.google.com/translate/docs/languages).

## 🛠 Desarrollo

Si desea compilar y probar la acción localmente, puede usar[acto](https://github.com/nektos/act)para ejecutar GitHub Actions en su entorno local.

```bash
# Install dependencies
npm install

# Run action locally
act -j translate
```

## 📝 Notas

-   Asegúrese de agregar un válido`github-token`en su flujo de trabajo para la autenticación de confirmación.
-   La calidad de la traducción depende de Google Translate y puede variar según el idioma.

## 🤝 Contribuyendo

¡Las contribuciones son bienvenidas! No dude en enviar problemas, solicitudes de funciones o solicitudes de extracción.

## 🧑‍💻 Autor

Creado por Vedansh ([ofensivo-vk](https://github.com/offensive-vk)).

## 📜 Licencia

Este proyecto está bajo la licencia MIT.
