# Singly Linked Lists

<link rel="stylesheet" href="../../../stylesheets/singly-linked-list-visualization.css">
<script src="../../../javascripts/singly-linked-list-visualization.js" defer></script>

## One direction is enough for many algorithms

A **singly linked list** stores each logical element inside a node that also contains a link to the next node.

Conceptually:

```text
head
 ↓
[A | •] → [B | •] → [C | •] → None
```

The list is not defined by where the nodes live in memory. It is defined by which nodes are reachable from `head` by repeatedly following `next`.

That gives us a useful representation invariant:

- every logical element corresponds to exactly one reachable node;
- following `next` from `head` visits nodes in logical order;
- the chain is finite and acyclic unless circularity is explicitly part of the representation;
- the final reachable node has `next is None`;
- if a `tail` pointer is stored, it identifies that final node.

## Python node representation

A simple Python node can be written as:

```python
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")

@dataclass
class Node(Generic[T]):
    value: T
    next: "Node[T] | None" = None
```

Python variables such as `head`, `current`, and `previous` hold references to objects. Assigning one variable to another does not copy the node:

```python
current = head
```

Both names may refer to the same node.

This is central to linked-list reasoning: changing `current.next` mutates the shared node object.

## List ownership versus temporary references

It is helpful to distinguish two roles:

- **structural ownership** — the list representation determines which nodes belong to the structure;
- **temporary observation** — local variables such as `current` temporarily refer to nodes while an algorithm traverses or updates the structure.

In Python, memory reclamation is automatic. If a node becomes unreachable from the list and no other references point to it, the runtime may reclaim it.

In C++, lifetime and ownership must be represented more explicitly.

## A C++ ownership model

One safe educational representation uses `std::unique_ptr` for ownership of the successor:

```cpp
#include <memory>
#include <utility>

template <typename T>
struct Node {
    T value;
    std::unique_ptr<Node<T>> next;

    explicit Node(T value)
        : value(std::move(value)), next(nullptr) {}
};
```

Here each node **owns** its successor. The head of the list owns the first node:

```cpp
std::unique_ptr<Node<int>> head;
```

A local traversal pointer can be non-owning:

```cpp
Node<int>* current = head.get();
```

This pointer observes a node but does not control its lifetime.

The difference is important:

```text
unique_ptr<Node<T>>   → owns a node
Node<T>*              → may merely observe a node
```

A non-owning pointer must never be used after the owned node has been destroyed.

## Traversal

Python:

```python
def values(head: Node[T] | None) -> list[T]:
    result: list[T] = []
    current = head

    while current is not None:
        result.append(current.value)
        current = current.next

    return result
```

### Loop invariant

At the start of each iteration:

- `result` contains exactly the values of nodes before `current`, in order;
- `current` is the first unprocessed node, or `None` if traversal is complete.

### Termination

If the structure is a finite acyclic list, each iteration moves to the next previously unprocessed node. After exactly `n` node visits, `current` becomes `None`.

### Complexity

```text
time: O(n)
auxiliary space excluding returned result: O(1)
```

## Searching

```python
def find(head: Node[T] | None, target: T) -> Node[T] | None:
    current = head

    while current is not None:
        if current.value == target:
            return current
        current = current.next

    return None
```

The best case is `O(1)` when the head matches. The worst case is `O(n)` when the target is absent or near the end.

The returned node is a structural position. If later code mutates or deletes that node, clients must understand whether retaining the reference remains valid.

## Insertion at the front

Contract:

```text
push_front(head, value)
precondition: head represents a valid finite list
postcondition:
    returns a new head whose value is value;
    old list becomes the suffix after the new node
side effects: allocates one new node
```

Python:

```python
def push_front(head: Node[T] | None, value: T) -> Node[T]:
    return Node(value, head)
```

Trace for `A → B → None`, inserting `X`:

```text
before:
head → A → B → None

create:
X.next → A

return:
head → X → A → B → None
```

No existing node moves, so the structural update is `O(1)`.

## C++ push-front with ownership transfer

With `unique_ptr`, ownership must move:

```cpp
template <typename T>
void push_front(std::unique_ptr<Node<T>>& head, T value) {
    auto node = std::make_unique<Node<T>>(std::move(value));
    node->next = std::move(head);
    head = std::move(node);
}
```

The sequence of `std::move` operations transfers ownership rather than copying nodes.

This is a real difference between the Python and C++ implementations. In Python, reference assignment is enough. In C++, an owning `unique_ptr` cannot be copied because two independent owners would violate exclusive ownership.

## Insertion after a known node

Python:

```python
def insert_after(node: Node[T], value: T) -> Node[T]:
    new_node = Node(value, node.next)
    node.next = new_node
    return new_node
```

Suppose:

```text
A → B → C
```

and `node` is `B`.

The safe logical order is:

```text
1. remember old successor C
2. new X points to C
3. B points to X
```

Result:

```text
A → B → X → C
```

The old successor must not be lost.

## Why assignment order matters

Incorrect reasoning:

```python
node.next = Node(value)
node.next.next = node.next
```

After the first assignment the original successor is no longer reachable through `node`. The program has already lost information.

A general linked-update discipline is:

```text
remember old links
construct new relationships
connect the modified structure
only then discard obsolete links
```

## Delete after a known node

Contract:

```text
delete_after(node)
precondition: node.next is not None
postcondition:
    removes the old successor of node;
    node.next becomes the removed node's old successor;
    relative order of all remaining nodes is unchanged
returns: removed value
```

