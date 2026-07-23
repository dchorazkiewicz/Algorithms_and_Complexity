# Queues

## First in, first out

A **queue** is governed by FIFO order: the first item inserted is the first item removed. Its core operations are:

- `enqueue(value)` at the rear;
- `dequeue()` from the front;
- `front()` or `peek()`;
- `is_empty()`.

Queues model waiting lines, breadth-first exploration, event processing, buffering, and fair scheduling.

## Why removing from the front of a Python list is a poor default

```python
value = items.pop(0)
```

removes the logical front but shifts all remaining elements, so one dequeue costs `O(n)`. Repeating it can produce quadratic total work.

A standard Python implementation uses `collections.deque`:

```python
from collections import deque

queue = deque()
queue.append("A")
queue.append("B")
first = queue.popleft()
```

Both endpoint operations are `O(1)`.

## Linked queue

A singly linked queue maintains both `head` and `tail`:

- dequeue removes `head`;
- enqueue links a new node after `tail`;
- when the last item is removed, both endpoints become `None`.

The empty-state invariant is:

```text
head is None if and only if tail is None
```

For a non-empty queue, `tail.next is None`.

## Circular array queue

A fixed-capacity queue can reuse array positions with circular indices. Instead of shifting elements, it maintains:

- `front_index`;
- logical `size`;
- capacity.

The next rear position is computed modulo capacity:

```python
rear = (front_index + size) % capacity
```

This representation separates logical order from physical position. Wraparound is not reordering; it is address reuse.

## Example: breadth-first processing

```python
from collections import deque

def breadth_first(start, neighbours):
    queue = deque([start])
    visited = {start}

    while queue:
        state = queue.popleft()
        yield state

        for next_state in neighbours(state):
            if next_state not in visited:
                visited.add(next_state)
                queue.append(next_state)
```

FIFO order ensures that states discovered earlier are processed earlier. In an unweighted graph, this is the mechanism behind shortest-path distance by number of edges.

## Queue invariant

At every step, the queue contains discovered but not yet processed items in discovery order. Marking an item visited when it is enqueued prevents multiple copies from entering the queue.

## Common failures

- implementing dequeue with repeated front shifting;
- forgetting to clear `tail` after removing the final node;
- confusing physical circular-array order with logical queue order;
- marking visited too late and enqueuing duplicates;
- using a stack where FIFO order is required.

## What you must be able to explain

- Why does FIFO differ algorithmically from LIFO?
- Why is `pop(0)` expensive on an array-backed list?
- Which endpoint invariant makes a linked queue correct?
- How does a circular buffer avoid shifting?
- Why does breadth-first processing require a queue?
