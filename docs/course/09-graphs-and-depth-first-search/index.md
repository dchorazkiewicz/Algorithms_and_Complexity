# Module 09 — Graphs and Depth-First Search

## Why this module matters

Many important systems are not naturally linear or hierarchical. Roads connect cities in several directions, courses depend on other courses, users form social networks, and program states lead to alternative future states. A graph is the general structure used when relationships are as important as the objects being related.

The difficulty of graph algorithms begins before traversal. We must first decide what a vertex means, what an edge means, whether direction matters, whether repeated edges or self-loops are allowed, and which representation supports the operations the algorithm performs most often.

This module develops that model carefully and then uses depth-first search as the central algorithm. DFS is not introduced as a memorised recursive function. It is developed as exhaustive exploration with explicit state: discovered vertices, unfinished work, predecessor information, and a rule that prevents repeated exploration.

## Syllabus scope

This module develops the ninth course-content block:

> Graphs. Methods of graph representation. Analysis of properties of example graphs. Basic graph operations. Implementation using incidence or adjacency lists. Depth-first search as an example of exhaustive search and its applications.

The source wording `lista incydencji` is treated explicitly. For vertices, the standard implementation used here is an **adjacency list**: for each vertex, store the vertices or edges incident from it. A separate edge-incidence representation is discussed where useful.

## Learning outcomes

After completing the module, you should be able to:

1. model a problem as a directed or undirected graph;
2. distinguish vertices, edges, paths, walks, cycles, degree, reachability, and connectedness;
3. compare adjacency matrices, adjacency lists, edge lists, and incidence-based representations;
4. implement basic graph operations while preserving representation invariants;
5. trace recursive and iterative DFS;
6. explain why the visited set is necessary;
7. prove that DFS visits exactly the reachable vertices;
8. analyse DFS as `O(V + E)` with an adjacency-list representation;
9. use DFS for reachability, components, cycle detection, path reconstruction, and topological reasoning;
10. identify which conclusions depend on whether a graph is directed or undirected.

## Concept map

```text
problem domain
    └── graph model
            ├── vertices
            ├── edges
            ├── directed / undirected
            ├── weighted / unweighted
            └── representation
                    ├── edge list
                    ├── adjacency matrix
                    ├── adjacency list
                    └── incidence structure
                            │
                            ▼
                    depth-first search
                            ├── visited state
                            ├── recursion or explicit stack
                            ├── DFS tree / forest
                            └── applications
```

## Learning path

1. Graph models and vocabulary.
2. Graph representations and their costs.
3. Graph properties and basic operations.
4. Adjacency-list implementation.
5. Recursive depth-first search.
6. Iterative DFS and exhaustive exploration.
7. Reachability, paths, and connected components.
8. Cycle detection and ordering applications.
9. Worked examples.
10. Module review.

## Prerequisites

You should already understand lists, sets, dictionaries, stacks, recursion, explicit-stack simulation, invariants, and Big O notation.

!!! note "Central study question"
    At every stage ask: what does the graph represent, what information has already been discovered, what work remains unfinished, and which representation makes the required operations efficient?