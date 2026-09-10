# Module 07 Review

This review checks whether you can reason about linear dynamic structures from their contracts and representations rather than reproduce container APIs from memory.

## Core vocabulary

Explain each term precisely and give one example where appropriate:

- linear list;
- abstract data type;
- concrete representation;
- logical position;
- node identity;
- node;
- link;
- head;
- tail;
- sentinel node;
- representation invariant;
- ownership;
- non-owning reference or pointer;
- aliasing;
- singly linked list;
- doubly linked list;
- circular list;
- stack;
- LIFO;
- queue;
- FIFO;
- deque;
- circular buffer;
- priority queue;
- heap;
- stable priority tie rule;
- self-organising list;
- move-to-front;
- transpose;
- count/frequency ordering;
- skip list;
- expected complexity;
- amortised complexity;
- underflow;
- overflow.

## Conceptual questions

1. Why is a linear list an abstract object rather than a synonym for a linked list?
2. Why can two representations implement the same ADT with different operation costs?
3. Why is "delete in `O(1)`" incomplete without saying how the node is located?
4. Why does a linked list not provide array-style direct indexed access?
5. Why can dynamic arrays have better real traversal performance even when both representations are `O(n)`?
6. What invariant must `head`, `tail`, and `size` satisfy in an empty linked list?
7. Why can changing `current.next` before saving its old value make an entire suffix unreachable?
8. What is the difference between node membership in a Python list structure and Python object lifetime?
9. What is the difference between an owning C++ smart pointer and a raw non-owning node pointer?
10. Why are doubly linked lists structurally more powerful and structurally more fragile than singly linked lists?
11. Why must `a.next is b` and `b.previous is a` agree?
12. How does a sentinel reduce endpoint case analysis?
13. Why does a circular list terminate traversal by identity or step count rather than by reaching `None`?
14. Why is a Python list a natural stack representation?
15. Why is `list.pop(0)` a poor default queue operation?
16. How can a circular buffer represent logical FIFO order after physical wraparound?
17. Why can `front == rear` be ambiguous in a ring buffer?
18. Why is a priority queue not the same thing as a binary heap?
19. Why is a valid heap array not necessarily globally sorted?
20. Why must equal-priority behaviour be part of a priority-queue contract?
21. Why can changing an arbitrary heap priority require an auxiliary index map?
22. What invariant makes lazy deletion in a priority queue correct?
23. Under what abstract contract may move-to-front legally reorder a list?
24. Why should a self-organising list be evaluated over a sequence of accesses rather than one search?
25. How do move-to-front, transpose, and count ordering respond to different workload signals?
26. Why does a skip list normally have expected `O(log n)` rather than deterministic worst-case `O(log n)` search?
27. Why is expected skip-list storage still `O(n)`?
28. What is the difference between expected complexity and amortised complexity?
29. Why does Floyd cycle detection compare node identity rather than value equality?
30. How can repeated `node_at(head, i)` calls turn an apparent single loop into quadratic work?

---

# Tracing tasks

## Trace 1 — Singly linked reversal

Reverse:

```text
A → B → C → D → None
```

After every iteration record:

- `previous`;
- `current`;
- `successor`;
- every changed `next` link;
- which nodes belong to the reversed prefix;
- which nodes belong to the untouched suffix.

Then state the loop invariant and termination measure.

## Trace 2 — Insert after a known node

Start with:

```text
A → B → C → None
```

Insert `X` after `B`.

Write the assignments in a safe order and explain exactly what would be lost if `B.next` were overwritten before the old successor were saved.

## Trace 3 — Doubly linked deletion

Remove `B` from:

```text
None ← A ⇄ B ⇄ C → None
```

Record:

- predecessor;
- successor;
- forward-link assignment;
- backward-link assignment;
- detached-node state.

Verify the bidirectional invariant after deletion.

## Trace 4 — Delete the only node

A doubly linked list stores:

```text
head = X
tail = X
size = 1
```

Trace deletion of `X` and write the complete final representation invariant.

## Trace 5 — Circular traversal

Given:

```text
A → B → C
↑       ↓
└───────┘
```

Start at `A`, list the successive node identities, and state exactly when traversal must stop to visit every node once.

## Trace 6 — Postfix stack

Evaluate:

```text
8 3 2 * - 5 +
```

