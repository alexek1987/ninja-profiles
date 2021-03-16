## Introduction

This is a profiles page of the current amazing employees at tretton37.

## design/accessibility:

Fancy animations ( 1 pt)

A modern design ( 1 pt)

No UI framework used (such as Bootstrap, Ant) (1 pt)

Responsive design, works on mobile and tablets (2 pt)

## functionality:

Filter by name and office (1 pt)

Filter by contact links ( 1 pt)

Available on a free public url (such as Azure, Heroku) ( 1 pt)

Only render a set of profiles using either infinity scroll, pagination or load more button ( 2 pt)

## testing/QA

Works in Chrome, Firefox, Edge (1pt)

Works in IE11 ( 1 pt)

## Choice of features

I pretty much chose a lot of these features because I thought I could do a good job
on implementing them, I like working with design, and when designing the card component
the idea was to stay true to the mock up but also add my own slick and clean details to it
and I also chose a few features which I hadn't done before, such as the infinite infinite scroll feature.

## Thought behind design of code

I wanted to keep the app simple, and not over-engieer it. That's my instead of splitting up some of the logic in the AllNinjaProfiles component and using global state, for example. Both filtering
and mapping through the object and logic for infinite scroll is in there. Instead in using a custom hook to keep the fetching seperate.

## Installation notes

-Clone repo

- Run npm i

- Run npm start
