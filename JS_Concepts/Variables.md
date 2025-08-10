# 📘 JavaScript Variables – Last Minute Notes

## 🧠 What is a Variable?

A variable is a “named storage” for data. We can use variables to store data and access it later.

```js
let message;
message = "Hello!";
alert(message); // Hello!
```

---

## 🏷️ Variable Declaration

### ✅ Using `let`

- Declares a block-scoped variable.
- Can be declared without a value (undefined initially).

```js
let user;
let age;
```

### ✅ Using `let` with assignment

```js
let message = "Hello!";
```

### 🛑 Redeclaration is not allowed

```js
let message = "Hello";
// let message = "World"; ❌ Error
```

---

## ✍️ Variable Naming

**Rules:**

- Only letters, digits, `$`, and `_`.
- Must not start with a digit.
- Case-sensitive (`apple` ≠ `Apple`).
- Use meaningful names: `let userName`, not `let x`.

**Best Practices:**

- Use camelCase.
- Constants in UPPER_SNAKE_CASE if fixed values.

---

## 🤫 Reserved Names

- Can't use reserved keywords like `let`, `class`, `return`, etc.
- Some modern browsers allow it loosely but it’s bad practice.

---

## 🪪 Constants with `const`

- Declares a constant (read-only) variable.
- Must be assigned during declaration.

```js
const myBirthday = "2001-01-01";
```

**Note:** The value itself is not immutable if it’s an object or array.

```js
const user = { name: "John" };
user.name = "Pete"; // ✅ allowed
```

---

## ⚖️ `var` vs `let/const`

### ⚠️ `var` (Old Style - Avoid)

- Has **function scope**, not block scope.
- Can be redeclared.
- Variables are hoisted (defined before declaration).

---

## 🎯 Summary

- Use `let` to declare variables that can be reassigned.
- Use `const` for constants that won’t change.
- Avoid `var`.
- Use meaningful, camelCase names.
- Variable names can contain letters, digits, `$`, `_`, but must not start with a digit.

---

## 🧪 Examples

```js
let admin, name;
name = "John";
admin = name;
alert(admin); // John
```

---

## 🗂️ Extra: Assigning multiple variables

You can assign multiple variables in one line:

```js
let user = "John",
  age = 25,
  message = "Hello";
```

However, for readability, declare one per line in most cases.

---

## ✅ Best Practices Recap

- Declare variables at the top of your code blocks.
- Prefer `const` unless you know the value will change.
- Avoid `var`.
- Use descriptive names.

---

---

# 🟨 `var` - old but important for interview

## 🔸 `var` is Function-Scoped

- Variables declared with `var` are **function-scoped**, not block-scoped.
- A variable declared inside a `function` is only visible inside that function.

````js
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }
  alert(phrase); // ✅ works
}
sayHi();
// alert(phrase); ❌ Error: phrase is not defined
```

````

- `var` ignores block-level scoping like `if`, `for`, etc.

```js
if (true) {
  var test = true;
}
alert(test); // ✅ true (even though it was declared in a block)
```

## 🔸 `var` Variables Are Defined Anywhere in the Function (Hoisting)

- `var` declarations are **hoisted** to the top of the function.
- The variable is "known" from the beginning of the function, but its value remains `undefined` until the assignment.

```js
function sayHi() {
  phrase = "Hello"; // ✅ no error
  alert(phrase);
  var phrase; // declaration is hoisted
}
sayHi();
```

This behaves like:

```js
function sayHi() {
  var phrase;
  phrase = "Hello";
  alert(phrase);
}
```

## 🔸 `var` Is Ignored in Loops

- When declared with `var`, loop variables leak out of the loop block.

```js
for (var i = 0; i < 10; i++) {
  // ...
}
alert(i); // ✅ 10 (still accessible outside loop)
```

## 🔸 IIFE (Immediately Invoked Function Expressions)

- Used in older code to create block-level isolation (since `var` is function-scoped).

```js
(function () {
  var message = "Hello";
  alert(message); // ✅ Hello
})();

alert(message); // ❌ ReferenceError
```

## 🔸 Summary: Differences Between `var`, `let`, and `const`

| Feature            | `var`                            | `let` / `const`           |
| ------------------ | -------------------------------- | ------------------------- |
| Scope              | Function-scoped                  | Block-scoped              |
| Hoisting           | Yes (initialized as `undefined`) | Yes (but not initialized) |
| Can be redeclared  | Yes                              | No                        |
| Temporal Dead Zone | No                               | Yes                       |

---

✅ **Use `let` and `const`** in modern code instead of `var`, unless there's a specific reason.

```

```