Record the complete stack after every token. Explain why subtraction requires distinguishing left and right popped operands.

## Trace 7 — Browser history

Starting at page `A`, perform:

```text
visit B
visit C
back
back
forward
visit D
```

Record:

- back stack;
- current page;
- forward stack.

Explain why visiting `D` clears forward history.

## Trace 8 — Circular queue

Use capacity `5` and perform:

```text
enqueue A
enqueue B
enqueue C
dequeue
dequeue
enqueue D
enqueue E
enqueue F
```

After every operation record:

- physical array;
- `front`;
- `size`;
- logical queue order.

Identify the first point at which physical and logical order differ visibly.

## Trace 9 — Stable priority queue

Insert:

```text
A priority 3
B priority 1
C priority 3
D priority 1
E priority 2
```

Use FIFO ties and record the heap-entry keys `(priority, sequence)`. State the complete extraction order.

## Trace 10 — Skip-list search

Given:

```text
level 2:  -∞ -------- 20 -------- 50 -------- +∞
level 1:  -∞ --- 10 --20 --- 35 --50 --- 70 -- +∞
level 0:  -∞ 5 10 14 20 27 35 41 50 63 70 91 +∞
```

Trace searches for:

- `41`;
- `42`;
- `5`;
- `100`.

At every level state why the next horizontal step is taken or rejected.

---

# Debugging tasks

## Bug 1 — Lost suffix

```python
current.next = previous
current = current.next
```

Explain why information is lost and repair the update order.

## Bug 2 — Stale tail

A singly linked list removes its final node:

```python
head = head.next
size -= 1
```

but does not modify `tail`.

State the exact invariant that fails and describe a later append that can misbehave.

## Bug 3 — Broken doubly linked invariant

```python
node.previous.next = node.next
# reverse link not updated
```

State which adjacency relationship becomes inconsistent.

## Bug 4 — Circular infinite loop

```python
current = head
while current is not None:
    print(current.value)
    current = current.next
```

Explain why this does not terminate on a non-empty circular list and provide two valid stopping strategies.

## Bug 5 — Expensive stack front

```python
stack.insert(0, value)
value = stack.pop(0)
```

Explain the cost and redesign the representation without changing the LIFO contract.

## Bug 6 — Quadratic queue

```python
while items:
    process(items.pop(0))
```

Analyse the total cost for `n` queued items and replace the representation appropriately.

## Bug 7 — Ring-buffer ambiguity

An implementation stores only `front` and `rear` and uses:

```text
front == rear
```

for both empty and full states.

Explain why the representation is ambiguous and provide three possible design fixes.

## Bug 8 — Wrong priority direction

A scheduler should process the earliest timestamp first but stores:

```python
heapq.heappush(heap, (-timestamp, task))
```

Explain which timestamp leaves first and repair the key design.

## Bug 9 — Accidental comparison on ties

```python
heapq.heappush(heap, (priority, task_object))
```

Two tasks have equal priority and task objects do not support ordering.

Explain the failure and design a stable entry format.

## Bug 10 — False decrease-key complexity

A program stores items in a binary heap and claims:

```text
change_priority(item) is O(log n)
```

but has no map from item to heap position.

Explain the missing cost.

## Bug 11 — Invalid self-organisation

A list stores race results in finishing order. After a lookup, the implementation moves the athlete to the front.

Explain why the representation optimisation changes the abstract value.

## Bug 12 — Skip-list level corruption

A new node has height `3`, but insertion updates predecessors only at levels `0` and `1`.

Explain which invariant fails and why future search may become inconsistent.

## Bug 13 — Expected versus amortised confusion

A student writes:

> Skip-list search is amortised `O(log n)` because random levels are usually balanced.

Explain why the terminology is wrong.

## Bug 14 — Value-based cycle detection

```python
if slow.value == fast.value:
    return True
```

Construct an acyclic counterexample.

## Bug 15 — Indexed linked traversal

```python
for index in range(length(head)):
    print(node_at(head, index).value)
```

Assuming both `length` and `node_at` traverse from the head, derive the total asymptotic cost and rewrite the algorithm as one traversal.

---

# Proof and reasoning exercises

## Proof 1 — Reversal invariant

Prove that the iterative reversal algorithm:

1. never loses a node;
2. never duplicates a node;
3. reverses exactly the processed prefix;
4. terminates;
5. returns the complete reversed chain.

Use a loop invariant rather than only an example trace.

## Proof 2 — Linked queue endpoint correctness

For a queue storing `head`, `tail`, and `size`, prove that enqueue and dequeue preserve:

```text
head is None iff tail is None iff size == 0
```

and that `tail.next is None` whenever the queue is non-empty.

## Proof 3 — BFS queue discipline

Explain why FIFO ordering causes unweighted breadth-first search to process vertices in nondecreasing distance from the start.

Your argument must connect discovery time, queue order, and edge-distance layers.

## Proof 4 — Heap multiway merge

For merging sorted streams, prove that the heap root is always the globally smallest not-yet-output value.

State the heap frontier invariant explicitly.

## Proof 5 — Floyd cycle meeting

Once both tortoise and hare are inside a finite cycle, explain why their relative position must eventually become zero modulo the cycle length.

## Proof 6 — Expected skip-list storage

Assume promotion probability `1/2`. Use the geometric series:

\[
n + n/2 + n/4 + n/8 + \cdots
\]

to justify expected `O(n)` total level participation.

## Proof 7 — Linked merge correctness

Prove that `merge_sorted` returns a sorted chain containing exactly the nodes from its two sorted input lists.

Your argument should identify the processed prefix and two unprocessed suffixes.

---

# Complexity exercises

## Exercise 1 — Search and delete

A singly linked list contains `n` nodes. Removing a node **after an already-known predecessor** is `O(1)`.

What is the complexity of:

```text
remove the first node whose value equals target
```

in the worst case? Separate search cost from structural update cost.

## Exercise 2 — Repeated index access

Suppose `node_at(head, i)` costs `Θ(i)`. Derive the total cost of calling it for every `i` from `0` to `n-1`.

## Exercise 3 — Linked append without tail

A singly linked list stores only `head`. What is the total cost of appending `n` values one by one if every append traverses to the end?

How does storing `tail` change the result?

## Exercise 4 — Python list as FIFO queue

Derive the total shifting work when repeatedly calling `pop(0)` until a list of `n` elements is empty.

## Exercise 5 — Multiway merge

There are `k` sorted streams containing `N` total values. Explain why a heap-frontier implementation costs `O(N log k)` rather than `O(N log N)`.

## Exercise 6 — Self-organising workload

For a given request sequence, count total comparisons under:

- fixed order;
- move-to-front;
- transpose.

Construct one sequence where move-to-front helps substantially and one where it provides little benefit.

## Exercise 7 — Skip-list promotion

With promotion probability `p`, what is the expected number of nodes reaching level `i`? Explain qualitatively how changing `p` changes number of levels and number of forward links.

## Exercise 8 — Josephus traversal

If every elimination advances `k-1` links and there are `n-1` eliminations, derive an `O(nk)` bound. What does the bound become when `k` is a fixed constant independent of `n`?

---

# Design problems

## Problem 1 — Linked deque

Design a deque supporting:

```text
push_front
push_back
pop_front
pop_back
```

all in `O(1)` time.

Specify:

- representation;
- endpoint invariant;
- empty state;
- one-element state;
- mutation steps for every operation;
- failure behaviour.

Explain why a doubly linked representation is more convenient than a singly linked one for `pop_back`.

## Problem 2 — Browser history

Design browser Back/Forward behaviour using two stacks.

State the invariant connecting:

- current page;
- back stack;
- forward stack.

Explain why visiting a new page clears forward history.

## Problem 3 — Fixed circular queue

Implement a capacity-`c` queue with an array.

Your design must distinguish empty and full states explicitly and prove that enqueue/dequeue do not require shifting.

## Problem 4 — Stable priority queue

Design a priority queue where:

- smaller number means higher priority;
- equal priorities are processed FIFO;
- arbitrary Python task objects need not be comparable.

Specify the heap-entry tuple and justify its lexicographic ordering.

## Problem 5 — Mutable priority queue

Design two approaches for priority updates:

1. heap plus item-to-index map;
2. lazy insertion of new entries plus authoritative current-priority map.

Compare invariants, memory cost, and implementation complexity.

## Problem 6 — Move-to-front dictionary

Implement a linked move-to-front search.

State exactly which abstract dictionary contract makes reordering legal. Then describe a use case where the same transformation would be illegal.

