# Dynamic Data Structures

## When the shape of the state changes

Many algorithms manipulate collections whose size or connectivity changes while the computation proceeds.

A **dynamic data structure** is a structure whose logical size, shape, or links can change during execution.

Examples include:

- dynamic arrays that occasionally resize their storage;
- linked lists whose nodes are created and removed;
- stacks and queues whose logical length changes;
- priority queues whose heap grows and shrinks;
- search frontiers whose number of pending states changes unpredictably;
- dictionaries and sets used to record discovered states.

This chapter introduces the design principles. Module 07 develops linked lists, stacks, queues, priority queues, self-organising lists, and skip lists in depth.

## Logical structure versus concrete representation

Always separate the **abstract data structure** from the representation used to implement it.

A stack, for example, exposes the logical operations:

```text
push
pop
top
is_empty
```

It can be represented by:

- a dynamic contiguous array;
- a linked list;
- another container with appropriate end operations.

The abstract behaviour can be the same while time, memory, locality, and ownership properties differ.

## Dynamic arrays

A dynamic array provides indexed access while allowing logical growth.

Conceptually, maintain:

- `size`: number of logical elements;
- `capacity`: number of elements the allocated storage can currently hold.

The invariant is:

\[
0 \le size \le capacity.
\]

If `size < capacity`, appending writes into existing storage. If `size == capacity`, the representation must allocate larger storage and copy or move existing elements before appending.

## Why one append can be expensive

Suppose capacity doubles when full.

Most appends cost `O(1)`, but a resizing append may copy all existing `n` elements and therefore cost `O(n)`.

It would be wrong to conclude either:

```text
append is always O(1)
```

or

```text
append is O(n), therefore n appends cost O(n²)
```

The correct analysis depends on whether we discuss one worst-case operation or a sequence.

## Aggregate amortised analysis of doubling

Start with capacity `1` and append `n` elements.

Copies caused by resizing occur when capacities grow roughly as:

```text
1, 2, 4, 8, ..., < n
```

The total number of copied elements is bounded by the geometric sum

\[
1 + 2 + 4 + \cdots < 2n.
\]

The `n` ordinary writes contribute another `n` units of work. Therefore total work across `n` appends is `O(n)`.

Hence the amortised cost per append is

\[
O(1).
\]

This does not say that every append costs constant time. It says that expensive resizes are rare enough that the average cost over any sufficiently long sequence remains constant under the stated resizing policy.

## Amortised is not average-case probability

These terms are different.

**Average-case analysis** assumes a probability distribution over inputs or operations.

**Amortised analysis** gives a deterministic bound over a sequence of operations, without assuming that some operations are more likely than others.

For dynamic-array append with geometric growth, the amortised guarantee follows from the resizing schedule, not from probability.

## What if capacity grows by one?

Suppose instead that every full array increases capacity by exactly one.

Then append costs include copies of approximately:

\[
1 + 2 + 3 + \cdots + (n-1) = \Theta(n^2).
\]

So `n` appends cost `Θ(n²)` and amortised append cost is `Θ(n)`.

This shows that dynamic behaviour alone does not guarantee efficiency. The growth policy is part of the algorithmic design.

## Contiguous versus linked growth

Two common dynamic representations make different trade-offs.

### Dynamic contiguous array

Strengths:

- direct indexed access;
- good locality of reference;
- small per-element structural overhead;
- efficient append under geometric growth.

Costs:

- occasional reallocation;
- inserting near the front may shift many elements;
- references or pointers into storage may become invalid after reallocation in languages where that matters.

### Linked structure

Strengths:

- nodes can be allocated independently;
- insertion/deletion after a known node can be constant time;
- no global contiguous reallocation is required.

Costs:

- no constant-time indexed access;
- additional link fields;
- weaker locality;
- ownership and lifetime must be managed explicitly in lower-level languages.

Neither representation is universally “more dynamic” or “better”. The required operations determine the useful representation.

## Python and C++ perspective

A Python `list` is a dynamic sequence implemented conceptually using a resizable array. Its user-visible behaviour hides allocation details, but algorithm analysis should still distinguish:

- indexed access;
- append;
- insertion/deletion at arbitrary positions;
- copying and aliasing.

In C++, `std::vector` plays a similar dynamic-contiguous role, but details such as references, iterators, object moves, and reallocation invalidation are more visible to the programmer.

Module 07 will compare language-level representations more directly where pointers, ownership, and node lifetimes become central.

## Linked state and ownership

A linked structure changes by reconnecting references or pointers.

Conceptually:

```text
node A → node B → node C
```

Inserting `X` after `A` requires:

```text
X.next = B
A.next = X
```

The order matters because overwriting `A.next` before preserving the old successor may disconnect the remainder of the structure.

In Python, object lifetime is managed by the runtime. In C++, a manual node-based implementation must also answer:

- who owns each node?
- when is it destroyed?
- can two structures share it?
- which pointers become invalid after deletion?

These are implementation concerns, but they can affect algorithm correctness.

## Dynamic state in search

Backtracking and graph search naturally use changing structures:

- a current path grows and shrinks;
- a set of used choices changes;
- a stack of pending states expands and contracts;
- a dictionary records visited states or best known costs.

