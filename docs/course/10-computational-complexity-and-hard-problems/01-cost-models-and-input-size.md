# Cost Models and Input Size

## Complexity begins before counting

An algorithm does not have a meaningful complexity statement until we decide two things:

1. **how the input size is measured**;
2. **which elementary operations the cost model treats as one step**.

Running time in seconds depends on hardware, language, compiler, libraries, cache behaviour, operating system, and many other implementation details. Algorithm analysis deliberately abstracts away from most of those details so that we can reason about growth independently of one machine.

The abstraction is useful only when its assumptions are stated.

## What a cost model does

A **cost model** assigns costs to primitive operations. In a simple RAM-style model we may treat the following as constant-time operations when their operands fit in a machine word:

- integer addition and subtraction;
- comparison;
- assignment;
- Boolean operations;
- array indexing;
- following a reference or pointer;
- reading or updating one fixed-size field.

Under that model, the cost of an algorithm can be estimated by counting how many such operations are executed.

This is not a claim that every machine instruction takes exactly the same number of nanoseconds. It is a mathematical model designed to capture growth.

## The model must match the data

Suppose an algorithm repeatedly multiplies integers whose number of digits grows with the input. Treating every multiplication as one constant-time step may hide substantial work.

Similarly:

- comparing two fixed-width machine integers can reasonably be treated as `Θ(1)`;
- comparing two strings of length `m` may require `Θ(m)` character work;
- copying a list of `n` elements is not `Θ(1)` merely because it is written as one source-language expression;
- dictionary membership may be expected `Θ(1)` under hashing assumptions but not unconditional worst-case `Θ(1)`.

A source-code statement is not automatically an elementary operation.

## Define the input size explicitly

The symbol `n` has no universal meaning. It must refer to a measurable property of the input.

Examples:

| Problem | Natural input-size variables |
|---|---|
| search an array | number of elements `n` |
| multiply matrices | dimensions such as `r × k` and `k × c` |
| graph traversal | vertices `V` and edges `E` |
| process a string | number of symbols `n` or encoded bytes |
| integer arithmetic | number of bits or digits |
| generate all subsets | number of input elements `n`, plus output size |
| process many records | number of records and possibly total field size |

A statement such as “the algorithm is `O(n)`” is incomplete until `n` is defined.

## Numeric value is not the same as input length

This distinction is especially important for algorithms whose input contains integers.

Suppose an integer `N` is written in binary. Its representation requires roughly

\[
\lfloor \log_2 N \rfloor + 1
\]

bits.

An algorithm that performs `N` iterations therefore takes time exponential in the bit length of `N`, not linear in the encoded input length.

### Example

```python
def countdown(N: int) -> None:
    while N > 0:
        N -= 1
```

If we measure size by the **numeric value** `N`, the loop is `Θ(N)`.

If the input size is the number of bits

\[
b = \Theta(\log N),
\]

then

\[
N = \Theta(2^b),
\]

so the same algorithm is exponential in the encoded input length.

This distinction becomes central when we later discuss pseudopolynomial algorithms.

## Multidimensional input size

Not every problem should be forced into one variable.

A graph with `V` vertices and `E` edges is naturally described by two parameters. With adjacency lists, DFS takes

\[
\Theta(V + E).
\]

Writing only `O(n)` is possible if `n` is explicitly defined as the total encoded graph size, but it may hide structure that is useful for reasoning.

Similarly, for a matrix algorithm it may be more informative to retain dimensions `r` and `c` rather than assume a square `n × n` matrix.

## Dominant operations

Once the input size is defined, choose an operation that reflects the main work.

```python
def contains(values: list[int], target: int) -> bool:
    for value in values:
        if value == target:
            return True
    return False
```

For fixed-width integers, a natural dominant operation is the comparison

```text
value == target
```

If the target is absent, the comparison is executed `n` times.

This gives a worst-case comparison count of exactly `n`, and therefore worst-case time `Θ(n)` under the stated model.

## Exact counts and asymptotic counts

For teaching purposes, an exact count often clarifies where the asymptotic result comes from.

Consider:

```python
def maximum(values: list[int]) -> int:
    best = values[0]
    for index in range(1, len(values)):
        if values[index] > best:
            best = values[index]
    return best
```

For `n ≥ 1`:

- the comparison `values[index] > best` occurs exactly `n - 1` times;
- the assignment to `best` occurs between `0` and `n - 1` times depending on the data;
- loop-control operations also grow linearly.

Thus the running time is `Θ(n)` even though the exact instruction count depends on the input arrangement and machine model.

The objective is not to avoid exact reasoning; it is to simplify only after the growth function is understood.

## Time, auxiliary space, total space, and output cost

Several resources should be kept separate.

### Time complexity

How many elementary operations are performed?

