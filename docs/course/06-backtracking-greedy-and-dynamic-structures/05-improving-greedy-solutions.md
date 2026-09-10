# Improving Greedy Solutions

## A first solution is not the end of the design process

A greedy construction often gives a fast, feasible solution. Even when it is not guaranteed optimal, it can provide a useful starting point. The next question is how to improve it, how to evaluate its quality, or when to replace it with a method that provides a stronger guarantee.

The syllabus distinguishes **systematic** and **heuristic** approaches. The distinction is not merely about implementation style. It concerns:

- which alternatives are examined;
- whether the examined region is complete under a stated rule;
- what guarantee follows when the method stops;
- whether the final result is exact, locally optimal, bounded, or merely empirically good.

## Four categories that should not be confused

It is useful to distinguish:

1. **exact exhaustive or branch-and-bound search** — systematically covers enough of the search space to prove global optimality;
2. **systematic local improvement** — completely examines a defined neighbourhood but may guarantee only local optimality;
3. **heuristic local search** — explores promising neighbours without necessarily examining them all;
4. **separate exact paradigms**, such as dynamic programming — may solve the same optimisation problem but do not work by “improving greedily” in a generic sense.

The method's guarantee comes from its search coverage and proof, not from its name.

## Solution representation

Before improving anything, define what one candidate solution actually is.

Examples:

- a route is a permutation of locations;
- a timetable is an assignment of events to slots;
- a packing is a mapping from items to bins;
- a schedule is an ordered compatible subset;
- a partition is a collection of disjoint groups.

The representation determines which changes are easy to express and which states are reachable from one another.

## Objective function

An improvement method needs an explicit numerical or ordered evaluation rule.

For minimisation:

\[
f(s) = \text{cost of solution } s.
\]

For maximisation:

\[
f(s) = \text{quality or score of } s.
\]

A vague instruction such as “make the solution better” is not enough. The algorithm must know what comparison means.

## Neighbourhood

A **neighbourhood** `N(s)` is the set of solutions reachable from `s` by one permitted move.

For a route, possible neighbourhoods include:

- swap any two positions;
- reverse any contiguous segment;
- remove one location and insert it elsewhere;
- exchange two edges using a 2-opt move.

Different neighbourhoods create different notions of local optimality.

A solution may be locally optimal under one-swap moves and still have a much better two-swap or segment-reversal neighbour.

## Local optimum versus global optimum

For a minimisation problem, `s` is a local optimum under neighbourhood `N` if

\[
f(s) \le f(t)
\]

for every `t ∈ N(s)`.

A global optimum satisfies the inequality for every feasible solution, not merely immediate neighbours.

Therefore the statement

> no one-swap neighbour is better

is precise and meaningful, but it is not the same as

> no feasible solution is better.

## Systematic improvement

A systematic local improvement method examines every neighbour defined by the current neighbourhood rule before deciding whether improvement exists.

For example, with a complete one-swap neighbourhood of a permutation of length `n`, there are

\[
\binom{n}{2} = O(n^2)
\]

possible swaps.

If every one of them is evaluated, then failure to find an improvement proves local optimality under one-swap moves.

It still does not prove global optimality unless an additional theorem connects this neighbourhood to the global problem.

## First improvement versus best improvement

Two common policies are:

### First improvement

Scan neighbours and accept the first strictly better candidate.

Advantages:

- may perform less work per iteration;
- can move quickly away from a poor starting solution.

Disadvantages:

- result depends strongly on neighbour order;
- may follow a long sequence of small improvements.

### Best improvement

Evaluate the complete neighbourhood and choose the best improving candidate.

Advantages:

- makes the strongest available move in the current neighbourhood;
- provides a clear complete-neighbourhood comparison per iteration.

Disadvantages:

- usually more expensive per iteration;
- still may converge to a poor local optimum.

## Local-search example: route improvement

Suppose a route is represented by a permutation of location identifiers. A segment-reversal move produces a neighbour.

```python
def route_length(route: list[int], distance) -> float:
    return sum(
        distance(route[index], route[index + 1])
        for index in range(len(route) - 1)
    )


def improve_route(route: list[int], distance) -> list[int]:
    best = route.copy()
    best_cost = route_length(best, distance)

    while True:
        improved = False

        for left in range(1, len(best) - 2):
            for right in range(left + 1, len(best) - 1):
                candidate = (
                    best[:left]
                    + list(reversed(best[left:right]))
                    + best[right:]
                )
                candidate_cost = route_length(candidate, distance)

                if candidate_cost < best_cost:
                    best = candidate
                    best_cost = candidate_cost
                    improved = True
                    break

            if improved:
                break

        if not improved:
            return best
```

This is a first-improvement local search using segment reversals.

## Contract for the route improver

**Input:** a valid route and a distance function.

**Output:** a route no worse than the initial route.

**Guaranteed postcondition:** when the procedure stops, no neighbour encountered under the implemented scan before termination provides a strict improvement; because the scan restarts after every accepted move and eventually completes a full scan with no accepted move, the returned route is locally optimal under the implemented segment-reversal neighbourhood.

