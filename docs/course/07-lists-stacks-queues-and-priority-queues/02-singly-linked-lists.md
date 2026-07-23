# Singly Linked Lists

## One direction is enough for many algorithms

A singly linked list stores a value and a reference to the next node. The list is reached through `head`; an optional `tail` supports constant-time appending.

```python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")

@dataclass
class Node(Generic[T]):
    value: T
    next: "Node[T] | None" = None
```

The node is only a representation component. The list abstraction must control how nodes are linked and which nodes are reachable.

## Traversal

```python
def values(head: Node[T] | None) -> list[T]:
    result: list[T] = []
    current = head
    while current is not None:
        result.append(current.value)
        current = current.next
    return result
```

The loop invariant is that `result` contains exactly the values before `current`, in order. Each step advances to a previously unprocessed node. If the structure is acyclic, traversal terminates after `n` nodes and costs `O(n)` time.

## Insertion at the front

```python
def push_front(head: Node[T] | None, value: T) -> Node[T]:
    return Node(value, head)
```

The new node becomes the head and points to the old list. No existing node must move, so the operation costs `O(1)`.

## Insertion after a known node

```python
def insert_after(node: Node[T], value: T) -> None:
    node.next = Node(value, node.next)
```

The assignment order matters: the new node must first retain the old successor. Overwriting `node.next` without preserving it would disconnect the remainder of the list.

## Deletion after a known node

```python
def delete_after(node: Node[T]) -> T:
    removed = node.next
    if removed is None:
        raise IndexError("no successor to delete")
    node.next = removed.next
    return removed.value
```

The removed node becomes unreachable from this list once the predecessor bypasses it. In a manual-memory language, ownership and destruction also matter; Python reclaims an unreachable object when no references remain.

## Removing the first matching value

The difficulty is reconnecting the predecessor. A dummy or sentinel node makes deletion at the head obey the same rule as deletion elsewhere.

```python
def remove_first(head: Node[T] | None, target: T) -> Node[T] | None:
    sentinel = Node(None, head)  # type: ignore[arg-type]
    previous = sentinel
    current = head

    while current is not None:
        if current.value == target:
            previous.next = current.next
            return sentinel.next
        previous = current
        current = current.next

    return head
```

The sentinel is not a logical data element. It simplifies boundary handling by guaranteeing that every real node has a predecessor during the algorithm.

## Reversal

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

Three regions exist during the loop: the reversed prefix headed by `previous`, the unprocessed suffix headed by `current`, and the saved `successor` that prevents the suffix from being lost. Time is `O(n)` and auxiliary space is `O(1)`.

## Common failures

- losing the suffix by changing a link before saving it;
- forgetting to update `tail` when the last node changes;
- confusing the empty list with a one-node list;
- creating a cycle accidentally;
- claiming constant-time deletion while first searching by value.

## What you must be able to explain

- Why does insertion order matter?
- What does a sentinel simplify?
- Which invariant makes reversal understandable?
- When must `tail` change?
- Why is searching and then deleting still `O(n)`?
