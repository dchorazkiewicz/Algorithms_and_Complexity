# Syllabus Traceability Matrix

## Purpose

This document maps every retained substantive requirement from `SYLABUS.md` and `SYLLABUS_EN.md` to the course materials that will implement it.

The matrix is used to:

- prevent accidental omission of a syllabus requirement;
- distinguish source requirements from teaching explanations and extensions;
- track whether each requirement has theory, examples, Python, C++, exercises, and assessment coverage;
- support iterative development and review of each module.

## Status legend

- `[ ]` — not started;
- `[~]` — in progress;
- `[x]` — completed and reviewed;
- `N/A` — not applicable to that requirement.

## Content labels

- **Required** — directly supported by the syllabus;
- **Explanation** — teaching material added to explain a required topic;
- **Example** — illustrative example supporting a required topic;
- **Extension** — additional material not required directly by the syllabus.

---

# 1. Course learning outcomes

| ID | Source requirement | Primary module(s) | Theory | Pseudocode / trace | Python | C++ | Exercises | Assessment |
|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| W1.1 | Understand differences in the properties, structure, operation, and efficiency of iterative and recursive algorithms. | 02, 05, 10 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| W1.2 | Understand how to use arrays, linked lists, trees, and graphs correctly in algorithm design. | 03, 07, 08, 09 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| W1.3 | Understand how to estimate algorithmic complexity. | 04, 07, 08, 09, 10 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.1 | Express a solution to a non-trivial problem as an algorithm with a precondition and postcondition. | 01 and all algorithmic modules | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.2 | Use primitive and compound data types in algorithm design. | 02, 03 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.3 | Use arrays. | 03, 04 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.4 | Use singly and doubly linked lists. | 07 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.5 | Use LIFO stacks and FIFO queues. | 05, 07, 09 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.6 | Use binary trees. | 08 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.7 | Use heaps. | 08 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.8 | Use graphs. | 09 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U1.9 | Estimate the complexity of simple iterative algorithms using Big O notation. | 10, reinforced throughout | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| U2 | Improve developed solutions based on constructive feedback. | All modules, especially guided and improvement exercises | N/A | N/A | [ ] | [ ] | [ ] | [ ] |
| K1 | Solve broadly understood technical problems through algorithm design. | All modules | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| K2 | Communicate difficulties during software solution development precisely. | All modules and instructor-led discussion | [ ] | N/A | [ ] | [ ] | [ ] | [ ] |

---

# 2. Course-content traceability

## Module 01 — Foundations of Algorithm Design

Source syllabus topic 1.

| Requirement | Planned material | Status |
|---|---|:---:|
| Imperative computation | Definition, state changes, sequence of commands, simple traces | [~] |
| Algorithm precondition and postcondition | Contract template and examples | [~] |
| Forms of algorithm representation | Natural language, flow description, pseudocode, source code | [~] |
| Properties of algorithms | Input, output, definiteness, finiteness, effectiveness, correctness | [~] |
| Pseudocode | Repository conventions and worked examples | [x] |
| Basic techniques for structuring algorithms | Sequence, selection, iteration, decomposition | [~] |
| Practical-class examples | Maximum, sum, counting, validation, swapping values | [~] |

## Module 02 — Iteration and Recursion

Source syllabus topic 2.

| Requirement | Planned material | Status |
|---|---|:---:|
| Iterative loops | `for`, `while`, state tracing | [ ] |
| Loop termination condition | Variants, stop conditions, infinite-loop diagnosis | [ ] |
| Recursion | Base case, recursive case, recursive trace | [ ] |
| Method for constructing a correct algorithm | Contract, invariant, termination argument, tests | [ ] |
| Primitive and compound data types | Conceptual classification with Python and C++ examples | [ ] |

## Module 03 — Arrays, Records, and Memory Representation

Source syllabus topic 3.

