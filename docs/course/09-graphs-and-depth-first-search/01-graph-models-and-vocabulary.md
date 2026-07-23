# Graph Models and Vocabulary

## A graph begins with a modelling decision

A graph is not merely a picture of dots and lines. It is a mathematical model in which **vertices** represent entities and **edges** represent relationships between them. The same real system can produce different graphs depending on the question being asked.

For a road network, vertices may represent intersections and edges may represent road segments. For airline routes, vertices may represent airports and a directed edge may represent a flight available in one direction. For prerequisite planning, vertices may represent courses and an edge `A → B` may mean that course `A` must be completed before course `B`.

A correct graph algorithm therefore begins with a precise statement of what the graph means.

## Formal model

A graph is written as:

\[
G = (V, E)
\]

where:

- `V` is the set of vertices;
- `E` is the set of edges.

For an undirected graph, an edge connects two vertices without orientation. For a directed graph, an edge is an ordered pair `(u, v)` and points from `u` to `v`.

## Directed and undirected graphs

In an undirected friendship graph, an edge `{u, v}` means the relationship is symmetric. In a directed follower graph, `u → v` does not imply `v → u`.

This distinction changes almost every property:

- degree becomes indegree and outdegree;
- connectedness becomes weak or strong connectedness;
- cycle detection requires different reasoning;
- one adjacency entry may represent one directed edge or one half of an undirected edge.

## Weighted and unweighted graphs

An edge may carry a value such as distance, cost, capacity, or time. The graph is then weighted.

DFS itself does not optimise weighted path cost. It explores structure. A weight can be stored in the representation, but algorithms such as Dijkstra's algorithm are needed when the objective is to minimise non-negative path cost.

## Walks, trails, paths, and cycles

A **walk** is a sequence of vertices where consecutive vertices are connected by edges. Vertices and edges may repeat.

A **trail** does not repeat edges.

A **path** normally means a walk with no repeated vertices.

A **cycle** begins and ends at the same vertex and otherwise does not repeat vertices.

These distinctions matter because an algorithm may be asked to find any route, a simple path, or a cycle. The contract must say which object is required.

## Neighbours and degree

In an undirected graph, two vertices are neighbours when an edge joins them. The degree of a vertex is the number of incident edges.

In a directed graph:

- out-neighbours are reached by outgoing edges;
- in-neighbours have edges pointing into the vertex;
- outdegree counts outgoing edges;
- indegree counts incoming edges.

For a simple undirected graph:

\[
\sum_{v \in V} \deg(v) = 2|E|
\]

Each edge contributes one degree to each endpoint.

## Simple graphs, loops, and parallel edges

A **simple graph** has no self-loops and no repeated edges between the same pair of vertices. Some applications need multigraphs, where parallel edges are meaningful—for example, several distinct flights between the same airports.

The implementation must state which model it supports. A set-based adjacency list naturally prevents repeated neighbours, while a list-based representation may preserve repeated edges and edge order.

## Reachability and connectedness

Vertex `v` is reachable from `u` when a path exists from `u` to `v`.

An undirected graph is connected when every pair of vertices is mutually reachable. Otherwise it consists of connected components.

A directed graph is strongly connected when every vertex can reach every other vertex following edge direction. It is weakly connected when the underlying undirected graph is connected.

## Subgraphs and induced subgraphs

A subgraph selects some vertices and edges from a graph. An induced subgraph on a vertex set includes every original edge whose endpoints both belong to that set.

This idea appears when an algorithm restricts attention to reachable vertices, unvisited vertices, or vertices satisfying a property.

## Modelling checklist

Before implementing an algorithm, answer:

1. What does each vertex represent?
2. What does each edge represent?
3. Is direction meaningful?
4. Are weights meaningful?
5. Are self-loops or parallel edges allowed?
6. Is neighbour order significant?
7. What result must the algorithm produce?

## What you must be able to explain

- Why can the same domain produce several different graph models?
- Which properties change when edges become directed?
- What is the difference between a walk, path, and cycle?
- Why must the implementation state whether repeated edges are allowed?
- What does reachability mean in a directed graph?