# Recursive Depth-First Search

## Exploration before memorisation

Depth-first search explores one unfinished route as far as possible before returning to an earlier branching point. The recursive formulation is compact because the call stack naturally stores those unfinished branching points.

The essential state is not the recursion itself. It is the set of vertices already discovered.

## Basic algorithm

```python
def dfs(graph: dict[str, list[str]], start: str) -> list[str]:
    if start not in graph:
        raise KeyError("unknown start vertex")

    visited: set[str] = set()
    order: list[str] = []

    def explore(vertex: str) -> None:
        visited.add(vertex)
        order.append(vertex)

        for neighbour in graph[vertex]:
            if neighbour not in visited:
                explore(neighbour)

    explore(start)
    return order
```

## Why marking happens before recursion

The vertex is added to `visited` immediately after entering `explore`. This establishes:

> every active DFS call corresponds to a vertex already marked as discovered.

Marking after exploring neighbours is wrong in a cyclic graph. Two adjacent vertices can recursively call each other forever because neither has yet been recorded as visited.

## Trace on a small graph

```text
A: B, C
B: D
C: D
D: A
```

Starting at `A` with neighbour order as written:

1. discover `A`;
2. recurse to `B`;
3. recurse to `D`;
4. inspect `A`, but skip it because it is visited;
5. return to `B`, then `A`;
6. recurse to `C`;
7. inspect `D`, but skip it;
8. finish.

The resulting order is `A, B, D, C`. Another neighbour order may produce another valid DFS order.

## DFS tree

Whenever DFS first reaches `v` from `u`, edge `u → v` becomes a tree edge in the DFS tree.

A predecessor map records that structure:

```python
def dfs_predecessors(graph, start):
    predecessor = {start: None}

    def explore(vertex):
        for neighbour in graph[vertex]:
            if neighbour not in predecessor:
                predecessor[neighbour] = vertex
                explore(neighbour)

    explore(start)
    return predecessor
```

The map simultaneously marks discovered vertices and records how each was reached.

## Correctness: soundness

Every visited vertex is reachable from `start`.

The start vertex is reachable from itself. Every later vertex is visited through an edge from an already reachable vertex. Therefore, by extending the existing path by one edge, the new vertex is reachable.

## Correctness: completeness

Every vertex reachable from `start` is eventually visited.

Consider a reachable vertex `v` and a path from `start` to `v`. DFS visits the start. Whenever it visits one vertex on that path, it eventually examines every outgoing neighbour, including the next path vertex. Therefore the path cannot contain a first unvisited vertex.

Together, soundness and completeness show that DFS visits exactly the reachable vertices.

## Termination

A recursive call is made only for an unvisited vertex. Each call marks a new vertex, and the graph contains finitely many vertices. Therefore there can be at most `V` calls.

## Complexity

With adjacency lists:

- each reachable vertex is entered once;
- each outgoing adjacency entry is inspected once;
- time: `O(V + E)` for the reachable subgraph;
- visited set: `O(V)`;
- recursion depth: at most `O(V)`.

For undirected graphs, each edge appears in two adjacency lists, but `2E` is still `O(E)`.

## DFS forest

Calling DFS from one start vertex explores only its reachable region. To cover the entire graph:

```python
def dfs_forest(graph):
    visited = set()
    roots = []

    def explore(vertex):
        visited.add(vertex)
        for neighbour in graph[vertex]:
            if neighbour not in visited:
                explore(neighbour)

    for vertex in graph:
        if vertex not in visited:
            roots.append(vertex)
            explore(vertex)

    return roots
```

In an undirected graph, each root begins one connected component.

## What you must be able to explain

- Why is the visited set the central state of DFS?
- Why must a vertex be marked before exploring its neighbours?
- Why can several DFS orders be correct?
- How does the predecessor map define a DFS tree?
- How do soundness, completeness, termination, and complexity follow from the representation?