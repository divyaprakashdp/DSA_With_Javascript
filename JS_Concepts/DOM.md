# DOM Notes for Senior Frontend Engineers

---

## 1. **Browser Environment**

- **Global object:**

  - In browsers = `window`. In modules = `undefined` (strict mode).
  - Globals = properties of `window` → `var` vs `let/const` difference:

    ```js
    var x = 10; // window.x exists
    let y = 20; // window.y does NOT exist
    ```

- **DOM vs BOM:**

  - DOM → Structured tree of HTML.
  - BOM → Browser APIs (`navigator`, `screen`, `location`, `history`, `alert`).

- **Pitfall:** Browser-specific APIs don’t exist in Node.js (interviewers may ask).

---

## 2. **DOM Nodes**

- **Types:**

  - `Node.ELEMENT_NODE (1)`
  - `Node.TEXT_NODE (3)`
  - `Node.COMMENT_NODE (8)`
  - `Node.DOCUMENT_NODE (9)`

- **Node vs Element:**

  - `Element` inherits from `Node`, but has extra methods like `getAttribute`.
  - Text nodes count as children too → interview trap!

- **Best practice:** Ignore text nodes when looping → use `.children` not `.childNodes`.

---

## 3. **DOM Navigation**

- **Collections:**

  - `childNodes` → NodeList (includes text, comments).
  - `children` → HTMLCollection (element-only, live).
  - **Live vs Static:**

    - `getElementsBy*` & `.children` → live (updates with DOM changes).
    - `querySelectorAll` → static snapshot.

- **Example (tricky):**

  ```js
  let elems = document.getElementsByTagName("div");
  document.body.append(document.createElement("div"));
  console.log(elems.length); // increased automatically (live collection)
  ```

---

## 4. **Searching Elements in DOM**

- **Performance:**

  - `getElementById` → fastest (direct hash lookup).
  - `querySelector(All)` → flexible, slower but modern standard.

- **NodeList vs HTMLCollection:**

  - NodeList = can be static, iterable (`for...of`).
  - HTMLCollection = live, but not iterable without conversion (`Array.from`).

- **Senior Q:** Why prefer `querySelector` in modern apps? → consistency, static snapshot avoids subtle bugs.

---

## 5. **Basic DOM Node Properties**

- **innerHTML vs textContent vs innerText:**

  - `innerHTML`: parses HTML (risk: XSS if user data injected).
  - `textContent`: plain text, fastest, safe.
  - `innerText`: considers CSS (hidden elements ignored), forces reflow → slower.

- **outerHTML:**

  - Reading returns the element + contents.
  - Writing **replaces** the element itself (not just contents).

- **hidden vs display\:none:**

  - `hidden` → HTML boolean attribute, same effect as `display: none`.
  - Difference: `hidden` is semantic (browser support, accessibility tools may interpret it differently).

---

## 6. **DOM Attributes vs Properties**

- **Attributes** = HTML source.
- **Properties** = current state in JS.

  ```html
  <input value="Hello" />
  ```

  ```js
  input.getAttribute("value"); // "Hello" (from HTML)
  input.value; // "" if user cleared field
  ```

- **Boolean attributes:** presence = true, absence = false.

  ```html
  <input type="checkbox" checked />
  ```

  ```js
  checkbox.checked; // true
  checkbox.getAttribute("checked"); // "" (empty string if present)
  ```

- **Custom data attributes:** `data-*`

  ```js
  div.dataset.userId = "123";
  ```

- **Senior Q:** Why `dataset` > `setAttribute`? → type-safety, automatic camelCase mapping.

---

## 7. **Modifying the Document**

- **Creation APIs:**

  - `createElement`, `createTextNode`, `cloneNode(true/false)`.

- **Insertion APIs:**

  - Old: `appendChild`, `insertBefore`, `replaceChild`.
  - Modern: `append`, `prepend`, `before`, `after`, `replaceWith`, `remove`.

