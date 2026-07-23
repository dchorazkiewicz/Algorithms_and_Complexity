# Best, Worst, Average, and Amortised Analysis

## One algorithm may have several cost functions

The number of executed operations can depend not only on input size but also on the arrangement of the input.

## Best-case analysis

The best case is the minimum cost among inputs of size `n`.

For linear search, the target may appear first:

\[
T_{best}(n) \in \Theta(1).
\]

Best-case analysis describes favourable inputs. It does not usually provide a safe performance guarantee.

## Worst-case analysis

The worst case is the maximum cost among inputs of size `n`.

For linear search, the target may be absent or last:

\[
T_{worst}(n) \in \Theta(n).
\]

Worst-case bounds are useful because they require no probability distribution over inputs.

## Average-case analysis

Average-case analysis requires an explicit probability model.

For successful linear search, if every target position is equally likely, the expected number of comparisons is:

\[
\frac{1 + 2 + \cdots + n}{n} = \frac{n+1}{2} \in \Theta(n).
\]

Without a distribution, “average case” is undefined.

## Expected complexity

Expected analysis may also average over the algorithm's own random choices. Randomised Quicksort, for example, can have expected `Θ(n log n)` running time even though particular executions may be quadratic.

Expected cost and average-case input analysis are related but not identical concepts.

## Amortised analysis

Amortised analysis considers a sequence of operations and proves that expensive operations occur rarely enough for the average cost per operation to remain small.

It does not assume random inputs.

### Dynamic-array append

Most appends place an item into existing capacity and cost `Θ(1)`. Occasionally the array grows and copies many elements.

If capacity doubles, the total number of copied elements across `n` appends is bounded by a geometric sum:

```text
1 + 2 + 4 + ... < 2n
```

Therefore `n` appends cost `Θ(n)` in total, giving `Θ(1)` amortised cost per append.

## Aggregate, accounting, and potential methods

Three standard proof perspectives are:

- **aggregate method** — bound the total cost of a sequence directly;
- **accounting method** — charge cheap operations extra credit to pay for later expensive work;
- **potential method** — measure stored work in the current state.

The module uses the aggregate viewpoint, but the distinction is worth recognising.

## Do not confuse the terms

- average case: expectation over a distribution of inputs;
- expected time: expectation may come from input or random choices;
- amortised time: deterministic guarantee over an operation sequence;
- worst case per operation: maximum cost of one operation.

A dynamic-array append is `Θ(n)` in the worst case for one append but `Θ(1)` amortised over a sequence.

## What you must be able to explain

- What set of inputs defines best and worst case?
- Why does average-case analysis require a distribution?
- How can expected complexity come from randomised choices?
- Why is amortised analysis not probabilistic?
- Why does geometric capacity growth produce constant amortised append?
- How can one operation have linear worst-case cost and constant amortised cost?