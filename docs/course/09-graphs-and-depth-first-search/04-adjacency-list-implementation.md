# Adjacency-List Implementation

## From mathematical graph to executable structure

An adjacency list is the principal representation used in this module because DFS repeatedly asks one question: which neighbours of the current vertex can be explored next?

The implementation should make that operation direct while protecting the representation from inconsistent updates.

## A generic directed graph

```python
from collections.abc import Hashable, Iterable
from typing import Generic, TypeVar

Vertex = TypeVar("Vertex", bound=Hashable)


class DirectedGraph(Generic[Vertex]):
    def __init__(self) -> None:
        self._adj: dict[Vertex, set[Vertex]] = {}

    def add_vertex(self, vertex: Vertex) -> None:
        self._adj.setdefault(vertex, set())

    def add_edge(self, source: Vertex, target: Vertex) -> None:
        self.add_vertex(source)
        self.add_vertex(target)
        self._adj[source].add(target)

    def vertices(self) -> set[Vertex]:
        return set(self._adj)

    def neighbours(self, vertex: Vertex) -> set[Vertex]:
        if vertex not in self._adj:
            raise KeyError("unknown vertex")
        return set(self._adj[vertex])

    def has_edge(self, source: Vertex, target: Vertex) -> bool:
        return source in self._adj and target in self._adj[source]
```

The type variable is restricted to hashable values because dictionary keys and set members must be hashable.

## Why every target is also stored as a vertex

When adding `source → target`, the target may have no outgoing edges. It must still appear in the vertex set.

Without:

```python
self.add_vertex(target)
```

a sink could disappear from `vertices()` and from traversals that iterate over all vertices.

## Lists versus sets

Sets prevent duplicate neighbours and support expected constant-time membership. Lists preserve insertion order and may be useful when deterministic traversal order matters.

A course implementation may choose sorted lists for reproducible traces:

```python
for neighbour in sorted(graph[vertex]):
    ...
```

Sorting during every traversal changes the cost. Another option is to maintain neighbours in sorted order during updates.

## Undirected adaptation

An undirected graph adds both directions as one logical operation:

```python
def add_edge(self, left: Vertex, right: Vertex) -> None:
    self.add_vertex(left)
    self.add_vertex(right)
    self._adj[left].add(right)
    self._adj[right].add(left)
```

The public operation should not expose a moment when only one half exists. The method's postcondition is symmetric adjacency.

## Edge enumeration without duplication

In an undirected graph, scanning all adjacency containers sees every edge twice. When vertices are orderable, one possible enumeration is:

```python
def edges(self):
    for left in self._adj:
        for right in self._adj[left]:
            if left < right:
                yield left, right
```

For arbitrary hashable vertices without a total order, store canonical edge objects such as `frozenset({u, v})` in a result set.

## Weighted graph records

A record makes edge meaning explicit:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Edge(Generic[Vertex]):
    target: Vertex
    weight: float
```

Then:

```python
self._adj: dict[Vertex, list[Edge[Vertex]]]
```

The graph contract must state whether two edges with the same target but different weights are allowed.

## Building from an edge collection

```python
def from_edges(edges: Iterable[tuple[Vertex, Vertex]]) -> DirectedGraph[Vertex]:
    graph: DirectedGraph[Vertex] = DirectedGraph()
    for source, target in edges:
        graph.add_edge(source, target)
    return graph
```

The construction delegates invariant maintenance to `add_edge` instead of modifying internal dictionaries in several places.

## Defensive validation

A representation validator is useful during development:

```python
def validate_undirected(adj: dict[Vertex, set[Vertex]]) -> None:
    for vertex, neighbours in adj.items():
        for neighbour in neighbours:
            if neighbour not in adj:
                raise AssertionError("neighbour is not a vertex")
            if vertex not in adj[neighbour]:
                raise AssertionError("asymmetric undirected edge")
```

Validation is not a replacement for correct update methods. It is evidence that the invariant still holds.

## Complexity accounting

For a set-based adjacency list:

- storage: `O(V + E)`;
- enumerate vertices: `O(V)` to create a defensive copy;
- enumerate neighbours: `O(degree(v))` to create a copy;
- add edge: expected `O(1)`;
- traverse all adjacency entries: `O(V + E)` directed and `O(V + 2E)` undirected, which is still `O(V + E)`.

## What you must be able to explain

- Why must sink vertices appear as dictionary keys?
- What trade-off exists between set and list neighbour containers?
- Why is an undirected edge update one logical operation?
- Why does defensive copying protect invariants but add cost?
- How can an implementation enumerate undirected edges exactly once?