Python:

```python
def delete_after(node: Node[T]) -> T:
    removed = node.next
    if removed is None:
        raise IndexError("no successor to delete")

    node.next = removed.next
    removed.next = None
    return removed.value
```

Setting `removed.next = None` is not required for Python memory reclamation, but it makes the detached status explicit and can help prevent accidental use of the old structural link.

The update is `O(1)` because the predecessor is already known.

## Removing the front node

The head itself requires a different owner update:

```python
def pop_front(head: Node[T] | None) -> tuple[T, Node[T] | None]:
    if head is None:
        raise IndexError("pop from empty list")

    value = head.value
    new_head = head.next
    head.next = None
    return value, new_head
```

The calling structure must replace its stored head with `new_head`.

If the removed node was also the tail, a list object that stores `tail` must update that endpoint too.

## Why a list wrapper helps

Passing only `head` is useful for small algorithms, but a real list often maintains several related fields:

```python
class SinglyLinkedList(Generic[T]):
    def __init__(self) -> None:
        self.head: Node[T] | None = None
        self.tail: Node[T] | None = None
        self.size = 0
```

Now every mutating operation must preserve all three aspects together.

For example, after inserting the first node:

```text
head is tail
size == 1
tail.next is None
```

After removing the only node:

```text
head is None
tail is None
size == 0
```

## Appending with a tail pointer

```python
def append_value(lst: SinglyLinkedList[T], value: T) -> None:
    node = Node(value)

    if lst.tail is None:
        lst.head = node
        lst.tail = node
    else:
        lst.tail.next = node
        lst.tail = node

    lst.size += 1
```

The operation is `O(1)` because `tail` avoids traversal.

Without `tail`, append must normally walk from `head` to the final node, costing `O(n)`.

## Remove first matching value

A sentinel simplifies the special case at the head:

```python
def remove_first(head: Node[T] | None, target: T) -> Node[T] | None:
    sentinel: Node[T] = Node(target, head)
    previous = sentinel
    current = head

    while current is not None:
        if current.value == target:
            previous.next = current.next
            current.next = None
            return sentinel.next

        previous = current
        current = current.next

    return head
```

The sentinel is not a data element. It provides a predecessor even for the original head.

### Complexity

Searching dominates:

```text
best case: O(1)
worst case: O(n)
link update once found: O(1)
```

This is a good example of why "linked deletion is O(1)" is incomplete.

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

### State model

During the loop there are three conceptual regions:

```text
reversed prefix    current       untouched suffix
      ↓               ↓
... ← previous      [node] → successor → ... → None
```

The temporary `successor` is crucial because changing `current.next` destroys the old forward link.

### Trace

For:

```text
A → B → C → None
```

initially:

```text
previous = None
current  = A
```

After processing `A`:

```text
A → None
previous = A
current  = B
```

After processing `B`:

```text
B → A → None
previous = B
current  = C
```

After processing `C`:

```text
C → B → A → None
previous = C
current  = None
```

Return `previous`.

### Invariant

At every loop boundary:

- `previous` heads the correctly reversed prefix;
- `current` heads the untouched suffix;
- together, the two regions contain exactly the original nodes;
- no node belongs to both regions.

### Termination

Each iteration moves one node from the untouched suffix into the reversed prefix. Therefore the untouched suffix strictly decreases.

### Complexity

```text
time: O(n)
auxiliary space: O(1)
```

## C++ reversal with owning links

With `unique_ptr`, reversal also reverses ownership:

```cpp
template <typename T>
std::unique_ptr<Node<T>> reverse(std::unique_ptr<Node<T>> head) {
    std::unique_ptr<Node<T>> previous = nullptr;

    while (head) {
        auto successor = std::move(head->next);
        head->next = std::move(previous);
        previous = std::move(head);
        head = std::move(successor);
    }

    return previous;
}
```

The algorithmic idea is identical to Python, but ownership transfer is explicit. Each `std::move` means that one owner gives up responsibility to another.

This comparison shows why C++ is useful here: the pointer operations expose lifetime and ownership decisions that Python performs implicitly.

## Aliasing hazards

Suppose external code stores:

```python
saved = some_node
```

and the list later removes `some_node`.

In Python, `saved` may keep the object alive even though the node no longer belongs to the list. The node's **object lifetime** and its **membership in the data structure** are different facts.

In C++, a raw observer pointer to a node destroyed by its owner becomes dangling and must not be dereferenced.

Thus an API exposing node references creates obligations beyond the internal link algorithm.

## Common failures

- losing the suffix by changing `next` before saving it;
- forgetting to update `tail` when the last node changes;
- leaving `tail` non-null after removing the only node;
- confusing object identity with value equality;
- claiming `O(1)` deletion while first searching by value;
- repeatedly using indexed lookup on a linked structure;
- accidentally creating a cycle;
- retaining a C++ non-owning pointer after the owning node has been destroyed;
- treating Python reference assignment as a deep copy.

## What you must be able to explain

- Which invariant defines a valid singly linked list?
- Why is a node reference different from an integer position?
- Why does insertion order matter?
- What does a sentinel simplify?
- Which invariant makes reversal understandable?
- Why is searching and then deleting still `O(n)`?
- When must `head`, `tail`, and `size` change together?
- What is the difference between Python references and C++ ownership?
- Why can an unlinked Python node still exist?
- Why can an unlinked C++ node make a raw pointer invalid?