- **insertAdjacentHTML:** avoids parsing overhead vs `innerHTML +=`.

  ```js
  elem.insertAdjacentHTML("beforeend", "<li>Item</li>");
  ```

- **DocumentFragment:**

  - Efficient batch updates.

  ```js
  let frag = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) frag.append(document.createElement("div"));
  container.append(frag);
  ```

  - Prevents reflows per insertion.

---

## 8. **Styles and Classes**

- **className vs classList:**

  - `className = "foo bar"` → overwrites.
  - `classList.add/remove/toggle` → safer.

- **style property:**

  - Inline CSS only, JS camelCase.
  - Use `getComputedStyle(elem)` for final resolved value (includes external CSS).

- **Performance Gotcha:**

  - Accessing computed styles can trigger reflow if layout is dirty.
  - Batch style writes using `requestAnimationFrame`.

---

## 9. **Size and Scroll (Elements)**

- **Box-model related properties:**

  - `offsetWidth/offsetHeight` → border-box (content+padding+border).
  - `clientWidth/clientHeight` → content+padding (excludes border, scrollbar).
  - `scrollWidth/scrollHeight` → entire content, including overflow.

- **Scroll properties:**

  - `scrollTop`, `scrollLeft` (modifiable).

- **Pitfall:** Modifying `scrollTop` inside `onscroll` can cause infinite loops.

---

## 10. **Size and Scroll (Window)**

- **Viewport size:**

  - `innerWidth/innerHeight` → includes scrollbar.
  - `document.documentElement.clientWidth/Height` → excludes scrollbar.

- **Scroll position:**

  - `window.pageXOffset`, `window.pageYOffset` (or `scrollX`, `scrollY`).
  - `window.scrollTo`, `scrollBy`.
  - `elem.scrollIntoView({behavior: 'smooth'})`.

- **Interview Q:** How to disable body scroll when modal is open?

  ```css
  body {
    overflow: hidden;
  }
  ```

---

## 11. **Coordinates**

- **elem.getBoundingClientRect():**

  - Relative to viewport.
  - `{top, left, right, bottom, width, height}`.

- **Absolute page coords:**

  ```js
  let rect = elem.getBoundingClientRect();
  let absoluteTop = rect.top + window.scrollY;
  ```

- **Fixed vs Scrolled Elements:** `getBoundingClientRect` changes with scroll unless `position: fixed`.

---

## 12. **Performance & Security Considerations (Senior Must-Know)**

- **Reflows & Repaints:**

  - Triggered by DOM reads after writes (`offsetHeight`, `getComputedStyle`).
  - Batch changes with `DocumentFragment`, or use `requestAnimationFrame`.

- **Security (XSS):**

  - Never inject user input into `innerHTML`.
  - Prefer `textContent` for dynamic content.

- **Accessibility:**

  - Toggle `hidden` or `aria-hidden`, not just `display: none`.

- **Virtual DOM vs Real DOM:**

  - React minimizes DOM thrashing by batching updates, diffing.
  - But still relies on the same underlying DOM principles.

---

Awesome 🔥 Let’s expand this into a **full-fledged 35-question pack** that will prepare you for DOM-heavy senior frontend interviews.
I’ll keep it **concise but deep** → direct **Q\&A style**, with **examples, pitfalls, and senior insights**.

---

# 🏆 DOM + Browser Environment Interview Q\&A (35 Questions)

---

## 🌐 Browser & Global Environment

**1. Difference between `window`, `document`, and `navigator`?**

- `window`: Global object (contains BOM + DOM).
- `document`: Entry point to DOM tree.
- `navigator`: Browser info (`userAgent`, `geolocation`, `onLine`).

---

**2. Why are `let/const` variables not accessible on `window`?**

- `var` attaches to `window`.
- `let/const` are block-scoped, live in lexical environment, not `window`.

```js
var x = 1;
console.log(window.x); // 1
let y = 2;
console.log(window.y); // undefined
```

---

**3. What is the BOM (Browser Object Model)?**

- Objects provided by the browser but not part of DOM:

  - `location`, `history`, `navigator`, `screen`.