```python
def depth_first_states(start, next_states):
    stack = [start]
    visited = {start}

    while stack:
        state = stack.pop()
        yield state

        for neighbour in next_states(state):
            if neighbour not in visited:
                visited.add(neighbour)
                stack.append(neighbour)
```

The maximum stack size is not fixed by the source-code text. It depends on the shape of the explored search space.

This is why auxiliary-space analysis must refer to problem size and search structure, not merely count local variables.

## Ownership and aliasing in branching algorithms

When several pending branches contain mutable objects, the algorithm must know whether state is:

- shared;
- shallow-copied;
- deeply copied;
- mutated then restored.

Incorrect branch creation:

```python
child = current_state
child.append(choice)
stack.append(child)
```

`child` and `current_state` refer to the same mutable list.

Two supposed branches may therefore collapse into one object.

For an independent branch:

```python
child = current_state + [choice]
```

creates a new list.

Alternatively, recursive backtracking may intentionally share one working structure and rely on disciplined choose–undo restoration.

Both approaches can be correct. Their costs and proof obligations differ.

## Structural invariants

A dynamic structure remains valid only if every update preserves its invariant.

Examples:

### Dynamic array

```text
0 <= size <= capacity
logical elements occupy the first size positions
```

### Stack

```text
the top is the most recently pushed element not yet removed
```

### Queue

```text
elements are removed in arrival order
```

### Linked list

```text
every reachable link points to the intended successor
head identifies the first logical node
```

### Heap-based priority queue

```text
the structural shape and heap-order relation are preserved
```

The data structure is not defined merely by its fields. It is defined by fields plus invariants plus supported operations.

## Operation tables are representation-specific

A useful analysis asks which operations dominate.

| Requirement | Dynamic array | Singly linked list |
|---|---:|---:|
| indexed access | `O(1)` | `O(n)` |
| append | amortised `O(1)` with geometric growth | `O(1)` with tail pointer |
| insert at front | `O(n)` | `O(1)` |
| delete after known position/node | may require shifting | `O(1)` |
| locality | strong | weaker |
| extra structural memory | capacity slack | link per node |

These costs depend on the precise representation and assumptions. For example, linked-list append is not `O(1)` without access to the tail.

## Restoring dynamic state

Backtracking often changes dynamic structures and then reverses those changes.

Suppose a choice performs:

```python
path.append(vertex)
used.add(vertex)
```

A matching undo is:

```python
used.remove(vertex)
path.pop()
```

The exact order may depend on whether intermediate invariants must remain observable, but every mutation that belongs only to the child branch must be reversed.

A useful test is:

> after undo, could the parent continue as though the child branch had never been attempted?

If not, restoration is incomplete.

## Choosing a dynamic structure

Start from required operations rather than familiar syntax.

Ask:

- Is direct indexed access important?
- Are insertions/deletions concentrated at one end?
- Must we frequently insert after a known element?
- Do we need membership tests?
- Do we repeatedly extract the smallest or largest priority?
- Must we restore the most recently generated state?
- Is memory locality important?
- Can references be invalidated by resizing?
- Is predictable worst-case latency important, or is amortised performance sufficient?

The answers determine the useful abstraction and representation.

## Cost dimensions

For dynamic structures, a complete analysis may distinguish:

- worst-case cost of one operation;
- amortised cost over a sequence;
- expected cost when randomness or hashing is involved;
- total algorithm cost;
- peak auxiliary memory;
- temporary capacity overhead;
- cost of copying/moving stored elements.

Reducing all of these to one Big O label can hide important behaviour.

## Common mistakes

- treating a dynamic array as though every append had identical cost;
- confusing amortised analysis with probabilistic average-case analysis;
- growing capacity by one and assuming append remains amortised constant time;
- claiming linked insertion is `O(1)` while ignoring the cost of finding the insertion point;
- sharing mutable branch state unintentionally;
- describing a structure only by its API and ignoring its invariant;
- discussing abstract stack/queue behaviour as though it uniquely determines representation;
- ignoring ownership and invalidation when translating node-based structures to C++.

## Bridge to Module 07

This module introduced the common design questions:

```text
abstract interface
        ↓
representation
        ↓
invariant
        ↓
operation cost
        ↓
ownership / mutation consequences
```

Module 07 applies that framework to:

- singly and doubly linked lists;
- circular lists;
- stacks;
- queues;
- priority queues;
- self-organising lists;
- skip lists.

The objective there is not to memorise container methods. It is to understand why each operation has its stated cost and which invariant makes the representation correct.

## What you must be able to explain

- In what sense is a structure dynamic?
- Why must abstraction be separated from representation?
- Why can one dynamic-array append cost `O(n)` while amortised append costs `O(1)`?
- How does geometric growth produce a linear total-copy bound?
- Why is growth by one asymptotically worse?
- How do contiguous and linked representations trade indexed access, insertion cost, locality, and memory overhead?
- Why is aliasing dangerous in branching search?
- Which invariant must each dynamic update preserve?
- Why does a linked `O(1)` insertion claim require a known node or position?
- When is amortised analysis more informative than one-operation worst case?
