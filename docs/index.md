# Algorithms and Complexity

This website is being developed as a complete set of English-language lecture notes and study materials aligned with the retained course syllabus.

The objective is not to produce a short task list or a simplified summary. Each syllabus topic will be developed as a full learning chapter containing definitions, theory, formal descriptions, diagrams where useful, worked examples, Python and C++ implementations, correctness arguments, complexity analysis, common errors, and problems for independent study.

## Source of truth

The scope and ordering of the materials are determined by two source files:

- **Polish source syllabus** — the retained substantive content of the original document;
- **English syllabus** — the same structure expressed with appropriate Computer Science terminology.

No source topic may be silently omitted, renamed into a different topic, or replaced with unrelated material. Explanations and additional context may be added only to teach the source content fully.

## Development model

The website is written iteratively:

1. preserve and inspect the source scope;
2. plan one module in detail;
3. write one topic at a time;
4. add definitions and theoretical foundations;
5. add worked examples and problems;
6. add Python and C++ implementations where applicable;
7. add correctness and complexity analysis;
8. review the module against the source syllabus;
9. only then proceed to the next module.

The complete breakdown and checklist are available in the [development plan](development-plan.md).

## Current module

Development has started on [Module 01 — Foundations of Algorithm Design](course/01-foundations-of-algorithm-design/index.md).

The first published topic is [Imperative Computation](course/01-foundations-of-algorithm-design/imperative-computation.md), which introduces program state, assignments, state transitions, control flow, input, output, side effects, manual execution traces, and the relationship between imperative execution, correctness, and complexity.

!!! success "Current stage"
    The content plan has been approved. The MkDocs site is now being developed module by module and topic by topic, beginning with the first syllabus block.