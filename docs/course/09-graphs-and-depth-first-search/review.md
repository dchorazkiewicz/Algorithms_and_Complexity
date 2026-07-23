# Module 09 Review

## Core vocabulary

Explain each term in your own words:

- graph, vertex, edge;
- directed and undirected graph;
- weighted graph;
- neighbour, degree, indegree, outdegree;
- walk, trail, path, cycle;
- reachability and connected component;
- adjacency matrix, adjacency list, edge list, incidence structure;
- DFS tree and DFS forest;
- predecessor map;
- white, grey, and black DFS states;
- topological order.

## Conceptual questions

1. Why is graph modelling part of algorithm design rather than mere input formatting?
2. When is an adjacency matrix preferable to an adjacency list?
3. Why does an undirected adjacency list normally store each edge twice?
4. Why must a sink still appear as a vertex key?
5. Why does DFS need visited state on cyclic graphs?
6. Why can recursive and iterative DFS produce different valid orders?
7. Why does DFS find a path but not necessarily a shortest path?
8. Why does an edge to a grey vertex prove a directed cycle?
9. Why is the immediate parent edge ignored in undirected cycle detection?
10. Why does topological ordering require a DAG?

## Representation exercise

For the graph:

```text
A → B
A → C
B → D
C → D
D → B
E isolated
```

Construct:

- an edge list;
- an adjacency matrix using order `A, B, C, D, E`;
- an adjacency list;
- indegree and outdegree tables.

Then state which vertices are reachable from `A`, from `C`, and from `E`.

## Trace exercise

Trace recursive DFS from `A`. Record:

- call stack;
- visited set;
- current neighbour;
- predecessor map;
- entry and exit events.

Repeat using iterative DFS and explain any ordering difference.

## Debugging tasks

### Late marking

```python
def dfs(vertex):
    for neighbour in graph[vertex]:
        if neighbour not in visited:
            dfs(neighbour)
    visited.add(vertex)
```

Explain why a two-vertex cycle fails to terminate.

### Missing sink vertex

```python
def add_edge(source, target):
    graph.setdefault(source, []).append(target)
```

Explain how a target with no outgoing edges can disappear from full-graph iteration.

### Broken undirected update

```python
graph[left].add(right)
# graph[right].add(left) missing
```

Identify which invariant fails and which algorithms may produce misleading answers.

### Incorrect directed cycle test

```python
if neighbour in visited:
    return True
```

Construct an acyclic directed graph for which this returns a false positive.

### Incomplete search state

A puzzle marks only `position` as visited even though the player may carry keys. Explain how this can destroy completeness.

## Design problems

### Problem 1 — Social network

Model mutual friendship and answer whether two users belong to the same connected component. State representation, contract, correctness argument, and complexity.

### Problem 2 — Dependency cycle

Given package dependencies, report one cycle or confirm that none exists. Use colour-state DFS and explain how the cycle path could be reconstructed.

### Problem 3 — Island counting

Treat open cells in a grid as vertices connected orthogonally. Count components without first materialising every edge. Explain how the graph is implicit.

### Problem 4 — Maze with keys

Define a complete search state and explain why `(position, keys)` may be necessary. Analyse the maximum state-space size.

### Problem 5 — Representation choice

For each workload choose a representation and justify it:

- frequent edge-existence queries in a dense graph;
- DFS over a sparse graph;
- repeated scanning of all weighted edges;
- edge objects with multiple attributes.

## Mastery checklist

You are ready to continue when you can:

- define a graph model precisely;
- select a representation from required operations;
- preserve directed or undirected representation invariants;
- trace recursive and iterative DFS;
- prove DFS reachability soundness and completeness;
- derive `O(V + E)` from adjacency-list processing;
- reconstruct paths from predecessors;
- compute connected components;
- detect directed and undirected cycles with the correct state;
- explain topological ordering and its acyclicity requirement.

## Connection to Module 10

Graph algorithms show why complexity cannot be discussed without an input model and representation. Module 10 makes that analysis systematic: input size, operation counting, asymptotic notation, recurrence reasoning, and the distinction between efficiently solvable and computationally difficult problems.