# Module 10 — Computational Complexity and Hard Problems

## Why this module matters

Correctness answers whether an algorithm solves the stated problem. Complexity asks how the required resources grow as the input grows. This distinction becomes decisive when two correct algorithms behave very differently beyond small examples.

The module also introduces a second level of reasoning. Sometimes the difficulty is not choosing among known implementations, but understanding whether an entire problem family appears to resist efficient exact solution.

## Syllabus scope

This module develops the tenth course-content block:

> Time-complexity analysis. Computational complexity. Big O notation. Examples of complexity calculations. Algorithmically difficult problems. N- and NP-complete problems.

The syllabus uses the phrase “N- and NP-complete problems”. In standard complexity terminology the relevant classes are **P**, **NP**, **NP-hard**, and **NP-complete**. This module explains those terms while preserving the syllabus emphasis on hard problems.

## Learning outcomes

After completing the module, you should be able to:

1. define input size explicitly;
2. distinguish time, auxiliary space, and output cost;
3. count dominant operations in loops and recursive algorithms;
4. use Big O, Big Omega, and Big Theta correctly;
5. compare common growth classes;
6. analyse sequential, nested, logarithmic, and divide-and-conquer patterns;
7. distinguish best, worst, average, and amortised analysis;
8. explain tractability as a growth-rate question;
9. distinguish decision, search, and optimisation formulations;
10. explain P, NP, polynomial verification, reductions, NP-hardness, and NP-completeness at an introductory level.

## Learning path

1. Cost models and input size.
2. Asymptotic notation.
3. Counting iterative algorithms.
4. Recursive complexity and recurrences.
5. Growth classes and practical scalability.
6. Best, worst, average, and amortised analysis.
7. Tractable and intractable problem families.
8. P, NP, reductions, and NP-completeness.
9. Worked examples.
10. Module review.

!!! note "Central discipline"
    Never write a complexity class before stating what the input size means and which operation is being counted.