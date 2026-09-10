# Queues

## First in, first out

A **queue** is an abstract data type governed by FIFO order:

> the first item inserted is the first item removed.

Its core operations are:

- `enqueue(value)` — insert at the rear;
- `dequeue()` — remove and return the front item;
- `front()` or `peek()` — inspect the front item without removing it;
- `is_empty()` — test whether no items are waiting.

Queues model:

- waiting lines;
- breadth-first exploration;
- event pipelines;
- producer-consumer buffering;
- fair scheduling;
- streaming work that must preserve arrival order.

<link rel="stylesheet" href="/Algorithms_and_Complexity/stylesheets/queue-fifo-visualization.css">
<script defer src="/Algorithms_and_Complexity/javascripts/queue-fifo-visualization.js"></script>
<div data-queue-fifo-viz></div>

## Abstract contract

For `enqueue(x)`:

```text
postcondition:
    x becomes the newest item at the rear;
    all old queue items remain before x in the same order
```

For `dequeue()`:

```text
precondition: queue is non-empty
postcondition:
    returns and removes the oldest waiting item;
    relative order of all remaining items is unchanged
```

The queue contract does not require a linked list, deque, or circular array. Those are representation choices.

## Why removing from the front of a Python list is a poor default

Python's built-in `list` is a dynamic-array-like structure. Removing index zero requires the remaining references to shift:

```python
value = items.pop(0)
```

One such operation costs `O(n)` in the number of remaining items.

If we enqueue `n` items and then repeatedly remove the front with `pop(0)`, the total shifting cost is proportional to:

\[
(n-1) + (n-2) + \cdots + 1 = \Theta(n^2).
\]

The code may look like a queue, but the representation makes it unnecessarily expensive.

## Python `collections.deque`

A standard Python queue representation is `deque`:

```python
from collections import deque

queue: deque[str] = deque()
queue.append("A")
queue.append("B")
queue.append("C")

first = queue.popleft()
```

The logical sequence changes as:

```text
enqueue A → [A]
enqueue B → [A, B]
enqueue C → [A, B, C]
dequeue   → [B, C]     returns A
```

Endpoint insertion and removal are `O(1)`.

## Queue representation invariant

For any concrete queue, we need to identify:

- which item is logically first;
- which item is logically last;
- how empty state is represented;
- how enqueue preserves all old relative order;
- how dequeue removes exactly the oldest item.

These facts are independent of the physical layout.

## Linked queue

A singly linked queue naturally uses:

```text
head = front
tail = rear
```

Conceptually:

```text
front                         rear
  ↓                             ↓
[A | •] → [B | •] → [C | None]
```

A minimal Python implementation:

```python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")

@dataclass
class QNode(Generic[T]):
    value: T
    next: "QNode[T] | None" = None


class LinkedQueue(Generic[T]):
    def __init__(self) -> None:
        self.head: QNode[T] | None = None
        self.tail: QNode[T] | None = None
        self.size = 0

    def enqueue(self, value: T) -> None:
        node = QNode(value)

        if self.tail is None:
            self.head = node
            self.tail = node
        else:
            self.tail.next = node
            self.tail = node

        self.size += 1

    def dequeue(self) -> T:
        if self.head is None:
            raise IndexError("dequeue from empty queue")

        node = self.head
        self.head = node.next
        node.next = None
        self.size -= 1

        if self.head is None:
            self.tail = None

        return node.value
```

## Linked-queue invariant

The important endpoint conditions are:

```text
head is None  if and only if  tail is None
```

For a non-empty queue:

```text
head is the oldest item
tail is the newest item
tail.next is None
following next from head reaches tail
stored size equals number of reachable nodes
```

The most common endpoint bug occurs when the last node is removed and `head` becomes `None` but `tail` is left pointing to the detached node.

## Trace: removing the final node

Before:

```text
head ─┐
      ↓
     [A | None]
      ↑
tail ─┘
size = 1
```

After `dequeue()`:

```text
head = None
tail = None
size = 0
return A
```

If `tail` were not cleared, the empty invariant would be false and a later enqueue could attach a new node to a stale object rather than rebuilding a valid queue.

## Cost of a linked queue

With both endpoints stored:

```text
enqueue: O(1)
dequeue: O(1)
front:   O(1)
space:   O(n) plus one link per node
```

Without a tail pointer, enqueue would require traversal and become `O(n)`.

## Circular array queue

A queue can also be represented inside a fixed-capacity array without shifting elements.

Maintain:

- `front_index` — physical position of the logical front;
- `size` — number of stored elements;
- `capacity` — number of available array slots.

The physical position for the next enqueue is:

\[
(\text{front\_index} + \text{size}) \bmod \text{capacity}.
\]

Example with capacity `5`:

