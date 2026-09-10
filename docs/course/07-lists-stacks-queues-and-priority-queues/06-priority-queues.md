# Priority Queues

## Removal by priority, not arrival time

An ordinary FIFO queue removes the oldest waiting item. A **priority queue** removes an item according to a priority rule.

Typical operations are:

- `insert(item, priority)`;
- `peek_best()` — inspect the item with best priority;
- `extract_best()` — remove and return that item;
- optionally `change_priority(item, new_priority)`;
- optionally `is_empty()` and `size()`.

The word **best** must be defined by the contract. It may mean smallest numeric key, largest numeric key, earliest timestamp, greatest urgency, or another ordering.

## Priority queue is an ADT, not a heap

A binary heap is one common representation of a priority queue, but the concepts are not identical.

```text
priority queue = behavioural contract
binary heap    = one data structure that can implement that contract
```

An unsorted list, sorted list, balanced tree, bucket structure, or heap can all implement priority-based removal with different costs.

This distinction matters because saying "use a priority queue" does not yet determine an implementation.

## Abstract contract

Suppose lower numeric values mean better priority.

For `insert(item, p)`:

```text
postcondition:
    a new entry (item, p) becomes part of the queue;
    all existing entries remain present
```

For `extract_best()`:

```text
precondition: queue is non-empty
postcondition:
    removes exactly one entry whose priority is minimal;
    returns that entry;
    all other entries remain present
```

If several entries have the same minimal priority, the contract must say whether their relative order matters.

## Competing representations

| Representation | insert | peek best | extract best | change arbitrary priority |
|---|---:|---:|---:|---:|
| unsorted list | `O(1)` | `O(n)` | `O(n)` | `O(n)` search |
| sorted array/list | `O(n)` insertion | `O(1)` at chosen end | `O(1)` at chosen end | usually `O(n)` |
| binary heap | `O(log n)` | `O(1)` | `O(log n)` | `O(log n)` if position known |

The best representation depends on the operation mix.

### Workload A — many inserts, one final extraction

An unsorted collection may be reasonable because insertion is cheap and scanning once for the best item costs only one `O(n)` pass.

### Workload B — repeated insert and extract

A heap usually gives a better balance because neither operation becomes linear.

### Workload C — frequent ordered iteration of all items

A structure that maintains full sorted order may be more useful than a heap, because a heap guarantees only that the best item is at the root, not that the entire internal array is sorted.

## Why a heap is not a sorted array

For a min-heap, the invariant is:

```text
every parent priority <= priorities of its children
```

That does **not** imply:

```text
heap array is globally sorted
```

Example valid min-heap array:

```text
[1, 4, 2, 9, 7, 5, 3]
```

The root is minimal, but siblings and distant subtrees need not be globally ordered.

The heap structure preserves exactly the ordering needed for efficient access to the best item.

## Heap operation intuition

### Insert

1. place the new item at the next structural position;
2. compare it with its parent;
3. move it upward while heap order is violated.

This is **sift-up** or **bubble-up**.

### Extract best

1. remove the root;
2. move the final structural item to the root;
3. repeatedly exchange it with the better child while heap order is violated.

This is **sift-down**.

A binary heap has logarithmic height, so both repair processes take `O(log n)` time.

Module 08 develops heaps structurally in more detail; here the heap is studied primarily as a priority-queue representation.

## Python `heapq`

Python's `heapq` module provides min-heap operations over a list:

```python
import heapq

queue: list[tuple[int, str]] = []
heapq.heappush(queue, (2, "normal task"))
heapq.heappush(queue, (1, "urgent task"))

priority, task = heapq.heappop(queue)
```

The first tuple component controls priority.

However, tuple comparison continues to later fields when earlier fields tie. That creates a potential problem if task objects cannot be meaningfully compared.

## Stable tie handling

Suppose equal priorities should preserve arrival order.

Use a sequence number:

```python
import heapq
from itertools import count

counter = count()
heap: list[tuple[int, int, str]] = []

heapq.heappush(heap, (2, next(counter), "task A"))
heapq.heappush(heap, (1, next(counter), "task B"))
heapq.heappush(heap, (2, next(counter), "task C"))
```

Entries are ordered by:

```text
1. priority
2. sequence number
3. task field only if both earlier fields tie
```

Because sequence numbers are unique, FIFO order among equal priorities is explicit and task values do not need to be compared.

## Tie policy is part of the contract

Possible policies include:

- arbitrary order among ties;
- FIFO among ties;
- LIFO among ties;
- secondary key such as deadline or identifier.

If the contract says nothing about ties, clients must not rely on any particular tie order.

## Min-priority versus max-priority

Python `heapq` is naturally a min-heap. If larger numeric values mean better priority, one common transformation is to store negated numeric priorities:

```python
heapq.heappush(heap, (-priority, sequence, item))
```

But the transformation must be understood carefully. Negating a timestamp would make later timestamps leave first, not earlier ones.

The stored key must represent the intended semantic ordering.

## C++ `std::priority_queue`

C++ provides a priority-queue adaptor:

```cpp
#include <queue>
#include <vector>

std::priority_queue<int> queue;
queue.push(10);
queue.push(30);
queue.push(20);

int best = queue.top();  // 30 by default
queue.pop();
```

By default, `std::priority_queue` behaves as a max-priority queue for ordinary numeric comparison.

A min-priority queue can be requested with a comparator:

```cpp
#include <functional>
#include <queue>
#include <vector>

std::priority_queue<
    int,
    std::vector<int>,
    std::greater<int>
> queue;
```

This contrasts usefully with Python's default min-heap convention.

## Priority updates are not automatically easy

A basic heap API efficiently exposes the root. It does not necessarily provide efficient lookup of an arbitrary item.

Suppose an algorithm wants:

```text
change the priority of item X
```

If the heap does not know X's current position, locating it may cost `O(n)`.

To support true `O(log n)` priority updates, implementations may maintain an auxiliary mapping:

```text
item identifier → heap index
```

Every swap must then update that mapping.

This creates a stronger representation invariant:

```text
for every live heap entry, the index map points to its actual current position
```

## Lazy deletion

Another strategy avoids in-place update.

Instead of locating and modifying the old entry:

1. record the new authoritative priority elsewhere;
2. push a new heap entry;
3. leave the old entry in the heap;
4. when an entry reaches the top, discard it if it is stale.

Example:

```python
import heapq

best_priority: dict[str, int] = {}
heap: list[tuple[int, str]] = []


def update(item: str, priority: int) -> None:
    best_priority[item] = priority
    heapq.heappush(heap, (priority, item))


def extract_valid() -> tuple[int, str]:
    while heap:
        priority, item = heapq.heappop(heap)
        if best_priority.get(item) == priority:
            return priority, item
    raise IndexError("priority queue is empty")
```

## Lazy-deletion invariant

The heap may contain stale entries, so "every heap entry is current" is no longer true.

Instead:

- `best_priority[item]` is authoritative;
- a heap entry is valid only if its stored priority equals the authoritative current priority;
- stale entries may be removed without changing the abstract set of current items.

This trades extra memory for simpler updates.

## Correctness of lazy extraction

Suppose the first non-stale heap entry removed has priority `p`.

Any heap entry with priority smaller than `p` was removed earlier. If it was stale, it did not represent an authoritative current item. Therefore no valid current item has priority smaller than `p`.

So the first valid entry is the correct abstract minimum.

## Example — merging sorted streams

Suppose `k` sorted streams contain `N` total values.

Maintain one candidate from each non-exhausted stream:

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
            heapq.heappush(
                heap,
                (streams[stream_index][next_index], stream_index, next_index),
            )

    return result
```

## Merge invariant

At every iteration:

- `result` is globally sorted;
- `result` contains exactly the elements already emitted;
- for each non-exhausted stream, the heap contains that stream's smallest not-yet-emitted element;
- therefore the heap root is the smallest value that can legally appear next globally.

## Complexity of multiway merge

The heap contains at most `k` entries.

Each of `N` output elements causes at most one pop and one push:

```text
time: O(N log k)
heap space: O(k)
output space: O(N)
```

This is better than repeatedly scanning all `k` stream heads when `k` is large.

## Priority queues in algorithms

Priority queues appear whenever the next action is selected by a changing priority rather than by arrival order:

- Dijkstra-style shortest-path selection;
- event simulation by earliest timestamp;
- CPU or task scheduling;
- merging sorted streams;
- best-first search;
- maintaining the top `k` candidates;
- Huffman-style repeated minimum selection.

The priority key must encode the algorithm's intended choice rule.

## Complexity versus semantic correctness

A heap can make the wrong policy fast.

If a scheduler should process earliest deadlines but stores negative deadlines in a min-heap, it will prefer the latest deadline. The data structure is functioning correctly while the algorithm is semantically wrong.

Therefore always state:

1. what "best" means;
2. how the stored key implements that meaning;
3. how ties are handled;
4. whether priorities can change;
5. what operation costs the chosen representation provides.

## Common failures

- treating priority queue and heap as synonyms;
- assuming a heap array is fully sorted;
- failing to specify min versus max semantics;
- failing to define tie behaviour;
- storing task objects in Python tuples that become compared accidentally on ties;
- claiming `O(log n)` arbitrary priority update without a way to locate the item;
- using lazy deletion without authoritative current-state validation;
- forgetting that stale heap entries consume memory;
- choosing a key whose numeric ordering is opposite to the intended semantics.

## What you must be able to explain

- How does a priority queue differ from FIFO?
- Why is a heap one representation rather than the definition of the ADT?
- Which representation is appropriate for different insert/extract workloads?
- Why is a heap not globally sorted?
- What tie rule does an application require?
- Why is a sequence number useful in Python heap entries?
- How do Python `heapq` and C++ `std::priority_queue` differ in default min/max convention?
- Why can arbitrary priority updates require an index map?
- When is lazy deletion correct, and what invariant replaces "all heap entries are current"?
- Why does multiway merge cost `O(N log k)`?
