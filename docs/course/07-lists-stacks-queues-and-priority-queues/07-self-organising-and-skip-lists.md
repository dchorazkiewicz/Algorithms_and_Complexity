# Self-Organising Lists and Skip Lists

## Two different responses to expensive linear search

A basic linked list supports sequential traversal. Searching for an arbitrary value is therefore normally `O(n)`.

This chapter studies two structures that respond to that limitation in very different ways:

1. a **self-organising list** changes its order after accesses so that frequently or recently requested elements may move closer to the front;
2. a **skip list** preserves sorted key order and adds probabilistically selected shortcut levels so that search can skip over large regions.

They should not be confused:

```text
self-organising list → adapt traversal order to observed access pattern
skip list            → build a probabilistic multi-level search index
```

Both are explicitly required by the syllabus, and both illustrate an important algorithm-design principle: representation may adapt to the workload.

## Self-organising lists

A **self-organising list** rearranges elements as they are accessed.

Common rules are:

- **move-to-front (MTF)** — move the accessed element directly to the front;
- **transpose** — swap the accessed element with its immediate predecessor;
- **count/frequency ordering** — maintain elements in non-increasing access-count order.

The logical collection of stored values can remain unchanged while the traversal order changes.

But this is legal only if the abstract contract does **not** require a fixed externally visible order.

## When reordering is legal

Suppose the structure represents a dictionary-like collection where the operation is:

```text
find the record with key k
```

and clients do not depend on iteration order. Reordering internal nodes may be a valid optimisation.

Suppose instead the structure represents:

```text
students in official ranking order
```

Then moving the most recently accessed student to the front would change the abstract value. The optimisation would violate the contract.

Before using self-organisation, ask:

> Is order part of the data, or only part of the representation?

## Move-to-front

For a singly linked list:

```python
def move_to_front(head: Node[T] | None, target: T) -> Node[T] | None:
    if head is None or head.value == target:
        return head

    previous = head
    current = head.next

    while current is not None:
        if current.value == target:
            previous.next = current.next
            current.next = head
            return current

        previous = current
        current = current.next

    return head
```

### Contract

```text
precondition: head represents a finite acyclic list
postcondition:
    if target is absent, logical node order is unchanged;
    if target is present, the first matching node becomes the head;
    all other nodes preserve their relative order
```

### Trace

Start with:

```text
A → B → C → D → None
```

Access `C`.

Before relinking:

```text
previous = B
current  = C
```

Detach `C`:

```text
B.next = D
```

Move `C` to front:

```text
C.next = A
head = C
```

Result:

```text
C → A → B → D → None
```

### Cost

Finding the node remains linear:

```text
search: O(n) worst case
relink after discovery: O(1)
```

The goal is not to improve the worst-case bound. The goal is to improve cost over a **sequence of non-uniform accesses**.

## Why move-to-front can help

Suppose requests are:

```text
C, C, C, A, C, C, D, C
```

After the first access, `C` moves to the head. Repeated later accesses can then cost `O(1)` comparisons until other items move ahead of it.

This is useful when there is temporal locality: recently requested values are likely to be requested again soon.

It does not imply every search becomes faster.

## Transpose rule

The **transpose** rule moves an accessed item only one position toward the front:

```text
before: A → B → C → D
access C

after:  A → C → B → D
```

Compared with move-to-front:

- it adapts more gradually;
- one unusual access causes a smaller rearrangement;
- a frequently accessed item needs repeated hits to migrate far forward.

For a singly linked list, implementing transpose requires enough predecessor information to reconnect the local links safely.

## Count/frequency rule

A count-based method associates each item with an access count:

```text
(value, count)
```

After each successful access:

1. increment the item's count;
2. move it toward the front until the list respects non-increasing count order.

Example:

```text
A:8 → B:5 → C:5 → D:2
```

Tie handling must be specified. A stable rule may preserve previous relative order among equal counts.

The method reacts to long-term frequency rather than recent access alone.

## Comparing self-organising rules

| Rule | Adaptation signal | Rearrangement after access | Main intuition |
|---|---|---|---|
| move-to-front | recency | jump directly to front | recent items may be requested again |
| transpose | repeated access | move one position forward | gradual adaptation |
| count | cumulative frequency | maintain count order | frequent items should remain early |

None of these changes the worst-case linear search bound of a simple linked list.

## Measuring a self-organising list correctly

