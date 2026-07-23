# Side Effects and Interface Design

## A returned value is only one kind of result

When beginners first meet functions, they often assume that the only meaningful outcome is the value after `return`. Real programs are broader. A function may print, mutate an object, write a file, update a database, change a global variable, or raise an exception. These observable changes are **side effects**.

A side effect is not automatically a defect. Many useful operations exist precisely to change the world outside the function. The design problem is different:

> Are the effects necessary, explicit, controlled, and consistent with the function's contract?

## Returned result versus mutation

Consider two designs for doubling every value.

```python
def doubled(values: list[int]) -> list[int]:
    result = []

    for value in values:
        result.append(2 * value)

    return result
```

The input list is unchanged. A new list is returned.

```python
def double_in_place(values: list[int]) -> None:
    for index in range(len(values)):
        values[index] *= 2
```

The second function returns `None` and modifies the caller-visible object.

Neither design is universally superior. They offer different interfaces:

- returning a new value supports local reasoning and preserves the original;
- in-place modification may avoid allocating a second structure;
- mutation requires the caller to understand aliasing and object ownership.

## Observable effects

Common side effects include:

- modifying mutable arguments;
- modifying object fields;
- assigning to global or non-local variables;
- printing or reading from the console;
- writing files;
- sending network requests;
- changing persistent storage;
- consuming random state;
- raising exceptions.

Some effects are more visible than others. Printing is obvious. Advancing a random-number generator changes hidden state but still affects future calls.

## Referential transparency

A function is **referentially transparent** when an invocation can be replaced by its returned value without changing program behaviour.

```python
def cube(value: int) -> int:
    return value ** 3
```

Replacing `cube(4)` with `64` changes nothing.

That is not true here:

```python
def announce_and_cube(value: int) -> int:
    print("computing")
    return value ** 3
```

Replacing the call with `64` removes output. The side effect is part of observable behaviour.

Referential transparency simplifies testing, caching, parallel execution, and correctness arguments. It is useful, but not always achievable.

## Command-query separation

A practical design principle is to distinguish:

- **queries**, which return information without changing state;
- **commands**, which change state.

For example:

```python
def balance(account: Account) -> int:
    return account.balance


def deposit(account: Account, amount: int) -> None:
    account.balance += amount
```

Combining both can produce confusing interfaces:

```python
def deposit_and_return_old_balance(account: Account, amount: int) -> int:
    old = account.balance
    account.balance += amount
    return old
```

Such a function may be justified, but its dual role should be deliberate and documented.

## Hidden input and hidden output

A global variable acts as hidden input when read:

```python
limit = 10


def acceptable(value: int) -> bool:
    return value <= limit
```

It acts as hidden output when modified:

```python
accepted_count = 0


def record_if_acceptable(value: int) -> bool:
    global accepted_count

    if value <= 10:
        accepted_count += 1
        return True

    return False
```

Hidden dependencies make isolated reasoning harder because the parameter list no longer describes all relevant state.

A clearer version returns information explicitly:

```python
def acceptable(value: int, limit: int) -> bool:
    return value <= limit
```

The caller may separately update a count.

## Exceptions as effects and control flow

Raising an exception changes the normal path of execution:

```python
def reciprocal(value: float) -> float:
    if value == 0:
        raise ValueError("value must be non-zero")

    return 1 / value
```

The exception is part of the interface. A correct contract should state when failure may occur.

Exception behaviour matters especially in recursive code. A failure in a deep call unwinds multiple stack frames unless intercepted.

## Mutation, aliasing, and surprise

Suppose two names refer to the same list:

```python
first = [3, 1, 4]
second = first

double_in_place(first)
```

Now both names observe `[6, 2, 8]`.

The algorithm inside `double_in_place` may be correct, yet a caller may still use it incorrectly by forgetting that aliases share the mutation.

This is why function correctness and interface safety are related but distinct. A function can satisfy its formal postcondition and still be difficult to use correctly.

## Designing explicit interfaces

Before implementing a function, decide:

1. Does it return a new value or modify an existing object?
2. Is mutation visible through aliases?
3. Does it read external state?
4. Does it write external state?
5. Can it fail, and how?
6. Is repeated execution with the same arguments guaranteed to behave the same way?

Then encode the decision in the name, return type, documentation, and tests.

Names such as `sorted_copy`, `sort_in_place`, `read_config`, and `write_report` communicate effects better than vague verbs such as `process`.

## Testing side effects

A test for a pure function checks its return value. A test for an effectful function must also inspect the changed environment.

```python
def test_double_in_place() -> None:
    values = [2, 5]

    result = double_in_place(values)

    assert result is None
    assert values == [4, 10]
```

A stronger test may verify that unrelated state is unchanged.

## What you must be able to explain

You should be able to identify hidden inputs, hidden outputs, mutations, exceptions, and I/O effects; compare returning a new value with updating in place; and explain why explicit effects improve reasoning.

## Practice

1. Classify the effects of a function that logs a message, appends to a list, and returns the list length.
2. Redesign a function that both prints and returns a search result so that computation and presentation are separated.
3. Write contracts for a pure `sorted_copy` function and an in-place `sort_values` command.