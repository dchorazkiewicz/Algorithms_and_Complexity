# Replacing Recursion with an Explicit Stack

## Making hidden control state visible

Recursive execution uses the runtime call stack to remember unfinished work. An iterative implementation can store equivalent information in an ordinary stack data structure. This makes pending work visible and avoids dependence on recursion depth limits.

## A simple chain

Recursive countdown:

```python
def print_down(number: int) -> None:
    if number == 0:
        return
    print(number)
    print_down(number - 1)
```

Because no work remains after the recursive call, a loop is enough:

```python
def print_down(number: int) -> None:
    while number > 0:
        print(number)
        number -= 1
```

An explicit stack is useful when earlier calls must resume with saved work.

## Preserving work for unwinding

```python
def print_up(number: int) -> None:
    if number == 0:
        return
    print_up(number - 1)
    print(number)
```

The recursive frames remember numbers to print later. An explicit stack can preserve them:

```python
def print_up(number: int) -> None:
    pending: list[int] = []

    while number > 0:
        pending.append(number)
        number -= 1

    while pending:
        print(pending.pop())
```

The first loop simulates expansion. The second simulates unwinding.

## Factorial with an explicit stack

```python
def factorial_with_stack(number: int) -> int:
    if number < 0:
        raise ValueError("number must be non-negative")

    pending: list[int] = []

    while number > 0:
        pending.append(number)
        number -= 1

    result = 1

    while pending:
        result *= pending.pop()

    return result
```

This mirrors the recursive pending multiplications. A direct loop is simpler, but the stack version exposes the relationship between recursion and saved work.

## Depth-first traversal

For branching structures, explicit stacks are especially useful.

```python
from dataclasses import dataclass


@dataclass
class Node:
    value: int
    children: list["Node"]
```

Recursive preorder:

```python
def preorder(node: Node) -> list[int]:
    result = [node.value]

    for child in node.children:
        result.extend(preorder(child))

    return result
```

Iterative preorder:

```python
def preorder(node: Node) -> list[int]:
    result: list[int] = []
    pending = [node]

    while pending:
        current = pending.pop()
        result.append(current.value)

        for child in reversed(current.children):
            pending.append(child)

    return result
```

Children are pushed in reverse because the last pushed child is processed first.

## Work after subproblems

Postorder needs a stage marker because a node is processed after its children:

```python
def postorder(root: Node) -> list[int]:
    result: list[int] = []
    pending: list[tuple[Node, bool]] = [(root, False)]

    while pending:
        node, expanded = pending.pop()

        if expanded:
            result.append(node.value)
            continue

        pending.append((node, True))

        for child in reversed(node.children):
            pending.append((child, False))

    return result
```

`False` means enter the simulated call. `True` means resume after its children. The Boolean is an explicit continuation state.

## Graph traversal

Graphs may contain cycles, so pending work must be combined with visited-state tracking:

```python
def depth_first(graph: dict[int, list[int]], start: int) -> list[int]:
    order: list[int] = []
    visited: set[int] = set()
    pending = [start]

    while pending:
        vertex = pending.pop()

        if vertex in visited:
            continue

        visited.add(vertex)
        order.append(vertex)

        for neighbour in reversed(graph[vertex]):
            if neighbour not in visited:
                pending.append(neighbour)

    return order
```

The stack stores future work. The set prevents repeated exploration.

## Complexity

Replacing recursion with an explicit stack usually preserves asymptotic running time and the amount of pending-work space. The difference is who manages that space: the language runtime or the algorithm itself.

## A systematic conversion method

1. Identify what one recursive frame must remember.
2. Define a stack item containing that state.
3. Push the initial problem.
4. Pop one item at a time.
5. Perform the corresponding stage of work.
6. Push future work in reverse execution order.
7. Add stage markers for operations that occur after subproblems return.

## What you must be able to explain

You should be able to identify implicit frame state, design explicit stack items, preserve traversal order, and compare recursive stack space with explicit stack space.

## Practice

1. Convert a recursive reverse-order printer to an explicit stack.
2. Explain the reversed child-push order in preorder traversal.
3. Design a frame record for an algorithm that performs work before and after a recursive call.