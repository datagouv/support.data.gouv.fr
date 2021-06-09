[data.gouv.fr](https://data.gouv.fr) support application.

# Installation

- `cp .env.dist .env`
- Adjust the `.env` file with development settings
- `npm install`

# Development

- `npm run start:dev`

# Configuration

In order to change the displayed question tree, one might change the `config/question-tree.yaml` file.

This file is written in [YAML](https://fr.wikipedia.org/wiki/YAML#:~:text=YAML%2C%20acronyme%20de%20Yet%20Another,de%20donn%C3%A9es%20par%20s%C3%A9rialisation%20Unicode.).

It starts with a top-level question, consisting in a `title`, and `choices` on which the user can click.

Each item of the `choices` attribute consists in a `label` displayed on the webpage, a `link` which can be a new question or an answer, and an `id` used to identify the choice.

The `id` must be URL-friendly, it consists of one or many lowecase words separated by `-`.

A new question follows the same structure as the top-level question.

An answer can be of three types :

- a `path` attribute, which must be a relative path to a markdown file containing the content to display
- a `content` attribute, which is the raw html displayed content
- a `form` attribute, which represents a ticket submission form, with the following properties:
  - `title`: the contact form title, displayed at the top
  - `recipient`: the target email address **handled by [Etalab's Zammad](https://support.etalab.gouv.fr)**

# Tests

- `npm run test`

# Architecture decision records

1.  [Record architecture decisions](./doc/adr/0001-record-architecture-decisions.md)
2.  [Domain-driven design](./doc/adr/0002-domain-driven-design.md)
3.  [Server-side rendering](./doc/adr/0003-server-side-rendering.md)

# Inspirations

- [api.gouv.fr support page](https://api.gouv.fr/parcours-client)
