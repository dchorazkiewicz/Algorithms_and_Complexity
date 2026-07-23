# Doubly Linked and Circular Lists

## Adding structural power adds obligations

A singly linked list supports movement in one direction. A doubly linked list gives every node both a predecessor and a successor. This makes deletion of a known node and backward traversal convenient, but every update must preserve two directions of linkage.

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

## Core invariant

For every adjacent pair `a` and `b`:

```text
a.next is b  if and only if  b.previous is a
```

In addition, a non-circular list normally has `head.previous is None` and `tail.next is None`.

## Inserting after a known node

```python
def insert_after(node: DNode[T], value: T) -> DNode[T]:
    successor = node.next
    new_node = DNode(value, previous=node, next=successor)
    node.next = new_node
    if successor is not None:
        successor.previous = new_node
    return new_node
```

The operation changes up to four relationships. A useful discipline is to name the old neighbours first, connect the new node to them, and only then reconnect the neighbours.

## Deleting a known node

```python
def unlink(node: DNode[T]) -> tuple[DNode[T] | None, DNode[T] | None]:
    predecessor = node.previous
    successor = node.next

    if predecessor is not None:
        predecessor.next = successor
    if successor is not None:
        successor.previous = predecessor

    node.previous = None
    node.next = None
    return predecessor, successor
```

The endpoint owner must separately update `head` or `tail` when the removed node is an endpoint.

## Circular lists

In a circular list, the final node links back to the first. There is no `None` marker at the logical end. Circularity is useful for repeated rotation, round-robin scheduling, and structures where every element has a successor.

For a non-empty circular doubly linked list:

```text
head.previous is tail
tail.next is head
```

Traversal must stop by identity, not by reaching `None`:

```python
def circular_values(head: DNode[T] | None) -> list[T]:
    if head is None:
        return []

    result = [head.value]
    current = head.next
    while current is not head:
        assert current is not None
        result.append(current.value)
        current = current.next
    return result
```

## Sentinel-based design

A circular sentinel node can represent both ends. An empty list has the sentinel pointing to itself. This removes many `None` cases:

```text
sentinel.next is sentinel
sentinel.previous is sentinel
```

Real nodes are inserted between the sentinel and its neighbours. The trade-off is that algorithms must never confuse the sentinel with a data element.

## Complexity and trade-offs

Given a node reference, insertion and deletion are `O(1)`. Search remains `O(n)`. Compared with singly linked lists, doubly linked lists use more memory and require more assignments per update, but support backward movement and direct deletion without separately finding the predecessor.

## Common failures

- updating `next` but not the matching `previous`;
- forgetting endpoint changes;
- using `while current is not None` on a circular list;
- deleting the only real node without restoring the empty invariant;
- iterating forever because the stopping identity is wrong.

## What you must be able to explain

- What invariant connects forward and backward links?
- Why can deletion of a known node be easier in a doubly linked list?
- How does traversal terminate in a circular list?
- What does a sentinel remove from the case analysis?
- Which new risks accompany additional links?