### Auxiliary-space complexity

How much additional working memory is required, excluding the input and usually excluding space occupied by the required output?

### Total-space complexity

How much memory is used including input representation, working memory, and possibly output?

### Output-sensitive complexity

How does the cost depend on both input size and the amount of produced output?

The distinctions matter because an algorithm can be optimal with respect to one resource and expensive with respect to another.

## Output size creates lower bounds

Suppose an algorithm explicitly generates all subsets of an `n`-element set.

There are

\[
2^n
\]

subsets. Merely emitting one representation per subset requires `Ω(2^n)` output actions. If every subset is copied as a list and total copied elements are counted, the total output volume is even larger:

\[
\Theta(n2^n).
\]

No implementation can explicitly materialise all those subsets in polynomial time in `n` because the required output itself is exponential.

This is an **output lower bound**, not evidence that a related decision problem is NP-hard.

## Representation changes operation costs

The same abstract task may have different costs under different representations.

### Membership example

For `n` stored values:

| Representation | Membership cost | Important assumption |
|---|---:|---|
| unsorted array/list | `Θ(n)` worst case | scan elements |
| sorted array | `Θ(log n)` search | ordering maintained |
| balanced BST | `Θ(log n)` worst case | height logarithmic |
| hash set | expected `Θ(1)` | suitable hashing/load assumptions |

Complexity belongs to an algorithm **together with its representation and model assumptions**.

## Hidden costs in high-level operations

A concise language feature may perform substantial work.

```python
copy = values[:]
```

looks like one assignment but copying `n` references costs `Θ(n)`.

Likewise:

```python
text = left + right
```

may allocate and copy characters proportional to the resulting string length.

When analysing high-level code, expand operations whose cost depends on input size.

## Unit-cost arithmetic and large integers

Suppose two integers each contain `b` bits.

At an introductory level:

- reading or comparing fixed-size machine integers may be treated as `Θ(1)`;
- arbitrary-precision addition depends on `b` and is typically at least linear in the number of machine words involved;
- multiplication is more expensive than one unit when operand length grows.

Therefore an algorithm manipulating huge integers may require a **bit-complexity** model rather than a unit-cost arithmetic model.

The correct lesson is not to memorise one multiplication bound. It is to recognise when “one arithmetic operation” is too coarse an abstraction.

## Example: Euclid's algorithm and the danger of the wrong size measure

A naive statement such as “Euclid's algorithm is logarithmic” is incomplete unless we say logarithmic in what.

For integer inputs `a` and `b`, the number of remainder steps is logarithmic in their numeric magnitude under standard analysis. Since the encoded input length is itself logarithmic in the magnitude, this is compatible with efficient behaviour in the number of digits or bits, subject to the cost of arithmetic operations.

This illustrates why numeric algorithms require explicit representation assumptions.

## A complete analysis template

Before writing an asymptotic class, answer:

```text
Problem:
Input representation:
Input-size variable(s):
Cost model:
Dominant operation/resource:
Case or expectation:
Exact count / summation / recurrence:
Asymptotic simplification:
Auxiliary space:
Output-size lower bound, if relevant:
Assumptions that could change the result:
```

### Applied to linear search

```text
Problem: find whether target occurs
Input representation: array of fixed-width integers
Input size: n = number of array elements
Cost model: comparison and indexed access are constant time
Dominant operation: equality comparison
Case: worst case
Count: n comparisons
Time: Θ(n)
Auxiliary space: Θ(1)
Output: one Boolean, so no output-size issue
```

## Common mistakes

### Mistake 1 — leaving `n` undefined

`O(n)` has no precise meaning until `n` is tied to the input.

### Mistake 2 — measuring integer input by value without saying so

An algorithm polynomial in numeric magnitude may be exponential in the number of input bits.

### Mistake 3 — treating every source-language statement as constant time

Slicing, copying, string concatenation, arbitrary-precision arithmetic, and container operations may depend on data size.

### Mistake 4 — ignoring representation assumptions

Hashing, balanced trees, adjacency matrices, and adjacency lists support different operation costs.

### Mistake 5 — counting only time

A recursive algorithm may have good time complexity and still consume substantial stack space.

### Mistake 6 — ignoring output size

An explicit enumeration algorithm cannot asymptotically beat the size of the output it must produce.

## What you must be able to explain

- What exactly does the input-size variable measure?
- Why is the numeric value of an integer different from its encoded length?
- Which operations are constant under the chosen cost model?
- Which high-level expressions hide non-constant work?
- What memory is considered auxiliary?
- When does output size impose an unavoidable lower bound?
- Why can the same abstract operation have different costs under different representations?
- When is unit-cost arithmetic a misleading model?
- Why can a complexity statement be correct under one model and inappropriate under another?
