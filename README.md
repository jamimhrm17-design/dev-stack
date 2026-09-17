# Dev Stack

A visual "technology picker" web app where you browse frontend, backend,
database, language, styling, DevOps, and tooling technologies as cards, and
build your own personal development stack by adding and removing items from
a live sidebar.

## Description

Dev Stack helps a developer (or a student picking tools for a new project)
quickly compare popular technologies side by side — rating, difficulty
level, category, and a short description — and collect the ones they want
into a single "Your Stack" list, with instant feedback (toast alerts) for
every action: add, duplicate add attempt, remove, and remove all.

## Technology Used

- **React 18** (component-based UI)
- **Vite** (dev server & build tool)
- **Tailwind CSS** (utility-first styling)
- **React-Toastify** (toast notifications)
- **JSON** (`public/technologies.json`) as the data source, loaded with
  `fetch` inside a `useEffect` hook

## Features

1. **Dynamic technology data** — all 15 technologies are loaded at runtime
   from `technologies.json` (not hardcoded in the component), with a real
   loading state while the fetch resolves.
2. **Smart stack building** — clicking "Add to Stack" adds a card to the
   sidebar and disables duplicates with a warning toast; each stack item
   can be removed individually, or the whole stack cleared at once, always
   with a toast confirmation.
3. **Fully responsive, single-source-of-truth gradient theme** — one CSS
   variable (`--brand-gradient`) drives the logo, hero heading highlight,
   and every primary button, and the layout adapts from a 1-column mobile
   view (with a hamburger navbar) up to a 3-column desktop grid.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build      # production build
npm run preview    # preview the production build
```

## 📁 Project Structure
dev-stack/
├── public/
│ └── technologies.json # technology data, fetched at runtime
├── src/
│ ├── main.jsx
│ ├── App.jsx # state, data fetching, toast logic
│ ├── index.css # gradient variable + Tailwind
│ └── components/
│ ├── Navbar.jsx # sticky, with mobile hamburger menu
│ ├── Hero.jsx
│ ├── TechCard.jsx
│ ├── StackSidebar.jsx
│ └── Footer.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json


 React Questions

**1. What is JSX, and why is it used in React?**
JSX is a syntax extension that lets us write HTML-looking markup directly
inside JavaScript files. Under the hood it compiles to plain
`React.createElement()` calls. It's used because it makes UI code much
easier to read and write — you can see the structure of the page and the
logic that builds it in the same place, instead of manually creating
elements with function calls.

**2. What is the difference between props and state?**
Props are data passed **into** a component from its parent — the
component receiving them cannot change them, they're read-only from its
point of view. State is data a component **owns and manages itself**, and
it can change over time (usually in response to user actions), which
causes the component to re-render. In short: props flow down and are
fixed by the parent; state lives inside a component and can change.

**3. What does the useState hook do, and where did you use it in this project?**
`useState` lets a functional component keep and update its own local
value across renders. In this project it's used in `App.jsx` to store the
list of `technologies` fetched from the JSON file, the `loading` and
`error` flags for the fetch, and the `stack` object holding the
technologies the user has currently selected. It's also used in
`Navbar.jsx` to track whether the mobile hamburger menu is open or closed.

**4. What does the useEffect hook do, and why did you need it to load the JSON data?**
`useEffect` lets a component run "side effects" — code that reaches
outside of React, like fetching data, after render. We needed it because
fetching `technologies.json` is an asynchronous operation that shouldn't
run on every render; by putting the `fetch` call inside `useEffect` with
an empty dependency array (`[]`), it only runs once, right after the
component first mounts, and then updates state with the result.

**5. Why does every item in a .map() list need a unique key prop?**
React uses the `key` to tell which items changed, were added, or were
removed between renders, so it can update the DOM efficiently instead of
re-rendering the whole list. Without a stable, unique key, React can mix
up items, lose input state, or re-render more than necessary. In this
project each technology and each stack item uses its unique `id` from the
JSON data as the key.

**6. What is conditional rendering? Show one place you used it (example: the empty stack message).**
Conditional rendering means showing different UI depending on some
condition, using normal JavaScript (`if`, ternaries, or `&&`) inside the
component. One example is in `StackSidebar.jsx`:

```jsx
{count === 0 ? (
  <p className="text-sm text-gray-400 mb-4">
    No technologies selected yet. Pick one from each category to start
    building your stack.
  </p>
) : (
  <div className="grid grid-cols-1 gap-3 mb-4">
    {items.map((tech) => ( ... ))}
  </div>
)}
```

If no technologies are selected it shows a friendly empty message;
otherwise it renders the list of selected stack items.

**7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?**
The parent passes data down by writing it as a prop on the child element,
e.g. `<TechCard tech={tech} isSelected={isSelected} onAdd={handleAdd} />`
— the child then reads it from its `props` argument. To send information
back up, the parent passes a **function** down as a prop (like `onAdd`),
and the child calls that function (usually from an event handler, like a
button's `onClick`) with whatever data the parent needs. The parent then
updates its own state in response — this is how `TechCard` tells `App`
which technology was clicked without directly touching `App`'s state.