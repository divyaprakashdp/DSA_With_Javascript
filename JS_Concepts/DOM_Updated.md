🔗 [Browser environment](https://javascript.info/browser-environment)

# Browser Environment

## Introduction

- The JavaScript language was initially created for web browsers.
- Since then, it has evolved into a language with many uses and platforms.
- A platform may be:

  - A browser,
  - A web-server,
  - Another host (even a coffee machine if it runs JS).

👉 Each of these provides platform-specific functionality. This is called a **host environment**.
👉 A host environment provides its own objects and functions in addition to the language core.

- In a web browser:

  - **window** is the “root” object.
  - It has **two roles**:

    1. As the **global object** for JavaScript code.
    2. As the **browser window**, providing methods to control it.

---

## Example: window usage

```js
function sayHi() {
  alert("Hello");
}

// global functions are methods of the global object:
window.sayHi();

// as browser window:
alert(window.innerHeight); // inner window height
```

---

## DOM (Document Object Model)

- Represents all page content as objects that can be modified.
- The `document` object is the main entry point.
- Anything on the page can be changed or created using it.

### Example: modify page background

```js
// change the background color to red
document.body.style.background = "red";

// change it back after 1 second
setTimeout(() => (document.body.style.background = ""), 1000);
```

---

## CSSOM (CSS Object Model)

- A separate specification for CSS rules and stylesheets.
- Explains how they are represented as objects, and how to read/write them.
- In practice:

  - Rarely modify CSS rules directly from JS.
  - Usually, just add/remove CSS classes.

---

## BOM (Browser Object Model)

- Represents additional objects provided by the browser (host environment) for working with everything except the document.

### Common BOM objects:

1. **navigator**

   - Provides background info about browser & OS.
   - Properties:

     - `navigator.userAgent`
     - `navigator.platform`

2. **location**

   - Allows reading current URL and redirecting browser.

   ```js
   alert(location.href); // shows current URL

   if (confirm("Go to Wikipedia?")) {
     location.href = "https://wikipedia.org"; // redirect
   }
   ```

3. Functions like `alert`, `confirm`, `prompt`

   - Part of BOM.
   - Not part of document.
   - Browser methods for communicating with the user.

---

# ✅ Summary

- JavaScript core is extended by host environments.
- In browsers, the environment provides:

  - **DOM** (document control),
  - **CSSOM** (stylesheets),
  - **BOM** (browser window & user interaction).

- `window` is the root object: global + browser window.

---

## 🔗 [DOM Tree (dom-nodes)](https://javascript.info/dom-nodes)

# DOM Tree

## HTML as Objects

- Every HTML tag is an **object**.
- Nested tags are “children” of the enclosing one.
- The text inside a tag is an object as well.

👉 All these objects are accessible using JavaScript.

---

## Example: Accessing document.body

```js
document.body.style.background = "red";

setTimeout(() => (document.body.style.background = ""), 3000);
```

---

## Example HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>About elk</title>
  </head>
  <body>
    The truth about elk.
  </body>
</html>
```

---

## DOM Tree Representation

- The DOM represents HTML as a **tree structure**.
- Tags are represented as **element nodes** (`<html>`, `<head>`, `<body>`).
- Text inside them is represented as **text nodes** (`#text`).
- Spaces and newlines inside tags also become text nodes.

---

## Example: DOM Tree Visual

```
html
  head
    title
      #text: "About elk"
  body
    #text: "The truth about elk."
```

---

## Spaces and Newlines in DOM

- Spaces and newlines between tags become **text nodes** too.
- Example:

```html
<body>
  <p>Hello</p>
</body>
```

DOM tree:

```
body
  #text: "\n  "
  p
    #text: "Hello"
  #text: "\n"
```

---

## Auto-Correction by Browsers

- Browsers autocorrect malformed HTML.
- Example:

```html
Hello
```

The browser interprets this as:

```html
<html>
  <head></head>
  <body>
    Hello
  </body>
</html>
```

---

## Example: Auto-added <tbody>

- For a `<table>` without `<tbody>`:

```html
<table id="table">
  <tr>
    <td>one</td>
    <td>two</td>
  </tr>
</table>
```

- The browser automatically creates a `<tbody>` in the DOM:

```html
<table id="table">
  <tbody>
    <tr>
      <td>one</td>
      <td>two</td>
    </tr>
  </tbody>
</table>
```

---

## Special DOM Collections

- Example: Accessing table parts with DOM properties:

```js
alert(table); // [object HTMLTableElement]

alert(table.rows); // HTMLCollection of <tr>
alert(table.rows[0].cells[1].innerHTML); // "two"
```

- Tables, forms, and some other elements provide additional collections and properties for convenient access.

---

# ✅ Summary

- HTML is represented as a tree of objects in the DOM.
- Tags → **element nodes**, text → **text nodes**.
- Spaces and newlines also create text nodes.
- Browsers autocorrect broken HTML (e.g., add `<tbody>`).
- Special collections exist for tables, forms, etc.

---

🔗 [Walking the DOM (dom-navigation)](https://javascript.info/dom-navigation)

---

# Walking the DOM

## Starting Point: `document`

- All DOM operations start with the **`document`** object.
- From there, we can access any node.

---

## Top-Level Nodes

- The topmost tree nodes:

  - `<html>` → `document.documentElement`
  - `<body>` → `document.body`
  - `<head>` → `document.head`

---

## Example: `document.body` may be `null`

```html
<html>
  <head>
    <script>
      alert("From HEAD: " + document.body); // null
    </script>
  </head>
  <body>
    <script>
      alert("From BODY: " + document.body); // [object HTMLBodyElement]
    </script>
  </body>
</html>
```

👉 `document.body` is `null` if the script is executed before `<body>` is parsed.

---

## Child Nodes

- **Direct children** of a node are accessible using:

  - `childNodes` (a collection of child nodes)
  - `firstChild` and `lastChild`
  - `hasChildNodes()` (checks for children)

### Example: childNodes

```html
<html>
  <body>
    <div>Begin</div>
    <ul>
      <li>Information</li>
    </ul>
    <div>End</div>
    <script>
      for (let i = 0; i < document.body.childNodes.length; i++) {
        alert(document.body.childNodes[i]); // Div, UL, Div, SCRIPT
      }
    </script>
  </body>
</html>
```

---

## childNodes is Not an Array

- `childNodes` is a **collection** (NodeList).
- It looks like an array but it’s not.
- It is **iterable**, so we can use `for..of`.

### Example: for..of with childNodes

```js
for (let node of document.body.childNodes) {
  alert(node); // shows all child nodes
}
```

- But array methods like `push/pop` don’t work.
- To use them, convert to an array:

```js
alert(Array.from(document.body.childNodes).filter);
```

---

## DOM Collections Are Read-Only

- DOM collections, like `childNodes`, are **read-only**.
- We cannot assign new values like `childNodes[0] = ...`.
- They are **live**: they auto-update when the DOM changes.

---

## Siblings and Parent

- Navigation properties:

  - `parentNode`
  - `previousSibling`
  - `nextSibling`

### Example:

```html
<body>
  <div>First</div>
  <div>Second</div>
  <script>
    let second = document.body.children[1];

    alert(second.previousSibling); // #text (newline)
    alert(second.nextSibling); // <script>
    alert(second.parentNode); // <body>
  </script>
</body>
```

---

## Element-only Navigation

- Element-only properties skip text nodes, comments, etc.
- Use when working with element structure only.

### Properties:

- `children` – only element children
- `firstElementChild`
- `lastElementChild`
- `previousElementSibling`
- `nextElementSibling`
- `parentElement`

---

## Example: element navigation

```html
<body>
  <div>First</div>
  <div>Second</div>
  <script>
    let second = document.body.children[1];

    alert(second.previousElementSibling.innerHTML); // "First"
    alert(second.nextElementSibling); // <script>
    alert(second.parentElement); // <body>
  </script>
</body>
```

---

# ✅ Summary

- DOM navigation starts from `document`.
- `document.documentElement`, `document.head`, `document.body` → top-level nodes.
- `childNodes`, `firstChild`, `lastChild`, `hasChildNodes()` → general children.
- Collections are **live** and **read-only**.
- `parentNode`, `nextSibling`, `previousSibling` → general navigation.
- Use element-only navigation (`children`, `firstElementChild`, etc.) to skip text nodes.

---

🔗 [Searching for elements in the DOM](https://javascript.info/searching-elements-dom)

---

# Searching for Elements in the DOM

## Methods to Search the DOM

JavaScript provides several methods to find elements in the DOM.

---

## 1. `document.getElementById(id)`

- Returns the element with the given `id`.
- `id` must be unique within the document.

### Example:

```html
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  let elem = document.getElementById("elem");
  elem.style.background = "red";
</script>
```

👉 There is also a global variable created for each `id` in HTML.
But it’s unreliable because global variables may conflict.
**Best practice: always use `getElementById`.**

---

## 2. `elem.querySelectorAll(css)`

- Returns **all elements inside `elem`** matching the given CSS selector.
- Returns a **static NodeList** (not live).
- Can use complex CSS selectors and pseudo-classes.

### Example:

```html
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>

<script>
  let elements = document.querySelectorAll("ul > li:last-child");

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

---

## 3. `elem.querySelector(css)`

- Returns the **first element** matching the CSS selector inside `elem`.
- Much faster if only one element is needed.

### Example:

```js
let firstLi = document.querySelector("ul > li");
alert(firstLi.innerHTML); // "The"
```

---

## 4. `elem.matches(css)`

- Does **not search the DOM**.
- Instead, checks if the element itself matches the given CSS selector.
- Returns `true` or `false`.

### Example:

```html
<a href="http://example.com/file.zip">...</a>
<a href="http://example.com/faq">...</a>

<script>
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href);
    }
  }
