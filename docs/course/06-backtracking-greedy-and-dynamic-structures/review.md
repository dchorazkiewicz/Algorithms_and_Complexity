# Module 06 Review

This review checks whether you can model, justify, analyse, and compare the methods of Module 06 without relying on memorised code.

## Core vocabulary

Explain each term precisely and give a small example where appropriate:

- search space;
- state;
- execution history;
- partial solution;
- choice;
- transition;
- goal state;
- dead end;
- conceptual search tree;
- branching factor;
- search depth;
- candidate-space size;
- explored-state count;
- output size;
- exhaustive search;
- backtracking;
- choose–explore–undo;
- invariant;
- pruning;
- feasibility pruning;
- constraint propagation;
- forward checking;
- optimistic bound;
- incumbent;
- choice-ordering heuristic;
- greedy rule;
- exchange argument;
- greedy-choice property;
- optimal substructure;
- neighbourhood;
- local optimum;
- global optimum;
- first improvement;
- best improvement;
- heuristic;
- dynamic data structure;
- logical size;
- capacity;
- aliasing;
- contiguous representation;
- linked representation;
- amortised cost.

## Conceptual questions

1. Why is a search tree usually a conceptual model rather than a tree that must be stored explicitly?
2. What is the difference between state and complete execution history?
3. Why are candidate-space size, explored-state count, and output size different quantities?
4. Why can backtracking remain exponential even when pruning is effective?
5. What exactly must be restored after a mutable backtracking branch returns?
6. Why can incomplete undo destroy completeness without producing obviously invalid outputs?
7. Why are soundness and completeness separate proof obligations?
8. What must be proved before a branch may be pruned safely?
9. Why can `current_sum > target` be valid pruning for non-negative subset sum but invalid when negative numbers are allowed?
10. How does constraint propagation differ from pruning?
11. How can propagation reduce cost per explored state without reducing the search tree itself?
12. Why is choice ordering not pruning?
13. What makes an optimisation bound safe?
14. Why must a maximisation bound used for pruning be optimistic?
15. Why does a successful greedy example not prove a greedy rule?
16. What exactly does an exchange argument establish?
17. Why is feasibility of every greedy choice insufficient to prove optimality?
18. What is the difference between a local optimum and a global optimum?
19. How does the chosen neighbourhood determine the meaning of local optimality?
20. Why can complete one-swap search still fail to prove global optimality?
21. Why can strict improvement prove termination on a finite state space?
22. What additional termination mechanism is needed if worsening moves may be accepted?
23. Why is dynamic programming not simply a generic way to improve a greedy solution?
24. How can a greedy solution accelerate branch and bound without being responsible for exactness?
25. Why can one dynamic-array append cost `O(n)` while amortised append costs `O(1)`?
26. Why is amortised analysis different from probabilistic average-case analysis?
27. Why does geometric capacity growth matter?
28. Why is linked-list insertion not automatically `O(1)` if the insertion point must first be searched for?
29. Why is aliasing particularly dangerous in branching search?
30. Which guarantee should be stated for a heuristic when no optimality proof is known?

## Trace exercise 1 — Permutations

Trace the permutation algorithm for:

```text
[1, 2, 3]
```

At every recursive call record:

- `current`;
- `used`;
- the next index considered;
- the mutation performed by choose;
- the state immediately after the recursive return;
- the state immediately after undo.

Then answer:

1. Which invariant connects `current` and `used`?
2. Why does recursion depth never exceed `3`?
3. At what exact moment is a copy required?
4. What happens if one `used[index] = False` operation is omitted?

## Trace exercise 2 — N-Queens

Trace the beginning of the search for `n = 4`.

For each accepted queen record:

```text
row
column
placement
columns
diag_down
diag_up
```

Continue until the first dead end, then show every state change during undo before the next sibling choice is attempted.

Explain why all four state components must again satisfy the entry invariant.

