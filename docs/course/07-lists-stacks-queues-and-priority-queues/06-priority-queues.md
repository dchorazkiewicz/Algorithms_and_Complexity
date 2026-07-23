# Priority Queues

## Removal by priority, not arrival time

An ordinary queue removes the oldest waiting item. A **priority queue** removes an item with the best priority according to a comparison rule.

Typical operations are:

- `insert(item, priority)`;
- `peek_best()`;
- `extract_best()`;
- optionally change an existing priority.

The abstraction does not require a particular representation. An unsorted list, sorted list, binary heap, or more specialised structure can implement it.

## Competing representations

| Representation | insert | peek best | extract best |
|---|---:|---:|---:|
| unsorted list | `O(1)` | `O(n)` | `O(n)` |
| sorted list | `O(n)` | `O(1)` | `O(1)` at an end |
| binary heap | `O(log n)` | `O(1)` | `O(log n)` |

The best choice depends on the operation mix. A structure with rare removals may favour cheap insertion; a scheduler with frequent extraction normally benefits from a heap.

## Python heap example

```python
import heapq

queue: list[tuple[int, int, str]] = []
sequence = 0

heapq.heappush(queue, (2, sequence, "normal task"))
sequence += 1
heapq.heappush(queue, (1, sequence, "urgent task"))
sequence += 1

priority, _, task = heapq.heappop(queue)
```

Python's `heapq` is a min-heap, so smaller keys leave first. The sequence number provides deterministic FIFO behaviour among equal priorities and prevents Python from comparing task objects when priorities tie.

## Stability and tie rules

A priority queue contract must define what happens when priorities are equal. Possible policies include:

- arbitrary order;
- FIFO among ties;
- LIFO among ties;
- comparison by a secondary key.

Without a stated policy, clients must not depend on tie order.

## Lazy deletion and stale entries

Some algorithms insert a new entry when a priority improves rather than locating and updating the old one. When an entry is removed, it is checked against the current best record; stale entries are skipped.

This technique simplifies implementations but increases temporary memory and requires a correctness invariant connecting heap entries to authoritative state.

## Where priority queues appear

- selecting the next shortest tentative path;
- event simulation by earliest timestamp;
- task scheduling;
- merging sorted streams;
- repeatedly extracting the smallest or largest element;
- maintaining a bounded set of best candidates.

## Complexity versus semantic correctness

Using a heap does not automatically make an algorithm correct. The priority key must represent the algorithm's intended choice rule. A fast structure ordered by the wrong quantity merely makes wrong decisions efficiently.

## What you must be able to explain

- How does a priority queue differ from FIFO?
- Why can several representations implement the same interface?
- What tie rule does an application require?
- Why is a sequence number useful in heap entries?
- When is lazy deletion correct?
