# Graph Properties and Basic Operations

## A representation must support questions about structure

Once a graph is stored, algorithms need to inspect and modify it. These operations are not independent of the mathematical model. Adding an edge in a directed graph changes one adjacency relation; adding an edge in an undirected graph changes two.

## Basic operations

A practical graph interface commonly supports:

- add a vertex;
- remove a vertex;
- add an edge;
- remove an edge;
- test whether a vertex exists;
- test whether an edge exists;
- enumerate vertices;
- enumerate neighbours;
- compute degree, indegree, or outdegree.

The contract must say what happens for repeated insertion, missing vertices, self-loops, and parallel edges.

## Example graph class

```python
class UndirectedGraph:
    def __init__(self) -> None:
        self._adj: dict[str, set[str]] = {}

    def add_vertex(self, vertex: str) -> None:
        self._adj.setdefault(vertex, set())

    def add_edge(self, left: str, right: str) -> None:
        if left == right:
            raise ValueError("self-loops are not supported")
        self.add_vertex(left)
        self.add_vertex(right)
        self._adj[left].add(right)
        self._adj[right].add(left)

    def remove_edge(self, left: str, right: str) -> None:
        if left not in self._adj or right not in self._adj[left]:
            raise KeyError("edge does not exist")
        self._adj[left].remove(right)
        self._adj[right].remove(left)

    def neighbours(self, vertex: str) -> set[str]:
        if vertex not in self._adj:
            raise KeyError("unknown vertex")
        return set(self._adj[vertex])
```

Returning a copy from `neighbours` prevents callers from mutating the internal representation without preserving its invariants.

## Removing a vertex

Removing a vertex from an undirected adjacency list requires removing it from every neighbour container as well.

```python
def remove_vertex(self, vertex: str) -> None:
    if vertex not in self._adj:
        raise KeyError("unknown vertex")

    for neighbour in list(self._adj[vertex]):
        self._adj[neighbour].remove(vertex)

    del self._adj[vertex]
```

The copy created by `list(...)` makes the iteration independent of later mutation.

## Degree-based observations

For an undirected graph, isolated vertices have degree zero. Leaves in a tree have degree one, except that a one-vertex tree has degree zero.

The handshaking identity provides a useful consistency check:

\[
\sum_{v \in V} \deg(v) = 2|E|.
\]

If the degree sum is odd, the representation cannot describe a valid undirected graph.

## Paths and reachability

A local neighbour operation does not directly answer whether one vertex can reach another. Reachability is a global property and requires traversal.

This distinction is important:

- adjacency asks whether one edge exists;
- reachability asks whether some path exists.

Confusing them leads to algorithms that inspect only immediate neighbours and miss longer paths.

## Connected components

A connected component of an undirected graph is a maximal set of mutually reachable vertices.

“Maximal” means that no additional vertex can be added while preserving connectedness. Components partition the vertex set: every vertex belongs to exactly one component.

## Trees as special graphs

An undirected graph is a tree when it is connected and acyclic. Equivalent characterisations include:

- exactly one simple path exists between every pair of vertices;
- a connected graph with `V - 1` edges;
- an acyclic graph with `V - 1` edges.

These equivalences are useful, but each depends on the graph being finite and undirected.

## Directed graph properties

Directed graphs introduce:

- sources with indegree zero;
- sinks with outdegree zero;
- strongly connected components;
- directed cycles;
- directed acyclic graphs (DAGs).

A DAG can represent dependencies because no object depends, directly or indirectly, on itself.

## Property analysis workflow

When analysing an example graph:

1. identify whether it is directed;
2. count vertices and edges;
3. compute relevant degrees;
4. inspect reachability;
5. determine components;
6. look for cycles;
7. state whether the graph satisfies special properties such as tree, DAG, or complete graph.

## Complexity depends on representation

With adjacency sets:

- add vertex: expected `O(1)`;
- add edge: expected `O(1)`;
- test edge: expected `O(1)`;
- remove vertex: proportional to its degree, plus dictionary work.

With adjacency lists, membership and edge removal may require scanning a neighbour list.

## What you must be able to explain

- Why is removing a vertex more involved than removing one edge?
- How does encapsulation protect graph invariants?
- Why is adjacency not the same as reachability?
- How do connected components partition an undirected graph?
- Which tree characterisations require connectedness or acyclicity assumptions?