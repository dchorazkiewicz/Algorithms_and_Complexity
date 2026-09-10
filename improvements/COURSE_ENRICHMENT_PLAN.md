# Plan wzbogacenia i wyrównania kursu

## Cel

Celem prac nie jest przebudowa kursu od zera ani zwiększanie objętości dla samej objętości. Celem jest wyrównanie modułów, które są obecnie bardziej skondensowane, do standardu dydaktycznego osiągniętego w najmocniejszych częściach kursu, przy zachowaniu pełnego odwzorowania `SYLABUS.md` i `SYLLABUS_EN.md`.

Punktem odniesienia są przede wszystkim wymagania z `CONTENT_REQUIREMENTS.md`:

- student powinien móc nauczyć się tematu bez dodatkowego wykładu;
- ważne algorytmy powinny mieć jasno określony problem i kontrakt;
- teoria powinna poprzedzać kod;
- tam, gdzie ma to znaczenie, powinny pojawić się pseudokod, ręczne śledzenie, argument poprawności, argument zakończenia oraz analiza czasu i pamięci;
- przykłady mają wyjaśniać decyzje, a nie tylko pokazywać wynik;
- powinny być widoczne przypadki brzegowe, typowe błędy i błędne intuicje;
- moduł powinien kończyć się materiałem do samokontroli i problemami wymagającymi rozumowania;
- porównania Python/C++ mają być używane wtedy, gdy różnice językowe niosą rzeczywistą wartość dydaktyczną.

## Zakres

Do wyrównania wybrano trzy moduły:

1. `06-backtracking-greedy-and-dynamic-structures`
2. `07-lists-stacks-queues-and-priority-queues`
3. `10-computational-complexity-and-hard-problems`

Pozostałe moduły nie wymagają obecnie przebudowy. Mogą być później objęte osobnym audytem redakcyjnym, ale nie należą do bieżącego zakresu.

## Zasady realizacji

Prace mają być prowadzone iteracyjnie. Nie należy modyfikować całego modułu w jednym kroku.

Dla każdego modułu obowiązuje kolejność:

1. sprawdzenie aktualnego `index.md` i mapy tematów względem sylabusa;
2. wybranie pierwszego rozdziału wymagającego pogłębienia;
3. rozbudowa jednego rozdziału;
4. sprawdzenie spójności z sąsiednimi rozdziałami;
5. dopiero potem przejście do kolejnego rozdziału;
6. po rozbudowie części merytorycznej — aktualizacja `worked-examples.md`;
7. następnie synchronizacja `review.md`;
8. na końcu audyt całego modułu względem sylabusa i `CONTENT_REQUIREMENTS.md`.

Nie należy zmieniać poprawnej treści tylko po to, aby ujednolicić długość plików.

---

# Module 06 — Backtracking, Greedy Methods, and Dynamic Structures

## Cel modułu po rozbudowie

Moduł powinien stać się pełnym wykładem o eksploracji przestrzeni rozwiązań, backtrackingu, pruning, metodach zachłannych i ich uzasadnianiu, metodach ulepszania rozwiązań oraz roli dynamicznego stanu i dynamicznych struktur danych.

Zakres sylabusa pozostaje nadrzędny:

- backtracking algorithms;
- systematic and heuristic methods for improving greedy algorithms;
- dynamic data structures.

## 06.1 — `01-search-spaces-and-partial-solutions.md`

Do rozbudowy:

- pełniejszy model przestrzeni stanów;
- jawne pojęcia: state, partial solution, choice, constraint, goal state, dead end;
- branching factor i depth jako parametry wpływające na koszt;
- różnica między exhaustive search, depth-first enumeration i backtracking;
- sposób reprezentacji stanu: mutable state vs copied state;
- podstawowy kontrakt procedury przeszukującej;
- mały ręczny przykład drzewa decyzji;
- przykład błędnego modelu stanu i jego naprawa;
- koszt zależny od liczby odwiedzonych stanów.

## 06.2 — `02-the-backtracking-pattern.md`

Obecny przykład permutacji pozostaje.

Dodać drugi pełny przykład, preferencyjnie `N-Queens` albo `Subset Sum`, obejmujący:

- sformułowanie problemu;
- input/output;
- preconditions/postconditions;
- reprezentację stanu;
- pseudokod;
- implementację Python;
- ręczne śledzenie kilku poziomów drzewa;
- inwariant;
- argument poprawności;
- argument zakończenia;
- analizę czasu i pamięci;
- typowe błędy;
- wariant pokazujący koszt kopiowania stanu kontra choose–undo.

## 06.3 — `03-pruning-and-constraint-propagation.md`

