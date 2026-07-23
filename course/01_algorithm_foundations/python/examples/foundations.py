"""Paired Python examples for Module 01: Foundations of Algorithm Design."""

from collections.abc import Callable, Sequence
from typing import TypeVar

T = TypeVar("T")


def maximum_of_two(a: T, b: T) -> T:
    """Return the greater of two comparable values."""
    return a if a >= b else b


def maximum_of_three(a: T, b: T, c: T) -> T:
    """Return the greatest of three comparable values."""
    maximum = a
    if b > maximum:
        maximum = b
    if c > maximum:
        maximum = c
    return maximum


def swap_values(a: T, b: T) -> tuple[T, T]:
    """Return the two input values in reversed order."""
    temporary = a
    a = b
    b = temporary
    return a, b


def sum_sequence(values: Sequence[int]) -> int:
    """Return the sum of a finite sequence of integers."""
    total = 0
    for value in values:
        total += value
    return total


def count_matching(values: Sequence[T], predicate: Callable[[T], bool]) -> int:
    """Count values for which predicate returns True."""
    count = 0
    for value in values:
        if predicate(value):
            count += 1
    return count


def minimum_and_maximum(values: Sequence[T]) -> tuple[T, T]:
    """Return the minimum and maximum values from a non-empty sequence.

    Raises:
        ValueError: If values is empty.
    """
    if not values:
        raise ValueError("values must not be empty")

    minimum = values[0]
    maximum = values[0]

    for value in values[1:]:
        if value < minimum:
            minimum = value
        if value > maximum:
            maximum = value

    return minimum, maximum


def _run_assertions() -> None:
    assert maximum_of_two(7, 4) == 7
    assert maximum_of_two(5, 5) == 5
    assert maximum_of_two(-2, -7) == -2

    assert maximum_of_three(8, 13, 11) == 13
    assert maximum_of_three(4, 4, 4) == 4
    assert maximum_of_three(-3, -8, -1) == -1

    assert swap_values(3, 9) == (9, 3)
    assert swap_values("left", "right") == ("right", "left")

    assert sum_sequence([4, -2, 7, 1]) == 10
    assert sum_sequence([]) == 0
    assert sum_sequence([5]) == 5

    assert count_matching([5, 8, 2, 7, 4], lambda value: value % 2 == 0) == 3
    assert count_matching([], lambda value: True) == 0
    assert count_matching([1, 3, 5], lambda value: value < 0) == 0

    assert minimum_and_maximum([6, 2, 9, 4, 1, 8]) == (1, 9)
    assert minimum_and_maximum([5]) == (5, 5)
    assert minimum_and_maximum([-4, -9, -2]) == (-9, -2)

    try:
        minimum_and_maximum([])
    except ValueError:
        pass
    else:
        raise AssertionError("minimum_and_maximum should reject an empty sequence")


if __name__ == "__main__":
    _run_assertions()
    print("All Module 01 Python assertions passed.")