## Problem 7 — Count-based self-organising list

Store an access counter with each node. After a successful access, restore non-increasing count order while preserving stable order among equal counts.

State the invariant and analyse the worst-case update cost.

## Problem 8 — Skip-list insertion

Describe skip-list insertion in enough detail to implement it:

- search route;
- predecessor array;
- duplicate policy;
- random height;
- links changed at each level;
- expected search/update complexity.

## Problem 9 — Cycle diagnostics

Given a linked list that may contain a cycle, return:

- whether a cycle exists;
- the cycle entry if one exists;
- optionally the cycle length.

Use `O(1)` auxiliary space and justify each phase.

## Problem 10 — Linked merge sort

Implement linked-list merge sort by relinking existing nodes.

State:

- split contract;
- merge contract;
- mutation behaviour;
- correctness argument;
- recurrence;
- auxiliary stack space.

## Problem 11 — Representation choice

For each workload, choose and justify one representation:

1. millions of random indexed reads, rare insertion;
2. repeated insertion after an already-known iterator;
3. nested parser state;
4. unweighted breadth-first graph exploration;
5. event simulation ordered by timestamp;
6. lookup workload dominated by temporal locality;
7. ordered dictionary requiring expected logarithmic linked navigation.

Do not name only the structure. State the operation that dominates and the guarantee you need.

---

# Python ↔ C++ comparison questions

1. Why does assigning `current = head` in Python not copy the node?
2. Why can `std::unique_ptr<Node<T>>` express ownership more explicitly than a raw pointer?
3. Why is `std::move` required when transferring `unique_ptr` ownership?
4. Why can a raw C++ pointer become dangling after node destruction?
5. Why can a detached Python node remain alive if another reference still points to it?
6. Why is bidirectional ownership difficult if both C++ neighbour links try to own each other?
7. How do Python `list` and C++ `std::vector` provide similar stack-friendly end operations?
8. How do Python `deque` and C++ `std::queue`/`std::deque` differ between concrete container and restricted adaptor roles?
9. Why does Python `heapq` naturally expose min-heap behaviour while `std::priority_queue` defaults to max-priority semantics?

---

# Mastery checklist

You are ready to continue when you can honestly say:

- [ ] I can separate every ADT in this module from its concrete representations.
- [ ] I can compare contiguous and linked sequence costs without making hidden assumptions.
- [ ] I can state the invariant of an empty, one-node, and multi-node singly linked list.
- [ ] I can trace insertion, deletion, and reversal without losing nodes.
- [ ] I can explain Python aliasing and C++ ownership at the level needed for linked structures.
- [ ] I can preserve both forward and backward invariants in a doubly linked list.
- [ ] I can design a sentinel-based list and explain what special cases it removes.
- [ ] I can traverse a circular list exactly once and state the stopping condition.
- [ ] I can define stack LIFO semantics independently of representation.
- [ ] I can define queue FIFO semantics independently of representation.
- [ ] I can explain why Python list front removal is costly and why a deque avoids that issue.
- [ ] I can implement and trace a circular buffer with wraparound.
- [ ] I can distinguish a priority queue from a heap.
- [ ] I can design stable priority handling and explain lazy deletion.
- [ ] I can compare unsorted, sorted, and heap-backed priority queues by workload.
- [ ] I can distinguish move-to-front, transpose, and count-based self-organisation.
- [ ] I can state when self-organising reordering is semantically legal.
- [ ] I can explain skip-list search, insertion, expected complexity, and expected space.
- [ ] I can distinguish expected analysis from amortised analysis.
- [ ] I can prove the main invariant of reversal and sorted merge.
- [ ] I can explain Floyd cycle detection using node identity and relative movement.
- [ ] I can detect accidental quadratic linked-list algorithms caused by repeated traversal.
- [ ] I can choose a representation from an operation workload and state the assumptions behind the cost.

## Connection to Module 08

Module 07 showed how representation changes the cost and correctness obligations of linear structures. Module 08 extends the same reasoning to branching structures: binary trees, binary search trees, balancing, AVL rotations, dictionaries, and heaps.

Before continuing, you should be comfortable asking the same four questions for every structure:

```text
What is the abstract promise?
What representation encodes it?
What invariant must every update preserve?
What cost follows from that representation?
```