Do rozbudowy:

- formalne rozróżnienie pruning, constraint propagation i choice ordering;
- soundness i completeness pruning rule;
- poprawny pruning wynikający z jawnych założeń;
- błędny pruning i kontrprzykład;
- przykład porównujący liczbę eksplorowanych stanów przed i po pruning;
- wpływ pruning na praktyczny czas bez zmiany worst-case complexity;
- przykład propagacji ograniczeń;
- pytania diagnostyczne o to, kiedy pruning może usunąć poprawne rozwiązanie.

## 06.4 — `04-greedy-construction.md`

Do rozbudowy:

- pełny przykład algorytmu zachłannego z rzeczywistą gwarancją poprawności;
- preferowany przykład: activity selection / interval scheduling;
- kontrakt algorytmu;
- greedy choice property;
- exchange argument krok po kroku;
- ręczny przykład działania;
- przykład podobnego, lecz błędnego kryterium zachłannego;
- analiza czasu i pamięci;
- rozróżnienie: greedy method vs heuristic.

## 06.5 — `05-improving-greedy-solutions.md`

Do rozbudowy:

- wyraźne rozdzielenie systematic improvement i heuristic improvement;
- definicja neighbourhood;
- local optimum vs global optimum;
- evaluation function;
- acceptance rule;
- stopping condition;
- hill climbing / local improvement jako przykład;
- przykład, w którym lokalne optimum nie jest globalne;
- możliwość random restart lub zmiany neighbourhood jako kontekst, bez rozszerzania kursu poza potrzebny zakres;
- jasne określenie gwarancji i braku gwarancji.

## 06.6 — `06-dynamic-data-structures.md`

Rozdział powinien pełnić rolę pomostu do Module 07.

Do rozbudowy:

- fixed-size vs dynamically changing representation;
- contiguous growth vs linked growth;
- koszt realokacji;
- amortised cost na intuicyjnym poziomie;
- references/pointers i wpływ mutacji stanu;
- Python list jako dynamic array — bez utożsamiania go z abstrakcyjną listą liniową;
- C++ `std::vector` jako porównanie tam, gdzie pomaga wyjaśnić capacity/reallocation;
- wprowadzenie do struktur węzłowych jako zapowiedź Module 07;
- konsekwencje dla kontraktów i aliasingu.

## 06.7 — `07-worked-examples.md`

Docelowo dodać lub rozbudować pełne case studies:

1. backtracking z pruning;
2. poprawny algorytm greedy z uzasadnieniem;
3. metoda heuristic/local improvement z jawnym brakiem gwarancji optimum.

Każdy przykład powinien łączyć problem, reprezentację, algorytm, trace, argument jakości/poprawności i koszt.

## 06.8 — `review.md`

Obecny review jest mocny. Po rozbudowie rozdziałów:

- zsynchronizować terminologię;
- dodać pytania związane z nowym pełnym przykładem backtrackingowym;
- dodać jedno zadanie wymagające exchange argument;
- dodać jedno zadanie rozróżniające pruning od heuristic choice ordering;
- sprawdzić, czy review rzeczywiście testuje wszystkie wymagania sylabusa dla Module 06.

## Kryterium ukończenia Module 06

Moduł uznajemy za wyrównany, gdy student potrafi:

- modelować problem jako przestrzeń stanów;
- napisać i uzasadnić choose–explore–undo;
- wyjaśnić poprawność pruning rule;
- odróżnić exact search, greedy algorithm i heuristic improvement;
- przeprowadzić prosty exchange argument;
- wyjaśnić koszt dynamicznej reprezentacji stanu;
- rozwiązać zadania z review bez konieczności korzystania z zewnętrznego wykładu.

---

# Module 07 — Lists, Stacks, Queues, and Priority Queues

## Cel modułu po rozbudowie

Student powinien rozumieć struktury nie jako nazwy kontenerów bibliotecznych, lecz jako abstrakcyjne typy danych i konkretne reprezentacje z określonymi inwariantami, kosztami, semantyką pamięci i konsekwencjami implementacyjnymi.

Zakres sylabusa:

- linear linked lists;
- LIFO stacks;
- FIFO queues;
- priority queues;
- doubly linked lists;
- circular lists;
- self-organising lists;
- skip lists;
- selected list-processing algorithms.

## 07.1 — `01-linear-lists-as-abstract-sequences.md`

Do rozbudowy:

- ADT vs representation;
- array-based sequence vs linked sequence;
- koszt dostępu, wyszukiwania, insert/delete;
- representation invariant;
- jawne rozróżnienie Python `list` od linked list;
- tabela decyzji: kiedy która reprezentacja jest odpowiednia.