</script>
```

---

## 5. `elem.closest(css)`

- Looks for the **nearest ancestor** that matches the selector.
- The search includes the element itself, then up through its ancestors.

### Example:

```html
<h1>Contents</h1>
<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector(".chapter");
  alert(chapter.closest(".book")); // UL
  alert(chapter.closest(".contents")); // DIV
  alert(chapter.closest("h1")); // null
</script>
```

---

## 6. `elem.getElementsBy*`

Older methods — return **live HTMLCollections**.

- `getElementsByTagName(tag)`

  - Returns elements with the given tag.
  - Example: `document.getElementsByTagName('li')`.

- `getElementsByClassName(className)`

  - Returns elements with the given CSS class.

- `document.getElementsByName(name)`

  - Returns elements with a given `name` attribute (rare, mostly for forms).

### Example:

```html
<form name="my">
  <input name="one" value="1" />
  <input name="two" value="2" />
</form>

<script>
  let form = document.forms.my; // form by name

  let elems = form.getElementsByTagName("input");
  alert(elems[0].value); // "1"
</script>
```

---

## Comparison: Modern vs Old Methods

- **Modern**:

  - `querySelector`, `querySelectorAll` → support complex selectors, return static NodeList.

- **Old**:

  - `getElementById`, `getElementsBy*` → return live collections.

👉 Best practice: use modern methods (`querySelector`, `querySelectorAll`) unless live updating is specifically needed.

---

# ✅ Summary

- `getElementById` – search by unique `id`.
- `querySelectorAll` – all elements by CSS selector (static NodeList).
- `querySelector` – first element by CSS selector.
- `matches` – check if element matches selector.
- `closest` – find nearest ancestor matching selector.
- `getElementsBy*` – old, return live collections.

---

🔗 [Basic DOM Node Properties](https://javascript.info/basic-dom-node-properties)

---

# Basic DOM Node Properties

## DOM Node Classes

- The DOM is not just a flat set of objects.
- There is a **hierarchy of classes** that provides different properties/methods.

### Inheritance Diagram:

```
EventTarget
  └── Node
        ├── Text
        ├── Comment
        └── Element
              └── HTMLElement
                     ├── HTMLInputElement
                     ├── HTMLBodyElement
                     ├── HTMLAnchorElement
                     └── ...
