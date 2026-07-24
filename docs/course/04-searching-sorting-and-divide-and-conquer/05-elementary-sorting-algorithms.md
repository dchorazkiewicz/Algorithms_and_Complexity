# Elementary Sorting Algorithms

## Three ways to build order

Elementary sorting algorithms are valuable because their state is visible. They reveal three distinct ideas:

- **selection sort** repeatedly chooses the smallest remaining element;
- **insertion sort** grows a sorted prefix by inserting one new element;
- **bubble sort** repeatedly repairs adjacent inversions.

All three can take quadratic time, but they do not behave identically.

<link rel="stylesheet" href="/Algorithms_and_Complexity/stylesheets/elementary-sorts-visualization.css">
<div data-elementary-sorts-viz></div>
<script src="/Algorithms_and_Complexity/javascripts/elementary-sorts-visualization.js"></script>

## 1. Selection sort

```python
def selection_sort(values: list[int]) -> None:
    for boundary in range(len(values) - 1):
        smallest = boundary

        for index in range(boundary + 1, len(values)):
            if values[index] < values[smallest]:
                smallest = index

        values[boundary], values[smallest] = values[smallest], values[boundary]
```

At the start of each outer iteration:

```text
values[0:boundary] is sorted and contains the smallest boundary elements.
```

The inner loop finds the minimum of the unsorted suffix. One swap places it at the boundary.

### Cost

The number of comparisons is approximately:

```text
(n - 1) + (n - 2) + ... + 1
```

which is `O(n²)`. Selection sort performs only `O(n)` swaps, which can matter when movement is expensive.

### Properties

- in-place;
- usually unstable in its simple swap-based form;
- not adaptive;
- `O(n²)` best and worst-case comparisons.

## 2. Insertion sort

```python
def insertion_sort(values: list[int]) -> None:
    for boundary in range(1, len(values)):
        current = values[boundary]
        index = boundary

        while index > 0 and values[index - 1] > current:
            values[index] = values[index - 1]
            index -= 1

        values[index] = current
```

Before inserting `current`, the prefix `values[0:boundary]` is already sorted. Larger elements shift right until the correct position opens.

### Invariant

```text
values[0:boundary] is sorted and contains the original elements from that prefix.
```

After insertion, the sorted prefix grows by one.

### Cost

- Best case for already sorted input: `O(n)`.
- Worst case for reverse order: `O(n²)`.
- Auxiliary space: `O(1)`.

### Properties

- in-place;
- stable when equal elements are not moved past one another;
- adaptive;
- effective for small or nearly sorted inputs.

## 3. Bubble sort

```python
def bubble_sort(values: list[int]) -> None:
    end = len(values)

    while end > 1:
        swapped = False

        for index in range(end - 1):
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
                swapped = True

        if not swapped:
            return

        end -= 1
```

Each pass moves a largest remaining element toward the end through adjacent swaps.

### Invariant

After one full pass over `values[0:end]`, the element at `end - 1` is maximal in that active region. The sorted suffix grows from right to left.

### Cost

- Worst case: `O(n²)`.
- Best case with the `swapped` flag: `O(n)`.
- Auxiliary space: `O(1)`.

### Properties

- stable with strict `>` comparison;
- in-place;
- adaptive only with early-exit detection;
- often performs many swaps.

## 4. Comparison table

| Property | Selection | Insertion | Bubble |
|---|---|---|---|
| Worst-case time | `O(n²)` | `O(n²)` | `O(n²)` |
| Best-case time | `O(n²)` | `O(n)` | `O(n)` with flag |
| Auxiliary space | `O(1)` | `O(1)` | `O(1)` |
| Stable | usually no | yes | yes |
| Adaptive | no | yes | partly |
| Main idea | select minimum | insert into prefix | repair adjacent inversions |

## 5. Correctness requires two claims

For each algorithm, prove:

1. the established prefix or suffix is ordered;
2. operations preserve all original elements.

Swaps and shifts do not create or destroy values. The invariant explains why the region declared sorted really has the required elements in the required order.

## 6. Why similar Big O does not mean identical behaviour

All three have quadratic worst-case time, but:

- selection sort makes relatively few swaps;
- insertion sort exploits near-sortedness;
- bubble sort exposes adjacent inversions but may move values many times.

Asymptotic class is one decision factor, not the complete decision.

## 7. Common implementation errors

### Selection sort: swapping inside the inner loop

This destroys the clean separation between finding a minimum and placing it.

### Insertion sort: overwriting `current`

The value being inserted must be saved before shifts begin.

### Bubble sort: using `>=`

Swapping equal keys may destroy stability.

### Incorrect boundaries

Sorting algorithms are especially vulnerable to off-by-one errors because inner and outer ranges describe different regions.

## 8. What you must be able to explain

- what region is already sorted in each algorithm;
- what one outer iteration establishes;
- why insertion sort is adaptive;
- why selection sort performs few swaps;
- why stable bubble sort uses `>` rather than `>=`;
- why all three preserve the input multiset.

## Practice

1. Trace all three methods on `[5, 2, 4, 2]`.
2. Count comparisons and swaps on sorted and reverse-sorted inputs.
3. Modify insertion sort for descending order.
4. Produce records showing selection sort instability.
5. State an invariant for each outer loop.

The next chapter introduces a more scalable design pattern: divide and conquer.