## 07.2 — `02-singly-linked-lists.md`

Obecna część Python pozostaje bazą.

Dodać pełniejsze porównanie Python ↔ C++:

- references w Pythonie;
- pointers w C++;
- `nullptr`;
- node lifetime;
- ownership;
- destrukcja/usuwanie węzłów;
- copy vs shared structure;
- zachowanie `head` i `tail`;
- przypadki empty/one-node/many-nodes;
- pełny trace odwracania listy;
- kontrakty dla insertion/deletion/reversal;
- wpływ wyszukiwania na całkowity koszt operacji.

## 07.3 — `03-doubly-linked-and-circular-lists.md`

Do rozbudowy:

- pełne inwarianty `prev`/`next`;
- inwariant head/tail;
- circular invariant;
- empty list i one-node list;
- insert przed/po węźle;
- deletion head/tail/middle;
- ręczny trace zmian referencji;
- przykłady błędów prowadzących do zerwania listy lub cyklu;
- Python/C++ tam, gdzie różnice wskaźników i własności są istotne.

## 07.4 — `04-stacks.md`

Do rozbudowy:

- stack jako ADT niezależny od implementacji;
- array-based stack vs linked stack;
- Python `list`;
- C++ `std::vector` i `std::stack` jako przykłady;
- push/pop/top i ich koszty;
- amortised append;
- underflow;
- reprezentacyjne inwarianty;
- kiedy stack jest częścią algorytmu, a kiedy implementuje call stack / pending work.

## 07.5 — `05-queues.md`

Do rozbudowy:

- queue jako ADT;
- dlaczego `list.pop(0)` w Pythonie jest kosztowne;
- `collections.deque`;
- linked queue;
- circular buffer;
- head/tail indices;
- C++ `std::queue` jako interfejs;
- worst-case vs amortised cost;
- trace enqueue/dequeue;
- boundary cases i underflow.

## 07.6 — `06-priority-queues.md`

Do rozbudowy:

- priority queue jako ADT, nie synonim heap;
- unsorted list representation;
- sorted list representation;
- binary heap representation;
- tabela kosztów insert/find-min-or-max/remove-min-or-max;
- stabilność przy równych priorytetach jako opcjonalny aspekt kontraktu;
- zastosowania i dobór reprezentacji;
- połączenie z Module 08, gdzie heap będzie rozwinięty pełniej.

## 07.7 — `07-self-organising-and-skip-lists.md`

To jeden z priorytetowych rozdziałów do pogłębienia.

Dodać:

- move-to-front;
- transpose;
- frequency-count heuristic;
- kiedy self-organising list może być użyteczna;
- brak uniwersalnej gwarancji poprawy;
- skip list: levels i probabilistic promotion;
- expected search complexity;
- intuicyjne wyjaśnienie losowości;
- różnica worst-case vs expected cost;
- przykład ręcznego wyszukiwania w skip list;
- porównanie z balanced BST jako kontekst, bez duplikowania Module 08.

## 07.8 — `08-selected-list-algorithms.md`

Do wzbogacenia o kompletne algorytmy, np.:

- linked-list reversal;
- merge dwóch uporządkowanych list;
- cycle detection (Floyd) jako wartościowy przykład two-pointer technique;
- znalezienie środka listy;
- ewentualnie stabilne usuwanie duplikatów.

Nie trzeba dodawać wszystkich. Wybrać zestaw, który najlepiej pokrywa reasoning, invariants, pointer/reference updates i complexity.

## 07.9 — `09-worked-examples.md`

Rozbudować jako integrację modułu:

- co najmniej jeden pełny przykład linked-list mutation;
- jeden przykład stack/queue jako części większego algorytmu;
- jeden przykład wyboru między kilkoma reprezentacjami;
- jeden przykład porównujący Python i C++ tam, gdzie semantyka pamięci rzeczywiście zmienia sposób myślenia o implementacji.

## 07.10 — `review.md`

Po rozbudowie:

- dodać więcej trace'ów zmian links/pointers;
- dodać pytania o reprezentacyjne inwarianty;
- dodać problem typu „wybierz strukturę i uzasadnij koszty”;
- dodać problem dotyczący expected complexity skip lists;
- sprawdzić kompletność względem wszystkich elementów bloku 7 sylabusa.

## Wizualizacje

Moduł już korzysta z interaktywnych wizualizacji. Przy rozbudowie preferować wizualizacje tam, gdzie rzeczywiście pomagają śledzić zmianę stanu:

- singly linked list;
- doubly/circular list;
- stack;
- queue.