Do not evaluate the method from one lookup.

For access sequence:

```text
r1, r2, ..., rm
```

measure the total number of nodes inspected:

\[
C = \sum_{i=1}^{m} \text{position-cost}(r_i).
\]

Then compare:

- fixed initial order;
- move-to-front;
- transpose;
- count ordering;
- possibly a known frequency-sorted static order.

This makes the workload assumption explicit.

## A small experiment helper

```python
def access_cost(order: list[str], requests: list[str]) -> int:
    current = order.copy()
    total = 0

    for request in requests:
        for index, value in enumerate(current):
            total += 1
            if value == request:
                current.pop(index)
                current.insert(0, value)
                break

    return total
```

This array-based illustration is not the efficient linked implementation; it is a transparent way to count comparisons and observe adaptation.

## Common self-organisation mistake

A successful example is not a universal performance proof.

If accesses are nearly uniform and unpredictable, rearranging the list may provide little benefit. If iteration order matters, rearrangement may be invalid regardless of speed.

Therefore the correct claim is workload-dependent:

> a self-organising rule may reduce total observed search cost under suitable access distributions.

---

# Skip Lists

## Ordered search with multiple forward levels

A **skip list** is an ordered linked structure with several levels of forward links.

The bottom level contains every key. Higher levels contain selected nodes and act as shortcuts.

Example:

```text
level 3:  -∞ -------------------- 50 -------------------- +∞
level 2:  -∞ -------- 20 -------- 50 -------- 70 -------- +∞
level 1:  -∞ --- 10 --20 --- 35 --50 --- 70 --- 91 ------ +∞
level 0:  -∞ 5 10 14 20 27 35 41 50 63 70 84 91 -------- +∞
```

Search moves:

```text
right while safe
↓
down when the next right move would pass the target
```

The algorithm resembles searching with a sparse index above a complete ordered base list.

## Skip-list invariant

For a valid skip list:

- level `0` contains every stored key in sorted order;
- every higher-level node also appears on all levels below it down to level `0`;
- every level is sorted by key;
- forward links never move backward in key order;
- a node's height determines the highest level on which it participates.

If duplicate keys are disallowed, insertion must also preserve key uniqueness.

## Search algorithm

A simplified node representation:

```python
from dataclasses import dataclass, field
from typing import Generic, TypeVar

K = TypeVar("K")
V = TypeVar("V")

@dataclass
class SkipNode(Generic[K, V]):
    key: K
    value: V | None = None
    forward: list["SkipNode[K, V] | None"] = field(default_factory=list)
```

A search conceptually follows this pattern:

```python
def find_node(head: SkipNode[K, V], target: K, level_count: int):
    current = head

    for level in range(level_count - 1, -1, -1):
        while (
            current.forward[level] is not None
            and current.forward[level].key < target
        ):
            current = current.forward[level]

    candidate = current.forward[0]
    if candidate is not None and candidate.key == target:
        return candidate
    return None
```

At each level, the search advances only while the next key is strictly smaller than the target. Once moving right would overshoot, it descends and refines the search using a denser level.

## Search trace

Search for `63` in the earlier diagram.

A possible route is:

```text
-∞ --level 3--> 50
50 cannot move to a key <= 63 at level 3
↓
level 2: next is 70, too large
↓
level 1: next is 70, too large
↓
level 0: move 50 → 63
```

Instead of visiting every base-level key from `5` onward, the search uses higher levels to skip regions.

## Why node heights are random

Balanced search trees enforce structural balance deterministically through rules such as rotations. A skip list usually obtains balance statistically.

A common promotion process is:

```text
node appears at level 0 always
promote to level 1 with probability p
if promoted, promote to level 2 with probability p
continue similarly
```

For `p = 1/2`, approximately:

```text
n nodes at level 0
n/2 at level 1
n/4 at level 2
n/8 at level 3
...
```

in expectation.

This geometric thinning creates a logarithmic expected number of useful levels.

## Random-level generator

```python
import random


def random_level(max_level: int, probability: float = 0.5) -> int:
    level = 0
    while level + 1 < max_level and random.random() < probability:
        level += 1
    return level
```

The returned value can be interpreted as the highest level used by the new node.

## Insertion requires predecessor information

Search for insertion needs more than the final predecessor at level `0`. It needs the last node before the insertion key at every level.

Store them in an `update` array:

```text
update[level] = predecessor whose forward link changes at that level
```

