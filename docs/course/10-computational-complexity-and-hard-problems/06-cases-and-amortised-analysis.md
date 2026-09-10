# Best, Worst, Average, Expected, and Amortised Analysis

## One algorithm can have several cost functions

The number of operations executed by an algorithm can depend on more than input size. Two inputs with the same number of elements may trigger different paths, different recursion shapes, or different numbers of successful comparisons.

Complexity analysis must therefore state **which cost function** is being analysed.

The most important distinctions in this course are:

- best case;
- worst case;
- average case;
- expected cost;
- amortised cost.

They answer different questions and should not be used interchangeably.

## Best-case analysis

The best-case cost for size `n` is the minimum cost over all valid inputs of that size.

For linear search:

```python
def contains(values, target):
    for value in values:
        if value == target:
            return True
    return False
```

If the target is the first element, only one comparison is needed.

Therefore

\[
T_{best}(n) \in \Theta(1).
\]

Best-case analysis describes favourable inputs. It is usually not a safe guarantee for arbitrary use.

## Worst-case analysis

The worst-case cost for size `n` is the maximum cost over all valid inputs of that size.

For linear search, the worst case occurs when the target is absent or appears only at the final position.

Then `n` comparisons are required:

\[
T_{worst}(n) \in \Theta(n).
\]

Worst-case bounds are valuable because they do not require a probability model.

## The case function is separate from asymptotic notation

It is useful to write conceptually:

\[
T_{best}(n),\quad T_{worst}(n),\quad T_{avg}(n).
\]

Only after defining one of these functions do we describe it with `O`, `Ω`, or `Θ`.

For example:

```text
T_best(n)  ∈ Θ(1)
T_worst(n) ∈ Θ(n)
```

Big O itself does not mean worst case.

## Average-case analysis requires a probability model

An average is meaningless until we specify how inputs are distributed.

For successful linear search, suppose:

- the target is guaranteed to be present;
- every position `1, 2, ..., n` is equally likely to contain the searched occurrence.

The expected comparison count is

\[
\frac{1+2+\cdots+n}{n}
= \frac{n(n+1)/2}{n}
= \frac{n+1}{2}.
\]

Therefore

\[
T_{avg}(n) \in \Theta(n).
\]

Change the probability distribution and the expected count may change.

## Presence probability changes the model

Suppose the target is present with probability `p`, and conditioned on presence every position is equally likely. If absent, the algorithm scans all `n` elements.

The expected comparison count is

\[
p\frac{n+1}{2} + (1-p)n.
\]

For any fixed `0 < p ≤ 1`, this is still `Θ(n)`, but the constant depends on `p`.

This demonstrates why saying “average linear search takes `n/2` comparisons” is incomplete unless the model is stated.

## Expected complexity can come from algorithmic randomness

Expectation need not come from random inputs. It may come from random choices made by the algorithm.

Randomised Quicksort chooses pivots randomly. For every fixed input, the running time becomes a random variable determined by pivot choices.

Its expected running time is

\[
\Theta(n\log n),
\]

while an individual unlucky execution can still take

\[
\Theta(n^2).
\]

Thus:

```text
expected cost ≠ worst-case cost
```

and

```text
randomised expectation ≠ average-case input distribution
```

although both use probability.

## Amortised analysis asks a different question

Amortised analysis studies a **sequence of operations** and proves that expensive operations cannot happen too frequently.

It does not require random inputs or random choices.

A statement such as

```text
append has Θ(1) amortised cost
```

means that the total cost of a sufficiently long sequence of appends is linear in the number of appends, even though an individual append may occasionally be expensive.

## Dynamic-array append — aggregate proof

Suppose capacity doubles when the array becomes full.

Most appends write one new element and cost `Θ(1)`.

Occasional resize operations copy all current elements into a larger storage block.

If capacities grow approximately as

```text
1, 2, 4, 8, 16, ...
```

then across `n` appends the total number of copied old elements is bounded by

\[
1 + 2 + 4 + \cdots < 2n.
\]

The `n` ordinary writes contribute another `Θ(n)` work.

Therefore the total cost of `n` appends is

\[
\Theta(n),
\]

so the amortised cost per append is

\[
\Theta(1).
\]

This is a deterministic aggregate guarantee over the sequence.

## Worst-case and amortised cost can coexist

For dynamic-array append:

```text
one non-resizing append: Θ(1)
one resizing append:     Θ(n)
amortised append:        Θ(1)
```

These statements do not conflict because they describe different cost notions.

## Why geometric growth matters

Suppose capacity increased by exactly `1` whenever full.

Then append number `k` might copy approximately `k-1` existing elements. Across `n` appends, the copying cost would be

\[
1 + 2 + \cdots + (n-1)
= \Theta(n^2).
\]

The amortised cost would then be `Θ(n)`, not `Θ(1)`.