Nie dodawać wizualizacji tylko dla dekoracji.

## Kryterium ukończenia Module 07

Student powinien umieć:

- oddzielić ADT od reprezentacji;
- wyprowadzić koszt operacji z reprezentacji;
- ręcznie śledzić zmiany links/references/pointers;
- utrzymać inwariant singly/doubly/circular list;
- dobrać reprezentację stack/queue/priority queue;
- wyjaśnić różnice Python/C++ w istotnych miejscach;
- rozumieć intuicję expected complexity skip lists.

---

# Module 10 — Computational Complexity and Hard Problems

## Cel modułu po rozbudowie

Moduł powinien być pełnym, końcowym wykładem kursu: od wyboru modelu kosztu i rozmiaru wejścia, przez analizę pętli i rekurencji, po tractability, P/NP i redukcje.

Zakres sylabusa:

- analysis of algorithmic time complexity;
- computational complexity;
- Big O notation;
- examples of complexity calculations;
- computationally hard problems;
- standard interpretation of the source phrase `N- and NP-complete problems` through P, NP, NP-hard and NP-complete.

## 10.1 — `01-cost-models-and-input-size.md`

Do rozbudowy:

- dlaczego definicja input size zależy od problemu;
- liczba elementów vs wartość liczby vs bit-length;
- cost model;
- dominant operation;
- time vs auxiliary space vs output cost;
- output-sensitive complexity;
- intuicyjne wprowadzenie do RAM model;
- przykłady błędnie dobranego `n`;
- przypadek, w którym ten sam kod ma inną interpretację kosztu zależnie od modelu.

## 10.2 — `02-asymptotic-notation.md`

Do rozbudowy:

- formalniejsze definicje Big O, Big Omega i Big Theta;
- dobór `c` i `n0` na prostych przykładach;
- upper bound vs tight bound;
- typowe błędy zapisu;
- porządkowanie klas wzrostu;
- relacja między asymptotyką a realnym czasem wykonania;
- kilka krótkich ćwiczeń z uzasadnieniem, nie tylko odpowiedzią.

## 10.3 — `03-counting-iterative-algorithms.md`

Dodać pełne przykłady liczenia:

- pojedyncza pętla;
- kolejne niezależne pętle;
- prostokątne nested loops;
- zależne/triangular loops;
- logarithmic loop;
- `n log n` pattern;
- pętla o kroku rosnącym geometrycznie;
- adjacency-list traversal jako przykład, że syntaktyczne zagnieżdżenie nie oznacza automatycznie `O(n^2)`.

Każdy przykład powinien pokazać tok wyprowadzenia.

## 10.4 — `04-recursive-complexity-and-recurrences.md`

Priorytetowy rozdział do pogłębienia.

Dodać:

- jak budować recurrence z kodu;
- expansion/unrolling;
- substitution;
- recursion tree;
- Master Theorem na poziomie adekwatnym do kursu;
- przykłady:
  - binary search;
  - factorial / linear recursion;
  - naive Fibonacci;
  - merge sort;
  - balanced divide-and-conquer;
  - Quicksort best/worst-case jako połączenie z Module 04;
- osobne omówienie recursion depth vs total work;
- auxiliary stack space.

## 10.5 — `05-growth-classes-and-scalability.md`

Do rozbudowy:

- constant/logarithmic/linear/linearithmic/quadratic/polynomial/exponential/factorial;
- practical scalability;
- constants i crossover points;
- dlaczego asymptotycznie lepszy algorytm nie zawsze wygrywa dla małego `n`;
- polynomial vs exponential growth;
- przykładowa tabela wzrostu dla kilku wartości `n`;
- oddzielenie theoretical tractability od practical performance.

## 10.6 — `06-cases-and-amortised-analysis.md`

Wyraźnie rozdzielić:

- best case;
- worst case;
- average case;
- expected complexity;
- amortised complexity.

Dodać:

- wymaganie modelu probabilistycznego dla average/expected;
- dynamic-array append jako główny przykład amortised analysis;
- multipop stack jako drugi przykład;
- aggregate analysis;
- opcjonalnie intuicję accounting/potential method bez nadmiernego formalizmu;
- typowe błędne utożsamienia average i amortised.

## 10.7 — `07-tractability-and-hard-problems.md`

Do rozbudowy:

- decision/search/optimisation formulations;
- tractability jako pojęcie teoretyczne;
- pseudopolynomial algorithms;
- exponential search space;
- dlaczego duża liczba kandydatów nie dowodzi NP-hardness;
- przykłady problem families o różnej trudności;
- relacja encoding/input size do pseudopolynomial time.

