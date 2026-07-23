# Wymagania redakcyjne dla materiałów dydaktycznych

## 1. Główny cel repozytorium

Repozytorium ma być **pełnym kursem do samodzielnej nauki przedmiotu Algorytmy i złożoność**.

Podstawowym odbiorcą jest osoba, która chce:

- nauczyć się materiału od podstaw;
- zrozumieć definicje, modele i zależności;
- przygotować pełny wykład;
- przygotować się do ćwiczeń, kolokwium lub egzaminu;
- przejść od teorii do poprawnej implementacji w Pythonie i C++;
- umieć wyjaśnić poprawność i złożoność rozwiązania.

Strona nie jest dokumentacją procesu tworzenia repozytorium. MkDocs, GitHub Actions, checklisty techniczne i struktura plików są wyłącznie zapleczem.

## 2. Dokumenty źródłowe

Zakres, kolejność i wymagany poziom pokrycia wyznaczają:

1. `SYLABUS.md` — podstawowe źródło znaczenia i zakresu;
2. `SYLLABUS_EN.md` — źródło profesjonalnej terminologii Computer Science;
3. niniejszy dokument — zasady opracowania materiału dydaktycznego.

Nie wolno pomijać wymagania sylabusa, zastępować go innym tematem ani ukrywać go przez zbyt ogólne połączenie kilku zagadnień.

## 3. Cele kursu wynikające z sylabusa

Cała strona ma prowadzić do trzech nadrzędnych celów:

1. rozwiązywania problemów przez poprawne projektowanie algorytmów;
2. teoretycznego i praktycznego posługiwania się złożonymi strukturami danych;
3. oceny klas algorytmów i szacowania ich złożoności obliczeniowej.

## 4. Efekty uczenia się, które muszą być widoczne w materiałach

Materiały muszą doprowadzić studenta do tego, aby potrafił:

- wyjaśnić różnice we własnościach, budowie, działaniu i efektywności algorytmów iteracyjnych i rekurencyjnych;
- poprawnie wykorzystywać tablice, listy liniowe, drzewa i grafy;
- szacować złożoność obliczeniową algorytmów;
- zapisać rozwiązanie problemu jako algorytm z precondition i postcondition;
- wykorzystywać typy proste i złożone, w tym tablice, listy jedno- i dwukierunkowe, stosy, kolejki, drzewa binarne, sterty i grafy;
- szacować w notacji Big O złożoność prostych algorytmów iteracyjnych;
- poprawiać rozwiązania na podstawie informacji zwrotnej;
- precyzyjnie opisywać trudności napotkane podczas projektowania i implementacji rozwiązania.

Efekty te nie mogą istnieć wyłącznie jako lista na stronie głównej. Muszą być realizowane przez definicje, wyjaśnienia, przykłady, problemy i pytania kontrolne w odpowiednich modułach.

## 5. Kolejność kursu

Przed oficjalnymi blokami sylabusa powstaje **Moduł 00 — Learning to Think Algorithmically**. Jest to moduł przygotowawczy wynikający z celów i efektów uczenia się, a nie dodatkowy blok zastępujący treść sylabusa. Uczy sposobu czytania, projektowania, uzasadniania i analizowania algorytmów.

Następnie materiały są rozwijane dokładnie w kolejności dziesięciu bloków sylabusa:

1. przetwarzanie imperatywne, preconditions, postconditions, reprezentacje algorytmu, cechy algorytmów, pseudokod i strukturalizacja;
2. iteracja, warunki stopu, rekurencja, konstruowanie poprawnego algorytmu, typy proste i złożone;
3. tablice, rekordy, reprezentacja danych w pamięci, dostęp bezpośredni i operacje na tablicach;
4. wyszukiwanie, sortowanie, złożoność, divide and conquer, Quicksort, tablice indeksowe i algorytmy rekurencyjne;
5. funkcje, efekty uboczne, stos wywołań i pełne zagadnienia rekurencji;
6. backtracking, metody zachłanne, podejścia systematyczne i heurystyczne oraz dynamiczne struktury danych;
7. listy, stosy, kolejki, kolejki priorytetowe, listy dwukierunkowe, cykliczne, samoorganizujące i skip lists;
8. drzewa binarne, przechodzenie drzew, BST, słowniki, równoważenie, AVL i sterty;
9. grafy, reprezentacje, własności, operacje, lista incydencji/sąsiedztwa, DFS i jego zastosowania;
10. analiza złożoności czasowej, złożoność obliczeniowa, Big O, przykłady obliczeń i problemy trudne obliczeniowo.

## 6. Standard merytorycznego rozdziału

Każdy ważny temat powinien zawierać, zależnie od charakteru zagadnienia:

