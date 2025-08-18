# Introduction to Browser Events

## Event handlers

There are three common ways to attach a handler to an element:

1. **HTML attribute (inline)**

```html
<button onclick="alert('Clicked!')">Click me</button>
```

- Fast to demo, but mixes content and behavior. Harder to test and maintain.

2. **DOM property**

```html
<button id="btn">Click me</button>
<script>
  const btn = document.getElementById("btn");
  btn.onclick = function () {
    console.log("Clicked!");
  };
  // Only ONE handler at a time via .onclick; assigning again overwrites the last one.
</script>
```

3. **`addEventListener`**

```html
<button id="btn">Click me</button>
<script>
  const btn = document.getElementById("btn");
  function handleClick() {
    console.log("Clicked!");
  }
  btn.addEventListener("click", handleClick); // add
  // btn.removeEventListener('click', handleClick);          // remove (must be the same reference)
</script>
```

- Supports **multiple handlers** for the same event on the same element.
- Third parameter can be a **boolean** (capture flag) or an **options object**:

  - `capture: true` — run on the _capturing_ phase.
  - `once: true` — auto-remove after the first call.
  - `passive: true` — promise not to call `preventDefault()` (enables browser optimizations for scroll/touch).

---

## Accessing the element: `this`

Inside a regular (non-arrow) handler:

- With **DOM property** (`elem.onclick = fn`) and **addEventListener**, `this` equals the **element whose handler is running** (same as `event.currentTarget`).

```html
<button id="btn">Push</button>
<script>
  const btn = document.getElementById("btn");

  btn.onclick = function (event) {
    console.log(this === btn); // true
    console.log(event.currentTarget === btn); // true
  };

  btn.addEventListener("click", function (event) {
    console.log(this === btn); // true
    console.log(event.currentTarget === btn); // true
  });

  // Arrow functions don’t bind their own `this`:
  btn.addEventListener("click", (event) => {
    console.log(this === btn); // false (likely window/undefined in modules)
    console.log(event.currentTarget === btn); // true — always reliable
  });
</script>
```

**Tip:** Prefer `event.currentTarget` over `this` inside handlers—works the same across styles and arrows.

---

## Possible mistakes

Common pitfalls that cause “my handler doesn’t run” or “it runs at the wrong time”:

1. **Calling a function instead of passing it**

```js
// ❌ runs immediately; assigns the return value (likely undefined)
btn.onclick = handleClick();

// ✅ pass the function reference
btn.onclick = handleClick;
```

2. **Trying to remove an anonymous listener**

```js
btn.addEventListener("click", () => console.log("x"));
// ❌ cannot remove later — you don’t have the same reference
// btn.removeEventListener('click', ???);
```

Always keep a named/variable reference if you’ll remove it:

```js
const onClick = () => console.log("x");
btn.addEventListener("click", onClick);
btn.removeEventListener("click", onClick); // ✅ works
```

3. **Overwriting `.onclick` unintentionally**

```js
btn.onclick = first;
btn.onclick = second; // first is gone; only second remains
```

If you need multiple handlers, use `addEventListener`.

4. **Mismatched capture flags**

```js
btn.addEventListener("click", fn, { capture: true });
// …
btn.removeEventListener("click", fn); // ❌ won’t remove (options don’t match)
```

You must pass the **same** options (or boolean) to remove:

```js
btn.removeEventListener("click", fn, { capture: true }); // ✅
```

5. **Relying on `return false` with `addEventListener`**

- `return false` cancels default action only in inline/`on*` handler styles; it **doesn’t** cancel for `addEventListener`.
- Use `event.preventDefault()` in `addEventListener` handlers.

6. **Using arrow functions and expecting `this` to be the element**

- Arrow functions inherit `this` from the outer scope; use `event.currentTarget`.

---

## `addEventListener`

Signature:

```ts
element.addEventListener(type, listener, options?)
// or:
element.addEventListener(type, listener, useCapture?: boolean)
```

Key points:

- **Multiple** listeners for the same event are allowed; they run in the order added (per phase).
- **Options**:

  - `capture` — listen on the capturing phase (true) instead of bubbling (default).
  - `once` — auto-remove after first call.
  - `passive` — promise not to call `preventDefault()` (helps browser optimize scrolling/touch).

