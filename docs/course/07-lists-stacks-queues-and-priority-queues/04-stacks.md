# Stacks

## A list with one accessible end

A **stack** is an abstract data type governed by the LIFO rule: the last item inserted is the first item removed. Its core operations are:

- `push(value)`;
- `pop()`;
- `top()` or `peek()`;
- `is_empty()`.

The interface deliberately hides arbitrary insertion and removal. That restriction is what gives the structure meaning.

## Representation invariant

The top identifies the most recently pushed item that has not yet been removed. If the stack is represented by a Python list, the final list position is a natural top:

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
```

Appending and removing at the end are amortised `O(1)`.

## Linked implementation

A singly linked list can use its head as the stack top. Both push and pop then change only the head link and cost `O(1)`.

The abstract behaviour is the same even though memory layout differs. This demonstrates why an ADT should be separated from its representation.

## Example: balanced delimiters

```python
def balanced(text: str) -> bool:
    opening = "([{"
    matching = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    for symbol in text:
        if symbol in opening:
            stack.append(symbol)
        elif symbol in matching:
            if not stack or stack.pop() != matching[symbol]:
                return False

    return not stack
```

The stack stores unmatched opening delimiters. The top is the only delimiter that can legally match the next closing symbol because nested structures close in reverse order.

## Stack as pending work

Stacks also represent unfinished computations:

- function calls;
- explicit depth-first search;
- expression evaluation;
- undo histories;
- backtracking frames.

The common idea is that the most recently suspended task resumes first.

## Underflow and contracts

Calling `pop` on an empty stack violates the normal precondition. An implementation must choose a clear failure policy: exception, optional result, or explicit status. Returning an arbitrary sentinel without documentation makes the contract ambiguous.

## What you must be able to explain

- Why does LIFO fit nested delimiters?
- Which invariant defines the top?
- Why can different representations implement the same stack ADT?
- What is stack underflow?
- Which algorithms naturally store pending work in a stack?
