# Self-Organising Lists and Skip Lists

## Improving access without changing the abstract list

A list can adapt to observed access patterns. The logical set of stored items may remain the same while the physical or traversal order changes to reduce future search cost.

## Self-organising lists

A **self-organising list** rearranges elements after access. Common rules are:

- **move to front** — an accessed item becomes the first item;
- **transpose** — an accessed item swaps with its predecessor;
- **count** — items are ordered by access frequency.

### Move to front

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

The first search remains `O(n)`, but frequently accessed items migrate toward the front. This can improve average observed access time when requests are strongly non-uniform.

The transformation is not free: it changes order. It is appropriate only when list order is an implementation detail rather than part of the required result.

## Why empirical claims need care

A self-organising rule does not guarantee that every individual search becomes faster. Its value depends on the request distribution. Evaluation should compare total cost over a sequence of accesses, not one isolated lookup.

## Skip lists

A **skip list** augments an ordered linked list with additional levels of forward links. The bottom level contains every item. Higher levels contain selected items and allow the search to skip over large regions.

```text
level 2:  -∞ -------- 20 -------- 50 -------- +∞
level 1:  -∞ --- 10 --20 --- 35 --50 --- 70 -- +∞
level 0:  -∞ 5 10 14 20 27 35 41 50 63 70 91 +∞
```

Search begins at the highest level. It moves forward while the next key does not exceed the target, then descends one level. The algorithm combines horizontal progress with vertical refinement.

## Probabilistic height

New nodes commonly receive random heights. Each additional level is included with fixed probability. Under standard assumptions, expected search, insertion, and deletion time is `O(log n)`, while the worst case remains `O(n)`.

This is an expected guarantee, not a deterministic balance guarantee like that of an AVL tree.

## Skip-list invariant

- every level is ordered;
- higher-level nodes also appear at all lower levels down to level zero;
- level zero contains every stored key;
- forward links never move backward in key order.

Insertion must find predecessors at every relevant level before reconnecting links.

## Self-organisation versus indexing

Move-to-front adapts to access frequency but keeps linear worst-case search. A skip list builds a multi-level navigation index that supports logarithmic expected search for ordered keys. They solve different performance problems.

## What you must be able to explain

- When may a list legally reorder itself?
- What workload benefits move-to-front?
- How do skip-list levels accelerate search?
- Which guarantee is expected rather than worst-case?
- What invariant connects higher levels to level zero?
