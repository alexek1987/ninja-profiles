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

I chose these particular features because I thought I could do a good job
on implementing them. I also like working with design, and when designing the card component
the idea was to stay true to the mock up while taking a few personal liberties.

I also chose a few features which were new to me, such as infinite scroll. As I was working on the filtering
I ran into several issues that forced me to rethink my approach and come up with a new solution.
At the end of the day, the feature could be greatly improved, but I believe it's of approriate robustness for the alotted time.
Although I have used UI frameworks such as Bootstrap and Tailwind, I opted not to use them in this case in order to demonstrate my ability to use vanilla CSS and flexbox.
I am using material ui- but only to import the social icons.

## Thought behind design of code

I did my best to keep the app simple and not over-engineer it. Rather than using global state, I opted to keep the logic directly in the AllNinjaProfiles component. This includes both object filtering
and mapping and infinite scroll.

I decided to work with styled components on this project becuase of the scoped styles, and the freedom it gives one to build custom components with CSS.

I'm using Framer motion for animating the cards when they load. Framer motion is a powerful tool that makes working with CSS keyframes enjoyable and fun. I tradionally used to deploy my projects to heroku, but I've more or less converted to Firebase, which is an excellent service with huge potential for NoSQL databases and seamless hosting and deployment.

## Installation notes

- Clone repo

- Run npm i

- Run npm start

## Deployed version

https://ninja-profiles.web.app/
