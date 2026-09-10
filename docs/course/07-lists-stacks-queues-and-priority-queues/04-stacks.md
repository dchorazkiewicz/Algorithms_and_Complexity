# Stacks

## A list with one accessible end

A **stack** is an abstract data type governed by the LIFO rule:

> the last item inserted is the first item removed.

Its core operations are:

- `push(value)` — insert a new top item;
- `pop()` — remove and return the current top;
- `top()` or `peek()` — inspect the current top without removing it;
- `is_empty()` — test whether the stack contains no items.

The interface deliberately hides arbitrary insertion and removal. That restriction is the meaning of the data type.

<link rel="stylesheet" href="../../../stylesheets/stack-lifo-visualization.css">
<div data-stack-viz></div>
<script src="../../../javascripts/stack-lifo-visualization.js"></script>

## Abstract contract

For `push(x)`:

```text
precondition: none beyond valid stack state
postcondition:
    x becomes the new top;
    all old stack items remain below x in the same order
```

For `pop()`:

```text
precondition: stack is non-empty
postcondition:
    returns the old top;
    removes exactly that item;
    the old second item becomes the new top if one exists
```

The contract says nothing about arrays, links, Python, or C++.

## Representation invariant

A concrete implementation must encode one logical ordering:

```text
bottom ... top
```

For an array-backed representation using the final element as the top:

- logical stack order equals array order from index `0` to `len-1`;
- the top is the final element;
- an empty array represents an empty stack.

For a linked representation using the head as the top:

- `head` refers to the top node;
- `head.next` refers to the item immediately below the top;
- following `next` walks toward the bottom.

## Python list representation

Python's built-in `list` is a natural stack representation because operations at the end are efficient:

```python
class Stack:
    def __init__(self) -> None:
        self._items: list[object] = []

    def push(self, value: object) -> None:
        self._items.append(value)

    def pop(self) -> object:
        if not self._items:
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def top(self) -> object:
        if not self._items:
            raise IndexError("top of empty stack")
        return self._items[-1]

    def is_empty(self) -> bool:
        return not self._items
```

### Cost

```text
push: amortised O(1)
pop from end: O(1)
top: O(1)
is_empty: O(1)
```

The `push` guarantee is amortised because the dynamic array occasionally reallocates and copies its existing references.

## Why front-of-list operations are unnecessary

A stack does not require the top to be at index zero.

Using:

```python
items.insert(0, value)
items.pop(0)
```

would shift existing elements and make operations `O(n)`.

The ADT lets us choose the endpoint that matches the representation efficiently.

## Linked stack

A singly linked list can use `head` as the top:

```python
from dataclasses import dataclass

@dataclass
class StackNode:
    value: object
    next: "StackNode | None" = None


class LinkedStack:
    def __init__(self) -> None:
        self._head: StackNode | None = None
        self._size = 0

    def push(self, value: object) -> None:
        self._head = StackNode(value, self._head)
        self._size += 1

    def pop(self) -> object:
        if self._head is None:
            raise IndexError("pop from empty stack")

        node = self._head
        self._head = node.next
        node.next = None
        self._size -= 1
        return node.value
```

Both `push` and `pop` change only the head link and therefore cost `O(1)` worst case.

The linked version avoids dynamic-array reallocation but allocates one node per item and has extra link overhead.

## Array-backed versus linked stack

| Property | Dynamic array stack | Linked stack |
|---|---|---|
| `push` | amortised `O(1)` | worst-case `O(1)` link update, plus allocation |
| `pop` | `O(1)` | `O(1)` |
| indexed storage | contiguous array of references/values | separate nodes |
| per-item link overhead | none | one `next` link |
| locality | usually better | usually worse |
| reallocation | possible | not for existing nodes |

The ADT behaviour is identical. Representation trade-offs differ.

## C++ representations

### `std::vector` as a stack

```cpp
#include <vector>

std::vector<int> stack;
stack.push_back(10);
stack.push_back(20);
int top = stack.back();
stack.pop_back();
```

This is analogous to Python's array-backed approach: use the final position as the top.

### `std::stack`

C++ also provides a stack adaptor:

```cpp
#include <stack>

std::stack<int> stack;
stack.push(10);
stack.push(20);
int top = stack.top();
stack.pop();
```

`std::stack` intentionally exposes stack operations rather than the complete underlying sequence interface.

This illustrates an ADT design principle: restricting an interface can make incorrect operations impossible or less tempting.

## Underflow and failure contracts

Calling `pop` or `top` on an empty stack is **underflow**.

An implementation must define a failure policy. Possible designs include:

- raise an exception;
- return an optional result;
- require non-emptiness as a precondition and document violation behaviour.

Returning an arbitrary sentinel value is dangerous if that value could also be a legitimate stack element.

## Example — balanced delimiters

```python
def balanced(text: str) -> bool:
    matching = {")": "(", "]": "[", "}": "{"}
    opening = set(matching.values())
    stack: list[str] = []

    for symbol in text:
        if symbol in opening:
            stack.append(symbol)
        elif symbol in matching:
            if not stack:
                return False
            if stack.pop() != matching[symbol]:
                return False

    return not stack
```

## Why LIFO is the correct discipline

When delimiters are nested, the most recently opened unfinished construct must close first.

For:

```text
([{}])
```

trace only the delimiter stack:

```text
read (   → [(]
read [   → [(, []
read {   → [(, [, {]
read }   → [(, []
read ]   → [(]
read )   → []
```

FIFO would be wrong because the first opening delimiter is not generally the next one that must close.

## Invariant for balanced-delimiter scanning

After processing any prefix of the input:

- the stack contains exactly the opening delimiters from that prefix that have not yet been matched;
- they appear in the order in which they were opened;
- the top is the only opening delimiter that may legally match the next closing symbol.

If a closing symbol does not match the top, the prefix cannot be repaired by later input.

## Termination and complexity

Every input symbol is inspected once.

```text
time: O(n)
auxiliary stack space: O(n) worst case
```

The worst case for space occurs for an input containing only opening delimiters.

## Stack as pending work

Stacks are useful whenever the newest unfinished task should resume first.

Examples:

- function calls;
- recursive execution;
- explicit depth-first search;
- expression evaluation;
- undo histories;
- backtracking frames;
- parsing nested structures.

## Example — explicit depth-first traversal

```python
def depth_first(start, neighbours):
    stack = [start]
    visited = {start}

    while stack:
        state = stack.pop()
        yield state

        for neighbour in neighbours(state):
            if neighbour not in visited:
                visited.add(neighbour)
                stack.append(neighbour)
```

The stack stores discovered but not yet processed work. The most recently discovered pending state is processed first.

The exact visitation order may depend on the order in which neighbours are pushed.

## Stack versus call stack

A program can store pending work in two ways:

```text
recursive procedure → language runtime call stack
iterative procedure → explicit stack data structure
```

The algorithmic information is similar: unfinished work must be remembered in LIFO order.

An explicit stack makes that state visible and gives the programmer direct control over what each frame stores.

## When a stack is the wrong structure

A stack is inappropriate when the oldest waiting item must be processed first.

Examples requiring FIFO include:

- fair arrival-order service;
- breadth-first exploration;
- shortest paths by number of edges in an unweighted graph.

Choosing a data structure is therefore part of algorithm design, not just implementation syntax.

## Common failures

- performing stack operations at the expensive front of an array-backed sequence;
- calling `pop` without defining underflow behaviour;
- using FIFO when nested work requires LIFO;
- assuming amortised `O(1)` means every dynamic-array `push` is `O(1)`;
- confusing the stack ADT with one particular standard-library container;
- forgetting that an explicit DFS stack controls visitation order through push order.

## What you must be able to explain

- What makes a stack an ADT rather than a concrete container?
- Which invariant defines the top?
- Why does LIFO fit nested delimiters?
- Why can a Python list and a linked list implement the same stack ADT?
- Why is Python-list `append` amortised rather than strict worst-case `O(1)`?
- What is stack underflow and how should a contract address it?
- How does `std::stack` differ conceptually from using `std::vector` directly?
- Why do recursive calls and explicit stacks represent similar pending work?
- Which algorithms naturally require a stack, and which require a queue instead?
