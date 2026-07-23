# Algorithms and Complexity

This course is written as a book for learning how algorithms are designed, represented, implemented, justified, and analysed.

The central objective is not to memorise code. It is to understand how a problem becomes a precise specification, how a representation and data structure are chosen, how an algorithm changes state, why the algorithm works, why it terminates, and how its cost grows with the input.

Python is used as the primary language inside the explanations because it keeps the algorithmic idea visible. C++ is introduced in dedicated comparisons when type systems, memory representation, ownership, containers, or operation costs materially change the discussion.

## What the course develops

By working through the complete material, you should develop the ability to:

1. solve technical problems by designing correct algorithms;
2. describe algorithms using explicit assumptions, preconditions, and postconditions;
3. use arrays, linked lists, stacks, queues, trees, heaps, and graphs as conceptual models and practical structures;
4. compare iterative and recursive solutions;
5. explain correctness and termination;
6. estimate time and auxiliary-space complexity;
7. compare alternative solutions and improve them after feedback;
8. communicate technical difficulties precisely.

## How the book begins

The official syllabus sequence begins with imperative computation, algorithm contracts, representations, properties, pseudocode, and structuring techniques.

Before that formal sequence, **Module 00** establishes the reading and reasoning habits needed to study the course effectively. It explains the difference between a problem, an instance, an algorithm, a program, and an execution; shows how to read Python as a state-changing process; develops a step-by-step design method; and distinguishes examples, tests, correctness arguments, termination arguments, and complexity analysis.

[Start Module 00 — Learning to Think Algorithmically](course/00-learning-to-think-algorithmically/index.md)

## Book structure

The complete [Course Contents and Learning Path](course/index.md) explains what each module teaches and how the modules depend on one another.

The modules follow the syllabus order:

1. foundations of algorithm design;
2. iteration, recursion, and data types;
3. arrays, records, and memory representation;
4. searching, sorting, and divide and conquer;
5. functions, the call stack, and recursion;
6. backtracking, greedy methods, and dynamic structures;
7. linked lists, stacks, queues, and priority queues;
8. binary trees, AVL trees, and heaps;
9. graphs and depth-first search;
10. computational complexity and hard problems.

## How to read a chapter

Every substantial chapter follows the same intellectual order:

1. understand the problem and motivation;
2. learn the definitions and notation;
3. build the conceptual model;
4. follow worked examples;
5. trace the important state manually;
6. study the Python implementation;
7. explain correctness and termination;
8. analyse time and memory use;
9. identify boundary cases and common errors;
10. solve problems that require reasoning rather than copying.

!!! tip "The learning objective"
    You have not mastered an algorithm when you can only reproduce its code. You have mastered it when you can explain the problem, assumptions, state, representation, method, correctness, termination, boundary cases, and cost—and adapt the solution when the requirements change.

## Continue

Begin with [Module 00](course/00-learning-to-think-algorithmically/index.md). After completing its review, continue with [Module 01 — Foundations of Algorithm Design](course/01-foundations-of-algorithm-design/index.md).

## Course sources

The scope and order come from the retained [Polish syllabus](source/syllabus-pl.md) and its [English terminology version](source/syllabus-en.md).
