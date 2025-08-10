# 📘 Function Expressions(JavaScript.info)

## 🔹 Function Declaration vs Function Expression

### Function Declaration

```js
function sayHi() {
  alert("Hello");
}
```

- Declared as a separate statement.
- Created at parse-time (before code execution).
- Can be called before its definition due to hoisting.

### Function Expression

```js
let sayHi = function () {
  alert("Hello");
};
```

- Created when the execution reaches the line.
- Assigned to a variable or property.
- Cannot be called before its definition.

## 🔹 Semicolon `; ` – Needed for Function Expressions

```js
let sayHi = function () {
  alert("Hello");
}; // <-- semicolon is needed here
```

- Function expressions are part of assignment statements, so semicolon is necessary.
- Function declarations don’t need a semicolon.

## 🔹 Callback Functions

Functions in JavaScript are values. You can pass them as arguments.

```js
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function () {
    alert("You agreed.");
  },
  function () {
    alert("You canceled the execution.");
  }
);
```

- Here, `yes` and `no` are **function expressions** passed as arguments.
- Useful in event handling, async code, etc.

## 🔹 Function Expression Can Be Anonymous

```js
let sayHi = function () {
  alert("Hi");
};
```

- Function has no name — it's **anonymous**.
- Assigned to `sayHi` variable.
- Function name is optional in expressions.

## 🔹 Named Function Expression (NFE)

You can give a name to a function expression.

```js
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest");
  }
};
```

- `func` is only visible **inside the function itself**, not outside.
- Useful for recursion or self-reference.
- Cannot be accessed outside: `func("John")` would cause an error.
- If assigned like `let sayHi = func`, only `sayHi()` is accessible.

### Recursion Example

```js
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // recursion
  }
};
```

## 🔹 NFE vs Anonymous Function

```js
let sayHi = function (who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not defined inside
  }
};
```

- In anonymous functions, `sayHi` refers to the **outer variable**.
- If reassigned to something else (e.g., `sayHi = null`), inner call fails.

### Safer with NFE:

```js
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // safe even if outer sayHi is changed
  }
};
```

## 🔹 Summary

| Concept                     | Function Declaration | Function Expression       |
| --------------------------- | -------------------- | ------------------------- |
| Syntax                      | `function f() { } `  | `let f = function () { }` |
| Created                     | At parse time        | When execution reaches it |
| Callable before definition? | ✅ Yes               | ❌ No                     |
| Can be anonymous?           | ❌ No                | ✅ Yes                    |
| Can be passed as argument?  | ✅ Yes               | ✅ Yes                    |

---

🧠 **Key Takeaway**:
Function expressions provide more flexibility: anonymous use, passing as values, defining in conditionals, etc. Function declarations are hoisted and better suited when the function structure is fixed and needed early.

```

```
