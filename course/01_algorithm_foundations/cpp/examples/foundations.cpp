#include <cassert>
#include <functional>
#include <iostream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

template <typename T>
T maximum_of_two(const T& a, const T& b) {
    return a >= b ? a : b;
}

template <typename T>
T maximum_of_three(const T& a, const T& b, const T& c) {
    T maximum = a;
    if (b > maximum) {
        maximum = b;
    }
    if (c > maximum) {
        maximum = c;
    }
    return maximum;
}

template <typename T>
std::pair<T, T> swap_values(T a, T b) {
    T temporary = a;
    a = b;
    b = temporary;
    return {a, b};
}

int sum_sequence(const std::vector<int>& values) {
    int total = 0;
    for (const int value : values) {
        total += value;
    }
    return total;
}

template <typename T>
std::size_t count_matching(
    const std::vector<T>& values,
    const std::function<bool(const T&)>& predicate
) {
    std::size_t count = 0;
    for (const T& value : values) {
        if (predicate(value)) {
            ++count;
        }
    }
    return count;
}

template <typename T>
std::pair<T, T> minimum_and_maximum(const std::vector<T>& values) {
    if (values.empty()) {
        throw std::invalid_argument("values must not be empty");
    }

    T minimum = values.front();
    T maximum = values.front();

    for (std::size_t index = 1; index < values.size(); ++index) {
        const T& value = values[index];
        if (value < minimum) {
            minimum = value;
        }
        if (value > maximum) {
            maximum = value;
        }
    }

    return {minimum, maximum};
}

void run_assertions() {
    assert(maximum_of_two(7, 4) == 7);
    assert(maximum_of_two(5, 5) == 5);
    assert(maximum_of_two(-2, -7) == -2);

    assert(maximum_of_three(8, 13, 11) == 13);
    assert(maximum_of_three(4, 4, 4) == 4);
    assert(maximum_of_three(-3, -8, -1) == -1);

    assert((swap_values(3, 9) == std::pair<int, int>{9, 3}));
    assert((swap_values(std::string{"left"}, std::string{"right"}) ==
            std::pair<std::string, std::string>{"right", "left"}));

    assert(sum_sequence({4, -2, 7, 1}) == 10);
    assert(sum_sequence({}) == 0);
    assert(sum_sequence({5}) == 5);

    assert(count_matching<int>({5, 8, 2, 7, 4}, [](const int& value) {
        return value % 2 == 0;
    }) == 3);
    assert(count_matching<int>({}, [](const int&) { return true; }) == 0);
    assert(count_matching<int>({1, 3, 5}, [](const int& value) {
        return value < 0;
    }) == 0);

    assert((minimum_and_maximum(std::vector<int>{6, 2, 9, 4, 1, 8}) ==
            std::pair<int, int>{1, 9}));
    assert((minimum_and_maximum(std::vector<int>{5}) ==
            std::pair<int, int>{5, 5}));
    assert((minimum_and_maximum(std::vector<int>{-4, -9, -2}) ==
            std::pair<int, int>{-9, -2}));

    bool rejected_empty_input = false;
    try {
        static_cast<void>(minimum_and_maximum(std::vector<int>{}));
    } catch (const std::invalid_argument&) {
        rejected_empty_input = true;
    }
    assert(rejected_empty_input);
}

int main() {
    run_assertions();
    std::cout << "All Module 01 C++ assertions passed.\n";
    return 0;
}
