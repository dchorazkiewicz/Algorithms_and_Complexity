# Module 06 Review

## Core vocabulary

Explain each term in your own words:

- search space;
- state;
- partial solution;
- choice;
- goal state;
- dead end;
- backtracking;
- pruning;
- constraint propagation;
- bound;
- greedy rule;
- exchange argument;
- local optimum;
- neighbourhood;
- heuristic;
- dynamic data structure;
- invariant;
- amortised cost.

## Conceptual questions

1. Why is backtracking more specific than “trying all possibilities”?
2. What exactly must be restored when a branch is abandoned?
3. Why can a pruning rule preserve soundness but destroy completeness?
4. How does choice ordering differ from pruning?
5. Why does a successful greedy example not prove a greedy rule?
6. What does an exchange argument establish?
7. Why can a local optimum be globally poor?
8. How does the chosen neighbourhood affect an improvement method?
9. Why do branching algorithms require careful handling of mutable state?
10. When is amortised analysis appropriate for a dynamic structure?

## Trace exercise

Trace the permutation algorithm for `[1, 2, 3]`.

At every recursive call record:

- `current`;
- `used`;
- the next index considered;
- the state immediately after undo.

Explain why the state before trying the next sibling branch is identical to the state before the previous choice.

## Debugging tasks

### Missing undo

```python
chosen.append(value)
search()
# chosen.pop() is missing
```

Describe the first point at which the state invariant fails.

### Invalid pruning

```python
if current_sum > target:
    return False
```

Construct a counterexample when negative values are allowed.

### False optimality claim

A program uses first-fit decreasing bin packing and prints `optimal packing`.

Explain what evidence would be required to justify that wording.

### Shared mutable branches

```python
child = state
child.append(choice)
stack.append(child)
```

Explain why separate pending branches may collapse into the same object.

## Design problems

### Problem 1 — Balanced parentheses

Generate all balanced strings containing `n` pairs of parentheses.

Your design must state:

- state;
- available choices;
- pruning rule;
- goal condition;
- termination measure;
- output complexity.

### Problem 2 — Graph colouring

Assign one of `k` colours to each vertex so that adjacent vertices receive different colours.

Explain how “most constrained vertex first” changes search order and why it does not by itself remove valid solutions.

### Problem 3 — Greedy counterexample

Create a small scheduling or packing instance that disproves a plausible greedy rule. State precisely what the local rule chooses and why its final result is suboptimal.

### Problem 4 — Local improvement

Choose a representation, neighbourhood, evaluation function, acceptance rule, and stopping condition for improving a timetable or route.

State clearly which guarantee the method provides and which guarantee it does not provide.

### Problem 5 — Explicit search stack

Rewrite a recursive depth-first backtracking procedure using an explicit stack. Decide whether each stack entry stores:

- a complete independent state;
- a compact change record;
- or a frame containing the next choice to try.

Compare the memory trade-offs.

## Mastery checklist

You are ready to continue when you can:

- model a construction problem as a search space;
- implement choose–explore–undo correctly;
- justify each pruning rule from explicit assumptions;
- distinguish exact, locally optimal, and heuristic results;
- prove a simple greedy algorithm with an exchange argument;
- describe a systematic neighbourhood search;
- explain how dynamic state affects representation and cost;
- analyse search depth, explored states, and auxiliary memory;
- communicate honestly what an algorithm guarantees.

## Connection to Module 07

This module used lists, sets, dictionaries, and stacks as tools for changing state. Module 07 studies several dynamic structures themselves: linked lists, stacks, queues, priority queues, circular lists, self-organising lists, and skip lists.