# JavaScript Function Basics – Last Minute Notes

## 🧠 What is a Function?

- A function is a **reusable block of code** to perform a particular task.
- It can be called/invoked anywhere in the program after its declaration.

```js
function showMessage() {
  alert("Hello everyone!");
}
```

- Function declaration begins with `function` keyword, followed by:

  - Name: `showMessage`
  - Parameters in `()` (empty here)
  - Function body inside `{}`

---

## 📞 Calling a Function

```js
showMessage();
showMessage();
```

- Each time it's called, it runs the code inside.

---

## 📌 Local Variables

- Variables declared inside a function are **local** to that function.

```js
function showMessage() {
  let message = "Hello, I'm JavaScript!";
  alert(message);
}
```

- `message` is not accessible outside the function.

---

## 🔗 Outer Variables

- A function can access **outer (global) variables**.

```js
let userName = "John";

function showMessage() {
  let message = "Hello, " + userName;
  alert(message);
}

showMessage(); // Hello, John
```

- It uses `userName` from outside the function.
- If the function has a **local variable with the same name**, it shadows the outer one.

```js
let userName = "John";

function showMessage() {
  let userName = "Bob"; // overrides the outer variable
  let message = "Hello, " + userName;
  alert(message);
}

showMessage(); // Hello, Bob
```

---

## 🔢 Parameters

- We can pass data into functions via **parameters**.

```js
function showMessage(from, text) {
  alert(from + ": " + text);
}

showMessage("Ann", "Hello!"); // Ann: Hello!
showMessage("Ann", "What's up?"); // Ann: What's up?
```

- Parameters act like local variables.

---

## 🧮 Default Values

- If a parameter is **not provided**, it becomes `undefined`.

```js
function showMessage(from, text) {
  if (text === undefined) {
    text = "no text given";
  }
  alert(from + ": " + text);
}

showMessage("Ann"); // Ann: no text given
```

- Modern way: **default values**

```js
function showMessage(from, text = "no text given") {
  alert(from + ": " + text);
}
```

---

## 🧰 Alternative Default Using `||`

```js
function showMessage(text) {
  text = text || "empty";
  alert(text);
}
```

- But `||` replaces falsy values like `0`, `""`, `null`, `undefined`.

---

## 🔁 Returning a Value

- Functions can return a value using `return`.

```js
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert(result); // 3
```

- `return` stops function execution and returns the value.

```js
function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm("Do you have permission from your parents?");
  }
}
```

- A function with no `return` (or just `return;`) returns `undefined`.

---

## 📦 Naming a Function

Good function names should be:

- Brief
- Describe clearly what the function does

Examples of good names:

- `showMessage()` – shows a message
- `getAge()` – returns age
- `calcSum(a, b)` – returns sum
- `createForm()` – creates a form

Common prefixes:

- `"get…"`, `"calc…"`, `"create…"`, `"check…"` etc.

---

## 📝 One Function – One Action

- Function should do **exactly one task**.

Bad:

```js
function getUserDataAndShowWelcomeMessage() {
  // does 2 things: gets data and shows message
}
```

Better:

```js
function getUserData() {}
function showWelcomeMessage() {}
```

---

## 🪪 Functions == Comments

- If function is named well, the call itself tells what it does:

```js
// Bad
show("Welcome", "John");

// Good
showWelcome("John");
```

---

## 🧪 Summary

### Function Declaration Syntax

```js
function name(parameters) {
  // body
}
```

### Key Concepts

- Local variables only accessible inside function.
- Can access outer/global variables.
- Parameters passed to function act like local variables.
- Use default values with `=`.
- `return` gives value back to caller.
- Good function name = clear and concise.
- One function = One purpose.
