# Doubly Linked and Circular Lists

## Adding structural power adds obligations

A singly linked list gives each node one structural direction: `next`. A **doubly linked list** adds a `previous` link, so an algorithm can move both forward and backward.

That additional capability changes more than traversal. If a node is already known, deletion no longer requires separately locating its predecessor. But every update now has to preserve two directions consistently.

Conceptually:

```text
None ← [A] ⇄ [B] ⇄ [C] → None
        ↑               ↑
       head            tail
```

The extra link improves some operations while increasing:

- memory per node;
- number of assignments per structural update;
- number of invariants that can be broken;
- ownership and lifetime complexity in low-level implementations.

<link rel="stylesheet" href="/Algorithms_and_Complexity/stylesheets/doubly-circular-list-visualization.css">

<div data-doubly-circular-list-viz></div>

<script src="/Algorithms_and_Complexity/javascripts/doubly-circular-list-visualization.js"></script>

## Python node representation

```python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")

@dataclass
class DNode(Generic[T]):
    value: T
    previous: "DNode[T] | None" = None
    next: "DNode[T] | None" = None
```

A list object may additionally store:

```python
class DoublyLinkedList(Generic[T]):
    def __init__(self) -> None:
        self.head: DNode[T] | None = None
        self.tail: DNode[T] | None = None
        self.size = 0
```

The endpoints are part of the representation and therefore part of every mutation proof.

## Core invariant

For every adjacent pair `a` and `b`:

```text
a.next is b  if and only if  b.previous is a
```

For a non-circular list:

```text
empty:
head is None
tail is None
size == 0

non-empty:
head.previous is None
tail.next is None
following next from head reaches tail
following previous from tail reaches head
both traversals visit the same nodes in reverse order
```

A stored `size` must equal the number of real nodes reachable from either direction.

## Why one successful traversal is not enough

Suppose the forward links are correct:

```text
A → B → C
```

but `C.previous` accidentally points to `A`.

A forward traversal prints the expected values, yet backward traversal is wrong and deletion logic that relies on `previous` may corrupt the structure.

Therefore testing only one direction cannot establish the doubly linked invariant.

## Inserting after a known node

Contract:

```text
insert_after(node, value)
precondition:
    node belongs to a valid doubly linked list
postcondition:
    a new node containing value appears immediately after node;
    all previous logical order is preserved;
    both forward and backward links are consistent
```

Python:

```python
def insert_after(node: DNode[T], value: T) -> DNode[T]:
    successor = node.next
    new_node = DNode(value, previous=node, next=successor)

    node.next = new_node
    if successor is not None:
        successor.previous = new_node

    return new_node
```

### Trace

Starting from:

```text
A ⇄ B ⇄ C
```

insert `X` after `B`.

First remember:

```text
node = B
successor = C
```

Create:

```text
X.previous = B
X.next = C
```

Reconnect:

```text
B.next = X
C.previous = X
```

Result:

```text
A ⇄ B ⇄ X ⇄ C
```

A useful discipline is:

1. remember old neighbours;
2. connect the new node to those neighbours;
3. reconnect the neighbours to the new node;
4. update list endpoints if necessary.

## Endpoint insertion

If insertion occurs after the current tail, there is no successor:

```text
before: A ⇄ B → None
                 ↑
                tail

after:  A ⇄ B ⇄ X → None
                     ↑
                    tail
```

A list wrapper must update `tail`:

```python
def append_value(lst: DoublyLinkedList[T], value: T) -> None:
    node = DNode(value, previous=lst.tail)

    if lst.tail is None:
        lst.head = node
        lst.tail = node
    else:
        lst.tail.next = node
        lst.tail = node

    lst.size += 1
```

For the first node, `head` and `tail` become the same object.

## Deleting a known node

A doubly linked list can unlink a known node without searching for its predecessor.

```python
def unlink(lst: DoublyLinkedList[T], node: DNode[T]) -> T:
    predecessor = node.previous
    successor = node.next

    if predecessor is None:
        lst.head = successor
    else:
        predecessor.next = successor

    if successor is None:
        lst.tail = predecessor
    else:
        successor.previous = predecessor

    node.previous = None
    node.next = None
    lst.size -= 1

    return node.value
```

The operation handles middle and endpoint removal with one structure.

### Middle-node trace

Remove `B` from:

```text
A ⇄ B ⇄ C
```

Remember:

```text
predecessor = A
successor = C
```

Reconnect:

```text
A.next = C
C.previous = A
```

Detach:

```text
B.previous = None
B.next = None
```

Result:

```text
A ⇄ C
```

### Removing the only node

Before:

```text
head → X ← tail
size == 1
```

After:

```text
head is None
tail is None
size == 0
```

This case is important because both endpoint conditions change simultaneously.

## Complexity

Given a valid reference to the node:

```text
insert before/after known node: O(1)
delete known node:              O(1)
move to previous/next:          O(1)
search by value:                O(n)
find logical index i:           O(n)
```

The update is constant time because only a fixed number of links and endpoints change. The cost of obtaining the node reference must be analysed separately.

## Ownership in C++ doubly linked structures

Bidirectional links make ownership more subtle than in a singly linked `unique_ptr` chain. If both `next` and `previous` owned their neighbours, the structure would contain ownership cycles.

