# Module 00 — Course Guide and Shared Conventions

## Status

**Module type:** organizational foundation  
**Audience:** students and instructors  
**Primary language of course materials:** English  
**Source documents:** [`SYLABUS.md`](../../SYLABUS.md) and [`SYLLABUS_EN.md`](../../SYLLABUS_EN.md)

This module defines how the remaining course materials are written, read, implemented, tested, and reviewed. It does not introduce a separate syllabus topic. Its purpose is to make all later modules consistent and traceable.

---

## 1. Purpose of the materials

The repository is intended to support practical classes in **Algorithms and Complexity**. Each substantive module should help the student move through the following sequence:

1. understand the required concepts;
2. read and write an algorithm contract;
3. follow language-independent pseudocode;
4. trace the algorithm manually;
5. study a worked implementation in Python;
6. study the corresponding implementation in C++;
7. analyze correctness, edge cases, time complexity, and space complexity;
8. complete guided exercises;
9. complete independent tasks;
10. verify understanding through self-check questions.

The materials are therefore not only collections of programming tasks. They include the theory required to understand and complete those tasks.

---

## 2. Source of truth and traceability

The course scope is determined by the two syllabus files:

- `SYLABUS.md` — the filtered Polish source version;
- `SYLLABUS_EN.md` — the English version using standard Computer Science terminology.

The Polish syllabus remains the primary reference for checking whether the source structure and meaning have been preserved. The English syllabus is the terminology reference for student-facing English materials.

Later teaching explanations may clarify, illustrate, or extend the syllabus, but they must not silently replace or change its requirements.

When a source expression is ambiguous or terminologically questionable, the material must:

1. preserve the source wording in traceability documentation;
2. identify the ambiguity explicitly;
3. separate any clarification from the formal requirement.

---

## 3. Content labels

The following labels are used throughout the course.

### **Required**

Content that follows directly from the syllabus and is part of the expected course scope.

### **Explanation**

A teaching explanation of required content. It may include analogies, diagrams, intermediate steps, or additional wording, but it must preserve the original meaning.

### **Example**

A worked example used to demonstrate a required concept or technique.

### **Extension**

Additional material that is useful but not explicitly required by the syllabus.

An extension must never be presented as a formal course requirement.

Recommended Markdown form:

```markdown
> **Required**
> Students must be able to estimate the time complexity of simple iterative algorithms using Big O notation.

> **Explanation**
> The analysis begins by identifying the input size and the dominant repeated operation.

> **Extension**
> Tight asymptotic bounds using Theta notation are discussed for additional precision.
```

---

## 4. Standard structure of a substantive module

Each substantive module should eventually contain:

```text
XX_module_name/
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

Not every file must be completed in a single iteration. Work proceeds section by section, and completion is tracked in `MATERIALS_DEVELOPMENT_PLAN.md`.

---

## 5. How students should use a module

Recommended order:

1. Read the module `README.md` to understand objectives and prerequisites.
2. Read `theory.md` before attempting implementation tasks.
3. Copy the algorithm contract and identify input, output, preconditions, and postconditions.
4. Trace at least one example manually.
5. Compare the pseudocode with the Python and C++ implementations.
6. Run the same test cases in both languages.
7. Complete guided exercises before independent tasks.
8. Use `self_check.md` without looking at solutions.
9. Revisit the theory when an implementation fails or a complexity result is unclear.

Students should not treat the final code as the only learning outcome. The expected process includes explaining why the algorithm works and how its resource usage grows with the input size.

---

## 6. How instructors should use a module

A practical class may be organized as follows:

1. brief diagnostic question;
2. concise theoretical introduction;
3. manual trace performed with the group;
4. implementation walkthrough;
5. guided modification or debugging task;
6. independent implementation task;
7. complexity and correctness discussion;
8. short self-check or exit question.

The theory may be shortened during class when students already know the topic, but it should remain available in the repository for preparation and revision.

Instructor-only solutions and grading notes belong under the module's `instructor/` directory and should not be mixed with student-facing task files.

---

## 7. Algorithm contract format

Every major algorithm or programming task should define a contract.

```text
Name:
    A short, precise algorithm name.

Input:
    The values or data structures supplied to the algorithm.

Output:
    The value, structure, or observable result produced by the algorithm.

Preconditions:
    Conditions that must hold before the algorithm starts.

Postconditions:
    Conditions guaranteed after normal completion.

Side effects:
    Any modification of external state, input data, files, or output streams.

Failure behavior:
    What happens when the preconditions are not met or the requested result does not exist.
```

### Example contract

```text
Name:
    find_maximum

Input:
    A finite sequence values of comparable elements.

Output:
    The greatest element in values.

Preconditions:
    values is not empty.

Postconditions:
    The returned value belongs to values and is greater than or equal to every element in values.

Side effects:
    None.

Failure behavior:
    The function rejects an empty sequence according to the language-specific interface.
```

The contract is language-independent. Python and C++ implementations may express failure behavior differently, but they must implement the same logical specification.

---

## 8. Standard for paired Python and C++ examples

A paired example must have:

- the same problem statement;
- the same contract;
- the same pseudocode;
- equivalent behavior for valid inputs;
- the same named test cases where practical;
- the same stated complexity;
- a short note explaining language-specific differences.

The implementations do not need to be literal line-by-line translations. They should use appropriate constructs for each language while preserving the algorithm.

Repository baseline:

- Python examples target **Python 3.11 or later**;
- C++ examples target **C++20**;
- code should rely on the standard library unless the module explicitly introduces another dependency.

These version choices are repository conventions, not syllabus requirements.

---

## 9. Required analysis for an algorithm

Each important algorithm should answer the following questions:

1. What is the input size parameter?
2. What operation dominates the running time?
3. What are the relevant best, average, or worst cases?
4. What time-complexity bound is claimed?
5. What additional memory is used?
6. Which preconditions are required for correctness?
7. Which edge cases must be tested?
8. Does the implementation modify the input?

The detailed conventions are defined in:

- [`shared/pseudocode_conventions.md`](../../shared/pseudocode_conventions.md);
- [`shared/complexity_reference.md`](../../shared/complexity_reference.md);
- [`shared/python_cpp_mapping.md`](../../shared/python_cpp_mapping.md);
- [`shared/coding_standards.md`](../../shared/coding_standards.md);
- [`shared/glossary_en_pl.md`](../../shared/glossary_en_pl.md).

---

## 10. Review rules

Before a module is marked complete, verify that:

- every source requirement assigned to the module is covered;
- required content is distinguishable from extensions;
- pseudocode follows the shared conventions;
- paired implementations have equivalent contracts and test cases;
- correctness and edge cases are discussed;
- time and space complexity are stated;
- terminology agrees with the English syllabus and bilingual glossary;
- instructor material is separated from student material;
- the checklist in `MATERIALS_DEVELOPMENT_PLAN.md` is updated.

---

## 11. Current Module 00 deliverables

- [x] course guide;
- [x] content-label rules;
- [x] algorithm-contract format;
- [x] paired-language example standard;
- [x] pseudocode conventions;
- [x] Python/C++ concept mapping;
- [x] complexity reference;
- [x] bilingual terminology glossary;
- [x] coding standards;
- [ ] conventions reviewed and approved for use in Module 01.
