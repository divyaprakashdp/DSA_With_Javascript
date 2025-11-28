# Mouse Events Basics — Interview Notes

---

## Introduction

- Mouse events aren’t limited to traditional mouse devices—they are also generated on touch devices (phones/tablets), where they’re emulated for compatibility.
  ([JavaScript.info][1])

---

## Mouse Event Types

JavaScript supports several mouse-related events, including:

- `mousedown` / `mouseup` — a mouse button is pressed / released over an element.
- `mouseover` / `mouseout` — when the mouse pointer enters / leaves an element.
- `mousemove` — triggers every time the mouse moves over an element.
- `click` — fires after `mousedown` and `mouseup` on the same element using the **left** mouse button.
- `dblclick` — fires after two clicks on the same element within a short time frame (now rarely used).
- `contextmenu` — fires when the right mouse button is pressed (or context menu is invoked by keyboard).
  ([JavaScript.info][1])

---

## Events Order

A single user action may trigger multiple events in a fixed sequence. For instance, a standard left-click generates:

1. `mousedown` — when the button goes down
2. `mouseup` — when the button is released
3. `click` — after both steps complete successfully

Handlers execute in exactly that order.
([JavaScript.info][1])

---

## Mouse Button Property (`event.button`)

Mouse events include a **`button`** property indicating which button changed state—this is critical for `mousedown` and `mouseup`, as those can occur with any button:

- `0` – Left (primary)
- `1` – Middle (auxiliary)
- `2` – Right (secondary)
- `3` – X1 (typically the back button)
- `4` – X2 (typically the forward button)

Most devices use just `0` or `2`. Touch devices simulate similar events.
([JavaScript.info][1])

There’s also an **`event.buttons`** property—a bitmask of all buttons currently pressed—but it's rarely needed.
([JavaScript.info][1])

Older codebases may use the deprecated `event.which`:

- `1` = left, `2` = middle, `3` = right
  This is no longer recommended.
  ([JavaScript.info][1])

---

## Modifier Keys (`shift`, `alt`, `ctrl`, `meta`)

Mouse events include boolean flags for modifier keys:

- `shiftKey` — Shift
- `altKey` — Alt (or Option on Mac)
- `ctrlKey` — Control
- `metaKey` — Command key on Mac (⌘)

E.g., to run logic only when **Alt+Shift+click** occurs:

```html
<button id="btn">Alt+Shift+Click me!</button>
<script>
  btn.onclick = function (event) {
    if (event.altKey && event.shiftKey) {
      alert("Hooray!");
    }
  };
</script>
```

**Mac note**: On macOS, pressing `Ctrl+Click` may emulate a right-click (`contextmenu`), so if targeting cross-platform users, check:

```js
if (event.ctrlKey || event.metaKey) {
  // handle shortcut
}
```

This ensures both Windows/Linux (`Ctrl`) and Mac (`⌘`) users are covered.
([JavaScript.info][1])

---

## Coordinates: `clientX/Y` vs `pageX/Y`

Mouse event objects provide two coordinate systems:

1. `clientX`, `clientY` — relative to the **viewport** (changes when the page scrolls).
2. `pageX`, `pageY` — relative to the **document** (does not change with scroll).

Example:

```html
<input
  onmousemove="this.value = event.clientX + ':' + event.clientY"
  value="Move over me"
/>
```

`clientX`, `clientY` reflect the cursor's viewport position.
([JavaScript.info][1])

---

## Preventing Text Selection on `mousedown`

Double-click or dragging the mouse can unintentionally select text—sometimes unwanted in interactive interfaces. To prevent that:

```html
<b ondblclick="alert('dblclick')" onmousedown="return false">
  Double-click me
</b>
```

This prevents default selection, so double-click only fires `dblclick`, with no text highlight.
Note: this won't prevent selection if the cursor starts within the text rather than before/after it.
([JavaScript.info][1])

---

### Preventing Copy (`oncopy`)

If you want to block text copying (not foolproof, just deters casual attempts):

```html
<div oncopy="alert('Copying forbidden!'); return false">
  Dear user, copying is forbidden.
</div>
```

The `oncopy` handler intercepts the copy event and cancels it.
However, someone can still access the page source and copy manually.
([JavaScript.info][1])

---

## Summary

Key properties and behaviors of mouse events:

- **`button`**: indicates which button was used (0–4)
- **Modifiers**: `altKey`, `ctrlKey`, `shiftKey`, `metaKey` (check both `ctrlKey` and `metaKey` for cross-platform support)
- **Coordinates**:

  - `clientX`, `clientY` — relative to viewport (changes with scroll)
  - `pageX`, `pageY` — relative to document (fixed)

- Default behavior of `mousedown` includes text selection—can be prevented if unwanted.
  ([JavaScript.info][1])

---