## Trace exercise 3 — Constraint-aware binary strings

Draw the complete generated prefix tree for binary strings of length `4` without consecutive ones.

Mark:

- valid complete outputs;
- prefixes that are never generated;
- maximum depth;
- branching factors at different states.

Compare this with the complete binary tree that would be generated before filtering.

## Debugging tasks

### Missing undo

```python
chosen.append(value)
used.add(value)
search()
chosen.pop()
# used.remove(value) is missing
```

Describe:

1. which invariant fails;
2. why sibling branches are affected;
3. whether soundness or completeness is most immediately endangered.

### Shared mutable branches

```python
child = state
child.append(choice)
stack.append(child)
```

Explain why multiple pending states may refer to one object. Give two safe alternatives:

- independent copy;
- disciplined mutable choose–undo representation.

### Invalid pruning

```python
if current_sum > target:
    return False
```

Construct a counterexample when negative values are allowed. State the missing assumption that would make the rule safe.

### Invalid optimisation bound

A maximisation search computes an estimate that sometimes **underestimates** the best value achievable from a branch and prunes whenever the estimate is no better than the incumbent.

Explain why this can remove an optimal branch.

### Search-order confusion

A graph-colouring solver chooses the most constrained uncoloured vertex first. A report claims:

> This pruning rule removes invalid colourings.

Correct the statement. What additional condition would actually prune a branch?

### False greedy proof

A scheduling program always selects the activity with the earliest start time. The author tests ten instances successfully and concludes the rule is optimal.

Explain why the evidence is insufficient and construct or search for the kind of counterexample that would refute the claim.

### False local-optimality claim

A route optimiser checks every adjacent swap and stops. The report states:

> The route is globally optimal.

Replace this with the strongest justified statement.

### Amortised-analysis mistake

A dynamic array occasionally copies all `n` current elements during append. A report concludes:

> Therefore `n` appends cost `O(n²)`.

Explain why this does not follow under geometric capacity growth.

## Proof exercise 1 — Soundness and completeness

For the binary-string generator that forbids consecutive ones, prove separately:

1. every produced string is valid;
2. every valid string is produced.

Do not combine the two arguments into “the algorithm clearly works”.

## Proof exercise 2 — Greedy interval scheduling

Write a complete exchange argument for earliest-finish-time interval selection.

Your proof must identify:

1. an arbitrary optimal solution;
2. its first activity;
3. the greedy first activity;
4. the replacement operation;
5. why later activities remain compatible;
6. why cardinality is unchanged;
7. what subproblem remains.

Then explain why the proof would need to be reconsidered if the objective changed from maximum **number** of activities to maximum **total value**.

## Proof exercise 3 — Dynamic-array amortised append

Assume capacities:

```text
1, 2, 4, 8, ...
```

Prove that across `n` appends the total number of copied elements caused by resizing is `O(n)`.

Then repeat the reasoning when capacity increases by exactly one each time and compare the results.

## Design problem 1 — Balanced parentheses

Generate all balanced strings containing `n` pairs of parentheses.

Your design must state:

- complete state;
- partial solution;
- legal choices;
- pruning conditions;
- goal condition;
- invariant;
- termination measure;
- soundness argument;
- completeness argument;
- output-sensitive complexity.

## Design problem 2 — Graph colouring

Assign one of `k` colours to each vertex so that adjacent vertices receive different colours.

Design a backtracking solver and explain:

- state representation;
- candidate colours;
- feasibility test;
- what is undone;
- how “most constrained vertex first” changes search order;
- why an empty colour domain permits safe pruning;
- how an invalid pruning rule could destroy completeness.

## Design problem 3 — Subset sum with mixed signs

The input may contain positive and negative integers.

Explain why the simple rule

```text
current_sum > target → prune
```

is invalid.

Design a safer bounding idea based on the minimum and maximum sum that could still be formed from remaining values.

You do not need to implement the complete optimiser, but the bound must be justified.

