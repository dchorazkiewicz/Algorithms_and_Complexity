# Module 01 — Foundations of Algorithm Design

## Status

**In progress — Iteration 1: module plan and theoretical foundation.**

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

## Planned examples

The first version of this module uses small problems that expose algorithm structure without requiring advanced data structures:

1. determine the maximum of two or three values;
2. swap two values;
3. calculate the sum of a finite sequence;
4. count values satisfying a condition;
5. validate input before calculation;
6. find the minimum and maximum values in a sequence.

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

- [~] Problem, algorithm, program, and execution.
- [~] Imperative computation and program state.
- [~] Input and output.
- [~] Preconditions and postconditions.
- [~] Forms of algorithm representation.
- [~] Properties of algorithms.
- [~] Sequence, selection, iteration, and decomposition.
- [~] Edge cases and failure behavior.
- [~] Introductory correctness reasoning.
- [~] Introductory complexity reasoning.
- [ ] Review and approve `theory.md`.

### C. Pseudocode and manual traces

- [ ] Maximum of two values.
- [ ] Maximum of three values.
- [ ] Swap two values.
- [ ] Sum a sequence.
- [ ] Count values satisfying a predicate.
- [ ] Minimum and maximum in one traversal.

### D. Python examples

- [ ] Implement paired examples.
- [ ] Add type hints and docstrings.
- [ ] Add assertions for normal, boundary, and invalid cases.
- [ ] Verify conformance with `shared/coding_standards.md`.

### E. C++ examples

- [ ] Implement equivalents of the Python examples.
- [ ] Use C++20 and the standard library.
- [ ] Add assertions matching the Python test cases.
- [ ] Verify conformance with `shared/coding_standards.md`.

### F. Student practice

- [ ] Create worked examples.
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

## Definition of the current iteration

Iteration 1 is complete when:

- the module plan exists;
- the complete first draft of `theory.md` exists;
- every theory section is explicitly tied to the source scope;
- no programming examples or exercises are marked complete prematurely.

## Next iteration

Create and review `theory.md`, then proceed to pseudocode and manually traced examples before writing Python and C++ implementations.