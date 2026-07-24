# Choosing a Data Structure

## Start from operations, not names

There is no universally best data structure. A representation is appropriate when its invariants make the required operations efficient and its implementation risks acceptable.

The correct comparison therefore starts with a workload:

- Which operations dominate?
- What information is already known?
- Must order be preserved?
- Is priority more important than insertion order?
- Are updates frequent?
- Is worst-case performance required?
- How much auxiliary memory is acceptable?

A structure that is excellent for one operation may be poor for another.

## Comparative operation costs

The table gives standard asymptotic costs under the assumptions stated in the course. `n` is the number of stored elements and `h` is tree height.

| Structure | Access / inspect | Search | Insert | Delete | Important condition |
|---|---:|---:|---:|---:|---|
| Array | `O(1)` by index | `O(n)` unsorted | `O(n)` in middle | `O(n)` in middle | contiguous indexed storage |
| Singly linked list | `O(n)` by position | `O(n)` | `O(1)` after known node | `O(1)` after known predecessor | forward links only |
| Doubly linked list | `O(n)` by position | `O(n)` | `O(1)` near known node | `O(1)` for known node | both links must remain consistent |
| Stack | `O(1)` top | not a general search structure | `O(1)` push | `O(1)` pop | LIFO discipline |
| Queue | `O(1)` front | not a general search structure | `O(1)` enqueue | `O(1)` dequeue | FIFO discipline and suitable representation |
| Binary heap | `O(1)` root priority | `O(n)` arbitrary key | `O(log n)` | `O(log n)` root | complete-tree shape and heap order |
| BST | `O(h)` | `O(h)` | `O(h)` | `O(h)` | cost depends on height |
| AVL tree | `O(log n)` | `O(log n)` | `O(log n)` | `O(log n)` | rotations preserve balance |
| Adjacency-list graph | `O(deg(v))` neighbours | traversal `O(V+E)` | representation-dependent | representation-dependent | sparse-graph friendly |

These are not complete performance descriptions. Constants, cache locality, allocation cost, stability, resize policy, and expected input distribution may matter in practice.

## Common decision patterns

### Known integer position

Use an array or another indexed sequence when the main operation is reading or replacing `A[i]`. Direct indexing is the decisive advantage.

### Frequent local insertion and deletion

Use a linked representation when the update position is already available as a node reference and shifting many array elements would be expensive. Remember that locating the node may dominate the total cost.

### Most recent item first

Use a stack for function-call simulation, expression processing, depth-first exploration, backtracking, and undo histories.

### Earliest item first

Use a queue for arrival-order processing, scheduling, buffering, and breadth-first exploration.

### Repeated minimum or maximum extraction

Use a priority queue, commonly represented by a binary heap. A sorted array gives fast inspection but expensive insertion; an unsorted array gives cheap insertion but expensive extraction. The heap balances these operations.

### Ordered dictionary operations

Use a search tree when keys must support ordered search, predecessor/successor operations, or inorder traversal. Use a balanced tree when worst-case logarithmic height matters.

### Arbitrary relationships

Use a graph when an element may connect to many others without a simple linear or hierarchical arrangement. Choose adjacency lists for sparse graphs and when iterating over actual neighbours is central.

## Questions that prevent bad choices

Before committing to a representation, ask:

1. Is the claimed `O(1)` operation given an index, a node reference, or only a value?
2. Does the workload require arbitrary search, or only top/front/root access?
3. Can the input become adversarial or highly ordered?
4. Must equal-key order remain stable?
5. Does the structure require resizing or per-node allocation?
6. Which invariant is most likely to be broken by updates?
7. Is the worst case acceptable, or is expected performance sufficient?
8. Will the algorithm traverse all elements anyway, making direct access irrelevant?

## Examples of complete choices

### Many searches over a fixed sorted collection

A sorted array with binary search is strong when updates are rare. Search is `O(log n)`, traversal is cache-friendly, and no tree pointers are required.

### Continuously changing ordered set

An AVL tree is appropriate when insertions and deletions are frequent and worst-case logarithmic search is required. The extra rotation logic pays for a maintained height bound.

### Task scheduler with changing priorities

A heap-backed priority queue supports `O(1)` access to the next task and `O(log n)` insertion and removal. A FIFO queue would preserve arrival order rather than priority and would therefore implement the wrong abstraction.

### DFS over a sparse graph

An adjacency list plus a stack or recursive call stack gives `O(V+E)` traversal over the reachable region. An adjacency matrix would spend space on absent edges and may force scanning all possible neighbours.

## Final principle

A good data-structure choice aligns four things:

- the problem contract;
- the operations that occur most often;
- the invariant that makes those operations correct;
- the cost model used to evaluate them.

Do not choose a structure because its name is familiar or because one operation has an attractive complexity. Choose it because the entire workload, including locating data, updating state, preserving invariants, and handling worst cases, is supported by the representation.