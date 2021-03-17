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
the idea was to stay true to the mock up but also add my own slick and clean details to it.
I also chose a few features which I hadn't done before, such as infinite scroll, because
I think it's a nice feature, and I've already implemented it on other projects of mine too,
after learning how to do it for this challenge! I decided to work with styled-components on this
project becuase of the scoped styles, and the freedom it gives you to build custom
components with CSS. I'm using Framer motion for animating the cards when they load,
the reason for that is becaue it's a really nice tool that makes working with CSS keyframes
enjoyable and fun, and it's really powerful. I tradionally used to deploy my projects to heroku,
but I've more or less converted to Firebase, I think the guys at Firebase have created an
excellent service with huge potential for no sql databases and seamless hosting and deployment,
and I am a huge supporter.


## Thought behind design of code

I wanted to keep the app simple, and not over-engineer it. That's why instead of splitting up some of the logic in the AllNinjaProfiles component and using global state, for example. Both filtering
and mapping through the object and logic for infinite scroll is in there. Instead I'm using a custom hook to keep the fetching of data seperate.

## Installation notes

- Clone repo

- Run npm i

- Run npm start

## Deployed version

https://ninja-profiles.web.app/
