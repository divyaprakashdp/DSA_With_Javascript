# Arrow Functions – Ultimate Last-Minute Notes

---

## 🔹 Basics

- **Definition**: A concise syntax for function expressions:

  ```js
  let func = (arg1, arg2, …) => expression;
  ```

  Equivalent to:

  ```js
  let func = function(arg1, arg2, …) {
    return expression;
  };

  ```

- **Examples**:

  ```js
  let sum = (a, b) => a + b;
  let double = (n) => n * 2;
  let sayHi = () => alert("Hello!");
  ```

---

## 🔹 Multi-line Arrow Functions

- Use `{ … }` and explicit `return`:

  ```js
  let sum = (a, b) => {
    let result = a + b;
    return result;
  };
  ```

---

## 🔹 Parameter Syntax Rules

- **One parameter** → omit parentheses:

  ```js
  (param) => expression;
  ```

- **No parameters** → empty parentheses:

  ```js
  () => expression;
  ```

- **Multiple or default/rest/destructured parameters** → parentheses required:

  ```js
  (a, b, …r) => …
  (a = 400, b = 20) => …
  ([x, y] = [10,20]) => …
  ({ a, b }) => …

  ```

---

## 🔹 Return Value Variants

1. **Expression body** (implicit return):

   ```js
   (a, b) => a + b;
   ```

2. **Block body** (explicit return):

   ```js
   (a, b) => {
     return a + b;
   };
   ```

3. **Returning objects** → wrap in parentheses:

   ```js
   () => ({ key: value });
   ```

---

## 🔹 Differences from Regular Functions

- **No `this` binding**:

  - `this` is lexically inherited from the surrounding context ([JavaScript.info][1], [MDN Web Docs][2])
  - Not suitable as object methods if they rely on their own `this` ([MDN Web Docs][2])

- **No `arguments` object**:

  - Use rest syntax `(...args)` instead ([GeeksforGeeks][3], [JavaScript.info][1])

- **Cannot be used as constructors**:

  - Lack `prototype`; `new Arrow()` throws error ([JavaScript.info][1])

- **Cannot use `yield`** (no generators) ([MDN Web Docs][2], [GeeksforGeeks][3])

- **No `super` or `new.target`**, per spec ([GeeksforGeeks][3])

---

## 🔹 Lexical Binding of `this`

- Example:

  ```js
  let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList() {
      this.students.forEach((student) => alert(this.title + ": " + student));
    },
  };
  group.showList();
  ```

  Here, `this` inside arrow refers to outer method’s `this`, so works fine. With normal functions, it’d be `undefined`. ([JavaScript.info][1])

---

## 🔹 No Dynamic `this` → No `.call/.apply/.bind`

- Arrow functions ignore `.call`, `.apply`, and `.bind()` for `this` – it remains the lexical one ([MDN Web Docs][2])

---

## 🔹 No `arguments`

- Arrow functions don’t have their own `arguments`; they use the outer scope’s or use rest `...args` ([JavaScript.info][1])

---

## 🔹 Invalid as Constructors

- Calling with `new` causes `TypeError: not a constructor` ([JavaScript.info][1])

---

## 🔹 No Generator Support

- `function*` and `yield` are disallowed inside arrow functions ([GeeksforGeeks][3])

---

## 🔹 No Line Break Before Arrow

- Syntax error if a newline precedes `=>`, must place line break after it or wrap in parentheses/braces ([MDN Web Docs][2])

---

## 🔹 Precedence Parsing Quirks

- `=>` has low precedence, so wrap expressions in parentheses to avoid ambiguity:

  ```js
  callback = callback || (() => {});
  ```

---

## 🔹 Practical Use Cases

- **Array methods**:

  ```js
  arr.map((v) => v * 2);
  arr.filter((v) => v % 2 === 0);
  arr.sort((a, b) => a - b);
  ```

- **Event handlers / timers**:

  ```js
  setTimeout(() => this.count++, 1000);
  ```

- **Higher‑order functions**:

  ```js
  promise.then(a => …).then(b => …);
  defer(f, ms) {
    return function() {
      setTimeout(() => f.apply(this, arguments), ms);
    };
  }

  ```

- **Returning object literals**:

  ```js
  const makePerson = (f, l) => ({ first: f, last: l });
  ```

---

## 🔹 Advantages & Drawbacks

**Pros:**

- Very concise syntax, especially for one-liners ([JavaScript.info][4])
- Lexical `this` avoids frequent bugs ([Medium][5])
- Integrates well with functional patterns and promises ([Medium][5])

**Cons:**

- More syntax forms can confuse beginners ([info.codecast.io][6])
- Not usable as object methods or constructors ([MDN Web Docs][2])
- No `arguments`, `this`, `super`, `new.target`, or generator support ([GeeksforGeeks][3])
- Implicit returns are less flexible for multi-statement logic ([info.codecast.io][6])

---

## 🔹 Best Practices

- Use for short callbacks (e.g., array methods, promise chains, timers) ([GeeksforGeeks][3])
- Avoid as methods when `this` refers to the object ([MDN Web Docs][2], [GeeksforGeeks][3])
- Use only when concise readability matters — for complex logic, prefer normal functions ([Medium][5])

---

## 🔹 Quick Side-by-Side Comparison

| Feature                  | Arrow Functions             | Regular Functions        |
| ------------------------ | --------------------------- | ------------------------ |
| Syntax                   | `(a, b) => a + b`           | `function(a, b) { ... }` |
| `this`                   | **Lexical**                 | **Dynamic**              |
| `arguments`              | No built-in                 | Available                |
| Constructors (`new`)     | ❌ Not allowed              | ✅ Allowed               |
| Generator functions      | ❌ Not allowed              | ✅ Allowed               |
| Return syntax            | Implicit (expr) or explicit | Explicit via `return`    |
| Use as object methods    | ⚠️ Careful with `this`      | ✅ Works                 |
| Line breaks before arrow | ❌ Syntax error             | ✅ Fine                  |

---

## ✅ Summary

- **Syntax modes**: implicit vs block body
- **Parameter rules**: parentheses optional only for single simple params
- **Return quirks**: wrap object literals with `(...)`
- **Lexical behavior**: `this`, `arguments`, `super` bound lexically
- **Restrictions**: no constructor, no generator, no `new.target`
- **Common use**: array ops, callbacks, timers, promise chains
- **Best suited**: short and context-preserving functions
- **Avoid**: as object methods or when needing dynamic context

---

## 📚 Further Reading

- Deep-dive revisited concepts: arrow functions revisited ([MDN Web Docs][2], [Medium][5], [GeeksforGeeks][3], [JavaScript.info][1])
- MDN reference: arrow function expression specs & behavior ([MDN Web Docs][2])
- Advanced pitfalls: implicit return, object literals ([info.codecast.io][6])

---