| Requirement | Planned material | Status |
|---|---|:---:|
| Arrays as aggregate data structures | Indexing, fixed and dynamic arrays, operations | [ ] |
| Records as aggregate data structures | Python data classes / classes and C++ structures | [ ] |
| In-memory representation of different data types | Conceptual memory model, values, references, object layout limits | [ ] |
| Direct access to components | Index and field access | [ ] |
| Basic array operations | Traversal, update, insertion, deletion, reversal, aggregation | [ ] |

## Module 04 — Searching and Sorting

Source syllabus topic 4.

| Requirement | Planned material | Status |
|---|---|:---:|
| Linear search | Contract, trace, Python, C++, tests, complexity | [ ] |
| Binary search | Sorted-input precondition, trace, Python, C++, tests, complexity | [ ] |
| Sorting methods | Basic comparison sorts and selected efficient sorts | [ ] |
| Properties of sorting algorithms | Stability, in-place behavior, adaptiveness, comparison model | [ ] |
| Computational complexity of algorithms | Search and sort comparisons | [ ] |
| Divide-and-conquer method | Decomposition, recursive subproblems, combination | [ ] |
| QuickSort outline | Partitioning, recursive structure, cases | [ ] |
| Index array | Sorting or accessing data through indices | [ ] |
| Recursive algorithms | Recursive search/sort examples | [ ] |

## Module 05 — Functions, the Call Stack, and Recursion

Source syllabus topic 5.

| Requirement | Planned material | Status |
|---|---|:---:|
| Function interaction with its environment | Parameters, return values, external state | [ ] |
| Side effects | Mutation, global state, I/O, pure versus impure functions | [ ] |
| Variable behavior on the stack | Activation records and local state | [ ] |
| Recursive functions | Call-stack traces and examples | [ ] |
| Anatomy of a recursive call | Entry, suspension, nested call, return | [ ] |
| Indirect recursion | Mutually recursive functions | [ ] |
| Nested recursion | Definition, trace, carefully limited examples | [ ] |
| Stack-based implementation of recursion | Explicit stack simulation | [ ] |
| Problems with recursion | Missing base case, repeated work, stack overflow | [ ] |
| Recursion versus iteration | Readability, performance, memory, problem structure | [ ] |

## Module 06 — Algorithm Design Strategies

Source syllabus topic 6.

| Requirement | Planned material | Status |
|---|---|:---:|
| Backtracking algorithms | State-space search, choices, constraints, undo step | [ ] |
| Greedy algorithms | Local-choice strategy and limitations | [ ] |
| Systematic methods for improving greedy algorithms | Compare alternatives, establish invariants and counterexamples | [ ] |
| Heuristic methods | Heuristic ordering and non-guaranteed improvements | [ ] |
| Dynamic data structures | Runtime allocation and growth; linked structures as bridge to Module 07 | [ ] |

> **Scope note:** the syllabus states *dynamic data structures*. Dynamic programming is not silently introduced as a required topic.

## Module 07 — Linked Lists, Stacks, and Queues

Source syllabus topic 7.

| Requirement | Planned material | Status |
|---|---|:---:|
| Linear linked lists | Node model, traversal, insertion, deletion | [ ] |
| LIFO stacks | Abstract data type and implementations | [ ] |
| FIFO queues | Abstract data type and implementations | [ ] |
| Priority queues | Heap-backed library use and abstract behavior | [ ] |
| Doubly linked lists | Bidirectional links and operations | [ ] |
| Circular lists | Termination and traversal conditions | [ ] |
| Self-organizing lists | Move-to-front and related strategies | [ ] |
| Skip lists | Structure and search intuition | [ ] |
| Selected list-processing algorithms | Search, insertion, removal, reversal, merging | [ ] |

## Module 08 — Trees, AVL Trees, and Heaps

Source syllabus topic 8.

| Requirement | Planned material | Status |
|---|---|:---:|
| Fundamental tree concepts | Root, node, edge, parent, child, leaf, depth, height | [ ] |
| Binary trees | Representation and structural properties | [ ] |
| Binary-tree traversal | Preorder, inorder, postorder, level order | [ ] |
| Binary search trees | Search, insertion, deletion, degeneration | [ ] |
| Trees used to implement a dictionary | Key-value operations and ordered dictionaries | [ ] |
| Tree balancing | Motivation and height control | [ ] |
| AVL trees | Balance factor and rotations | [ ] |
| Heaps | Heap property, heapify, insertion, removal | [ ] |

