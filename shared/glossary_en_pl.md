# Polish–English Glossary for Algorithms and Complexity

## Purpose

This glossary defines the preferred English terminology for student-facing materials while preserving the Polish source terminology used in `SYLABUS.md`.

The English terms are selected according to standard Computer Science usage rather than literal word-for-word translation.

When a source expression is ambiguous, the note column records the issue instead of silently changing the source meaning.

---

## 1. General algorithm terminology

| Polish source term | Preferred English term | Notes |
|---|---|---|
| algorytm | algorithm | A finite, unambiguous procedure for solving a class of problems. |
| algorytmizacja | algorithm design / algorithmic problem solving | Avoid the uncommon literal form *algorithmization* in student-facing English. |
| problem algorytmiczny | algorithmic problem | A computational problem specified through inputs and required outputs. |
| poprawny algorytm | correct algorithm | Correctness normally includes partial correctness and termination. |
| przetwarzanie imperatywne | imperative computation / imperative programming | Use *imperative programming* when discussing source code. |
| postać algorytmu | algorithm representation | Examples: natural language, flowchart, pseudocode, program. |
| cechy algorytmu | properties of an algorithm | For example: finiteness, definiteness, input, output, effectiveness. |
| pseudokod | pseudocode | Language-independent structured description. |
| strukturalizacja algorytmu | structuring an algorithm | Sequence, selection, iteration, decomposition into procedures. |
| schemat konstruowania poprawnego algorytmu | method for constructing a correct algorithm | Preserve the source meaning; exact method must be explained in the teaching material. |
| dane wejściowe | input | Values supplied to an algorithm. |
| wynik / dane wyjściowe | output | Value or state produced by an algorithm. |
| asercja początkowa | precondition | Condition required before execution. |
| asercja końcowa | postcondition | Condition guaranteed after successful execution. |
| niezmiennik pętli | loop invariant | Teaching extension supporting correctness reasoning. |
| warunek stopu | termination condition | Condition controlling when iteration or recursion ends. |
| przypadek brzegowy | edge case | Input near a boundary of the valid domain. |
| poprawność | correctness | Must be distinguished from performance. |
| efektywność | efficiency | Resource use, usually time and memory. |

---

## 2. Iteration, functions, and recursion

| Polish source term | Preferred English term | Notes |
|---|---|---|
| iteracja | iteration | Repetition using loops or repeated state transitions. |
| algorytm iteracyjny | iterative algorithm | Algorithm expressed primarily with loops. |
| pętla iteracyjna | iterative loop / loop | Usually shorten to *loop*. |
| rekurencja | recursion | A function or definition referring to itself through smaller instances. |
| algorytm rekurencyjny | recursive algorithm | Must define a base case and progress toward it. |
| funkcja rekurencyjna | recursive function | Function that invokes itself directly or indirectly. |
| przypadek bazowy | base case | Stops recursive decomposition. |
| krok rekurencyjny | recursive case / recursive step | Reduces the problem to a smaller instance. |
| wywołanie rekurencyjne | recursive call | A call creating another activation record. |
| anatomia wywołania rekurencyjnego | anatomy of a recursive call | Includes arguments, local state, return address, and result propagation. |
| rekurencja pośrednia | indirect recursion | Function A calls B, and B eventually calls A. |
| rekurencja zagnieżdżona | nested recursion | A recursive call is used as an argument to another recursive call. |
| implementacja stosowa rekurencji | stack-based implementation of recursion | May mean the runtime call stack or explicit stack simulation; the module must state which. |
| stos wywołań | call stack | Runtime stack of active function calls. |
| ramka stosu | stack frame / activation record | Per-call runtime state. |
| efekt uboczny | side effect | Observable state change beyond returning a value. |
| komunikacja funkcji z otoczeniem | function interaction with its environment | Includes parameters, return values, external state, and side effects. |
| rekurencja a iteracja | recursion versus iteration | Comparative analysis of formulation, cost, and limitations. |

---

## 3. Types, memory, and aggregate data

| Polish source term | Preferred English term | Notes |
|---|---|---|
| typ pierwotny | primitive data type | Terminology depends on language; use as a conceptual category. |
| typ złożony | compound data type | A type built from multiple values or components. |
| agregat danych | aggregate data type / aggregate data structure | Use *aggregate data type* for arrays and records. |
| tablica | array | In Python examples, explicitly distinguish an abstract array from `list`. |
| tablica statyczna | fixed-size array | C++: commonly `std::array` or built-in array. |
| tablica dynamiczna | dynamic array | Python `list`; C++ `std::vector`. |
| tablica indeksowa | index array / array of indices | Stores indices or an indirect ordering instead of moving source records. |
| indeks | index | Course conventions use zero-based indexing unless stated otherwise. |
| rekord | record | Python: `dataclass` or class; C++: `struct` or class. |
| składowa | component / field | For records, prefer *field*. |
| bezpośredni dostęp | direct access / random access | Use *random access* when discussing array complexity. |
| reprezentacja danych w pamięci | in-memory data representation | Includes layout, references, pointers, and object storage. |
| referencja | reference | Python and C++ use different reference semantics. |
| wskaźnik | pointer | Explicit address-like value in C++. |
| alokacja dynamiczna | dynamic allocation | Memory acquired during program execution. |
| struktura dynamiczna | dynamic data structure | Structure whose size or shape changes at runtime; not the same as dynamic programming. |

