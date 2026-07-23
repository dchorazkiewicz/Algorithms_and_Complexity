# Cycle Detection and Ordering Applications

## Why cycles require more than a visited set

A visited set tells us whether a vertex was seen before. That is not always enough to detect a cycle correctly.

In a directed graph, an edge to a previously visited vertex may point to a vertex whose exploration is already complete. Such an edge does not by itself prove a directed cycle. We must distinguish active calls from finished vertices.

## Directed cycle detection

Use three colours:

- white — undiscovered;
- grey — active on the current DFS path;
- black — completely processed.

```python
def has_directed_cycle(graph) -> bool:
    colour = {vertex: "white" for vertex in graph}

    def explore(vertex) -> bool:
        colour[vertex] = "grey"

        for neighbour in graph[vertex]:
            if colour[neighbour] == "grey":
                return True
            if colour[neighbour] == "white" and explore(neighbour):
                return True

        colour[vertex] = "black"
        return False

    return any(
        colour[vertex] == "white" and explore(vertex)
        for vertex in graph
    )
```

An edge to a grey vertex points to an ancestor on the current recursion path, creating a directed cycle.

## Undirected cycle detection

In an undirected graph, every edge appears in both directions. The edge back to the immediate parent is not a cycle and must be ignored.

```python
def has_undirected_cycle(graph) -> bool:
    visited = set()

    def explore(vertex, parent) -> bool:
        visited.add(vertex)

        for neighbour in graph[vertex]:
            if neighbour not in visited:
                if explore(neighbour, vertex):
                    return True
            elif neighbour != parent:
                return True

        return False

    for vertex in graph:
        if vertex not in visited and explore(vertex, None):
            return True

    return False
```

This logic assumes a simple undirected graph. Parallel edges require a representation that distinguishes edge identities.

## Topological ordering

A topological order of a directed graph places every source before every target:

```text
for every edge u → v, u appears before v
```

Such an order exists exactly when the graph is acyclic.

DFS can produce a topological order by appending each vertex after all descendants finish:

```python
def topological_sort(graph):
    colour = {vertex: "white" for vertex in graph}
    order = []

    def explore(vertex):
        colour[vertex] = "grey"

        for neighbour in graph[vertex]:
            if colour[neighbour] == "grey":
                raise ValueError("graph contains a cycle")
            if colour[neighbour] == "white":
                explore(neighbour)

        colour[vertex] = "black"
        order.append(vertex)

    for vertex in graph:
        if colour[vertex] == "white":
            explore(vertex)

    order.reverse()
    return order
```

The vertex is appended on exit, not entry. At that moment every reachable successor has already been appended. Reversing finish order therefore places each prerequisite before the vertices that depend on it.

## Articulation between model and result

A topological order is meaningful only when edge direction reflects dependency correctly. If `A → B` means “A depends on B,” then the interpretation is opposite from “A must precede B.” The algorithm cannot repair a reversed domain model.

## Other DFS applications

The same entry, exit, predecessor, and colour state supports:

- identifying DFS trees and forests;
- finding back edges;
- checking whether an undirected graph is a tree;
- exploring all states reachable from an initial configuration;
- decomposing more advanced graph structures.

Strongly connected components require an additional algorithmic construction and are beyond the minimum scope developed here, although DFS remains central to standard methods.

## Complexity

Cycle detection and topological sorting examine every vertex and adjacency entry at most a constant number of times:

```text
time:  O(V + E)
space: O(V)
```

The space includes colours, output, and recursion depth.

## What you must be able to explain

- Why is “edge to visited vertex” insufficient for directed cycle detection?
- Why must the parent edge be ignored in an undirected graph?
- Why does a grey neighbour prove a directed cycle?
- Why are vertices appended on DFS exit for topological ordering?
- Why does a cycle make topological ordering impossible?