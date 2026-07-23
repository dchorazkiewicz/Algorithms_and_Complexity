# Plan budowy pełnych materiałów wykładowych

## Status projektu

- [x] Zachowano polską i angielską wersję sylabusa jako dokumenty źródłowe.
- [x] Usunięto poprzednią strukturę nastawioną na krótkie materiały do ćwiczeń.
- [x] Utworzono podstawową konfigurację MkDocs Material.
- [x] Utworzono automatyczny proces budowania strony.
- [ ] Zatwierdzono niniejszy plan treści.
- [ ] Rozpoczęto opracowanie Modułu 01.

---

## 1. Nowy cel repozytorium

Repozytorium ma zawierać **pełne, samodzielne materiały do nauki przedmiotu Algorithms and Complexity** dostępne jako strona internetowa w GitHub Pages.

Materiały mają być użyteczne zarówno dla:

- studenta uczącego się samodzielnie;
- wykładowcy przygotowującego wykład;
- prowadzącego ćwiczenia potrzebującego teorii, przykładów i problemów;
- osoby powtarzającej materiał przed kolokwium lub egzaminem.

Nie tworzymy skrótu sylabusa ani samego zbioru zadań. Każdy temat ma zostać opracowany jako pełny rozdział dydaktyczny.

---

## 2. Nienegocjowalne zasady

### 2.1. Sylabus wyznacza zakres i kolejność

Treści są rozwijane w kolejności dziesięciu tematów z sekcji **Course content / Treści kształcenia**.

Nie wolno:

- pominąć punktu źródłowego;
- zastąpić punktu innym, wygodniejszym tematem;
- scalić tematów w sposób ukrywający wymagania źródłowe;
- cicho poprawić niejednoznacznego sformułowania źródłowego;
- oznaczyć materiału jako zakończony bez porównania z oboma sylabusami.

### 2.2. Pełne opracowanie zamiast streszczenia

Każde zagadnienie powinno, stosownie do jego charakteru, zawierać:

1. motywację i kontekst;
2. precyzyjne definicje;
3. notację i terminologię;
4. pełne wyjaśnienie teorii;
5. własności i zależności;
6. kontrakt problemu lub algorytmu;
7. pseudokod;
8. ręczne prześledzenie wykonania;
9. przykłady rozwiązane krok po kroku;
10. implementację w Pythonie;
11. implementację w C++;
12. porównanie implementacji;
13. argument poprawności;
14. warunki zakończenia;
15. analizę złożoności czasowej;
16. analizę pamięci pomocniczej;
17. przypadki brzegowe;
18. typowe błędy i błędne intuicje;
19. pytania kontrolne;
20. problemy i zadania do samodzielnego rozwiązania;
21. podsumowanie pojęć.

Nie każdy punkt jest stosowalny do każdej strony. Przykładowo strona z samymi definicjami nie potrzebuje implementacji, ale żaden ważny algorytm nie może pozostać bez pseudokodu, przykładów, poprawności i złożoności.

### 2.3. Język

- Docelowe materiały dydaktyczne są pisane po angielsku.
- Polski sylabus pozostaje źródłem kontroli znaczenia.
- Angielski sylabus pozostaje źródłem terminologii IT.
- Plan projektu i techniczne checklisty mogą pozostać po polsku.

### 2.4. Rozszerzenia

Materiały wykraczające poza sylabus są dozwolone wyłącznie wtedy, gdy:

- pomagają wyjaśnić wymagane zagadnienie;
- są wyraźnie oznaczone jako **Further reading** lub **Extension**;
- nie zastępują treści wymaganej;
- nie przesuwają obowiązkowego materiału na drugi plan.

### 2.5. Niejednoznaczności źródła

Sformułowania takie jak:

- `lista incydencji`;
- `problemy N- i NP-zupełne`;
- `metody usprawniania algorytmów zachłannych: systematyczne, heurystyczne`;

muszą zostać zachowane w informacji o zakresie źródłowym. Standardowa terminologia Computer Science może zostać wyjaśniona obok, ale nie może być wprowadzona jako cicha zamiana treści.

---

## 3. Architektura strony

Docelowa struktura:

```text
docs/
├── index.md
├── development-plan.md
├── source/
│   ├── syllabus-pl.md
│   └── syllabus-en.md
├── course/
│   ├── 01-foundations-of-algorithm-design/
│   ├── 02-iteration-recursion-and-data-types/
│   ├── 03-arrays-records-and-memory/
│   ├── 04-searching-sorting-and-divide-conquer/
│   ├── 05-functions-call-stack-and-recursion/
│   ├── 06-backtracking-greedy-methods-and-dynamic-structures/
│   ├── 07-linked-lists-stacks-and-queues/
│   ├── 08-binary-trees-avl-trees-and-heaps/
│   ├── 09-graphs-and-depth-first-search/
│   └── 10-computational-complexity-and-hard-problems/
└── appendices/
    ├── mathematical-notation.md
    ├── pseudocode-reference.md
    ├── python-cpp-reference.md
    ├── complexity-cheat-sheet.md
    └── glossary.md
```

Każdy moduł będzie widoczny w bocznej nawigacji MkDocs w tej samej kolejności co sylabus.

---

## 4. Standard pojedynczego modułu

Każdy moduł otrzyma własny katalog i stronę startową.

Minimalna struktura:

```text
XX-module-name/
├── index.md
├── 01-first-source-topic.md
├── 02-second-source-topic.md
├── ...
├── worked-examples.md
├── python-and-cpp.md
├── problems.md
├── review.md
└── references.md
```

### `index.md`

Zawiera:

- zakres dokładnie przepisany z sylabusa;
- cele nauki;
- wymagania wstępne;
- mapę rozdziału;
- szacowany czas nauki;
- checklistę opanowania materiału.

### Strony tematyczne

Każda strona tematyczna odpowiada jednemu punktowi lub jednej spójnej grupie punktów źródłowych. Strona ma być czytelnym rozdziałem, a nie notatką roboczą.

### `worked-examples.md`

Zawiera pełne rozwiązania i przejścia krok po kroku. Przykład powinien wyjaśniać decyzje, a nie tylko prezentować wynik.

### `python-and-cpp.md`

Zawiera równoległe implementacje, ale nie mechaniczne tłumaczenia linia po linii. Obie implementacje mają realizować ten sam algorytm i ten sam kontrakt.

### `problems.md`

Zawiera:

- pytania definicyjne;
- problemy koncepcyjne;
- ręczne śledzenie algorytmów;
- analizę błędnych rozwiązań;
- zadania implementacyjne;
- zadania z poprawności;
- zadania ze złożoności;
- zadania rozszerzające oznaczone oddzielnie.

### `review.md`

Zawiera:

- podsumowanie definicji;
- listę twierdzeń i własności;
- zestaw pytań do samokontroli;
- checklistę osiągnięć studenta;
- powiązanie z efektami uczenia się.

---

# 5. Szczegółowy plan modułów

## Module 01 — Foundations of Algorithm Design

**Zakres źródłowy:**

- imperative computation;
- algorithm preconditions and postconditions;
- forms of algorithm representation;
- properties of algorithms;
- pseudocode;
- basic techniques for structuring algorithms.

**Godziny źródłowe, studia stacjonarne:** 1 godzina wykładu, 2 godziny ćwiczeń.

**Planowane strony:**

- [ ] `index.md` — zakres, cele i mapa modułu;
- [ ] `imperative-computation.md` — stan, instrukcja, przypisanie i przebieg wykonania;
- [ ] `preconditions-and-postconditions.md` — asercje początkowe i końcowe, kontrakty;
- [ ] `algorithm-representations.md` — opis słowny, schemat, pseudokod i program;
- [ ] `properties-of-algorithms.md` — określoność, skończoność, wykonalność, poprawność i ogólność;
- [ ] `pseudocode.md` — pełna konwencja zapisu używana na stronie;
- [ ] `structuring-algorithms.md` — sekwencja, wybór, iteracja i dekompozycja;
- [ ] `worked-examples.md` — podstawowe algorytmy z pełnym śledzeniem;
- [ ] `python-and-cpp.md` — implementacja tych samych przykładów;
- [ ] `problems.md` — problemy i ćwiczenia;
- [ ] `review.md` — powtórzenie i samokontrola;
- [ ] audyt względem obu sylabusów.

---

## Module 02 — Iteration, Recursion, and Data Types

**Zakres źródłowy:**

- iterative loops;
- loop termination conditions;
- recursion;
- a method for constructing a correct algorithm;
- primitive and compound data types.