## 10.8 — `08-p-np-reductions-and-completeness.md`

Obecne definicje pozostają bazą.

Dodać co najmniej dwa pełne przykłady redukcji krok po kroku. Każdy przykład musi zawierać:

1. problem źródłowy;
2. problem docelowy;
3. konstrukcję instancji;
4. dowód polynomial construction time;
5. dowód yes → yes;
6. dowód no → no albo równoważność iff;
7. jasne wskazanie kierunku redukcji;
8. informację, co redukcja pozwala wnioskować;
9. informację, czego sama redukcja jeszcze nie dowodzi.

Preferowane przykłady:

- Hamiltonian Cycle → TSP Decision;
- 3-SAT → problem grafowy albo prostsza redukcja dobrana tak, aby była dydaktycznie przejrzysta.

Nie należy wybierać drugiej redukcji wyłącznie ze względu na prestiż problemu; ważniejsza jest przejrzystość konstrukcji dla studenta tego kursu.

## 10.9 — `09-worked-examples.md`

Znacząco rozbudować.

Docelowo powinien zawierać:

- 4–6 pełnych analiz złożoności;
- co najmniej jeden przykład rekurencyjny rozwiązany więcej niż jedną metodą;
- jedną pełną amortised analysis;
- co najmniej dwie pełne redukcje lub jedno pełne studium redukcji i drugie jako problem prowadzony;
- przykłady błędnych analiz i ich naprawę.

## 10.10 — `review.md`

Review jest już mocny.

Po rozbudowie:

- zsynchronizować zadania z przykładami w rozdziałach;
- dodać zadanie z formalnym użyciem `O/Ω/Θ`;
- dodać recurrence wymagające wyboru metody rozwiązania;
- dodać pełny reduction-audit problem;
- zachować obecne zadania obalające typowe błędne twierdzenia.

## Kryterium ukończenia Module 10

Student powinien potrafić:

- poprawnie zdefiniować input size i cost model;
- ręcznie wyprowadzić koszt standardowych pętli;
- zbudować i rozwiązać prostą recurrence;
- odróżnić time, auxiliary space i output cost;
- poprawnie używać `O`, `Ω`, `Θ`;
- rozróżniać best/worst/average/expected/amortised;
- wyjaśnić tractability i pseudopolynomial time;
- zdefiniować P, NP, NP-hard i NP-complete;
- przeczytać kierunek redukcji poprawnie;
- przeprowadzić prostą redukcję wraz z jej obowiązkami dowodowymi;
- wyjaśnić, czego NP-completeness nie dowodzi.

---

# Kolejność realizacji

## Etap A — Module 06

Realizować rozdziały w kolejności `01` → `07`, następnie `review.md`, a na końcu audyt modułu.

Po audycie Module 06 zatrzymać się i ocenić, czy osiągnięty poziom jest właściwym wzorcem dla Module 07.

## Etap B — Module 07

Realizować rozdziały kolejno, ze szczególnym naciskiem na:

- ADT vs representation;
- Python ↔ C++ tam, gdzie ważna jest pamięć/referencje/wskaźniki;
- trace zmian struktury;
- operation costs wynikające z reprezentacji.

Następnie `worked-examples.md`, `review.md` i audyt modułu.

## Etap C — Module 10

Realizować od podstaw cost model i asymptotykę do redukcji.

Najwyższy priorytet merytoryczny:

1. recurrence solving;
2. amortised analysis;
3. formalniejsze `O/Ω/Θ`;
4. pełne redukcje;
5. worked examples integrujące cały moduł.

Na końcu zsynchronizować review i wykonać końcowy audyt względem sylabusa.

---

# Kontrola postępu

Statusy będą aktualizowane dopiero po rzeczywistym wykonaniu i sprawdzeniu danego kroku.

- [ ] Module 06 — enrichment completed
- [ ] Module 06 — syllabus/content audit completed
- [ ] Module 07 — enrichment completed
- [ ] Module 07 — syllabus/content audit completed
- [ ] Module 10 — enrichment completed
- [ ] Module 10 — syllabus/content audit completed
- [ ] Final cross-module consistency audit completed

## Reguła zatrzymania

Po zakończeniu każdego modułu należy zatrzymać realizację i ocenić wynik przed przejściem do następnego. Nie wykonywać automatycznie całego planu jednym ciągiem.

## Reguła zmian

Każda zmiana powinna odpowiadać na konkretne pytanie dydaktyczne: czego student obecnie nie może wystarczająco dobrze zrozumieć, prześledzić, uzasadnić albo przećwiczyć?

Jeżeli istniejący fragment już spełnia standard, pozostaje bez zmian.
