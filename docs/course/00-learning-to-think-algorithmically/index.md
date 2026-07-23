# Module 00 — Learning to Think Algorithmically

Algorithms are often introduced as pieces of code: a loop that searches a list, a function that sorts values, or a recursive procedure that walks through a tree. That approach is tempting because code is concrete. It is also incomplete.

A student who memorises code may be able to reproduce a familiar solution and still be unable to answer the questions that matter most:

- What problem is this program actually solving?
- Which inputs are valid?
- What result is guaranteed?
- Why does the method work for every valid input rather than for one example?
- Why does it terminate?
- How does its cost grow when the input becomes larger?
- Would another data structure make the solution simpler or faster?

This preparatory module develops the habits needed to answer those questions. It is not an additional syllabus topic that replaces the official sequence. It is a reading and reasoning foundation derived from the course objectives and learning outcomes. The syllabus expects you to design correct algorithms, use complex data structures, estimate complexity, improve solutions, and communicate technical difficulties precisely. Those abilities require more than remembering syntax.

## What this module teaches

By the end of Module 00, you should be able to:

1. distinguish a computational problem from one concrete problem instance;
2. distinguish an algorithm from a program and from one execution;
3. identify the input, output, assumptions, and changing state of a simple solution;
4. read a short Python function as a sequence of meaningful operations rather than as a block of syntax;
5. trace the values of important variables by hand;
6. move from an informal problem statement to a first explicit solution plan;
7. explain the difference between an example, a test, a correctness argument, and a complexity analysis;
8. recognise that a correct result for one input is not evidence of a correct general algorithm;
9. state what you understand, what you assume, and where a solution may fail.

## The central idea

The course studies algorithms as a chain of reasoning:

```text
problem
   ↓
precise specification
   ↓
data representation
   ↓
algorithmic idea
   ↓
step-by-step procedure
   ↓
Python or C++ implementation
   ↓
testing and tracing
   ↓
correctness and termination
   ↓
complexity and improvement
```

Each arrow matters. Skipping one often produces code that appears to work but is difficult to justify, maintain, or generalise.

## Chapter map

### 1. Problems, algorithms, programs, and executions

You will learn the vocabulary that separates the general task from one input, the method from its implementation, and the implementation from one concrete run.

[Read: Problems, Algorithms, Programs, and Executions](01-problems-algorithms-programs.md)

### 2. How to read a Python algorithm

You will learn how to identify state, conditions, repetition, and outputs in a short Python function. The goal is to see the algorithmic structure beneath the syntax.

[Read: Reading Python as an Algorithm](02-reading-python-as-an-algorithm.md)

### 3. From a problem statement to a solution

You will follow a repeatable design process: clarify the task, define examples and edge cases, choose state, write the steps, implement them, and test the result.

[Read: Designing a Solution Step by Step](03-designing-a-solution.md)

### 4. Evidence: correctness, termination, and cost

You will learn why passing tests is useful but insufficient, how an informal correctness argument is constructed, why termination is a separate obligation, and what complexity analysis describes.

[Read: Evidence That an Algorithm Works](04-evidence-correctness-and-cost.md)

### 5. How to study the rest of the course

You will learn a practical method for reading theory, tracing examples, writing code, checking understanding, and revising a topic.

[Read: How to Study Algorithms](05-how-to-study-algorithms.md)

### 6. Review

The review collects the vocabulary, questions, and exercises that determine whether you are ready to begin the formal syllabus sequence in Module 01.

[Open the Module 00 Review](review.md)

## Why the examples use Python first

Module 00 uses Python as the primary executable notation. This is a deliberate teaching decision. Python allows the essential control flow and state changes to remain visible without introducing memory-management or type-system details too early.

That does not mean Python and C++ are treated as equivalent or that C++ is excluded from the course. Later modules compare the two languages where the differences matter: fixed-size and dynamic arrays, references and pointers, value semantics, memory layout, ownership, standard-library containers, recursion limits, and operation costs.

For now, the priority is to understand the method before comparing language mechanisms.

## How to use this module

Do not read passively. For each example:

1. cover the code and explain the problem in your own words;
2. identify the inputs and expected output;
3. predict the result before running the program;
4. trace the important variables manually;
5. run the code;
6. change the input and predict the new behaviour;
7. explain why the algorithm works;
8. identify at least one boundary case;
9. state the time and memory cost at an introductory level.

The objective is not to finish the pages quickly. The objective is to develop a way of thinking that will remain useful when the data structures and algorithms become substantially more complex.