```text
physical indices: 0   1   2   3   4
storage:          C   D   .   A   B
```

The logical queue may be:

```text
A, B, C, D
```

with:

```text
front_index = 3
size = 4
```

The rear has wrapped around numerically, but logical FIFO order is unchanged.

## Fixed circular-buffer implementation

```python
class CircularQueue:
    def __init__(self, capacity: int) -> None:
        if capacity <= 0:
            raise ValueError("capacity must be positive")

        self._items: list[object | None] = [None] * capacity
        self._front = 0
        self._size = 0

    def is_empty(self) -> bool:
        return self._size == 0

    def is_full(self) -> bool:
        return self._size == len(self._items)

    def enqueue(self, value: object) -> None:
        if self.is_full():
            raise OverflowError("queue is full")

        rear = (self._front + self._size) % len(self._items)
        self._items[rear] = value
        self._size += 1

    def dequeue(self) -> object:
        if self.is_empty():
            raise IndexError("dequeue from empty queue")

        value = self._items[self._front]
        self._items[self._front] = None
        self._front = (self._front + 1) % len(self._items)
        self._size -= 1
        return value
```

## Circular-buffer invariant

At every valid state:

- `0 <= size <= capacity`;
- if `size > 0`, `front_index` identifies the logical first item;
- logical item `j` is stored at physical index `(front_index + j) % capacity`;
- enqueue writes only to the first free logical rear position;
- dequeue advances the logical front by exactly one item.

Using an explicit `size` cleanly distinguishes empty and full states even when the front and rear positions coincide modulo capacity.

## Empty versus full ambiguity

If an implementation stores only two indices, a state such as:

```text
front == rear
```

may be ambiguous: does it mean empty or full after wraparound?

Common solutions are:

- store `size`;
- leave one physical slot unused;
- store an additional full/empty flag.

The representation must define the distinction explicitly.

## C++ queue representations

C++ provides a queue adaptor:

```cpp
#include <queue>

std::queue<int> queue;
queue.push(10);
queue.push(20);
int first = queue.front();
queue.pop();
```

The adaptor exposes FIFO operations while hiding arbitrary access to the underlying container.

A `std::deque` can also be used directly when both-end operations are needed:

```cpp
#include <deque>

std::deque<int> values;
values.push_back(10);
values.push_back(20);
values.pop_front();
```

Again, the distinction is between the ADT interface and a more general representation.

## Example — breadth-first processing

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

## Queue invariant in breadth-first search

At every iteration:

- every queued state has been discovered but not yet processed;
- queued states appear in discovery order;
- every discovered state is marked in `visited`;
- no state needs to be enqueued more than once.

Marking at enqueue time is important. If marking is delayed until dequeue, the same state may be inserted multiple times by different predecessors.

## Why FIFO creates breadth layers

Assume the start has distance `0`.

Its neighbours are discovered at distance `1` and appended after it. Before any distance-2 state can be processed, all earlier distance-1 states already waiting in the queue are processed first.

This is why BFS on an unweighted graph discovers vertices in nondecreasing number-of-edges distance from the start.

The queue is not just a storage detail. FIFO order is part of the algorithm's correctness argument.

## Stack versus queue

Compare the service discipline:

```text
stack: newest pending item first  → depth-first behaviour
queue: oldest pending item first  → breadth-first / arrival-order behaviour
```

Replacing one with the other can fundamentally change the algorithm.

## Queue underflow and bounded overflow

For an unbounded logical queue, the usual invalid operation is:

```text
dequeue from empty queue
```

A fixed-capacity circular queue introduces another condition:

```text
enqueue into full queue
```

The API must specify whether full-buffer insertion:

- raises an error;
- blocks;
- overwrites the oldest item;
- grows the storage;
- drops the new item.

Different systems need different contracts.

## Common failures

- implementing repeated dequeue with `list.pop(0)`;
- forgetting to clear `tail` after removing the final linked node;
- confusing physical circular-array order with logical FIFO order;
- failing to distinguish full from empty in a ring buffer;
- marking a graph vertex visited too late and enqueuing duplicates;
- assuming a queue and a deque are the same abstraction;
- using a stack where FIFO order is required;
- leaving overflow or underflow behaviour unspecified.

## What you must be able to explain

- What makes FIFO the defining queue property?
- Why is `pop(0)` expensive on an array-backed Python list?
- Which endpoint invariant makes a linked queue correct?
- Why must `tail` be cleared when the final node is dequeued?
- How does a circular buffer avoid shifting?
- How do logical and physical queue order differ after wraparound?
- Why can `front == rear` be ambiguous without additional state?
- Why does breadth-first search require FIFO pending work?
- How do Python `deque`, C++ `std::queue`, a linked queue, and a circular buffer implement the same abstract behaviour differently?
