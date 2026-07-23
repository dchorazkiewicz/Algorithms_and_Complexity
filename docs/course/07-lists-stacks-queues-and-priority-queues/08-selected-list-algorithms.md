# Selected List Algorithms

## Algorithms must respect representation

A linked list is not an array with different syntax. Efficient algorithms exploit links and one-directional traversal instead of repeatedly asking for indexed positions.

## Find the middle with two speeds

```python
def middle(head: Node[T] | None) -> Node[T] | None:
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

    return slow
```

After each iteration, `fast` has advanced twice as many links as `slow`. When `fast` reaches the end, `slow` is at the middle. Time is `O(n)` and auxiliary space is `O(1)`.

For even length, the contract must specify whether the first or second middle is returned. This version returns the second.

## Detecting a cycle

Floyd's tortoise-and-hare method also uses two speeds:

```python
def has_cycle(head: Node[T] | None) -> bool:
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True

    return False
```

If the list is acyclic, `fast` reaches `None`. If a cycle exists, both references eventually move inside the finite cycle and must meet.

Identity comparison is required. Equal values do not imply the same node.

## Merge two sorted linked lists

```python
def merge_sorted(
    first: Node[int] | None,
    second: Node[int] | None,
) -> Node[int] | None:
    sentinel = Node(0)
    tail = sentinel

    while first is not None and second is not None:
        if first.value <= second.value:
            chosen = first
            first = first.next
        else:
            chosen = second
            second = second.next

        tail.next = chosen
        tail = chosen

    tail.next = first if first is not None else second
    return sentinel.next
```

The invariant is that the result prefix is sorted and contains exactly the consumed nodes from both inputs. Each node is processed once, so the time is `O(n + m)`.

The operation reuses and relinks input nodes. That mutation must be part of the contract. A non-mutating version would need to allocate copies.

## Remove duplicates from a sorted list

```python
def remove_sorted_duplicates(head: Node[T] | None) -> Node[T] | None:
    current = head

    while current is not None and current.next is not None:
        if current.value == current.next.value:
            current.next = current.next.next
        else:
            current = current.next

    return head
```

Sorted order makes duplicates adjacent. Without this precondition, the algorithm would not remove all repeated values.

## Josephus-style circular elimination

A circular list supports repeated movement and deletion without restarting from the front. In a Josephus process, every `k`-th active node is removed until one remains.

The representation avoids wraparound case distinctions, but termination cannot rely on reaching `None`. Instead, the algorithm tracks remaining size or stops when `current.next is current`.

## Complexity lessons

Linked-list algorithms often become inefficient when they simulate indexed access:

```python
for index in range(n):
    node = node_at(head, index)
```

If `node_at` traverses from the head each time, the total cost is `O(n^2)`. A single maintained traversal reference usually gives `O(n)`.

## What you must be able to explain

- Why do two-speed algorithms work without storing positions?
- Why does cycle detection compare identity?
- Which invariant proves sorted merging correct?
- What mutation does merging perform?
- How can repeated indexed lookup accidentally create quadratic cost?