- Example:

```js
console.log(location.href); // full URL
history.back();
```

---

**4. How is `document` different in HTML vs XML?**

- HTML DOM → case-insensitive tags, auto-fixes broken markup.
- XML DOM → strict, case-sensitive, no error fixing.

---

## 🌳 DOM Structure & Nodes

**5. What are the node types in DOM?**

- `Element`, `Text`, `Comment`, `Document`.
- Constants: `Node.ELEMENT_NODE (1)`, `Node.TEXT_NODE (3)`, `Node.DOCUMENT_NODE (9)`.

---

**6. Difference between `Node` and `Element`?**

- `Element` inherits from `Node`.
- `Node` = all node types.
- Only `Element` has `tagName`, `className`, `getAttribute`.

---

**7. Why do text nodes matter in DOM traversal?**

- Whitespace between tags = text nodes.

```html
<div>Hello</div>
```

`div.firstChild.nodeType === 3` (text).

- Avoid → use `.children` instead of `.childNodes`.

---

## 🔎 DOM Navigation & Selection

**8. Difference between `childNodes` and `children`?**

- `childNodes`: all (elements + text + comments).
- `children`: elements only.

---

**9. Live vs static collections?**

- Live → `getElementsBy*`, `.children` (updates automatically).
- Static → `querySelectorAll`.
- Senior pitfall: modifying DOM while looping a live collection skips items.

---

**10. Which is fastest: `getElementById`, `querySelector`, or `getElementsByClassName`?**

- `getElementById` (direct lookup).
- But use `querySelector` for maintainability.

---

**11. Can you chain `querySelectorAll` results?**

- No, it returns `NodeList`, not live DOM API.

```js
document.querySelectorAll(".list").querySelectorAll("li"); // ❌ error
```

- Must loop or re-query inside.

---

## 📖 Node Properties & Attributes

**12. Difference between `innerHTML`, `textContent`, and `innerText`?**

- `innerHTML`: parses HTML. (❌ unsafe for user data).
- `textContent`: plain text, fastest.
- `innerText`: respects CSS, triggers reflow.

---

**13. When to use `outerHTML`?**

- Reading returns full HTML (including element itself).
- Writing replaces element entirely (removes original reference).

---

**14. Difference between DOM attributes and properties?**

- Attribute = initial HTML.
- Property = live JS object value.

```html
<input value="Hello" />
```

```js
input.getAttribute("value"); // "Hello"
input.value; // current field value
```

---

**15. How do boolean attributes like `checked` behave?**

- If present → true (even empty string).

```html
<input type="checkbox" checked />
```

```js
checkbox.checked; // true
```

---

**16. Why use `dataset` instead of `getAttribute` for custom attributes?**

- Cleaner, auto camelCase mapping.

```html
<div data-user-id="123"></div>
```

```js
div.dataset.userId; // "123"
```

---

## 🛠 Modifying the DOM

**17. How to create and insert DOM elements?**

```js
let div = document.createElement("div");
div.textContent = "Hello";
document.body.append(div);
```

---

**18. What’s the difference between `appendChild` and `append`?**

- `appendChild`: single node, no strings.
- `append`: multiple nodes/strings, modern.

---

**19. Why is `insertAdjacentHTML` better than `innerHTML +=`?**

- `innerHTML +=` re-parses whole content (slow).
- `insertAdjacentHTML` parses once and inserts.

---

**20. How to efficiently insert large numbers of elements?**

- Use `DocumentFragment`.

```js
let frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) frag.append(document.createElement("li"));
ul.append(frag);
```

---

**21. How to clone an element with children?**

```js
let clone = node.cloneNode(true); // deep clone
```

---

## 🎨 Styles & Classes

**22. Difference between `className` and `classList`?**

- `className`: overwrites full class string.
- `classList`: add/remove/toggle safely.

---

**23. How to read computed CSS value of an element?**

```js
let styles = getComputedStyle(elem);
console.log(styles.marginTop);
```

---

**24. Why can reading `offsetHeight` cause performance issues?**