Conceptual insertion:

```python
def locate_predecessors(head, key, level_count):
    update = [None] * level_count
    current = head

    for level in range(level_count - 1, -1, -1):
        while (
            current.forward[level] is not None
            and current.forward[level].key < key
        ):
            current = current.forward[level]
        update[level] = current

    return update
```

If the new node has height `h`, links are changed only for levels `0..h`:

```text
new.forward[level] = update[level].forward[level]
update[level].forward[level] = new
```

This is the multi-level analogue of singly linked insertion after a known predecessor.

## Duplicate-key policy

A skip list must define what insertion does when the key already exists.

Possible contracts:

- reject duplicates;
- replace the stored value;
- allow multiple equal keys with a defined order.

A dictionary-like skip list normally replaces or rejects.

The algorithm must not silently leave the policy ambiguous.

## Deletion

Deletion again locates predecessors at every level. If the target node is present, each level that points to the target bypasses it:

```text
update[level].forward[level] = target.forward[level]
```

After all affected levels are reconnected, the node no longer belongs to the structure.

The same invariant-checking discipline used for linked lists still applies; there are simply more forward chains to preserve.

## Expected complexity

Under the standard independent random-promotion model:

```text
expected search:    O(log n)
expected insertion: O(log n)
expected deletion:  O(log n)
expected space:     O(n)
```

The extra levels do not imply `O(n log n)` expected storage because the expected number of promoted references decreases geometrically.

## Why expected space is linear

With promotion probability `1/2`, the expected total number of level appearances is approximately:

\[
n + \frac{n}{2} + \frac{n}{4} + \frac{n}{8} + \cdots < 2n.
\]

So the expected total number of forward references is proportional to `n`.

## Worst case remains linear

Randomisation does not forbid an unlucky structure.

If almost no useful higher-level shortcuts exist, search can degenerate toward scanning level `0`:

```text
worst-case search: O(n)
```

This differs from an AVL tree, whose balancing invariant gives deterministic `O(log n)` height and search.

## Expected versus amortised

These terms should not be confused.

**Expected complexity** averages over a probability model, such as random skip-list promotions.

**Amortised complexity** gives a bound on the average cost per operation across a sequence, without requiring random input or random choices.

Examples:

```text
skip-list search → expected analysis
dynamic-array append → amortised analysis
```

## Skip list versus balanced search tree

| Property | Skip list | AVL tree |
|---|---|---|
| ordering | sorted | sorted |
| expected search | `O(log n)` | `O(log n)` |
| worst-case search | `O(n)` | `O(log n)` |
| balancing mechanism | random promotion | deterministic rotations |
| structural idea | multiple forward levels | binary tree height balance |

Neither representation is universally superior. The comparison is about guarantees, implementation trade-offs, and workload.

## Self-organisation versus skip indexing

Move-to-front and skip lists solve different problems.

### Move-to-front

- no sorted-order requirement;
- adapts to recent accesses;
- worst-case search remains linear;
- benefit depends on access sequence.

### Skip list

- maintains sorted keys;
- adds probabilistic shortcut levels;
- expected search is logarithmic;
- does not move a key to the front merely because it was accessed.

## Common failures

- self-organising a list whose order is part of its abstract value;
- claiming that move-to-front makes worst-case search logarithmic;
- evaluating self-organisation from one isolated lookup;
- confusing expected skip-list complexity with a worst-case guarantee;
- forgetting that every skip-list higher level must preserve sorted order;
- inserting a tall skip-list node without updating every affected predecessor link;
- failing to define duplicate-key behaviour;
- confusing expected complexity with amortised complexity;
- assuming randomised balancing means the structure is probably correct even when its invariants are broken.

## What you must be able to explain

- When may a list legally reorder itself?
- How do move-to-front, transpose, and count rules differ?
- Why can self-organisation improve total workload cost without improving the worst-case asymptotic bound?
- Why should self-organising policies be evaluated over access sequences?
- How do skip-list levels accelerate search?
- What invariant connects higher levels to level zero?
- Why is predecessor information needed at every affected level for insertion?
- Why are search, insertion, and deletion expected `O(log n)` under standard assumptions?
- Why is expected skip-list space `O(n)` rather than `O(n log n)`?
- Why is the worst case still `O(n)`?
- How does expected analysis differ from amortised analysis?
- How does a skip list differ from an AVL tree in the guarantee it provides?