```

---

## 1. `EventTarget`

- The root class.
- Provides the ability to handle events (`addEventListener`, etc.).

---

## 2. `Node`

- A base class for DOM nodes.
- Provides the core tree navigation properties:

  - `parentNode`
  - `childNodes`
  - `firstChild`
  - `lastChild`
  - `previousSibling`
  - `nextSibling`

- Also provides node information:

  - `nodeType` (numeric node type)
  - `nodeName` (tag name or `#text` for text nodes).

---

## 3. `Element`

- Inherits from `Node`.
- Represents **element nodes** specifically.
- Provides navigation and search methods:

  - `getElementsByTagName`
  - `querySelector`
  - `children` (element children only).

---

## 4. `HTMLElement`

- Base class for **all HTML elements**.
- Provides common HTML element features like:

  - `innerHTML`, `outerHTML`
  - `className`, `classList`
  - `style`

---

## 5. Specific Element Classes

- Each HTML tag has its own class, e.g.:

  - `<input>` → `HTMLInputElement`
  - `<body>` → `HTMLBodyElement`
  - `<a>` → `HTMLAnchorElement`

### Example:

```js
alert(document.body.constructor.name); // HTMLBodyElement
```

---

## Example: Inspecting Classes

```html
<input type="text" id="input" />

<script>
  let input = document.querySelector("#input");

  alert(input.constructor.name); // HTMLInputElement
  alert(input instanceof HTMLInputElement); // true
  alert(input instanceof HTMLElement); // true
  alert(input instanceof Element); // true
  alert(input instanceof Node); // true
  alert(input instanceof EventTarget); // true
</script>
```

