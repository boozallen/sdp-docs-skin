# SDP Documentation UI Bundle

This repository serves as a UI Bundle for [Antora](https://antora.org/).

## Antora Overview

Antora is a static site generator for documentation distributed across multiple source locations, with
each component being able to have multiple versions of the documentation.

The styling of this documentation can be developed independently of the content that will
be pulled from these remote repositories, and that is the purpose of this repository.

For more background on Antora, refer to the [documentation](https://docs.antora.org/antora/2.2/)

## Local Development

Clone this repository and follow the steps below to begin working on this UI.

### Install Dependencies

From the root of this repository, run `npm install` to pull down all required 3rd party dependencies.

### Run a hot-reloading local version

From the root of this repository, run `gulp preview`. A local version of the site with some mock
content will be available at `http://localhost:3000`.

#### Preview Site Information

Antora has what's called a "site generation pipeline" that is responsible for aggregating the documentation
from the sources and subsequently outputting static HTML.

For the purposes of local development, there is a `preview-src` directory that gets used in combination
with a mock site generation process (defined in `gulp.d/tasks/build-preview-pages.js`).

The Antora framework exposes a UI Model to the [handlebars templates](https://handlebarsjs.com/guide/). This
UI Model is mocked via a hard-coded yml file (`preview-src/ui-model.yml`).

Rather than pull content from remote sources, a single page (`preview-src/index.adoc`) is used for local development of this UI.

## Bundling the UI

From the root of this repository, run `npm run bundle`. This will produce a UI bundle that can be consumed by the Antora
framework for styling the documentation. The artifact will be in the generated root directory and called `ui-bundle.zip`.

## Integration Testing

Once the preview site looks and feels as desired, you can create a Release in GitHub and attach the UI bundle as
a release artifact.

The URL of this downloadable bundle can now be used in an Antora playbook to build a real documentation site.
