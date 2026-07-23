# Module 01 — Foundations of Algorithm Design

## Why this module comes first

Before studying searching, sorting, recursion, lists, trees, graphs, or complexity, you need a precise language for describing a computation.

This module builds that language. It explains how a problem becomes a specification, how a specification guides an algorithm, how an imperative algorithm changes state, how one method can be represented in several forms, and how larger solutions are assembled from a small set of structural patterns.

The objective is not to memorise definitions separately. The objective is to see one connected chain:

```text
problem
    ↓
contract
    ↓
algorithmic idea
    ↓
state and control flow
    ↓
representation
    ↓
Python implementation
    ↓
trace, correctness, termination, and cost
```

Every later module depends on this chain.

## Syllabus scope

This module develops the first course-content block:

> Imperative programming. Algorithm preconditions and postconditions. Forms of algorithm representation. Properties of algorithms. Pseudocode. Basic techniques for structuring algorithms.

The material is more detailed than a short classroom introduction because it is intended to function as lecture notes for independent study, revision, practical work, and exam preparation.

---

## What you should be able to do after this module

After completing the module, you should be able to:

1. distinguish a computational problem, a problem instance, an algorithm, a program, and an execution;
2. identify input, output, state, expressions, statements, and control flow;
3. explain how assignments and commands transform state;
4. formulate meaningful preconditions, postconditions, side effects, and failure behaviour;
5. distinguish a specification from an implementation;
6. represent the same algorithm in structured prose, a diagram, pseudocode, Python, and C++;
7. explain input, output, definiteness, effectiveness, finiteness, generality, correctness, and efficiency;
8. write consistent language-independent pseudocode;
9. structure an algorithm using sequence, selection, iteration, and decomposition;
10. trace a simple algorithm manually;
11. identify boundary cases, invalid inputs, hidden assumptions, and side effects;
12. give an introductory correctness, termination, time-complexity, and auxiliary-space argument.

---

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
        ├── side effects
        └── failure behaviour
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

---

## Learning path

The chapters should be read in order. Each one adds a layer needed by the next.

### 1. Imperative Computation

Learn how a program is modelled as a sequence of state transitions. Distinguish values, variables, expressions, statements, assignments, control flow, input, output, and side effects.

[Read: Imperative Computation](imperative-computation.md)

### 2. Preconditions and Postconditions

Learn how to define valid initial states and required final states. Study contracts, weak and strong conditions, validation, failure behaviour, mutation, and references to the old state.

[Read: Preconditions and Postconditions](preconditions-and-postconditions.md)

### 3. Forms of Algorithm Representation

Compare structured prose, traces, diagrams, pseudocode, mathematical specifications, Python, and C++. Understand what each form reveals, what it hides, and why an algorithm is not identical to any one representation.

[Read: Forms of Algorithm Representation](algorithm-representations.md)

### 4. Properties of Algorithms

Study input and output, definiteness, effectiveness, finiteness, generality, correctness, total correctness, efficiency, and explicit failure behaviour.

[Read: Properties of Algorithms](properties-of-algorithms.md)

### 5. Pseudocode

Learn consistent notation for assignment, expressions, conditions, loops, functions, procedures, returns, mutation, indexing, and failure. Translate between pseudocode and Python without changing the contract.

[Read: Pseudocode](pseudocode.md)

### 6. Structuring Algorithms

Use sequence, selection, iteration, guard clauses, state locality, and decomposition to build understandable and verifiable solutions. Learn how structure supports correctness and complexity reasoning.

[Read: Structuring Algorithms](structuring-algorithms.md)

### 7. Worked Examples

Connect contracts, state meanings, pseudocode, Python, traces, correctness arguments, termination, and complexity in complete examples.

[Read: Worked Examples](worked-examples.md)

### 8. Module 01 Review

Check whether you can use the concepts independently through definitions, traces, contract writing, representation, debugging, proof sketches, complexity analysis, decomposition, and a capstone problem.

[Open: Module 01 Review](review.md)

---

## How to study the module

For each chapter:

1. read the motivation before memorising terminology;
2. rewrite the main definitions in your own words;
3. reproduce the central example without looking at the solution;
4. trace the important state manually;
5. explain why initial values are justified;
6. identify what the contract requires and what it excludes;
7. translate between prose, pseudocode, and Python;
8. state why the algorithm terminates;
9. estimate time and auxiliary-space cost;
10. answer the final questions without returning immediately to the text.

Do not treat the worked examples as templates to copy mechanically. Change the requirements—first versus last occurrence, strict versus non-strict comparison, mutation versus new result—and observe which parts of the design must change.

---

## Prerequisites

You need only basic familiarity with:

- arithmetic expressions;
- variables;
- simple Boolean conditions;
- elementary Python syntax.

C++ appears as a comparison where language details are relevant, but Python is the primary executable notation in the narrative.

No advanced data-structure knowledge is required.

---

## Diagnostic questions

Before beginning, try to answer these questions. It is acceptable not to know the answers yet.

1. Is an algorithm the same thing as a program?
2. What changes when an assignment is executed?
3. Why is `x ← x + 1` not a mathematical equation?
4. What must be true before binary search may be used?
5. How can one algorithm be represented without choosing a programming language?
6. What makes a procedure definite?
7. What makes an algorithm totally correct?
8. Why is a terminating procedure not automatically correct?
9. What is the difference between returning a value and modifying an input object?
10. Why can two correct implementations of the same algorithm have different memory costs?

Return to these questions after completing the module.

---

## Mastery checklist

You have mastered this module when you can honestly say:

- [ ] I can define every central term without relying on code syntax.
- [ ] I can describe the state of a simple computation.
- [ ] I can manually trace assignments, selections, and loops.
- [ ] I can write a precondition and a postcondition for a simple problem.
- [ ] I can identify an overly weak or unnecessarily strong specification.
- [ ] I can explain side effects and failure behaviour.
- [ ] I can translate the same idea between prose, pseudocode, Python, and C++.
- [ ] I can explain the principal properties of an algorithm.
- [ ] I can structure a solution with sequence, selection, iteration, and decomposition.
- [ ] I can explain why a simple algorithm produces the required result.
- [ ] I can explain why it terminates.
- [ ] I can identify boundary cases and hidden assumptions.
- [ ] I can give an introductory time- and auxiliary-space analysis.
- [ ] I can redesign a solution when one word in the requirement changes.

!!! note "Study objective"
    Do not stop when you can reproduce a code fragment. The objective is to explain the problem, specification, state changes, representation, algorithmic structure, correctness, termination, boundary cases, and cost.

---

## Completion of the module

Module 01 now covers every topic listed in the first syllabus block:

- imperative computation;
- algorithm preconditions and postconditions;
- forms of algorithm representation;
- properties of algorithms;
- pseudocode;
- basic techniques for structuring algorithms.

The review chapter closes the module. After completing it, continue to Module 02, where iteration, loop termination, recursion, correct algorithm construction, and primitive and compound data types are developed in depth.