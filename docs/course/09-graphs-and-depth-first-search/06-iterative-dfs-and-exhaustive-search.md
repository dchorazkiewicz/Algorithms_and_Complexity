# Iterative DFS and Exhaustive Search

<link rel="stylesheet" href="/Algorithms_and_Complexity/stylesheets/iterative-dfs-visualization.css">
<script defer src="/Algorithms_and_Complexity/javascripts/iterative-dfs-visualization.js"></script>

## Making unfinished work explicit

Recursive DFS stores unfinished calls on the language's call stack. Iterative DFS stores the same kind of pending work in an explicit stack.

This change does not alter the abstract search strategy. It changes where the continuation state is represented.

<div data-iterative-dfs-viz></div>

## Simple iterative DFS

```python
def dfs_iterative(graph: dict[str, list[str]], start: str) -> list[str]:
    if start not in graph:
        raise KeyError("unknown start vertex")

    stack = [start]
    visited: set[str] = set()
    order: list[str] = []

    while stack:
        vertex = stack.pop()

        if vertex in visited:
            continue

        visited.add(vertex)
        order.append(vertex)

        for neighbour in reversed(graph[vertex]):
            if neighbour not in visited:
                stack.append(neighbour)

    return order
```

The neighbours are pushed in reverse order because the last pushed item is processed first. This can make the iterative order match a recursive traversal that scans neighbours from left to right.

## Mark on push or mark on pop?

Two valid designs exist.

### Mark on pop

The version above may push the same vertex more than once. Duplicates are discarded when popped.

### Mark on push

```python
def dfs_mark_on_push(graph, start):
    stack = [start]
    visited = {start}
    order = []

    while stack:
        vertex = stack.pop()
        order.append(vertex)

        for neighbour in reversed(graph[vertex]):
            if neighbour not in visited:
                visited.add(neighbour)
                stack.append(neighbour)

    return order
```

This prevents duplicate stack entries. The invariant changes:

> every vertex in the stack has already been discovered but not yet processed.

Neither version is universally “the one correct DFS.” The implementation must state the meaning of `visited` and `stack` consistently.

## Simulating recursive frames exactly

A simple vertex stack reproduces the general depth-first strategy but not always the exact event sequence of recursive DFS. To model entry and exit events, store explicit frames:

```python
def dfs_with_events(graph, start):
    visited = set()
    stack = [(start, False)]
    events = []

    while stack:
        vertex, exiting = stack.pop()

        if exiting:
            events.append(("exit", vertex))
            continue

        if vertex in visited:
            continue

        visited.add(vertex)
        events.append(("enter", vertex))
        stack.append((vertex, True))

        for neighbour in reversed(graph[vertex]):
            if neighbour not in visited:
                stack.append((neighbour, False))

    return events
```

The exit marker represents the work that should happen after all descendants return.

## DFS as exhaustive search

DFS is exhaustive over the reachable region because it systematically follows every available edge from every discovered vertex unless a justified rule prunes the exploration.

The visited set is a form of state-space reduction. Once a graph vertex has been fully or sufficiently considered, revisiting it cannot reveal a new structural state when the future depends only on the vertex itself.

That assumption is crucial. In a more general search problem, the state may need to include additional information such as remaining resources, current path constraints, or used colours. Two visits to the same location may then represent different states.

## Graph traversal versus state-space search

A maze cell graph can use position as the state when walls are fixed. A key-and-door puzzle cannot always do so, because reaching the same cell with different keys leads to different future possibilities.

The real state may be:

```text
(position, collected_keys)
```

Using only `position` in `visited` would prune valid solutions.

## Termination and completeness

Iterative DFS terminates because:

- the graph is finite;
- only finitely many vertices can be newly marked;
- every loop iteration removes one stack item;
- only finitely many items are added under the visited rule.

Completeness follows from the same path argument as recursive DFS: every edge from each processed reachable vertex is considered.

## Complexity

With mark-on-push and adjacency lists:

- every vertex is pushed at most once;
- every adjacency entry is inspected once;
- time: `O(V + E)`;
- stack: `O(V)`;
- visited set: `O(V)`.

Mark-on-pop may create more duplicate stack entries, but with ordinary adjacency lists the total remains bounded by adjacency inspections and is still `O(V + E)`.

## What you must be able to explain

- What information does the explicit stack replace?
- How do mark-on-push and mark-on-pop change the invariant?
- Why might reverse neighbour order be used?
- Why is a visited vertex sufficient state in ordinary graph traversal but not in every search problem?
- How can entry and exit events be represented iteratively?