- **Removal** requires the **same** function and the **same** capture flag/options.

Example with options:

```js
function onScroll(e) {
  // passive listeners can’t call e.preventDefault()
  console.log("scrolling…");
}
window.addEventListener("scroll", onScroll, { passive: true });

function onLinkClick(e) {
  e.preventDefault(); // cancel navigation
  console.log("Handled via JS, not navigating.");
}
document
  .querySelector("a")
  .addEventListener("click", onLinkClick, { once: true });
```

---

## Event object

The browser passes an **Event** (or subtype) instance to handlers with details about what happened.

Common properties you’ll use immediately:

- `event.type` — the event’s name (e.g., `"click"`, `"keydown"`).
- `event.target` — the original element where the event occurred.
- `event.currentTarget` — the element whose handler is currently running (often the one you attached to).
- Pointer/mouse coordinates: `clientX`, `clientY` (viewport-relative).
- `defaultPrevented` — `true` if `preventDefault()` has been called.

Example:

```html
<button id="btn">Test</button>
<script>
  document.getElementById("btn").addEventListener("click", function (event) {
    console.log(event.type); // "click"
    console.log(event.target.tagName); // "BUTTON" (where it started)
    console.log(event.currentTarget === this); // true for regular function handlers
    console.log(event.clientX, event.clientY); // click coordinates
  });
</script>
```

---

## Object handlers: `handleEvent`

You can pass an **object** instead of a function. If the object has a `handleEvent` method, the browser will call it.

```html
<button id="btn">Fire</button>
<script>
  const handler = {
    count: 0,
    handleEvent(event) {
      this.count += 1;
      console.log(`type=${event.type}, count=${this.count}`);
    },
  };

  const btn = document.getElementById("btn");
  btn.addEventListener("click", handler); // calls handler.handleEvent(event)
</script>
```

Pattern for handling **multiple event types** in one object:

```js
const multi = {
  handleEvent(e) {
    if (e.type === "mouseenter") this.onEnter(e);
    else if (e.type === "mouseleave") this.onLeave(e);
  },
  onEnter(e) {
    console.log("in");
  },
  onLeave(e) {
    console.log("out");
  },
};

elem.addEventListener("mouseenter", multi);
elem.addEventListener("mouseleave", multi);
```

---

We could also use objects of a custom class, like this:

```js
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

---

The method handleEvent does not have to do all the job by itself. It can call other event-specific methods instead, like this:

```js
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

---

## Summary

- Use **`addEventListener`** for flexibility (multiple handlers, options).
- Inside regular handlers, `this === event.currentTarget`; prefer `event.currentTarget` for clarity (works with arrows too).
- Avoid pitfalls: pass function **references**, keep references to remove, match capture flags, don’t rely on `return false` with `addEventListener`.
- The **event object** carries all details you need (`type`, `target`, `currentTarget`, coordinates, etc.).
- **Object listeners** with `handleEvent` let you keep state and handle multiple event types cleanly.

---

# Bubbling and Capturing — Interview Notes

---

## Event flow

When an event happens (like a click), it doesn’t just affect the target element — it **travels through the DOM** in phases:

1. **Capturing phase** (a.k.a. trickling):

   - Event goes **downwards** from the `window` → `document` → `<html>` → `<body>` → … until it reaches the target element.

2. **Target phase**:

   - Event fires on the **target element itself**.

3. **Bubbling phase**:

   - Event then bubbles **upwards** from the target back through ancestors (`… → <body> → <html> → document → window`).

---

## Bubbling

- **def**: When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

By default, most events bubble.

Example:

```html
<form id="form">
  FORM
  <div>
    DIV
    <p>P</p>
  </div>
</form>

<script>
  form.onclick = function () {
    alert("form");
  };
  form.querySelector("div").onclick = function () {
    alert("div");
  };
  form.querySelector("p").onclick = function () {
    alert("p");
  };
</script>
```

- Clicking on `<p>` will show:

```
p → div → form
```

because the event bubbles up.

**Exceptions**: Some events do not bubble (`focus`, `blur`, some UI events).

