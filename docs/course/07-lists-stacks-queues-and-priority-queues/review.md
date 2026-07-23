# Module 07 Review

## Core vocabulary

Explain each term in your own words:

- linear list;
- abstract data type;
- node;
- link;
- head and tail;
- sentinel node;
- singly linked list;
- doubly linked list;
- circular list;
- stack and LIFO;
- queue and FIFO;
- priority queue;
- self-organising list;
- skip list;
- representation invariant;
- underflow;
- amortised cost.

## Conceptual questions

1. Why is a linked list not automatically faster than an array?
2. What does “delete in `O(1)`” assume about access to the node?
3. Why must a doubly linked list update both directions?
4. How does a circular list detect the end of one traversal?
5. Why does a stack fit nested structure?
6. Why does a queue fit breadth-first processing?
7. How does a priority queue differ from sorting everything once?
8. When may a self-organising list change order legally?
9. Why is skip-list performance usually stated as expected complexity?
10. How can repeated indexed access make a linked-list algorithm quadratic?

## Tracing tasks

### Reversal

Trace reversal of:

```text
A → B → C → None
```

After each iteration record `previous`, `current`, `successor`, and all changed links.

### Doubly linked deletion

Remove the middle node from:

```text
A ⇄ B ⇄ C
```

List every assignment needed to preserve both directions.

### Stack

Trace postfix evaluation of:

```text
5 2 3 * +
```

Record the complete stack after every token.

### Queue

Trace round-robin execution for tasks `A:5`, `B:2`, `C:4` with quantum `2`.

## Debugging tasks

### Lost suffix

```python
current.next = previous
current = current.next
```

Explain why traversal information is lost and repair the update order.

### Broken doubly linked invariant

```python
node.previous.next = node.next
# missing reverse update
```

State the exact invariant that fails.

### Queue endpoint bug

A linked queue removes its only node but leaves `tail` pointing to the removed node. Explain the first later operation that can misbehave.

### Wrong priority claim

A scheduler calls `heapq` with negative timestamps and claims to process the earliest event. Determine the actual ordering.

### Accidental quadratic behaviour

```python
for index in range(length(head)):
    print(node_at(head, index).value)
```

Analyse the total cost and rewrite as one traversal.

## Design problems

1. Implement a linked deque supporting insertion and deletion at both ends in `O(1)`.
2. Design a browser history using two stacks and specify the invariant.
3. Implement a circular queue with a fixed array and distinguish empty from full states.
4. Design a stable priority queue with FIFO tie handling.
5. Implement move-to-front search and state when reordering is permitted.
6. Describe skip-list insertion, including the predecessor information required at each level.
7. Merge two sorted linked lists without allocating data nodes and state the mutation contract.
8. Use a circular list to simulate Josephus elimination and analyse the cost.

## Mastery checklist

You are ready to continue when you can:

- separate an ADT from its representation;
- write and preserve endpoint and link invariants;
- trace reference changes without losing nodes;
- choose correctly among stack, queue, and priority queue semantics;
- compare array-based and linked costs with all assumptions stated;
- explain sentinels and circular stopping conditions;
- analyse self-organising and skip-list guarantees;
- implement and justify selected list algorithms;
- communicate mutation, ownership, and failure behaviour precisely.

## Connection to Module 08

Linear structures give each element at most one next position in the logical order. Module 08 moves to branching structures, where a node may lead to multiple subtrees: binary trees, search trees, AVL balancing, dictionaries, and heaps.