1. motywację — po co temat istnieje i jaki problem rozwiązuje;
2. precyzyjne definicje;
3. notację i terminologię;
4. model pojęciowy lub operacyjny;
5. pełne wyjaśnienie teorii;
6. własności i zależności;
7. przykłady podstawowe;
8. przykłady kontrastujące poprawne i błędne intuicje;
9. kontrakt algorytmu: input, output, preconditions, postconditions i side effects;
10. pseudokod;
11. ręczne śledzenie wykonania;
12. argument poprawności;
13. argument zakończenia, jeżeli występuje iteracja lub rekurencja;
14. analizę złożoności czasowej i pamięciowej;
15. implementację w Pythonie;
16. implementację w C++ tam, gdzie porównanie języków wnosi istotną wiedzę;
17. wyjaśnienie różnic między implementacjami;
18. przypadki brzegowe;
19. typowe błędy i błędne intuicje;
20. pytania do samokontroli;
21. problemy do samodzielnego rozwiązania;
22. podsumowanie pojęć i powiązań.

Kod nie może zastępować teorii. Zadania nie mogą zastępować wyjaśnienia. Streszczenie nie może zastępować pełnego rozdziału.

## 7. Forma strony dla studenta

Publiczna nawigacja strony powinna prowadzić przez materiał do nauki:

- strona główna kursu;
- spis treści i ścieżka nauki;
- Moduł 00;
- moduły 01–10 w kolejności sylabusa;
- strony tematyczne;
- przykłady;
- problemy;
- powtórzenie;
- dodatki i słownik.

Publiczna nawigacja nie powinna eksponować:

- planu rozwoju repozytorium;
- checklist technicznych;
- historii wdrożeń;
- statusów commitów;
- instrukcji GitHub Actions;
- technicznych decyzji redakcyjnych.

Dokumenty źródłowe sylabusa mogą pozostać dostępne na końcu nawigacji jako materiały referencyjne, ale nie jako główna ścieżka uczenia się.

## 8. Zasady językowe i przykłady programistyczne

- Materiały dydaktyczne są tworzone po angielsku zgodnie z zatwierdzonym kierunkiem projektu.
- Terminologia ma odpowiadać standardowemu językowi Computer Science.
- Polski sylabus kontroluje znaczenie i zakres.
- Niejasności źródłowe należy jawnie omówić, a nie cicho poprawiać.
- Narracyjne przykłady są domyślnie pisane w Pythonie, aby nie przesłaniać idei algorytmicznej składnią i mechaniką języka.
- C++ jest wprowadzany w dedykowanych porównaniach, gdy istotne są typy, reprezentacja pamięci, semantyka wartości, referencje, wskaźniki, własność zasobów, kontenery lub koszty operacji.
- Nie należy przeplatać każdego akapitu równoległym kodem Python/C++, jeżeli utrudnia to czytanie wykładu.

## 9. Kryterium ukończenia modułu

Moduł jest ukończony dopiero wtedy, gdy:

- każde wymaganie źródłowe ma pełne wyjaśnienie;
- wszystkie istotne definicje są jawne;
- student może nauczyć się tematu bez zewnętrznego wykładu;
- ważne algorytmy mają kontrakt, pseudokod, śledzenie, poprawność, zakończenie i złożoność;
- przykłady programistyczne wspierają teorię zamiast ją zastępować;
- porównania Python/C++ wyjaśniają ten sam algorytm i realne różnice językowe;
- istnieją problemy wymagające rozumowania, a nie tylko kopiowania kodu;
- strona zawiera powtórzenie i pytania kontrolne;
- wykonano audyt względem `SYLABUS.md` i `SYLLABUS_EN.md`;
- materiał techniczny nie przesłania treści merytorycznej.

## 10. Reguła dalszej pracy

Pracujemy iteracyjnie:

1. jeden moduł;
2. jedno zagadnienie;
3. pełny merytoryczny rozdział;
4. przegląd zgodności z sylabusem;
5. korekta;
6. dopiero potem następne zagadnienie.

Priorytetem jest jakość i kompletność materiału do nauki, nie liczba utworzonych plików.

## 11. Reguła narracji książkowej

Każda publiczna strona ma być czytelnym fragmentem książki lub wykładu, a nie opisem katalogu, planem pracy autora ani techniczną checklistą.

Rozdział powinien:

- zaczynać się od problemu, pytania lub motywacji;
- prowadzić czytelnika od intuicji do definicji i modelu;
- wyjaśniać, dlaczego kolejne pojęcie jest potrzebne;
- rozwijać jeden spójny tok rozumowania;
- używać kodu dopiero po wyjaśnieniu idei;
- komentować decyzje w przykładach, a nie tylko prezentować wynik;
- budować przejście do następnego zagadnienia;
- kończyć się jasnym zestawem rzeczy, które student musi umieć wyjaśnić.

Strony startowe modułów mają pełnić rolę wstępu do części książki: przedstawiać sens modułu, zależności między rozdziałami, wymagane kompetencje i kolejność nauki. Nie mogą zawierać statusów developmentu ani checklist autora.