---

## 4. Searching and sorting

| Polish source term | Preferred English term | Notes |
|---|---|---|
| wyszukiwanie liniowe | linear search | Sequential scan. |
| wyszukiwanie binarne | binary search | Requires a sorted search domain or an equivalent monotonic condition. |
| sortowanie | sorting | Reordering elements according to a key or comparator. |
| algorytm sortowania | sorting algorithm | Examples are selected in later modules. |
| cechy algorytmów sortowania | properties of sorting algorithms | Includes stability, in-place behavior, adaptiveness, and complexity. |
| sortowanie stabilne | stable sort | Equal keys preserve relative order. |
| sortowanie w miejscu | in-place sorting | Uses limited auxiliary storage; exact definition may vary. |
| metoda „dziel i zwyciężaj” | divide-and-conquer paradigm | Preferred standard spelling includes hyphens. |
| Quick-Sort / QuickSort | Quicksort | Repository prose uses *Quicksort*; code identifiers may use `quick_sort`. |
| porównanie | comparison | Often the dominant operation in comparison-based algorithms. |
| klucz sortowania | sort key | Value used to determine order. |

---

## 5. Algorithm design strategies

| Polish source term | Preferred English term | Notes |
|---|---|---|
| algorytm z powrotami | backtracking algorithm | Standard term; do not translate literally as *algorithm with returns*. |
| wyszukiwanie wyczerpujące | exhaustive search | Explores all relevant candidates or states. |
| algorytm zachłanny | greedy algorithm | Makes locally optimal choices according to a rule. |
| metoda systematyczna | systematic method / systematic search | Meaning depends on context and must be explained. |
| metoda heurystyczna | heuristic method | Guides search without necessarily guaranteeing an optimal result. |
| heurystyka | heuristic | Additional decision rule or approximation technique. |
| rozwiązanie optymalne | optimal solution | Best solution under a defined objective. |
| rozwiązanie przybliżone | approximate solution | A non-exact solution with stated quality expectations. |

---

## 6. Lists, stacks, and queues

| Polish source term | Preferred English term | Notes |
|---|---|---|
| lista liniowa | linear list / linked list | Use *linked list* when nodes and links are intended. |
| lista jednokierunkowa | singly linked list | Each node links to the next node. |
| lista dwukierunkowa | doubly linked list | Nodes link in both directions. |
| lista cykliczna | circular linked list | Last node links back according to the chosen variant. |
| węzeł | node | Element containing data and link fields. |
| łącze | link | Reference or pointer connecting nodes. |
| głowa listy | head | First node or reference to it. |
| ogon listy | tail | Last node or reference to it. |
| LIFO-stos | LIFO stack | In prose, *stack* is normally sufficient after definition. |
| FIFO-kolejka | FIFO queue | In prose, *queue* is normally sufficient after definition. |
| kolejka z priorytetem | priority queue | Removal order is determined by priority. |
| samoorganizująca się lista | self-organizing list | Reorders elements based on access behavior. |
| lista z przeskokami | skip list | Probabilistic layered linked structure. |
| operacja push | push | Insert onto a stack. |
| operacja pop | pop | Remove from a stack; C++ adapters return no value from `pop()`. |
| enqueue | enqueue | Insert into a queue. |
| dequeue | dequeue | Remove from a queue. |

---

## 7. Trees and heaps

| Polish source term | Preferred English term | Notes |
|---|---|---|
| drzewo | tree | Hierarchical acyclic structure in the intended rooted-tree context. |
| korzeń | root | Distinguished top node. |
| rodzic | parent | Immediate predecessor in a rooted tree. |
| dziecko | child | Immediate successor in a rooted tree. |
| liść | leaf | Node without children. |
| głębokość | depth | Distance from the root to a node. |
| wysokość | height | Longest downward path, according to the module's edge/node convention. |
| poddrzewo | subtree | A node with its descendants. |
| drzewo binarne | binary tree | Each node has at most two children. |
| przechodzenie po drzewie | tree traversal | Visiting nodes in a defined order. |
| preorder | preorder traversal | Root, left, right. |
| inorder | inorder traversal | Left, root, right. |
| postorder | postorder traversal | Left, right, root. |
| przechodzenie wszerz | level-order traversal / breadth-first traversal | Uses a queue. |
| drzewo binarnych poszukiwań | binary search tree (BST) | Ordered binary tree under a key invariant. |
| słownik | dictionary / map | Abstract key-value data type. |
| równoważenie drzewa | tree balancing | Maintaining bounded height through structural changes. |
| drzewo AVL | AVL tree | Height-balanced binary search tree. |
| współczynnik równowagi | balance factor | Typically height(left) minus height(right), if that convention is chosen. |
| rotacja | rotation | Local tree restructuring preserving BST order. |
| sterta | heap | In this course context, usually a binary heap, not dynamic memory. |
| własność sterty | heap property | Parent priority dominates child priority according to min/max convention. |
| kopiec binarny | binary heap | Array-based complete binary tree. |

