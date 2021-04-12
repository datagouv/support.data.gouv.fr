# 3. Server-side rendering

Date: 2021-04-12

## Status

Accepted

## Context

The application is very simple, only one page is displayed.
The support question tree must be reactive to deliver the best user experience.
A single-page application is overkill in this context.

## Decision

The application renders server templates.

It uses "html-over-the-wire" techniques implemented by [Turbo](https://turbo.hotwire.dev/) in the frontend to dynamically load html pages from the back.

## Consequences

No custom javascript is needed, and the user experience is at its best.

All html is rendered in the backend.
