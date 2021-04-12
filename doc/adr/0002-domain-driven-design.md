# 2. Domain-driven design

Date: 2021-04-12

## Status

Accepted

## Context

This project is used as a support application as well as a technical showcase application.
The code will be looked up closely so it needs to be inspirational.

## Decision

The project is organized matching Eric Evans' layered architecture :

-   a `domain` folder with the domain code
-   an `infrastructure` folder with all the technical implementations
-   an `application` folder with the usecases and presenters
-   a `presentation` folder with the controllers

See [Octo's blog post](https://blog.octo.com/application-domain-infrastructure-des-mots-de-la-layered-hexagonal-clean-architecture/) for more details.

## Consequences

Any addition to the code will need to be thought in terms of this new architecture.
The correct folder will need to be determined, then the addition will be made.
