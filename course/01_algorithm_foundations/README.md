# Module 01 — Foundations of Algorithm Design

## Status

**In progress — Iteration 2 complete: theory, pseudocode, manual traces, and paired Python/C++ examples.**

This module is developed section by section. A section is checked only after its content has been written and reviewed against both syllabus files.

## Source scope

This module implements syllabus topic 1:

- imperative computation;
- algorithm preconditions and postconditions;
- forms of algorithm representation;
- properties of algorithms;
- pseudocode;
- basic techniques for structuring algorithms.

It also establishes the practical use of algorithm contracts required by learning outcome U1.

## Learning objectives

After completing the module, the student should be able to:

1. distinguish a problem, an algorithm, a program, and one execution of a program;
2. identify the input, output, state, and elementary operations of an algorithm;
3. describe an algorithm using a precondition and a postcondition;
4. represent a solution in natural language, pseudocode, and executable code;
5. use sequence, selection, iteration, and decomposition to structure a solution;
6. identify essential properties of an algorithm;
7. trace a simple imperative algorithm manually;
8. identify basic edge cases and invalid inputs;
9. translate the same algorithmic idea into Python and C++ without changing its contract.

## Implemented examples

The module currently contains six paired examples:

1. determine the maximum of two values;
2. determine the maximum of three values;
3. swap two values;
4. calculate the sum of a finite sequence;
5. count values satisfying a predicate;
6. find the minimum and maximum values in one traversal.

Each example includes a contract, pseudocode, manual trace, correctness argument, complexity analysis, and corresponding Python and C++ implementations using equivalent assertions.

## Planned files

```text
course/01_algorithm_foundations/
├── README.md
├── theory.md
├── worked_examples.md
├── guided_exercises.md
├── independent_tasks.md
├── self_check.md
├── python/
│   ├── examples/
│   ├── exercises/
│   └── tests/
├── cpp/
│   ├── examples/
│   ├── exercises/
│   └── tests/
└── instructor/
    ├── lesson_plan.md
    ├── solutions.md
    ├── grading_notes.md
    └── misconceptions.md
```

## Iterative checklist

### A. Scope and planning

- [x] Extract the source scope from the syllabus.
- [x] Define module learning objectives.
- [x] Select initial examples.
- [x] Register the module in `SYLLABUS_TRACEABILITY.md`.

### B. Theory

- [x] Problem, algorithm, program, and execution.
- [x] Imperative computation and program state.
- [x] Input and output.
- [x] Preconditions and postconditions.
- [x] Forms of algorithm representation.
- [x] Properties of algorithms.
- [x] Sequence, selection, iteration, and decomposition.
- [x] Edge cases and failure behavior.
- [x] Introductory correctness reasoning.
- [x] Introductory complexity reasoning.
- [ ] Review and approve `theory.md`.

### C. Pseudocode and manual traces

- [x] Maximum of two values.
- [x] Maximum of three values.
- [x] Swap two values.
- [x] Sum a sequence.
- [x] Count values satisfying a predicate.
- [x] Minimum and maximum in one traversal.

### D. Python examples

- [x] Implement paired examples.
- [x] Add type hints and docstrings.
- [x] Add assertions for normal, boundary, and invalid cases.
- [x] Verify conformance with `shared/coding_standards.md`.

### E. C++ examples

- [x] Implement equivalents of the Python examples.
- [x] Use C++20 and the standard library.
- [x] Add assertions matching the Python test cases.
- [x] Verify conformance with `shared/coding_standards.md`.

### F. Student practice

- [x] Create worked examples.
- [ ] Create guided tracing exercises.
- [ ] Create code-completion exercises.
- [ ] Create debugging exercises.
- [ ] Create contract-writing exercises.
- [ ] Create Core independent tasks.
- [ ] Create Standard independent tasks.
- [ ] Create optional Extension tasks.
- [ ] Create self-check questions.

### G. Instructor materials

- [ ] Create a practical-class lesson plan.
- [ ] Create complete solutions.
- [ ] Create grading notes.
- [ ] Document common misconceptions.

### H. Final review

- [ ] Verify all source requirements against `SYLABUS.md`.
- [ ] Verify English terminology against `SYLLABUS_EN.md`.
- [ ] Verify paired Python/C++ contracts and test cases.
- [ ] Update `SYLLABUS_TRACEABILITY.md`.
- [ ] Approve Module 01.

## Iteration history

### Iteration 1

Completed the module plan and the first complete draft of `theory.md`.

### Iteration 2

Completed:

- six contracts and pseudocode descriptions;
- six manual traces;
- introductory correctness arguments and complexity analyses;
- one paired Python implementation file;
- one paired C++20 implementation file;
- equivalent normal, boundary, and invalid-input assertions.

## Next iteration

Prepare student-practice materials:

1. guided tracing exercises;
2. code-completion exercises;
3. debugging exercises;
4. contract-writing exercises;
5. independent tasks at Core, Standard, and Extension levels;
6. self-check questions.
