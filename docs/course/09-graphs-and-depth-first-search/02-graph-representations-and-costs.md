# Graph Representations and Their Costs

## The graph is abstract; the representation is concrete

The abstract graph tells us which vertices and edges exist. A representation decides how this information is stored. Two representations may describe exactly the same graph while supporting very different operation costs.

The correct question is not “which representation is best?” but “which operations must be efficient for this problem?”

## Edge list

An edge list stores the edges directly.

```python
edges = [(0, 1), (0, 3), (1, 2), (2, 3)]
```

It is compact and natural when the algorithm scans every edge. It is less convenient when repeatedly asking for all neighbours of one vertex, because the complete list may need to be scanned.

Typical costs:

- enumerate all edges: `O(E)`;
- test whether a specific edge exists: `O(E)` without an additional index;
- list neighbours of one vertex: `O(E)`.

## Adjacency matrix

For `V` vertices numbered `0` through `V - 1`, an adjacency matrix is a `V × V` table.

```text
matrix[u][v] = 1  if edge u → v exists
matrix[u][v] = 0  otherwise
```

For an undirected graph the matrix is symmetric.

Advantages:

- edge-existence test: `O(1)`;
- simple and regular memory layout;
- useful for dense graphs and matrix-based algorithms.

Costs:

- memory: `O(V²)` regardless of the number of edges;
- listing neighbours of one vertex: `O(V)`;
- adding a new vertex may require rebuilding the matrix.

## Adjacency list

An adjacency list stores, for every vertex, its outgoing neighbours.

```python
graph = {
    0: [1, 3],
    1: [2],
    2: [3],
    3: [],
}
```

For an undirected graph, each edge `{u, v}` normally appears twice: `v` in `u`'s list and `u` in `v`'s list.

Advantages:

- memory: `O(V + E)`;
- listing neighbours of `u`: proportional to `degree(u)`;
- natural for DFS and sparse graphs.

The cost of testing whether `u → v` exists depends on the neighbour container:

- list: `O(outdegree(u))`;
- set: expected `O(1)` membership, but no meaningful order;
- sorted list: `O(log degree(u))` membership with binary search, but insertion may be linear.

## Incidence representations

The syllabus uses the phrase “lista incydencji.” In graph terminology, incidence can refer to the relationship between vertices and edges.

One explicit representation stores edge identifiers:

```python
edges = {
    0: (0, 1),
    1: (0, 3),
    2: (1, 3),
}
incident = {
    0: [0, 1],
    1: [0, 2],
    2: [],
    3: [1, 2],
}
```

This is useful when edges are first-class objects carrying data. For ordinary traversal, the standard vertex-based adjacency list is usually simpler and is the principal representation in this module.

## Weighted adjacency lists

A weighted edge may be stored as a pair:

```python
graph = {
    "A": [("B", 7), ("C", 3)],
    "B": [("C", 2)],
    "C": [],
}
```

The representation preserves both the neighbour and the edge attribute. The traversal must avoid confusing the pair with the neighbour identifier itself.

## Dense and sparse graphs

A simple directed graph can contain up to `V(V - 1)` non-loop edges. A graph with `E` near `V²` is dense. A graph with far fewer edges is sparse.

Adjacency matrices spend `O(V²)` memory even for sparse graphs. Adjacency lists spend memory proportional to the structure actually present.

## Representation invariants

A representation is correct only while its invariants hold.

For an undirected adjacency-list graph:

- every vertex has a neighbour container;
- if `v` appears in `adj[u]`, then `u` appears in `adj[v]`;
- forbidden self-loops do not appear;
- repeated neighbours do not appear when the model is simple.

A failed update can silently turn an undirected graph into an asymmetric structure.

## Cost table

| Operation | Edge list | Matrix | Adjacency list |
|---|---:|---:|---:|
| Memory | `O(E)` | `O(V²)` | `O(V + E)` |
| Test edge | `O(E)` | `O(1)` | container-dependent |
| List neighbours | `O(E)` | `O(V)` | `O(degree(u))` |
| Enumerate edges | `O(E)` | `O(V²)` | `O(V + E)` |

## What you must be able to explain

- Why can two correct representations yield different algorithmic complexity?
- Why is an adjacency list natural for DFS?
- Why does an undirected edge normally appear twice in adjacency lists?
- When is an incidence representation preferable?
- Which invariant is most easily broken when adding or removing an undirected edge?