---

## Event target

- **def**: The most deeply nested element that caused the event is called a target element, accessible as event.target.

During bubbling/capturing:

- `event.target` — the **origin** of the event (deepest element).
- `event.currentTarget` (or `this`) — the element whose handler is currently running.

```html
<form onclick="alert(event.target.tagName)">
  <button>Click me</button>
</form>
```

Clicking the button shows `"BUTTON"`, not `"FORM"`.

---

## Stopping bubbling

Sometimes you don’t want the event to bubble up further.

```js
p.onclick = function (event) {
  alert("p");
  event.stopPropagation();
};
```

- Now the click on `<p>` won’t reach the `div` or `form`.

⚠️ **Caution**: Avoid stopping bubbling unless absolutely necessary.
Global listeners (analytics, logging, shortcuts, etc.) may rely on bubbling. Stopping it can create bugs.

---

## Capturing

- **def**: Event capturing is a phase in the Document Object Model (DOM) event propagation model where an event travels from the root of the document down to the target element. This is the first phase of event propagation, occurring before the event reaches the target element itself and before the bubbling phase begins.

By default, event handlers listen only during the bubbling phase.
But you can also catch them during the **capturing phase**:

```js
elem.addEventListener("click", handler, true);
// true = use capturing phase

// OR with options:
elem.addEventListener("click", handler, { capture: true });
```

Order when clicking on `<p>` (with capturing enabled on ancestors):

1. Document (capture)
2. Html (capture)
3. Body (capture)
4. Form (capture)
5. Div (capture)
6. P (target)
7. Div (bubble)
8. Form (bubble)
9. Body (bubble)
10. Html (bubble)
11. Document (bubble)

---

## Stopping propagation completely

There’s also:

```js
event.stopImmediatePropagation();
```

- Stops not only bubbling further up, but also prevents **other handlers** on the same element from running.

Example:

```js
button.addEventListener("click", () => alert("first"));
button.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  alert("second");
});
button.addEventListener("click", () => alert("third"));
```

Result when clicking button:

- “second” only. (“first” and “third” suppressed)

---

## Summary

- Events have **three phases**: capturing → target → bubbling.
- By default, handlers listen on the **bubbling phase**.
- To listen on **capturing**, pass `{ capture: true }` (or `true`) to `addEventListener`.
- `event.target` — where the event originated.
  `event.currentTarget` / `this` — element whose handler is running.
- Use `event.stopPropagation()` to stop bubbling;
  `event.stopImmediatePropagation()` to also stop other handlers on the same element.
- Best practice: Don’t stop bubbling unless you have a strong reason (e.g., nested menus).

---

# Event Delegation — Interview Notes

---

## Concept

- **def**: Event delegation is a JavaScript technique where a single event listener is attached to a parent element instead of multiple child elements. This allows the parent to handle events that occur on its descendants, leveraging the event bubbling process.
- **Problem**: You have many similar elements (e.g., list items, buttons) that all need the same event handler.
- Attaching a handler to **each element individually** can be inefficient, especially if elements are dynamically added/removed.

**Solution**:

- Use **event delegation** — assign a single handler to a common ancestor.
- When an event bubbles up, check `event.target` to see which child triggered it.

---

## Why it works

- Events **bubble up** from the target to ancestor elements.
- The ancestor’s handler can “catch” the event and determine the actual element that was clicked.

---

## Example 1: Menu with buttons

```html
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this);
    }

    save() {
      alert("saving");
    }
    load() {
      alert("loading");
    }
    search() {
      alert("searching");
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action](); // call the corresponding method
      }
    }
  }

  new Menu(document.getElementById("menu"));
</script>
```

- The handler is set **once** on `#menu`.
- Depending on which `<button>` was clicked, it calls the appropriate method.
- New buttons with a `data-action` can be added later without changing JS.

---

## Example 2: Highlighting a table cell