**Not guaranteed:** global optimality.

This distinction belongs in the algorithm's specification.

## Termination of strict local improvement

Suppose:

- the set of feasible routes is finite;
- every accepted move strictly decreases route cost.

Then the algorithm cannot revisit a previously accepted state with the same or larger cost. Because only finitely many routes exist, an infinite sequence of strict improvements is impossible.

This is a termination proof based on a finite descending chain of states.

If equal-cost or worsening moves are permitted, another progress mechanism is needed.

## Cost of neighbourhood search

If a route has `n` positions, there are `O(n²)` segment-reversal candidates.

If route cost is recomputed from scratch in `O(n)` time for every candidate, one full neighbourhood scan costs `O(n³)`.

A more sophisticated implementation can evaluate the effect of a 2-opt-style reversal using only the changed boundary edges, reducing candidate evaluation substantially.

This is a useful algorithm-design lesson:

> the cost of local search depends both on neighbourhood size and on the cost of evaluating one move.

## Systematic exact improvement: branch and bound

A greedy solution can also help an exact method.

Suppose a minimisation problem has a greedy feasible solution of cost `G`. This becomes the initial **incumbent**.

During branch and bound, if a partial state's optimistic lower bound is already at least `G`, that branch cannot produce a better solution and may be pruned.

Whenever a better complete solution is found, the incumbent decreases and pruning may become stronger.

The global-optimality guarantee comes from:

- complete coverage of every branch not safely pruned;
- correctness of the bound;
- proof that no pruned branch can beat the incumbent.

The greedy solution improves efficiency but does not create the exact guarantee.

## Dynamic programming is a separate paradigm

Some optimisation problems have overlapping subproblems and optimal substructure that support dynamic programming.

Dynamic programming should not be described as “greedy plus corrections”. It defines:

- a state space;
- a recurrence;
- base cases;
- an evaluation order or memoisation rule;
- a correctness argument connecting subproblem optima to the global optimum.

A greedy solution may still provide a comparison baseline or bound, but the exact result comes from the recurrence.

## Heuristic improvement

A heuristic method may deliberately avoid complete neighbourhood examination.

Examples include:

- examine only the most promising candidate moves;
- sample random neighbours;
- stop after a fixed iteration budget;
- restart from several initial solutions;
- accept occasional worsening moves;
- use tabu information to prevent short cycles;
- vary the neighbourhood over time.

Such choices may improve practical performance on large instances, but the guarantee must be stated honestly.

## Escaping local optima

Strict hill climbing stops at a local optimum. Heuristics can attempt to escape it.

### Random restart

Run the improvement method from several different starting solutions and retain the best result.

This reduces dependence on one initial state but still does not prove global optimality unless all relevant states are systematically covered.

### Occasional worsening moves

A method may accept a worse state according to a rule designed to cross a local barrier.

Once worsening moves are allowed, strict cost decrease no longer proves termination. A finite iteration budget or another explicit stopping condition becomes necessary.

### Larger neighbourhood

A solution that is locally optimal under swaps may not be locally optimal under segment reversals. Expanding the neighbourhood can escape some local optima at the cost of more candidate evaluations.

## Heuristic evaluation

A heuristic should be evaluated experimentally and precisely.

Useful measures include:

- best solution quality found;
- average solution quality over repeated runs;
- gap from a known optimum on small instances;
- gap from a proven lower or upper bound;
- running time;
- memory use;
- sensitivity to starting state;
- sensitivity to move ordering;
- consistency across problem families.

Avoid unsupported claims such as “near optimal” unless a quantitative benchmark defines what “near” means.

## Guarantee ladder

It is useful to classify conclusions from strongest to weakest:

```text
globally optimal with proof
        ↓
within a proven approximation bound
        ↓
locally optimal under a stated neighbourhood
        ↓
feasible and empirically good on tested instances
        ↓
feasible only
```

A high-quality algorithm description should make clear where its result lies on this ladder.

## Common mistakes

- calling every iterative improvement procedure “greedy”;
- claiming global optimality from a complete local-neighbourhood scan;
- failing to define the neighbourhood;
- recomputing an expensive objective unnecessarily for every move;
- allowing equal/worse moves without a termination policy;
- calling dynamic programming a generic greedy repair step;
- using a greedy incumbent in branch and bound and attributing exactness to the greedy method;
- evaluating a heuristic only on instances where its optimum is unknown;
- reporting the best observed result without reporting variability or baseline comparisons.

## What you must be able to explain

- What is the difference between a solution representation and its neighbourhood?
- What makes an improvement method systematic?
- Why does complete neighbourhood search prove only neighbourhood-relative local optimality?
- How do first improvement and best improvement differ?
- Why can strict improvement imply termination on a finite state space?
- How do neighbourhood size and move-evaluation cost combine?
- How can a greedy solution help branch and bound?
- Why is dynamic programming a separate exact paradigm?
- What changes in the termination argument when worsening moves are allowed?
- How should heuristic solution quality be evaluated honestly?
- What exact guarantee does the algorithm provide when it stops?