- Forces reflow → browser must recalc layout.
- Avoid layout thrashing (mixing read/write).

---

**25. How to batch DOM writes safely?**

- Use `requestAnimationFrame` or `DocumentFragment`.

---

## 📏 Size & Scroll

**26. Difference between `clientWidth`, `offsetWidth`, and `scrollWidth`?**

- `clientWidth`: content + padding.
- `offsetWidth`: content + padding + border.
- `scrollWidth`: full scrollable width (including overflow).

---

**27. How to scroll an element into view smoothly?**

```js
elem.scrollIntoView({ behavior: "smooth" });
```

---

**28. How to detect if an element is fully visible inside a container?**

```js
let rect = elem.getBoundingClientRect();
let containerRect = container.getBoundingClientRect();
let fullyVisible =
  rect.top >= containerRect.top && rect.bottom <= containerRect.bottom;
```

---

**29. Difference between `window.innerHeight` and `document.documentElement.clientHeight`?**

- `innerHeight`: viewport including scrollbars.
- `clientHeight`: viewport excluding scrollbar.

---

**30. How to disable background scroll when modal is open?**

```css
body.modal-open {
  overflow: hidden;
}
```

- Senior note: On iOS Safari → also need `touchmove` prevention.

---

## 📍 Coordinates & Positioning

**31. Difference between `offsetTop` and `getBoundingClientRect().top`?**

- `offsetTop`: relative to positioned parent.
- `getBoundingClientRect().top`: relative to viewport, includes transforms.

---

**32. How to convert viewport-relative coords to page coords?**

```js
let rect = elem.getBoundingClientRect();
let top = rect.top + window.scrollY;
```

---

**33. Why is `getBoundingClientRect()` better than `offsetTop` in most cases?**

- Works regardless of transforms, scroll containers, CSS scaling.

---

## ⚡ Performance, Security, and Accessibility

**34. How does Virtual DOM help with real DOM performance?**

- Real DOM → costly reflows/repaints.
- Virtual DOM → diffs new vs old, batches minimal mutations.
- Still need to understand DOM performance (e.g., `getBoundingClientRect` triggers reflow).

---

**35. How to prevent XSS when inserting dynamic HTML?**

- Use `textContent`.
- If you must use `innerHTML`, sanitize input (DOMPurify, etc.).

```js
elem.textContent = userInput; // safe
```

---

# ✅ Key Senior Insights

- Always prefer **static NodeLists** (`querySelectorAll`) over live collections.
- Avoid `innerHTML +=`, use `insertAdjacentHTML`.
- Batch DOM changes → minimize reflows.
- Understand **box-model measurement APIs** (`offsetWidth`, `clientWidth`).
- Accessibility = not just `display:none`, but proper `aria-*`, `hidden`.
- Security = avoid raw `innerHTML`.

---

# ⚠️ DOM Trick Questions (with Answers)

---

### 1. **What does this log?**

```html
<div id="root"></div>
<script>
  console.log(document.body.firstChild);
</script>
```

**Answer:**

- Could be a **text node** (`#text`) if there’s whitespace before `<div>`.
- DOM counts whitespace as text nodes.
  ✅ To avoid → use `.firstElementChild`.

---

### 2. **Why does this fail?**

```js
document.querySelectorAll("p").forEach((p) => console.log(p));
document.querySelectorAll("p").map((p) => p.textContent);
```

**Answer:**

- `NodeList` supports `forEach` but **not `map/filter`**.
- Need `Array.from` or spread:

```js
Array.from(document.querySelectorAll("p")).map((p) => p.textContent);
```

---

### 3. **Why does this loop skip elements?**

```js
let items = document.getElementsByClassName("item");
for (let i = 0; i < items.length; i++) {
  document.body.removeChild(items[i]);
}
```

**Answer:**

- `items` = **live HTMLCollection**. Removing changes length dynamically → skips half.
  ✅ Fix: iterate backwards or convert to array first.

---

### 4. **What happens here?**