**Godziny źródłowe, studia stacjonarne:** 1 godzina wykładu, 4 godziny ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `iterative-loops.md` — modele pętli, sterowanie i stan;
- [ ] `termination-conditions.md` — warunek stopu, postęp i pętle nieskończone;
- [ ] `introduction-to-recursion.md` — definicja, przypadek bazowy i redukcja problemu;
- [ ] `constructing-a-correct-algorithm.md` — specyfikacja, niezmienniki, postęp i walidacja;
- [ ] `primitive-and-compound-data-types.md` — pojęciowa klasyfikacja typów;
- [ ] `worked-examples.md`;
- [ ] `python-and-cpp.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

!!! note
    Moduł 02 wprowadza rekurencję. Moduł 05 rozwija ją szczegółowo przez model stosu wywołań, rekurencję pośrednią i zagnieżdżoną oraz transformację do wersji iteracyjnej.

---

## Module 03 — Arrays, Records, and In-Memory Representation

**Zakres źródłowy:**

- arrays and records as aggregate data types;
- in-memory representation of different data types;
- direct access to components;
- basic array operations.

**Godziny źródłowe, studia stacjonarne:** 2 godziny wykładu, 3 godziny ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `aggregate-data-types.md` — agregaty jednorodne i niejednorodne;
- [ ] `arrays.md` — indeksowanie, rozmiar, układ i własności;
- [ ] `records.md` — pola, rekordy, struktury i obiekty danych;
- [ ] `in-memory-representation.md` — wartości, adresy, referencje, ciągłość i ograniczenia modelu;
- [ ] `direct-access.md` — dostęp indeksowy i dostęp do pól;
- [ ] `basic-array-operations.md` — przejście, odczyt, zapis, wstawianie, usuwanie i kopiowanie;
- [ ] `python-list-versus-cpp-arrays.md` — różnice bez fałszywego utożsamiania struktur;
- [ ] `worked-examples.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

---

## Module 04 — Searching, Sorting, and Divide and Conquer

**Zakres źródłowy:**

- linear and binary search;
- sorting methods;
- properties of sorting algorithms;
- computational complexity of algorithms;
- divide-and-conquer;
- the outline of QuickSort;
- index arrays;
- recursive algorithms.

**Godziny źródłowe, studia stacjonarne:** 2 godziny wykładu, 4 godziny ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `linear-search.md`;
- [ ] `binary-search.md`;
- [ ] `sorting-problem-and-order-relations.md`;
- [ ] `elementary-sorting-methods.md`;
- [ ] `properties-of-sorting-algorithms.md` — stabilność, in-place, adaptacyjność i przypadki;
- [ ] `divide-and-conquer.md`;
- [ ] `quicksort.md` — partycjonowanie, rekurencja i przypadki złożoności;
- [ ] `index-arrays.md` — porządek pośredni przez tablicę indeksów;
- [ ] `recursive-searching-and-sorting.md`;
- [ ] `comparative-complexity-analysis.md`;
- [ ] `worked-examples.md`;
- [ ] `python-and-cpp.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

---

## Module 05 — Functions, the Call Stack, and Recursion

**Zakres źródłowy:**

- function interaction with its environment;
- side effects;
- variable behavior on the stack;
- recursive functions;
- anatomy of a recursive call;
- indirect and nested recursion;
- stack-based implementation of recursion;
- problems with recursion;
- recursion versus iteration.

**Godziny źródłowe, studia stacjonarne:** 5 godzin wykładu, 8 godzin ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `functions-and-environment.md` — parametry, wynik i stan otoczenia;
- [ ] `side-effects.md` — mutacja, I/O, globalny stan i funkcje czyste;
- [ ] `call-stack.md` — ramki aktywacji, zmienne lokalne i powroty;
- [ ] `recursive-functions.md`;
- [ ] `anatomy-of-a-recursive-call.md`;
- [ ] `indirect-recursion.md`;
- [ ] `nested-recursion.md`;
- [ ] `explicit-stack-simulation.md`;
- [ ] `recursion-failure-modes.md` — brak przypadku bazowego, głębokość i powtórna praca;
- [ ] `recursion-versus-iteration.md`;
- [ ] `worked-examples.md`;
- [ ] `python-and-cpp.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

---

## Module 06 — Backtracking, Greedy Methods, and Dynamic Data Structures

**Zakres źródłowy:**

- backtracking algorithms;
- methods for improving greedy algorithms: systematic and heuristic;
- dynamic data structures.

