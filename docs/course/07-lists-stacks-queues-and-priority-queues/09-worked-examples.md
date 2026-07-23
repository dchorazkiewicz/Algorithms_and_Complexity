# Worked Examples

## Example 1 — Reverse a singly linked list

```python
def reverse(head: Node[T] | None) -> Node[T] | None:
    previous = None
    current = head

    while current is not None:
        successor = current.next
        current.next = previous
        previous = current
        current = successor

    return previous
```

The algorithm maintains two complete logical parts: a reversed prefix and an untouched suffix. Saving `successor` before changing `current.next` preserves access to the suffix. Every node changes its successor once, giving `O(n)` time and `O(1)` auxiliary space.

## Example 2 — Evaluate postfix notation with a stack

```python
def evaluate_postfix(tokens: list[str]) -> int:
    stack: list[int] = []

    for token in tokens:
        if token.lstrip("-").isdigit():
            stack.append(int(token))
            continue

        if len(stack) < 2:
            raise ValueError("invalid postfix expression")

        right = stack.pop()
        left = stack.pop()

        if token == "+":
            stack.append(left + right)
        elif token == "-":
            stack.append(left - right)
        elif token == "*":
            stack.append(left * right)
        else:
            raise ValueError("unknown operator")

    if len(stack) != 1:
        raise ValueError("invalid postfix expression")
    return stack[0]
```

The stack contains values of fully evaluated subexpressions. Operand order matters for subtraction: the first popped value is the right operand.

## Example 3 — Round-robin processing with a queue

```python
from collections import deque

def round_robin(tasks: list[tuple[str, int]], quantum: int) -> list[str]:
    if quantum <= 0:
        raise ValueError("quantum must be positive")

    queue = deque(tasks)
    completion_order: list[str] = []

    while queue:
        name, remaining = queue.popleft()
        remaining -= min(quantum, remaining)

        if remaining == 0:
            completion_order.append(name)
        else:
            queue.append((name, remaining))

    return completion_order
```

FIFO order gives every unfinished task another turn after tasks already waiting. The queue stores exactly the unfinished tasks in future service order.

## Example 4 — Merge several sorted streams with a priority queue

```python
import heapq

def merge_many(streams: list[list[int]]) -> list[int]:
    heap: list[tuple[int, int, int]] = []
    result: list[int] = []

    for stream_index, stream in enumerate(streams):
        if stream:
            heapq.heappush(heap, (stream[0], stream_index, 0))

    while heap:
        value, stream_index, element_index = heapq.heappop(heap)
        result.append(value)

        next_index = element_index + 1
        if next_index < len(streams[stream_index]):
            next_value = streams[stream_index][next_index]
            heapq.heappush(heap, (next_value, stream_index, next_index))

    return result
```

The heap contains the smallest not-yet-output value from each non-exhausted stream. With `k` streams and `N` total elements, time is `O(N log k)` and heap space is `O(k)`.

## Example 5 — LRU-style move-to-front access

```python
def access_order(items: list[str], requests: list[str]) -> list[str]:
    order = items.copy()

    for request in requests:
        try:
            index = order.index(request)
        except ValueError:
            continue
        value = order.pop(index)
        order.insert(0, value)

    return order
```

This array-based illustration makes the policy visible, though each update can cost `O(n)`. A linked move-to-front list can relink a found node without shifting, but finding it is still linear unless another index is maintained.

## Integrated analysis questions

For every example, identify:

1. the abstract data type;
2. the concrete representation;
3. the representation invariant;
4. the precondition and failure behaviour;
5. the dominant operation;
6. the time and auxiliary-space complexity;
7. whether the algorithm mutates or reuses input structure;
8. which alternative representation would change the cost.