```js
let div = document.createElement("div");
div.outerHTML = "<p>New</p>";
console.log(div.outerHTML);
```

**Answer:**

- Writing to `outerHTML` **replaces the element itself** in DOM.
- The `div` reference is now detached — logging shows original `<div>`, not `<p>`.
  ✅ Must reassign: `div = document.querySelector("p");`

---

### 5. **Difference between these two?**

```js
elem.setAttribute("value", "Hello");
elem.value = "Hello";
```

**Answer:**

- `setAttribute` → updates only the HTML attribute (initial value).
- `elem.value` → updates live property (affects UI).
- For inputs, attribute & property can diverge.

---

### 6. **Why does this return empty?**

```html
<input type="text" value="hi" />
<script>
  document.querySelector("input").textContent;
</script>
```

**Answer:**

- `<input>` is a **void element** → no text nodes inside.
- Use `input.value`, not `textContent`.

---

### 7. **Why is this slower than expected?**

```js
for (let i = 0; i < 1000; i++) {
  div.style.left = i + "px";
  console.log(div.offsetHeight); // force reflow
}
```

**Answer:**

- Alternating **reads (offsetHeight)** and **writes (style.left)** cause **layout thrashing**.
- Browser recalculates layout 1000 times.
  ✅ Fix: batch reads before writes.

---

### 8. **What’s wrong with `innerHTML +=`?**

```js
list.innerHTML += "<li>Item</li>";
```

**Answer:**

- `innerHTML +=` → reads + re-parses + re-creates all children.
- Expensive, also destroys event listeners.
  ✅ Use `insertAdjacentHTML("beforeend", "<li>Item</li>");`.

---

### 9. **What happens if you `console.log(document.body.style.backgroundColor)` when CSS is external?**

**Answer:**

- `style` reflects **inline styles only**.
- Returns `""` if background set via external CSS.
  ✅ Use `getComputedStyle(document.body).backgroundColor`.

---

### 10. **Why does this smooth scroll sometimes fail?**

```js
elem.scrollIntoView({ behavior: "smooth" });
```

**Answer:**

- Not supported in older browsers (esp. Safari < 15).
- Behavior is non-standardized in cross-iframe contexts.
  ✅ Polyfill or `window.scrollTo` with smooth scroll library.

---

# ✅ Summary of Trick Concepts

- **Whitespace nodes** → use `.children` not `.childNodes`.
- **NodeList isn’t an Array** → needs conversion.
- **Live collections mutate dynamically** → beware in loops.
- **`outerHTML` replaces element** → invalidates references.
- **Properties vs attributes** behave differently.
- **Inputs don’t have textContent** → use `.value`.
- **Reflow traps** → don’t mix DOM reads/writes.
- **`innerHTML +=`** kills event listeners.
- **Inline vs computed styles** difference.
- **APIs like smooth scroll need polyfills** for compatibility.

---

# ⚠️ Advanced DOM Trick Questions (Part 2)

---

### 11. **What’s logged here?**

```js
console.log(document.querySelectorAll("div").length);
document.body.innerHTML = "<p>Replaced</p>";
console.log(document.querySelectorAll("div").length);
```

**Answer:**

- First logs actual `<div>` count.
- After replacing with `innerHTML`, **all previous nodes are destroyed** → logs `0`.
- Event listeners also wiped out.

---

### 12. **What’s the difference?**

```js
console.log(document.getElementById("id"));
console.log(document.querySelector("#id"));
```

**Answer:**

- Both work similarly, but:

  - `getElementById` → **faster**, returns `null` if not found.
  - `querySelector` → more flexible (supports complex selectors).

- Minor difference: `getElementById` ignores shadow DOM.

---

### 13. **Does this work?**

```html
<div id="foo"></div>
<script>
  console.log(foo); // ?
</script>
```

**Answer:**

- In browsers, some elements with an `id` are exposed as **global variables** (`foo`).
- **Not reliable**: only in non-strict mode + may clash with variables.
  ✅ Use `getElementById`.

---

### 14. **What’s printed?**

