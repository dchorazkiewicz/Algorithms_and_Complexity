# Improving Greedy Solutions

## A first solution is not the end of the design process

A greedy construction often gives a fast, feasible solution. Even when it is not guaranteed optimal, it can be a useful starting point. The next question is how to improve it.

The syllabus distinguishes **systematic** and **heuristic** methods. The difference is not that one is intelligent and the other careless. The difference is in the guarantee and the way alternatives are examined.

## Systematic improvement

A systematic method explores changes according to a complete rule. Given enough time, it examines every candidate in a defined neighbourhood or every relevant branch of a search space.

Examples include:

- testing every single swap in a current ordering;
- branch and bound;
- exhaustive search around an initial solution;
- dynamic programming when overlapping subproblems can be identified.

A systematic procedure supports a precise statement such as:

```text
No one-swap neighbour is better than the current solution.
```

That is a local guarantee, not necessarily global optimality.

## Heuristic improvement

A heuristic uses practical guidance to find promising changes quickly. It may stop before all alternatives are checked and usually does not prove optimality.

Common heuristic choices include:

- examine the most promising candidates first;
- accept only improvements;
- allow occasional worsening moves to escape a local optimum;
- restart from several initial solutions;
- limit the number of iterations or elapsed time.

## Local search example

Suppose a route is represented by an ordering of points. A simple improvement step reverses one segment when that shortens the route.

```python
def improve_route(route: list[int], distance) -> list[int]:
    best = route.copy()
    improved = True

    while improved:
        improved = False

        for left in range(1, len(best) - 2):
            for right in range(left + 1, len(best) - 1):
                candidate = best[:left] + list(reversed(best[left:right])) + best[right:]

                if route_length(candidate, distance) < route_length(best, distance):
                    best = candidate
                    improved = True
                    break

            if improved:
                break

    return best
```

The method is systematic within the chosen neighbourhood because it scans possible segment reversals. It is still heuristic as a global solver because a route with no improving reversal may be far from globally optimal.

## Local optima

A **local optimum** is no worse than its neighbours under a chosen move rule. Change the neighbourhood and the meaning of local optimum changes.

This is why an improvement algorithm must state:

- the representation of a solution;
- the neighbourhood relation;
- the evaluation function;
- the acceptance rule;
- the stopping condition.

## Measuring progress

An improvement loop needs a progress argument. Common measures include:

- strictly decreasing cost;
- strictly increasing score;
- a bounded iteration counter;
- a finite set of states combined with a rule that prevents revisiting.

Without such a condition, the procedure may oscillate.

## Evaluating a heuristic honestly

A heuristic should be assessed by:

- solution quality;
- running time;
- memory use;
- sensitivity to the starting solution;
- consistency across test instances;
- comparison with known optimal answers on small inputs.

The result should not be described as optimal unless a proof or exhaustive verification supports that claim.

## What you must be able to explain

- What makes an improvement method systematic?
- What guarantee does local optimality provide?
- How does the neighbourhood determine the search?
- Why can strict improvement imply termination?
- How should heuristic quality be evaluated?