# Trustpilot Challenge

Pony Challenge API Solution by Airat Yusuff.

Live at: ***https://tp-challenge.netlify.app/***


## Table of contents

- [Setup](#setup)
- [Repo Structure](#repo-structure)
- [Technologies/Resources](#technologies)
- [Integrations](#integrations)
- [Miscellaneous](#miscellaneous)

## Setup

| Tool | Version  |
| ---- | -------- |
| Node | `v18+`   |
| Vite | `v5.0.11`|
| npm  | `v7+`    |

```
$ npm create vite@latest trustpilot-challenge -- --template react-swc
$ npm install
$ npm run dev
```

## Repo Structure
```
/
|
├─ public/             # for logos/images used via urls, without direct imports
|
├─ src/
│  ├─ assets/          # Logos/images for direct imports
│  │
│  ├─ components/
│  │  ├─ actions/
│  │  │  └─  gameActions.js      # API calls
│  │  │
│  │  ├─ UI/                     # Components used to create the game UI             
│  │  │  ├─  buttonNavigation.js
│  │  │  ├─  gameDetails.js
│  │  │  ├─  gameGuide.js
│  │  │  ├─  gameHeader.js
│  │  │  └─  maze.js
│  │  │
│  │  ├─ button.jsx              # Other reusable components
│  │  ├─ modal.jsx
│  │  ├─ select.jsx
│  │  └─ textinput.jsx
│  │
│  ├─ config/
│  │  ├─ axios.js
│  │  └─ index.js               # extra data
│  │
│  ├─ App.jsx                   # Main Game component
│  ├─ App.test.js               # Tests file
│  ├─ index.scss
│  └─ main.jsx
│
├─ ...
├─ fileMock.js                  # Mock logo file import
├─ index.html
├─ ...
├─ package.json             
├─ README.md                # This file
│
└─ ...
```

---

## Technologies

- <a href="https://reactjs.org/" target="_blank">React</a>

- <a href="https://vitejs.dev/" target="_blank">Vite</a>

- <a href="https://tailwindcss.com/docs/installation/" target="_blank">TailwindCSS</a>

---

## Integrations

- <a href="https://ponychallenge.trustpilot.com/index.html" target="_blank">Trustpilot Pony Challenge</a>

Others - can be found in package.json

---

## Miscellaneous

