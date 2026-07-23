# Plan iteracyjnego tworzenia materiałów do ćwiczeń

## 1. Cel projektu

Celem jest przygotowanie kompletnej paczki materiałów do ćwiczeń z przedmiotu **Algorithms and Complexity**.

Materiały mają:

- wyjaśniać teorię potrzebną do wykonania ćwiczeń;
- prowadzić studenta od pojęcia do działającej implementacji;
- zawierać pseudokod, przykłady ręcznego śledzenia i analizę złożoności;
- prezentować implementacje w Pythonie i C++;
- zawierać przykłady rozwiązane, ćwiczenia prowadzone i zadania samodzielne;
- pokrywać cały zakres merytoryczny określony w `SYLABUS.md` oraz `SYLLABUS_EN.md`;
- powstawać iteracyjnie, moduł po module i sekcja po sekcji.

Dokumentami źródłowymi są:

- `SYLABUS.md` — wiernie odfiltrowana wersja polska;
- `SYLLABUS_EN.md` — angielska wersja oparta na tej samej strukturze i profesjonalnej terminologii IT.

Materiały dydaktyczne nie mogą zmieniać znaczenia wymagań źródłowych. Komentarze, rozszerzenia i dodatkowe zagadnienia muszą być wyraźnie oznaczone jako materiały dodatkowe.

---

## 2. Zasada pracy iteracyjnej

Nie tworzymy całego kursu jednocześnie.

Dla każdego modułu pracujemy w następującym cyklu:

1. ustalenie zakresu na podstawie sylabusa;
2. przygotowanie krótkiego planu modułu;
3. napisanie teorii;
4. przygotowanie pseudokodu i przykładów śledzonych ręcznie;
5. przygotowanie przykładów w Pythonie;
6. przygotowanie odpowiedników w C++;
7. przygotowanie przykładów rozwiązanych;
8. przygotowanie ćwiczeń prowadzonych;
9. przygotowanie zadań samodzielnych;
10. przygotowanie pytań kontrolnych;
11. przygotowanie materiałów dla prowadzącego;
12. przegląd zgodności z sylabusem;
13. zatwierdzenie modułu;
14. przejście do kolejnego modułu.

Każdy etap zostaje oznaczony checkboxem. Nie przechodzimy do następnego dużego modułu, dopóki bieżący moduł nie ma zaakceptowanej wersji podstawowej.

---

## 3. Reguły rozdzielenia treści

W materiałach stosujemy cztery oznaczenia:

- **Required** — treść wynikająca bezpośrednio z sylabusa;
- **Explanation** — objaśnienie dydaktyczne wymaganej treści;
- **Example** — przykład ilustrujący zagadnienie;
- **Extension** — materiał dodatkowy niewymagany bezpośrednio przez sylabus.

Nie wolno przedstawiać treści dodatkowej jako wymagania formalnego.

---

## 4. Docelowa struktura repozytorium

```text
Algorithms_and_Complexity/
├── README.md
├── SYLABUS.md
├── SYLLABUS_EN.md
├── MATERIALS_DEVELOPMENT_PLAN.md
├── SYLLABUS_TRACEABILITY.md
│
├── course/
│   ├── 00_course_guide/
│   ├── 01_algorithm_foundations/
│   ├── 02_iteration_and_recursion/
│   ├── 03_arrays_records_and_memory/
│   ├── 04_searching_and_sorting/
│   ├── 05_functions_stack_and_recursion/
│   ├── 06_algorithm_design_strategies/
│   ├── 07_linked_lists_stacks_and_queues/
│   ├── 08_trees_avl_and_heaps/
│   ├── 09_graphs_and_dfs/
│   └── 10_computational_complexity/
│
├── shared/
│   ├── glossary_en_pl.md
│   ├── pseudocode_conventions.md
│   ├── python_cpp_mapping.md
│   ├── complexity_reference.md
│   └── coding_standards.md
│
├── assignments/
│   ├── formative/
│   ├── laboratory/
│   └── tests/
│
└── instructor/
    ├── solutions/
    ├── lesson_plans/
    ├── grading_rubrics/
    └── common_misconceptions/
```

