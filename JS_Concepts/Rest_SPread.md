# Rest & Spread in JavaScript 🧩

## 🧱 1. Introduction

- Modern JavaScript functions (e.g. `Math.max`, `Object.assign`) accept any number of arguments.
- Before ES6, developers used the `arguments` object. Now rest parameters (`...`) and spread syntax (`...`) provide clearer, cleaner solutions. ([JavaScript.info][1])

---

## 🧠 2. Rest Parameters

### What are they?

```js
function sumAll(...args) {
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}
sumAll(1, 2, 3); // 6
```

- The `...args` collects all remaining function arguments into an **array**. ([JavaScript.info][1])

### Partial collection

```js
function showName(first, last, ...titles) {
  // titles = ['Consul', 'Imperator']
}
```

- Named parameters can precede `...rest`, which always gathers the remainder. ([JavaScript.info][1], [MDN Web Docs][2])

### Syntax rules

- Only one rest parameter allowed, and it must be last.
- Cannot assign default value to rest parameter. ([MDN Web Docs][2])

### Why not `arguments`?

- `arguments` is array-like, not a real array.
- Rest parameters are instances of `Array`, so full array methods are available.
- They are optional (do not include named parameters). ([JavaScript.info][1])

### Arrow functions

- Arrow functions do **not** have their own `arguments`; they inherit from the outer scope. ([JavaScript.info][1])

---

## 📣 3. Spread Syntax

### What is it?

```js
let arr = [3, 5, 1];
console.log(Math.max(...arr)); // 5
```

- The `...` expands an **iterable** (array, string, etc.) into individual values. ([JavaScript.info][1])

### Use cases:

1. **Function calls**: `fn(...args)`
2. **Array literals**: `let copy = [...arr]`
3. **Object literals**: shallow-copy or merge: `{ ...obj }` ([MDN Web Docs][3])

### Examples:

- Merge arrays:

  ```js
  let arr1 = [1, 2],
    arr2 = [3, 4];
  let merged = [...arr1, ...arr2]; // [1,2,3,4]
  ```

- Turn string into array:

  ````js
  [..."Hello"] // ['H','e','l','l','o']
  ``` :contentReference[oaicite:24]{index=24}
  ````

---

## 🪞 4. Copying

- **Array copy**:

  ```js
  let arrCopy = [...arr];
  ```

- **Object copy**:

  ```js
  let objCopy = { ...obj };
  ```

- Dropping original reference; shallow vs. deep copy considerations. ([JavaScript.info][1], [MDN Web Docs][3])

---

## 🎯 5. Summary

| Feature             | What it does                             | Where used                                            |
| ------------------- | ---------------------------------------- | ----------------------------------------------------- |
| **Rest parameters** | Gather remaining arguments into an array | Last in function parameter list (`function(...rest)`) |
| **Spread syntax**   | Expand an iterable into separate values  | In function calls, array literals, object literals    |

- `...` is unified syntax, context (parameters vs calls/literals) determines behavior. ([JavaScript.info][1], [Stack Overflow][4])

---

## ✅ 6. Best Practices

- Use **rest parameters** to define functions that take variable numbers of arguments, and treat them as arrays.
- Use **spread syntax** to:

  - Expand iterables into function arguments.
  - Concatenate arrays or clone them.
  - Create shallow copies of objects or merge objects.

- Prefer rest parameters over `arguments` for modern code—cleaner, safer, and array-friendly.
- Use spread for shallow transformations, but rely on deep-copy techniques when needed (e.g. `structuredClone`, etc.).

---

## 🔄 7. “Rest ↔ Spread” Pairing

They are inverse operations:

```js
function concatenate(separator, ...strings) {
  return strings.join(separator);
}
let words = ["this", "is", "a", "test"];
console.log(concatenate("-", ...words)); // "this-is-a-test"
```

- Gather -> `...strings`
- Unpack -> `...words` ([W3docs][5], [FreeCodeCamp][6])

---

### Final Note

- Always check context:

  - `...` in parameter list = **Rest**
  - `...` in calls or literals = **Spread**

These two tools greatly simplify complex argument handling and data structure manipulations in modern JS.

[1]: https://javascript.info/rest-parameters-spread?utm_source=chatgpt.com "Rest parameters and spread syntax - The Modern JavaScript Tutorial"
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters?utm_source=chatgpt.com "Rest parameters - JavaScript - MDN Web Docs - Mozilla"
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax?utm_source=chatgpt.com "Spread syntax (...) - JavaScript - MDN Web Docs - Mozilla"
[4]: https://stackoverflow.com/questions/45518081/javascript-spread-syntax-and-rest-parameters?utm_source=chatgpt.com "JavaScript: Spread Syntax and Rest Parameters - Stack Overflow"
[5]: https://www.w3docs.com/learn-javascript/rest-parameters-and-spread-syntax.html?utm_source=chatgpt.com "JavaScript: Rest Parameters and Spread - W3docs"
[6]: https://www.freecodecamp.org/news/javascript-spread-and-rest-operators/?utm_source=chatgpt.com "JavaScript Spread and Rest Operators – Explained with Code ..."
