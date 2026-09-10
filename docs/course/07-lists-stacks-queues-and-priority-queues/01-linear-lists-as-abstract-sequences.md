# Linear Lists as Abstract Sequences

## Begin with behaviour, not links

A **linear list** is an ordered finite sequence of elements. Except at the ends, every logical position has one predecessor and one successor.

That definition does not say whether elements are stored:

- in adjacent memory locations;
- inside separately allocated nodes;
- inside a resizable array;
- behind references managed by a library container.

Those are representation decisions. The abstract list describes **what operations mean**; the representation determines **how those operations are performed and what they cost**.

This separation is essential throughout data structures:

```text
abstract value and operations
            ↓
representation invariant
            ↓
implementation
            ↓
actual operation costs
```

## The list ADT

A list interface may provide operations such as:

- `length()` — return the number of elements;
- `is_empty()` — test whether the sequence contains no elements;
- `get(i)` — return the element at position `i`;
- `set(i, value)` — replace the element at position `i`;
- `insert(i, value)` — insert before the old position `i`;
- `remove(i)` — remove and return the element at position `i`;
- `find(value)` — locate an occurrence;
- traversal from first to last.

The interface needs contracts. For example:

```text
get(i)
precondition: 0 <= i < length
postcondition: returns the element currently stored at logical position i
side effects: none
```

For insertion:

```text
insert(i, value)
precondition: 0 <= i <= length
postcondition:
    value occupies position i;
    old positions i..length-1 shift logically one position right;
    relative order of all old elements is preserved
```

These contracts describe meaning independently of storage.

## Sequence position versus structural position

A public list often speaks about integer positions. A linked implementation naturally works with **node references**.

Those are different kinds of location.

If the operation is:

```text
remove the element at logical index i
```

then a singly linked list must normally traverse from the head until it reaches that position. The link update itself may be constant time, but finding the location is not.

If instead the operation is:

```text
remove the node immediately after this already-known node
```

then no search is needed.

This is why complexity claims must state what information is supplied to the operation.

## Two representations of the same logical sequence

Consider the sequence:

```text
[A, B, C, D]
```

A contiguous representation may look conceptually like:

```text
index:    0    1    2    3
memory:  [A]  [B]  [C]  [D]
```

A singly linked representation may look like:

```text
head
 ↓
[A | •] → [B | •] → [C | •] → [D | None]
```

The logical order is identical. The paths used to reach an element are not.

## Dynamic array versus linked list

A dynamic array keeps elements in contiguous storage and may reserve spare capacity. A linked list stores elements in nodes connected by links.

| Operation | Dynamic array | Singly linked list |
|---|---:|---:|
| read by index | `O(1)` | `O(n)` |
| replace by index | `O(1)` | `O(n)` |
| search by value | `O(n)` | `O(n)` |
| insert at front | `O(n)` | `O(1)` |
| append with sufficient capacity / tail | amortised `O(1)` | `O(1)` with tail |
| delete after known structural position | requires movement of suffix | `O(1)` |
| traverse all elements | `O(n)` | `O(n)` |

The table is meaningful only with its assumptions. For example, linked append is `O(1)` only if the representation maintains a tail pointer. Without one, locating the final node costs `O(n)`.

## Why direct indexed access is different

For an array-like representation, the address of element `i` can be computed conceptually as:

\[
\text{base} + i \cdot \text{element-size}.
\]

The representation therefore supports direct access.

A linked list contains no equivalent arithmetic path. To reach the third successor, the algorithm must follow three links. Hence indexed access is proportional to distance from a known starting point.

## Representation invariants

Every concrete representation needs a statement describing valid structural states.

For a finite singly linked list with `head`, optional `tail`, and stored `size`:

- `head is None` exactly when `size == 0`;
- if `size == 0`, then `tail is None`;
- if the list is non-empty, `tail` is the last reachable node;
- if the list is non-empty, `tail.next is None`;
- following `next` from `head` reaches exactly `size` nodes;
- no reachable node appears twice;
- every reachable node belongs to the logical sequence exactly once.

These are not implementation comments. They are proof obligations for every update.

## Correctness of an update has two layers

Suppose an operation inserts `X` between `B` and `C`.

A correct implementation must establish both:

1. the **abstract postcondition**:

```text
A, B, X, C, D
```

2. the **representation invariant**:

```text
[A] → [B] → [X] → [C] → [D] → None
```

A program that produces the right visible values for one traversal but leaves an incorrect `tail` pointer is structurally broken even if the immediate printout looks correct.

## Workload determines representation

There is no universally fastest list representation.

### Workload A — frequent random indexed reads

```text
read position i many times
rare structural changes
```

A dynamic array is usually appropriate because direct access is `O(1)` and memory locality is good.

### Workload B — repeatedly insert after an already-known node

```text
node is already available
insert a new successor
continue traversal
```

A linked representation can perform each insertion with a constant number of link updates.

### Workload C — search by value, then remove

```text
find target
remove target
```

Both a dynamic array and a basic linked list require `O(n)` search. The linked representation saves shifting after the node is found, but the total operation is still `O(n)`.

## Locality and hidden constants

Big O does not describe all performance effects.

Dynamic arrays often benefit from **spatial locality** because neighbouring elements are stored close together. Linked nodes may be scattered across memory and require pointer chasing.

Thus two `O(n)` traversals can have noticeably different real execution times.

This does not change the asymptotic bound, but it explains why representation choice cannot be reduced to one complexity-table entry.

## Mutation and stable references

Structural mutation may invalidate ways of referring to elements.

In a resizable contiguous container, growth may reallocate storage. Addresses or iterators referring to old storage may then become invalid.

In a linked structure, inserting an unrelated node normally does not move existing nodes, but deleting a node invalidates references to that node.

This is especially visible in C++, where iterators and references have explicit validity rules. In Python, object references also continue or cease to be useful according to whether the referenced object is still reachable and semantically part of the structure.

## Python and C++ container perspective

Python's built-in `list` is a dynamic array-like sequence. It supports fast indexed access and amortised append:

```python
values = [10, 20, 30]
values.append(40)
print(values[2])
```

C++ offers several distinct standard containers. Two relevant examples are:

```cpp
#include <list>
#include <vector>

std::vector<int> contiguous{10, 20, 30};
std::list<int> linked{10, 20, 30};
```

`std::vector` supports random-access iterators and contiguous storage. `std::list` represents a doubly linked list and does not support constant-time indexing by integer position.

The point is not to memorise library names. The point is to connect interface guarantees to representation.

## A misleading implementation

Consider:

```python
def print_by_index(head: Node[int] | None, n: int) -> None:
    for index in range(n):
        print(node_at(head, index).value)
```

If `node_at` starts from `head` and walks `index` links, the total work is:

\[
0 + 1 + 2 + \cdots + (n-1) = \Theta(n^2).
\]

A linked list should normally be traversed by maintaining the current node:

```python
def print_all(head: Node[int] | None) -> None:
    current = head
    while current is not None:
        print(current.value)
        current = current.next
```

This is `O(n)`.

## Decision checklist

Before choosing a representation, ask:

1. Which operations dominate the workload?
2. Do clients need random indexed access?
3. Are insertion and deletion positions already known structurally?
4. Is preserving stable node identity useful?
5. Does contiguous memory matter?
6. How much per-element link overhead is acceptable?
7. Which mutation invalidates references or iterators?
8. Does the language provide a standard container whose guarantees already match the problem?

## Common misconceptions

### "Linked lists have O(1) deletion"

Incomplete. Deleting **after a known node** can be `O(1)`. Searching for a value and then deleting it is normally `O(n)`.

### "Arrays cannot grow"

A fixed array cannot change capacity, but dynamic-array abstractions can grow by reallocating storage.

### "Linked lists are always better for insertion"

Only when the insertion position is already known and the cost of traversal, allocation, locality, and extra links is acceptable.

### "An ADT determines complexity"

No. The same ADT can have several representations with different operation costs.

## What you must be able to explain

- What is abstract about a linear list?
- Which facts belong to the ADT contract and which belong to representation?
- Why does `O(1)` deletion require a known structural position?
- Which operations favour contiguous storage and which favour linked nodes?
- What invariant connects a concrete linked chain to the logical sequence?
- Why can two implementations of the same ADT have different complexity?
- How can repeated indexed lookup accidentally create quadratic work?
- Why must mutation and reference validity be discussed together?