Struktura może być korygowana w trakcie prac, ale zmiany muszą być odnotowane w tym dokumencie.

---

## 5. Standard pojedynczego modułu

Każdy moduł powinien docelowo zawierać:

```text
XX_module_name/
├── README.md
├── theory.md
├── worked_examples.md
├── guided_exercises.md
├── independent_tasks.md
├── self_check.md
├── python/
│   ├── examples/
│   ├── exercises/
│   └── tests/
├── cpp/
│   ├── examples/
│   ├── exercises/
│   └── tests/
└── instructor/
    ├── lesson_plan.md
    ├── solutions.md
    ├── grading_notes.md
    └── misconceptions.md
```

### Minimalna zawartość `theory.md`

- cele modułu;
- wymagania wstępne;
- podstawowe pojęcia;
- motywacja i zastosowania;
- kontrakt algorytmu: input, output, precondition, postcondition;
- wyjaśnienie mechanizmu krok po kroku;
- pseudokod;
- przypadki brzegowe;
- poprawność rozwiązania;
- złożoność czasowa i pamięciowa;
- typowe błędy;
- różnice istotne dla Pythona i C++;
- podsumowanie.

### Minimalna zawartość przykładów programistycznych

Każdy ważny algorytm powinien mieć:

- wspólny opis problemu;
- wspólny pseudokod;
- implementację Python;
- implementację C++;
- te same dane testowe;
- opis wyniku;
- analizę złożoności;
- komentarz o różnicach językowych.

### Minimalna zawartość ćwiczeń

Każdy moduł powinien zawierać:

- ćwiczenie polegające na ręcznym śledzeniu działania;
- ćwiczenie polegające na uzupełnieniu brakującego fragmentu;
- ćwiczenie implementacyjne;
- ćwiczenie dotyczące przypadków brzegowych;
- ćwiczenie z analizy złożoności;
- ćwiczenie polegające na znalezieniu błędu;
- zadanie wymagające poprawy istniejącego rozwiązania;
- zadanie samodzielne na poziomie podstawowym;
- zadanie samodzielne na poziomie standardowym;
- opcjonalne zadanie rozszerzające.

---

## 6. Definition of Done dla modułu

Moduł można oznaczyć jako zakończony dopiero wtedy, gdy:

- [ ] wszystkie wymagania źródłowe są przypisane do modułu;
- [ ] każde wymagane pojęcie ma wyjaśnienie teoretyczne;
- [ ] każdy kluczowy algorytm ma pseudokod;
- [ ] istnieje co najmniej jeden przykład śledzony ręcznie;
- [ ] istnieją działające przykłady w Pythonie;
- [ ] istnieją odpowiadające im przykłady w C++;
- [ ] przykłady Python i C++ używają zgodnych danych testowych;
- [ ] opisano przypadki brzegowe;
- [ ] opisano poprawność lub uzasadnienie działania;
- [ ] podano złożoność czasową i pamięciową;
- [ ] opisano typowe błędy;
- [ ] przygotowano przykłady rozwiązane;
- [ ] przygotowano ćwiczenia prowadzone;
- [ ] przygotowano zadania samodzielne;
- [ ] przygotowano pytania kontrolne;
- [ ] przygotowano rozwiązania dla prowadzącego;
- [ ] wykonano kontrolę zgodności z `SYLABUS.md`;
- [ ] wykonano kontrolę terminologii względem `SYLLABUS_EN.md`;
- [ ] moduł został zatwierdzony do dalszego użycia.

---

## 7. Plan modułów

## Moduł 00 — Course Guide and Shared Conventions

Zakres organizacyjny:

- sposób korzystania z materiałów;
- konwencje pseudokodu;
- format opisu kontraktu algorytmu;
- standard przykładów Python i C++;
- zasady analizy złożoności;
- sposób oznaczania materiału wymaganego i rozszerzającego;
- słownik terminów polsko-angielskich.

Checklist:

- [ ] utworzyć `course/00_course_guide/README.md`;
- [ ] opisać sposób pracy z materiałami;
- [ ] przygotować `shared/pseudocode_conventions.md`;
- [ ] przygotować `shared/python_cpp_mapping.md`;
- [ ] przygotować `shared/complexity_reference.md`;
- [ ] przygotować `shared/glossary_en_pl.md`;
- [ ] przygotować standard kodowania;
- [ ] zatwierdzić konwencje przed tworzeniem modułów merytorycznych.

## Moduł 01 — Foundations of Algorithm Design

Zakres źródłowy:

- przetwarzanie imperatywne;
- asercja początkowa i końcowa algorytmu;
- postacie algorytmu;
- cechy algorytmów;
- pseudokod;
- podstawowe metody strukturalizacji algorytmów.

Planowana teoria i przykłady:

- problem, algorytm i program;
- input, output i stan programu;
- precondition i postcondition;
- sekwencja, selekcja i iteracja;
- zapis w języku naturalnym, pseudokodzie i kodzie;
- przypadki brzegowe;
- proste przykłady: maksimum, suma, zliczanie, zamiana wartości.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 02 — Iteration and Recursion

Zakres źródłowy:

- pętle iteracyjne;
- warunek stopu;
- rekurencja;
- schemat konstruowania poprawnego algorytmu;
- typy pierwotne i złożone.

Planowana teoria i przykłady:

- pętle `for` i `while`;
- warunek stopu i niezmiennik pętli;
- błędy off-by-one;
- przypadek bazowy i krok rekurencyjny;
- śledzenie wywołań;
- porównanie iteracji i rekurencji;
- silnia, suma zakresu, potęgowanie, algorytm Euklidesa.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 03 — Arrays, Records, and Memory Representation

Zakres źródłowy:

- tablica i rekord jako agregaty danych;
- reprezentacja danych różnych typów w pamięci;
- bezpośredni dostęp do składowych;
- podstawowe operacje na tablicach.

Planowana teoria i przykłady:

- indeksowanie i ciągłość danych;
- tablice statyczne i dynamiczne;
- Python `list`, C++ `std::array` i `std::vector`;
- rekordy: Python `dataclass`, C++ `struct`;
- dostęp, aktualizacja, przechodzenie, wstawianie i usuwanie;
- semantyka wartości, referencje i kopiowanie;
- odwracanie tablicy, przesuwanie elementów i proste statystyki.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 04 — Searching and Sorting

Zakres źródłowy:

- wyszukiwanie liniowe i binarne;
- metody sortowania;
- cechy algorytmów sortowania;
- złożoność obliczeniowa;
- divide and conquer;
- QuickSort;
- tablica indeksowa;
- algorytmy rekurencyjne.

Planowana teoria i przykłady:

- linear search i binary search;
- wymaganie uporządkowanych danych;
- stabilność sortowania;
- in-place i out-of-place;
- przypadek najlepszy, średni i najgorszy;
- bubble sort, selection sort, insertion sort;
- merge sort jako przykład divide and conquer;
- QuickSort;
- sortowanie indeksów bez zmiany danych źródłowych.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 05 — Functions, Call Stack, and Recursion

Zakres źródłowy:

- komunikacja funkcji z otoczeniem;
- efekty uboczne;
- zjawiska na stosie dla zmiennych;
- funkcje rekurencyjne;
- anatomia wywołania rekurencyjnego;
- rekurencja pośrednia i zagnieżdżona;
- implementacja stosowa rekurencji;
- problemy rekurencji;
- rekurencja a iteracja.

Planowana teoria i przykłady:

- argumenty, zwracane wartości i stan zewnętrzny;
- funkcje czyste i efekty uboczne;
- ramka stosu wywołań;
- lokalny stan każdego wywołania;
- stack overflow;
- indirect recursion i nested recursion;
- ręczna symulacja rekurencji za pomocą stosu;
- silnia, Fibonacci, struktury zagnieżdżone.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 06 — Algorithm Design Strategies

Zakres źródłowy:

- algorytmy z powrotami;
- metody usprawniania algorytmów zachłannych;
- metody systematyczne i heurystyczne;
- dynamiczne struktury danych.

Planowana teoria i przykłady:

- exhaustive search;
- backtracking;
- greedy choice;
- heurystyka;
- rozwiązania dokładne i przybliżone;
- statyczne i dynamiczne struktury danych;
- generowanie permutacji;
- N-Queens;
- subset sum w małej skali;
- activity selection;
- coin change jako przykład ograniczeń strategii zachłannej.

Uwaga: programowanie dynamiczne nie jest automatycznie traktowane jako wymaganie tego modułu. Źródło mówi o dynamicznych strukturach danych.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 07 — Linked Lists, Stacks, and Queues

Zakres źródłowy:

- listy liniowe;
- stosy LIFO;
- kolejki FIFO;
- kolejki priorytetowe;
- listy dwukierunkowe i cykliczne;
- listy samoorganizujące;
- listy z przeskokami;
- wybrane algorytmy obsługi list.

Planowana teoria i przykłady:

- węzeł i połączenie;
- listy jednokierunkowe, dwukierunkowe i cykliczne;
- wstawianie, usuwanie i wyszukiwanie;
- referencje w Pythonie i wskaźniki w C++;
- stack i queue jako ADT;
- priority queue;
- self-organizing lists;
- skip lists;
- implementacje edukacyjne i biblioteczne.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 08 — Trees, AVL Trees, and Heaps

Zakres źródłowy:

- podstawowe pojęcia dotyczące drzew;
- drzewa binarne;
- przechodzenie po drzewie;
- binary search tree;
- drzewa jako implementacja słownika;
- równoważenie drzew;
- AVL;
- sterty.

Planowana teoria i przykłady:

- root, parent, child, leaf, depth i height;
- preorder, inorder, postorder i level-order;
- wyszukiwanie, wstawianie i usuwanie w BST;
- degeneracja BST;
- balance factor;
- rotacje AVL;
- heap property;
- heapify, push i pop;
- zastosowanie sterty w kolejce priorytetowej.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 09 — Graphs and Depth-First Search

Zakres źródłowy:

- metody reprezentacji grafu;
- analiza własności grafów;
- podstawowe operacje;
- lista incydencji;
- DFS jako przykład wyszukiwania wyczerpującego;
- zastosowania DFS.

Planowana teoria i przykłady:

- graf skierowany i nieskierowany;
- graf ważony i nieważony;
- wierzchołki, krawędzie, stopień i sąsiedztwo;
- macierz i lista sąsiedztwa;
- lista incydencji zgodnie z terminologią źródła;
- rekurencyjny i iteracyjny DFS;
- zbiór odwiedzonych wierzchołków;
- osiągalność, spójne składowe, wykrywanie cyklu i labirynt.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

## Moduł 10 — Computational Complexity

Zakres źródłowy:

- analiza złożoności czasowej;
- złożoność obliczeniowa;
- notacja O;
- przykłady obliczeń złożoności;
- problemy algorytmicznie trudne;
- problemy N- i NP-zupełne zgodnie z zapisem źródła.

Planowana teoria i przykłady:

- rozmiar wejścia;
- model kosztu;
- operacja dominująca;
- Big O;
- czas i pamięć;
- pętle pojedyncze, sekwencyjne i zagnieżdżone;
- podstawowe klasy złożoności;
- analiza operacji struktur danych;
- podstawowe wprowadzenie do problemów trudnych obliczeniowo;
- osobne oznaczenie ewentualnego komentarza terminologicznego dotyczącego zapisu „N- i NP-zupełne”.

Checklist:

- [ ] plan modułu;
- [ ] teoria;
- [ ] pseudokod;
- [ ] przykłady ręczne;
- [ ] Python;
- [ ] C++;
- [ ] worked examples;
- [ ] guided exercises;
- [ ] independent tasks;
- [ ] self-check;
- [ ] materiały prowadzącego;
- [ ] audyt zgodności;
- [ ] zatwierdzenie modułu.

---

## 8. Macierz zgodności z sylabusem

Należy utworzyć osobny plik `SYLLABUS_TRACEABILITY.md`.

Każdy element źródłowy otrzyma mapowanie do materiałów:

| Wymaganie źródłowe | Moduł | Teoria | Python | C++ | Ćwiczenie | Test | Status |
|---|---|---|---|---|---|---|---|
| Asercja początkowa i końcowa | 01 |  |  |  |  |  | ⬜ |
| Rekurencja | 02/05 |  |  |  |  |  | ⬜ |
| Wyszukiwanie binarne | 04 |  |  |  |  |  | ⬜ |
| Listy z przeskokami | 07 |  |  |  |  |  | ⬜ |
| Drzewo AVL | 08 |  |  |  |  |  | ⬜ |
| DFS | 09 |  |  |  |  |  | ⬜ |
| O-notacja | 10 |  |  |  |  |  | ⬜ |

Pełna macierz zostanie utworzona przed rozpoczęciem produkcji modułów merytorycznych.

---

## 9. Etapy projektu

### Etap A — Fundament projektu

- [x] przygotować wierny polski zapis sylabusa;
- [x] przygotować angielską wersję sylabusa;
- [x] zapisać iteracyjny plan prac;
- [ ] utworzyć macierz zgodności;
- [ ] zatwierdzić strukturę repozytorium;
- [ ] zatwierdzić szablon modułu;
- [ ] przygotować wspólne konwencje.

### Etap B — Moduł pilotażowy

- [ ] przygotować Moduł 01 w pełnym standardzie;
- [ ] przetestować długość i poziom teorii;
- [ ] sprawdzić przydatność na ćwiczeniach;
- [ ] zweryfikować równowagę teoria/praktyka;
- [ ] poprawić szablon na podstawie doświadczeń;
- [ ] zatwierdzić standard dla kolejnych modułów.

### Etap C — Produkcja modułów

- [ ] Moduł 02;
- [ ] Moduł 03;
- [ ] Moduł 04;
- [ ] Moduł 05;
- [ ] Moduł 06;
- [ ] Moduł 07;
- [ ] Moduł 08;
- [ ] Moduł 09;
- [ ] Moduł 10.

### Etap D — Materiały przekrojowe

- [ ] słownik terminów;
- [ ] karta referencyjna złożoności;
- [ ] porównanie struktur Python i C++;
- [ ] zestaw typowych błędów;
- [ ] zbiorczy bank krótkich pytań;
- [ ] bank zadań na kolokwia;
- [ ] kryteria oceniania;
- [ ] rozwiązania dla prowadzącego.

### Etap E — Audyt końcowy

- [ ] sprawdzić pełne pokrycie `SYLABUS.md`;
- [ ] sprawdzić zgodność wersji angielskiej;
- [ ] sprawdzić wszystkie przykłady Python;
- [ ] skompilować wszystkie przykłady C++;
- [ ] porównać wyniki testów Python i C++;
- [ ] sprawdzić kompletność rozwiązań;
- [ ] sprawdzić oznaczenia `Required` i `Extension`;
- [ ] wykonać końcowy przegląd dydaktyczny.

---

## 10. Rejestr postępu

Po każdej iteracji należy dopisać wpis:

```text
## Iteration YYYY-MM-DD

Completed:
- ...

Reviewed:
- ...

Decisions:
- ...

Open questions:
- ...

Next step:
- ...
```

### Iteration — initial planning

Completed:

- przygotowano polską i angielską wersję sylabusa;
- ustalono, że materiały mają zawierać teorię, przykłady oraz zadania;
- ustalono równoległe przykłady Python i C++;
- przygotowano ten plan iteracyjny.

Decisions:

- najpierw powstaje macierz zgodności;
- następnie powstają wspólne konwencje;
- pierwszym kompletnym modułem pilotażowym będzie Moduł 01;
- kolejne moduły powstają dopiero po zatwierdzeniu standardu pilotażu.

Open questions:

- docelowy język głównych materiałów studenckich;
- oczekiwana długość pojedynczego modułu;
- docelowy standard C++;
- sposób uruchamiania i testowania przykładów;
- czy rozwiązania prowadzącego pozostają w tym samym repozytorium.

Next step:

- utworzyć `SYLLABUS_TRACEABILITY.md` i rozpisać pełne mapowanie wymagań źródłowych.
