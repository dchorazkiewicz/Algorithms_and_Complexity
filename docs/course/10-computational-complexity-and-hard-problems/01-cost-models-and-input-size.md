# Cost Models and Input Size

## Complexity begins with a model

Running time in seconds depends on hardware, language, compiler, operating system, and input representation. Algorithm analysis therefore uses a simplified **cost model**.

A cost model specifies which elementary operations are treated as constant-time steps. Typical examples include arithmetic on bounded-size integers, comparisons, assignments, array access, and reference updates.

The model is an abstraction. It is useful only when its assumptions are stated.

## Define the input size

The symbol `n` has no automatic meaning. It must be attached to a measurable property of the input.

Examples:

- for searching an array, `n` may be the number of elements;
- for a graph, input size may involve both `V` and `E`;
- for an integer, input size is usually the number of bits, not the numeric value;
- for a matrix, dimensions may be `r × c`;
- for an output-generating algorithm, output size may itself dominate the cost.

A statement such as “the algorithm is `O(n)`” is incomplete until `n` is defined.

## Time, space, and output cost

Three resources are commonly separated:

- **time complexity** — number of elementary steps;
- **auxiliary-space complexity** — additional memory excluding the input and usually the output;
- **output complexity** — unavoidable work needed to produce the result.

Generating all permutations of `n` values requires at least proportional work to the `n!` outputs. No implementation trick can make explicit enumeration polynomial in `n`.

## Dominant operations

Choose an operation that reflects the main work.

```python
def contains(values: list[int], target: int) -> bool:
    for value in values:
        if value == target:
            return True
    return False
```

A natural operation is the comparison `value == target`. In the worst case it is executed `n` times.

The loop overhead and return statements matter in a precise machine model, but asymptotically they grow at the same or lower rate.

## Representation changes complexity

Consider membership testing:

```python
target in values_list
```

versus:

```python
target in values_set
```

The same abstract question can have different expected costs because the representations support different operations.

Complexity belongs to an algorithm together with its representation assumptions, not to a problem statement in isolation.

## Unit-cost limitations

Treating integer arithmetic as constant time is reasonable only while integers fit a fixed machine word. For arbitrarily large integers, addition, multiplication, and comparison depend on the number of bits.

This matters when analysing algorithms whose values grow rapidly.

## What you must be able to explain

- What exactly does `n` measure?
- Which operation is counted?
- What memory is considered auxiliary?
- Does output size impose a lower bound?
- Which representation assumptions support the claimed operation costs?
- When is a unit-cost arithmetic assumption misleading?