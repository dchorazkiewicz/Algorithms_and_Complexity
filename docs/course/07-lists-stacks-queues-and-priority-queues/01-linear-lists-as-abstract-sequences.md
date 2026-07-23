# Linear Lists as Abstract Sequences

## Begin with behaviour, not links

A **linear list** is an ordered collection in which, except at the ends, every element has one predecessor and one successor. This definition describes logical order. It does not yet say whether elements are stored next to one another in memory or connected through references.

That separation matters. An abstract data type specifies values and operations; a representation determines how those operations are implemented and what they cost.

## Typical list operations

A list interface may provide:

- read or replace the element at a position;
- insert before or after a position;
- remove an element;
- search for a value;
- traverse from the beginning to the end;
- test whether the list is empty;
- obtain its logical length.

No representation makes every operation constant time.

## Array-based versus linked representation

An array-based sequence supports direct indexed access because an element position can be translated into an address. Insertion near the front may require shifting many elements.

A linked representation stores each element in a node together with one or more links. Given the relevant node, insertion or deletion can change only a constant number of links. Finding the node at position `i`, however, normally requires traversal.

| Operation | Dynamic array | Singly linked list |
|---|---:|---:|
| read by index | `O(1)` | `O(n)` |
| search by value | `O(n)` | `O(n)` |
| insert at front | `O(n)` | `O(1)` |
| append with tail pointer | amortised `O(1)` | `O(1)` |
| delete after known node | not applicable directly | `O(1)` |

The phrase **known node** is essential. A constant-time link update does not include the time needed to locate that node.

## Position is not the same as node identity

In an array, position `i` is a stable way to name a slot until structural modification changes the layout. In a linked list, an algorithm often works with a reference to a node rather than an integer index.

This difference changes interfaces. A linked-list operation may accept a node reference, while a public sequence abstraction may expose only values and positions.

## Representation invariant

Every concrete representation needs an invariant. For a finite linear linked list:

- following successor links from the first node eventually reaches the end;
- each reachable node belongs to the list exactly once;
- the stored size, when present, equals the number of reachable nodes;
- a tail pointer, when present, identifies the final node;
- an empty list has consistent endpoint values.

An operation is correct only if it produces the required abstract result and preserves this invariant.

## Why lists are not automatically faster

Linked lists are sometimes described as structures with “fast insertion and deletion.” That statement is incomplete. They avoid shifting after the update position is known, but they introduce:

- traversal costs;
- extra storage for links;
- more allocation activity;
- less predictable memory locality;
- greater risk of broken links and aliasing errors.

Representation choice must follow the workload.

## What you must be able to explain

- What is abstract about a linear list?
- Why does `O(1)` deletion require a known structural position?
- Which operations favour arrays and which favour linked nodes?
- What invariant connects the concrete chain to the logical sequence?
- Why is “linked lists have fast insertion” an incomplete claim?
