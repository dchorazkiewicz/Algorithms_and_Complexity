# Heaps and Priority Queues

## A different tree for a different operation

A binary search tree organises every node relative to all keys in its left and right subtrees. A **binary heap** maintains a weaker invariant designed for one main purpose: fast access to the smallest or largest priority.

In a **min-heap**:

> every parent key is less than or equal to the keys of its children.

In a **max-heap**, the inequality is reversed.

This does not sort siblings or complete subtrees. A heap is therefore not a search tree.

<link rel="stylesheet" href="/Algorithms_and_Complexity/stylesheets/heap-priority-queue-visualization.css">
<div data-heap-priority-viz></div>
<script src="/Algorithms_and_Complexity/javascripts/heap-priority-queue-visualization.js"></script>

## Shape invariant

A binary heap is a **complete binary tree**. All levels are full except possibly the last, and the last level is filled from left to right.

Completeness makes array representation compact.

For zero-based index `i`:

```text
parent(i) = (i - 1) // 2
left(i)   = 2i + 1
right(i)  = 2i + 2
```

No explicit node references are needed.

## Insertion and sift-up

A new element is appended at the next free array position. This preserves completeness but may violate heap order.

```python
def heappush(heap: list[int], value: int) -> None:
    heap.append(value)
    index = len(heap) - 1

    while index > 0:
        parent = (index - 1) // 2
        if heap[parent] <= heap[index]:
            break
        heap[parent], heap[index] = heap[index], heap[parent]
        index = parent
```

Each swap moves the new value one level upward. The loop terminates because `index` strictly approaches zero.

## Removing the minimum and sift-down

The minimum is at index `0`. Removing it leaves a hole at the root.

A standard procedure:

1. move the final array element to the root;
2. remove the final slot;
3. repeatedly swap the root value with its smaller child until heap order is restored.

```python
def heappop(heap: list[int]) -> int:
    if not heap:
        raise IndexError("pop from empty heap")

    minimum = heap[0]
    last = heap.pop()

    if heap:
        heap[0] = last
        index = 0

        while True:
            left = 2 * index + 1
            right = left + 1
            smallest = index

            if left < len(heap) and heap[left] < heap[smallest]:
                smallest = left
            if right < len(heap) and heap[right] < heap[smallest]:
                smallest = right

            if smallest == index:
                break

            heap[index], heap[smallest] = heap[smallest], heap[index]
            index = smallest

    return minimum
```

The smaller child must be selected. Swapping with an arbitrary child can leave the other child smaller than its parent.

## Priority queue interpretation

A priority queue stores items with priorities and supports:

- insert;
- inspect the minimum or maximum priority;
- remove the minimum or maximum priority.

A heap implements these operations efficiently.

```text
peek minimum: O(1)
insert:       O(log n)
remove min:   O(log n)
```

Searching for an arbitrary key remains `O(n)` because heap order does not determine which branch contains it.

## Equal priorities

Heap order alone does not guarantee stable ordering among equal priorities. A stable priority queue can store entries such as:

```python
(priority, insertion_number, value)
```

The insertion number breaks ties consistently.

## Building a heap

Repeated insertion builds a heap in `O(n log n)`. A more efficient bottom-up method applies sift-down to internal nodes from the last parent to the root.

```python
def heapify(values: list[int]) -> None:
    for index in range((len(values) - 2) // 2, -1, -1):
        sift_down(values, index)
```

Bottom-up heap construction is `O(n)`, not `O(n log n)`. Most nodes lie near the leaves and can move only a small distance.

## Heapsort

A max-heap can repeatedly move the largest element to the end of the array and restore heap order in the remaining prefix.

Heapsort runs in `O(n log n)` worst-case time and uses `O(1)` auxiliary array storage in its in-place form. It is generally not stable.

## Heap versus BST

Use a heap when the dominant operation is repeatedly extracting the smallest or largest element.

Use a balanced BST when arbitrary ordered search, predecessor, successor, or range queries are required.

A heap exposes only one extreme efficiently. A BST maintains a stronger global ordering.

## Correctness invariants

During sift-up:

- completeness remains unchanged;
- all edges except possibly the edge above the current index satisfy heap order.

During sift-down:

- both child subtrees are already heaps;
- only the current node may violate order with a child;
- after swapping with the smaller child, the possible violation moves downward.

## Common mistakes

- calling a heap a fully sorted tree;
- expecting binary-search-style lookup;
- forgetting the complete-shape invariant;
- swapping with the left child without comparing both children;
- claiming repeated insertion and bottom-up heapify have the same complexity;
- assuming equal priorities are automatically stable.

## What you must be able to explain

- Which two invariants define a binary heap?
- Why does array indexing work without pointers?
- Why does sift-up follow one ancestor path?
- Why must sift-down choose the better-priority child?
- Why is heapify linear even though one sift-down may be logarithmic?
- When is a heap preferable to an AVL tree?