## Design problem 4 — Greedy counterexample

Create a small optimisation instance that disproves a plausible greedy rule.

State precisely:

- the problem;
- the local rule;
- the greedy result;
- a better feasible result;
- which future opportunity the local rule destroyed.

## Design problem 5 — Local improvement

Choose a route, timetable, packing, or ordering problem.

Define:

- solution representation;
- objective function;
- neighbourhood;
- first- or best-improvement policy;
- acceptance rule;
- stopping condition;
- local-optimality guarantee;
- why global optimality does or does not follow;
- cost of one complete neighbourhood scan.

## Design problem 6 — Exact search with a greedy incumbent

Describe how a greedy solution can initialise branch and bound for a minimisation problem.

Your design must distinguish:

- feasible greedy incumbent;
- optimistic lower bound for partial branches;
- pruning condition;
- update of the incumbent;
- source of the final exactness guarantee.

## Design problem 7 — Explicit search stack

Rewrite a recursive depth-first backtracking procedure using an explicit stack.

Decide whether each stack entry stores:

- a complete independent state;
- a compact change record;
- or a frame containing the next choice to try.

Compare:

- implementation complexity;
- copying cost;
- peak memory;
- aliasing risk;
- ease of restoring state.

## Design problem 8 — Dynamic frontier

Consider a search algorithm whose pending-state frontier changes unpredictably.

Compare using:

- a dynamic array as a stack;
- a linked stack;
- a queue;
- a priority queue.

For each choice, explain which exploration order it produces and which operations dominate its cost.

## Guarantee classification

For each statement below classify it as:

- global exact guarantee;
- proven bound;
- local guarantee;
- empirical heuristic claim;
- feasibility only;
- unjustified claim.

Statements:

1. “No one-swap neighbour has lower cost.”
2. “The returned interval set has maximum cardinality by the exchange proof.”
3. “The packing used the theoretical lower bound number of bins on this instance.”
4. “This route was the best of 100 random restarts.”
5. “Every returned colouring satisfies all edge constraints.”
6. “The algorithm is probably optimal because it worked well on our tests.”

Explain each classification.

## Mastery checklist

You are ready to continue when you can:

- [ ] model a construction problem as a search space;
- [ ] distinguish state from irrelevant execution history;
- [ ] identify branching factor, depth, explored states, and output size;
- [ ] implement choose–explore–undo correctly;
- [ ] state an invariant for mutable backtracking state;
- [ ] prove branch termination;
- [ ] prove soundness and completeness separately;
- [ ] justify pruning from explicit assumptions;
- [ ] distinguish pruning, propagation, bounds, and ordering heuristics;
- [ ] explain forward checking;
- [ ] formulate a greedy rule precisely;
- [ ] prove interval scheduling with an exchange argument;
- [ ] create a counterexample to an unjustified greedy rule;
- [ ] define a solution neighbourhood and objective function;
- [ ] distinguish local and global optimality;
- [ ] distinguish first improvement from best improvement;
- [ ] explain how a greedy incumbent helps branch and bound;
- [ ] explain why a heuristic must state a weaker guarantee honestly;
- [ ] separate abstract dynamic structure from concrete representation;
- [ ] compare contiguous and linked growth;
- [ ] explain aliasing risks in branching state;
- [ ] derive amortised `O(1)` append for geometric dynamic-array growth;
- [ ] distinguish amortised from average-case analysis;
- [ ] analyse search depth, explored states, output cost, and auxiliary memory separately.

## Connection to Module 07

Module 06 used dynamic collections as working state and introduced the distinction between abstract behaviour, representation, invariants, and operation cost.

Module 07 now studies several of those structures as primary objects:

- singly and doubly linked lists;
- circular lists;
- stacks;
- queues;
- priority queues;
- self-organising lists;
- skip lists.

Carry one question forward:

> Which invariant makes the structure correct, and why does its representation imply the advertised operation cost?
