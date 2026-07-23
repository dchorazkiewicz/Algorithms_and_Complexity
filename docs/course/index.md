# Course Contents and Learning Path

This course is organised as a book rather than as a collection of disconnected notes. Each module develops one coherent part of the syllabus, and each chapter assumes that the earlier ideas are already understood.

The recommended order is therefore important. Read the modules from beginning to end, work through the examples, and do not skip the review questions. Later topics—recursion, trees, graphs, and complexity—depend on habits introduced near the beginning: defining the problem precisely, tracing state, stating assumptions, and explaining why a solution works.

## How the book is organised

Every module follows the same learning pattern:

1. **Motivation** — what kind of problem the topic addresses and why it matters.
2. **Definitions** — the exact vocabulary needed to reason about the topic.
3. **Conceptual model** — how to imagine the objects and operations involved.
4. **Theory** — the principles, properties, and relationships that govern the topic.
5. **Worked examples** — complete solutions developed step by step.
6. **Python examples** — executable versions of the ideas used in the explanation.
7. **Correctness and termination** — why the algorithm produces the required result and, when relevant, why it eventually stops.
8. **Complexity** — how time and additional memory grow with the input size.
9. **Common mistakes** — incorrect intuitions, broken algorithms, and misleading implementations.
10. **Review and problems** — questions and tasks that test understanding rather than memorisation.

Python is the primary language used inside the narrative because it allows the algorithmic idea to remain visible. C++ comparisons are introduced in dedicated sections when memory representation, types, ownership, or standard-library differences matter.

---

## Module 00 — Learning to Think Algorithmically

**Purpose:** establish the habits needed to study the rest of the course.

You will learn:

- what a computational problem is;
- how a problem instance differs from a general problem;
- how an algorithm differs from a program and from one execution;
- how to read a short Python function as a sequence of state changes;
- how to move from a problem statement to a first correct solution;
- how examples, counterexamples, tests, correctness arguments, and complexity analysis play different roles;
- how to study algorithms actively instead of memorising code.

[Start Module 00](00-learning-to-think-algorithmically/index.md)

---

## Module 01 — Foundations of Algorithm Design

**Syllabus scope:** imperative computation, preconditions and postconditions, forms of algorithm representation, properties of algorithms, pseudocode, and basic techniques for structuring algorithms.

You will learn:

- how imperative commands transform program state;
- how to specify valid initial states and required final states;
- how the same algorithm can be represented in prose, diagrams, pseudocode, Python, and C++;
- what properties distinguish a valid algorithm;
- how sequence, selection, iteration, and decomposition structure a solution.

[Open Module 01](01-foundations-of-algorithm-design/index.md)

---

## Module 02 — Iteration, Recursion, and Data Types

**Syllabus scope:** iterative loops, loop termination conditions, recursion, constructing a correct algorithm, and primitive and compound data types.

You will learn:

- how loops represent repeated state transitions;
- how to formulate a termination condition and a progress argument;
- how recursion reduces a problem to smaller instances;
- how base cases and recursive cases cooperate;
- how primitive and compound data types affect algorithm design.

---

## Module 03 — Arrays, Records, and Memory Representation

**Syllabus scope:** arrays and records as aggregate types, in-memory representation, direct access to components, and basic array operations.

You will learn:

- what arrays and records represent conceptually;
- how contiguous storage, indices, fields, references, and values differ;
- why direct access is efficient;
- how traversal, insertion, deletion, copying, and resizing work;
- why a Python `list` is not identical to a C++ array or `std::vector`.

---

## Module 04 — Searching, Sorting, and Divide and Conquer

**Syllabus scope:** linear and binary search, sorting methods and properties, algorithmic complexity, divide and conquer, Quicksort, index arrays, and recursive algorithms.

You will learn:

- when linear and binary search are applicable;
- how sorting algorithms differ in stability, memory use, and running time;
- how divide and conquer reduces a problem into smaller subproblems;
- how Quicksort partitions data;
- how index arrays preserve source data while changing logical order.

---

## Module 05 — Functions, the Call Stack, and Recursion

**Syllabus scope:** function interaction with the environment, side effects, stack behaviour, recursive calls, indirect and nested recursion, explicit-stack implementation, recursion problems, and recursion versus iteration.

You will learn:

- how functions communicate through parameters, return values, and external state;
- what side effects are and why they matter;
- what a stack frame stores;
- how recursive calls build and unwind the call stack;
- how to recognise indirect and nested recursion;
- how to replace recursion with an explicit stack when appropriate.

---

## Module 06 — Backtracking, Greedy Methods, and Dynamic Structures

**Syllabus scope:** backtracking, systematic and heuristic methods for improving greedy algorithms, and dynamic data structures.

You will learn:

- how a search space is explored and pruned;
- how backtracking restores an earlier partial state;
- how greedy choices are formulated and evaluated;
- how systematic and heuristic improvement differ;
- how dynamic structures change size or shape during execution.

---

## Module 07 — Linked Lists, Stacks, Queues, and Priority Queues

**Syllabus scope:** linear lists, LIFO stacks, FIFO queues, priority queues, doubly linked and circular lists, self-organising lists, skip lists, and selected list algorithms.

You will learn:

- how nodes and links represent sequences;
- how singly and doubly linked lists differ;
- how stacks, queues, and priority queues define restricted access rules;
- how circular and self-organising lists behave;
- how skip lists use multiple levels to accelerate search;
- how representation choices affect operation costs.

---

## Module 08 — Binary Trees, AVL Trees, and Heaps

**Syllabus scope:** tree terminology, binary trees, traversals, binary search trees, dictionaries, balancing, AVL trees, and heaps.

You will learn:

- how rooted trees are described using parent, child, depth, and height;
- how preorder, inorder, postorder, and level-order traversals work;
- how a binary search tree maintains order;
- why unbalanced trees can degrade;
- how AVL rotations restore balance;
- how binary heaps support priority-queue operations.

---

## Module 09 — Graphs and Depth-First Search

**Syllabus scope:** graph representations, graph properties, basic operations, adjacency-list representation, depth-first search as exhaustive search, and DFS applications.

You will learn:

- how vertices and edges model relationships;
- how directed, undirected, weighted, and unweighted graphs differ;
- how adjacency matrices and adjacency lists represent a graph;
- how DFS explores reachable vertices;
- how visited-state tracking prevents repeated work;
- how DFS supports reachability, component analysis, cycle detection, and path exploration.

---

## Module 10 — Computational Complexity and Hard Problems

**Syllabus scope:** time-complexity analysis, computational complexity, Big O notation, worked calculations, hard algorithmic problems, and the source topic described as N- and NP-complete problems.

You will learn:

- how to define input size;
- how to count or bound relevant operations;
- how common growth classes differ;
- how to analyse loops, nested loops, recursion, and data-structure operations;
- why some problems appear fundamentally harder than others;
- how complexity theory distinguishes efficient verification and efficient solution under standard terminology.

---

## The learning objective of the whole course

At the end of the course, you should not merely recognise familiar code. You should be able to take a new technical problem and explain:

1. what the valid input is;
2. what result is required;
3. which data representation is appropriate;
4. which algorithmic strategy is being used;
5. why the algorithm is correct;
6. why it terminates;
7. what its important boundary cases are;
8. how much time and additional memory it requires;
9. how Python and C++ implementations preserve or alter the same abstract idea;
10. how the solution could be improved after analysis or feedback.
