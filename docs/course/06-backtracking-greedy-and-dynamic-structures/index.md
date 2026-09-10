# Module 06 — Backtracking, Greedy Methods, and Dynamic Structures

## Why this module matters

Some problems do not yield to a single scan, a direct formula, or one obvious recursive decomposition. Instead, an algorithm may need to build a partial solution, try one possibility, reject it when it becomes impossible, restore the previous state, and continue with another choice. Other problems invite a locally attractive choice that must be justified, compared, or improved rather than trusted automatically.

This module studies three connected ideas:

- **backtracking**, where an algorithm explores a search space by choosing, exploring, and undoing;
- **greedy construction and improvement**, where local decisions are evaluated against global goals and may be improved systematically or heuristically;
- **dynamic data structures**, whose size or shape changes while an algorithm runs and whose costs must often be analysed over sequences of operations rather than one operation in isolation.

The common theme is controlled change. The algorithm builds and revises state while preserving explicit invariants and guarantees.

## Syllabus scope

This module develops the sixth course-content block:

> Backtracking algorithms. Systematic and heuristic methods for improving greedy algorithms. Dynamic data structures.

The syllabus names the required ideas but leaves the example problems open. The examples in this module are therefore chosen to expose the mechanisms clearly: search-space modelling, partial solutions, pruning, exchange arguments, local improvement, dynamic growth, representation choices, and amortised cost.

## What you should be able to do after this module

After completing the module, you should be able to:

1. model a problem as a search space of states, choices, constraints, and goals;
2. distinguish an ordinary exhaustive search from a backtracking search;
3. identify branching factor, search depth, leaves, dead ends, and candidate states;
4. write a backtracking procedure using the choose–explore–undo pattern;
5. state and preserve an invariant connecting a partial solution with its bookkeeping state;
6. justify that every recursive branch terminates;
7. distinguish pruning from mere search-order heuristics;
8. explain how an invalid pruning rule can destroy completeness;
9. formulate a greedy rule and state precisely what it optimises locally;
10. prove a simple greedy algorithm using an exchange argument;
11. distinguish exact, greedy, local-search, and heuristic guarantees;
12. define a neighbourhood and objective function for an improvement method;
13. distinguish local optimum from global optimum;
14. explain when a data structure must grow, shrink, or change shape during execution;
15. compare contiguous and linked dynamic representations;
16. distinguish worst-case, expected, and amortised operation costs;
17. analyse branching algorithms in terms of depth, explored states, output size, and auxiliary memory;
18. communicate honestly what an algorithm guarantees and what it does not guarantee.

## Concept map

```text
problem requiring construction or exploration
        │
        ├── search-space model
        │       ├── state
        │       ├── partial solution
        │       ├── choices
        │       ├── constraints
        │       ├── goal
        │       ├── branching factor
        │       └── depth
        │
        ├── explore alternatives
        │       └── backtracking
        │              ├── choose
        │              ├── explore
        │              ├── undo
        │              ├── invariant
        │              └── pruning
        │
        ├── commit to local choices
        │       └── greedy construction
        │              ├── local rule
        │              ├── exchange argument
        │              └── counterexample analysis
        │
        ├── revise an existing solution
        │       └── improvement methods
        │              ├── neighbourhood
        │              ├── evaluation function
        │              ├── acceptance rule
        │              └── stopping condition
        │
        └── changing representation
                └── dynamic data structures
                       ├── growth and shrinkage
                       ├── contiguous vs linked
                       ├── ownership and references
                       └── amortised cost
```

## Learning path

### 1. Search spaces and partial solutions

Learn how to turn an informal construction problem into a precise state-space model. Identify candidate states, legal choices, constraints, goals, dead ends, branching factor, depth, and the difference between candidate generation and solution verification.

### 2. The backtracking pattern

Develop choose–explore–undo as a disciplined state-transition pattern. Study permutations and N-Queens, including contracts, state invariants, traces, termination, output-sensitive cost, and the consequences of incorrect restoration.

### 3. Pruning and constraint propagation

Study safe rejection rules, propagation of consequences, choice ordering, and the distinction between pruning and heuristics. Learn why every pruning rule requires an argument that no valid solution is discarded.

### 4. Greedy construction

Learn how greedy algorithms commit to one locally preferred choice. Study interval scheduling as a complete example and use an exchange argument to justify correctness.

### 5. Improving greedy solutions

Distinguish systematic neighbourhood search from heuristic improvement. Study objective functions, local optima, acceptance rules, stopping conditions, counterexamples, and the limits of heuristic guarantees.

### 6. Dynamic data structures

Understand why changing problem state often requires changing representations. Compare dynamic arrays and linked structures, study resizing and capacity, and introduce amortised analysis through sequence-based reasoning.

### 7. Worked examples

Integrate the module through complete case studies: constrained search, greedy scheduling, and local improvement. For each case, identify the contract, state, invariant, correctness or guarantee, termination, and cost.

### 8. Module review

Test the ability to model, trace, debug, prove, compare, and redesign algorithms rather than merely reproduce code.

## Prerequisites

You should already understand:

- recursion and explicit stacks;
- loop and recursive termination arguments;
- invariants and contracts;
- arrays, lists, sets, dictionaries, and mutation;
- aliasing and copying;
- Big O notation and auxiliary-space analysis.

## Diagnostic questions

Before beginning, try to answer:

1. What is the difference between a complete solution and a partial solution?
2. Why is a search tree a model of computation rather than necessarily a stored tree data structure?
3. What must be true before a branch may be pruned safely?
4. Why is trying a promising choice first not the same as pruning alternatives?
5. What exactly must be restored after a backtracking branch returns?
6. Why does a successful greedy example not prove that the greedy rule is correct?
7. What does an exchange argument attempt to show?
8. Why can a local optimum be globally poor?
9. When is amortised analysis more informative than the worst-case cost of one operation?
10. Why can the representation of changing state dominate algorithmic cost?

Return to these questions after completing the module.

## Mastery checklist

You have mastered this module when you can honestly say:

- [ ] I can model a construction problem as a state space.
- [ ] I can define the partial state, choices, constraints, and goal condition.
- [ ] I can identify branching factor and maximum search depth.
- [ ] I can implement choose–explore–undo without corrupting sibling branches.
- [ ] I can state an invariant for a backtracking procedure.
- [ ] I can explain why every branch terminates.
- [ ] I can justify a pruning rule from explicit assumptions.
- [ ] I can distinguish pruning from search-order heuristics.
- [ ] I can formulate and justify a simple greedy rule.
- [ ] I can explain an exchange argument.
- [ ] I can construct a counterexample to an unjustified greedy claim.
- [ ] I can define a neighbourhood and objective for local improvement.
- [ ] I can distinguish local and global optimality.
- [ ] I can compare contiguous and linked dynamic representations.
- [ ] I can explain amortised cost over a sequence of operations.
- [ ] I can state precisely what guarantee an exact or heuristic method provides.

!!! note "Central study question"
    For every algorithm in this module, ask: what state is being built, which choices remain available, what information justifies rejecting a branch or accepting a move, what must remain invariant, and what guarantee is actually proved?
