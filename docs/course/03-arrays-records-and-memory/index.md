# Module 03 — Arrays, Records, and Memory Representation

## Why this module matters

So far, the course has focused on how algorithms control execution: how state changes, how loops repeat work, how recursion reduces a problem, and how correctness and termination can be justified. Module 03 turns to a different but equally important question:

> How should a collection of related values be represented so that an algorithm can access and modify them efficiently?

The answer depends on structure. A sequence stored in indexed positions supports direct access. A record groups fields that describe one logical object. A concrete programming language must also decide how those values are represented in memory, how references are handled, and which operations copy data or merely share access to the same object.

These choices are not implementation trivia. They determine which operations are easy, which are expensive, what can be changed safely, and how the algorithm should be analysed.

## Syllabus scope

This module develops the third course-content block:

> Arrays and records as aggregate data structures. Representation of data in memory. Direct access to components. Basic operations on arrays.

The module follows that order. It begins with arrays as indexed structures, then explains direct access and memory representation, introduces records, and finally develops the main array operations together with their costs and implementation consequences.

## What you should be able to do after this module

After completing the module, you should be able to:

1. explain the abstract idea of an array independently of a programming language;
2. distinguish an array from a Python list and from a C++ `std::vector`;
3. explain zero-based indexing and direct component access;
4. derive the valid index range for an array of length `n`;
5. describe contiguous memory representation conceptually;
6. explain why indexed access is constant-time under the standard array model;
7. distinguish logical length from allocated capacity;
8. trace array traversal and update algorithms;
9. explain the cost of insertion and deletion at different positions;
10. distinguish copying from aliasing;
11. explain the difference between shallow and deep copying at an introductory level;
12. define a record and explain why named fields are useful;
13. represent records in Python using a `dataclass` and compare them with C++ `struct` values;
14. design simple algorithms over arrays and records;
15. analyse their time and auxiliary-space complexity.

## Concept map

```text
aggregate data
      │
      ├── array
      │     ├── homogeneous components
      │     ├── fixed logical order
      │     ├── integer index
      │     ├── direct access
      │     ├── traversal
      │     ├── update
      │     ├── insertion and deletion
      │     └── memory layout and capacity
      │
      └── record
            ├── named fields
            ├── possibly different field types
            ├── one logical entity
            └── field access

implementation consequences
      │
      ├── copying
      ├── aliasing
      ├── mutation
      ├── bounds
      └── operation cost
```

## Learning path

### 1. Arrays as indexed aggregate structures

Develop the abstract array model, valid indices, element access, order, homogeneity, and the distinction between an algorithmic array and language-specific containers.

### 2. Memory representation and direct access

Understand contiguous layout conceptually, address calculation, element size, locality, bounds, and why direct access does not require scanning earlier components.

### 3. Traversing and updating arrays

Study complete scans, indexed scans, prefix and suffix processing, replacement, transformation, and in-place versus out-of-place algorithms.

### 4. Insertion, deletion, and shifting

Explain why insertion and deletion inside an array require movement of existing elements, how order is preserved, and how operation cost depends on position.

### 5. Records and structured entities

Learn how records group named fields, how they differ from arrays, and how Python `dataclass` and C++ `struct` values represent structured data.

### 6. Copying, aliasing, and mutation

Understand when two variables refer to the same mutable object, when a real copy is created, and why this matters for algorithm contracts and correctness.

### 7. Worked examples

Connect the theory through complete examples involving reversal, rotation, insertion, deletion, record processing, and mixed array-record algorithms.

### 8. Review and problems

Test definitions, tracing, cost analysis, debugging, representation choices, and implementation skills.

## Prerequisites

You should already be able to:

- identify input, output, state, and side effects;
- read and trace `for` and `while` loops;
- use preconditions and postconditions;
- distinguish primitive and compound data types;
- analyse simple linear algorithms;
- read basic Python functions.

## Diagnostic questions

Before beginning, try to answer:

1. Why can an array element be accessed without first reading all earlier elements?
2. What is the valid index range for an array of length `n`?
3. Is a Python list exactly the same thing as a fixed-size array?
4. Why is inserting at the front of an array usually more expensive than replacing an element?
5. What is the difference between `copy = values` and `copy = values[:]` in Python?
6. Why might a record be clearer than a three-element tuple?
7. What happens if two variables refer to the same mutable list?
8. Why does memory representation influence algorithmic cost?

Return to these questions after completing the module.

## Mastery checklist

You have mastered this module when you can honestly say:

- [ ] I can define an array without referring only to Python syntax.
- [ ] I can explain direct indexed access.
- [ ] I can calculate valid index ranges correctly.
- [ ] I can distinguish array length from storage capacity.
- [ ] I can trace traversal, insertion, deletion, and reversal.
- [ ] I can explain why insertion and deletion may require shifting.
- [ ] I can distinguish in-place and out-of-place algorithms.
- [ ] I can explain aliasing and copying in Python.
- [ ] I can define and use a record.
- [ ] I can analyse the time and auxiliary-space cost of basic array operations.

!!! note "Study objective"
    Do not reduce this module to memorising Python list methods. The objective is to understand the underlying indexed structure, the memory model, the meaning of each operation, and the cost created by representation choices.