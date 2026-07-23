# Module 01 — Foundations of Algorithm Design

## Why this module comes first

Before studying searching, sorting, recursion, lists, trees, graphs, or complexity, you need a precise language for describing a computation.

This module builds that language. It explains how a problem becomes an algorithm, how an algorithm changes state, how its required behaviour is specified, how it can be represented, and how larger solutions are constructed from a small set of control structures.

## Syllabus scope

This module develops the first course-content block:

> Imperative programming. Algorithm preconditions and postconditions. Forms of algorithm representation. Properties of algorithms. Pseudocode. Basic techniques for structuring algorithms.

The chapter is more detailed than the scheduled class time because it is intended to support independent study, revision, practical work, and lecture preparation.

## What you should be able to do after this module

After completing the module, you should be able to:

1. distinguish a computational problem, a problem instance, an algorithm, a program, and an execution;
2. identify input, output, state, expressions, statements, and control flow;
3. explain how assignments and other commands transform state;
4. formulate meaningful preconditions and postconditions;
5. distinguish a specification from an implementation;
6. represent the same algorithm in structured prose, pseudocode, a diagram, Python, and C++;
7. explain the essential properties of an algorithm;
8. structure an algorithm using sequence, selection, iteration, and decomposition;
9. trace a simple algorithm manually;
10. identify boundary cases, invalid inputs, side effects, and failure behaviour;
11. give an introductory correctness and complexity argument for a simple algorithm.

## Concept map

```text
computational problem
        │
        ├── input domain
        ├── required output
        └── constraints
        │
        ▼
algorithm specification
        ├── precondition
        ├── postcondition
        └── side effects / failure behaviour
        │
        ▼
algorithm representation
        ├── structured natural language
        ├── diagram or flowchart
        ├── pseudocode
        └── source code
        │
        ▼
imperative execution
        ├── state
        ├── assignment
        ├── sequence
        ├── selection
        ├── iteration
        └── decomposition
        │
        ▼
reasoning
        ├── manual trace
        ├── correctness
        ├── termination
        └── complexity
```

## Learning path

### 1. Imperative computation

Learn how a program is modelled as a sequence of state transitions. Distinguish values, variables, expressions, statements, assignments, control flow, input, output, and side effects.

[Read: Imperative Computation](imperative-computation.md)

### 2. Preconditions and postconditions

Learn how to specify valid initial states and required final states. Practise writing contracts that are neither too weak nor unnecessarily restrictive.

### 3. Forms of algorithm representation

Compare structured prose, diagrams, pseudocode, and executable programs. Understand what information each representation exposes or hides.

### 4. Properties of algorithms

Study input and output, definiteness, finiteness, effectiveness, correctness, generality, and efficiency.

### 5. Pseudocode

Learn a precise language-independent notation that can be translated into Python or C++ without confusing syntax with the algorithm itself.

### 6. Structuring algorithms

Use sequence, selection, iteration, and decomposition to build understandable and verifiable solutions.

### 7. Worked examples and implementation

Connect contracts, pseudocode, traces, correctness arguments, complexity analysis, Python, and C++.

### 8. Problems and review

Verify understanding through definition questions, tracing, contract writing, debugging, reasoning, and implementation problems.

## Prerequisites

You need only basic familiarity with:

- arithmetic expressions;
- variables;
- simple boolean conditions;
- elementary Python or C++ syntax.

No advanced data-structure knowledge is required.

## Diagnostic questions

Before beginning, try to answer these questions. It is acceptable not to know the answers yet.

1. Is an algorithm the same thing as a program?
2. What changes when an assignment is executed?
3. Why is `x ← x + 1` not a mathematical equation?
4. What must be true before binary search may be used?
5. How can one algorithm be represented without choosing a programming language?
6. What makes an algorithm correct?
7. Why is a terminating procedure not automatically a correct algorithm?
8. What is the difference between returning a value and modifying an input object?

Return to these questions after completing the module.

## Mastery checklist

You have mastered this module when you can honestly say:

- [ ] I can define every central term without relying on code syntax.
- [ ] I can describe the state of a simple computation.
- [ ] I can manually trace assignments, selections, and loops.
- [ ] I can write a precondition and a postcondition for a simple problem.
- [ ] I can identify an overly weak or overly strong specification.
- [ ] I can translate the same idea between prose, pseudocode, Python, and C++.
- [ ] I can explain why a simple algorithm produces the required result.
- [ ] I can explain why it terminates.
- [ ] I can identify basic boundary cases and side effects.
- [ ] I can give an introductory time- and space-complexity analysis.

!!! note "Study objective"
    Do not stop when you can reproduce a code fragment. The objective is to explain the problem, specification, state changes, algorithmic structure, correctness, termination, and cost.