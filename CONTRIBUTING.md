# Contributing to depa testing frontend

Welcome to depa-testing-frontend, these are guidelines that will help you get the picture and understand how to contribute to this project. Let's do it.

### Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Steps](#development-steps)
- [Project structure](#project-structure)
- [Create New Page](#create-new-page)
- [Create New Component](#create-new-component)
- [Sending a Pull Request](#sending-a-pull-request)
- [Become a maintainer](#become-a-maintainer)

## Code of Conduct

depa testing frontend has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it.
Please read [the full content](/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Development Steps

After you pull the project to local, run this command in the root of the directory.

```
yarn install && yarn start
```

then you will see the site in `localhost:3000`

## Project structure

located in root folder

```
depa-testing-frontend
├── src
│   ├── ...
│   ├── api
│   ├── components
│   ├── constants
│   ├── elements
│   ├── fonts
│   ├── images
│   ├── libs
│   ├── pages
│   ├── services
│   └── tools
└── ...
```

- `api` to store the api instance
- `components` to store components in system
- `constants` to store global constant that we can reuse to other part in project
- `elements` to store tiny components that we can reuse to other part in project
- `fonts` to store fonts in system
- `images` to store images in system
- `libs` to store implementation of library that we use
- `pages` to store the pages in system
- `services` to store api path that our api service provide

## Create New Page

To create new pages you can create a page at `pages` directory and then you must add the new path at `App.js`

## Create New Component

We highly emphasize in `(S)ingle Responsibility` in `S.O.L.I.D Principle` and `(O)pen-Closed` if has it's would be good. Thanks the knowledge from [Can you apply SOLID principles to your React applications ?](https://dev.to/shadid12/can-you-apply-solid-principles-to-your-react-applications-46il)

For `Single Responsibility` we design each component to 2 parts, you can see `container.js` and `index.js` in each component directory. `container.js` stores the logic (API also called here) of the component and `index.js` is a presentation file so this is a dump components that we will pass props to here and it's will show the data

## Commit Message Guideline

We have commit style guide in this project

Start commit message with [gitmoji](https://gitmoji.carloscuesta.me/) follow by with what you do. Each emoji has a meaning and it will help other people easy to understand what you involve with

e.g. `🐛 Form was sent without validation after press enter button`.

In this case it's mean you work around with the bug and bug is form send without validation

## Sending a Pull Request

We proudly to have a contributer, you can clone this project then `create new branch` and developed then `open pull request` to `master` branch.

We don't have a integration branch like `develop` branch so please make sure that your code work and the test is pass, we will help you review your code before merge to master branch.

## Become a maintainer

Yeah, after read above you're ready to become the maintainer. Let's start and Open pull request and don't forget to add your name in `README.MD` at the `contributer` section.

**Enjoy coding, Thank you !!**