---

## Checking Node Type

- `nodeType` property:

  - `1` → Element node
  - `3` → Text node
  - `9` → Document node

### Example:

```js
alert(document.body.nodeType); // 1 (Element)
alert(document.body.firstChild.nodeType); // 3 (Text)
alert(document.nodeType); // 9 (Document)
```

---

## `nodeName` and `tagName`

- `tagName`:

  - For element nodes → tag name in **uppercase** (`DIV`, `BODY`).

- `nodeName`:

  - For elements → same as `tagName`.
  - For other nodes → returns node type name (`#text`, `#comment`).

### Example:

```html
<body>
  Hi
  <!-- comment -->
</body>

<script>
  alert(document.body.tagName); // BODY
  alert(document.body.nodeName); // BODY

  alert(document.body.firstChild.tagName); // undefined (text node)
  alert(document.body.firstChild.nodeName); // #text
</script>
```

---

## innerHTML and outerHTML

- `innerHTML` – HTML content inside the element.
- `outerHTML` – full HTML including the element itself.

### Example:

```html
<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.innerHTML); // Hello <b>World</b>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
```

---

## nodeValue / data

- For **text nodes** and **comments**, use `nodeValue` or `data`.

### Example:

```html
<body>
  Hello
  <!-- Comment -->
</body>

<script>
  let text = document.body.firstChild;
  alert(text.data); // Hello

  let comment = text.nextSibling;
  alert(comment.nodeValue); // Comment
</script>
```

---

## textContent

- Returns all text inside an element (without tags).
- Safe against HTML injection — returns text only.

### Example:

```html
<div id="news">
  <h1>Headline!</h1>
  <p>Martians attack people!</p>
</div>

<script>
  alert(news.textContent);
  // Headline! Martians attack people!
</script>
```

---

## hidden Property

- Boolean property that reflects the `hidden` attribute.
- When `true`, the element is hidden (same as `display: none`).

### Example:

```html
<div>Visible</div>
<div hidden>Hidden</div>
```

```js
document.querySelector("div[hidden]").hidden = false; // shows it
```

---

# ✅ Summary

- DOM nodes inherit from a hierarchy: `EventTarget → Node → Element → HTMLElement → specific element classes`.
- `nodeType` and `nodeName/tagName` distinguish between element, text, comment nodes.
- `innerHTML`, `outerHTML`, `nodeValue`, `data`, `textContent` → ways to read content.
- `hidden` attribute/property can show/hide elements easily.

---