---

## 8. Graphs

| Polish source term | Preferred English term | Notes |
|---|---|---|
| graf | graph | Structure `G = (V, E)`. |
| wierzchołek | vertex | Plural: vertices. |
| krawędź | edge | Connection between vertices. |
| graf skierowany | directed graph | Edges have direction. |
| graf nieskierowany | undirected graph | Edges have no direction. |
| graf ważony | weighted graph | Edges or vertices carry weights. |
| sąsiad | neighbor | Adjacent vertex. |
| stopień wierzchołka | vertex degree | For directed graphs distinguish in-degree and out-degree. |
| ścieżka | path | Sequence of adjacent vertices or edges. |
| cykl | cycle | Closed path under the chosen definition. |
| spójność | connectivity | Meaning depends on directed or undirected graph. |
| składowa spójna | connected component | Maximal connected subgraph in an undirected graph. |
| reprezentacja grafu | graph representation | Examples: adjacency matrix, adjacency list. |
| macierz sąsiedztwa | adjacency matrix | Matrix indicating edge relationships. |
| lista incydencji | adjacency list | The Polish source uses *lista incydencji*; preferred English for the described representation is *adjacency list*. |
| lista sąsiedztwa | adjacency list | Standard Polish term often used outside the source. |
| przeszukiwanie w głąb / szukanie w głąb | depth-first search (DFS) | Standard English abbreviation: DFS. |
| zbiór odwiedzonych | visited set | Prevents repeated processing and cycles. |
| osiągalność | reachability | Whether a path exists from one vertex to another. |

---

## 9. Complexity terminology

| Polish source term | Preferred English term | Notes |
|---|---|---|
| złożoność obliczeniowa | computational complexity | General resource-growth concept. |
| złożoność czasowa | time complexity | Growth in running-time operations. |
| złożoność pamięciowa | space complexity | Growth in memory use. |
| pamięć pomocnicza | auxiliary space | Additional memory excluding input, subject to stated convention. |
| rozmiar danych wejściowych | input size | Must be explicitly defined. |
| operacja dominująca | dominant operation | Operation whose repetitions determine the leading growth. |
| O-notacja | Big O notation | Preferred English form. |
| ograniczenie asymptotyczne | asymptotic bound | Describes growth for sufficiently large input. |
| przypadek najlepszy | best case | Minimum work for inputs of a fixed size. |
| przypadek średni | average case | Expected work under a defined distribution. |
| przypadek najgorszy | worst case | Maximum work for inputs of a fixed size. |
| złożoność stała | constant time | `O(1)`. |
| złożoność logarytmiczna | logarithmic time | `O(log n)`. |
| złożoność liniowa | linear time | `O(n)`. |
| złożoność kwadratowa | quadratic time | `O(n²)`. |
| złożoność wykładnicza | exponential time | For example `O(2^n)`. |
| złożoność zamortyzowana | amortized complexity | Extension unless introduced explicitly in a module. |
| problemy algorytmicznie trudne | computationally hard problems | Broad source category requiring careful definition. |
| problemy N- i NP-zupełne | N- and NP-complete problems — source wording | Preserve this wording in traceability. Before explanatory material is written, clarify whether `N` is a source error, a local convention, or an intended class. Do not silently rewrite it. |
| problem NP-zupełny | NP-complete problem | Standard complexity-theory term, but only use as a correction after the source ambiguity is documented. |

---

## 10. Assessment and learning terminology

| Polish source term | Preferred English term | Notes |
|---|---|---|
| efekty uczenia się | learning outcomes | Knowledge, skills, and social competences. |
| wiedza | knowledge | What the student knows and understands. |
| umiejętności | skills | What the student is able to do. |
| kompetencje społeczne | social competences | Preserve the syllabus category. |
| ćwiczenia | practical classes / exercises | Use *practical classes* for the course component. |
| laboratorium | laboratory class | Use when work is explicitly laboratory-based. |
| kolokwium | in-class test / test | Avoid the false friend *colloquium*. |
| egzamin pisemny | written examination | Formal assessment. |
| zaliczenie z oceną | graded course assessment | Institutional phrase; use only where needed. |
| praca własna studenta | student independent study | Work outside contact hours. |
| informacja zwrotna | feedback | Use *constructive feedback* where the syllabus does. |

---

## 11. Usage rules

- Use the preferred English term consistently within a module.
- Introduce abbreviations on first use, for example **depth-first search (DFS)**.
- Do not translate names of standard algorithms into non-standard English.
- Preserve source terminology in traceability records even when student-facing terminology is modernized.
- Document ambiguous source wording instead of silently correcting it.
- Add new terms to this glossary when a module introduces terminology not yet covered.