## Module 09 — Graphs and Depth-First Search

Source syllabus topic 9.

| Requirement | Planned material | Status |
|---|---|:---:|
| Graphs | Terminology and graph categories | [ ] |
| Graph representation methods | Adjacency matrix, adjacency list, edge list | [ ] |
| Analysis of example graph properties | Degree, reachability, connectivity, cycles | [ ] |
| Basic graph operations | Add/remove vertices and edges, inspect neighbors | [ ] |
| Incidence-list source wording | Preserve in traceability; teach standard adjacency-list terminology with a note | [ ] |
| Depth-first search | Recursive and iterative DFS | [ ] |
| DFS as exhaustive search | State exploration and visited set | [ ] |
| Applications of DFS | Reachability, components, cycles, paths, maze search | [ ] |

## Module 10 — Computational Complexity

Source syllabus topic 10.

| Requirement | Planned material | Status |
|---|---|:---:|
| Analysis of algorithmic time complexity | Cost model, input size, dominant operations | [ ] |
| Computational complexity | Time and auxiliary-space analysis | [ ] |
| Big O notation | Formal intuition and calculation rules | [ ] |
| Complexity calculations | Sequential, nested, conditional, logarithmic examples | [ ] |
| Computationally hard problems | Motivation and limits of efficient computation | [ ] |
| `N- and NP-complete problems` source wording | Preserve wording, explicitly clarify terminology before teaching | [ ] |

---

# 3. Teaching-method traceability

| Syllabus teaching method | Implementation in repository | Status |
|---|---|:---:|
| Informational and/or problem-oriented lecture with multimedia presentation | Short theoretical introductions and instructor notes | [ ] |
| Case studies and worked examples | `worked_examples.md` in every module | [ ] |
| Discussion, debate, brainstorming, gamification | Discussion prompts and selected collaborative activities | [ ] |
| Problem-solving, team exercises, laboratory exercises | `guided_exercises.md` and laboratory tasks | [ ] |
| Design, programming, simulations | Python/C++ paired examples and implementation tasks | [ ] |
| Programming assignments | `independent_tasks.md` and `assignments/` | [ ] |

---

# 4. Assessment traceability

| Syllabus assessment requirement | Repository support | Status |
|---|---|:---:|
| Practical-class tests | Test-question bank and module self-checks | [ ] |
| Tasks, exercises, or project work completed during classes | Guided exercises and laboratory assignments | [ ] |
| Participation in technical discussion | Discussion and explanation prompts | [ ] |
| Improvement based on feedback | Refactoring and solution-improvement exercises | [ ] |
| Demonstration of progress and encountered problems | Progress-report prompts and instructor rubrics | [ ] |

---

# 5. Independent-study traceability

| Source expectation | Repository support | Status |
|---|---|:---:|
| Exercises after classes to consolidate or extend material | Independent tasks at Core, Standard, and Extension levels | [ ] |
| Preparation for tests | Self-checks, review summaries, sample questions | [ ] |
| Preparation for the examination | Cross-module revision material | [ ] |
| Required reading and supplementary sources | Reading references attached only where useful and source-supported | [ ] |

---

# 6. Module completion rule

A module may be marked complete only when every source requirement assigned to it has:

- [ ] a clearly identified theoretical explanation;
- [ ] at least one example or manual trace;
- [ ] a Python treatment where programming is applicable;
- [ ] a C++ treatment where programming is applicable;
- [ ] exercises or questions that verify understanding;
- [ ] complexity analysis where applicable;
- [ ] a terminology review against `SYLLABUS_EN.md`;
- [ ] a source-scope review against `SYLABUS.md`.

Any additional material must be labelled **Extension** and must not be presented as a formal syllabus requirement.