**Godziny źródłowe, studia stacjonarne:** 1 godzina wykładu, 4 godziny ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `state-space-search.md` — przestrzeń stanów i drzewo decyzji;
- [ ] `backtracking.md` — wybór, ograniczenie, powrót i kompletność;
- [ ] `greedy-algorithms.md` — decyzje lokalne, własność zachłanna i kontrprzykłady;
- [ ] `systematic-improvement-methods.md` — rozwinięcie dokładnie powiązane ze sformułowaniem źródłowym;
- [ ] `heuristic-improvement-methods.md` — heurystyki, brak gwarancji i ocena wyników;
- [ ] `dynamic-data-structures.md` — struktury zmieniające rozmiar i kształt w czasie wykonania;
- [ ] `worked-examples.md`;
- [ ] `python-and-cpp.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

!!! warning
    `Dynamic data structures` nie zostaną automatycznie zastąpione przez `dynamic programming`. Programowanie dynamiczne może pojawić się wyłącznie jako jawne rozszerzenie, jeśli zostanie później zaakceptowane.

---

## Module 07 — Linked Lists, Stacks, and Queues

**Zakres źródłowy:**

- linear lists;
- LIFO stacks and FIFO queues;
- priority queues;
- doubly linked and circular lists;
- self-organizing lists;
- skip lists;
- selected list-processing algorithms.

**Godziny źródłowe, studia stacjonarne:** 2 godziny wykładu, 5 godzin ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `linear-and-linked-lists.md`;
- [ ] `singly-linked-lists.md`;
- [ ] `doubly-linked-lists.md`;
- [ ] `circular-lists.md`;
- [ ] `stacks.md`;
- [ ] `queues.md`;
- [ ] `priority-queues.md`;
- [ ] `self-organizing-lists.md`;
- [ ] `skip-lists.md`;
- [ ] `list-processing-algorithms.md`;
- [ ] `manual-versus-library-implementations.md`;
- [ ] `worked-examples.md`;
- [ ] `python-and-cpp.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

---

## Module 08 — Binary Trees, AVL Trees, and Heaps

**Zakres źródłowy:**

- fundamental tree concepts;
- binary trees;
- binary-tree traversal;
- binary search trees;
- trees used to implement dictionaries;
- tree balancing;
- AVL trees;
- heaps.

**Godziny źródłowe, studia stacjonarne:** 5 godzin wykładu, 6 godzin ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `tree-terminology.md`;
- [ ] `binary-trees.md`;
- [ ] `tree-representations.md`;
- [ ] `binary-tree-traversal.md` — preorder, inorder, postorder i level-order;
- [ ] `binary-search-trees.md` — wyszukiwanie, wstawianie, usuwanie i degeneracja;
- [ ] `tree-based-dictionaries.md`;
- [ ] `tree-balancing.md`;
- [ ] `avl-trees.md` — wysokość, balance factor i rotacje;
- [ ] `heaps.md` — własność sterty, reprezentacja tablicowa i operacje;
- [ ] `worked-examples.md`;
- [ ] `python-and-cpp.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

---

## Module 09 — Graphs and Depth-First Search

**Zakres źródłowy:**

- graphs;
- graph representation methods;
- analysis of properties of example graphs;
- basic graph operations;
- graph implementation in the form described in the source as an incidence list;
- depth-first search as exhaustive search and its applications;
- examples of DFS applications.

**Godziny źródłowe, studia stacjonarne:** 6 godzin wykładu, 7 godzin ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `graph-definitions.md`;
- [ ] `graph-types-and-properties.md`;
- [ ] `graph-representations.md` — macierz sąsiedztwa, lista sąsiedztwa i lista krawędzi;
- [ ] `incidence-list-source-terminology.md` — zachowanie i wyjaśnienie terminu źródłowego;
- [ ] `basic-graph-operations.md`;
- [ ] `depth-first-search.md` — wersja rekurencyjna i iteracyjna;
- [ ] `dfs-as-exhaustive-search.md`;
- [ ] `dfs-applications.md` — osiągalność, składowe, cykle, ścieżki i labirynty;
- [ ] `worked-examples.md`;
- [ ] `python-and-cpp.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

---

## Module 10 — Computational Complexity and Hard Problems

**Zakres źródłowy:**

- analysis of algorithmic time complexity;
- computational complexity;
- Big O notation;
- examples of complexity calculations;
- computationally hard problems;
- source wording: N- and NP-complete problems.

**Godziny źródłowe, studia stacjonarne:** 6 godzin wykładu, 2 godziny ćwiczeń.

**Planowane strony:**