🔗 [DOM Attributes and Properties](https://javascript.info/dom-attributes-and-properties)

---

# DOM Attributes and Properties

## 1. DOM Properties

- When the browser parses HTML, it **creates DOM objects**.
- HTML attributes become **properties of DOM objects**.

### Example:

```html
<body id="test" something="non-standard">
  <input type="text" value="Name" />
</body>

<script>
  alert(test.id); // test
  alert(test.something); // undefined (non-standard)
  alert(test.getAttribute("something")); // "non-standard"
</script>
```

🔑 **Takeaway**:

- Standard attributes → become DOM properties.
- Non-standard attributes → accessible only via `getAttribute`.

---

## 2. Property–Attribute Mapping

- DOM properties are **not always strings**.
- They have proper types.

### Example:

```html
<input id="input" type="checkbox" checked />

<script>
  alert(input.type); // checkbox
  alert(input.checked); // true (boolean)
  alert(input.value); // value of the checkbox
</script>
```

- So, `input.checked` is a **boolean**, while `input.value` is a **string**.

---

## 3. DOM Property vs HTML Attribute Differences

- Attributes are always strings.
- Properties can be any type.
- Some properties are **read-only** (cannot be changed by setting the attribute).

### Example:

```html
<input id="input" type="text" value="Hello" />
<script>
  input.value = "New value"; // works
  input.getAttribute("value"); // "Hello" (the original attribute)
</script>
```

- Updating the property does not change the attribute.

---

## 4. `getAttribute`, `setAttribute`, `hasAttribute`, `removeAttribute`

- Work with **HTML attributes**.

### Example:

```html
<input id="input" type="text" value="Test" />

<script>
  alert(input.getAttribute("type")); // text
  input.setAttribute("value", "New");
  alert(input.outerHTML); // <input id="input" type="text" value="New">

  alert(input.hasAttribute("id")); // true
  input.removeAttribute("id");
</script>
```

---

## 5. Property–Attribute Synchronization

- Some properties/attributes are **synced**, but not always.

### Example:

```html
<input id="input" type="text" value="Test" />

<script>
  input.setAttribute("value", "Changed");
  alert(input.value); // Changed

  input.value = "Another";
  alert(input.getAttribute("value")); // Changed (not updated)
</script>
```

🔑 **Takeaway**:

- `value` attribute → initial value.
- `value` property → current live value.

---

## 6. Non-Standard Attributes (`data-*`)

- HTML5 allows **custom attributes** starting with `data-`.
- Accessible via `dataset` property.

### Example:

```html
<div id="elem" data-about="Elephants" data-user-location="street"></div>

<script>
  alert(elem.dataset.about); // Elephants
  alert(elem.dataset.userLocation); // street
</script>
```

⚡ Notes:

- `data-user-location` → `elem.dataset.userLocation` (camelCase).
- Useful for embedding custom data into HTML safely.

---

## 7. Modifying Attributes

- `setAttribute` modifies the HTML attribute.
- Properties should be used to modify the DOM state.

### Example:

```html
<input id="input" type="checkbox" />

<script>
  input.checked = true; // changes the checkbox state
  alert(input.getAttribute("checked")); // null (attribute not updated)

  input.setAttribute("checked", ""); // adds attribute
  alert(input.outerHTML); // <input id="input" type="checkbox" checked="">
</script>
```

---

## 8. Attribute Iteration

- `elem.attributes` provides a collection of all attributes.

### Example:

```html
<body id="page" something="non-standard"></body>

<script>
  for (let attr of document.body.attributes) {
    alert(`${attr.name} = ${attr.value}`);
  }
</script>
```

Output:

```
id = page
something = non-standard
```

---

# ✅ Summary

- Standard HTML attributes → map to DOM properties (typed, not always strings).
- Attributes and properties may sync, but not always (`value`, `checked`).
- `getAttribute/setAttribute/hasAttribute/removeAttribute` → work with HTML attributes.
- `dataset` is for custom attributes (`data-*`).
- Use properties to update DOM state; attributes for initial/default values or serialization.

---

🔗 [Modifying the Document](https://javascript.info/modifying-document)

---

# Modifying the Document

## 1. Creating Elements

- Use `document.createElement(tag)`

### Example:

```js
let div = document.createElement("div");
```

- The element exists in memory, not yet in the document.

---

## 2. Creating Text Nodes

- Use `document.createTextNode(text)`

### Example:

```js
let textNode = document.createTextNode("Here I am");
```

---

## 3. Insertion Methods

### `append`

- Inserts nodes or strings at the end of `elem`.

```js
div.append("Hello");
```

---

### `prepend`

- Inserts nodes or strings at the beginning of `elem`.

```js
div.prepend("Hello");
```

---

### `before`

- Insert nodes or strings **before** `elem`.

```js
div.before("Hello");
```

---

### `after`

- Insert nodes or strings **after** `elem`.

```js
div.after("Hello");
```

---

### `replaceWith`

- Replaces `elem` with nodes or strings.

```js
div.replaceWith("Hello");
```

---

## 4. Example: Insert into Document

```html
<div id="div"></div>
<script>
  div.before("<p>Hi</p>", document.createElement("hr"));
</script>
```

⚡Notes:

- Strings are inserted as **text**, not HTML.
- To insert HTML, use `elem.insertAdjacentHTML`.

---

## 5. `insertAdjacentHTML/Text/Element`

- Syntax:

```js
elem.insertAdjacentHTML(where, html);
```

- Values for `where`:

  - `"beforebegin"` → before `elem`.
  - `"afterbegin"` → inside `elem`, at beginning.
  - `"beforeend"` → inside `elem`, at end.
  - `"afterend"` → after `elem`.

---

### Example:

```html
<div id="div">Hello</div>
<script>
  div.insertAdjacentHTML("beforebegin", "<p>Hey</p>");
  div.insertAdjacentHTML("afterend", "<p>Bye</p>");
</script>
```

---

## 6. Node Removal

- Use `.remove()` to delete a node.

```js
let div = document.querySelector("#div");
div.remove();
```

---

## 7. Cloning Nodes

- `cloneNode(true/false)`

  - `false` → clone only element.
  - `true` → clone element + descendants.

```js
let div2 = div.cloneNode(true);
document.body.append(div2);
```

---

## 8. DocumentFragment

- Special DOM node to optimize multiple insertions.
- Appending a fragment inserts all its children at once.

### Example:

```js
let fragment = new DocumentFragment();

for (let i = 1; i <= 3; i++) {
  fragment.append(document.createElement("div"));
}

document.body.append(fragment);
```

⚡ Benefit: Avoids multiple reflows/repaints.

---

# ✅ Summary

- `createElement` / `createTextNode` → create DOM nodes.
- `append`, `prepend`, `before`, `after`, `replaceWith` → modern insertion methods.
- `insertAdjacentHTML/Text/Element` → insert relative to element with HTML parsing.
- `remove()` → deletes node.
- `cloneNode(true/false)` → deep or shallow clone.
- `DocumentFragment` → efficient batch insert.

---

# Styles and Classes

## 1. Working with `className`

- The `className` property gives the **entire set of CSS classes** as a single string.

```html
<body class="main page"></body>

<script>
  alert(document.body.className); // "main page"
</script>
```

- If you assign a value to `className`, it will **replace all existing classes**:

```js
document.body.className = "class1 class2";
```

⚠️ **Caution for interviews:** Using `className` can unintentionally remove classes that other scripts or libraries have set. It’s not granular.

---

## 2. `classList` – A Safer Way

- Provides a **special object** with methods to manipulate classes individually.

### Methods:

- `element.classList.add("class")` → adds a class.
- `element.classList.remove("class")` → removes a class.
- `element.classList.toggle("class")` → adds if not present, removes if present.
- `element.classList.contains("class")` → checks if a class exists (returns boolean).

```html
<body class="main"></body>
<script>
  document.body.classList.add("article");
  alert(document.body.className); // "main article"
</script>
```

### Iterating over classes:

- `classList` is iterable → you can loop through all classes:

```js
for (let name of document.body.classList) {
  console.log(name); // "main", "article"
}
```

👉 **Interview takeaway:** Prefer `classList` over `className` for toggling or adding/removing specific classes — it’s safer and doesn’t overwrite the whole set.

---

## 3. Working with Styles via `element.style`

- The `style` property allows reading/writing **inline styles only** (those directly written in the `style=""` attribute).

Example:

```js
document.body.style.background = "red";

setTimeout(() => (document.body.style.background = ""), 1000);
```

- Multi-word CSS properties like `background-color` must be written in **camelCase** in JavaScript:

```js
document.body.style.marginTop = "20px";
```

⚠️ Note: `element.style` does **not** return styles from CSS classes or external stylesheets — only inline styles.

---

## 4. Resetting Styles

- To **reset/remove** an inline style, assign an empty string:

```js
document.body.style.display = "";
```

This removes the inline style, letting the CSS rules apply again.

---

## 5. `style.cssText`

- Lets you set or read **all inline styles at once** as a single string:

```js
document.body.style.cssText = `
  color: red;
  background-color: yellow;
  width: 100px;
`;
```

⚠️ Danger: Assigning to `cssText` **overwrites all inline styles**.
So use it only when you want to replace everything.

---

## 6. Getting Computed Styles

- `getComputedStyle(element, [pseudo])` → returns the final, resolved styles after applying:

  - CSS rules
  - Inline styles
  - Inheritance
  - Browser defaults

```js
let computed = getComputedStyle(document.body);
alert(computed.marginTop);
```

- Optional `pseudo` argument lets you read styles for pseudo-elements (`::before`, `::after`).

Example:

```css
p::after {
  content: "!";
  color: red;
}
```

```js
let p = document.querySelector("p");
let style = getComputedStyle(p, "::after");
alert(style.color); // red
```

👉 **Interview takeaway:**

- `element.style` → inline styles only.
- `getComputedStyle` → _final applied values_ (after CSS cascade).
- Use computed styles when you need actual values (e.g., layout measurements).

---

# ✅ Summary for Interviews

- `className`: full string of classes (overwrites everything when set).
- `classList`: granular add/remove/toggle/contains + iterable.
- `element.style`: modifies inline styles only.
- Reset style by assigning `""`.
- `style.cssText`: set multiple inline styles at once, but risky (overwrites).
- `getComputedStyle`: retrieves final, resolved styles (can also check pseudo-elements).

---