Geometric capacity growth is what keeps total copying linear.

## Multipop stack — a second amortised example

Consider a stack supporting:

```text
push(x)
pop()
multipop(k) — remove up to k elements
```

One `multipop(k)` may remove many elements and therefore cost `Θ(k)` in the worst case.

Now analyse any sequence of `m` operations starting from an empty stack.

Every element that is popped must previously have been pushed. Once popped, that particular element cannot be popped again unless it is pushed again as a new stack entry.

Therefore across the whole sequence:

- at most `m` pushes occur;
- at most `m` successful pops occur.

The total stack-element work is `O(m)`, so the amortised cost per operation is `O(1)`.

This result does not depend on a probability distribution.

## Aggregate method

The **aggregate method** proves amortised bounds by directly bounding total cost over a sequence.

For dynamic-array append:

```text
total writes + total copies = O(n)
```

For multipop stacks:

```text
each pushed element can be popped at most once before a new push
```

These are complete amortised arguments at the level required by this course.

## Accounting-method intuition

The accounting method imagines charging some cheap operations more than their immediate actual cost and storing the difference as credit.

For geometric array growth, one can imagine each cheap append paying a small extra constant amount that funds future copying.

The exact credit scheme is less important here than the principle:

> amortised cost redistributes deterministic costs across a sequence without using probability.

## Potential-method intuition

The potential method associates a non-negative potential with the data-structure state. Cheap operations may increase stored potential; expensive operations may consume it.

For this course, you should recognise the method and its purpose. Full potential-function proofs are not required unless explicitly assigned.

## Expected versus amortised — direct comparison

| Concept | What is averaged? | Probability required? | Typical example |
|---|---|---:|---|
| average case | cost over input distribution | yes | linear search under position model |
| randomised expected time | cost over random choices | yes | randomised Quicksort |
| amortised cost | total deterministic sequence cost | no | dynamic-array append |

This table captures one of the most important distinctions in the module.

## Best and worst cases in Quicksort

Quicksort also illustrates case analysis.

If pivots repeatedly split the array nearly in half:

\[
T(n) = 2T(n/2) + \Theta(n)
= \Theta(n\log n).
\]

If pivots repeatedly create subproblems of sizes `0` and `n-1`:

\[
T(n) = T(n-1) + \Theta(n)
= \Theta(n^2).
\]

The partition routine is the same. Input arrangement or pivot selection changes the recursion shape.

## Expected hash-table operations

Hash tables are another place where terminology matters.

A statement such as

```text
membership is expected O(1)
```

requires assumptions about hashing and load behaviour. It should not silently be converted into an unconditional worst-case constant bound.

Representation guarantees must match the complexity adjective used.

## Amortised does not mean “usually fast”

This phrase is too vague:

> append is usually constant time.

A stronger statement is:

> under geometric capacity growth, any sequence of `n` appends performs `Θ(n)` total copying-and-write work, so append has `Θ(1)` amortised cost.

The second statement is a proof-backed guarantee over every operation sequence of that form, not an empirical observation.

## Case-analysis template

When an algorithm's cost varies among inputs, state:

```text
Input size:
Best-case condition and cost:
Worst-case condition and cost:
Probability model, if average case is used:
Random choices, if expected time is used:
Operation sequence, if amortised analysis is used:
Resulting asymptotic bounds:
```

## Common mistakes

### Mistake 1 — “Big O means worst case”

The case function and asymptotic notation are separate concepts.

### Mistake 2 — “average case” without a distribution

There is no mathematically defined average until probabilities are specified.

### Mistake 3 — expected equals average-case input analysis

Expectation may arise from the algorithm's own random choices.

### Mistake 4 — amortised equals expected

Amortised analysis uses deterministic sequence accounting, not probability.

### Mistake 5 — one expensive append disproves `O(1)` amortised append

Amortised bounds concern total cost over a sequence, not the maximum cost of one operation.

### Mistake 6 — geometric and additive growth have the same amortised behaviour

Growing capacity by one can produce quadratic total copying; doubling produces linear total copying.

### Mistake 7 — reporting only asymptotic class without the case

`Θ(n)` may describe worst, average, or another cost function. State which one.

## What you must be able to explain

- What set of inputs defines best and worst case?
- Why does average-case analysis require a probability distribution?
- How can expected running time come from random choices made by an algorithm?
- Why is randomised expected time different from average-case input analysis?
- Why is amortised analysis not probabilistic?
- How does the geometric-series proof establish constant amortised append?
- Why would capacity growth by one destroy that amortised bound?
- Why can one append be `Θ(n)` worst-case while append remains `Θ(1)` amortised?
- Why does a sequence of pushes and multipops have linear total element-removal work?
- What are the aggregate, accounting, and potential perspectives trying to prove?
