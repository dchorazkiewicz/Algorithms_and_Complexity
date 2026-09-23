<section class="course-hero">
  <p class="course-hero__eyebrow">Syllabus-derived learning-material proof of concept</p>
  <h1>Algorithms and Complexity</h1>
  <p class="course-hero__lead">
    This prototype explores how the source syllabus can be expanded into a connected, student-facing
    learning resource. It covers problem formulation, algorithm design, data representation,
    correctness, termination, and computational cost, with Python examples supporting the theory.
  </p>
  <div class="course-actions">
    <a class="course-button course-button--primary" href="course/00-learning-to-think-algorithmically/">Start learning</a>
    <a class="course-button" href="course/">See the complete course map</a>
  </div>
</section>

!!! info "Prototype status"
    This website is an independent proof of concept built from the syllabus. It is not an official university course site or an official set of lecture notes, and it does not imply that I teach the lecture component.

## What this learning material covers

The objective is not to memorise isolated code fragments. The objective is to show how a syllabus topic can be expanded into a learning path from a problem statement to a justified and efficient implementation.

<div class="course-grid">
  <article class="course-card">
    <div class="course-card__label">Design</div>
    <h3>Formulate algorithms precisely</h3>
    <p>Identify inputs, outputs, assumptions, preconditions, postconditions, state, and failure behaviour.</p>
  </article>
  <article class="course-card">
    <div class="course-card__label">Reason</div>
    <h3>Explain correctness and termination</h3>
    <p>Move beyond testing examples and learn how to justify that an algorithm works for every valid input.</p>
  </article>
  <article class="course-card">
    <div class="course-card__label">Represent</div>
    <h3>Understand data structures</h3>
    <p>Study arrays, linked lists, stacks, queues, trees, heaps, and graphs as models with invariants and operation costs.</p>
  </article>
  <article class="course-card">
    <div class="course-card__label">Analyse</div>
    <h3>Estimate computational cost</h3>
    <p>Define input size, identify dominant operations, and analyse time and auxiliary-space complexity using Big O.</p>
  </article>
</div>

## The learning path begins before the first formal algorithm

The source syllabus sequence starts with imperative computation, algorithm contracts, representations, properties, pseudocode, and structuring techniques. Before that formal sequence, **Module 00** establishes the reading and reasoning habits needed to study the material effectively.

It explains the difference between a problem, a problem instance, an algorithm, a program, and an execution. It then shows how to read Python as a state-changing process, how to design a solution step by step, and how examples, tests, correctness arguments, termination arguments, and complexity analysis play different roles.

<div class="course-callout">
  <strong>Recommended first step:</strong>
  begin with <a href="course/00-learning-to-think-algorithmically/">Module 00 — Learning to Think Algorithmically</a>.
  It prepares the vocabulary and habits used throughout the rest of the prototype.
</div>

## Book structure

<div class="course-grid">
  <article class="course-card">
    <div class="course-card__label">Module 00</div>
    <h3>Learning to Think Algorithmically</h3>
    <p>Problems, algorithms, programs, executions, Python reading, design workflow, evidence, and study method.</p>
    <a href="course/00-learning-to-think-algorithmically/" aria-label="Open Module 00">Open Module 00</a>
  </article>
  <article class="course-card">
    <div class="course-card__label">Module 01</div>
    <h3>Foundations of Algorithm Design</h3>
    <p>Imperative computation, contracts, representations, algorithm properties, pseudocode, and structuring.</p>
    <a href="course/01-foundations-of-algorithm-design/" aria-label="Open Module 01">Open Module 01</a>
  </article>
  <article class="course-card">
    <div class="course-card__label">Modules 02–05</div>
    <h3>Control, Data, Search, and Recursion</h3>
    <p>Iteration, recursion, types, memory, arrays, searching, sorting, functions, and the call stack.</p>
    <a href="course/#module-02-iteration-recursion-and-data-types" aria-label="View Modules 02 to 05">View the course map</a>
  </article>
  <article class="course-card">
    <div class="course-card__label">Modules 06–10</div>
    <h3>Advanced Structures and Complexity</h3>
    <p>Backtracking, lists, queues, trees, AVL, heaps, graphs, DFS, complexity, and hard problems.</p>
    <a href="course/#module-06-backtracking-greedy-methods-and-dynamic-structures" aria-label="View Modules 06 to 10">View the course map</a>
  </article>
</div>

The complete [Contents and Learning Path](course/index.md) explains what each module teaches and how the modules depend on one another.

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

## Source material

The scope and order come from the retained [Polish syllabus](source/syllabus-pl.md) and its [English terminology version](source/syllabus-en.md).
