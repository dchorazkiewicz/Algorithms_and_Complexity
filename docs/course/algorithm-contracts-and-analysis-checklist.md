# Algorithm Contracts and Analysis Checklist

## Specification is not a runtime assertion

The course uses four related but distinct kinds of statements:

- a **precondition** defines the initial states for which the algorithm promises its normal result;
- a **postcondition** defines what must hold after successful termination when the precondition held;
- an **invariant** describes a property preserved through a loop, recursive reduction, or representation update;
- a **runtime assertion** is an executable check performed by a particular implementation.

A Python statement such as:

```python
assert 0 <= index < len(values)
```

may help detect a violated assumption during development, but it is not the logical contract itself. The contract remains part of the algorithm specification even when no check is executed. Python assertions may also be disabled, so they must not be used as the only mechanism for validating untrusted external input.

Validation and contracts answer different questions:

```text
contract:   what must be true?
validation: who checks it, when, and with what failure behaviour?
```

## Standard analysis template

For every important algorithm, state the following explicitly.

### 1. Input model

Define the mathematical or structural form of the input. Distinguish, for example, a sorted sequence from an arbitrary sequence and a graph from its concrete adjacency representation.

### 2. Precondition

State every assumption needed by the algorithm, including ordering, valid bounds, uniqueness, graph membership, or non-emptiness.

### 3. Postcondition

State exactly what result is guaranteed. Resolve ambiguity such as:

- any matching index versus the first or last matching index;
- replacement versus insertion;
- mutation versus construction of a new object;
- failure value versus exception.

### 4. Invariant

State the meaning preserved during execution. Examples include an active binary-search interval, a sorted insertion-sort prefix, a valid heap order, or symmetric adjacency in an undirected graph.

### 5. Progress and termination

Identify a well-founded measure that decreases, such as:

- remaining interval length;
- number of unprocessed elements;
- recursive problem size;
- number of stack items still to process.

### 6. Preservation and correctness

Explain why each operation preserves the invariant and why termination together with the invariant establishes the postcondition.

### 7. Complexity under an explicit cost model

State what is counted and what information is already available. `O(1)` insertion after a known linked-list node does not include searching for that node. `O(log n)` binary search assumes sorted input already exists.

### 8. Edge cases and policies

State how the algorithm handles:

- empty input;
- one-element input;
- duplicate keys;
- absent targets;
- invalid indices;
- disconnected graphs;
- deterministic versus unspecified traversal order.

## Counterexample discipline

After proving the algorithm under its assumptions, remove one assumption and construct a small counterexample. Typical examples include binary search on unsorted data, DFS without a visited set on a cycle, an ordinary BST built from increasing keys, or a heap incorrectly treated as a globally sorted tree.

A counterexample does not merely show that code fails. It identifies which proof step depended on the missing assumption.

## Completion standard

An explanation is complete when it connects:

```text
input model
→ contract
→ invariant
→ state changes
→ termination
→ postcondition
→ complexity
→ edge cases
```

This checklist should be reused across searching, sorting, recursion, linked structures, trees, heaps, graphs, and complexity analysis.
