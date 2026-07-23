# Module 00 Review Checklist

## Current status

Module 00 has a complete first draft. It remains **unapproved** until the conventions are reviewed and accepted for use in Module 01.

## Deliverables

- [x] Create `course/00_course_guide/README.md`.
- [x] Explain how students should use the materials.
- [x] Explain how instructors can structure practical classes around the materials.
- [x] Define the four content labels: Required, Explanation, Example, Extension.
- [x] Define the algorithm-contract format.
- [x] Define the standard for paired Python and C++ examples.
- [x] Create `shared/pseudocode_conventions.md`.
- [x] Create `shared/python_cpp_mapping.md`.
- [x] Create `shared/complexity_reference.md`.
- [x] Create `shared/glossary_en_pl.md`.
- [x] Create `shared/coding_standards.md`.
- [x] Separate syllabus requirements from repository conventions.
- [x] Preserve ambiguous source terminology instead of silently correcting it.
- [ ] Review and approve the conventions before starting Module 01.

## Decisions currently proposed

The first draft adopts the following repository conventions:

1. Student-facing course materials are written in English.
2. Polish source terminology is retained in the bilingual glossary and traceability records.
3. Pseudocode uses uppercase keywords, `snake_case` identifiers, `←` for assignment, and zero-based indexing.
4. Major algorithms include input, output, preconditions, postconditions, side effects, and failure behavior.
5. Python examples target Python 3.11 or later.
6. C++ examples target C++20.
7. Examples use only the standard library unless another dependency is explicitly justified.
8. Core algorithm functions are separated from interactive input/output.
9. Python and C++ implementations share the same logical contract and equivalent test cases.
10. Big O is the required baseline notation; Theta, Omega, amortized analysis, and the Master Theorem are marked as extensions unless a later module explicitly promotes them.
11. The phrase `problemy N- i NP-zupełne` is preserved as source wording and flagged for clarification before the relevant teaching material is written.

## Review questions

Before approval, decide whether to keep or change:

- [ ] Python 3.11+ as the baseline;
- [ ] C++20 as the baseline;
- [ ] zero-based indexing in all pseudocode unless explicitly overridden;
- [ ] `snake_case` naming in both languages for paired examples;
- [ ] exception-based rejection of invalid input where the contract requires validation;
- [ ] simple assertions as the initial cross-language testing mechanism;
- [ ] smart-pointer-first ownership in C++, with raw pointers reserved for explicitly educational examples;
- [ ] Big O as the required analysis notation and other asymptotic notation as an extension;
- [ ] the proposed English terminology in `shared/glossary_en_pl.md`.

## Approval

- [ ] **Module 00 approved for use as the foundation of Module 01.**

Approval should be recorded only after requested corrections are committed.