```html
<table id="bagua-table">
  <tr>
    <td>One</td>
    <td>Two</td>
    <td>Three</td>
  </tr>
  <tr>
    <td>Four</td>
    <td>Five</td>
    <td>Six</td>
  </tr>
</table>

<script>
  let selectedTd;

  baguaTable.onclick = function (event) {
    let td = event.target.closest("td"); // look for nearest <td>
    if (!td || !baguaTable.contains(td)) return;

    if (selectedTd) {
      selectedTd.classList.remove("highlight");
    }
    selectedTd = td;
    selectedTd.classList.add("highlight");
  };
</script>
```

Key points:

- `event.target.closest('td')` finds the nearest `<td>` clicked, even if inner text/spans were clicked.
- Guard clause ensures the click is inside the table.
- Only **one handler** is needed for the whole table.

---

## Benefits of Event Delegation

1. **Memory efficiency**

   - One handler vs potentially hundreds or thousands.

2. **Handles dynamically added elements**

   - New elements don’t need explicit handler assignment.

3. **Cleaner, centralized code**

   - Logic is in one place (ancestor), not spread across many handlers.

---

## When not to use

- If events don’t bubble (e.g., `focus`, `blur`) — delegation doesn’t work directly.
- If you need very precise performance on high-frequency events (like `mousemove`) — bubbling can cause overhead.

---

## Summary

- Event delegation = attach one handler to an ancestor, use `event.target` to act on the actual element.
- Leverages **bubbling**.
- Use with `closest()` to reliably find the relevant element.
- Advantages: fewer handlers, dynamic elements supported, cleaner code.
- Be mindful of non-bubbling events and high-frequency cases.

---

# Default Browser Action — Interview Notes

---

## Concept

- Many browser events come with a **default action** performed by the browser.
- Examples:

  - A click on `<a href="...">` → navigates to the URL.
  - A form submit → navigates to new page with form data.
  - `mousedown` on text → starts text selection.
  - Right-click → opens context menu.

Sometimes you want to **prevent** this default behavior.

---

## Preventing Default Actions

### Using `event.preventDefault()`

```html
<a href="/" onclick="return false">Click here</a>
<a href="/" onclick="event.preventDefault()">Click here</a>
```

- Both ways stop the browser from navigating.
- **Preferred**: `event.preventDefault()` (more explicit).

### Example: Prevent form submission

```html
<form onsubmit="alert('submit!'); return false">
  <input type="text" />
  <input type="submit" />
</form>
```

- Here `return false` cancels form submission.
- Alternative: use `event.preventDefault()` inside an event handler.

---

## Passive Handlers

- Some events like `touchstart` and `touchmove` are set to **passive by default** in modern browsers for performance.
- Passive handlers cannot call `preventDefault()`.

Example:

```js
document.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault(); // may not work if passive:true
  },
  { passive: false }
);
```

- Must explicitly set `{passive: false}` if you want to disable scrolling/zooming on touch events.

---

## Example: Preventing selection

```html
<p ondblclick="alert('dblclick!'); return false">Double-click me</p>
```

- Normally `dblclick` selects text.
- `return false` prevents text selection.

---

## Example: Preventing right-click menu

```js
document.addEventListener("contextmenu", (event) => event.preventDefault());
```

- Blocks the browser’s context menu.
- Can be used to implement a **custom right-click menu**.

---

## Combining with Bubbling

- Handlers on parent elements can cancel default actions triggered by children.

Example:

```html
<div onclick="alert('div handler')">
  <a href="https://example.com">Go</a>
</div>

<script>
  document.querySelector("div").onclick = function (event) {
    if (event.target.tagName === "A") {
      event.preventDefault(); // cancels link navigation
      alert("Navigation cancelled");
    }
  };
</script>
```

- Clicks bubble, and the parent can decide to stop navigation.

---

## Important Notes

- **`return false`** only works in _inline `on...` attributes_ or with `elem.onclick = function() {...}` assignments.
- With `addEventListener`, you must use `event.preventDefault()`.
- Preventing defaults is common for custom UI components (custom dropdowns, modals, drag/drop, etc.).

---

## Summary

- Many DOM events trigger **default browser actions**.
- Cancel them with:

  - `event.preventDefault()` (preferred).
  - `return false` (legacy, works only in inline/on-event handlers).

- Use `{passive: false}` for events like `touchstart` if you want to disable scrolling.
- Be careful: canceling defaults can improve UX but can also break accessibility.

---