- [ ] `index.md`;
- [ ] `cost-model-and-input-size.md`;
- [ ] `time-complexity.md`;
- [ ] `space-complexity.md`;
- [ ] `big-o-notation.md` — definicja, intuicja i reguły rachunkowe;
- [ ] `complexity-of-iterative-code.md`;
- [ ] `complexity-of-recursive-code.md`;
- [ ] `complexity-calculation-examples.md`;
- [ ] `comparing-algorithms.md`;
- [ ] `computationally-hard-problems.md`;
- [ ] `complexity-classes-and-source-terminology.md` — wyjaśnienie P, NP, NP-hard i NP-complete przy zachowaniu zapisu źródłowego;
- [ ] `worked-examples.md`;
- [ ] `problems.md`;
- [ ] `review.md`;
- [ ] audyt względem obu sylabusów.

---

# 6. Dodatki przekrojowe

Dodatki powstają wtedy, gdy pierwszy moduł rzeczywiście ich potrzebuje. Nie są pisane z wyprzedzeniem jako oderwane dokumenty.

- [ ] `mathematical-notation.md` — zbiory, sekwencje, sumy, logarytmy i relacje;
- [ ] `pseudocode-reference.md` — spójna składnia używana we wszystkich rozdziałach;
- [ ] `python-cpp-reference.md` — znaczące różnice językowe;
- [ ] `complexity-cheat-sheet.md` — powstanie po pełnym opracowaniu Modułu 10;
- [ ] `glossary.md` — słownik budowany przyrostowo z opracowanych modułów.

---

# 7. Proces iteracyjny dla każdego zagadnienia

Dla każdej strony tematycznej wykonujemy kolejno:

1. [ ] odczyt dokładnego fragmentu polskiego sylabusa;
2. [ ] porównanie z wersją angielską;
3. [ ] zapis zakresu, którego nie wolno pominąć;
4. [ ] plan nagłówków strony;
5. [ ] definicje;
6. [ ] pełna teoria;
7. [ ] przykłady elementarne;
8. [ ] przykłady bardziej złożone;
9. [ ] pseudokod, jeśli dotyczy;
10. [ ] ręczne śledzenie, jeśli dotyczy;
11. [ ] Python, jeśli dotyczy;
12. [ ] C++, jeśli dotyczy;
13. [ ] poprawność i warunki zakończenia, jeśli dotyczy;
14. [ ] złożoność, jeśli dotyczy;
15. [ ] przypadki brzegowe i błędy;
16. [ ] problemy do nauki;
17. [ ] redakcja dydaktyczna;
18. [ ] kontrola kompletności ze źródłem;
19. [ ] kontrola terminologii IT;
20. [ ] budowa strony przez `mkdocs build --strict`.

Nie przechodzimy do następnego zagadnienia tylko dlatego, że istnieje szkic. Zagadnienie musi stanowić samodzielny materiał do nauki.

---

# 8. Definition of Done dla modułu

Moduł można uznać za zakończony tylko wtedy, gdy:

- [ ] wszystkie punkty źródłowe mają jawne miejsce na stronie;
- [ ] wszystkie używane pojęcia mają definicje;
- [ ] teoria jest wystarczająca do samodzielnej nauki;
- [ ] kluczowe algorytmy mają kontrakty i pseudokod;
- [ ] kluczowe algorytmy mają ręczne przykłady;
- [ ] istnieją poprawne implementacje Python i C++, gdy są merytorycznie uzasadnione;
- [ ] opisano poprawność i zakończenie;
- [ ] opisano czas i pamięć;
- [ ] opisano przypadki brzegowe;
- [ ] opisano typowe błędy;
- [ ] istnieją problemy teoretyczne i implementacyjne;
- [ ] istnieje strona powtórzeniowa;
- [ ] terminologia została sprawdzona;
- [ ] treść została porównana z polskim sylabusem;
- [ ] treść została porównana z angielskim sylabusem;
- [ ] `mkdocs build --strict` kończy się powodzeniem;
- [ ] nawigacja i odnośniki działają;
- [ ] moduł został jawnie zatwierdzony przed rozpoczęciem następnego.

---

# 9. Najbliższa iteracja

Po zatwierdzeniu tego planu:

1. [ ] opublikować dokładne kopie obu sylabusów w sekcji `Source syllabus`;
2. [ ] utworzyć strukturę nawigacji dla Modułu 01;
3. [ ] przygotować szczegółowy outline strony `imperative-computation.md`;
4. [ ] napisać pełną pierwszą stronę dydaktyczną;
5. [ ] zweryfikować jej jakość przed kontynuacją kolejnych zagadnień.

Pierwszym właściwym materiałem będzie **Imperative Computation**, a nie ponowne tworzenie ogólnego zbioru zadań.
