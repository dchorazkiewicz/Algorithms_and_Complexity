# Reachability, Paths, and Connected Components

## Turning traversal into answers

DFS becomes useful when its traversal state is interpreted as a solution. A visited set answers reachability. A predecessor map reconstructs a path. Repeated DFS roots identify connected components.

## Reachability

```python
def reachable(graph, start, target):
    if start not in graph or target not in graph:
        return False

    stack = [start]
    visited = {start}

    while stack:
        vertex = stack.pop()
        if vertex == target:
            return True

        for neighbour in graph[vertex]:
            if neighbour not in visited:
                visited.add(neighbour)
                stack.append(neighbour)

    return False
```

The algorithm may stop as soon as `target` is discovered or processed. This early exit preserves correctness because the requested result is only existence of a path.

## Path reconstruction

```python
def find_path(graph, start, target):
    if start not in graph or target not in graph:
        return None

    predecessor = {start: None}
    stack = [start]

    while stack:
        vertex = stack.pop()
        if vertex == target:
            break

        for neighbour in graph[vertex]:
            if neighbour not in predecessor:
                predecessor[neighbour] = vertex
                stack.append(neighbour)

    if target not in predecessor:
        return None

    path = []
    current = target
    while current is not None:
        path.append(current)
        current = predecessor[current]

    path.reverse()
    return path
```

The predecessor relation forms a tree rooted at `start`. Following predecessors backward must terminate because each predecessor was assigned when a new vertex was first discovered.

DFS finds a path, but not necessarily one with the fewest edges. Breadth-first search is the standard choice for shortest unweighted paths.

## Connected components

```python
def connected_components(graph):
    visited = set()
    components = []

    for start in graph:
        if start in visited:
            continue

        component = []
        stack = [start]
        visited.add(start)

        while stack:
            vertex = stack.pop()
            component.append(vertex)

            for neighbour in graph[vertex]:
                if neighbour not in visited:
                    visited.add(neighbour)
                    stack.append(neighbour)

        components.append(component)

    return components
```

Each outer-loop start is unvisited, so it cannot belong to any earlier component. DFS then visits exactly the vertices reachable from that start. Therefore the produced components are disjoint and cover all vertices.

## DFS forest

The collection of predecessor trees produced by full-graph DFS is a DFS forest. In an undirected graph, one tree corresponds to one connected component.

In a directed graph, starting a new DFS tree does not directly identify strongly connected components. Direction makes the relationship more subtle.

## Classifying vertices by discovery

A useful state scheme uses colours:

- white: undiscovered;
- grey: discovered but unfinished;
- black: finished.

This vocabulary supports later cycle detection and helps distinguish “seen” from “completely processed.”

## Cost

A single reachability or path search is `O(V + E)` in the reachable region. Computing all undirected components is also `O(V + E)`, not one full traversal per vertex, because the global visited set ensures each vertex and adjacency entry is processed once.

## What you must be able to explain

- How does a visited set answer reachability?
- Why does a predecessor map support path reconstruction?
- Why is a DFS path not necessarily shortest?
- Why do component searches share one global visited set?
- Why does a DFS forest have a different interpretation in directed graphs?