A common design therefore distinguishes ownership from observation. Conceptually:

```text
container owns nodes
nodes contain non-owning links to neighbours
```

or uses one owning direction and one non-owning direction.

For an educational raw-link node:

```cpp
template <typename T>
struct DNode {
    T value;
    DNode<T>* previous = nullptr;  // non-owning neighbour link
    DNode<T>* next = nullptr;      // non-owning neighbour link
};
```

This representation makes link manipulation visible, but some separate owner must allocate and destroy the nodes correctly. Raw pointers by themselves do not express ownership.

That is the important lesson: **a link tells us how nodes are connected; it does not automatically tell us who owns their lifetime**.

## Circular lists

A **circular list** removes the `None` end marker by connecting the logical end back to the logical beginning.

A circular singly linked list may have:

```text
A → B → C
↑       ↓
└───────┘
```

A circular doubly linked list has both wraparound directions:

```text
head.previous is tail
tail.next is head
```

There is no null structural endpoint in the non-empty state.

## Why circularity changes termination reasoning

This traversal is wrong for a circular list:

```python
while current is not None:
    current = current.next
```

`current` never becomes `None`.

Instead, traversal must detect return to a chosen identity:

```python
def circular_values(head: DNode[T] | None) -> list[T]:
    if head is None:
        return []

    result: list[T] = []
    current = head

    while True:
        result.append(current.value)
        current = current.next
        assert current is not None

        if current is head:
            return result
```

The stopping condition is "we have returned to the start", not "we reached a null link".

## Circular-list invariant

For a non-empty circular doubly linked list:

- `head.previous is tail`;
- `tail.next is head`;
- following `next` eventually returns to `head` after visiting every real node exactly once;
- following `previous` eventually returns to `tail` after visiting the same nodes in reverse order;
- every adjacent pair satisfies the two-way consistency invariant.

If `size` is stored, exactly `size` forward steps from `head` return to `head`.

## Why circular lists are useful

Circularity is a natural representation when the computation repeatedly rotates through active elements:

- round-robin scheduling;
- repeated turn order;
- Josephus elimination;
- cyclic buffers represented by linked nodes;
- playlists or rotations where the logical successor of the final item is the first.

The representation removes wraparound special cases, but it requires an explicit stopping rule.

## Sentinel-based circular design

A **sentinel** is a structural node that does not represent a logical data element.

A circular doubly linked list can use one sentinel so that the empty structure satisfies:

```text
sentinel.next is sentinel
sentinel.previous is sentinel
```

A one-element list becomes:

```text
       ┌──────────────┐
       ↓              │
sentinel ⇄ [A] ───────┘
```

More explicitly:

```text
sentinel.next = A
A.previous = sentinel
A.next = sentinel
sentinel.previous = A
```

Now every real node has both a predecessor and a successor. Insertion and deletion can often avoid separate `None` branches.

## Generic insertion between two neighbours

With a sentinel-based doubly linked representation, one helper can express many operations:

```python
def insert_between(
    predecessor: DNode[T],
    successor: DNode[T],
    value: T,
) -> DNode[T]:
    node = DNode(value, previous=predecessor, next=successor)
    predecessor.next = node
    successor.previous = node
    return node
```

The precondition is crucial:

```text
predecessor.next is successor
successor.previous is predecessor
```

The postcondition replaces that adjacency with:

```text
predecessor ⇄ node ⇄ successor
```

This single operation can support push-front, push-back, and insertion at an iterator position.

## Generic unlink with a sentinel

```python
def unlink_known(node: DNode[T]) -> None:
    predecessor = node.previous
    successor = node.next

    assert predecessor is not None
    assert successor is not None

    predecessor.next = successor
    successor.previous = predecessor
    node.previous = None
    node.next = None
```

The sentinel guarantees that every real node has structural neighbours, even at the logical ends.

## Sentinels: benefit and cost

Benefits:

- fewer endpoint branches;
- one insertion/deletion pattern;
- empty and non-empty representations share the same link rules.

Costs:

- the sentinel must never be exposed as user data;
- traversal must stop at the sentinel;
- `size == 0` no longer means `head is None` if `head` is represented through the sentinel;
- clients must understand that structural nodes and data nodes are not identical concepts.

## Common failures

- updating `next` but forgetting the matching `previous`;
- overwriting a link before saving an old neighbour;
- forgetting to update `head` or `tail` at an endpoint;
- deleting the only node but leaving one endpoint stale;
- using `while current is not None` on a circular list;
- comparing values instead of node identity to detect a full cycle;
- accidentally treating the sentinel as a real element;
- using raw C++ pointers without any clear node owner;
- assuming that extra links improve every operation.

## What you must be able to explain

- What invariant connects forward and backward links?
- Why does a doubly linked list support deletion of a known node without separately finding its predecessor?
- Which assignments are required when a middle node is removed?
- Which endpoint changes occur when the only node is removed?
- Why does a circular traversal terminate by identity rather than by `None`?
- How does a sentinel reduce case analysis?
- What new invariant does a sentinel introduce?
- Why should neighbour links and ownership be treated as separate concepts in C++?
- Why does the additional `previous` link improve convenience but increase structural obligations?