```js
let el = document.createElement("div");
el.innerHTML = "<span>Hi</span><span>There</span>";
console.log(el.childNodes.length);
```

**Answer:**

- Could be `3` if there’s a whitespace text node between spans.
- `childNodes` counts **text + elements**, not just elements.
  ✅ Use `.children.length` to count only elements.

---

### 15. **Why does this return undefined?**

```js
let form = document.querySelector("form");
console.log(form.username.value);
```

**Answer:**

- Works only if `<input name="username">` exists.
- Form controls are exposed as properties by `name`, not `id`.
  ✅ Safer: `form.querySelector("[name=username]")`.

---

### 16. **What’s wrong here?**

```js
elem.className += " active";
```

**Answer:**

- If `elem.className` isn’t empty, missing space will merge classes → `"btnactive"`.
  ✅ Use `classList.add("active")`.

---

### 17. **Does this detect inline style?**

```js
if (elem.style.width) {
  console.log("Has width");
}
```

**Answer:**

- Only detects **inline style**.
- If CSS sets width, returns `""`.
  ✅ Use `getComputedStyle(elem).width`.

---

### 18. **What happens?**

```js
let list = document.createElement("ul");
list.innerHTML = "<li>1</li><li>2</li>";
document.body.append(list.firstChild);
document.body.append(list.firstChild);
```

**Answer:**

- A DOM node can exist only **once**.
- Second `append` moves the `<li>` instead of cloning.
  ✅ To duplicate → `list.firstChild.cloneNode(true)`.

---

### 19. **Does `hidden=true` remove the element?**

```js
elem.hidden = true;
```

**Answer:**

- No, just applies `display:none`.
- Element still in DOM, accessible via JS.

---

### 20. **What’s wrong with this loop?**

```js
let nodes = document.querySelectorAll("p");
for (let i in nodes) {
  console.log(nodes[i].textContent);
}
```

**Answer:**

- `for..in` iterates enumerable keys (including `length`, `item`, etc.).
- Will log extra stuff.
  ✅ Use `for..of` or `forEach`.

---

### 21. **Difference between `.append()` and `.appendChild()`?**

**Answer:**

- `.append()` → allows **multiple nodes + strings**, no return value.
- `.appendChild()` → only **one node**, returns it, throws error if not Node.

---

### 22. **What happens if you set `innerHTML` with `<script>`?**

```js
div.innerHTML = "<script>alert('hi')</script>";
```

**Answer:**

- Script inserted via `innerHTML` **does not execute** automatically.
- Must use `createElement("script")` or `.appendChild`.

---

### 23. **Why is event delegation better here?**

```js
document.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => console.log("clicked"));
});
```

**Answer:**

- For large/added lists → inefficient.
- Better: attach one listener on parent (`ul`) and use `event.target`.

---

### 24. **What’s the difference?**

```js
document.body.scrollTop;
document.documentElement.scrollTop;
```

**Answer:**

- Varies by browser.
- In standards mode → use `document.documentElement.scrollTop`.
- In quirks mode → `body.scrollTop`.

---

### 25. **Why does this not work?**

```js
document.querySelector("button").onclick = () => {
  this.disabled = true;
};
```

**Answer:**

- Arrow functions don’t bind `this`.
- `this` inside is from outer scope (likely `window`).
  ✅ Use normal function:

```js
button.onclick = function () {
  this.disabled = true;
};
```

---

# ✅ Recap of Advanced DOM Gotchas

- `innerHTML` destroys nodes + listeners.
- `id` → global variable (unsafe).
- `childNodes` includes text nodes.
- Form elements auto-exposed by `name`.
- Classes → always prefer `classList`.
- Inline styles vs computed styles difference.
- Node can exist in DOM only once.
- `hidden` ≠ removal.
- `for..in` bad for NodeLists.
- `append` vs `appendChild`.
- `innerHTML <script>` doesn’t execute.
- Event delegation = scalable.
- Scroll APIs differ across modes.
- Arrow functions don’t bind `this`.

---
