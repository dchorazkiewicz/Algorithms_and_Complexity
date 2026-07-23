# Audyt treści względem celu kursu i sylabusa

## Status

Audyt wykonano po zatwierdzeniu nowego celu: publiczna strona ma być materiałem do nauki, a nie dokumentacją budowy repozytorium.

## 1. Co jest zgodne z nowym celem

### Zachowane sylabusy

`SYLABUS.md` i `SYLLABUS_EN.md` pozostają właściwymi dokumentami źródłowymi. Zawierają cele kursu, efekty uczenia się i dziesięć bloków treści, które wyznaczają zakres i kolejność materiałów.

### Konfiguracja MkDocs

MkDocs Material i publikacja przez GitHub Pages są odpowiednim zapleczem. Nie wymagają zmian merytorycznych, o ile elementy techniczne nie dominują publicznej strony.

### Rozdział `imperative-computation.md`

Pierwszy rozdział jest zasadniczo zgodny z kierunkiem dydaktycznym. Zawiera definicje, model stanu, przypisanie, control flow, śledzenie, przykłady, kod Python i C++, związek z poprawnością i złożonością, błędy, pytania oraz problemy.

Nie należy go usuwać. Wymaga redakcyjnego dopracowania, a nie ponownego napisania od zera.

## 2. Co trzeba przebudować natychmiast

### 2.1. Strona główna

Obecna strona główna opisuje głównie:

- proces budowy witryny;
- iteracyjny model developmentu;
- aktualny etap prac.

To nie jest właściwy punkt wejścia dla studenta.

Należy zastąpić ją stroną kursu zawierającą:

- cele przedmiotu wynikające z sylabusa;
- efekty uczenia się zapisane jako konkretne kompetencje;
- mapę dziesięciu modułów;
- proponowaną ścieżkę nauki;
- informację, czego student nauczy się w każdym module;
- link do pierwszego dostępnego rozdziału.

### 2.2. Nawigacja MkDocs

Obecna nawigacja eksponuje `Development plan` przed materiałami merytorycznymi. To odwraca priorytety strony.

Należy:

- usunąć plan developmentu z publicznej nawigacji;
- umieścić moduły kursu bezpośrednio po stronie głównej;
- pozostawić sylabusy na końcu jako `Course sources`;
- dodawać kolejne strony tematyczne w kolejności sylabusa.

### 2.3. Strona startowa Modułu 01

Obecna strona modułu zawiera status publikacji, informację o bieżącej iteracji i checklistę ukończenia. Są to informacje redakcyjne, a nie materiał do nauki.

Należy zastąpić je:

- intuicyjnym wprowadzeniem do modułu;
- listą wymaganych pojęć;
- zależnościami między tematami;
- ścieżką nauki;
- checklistą wiedzy studenta, nie checklistą pracy autora;
- krótkim testem diagnostycznym.

### 2.4. Dokumenty techniczne

`docs/development-plan.md` może pozostać w repozytorium, ale nie powinien być częścią podstawowej ścieżki studenta.

Techniczne checklisty należy przechowywać poza publiczną nawigacją.

## 3. Co trzeba poprawić w `imperative-computation.md`

Rozdział jest merytorycznie użyteczny, ale wymaga następujących zmian:

### 3.1. Dodać jawne cele uczenia się

Na początku rozdziału student powinien zobaczyć, co po lekturze musi umieć wyjaśnić i wykonać.

### 3.2. Wyraźnie oddzielić materiał centralny od zapowiedzi

Sekcje o:

- poprawności;
- niezmiennikach;
- złożoności;
- funkcjach i side effects;

są potrzebne jako kontekst, ale ich pełne rozwinięcie należy do późniejszych stron i modułów. Powinny być oznaczone jako połączenia z dalszym materiałem, aby nie sprawiały wrażenia pełnego zamknięcia tematów.

### 3.3. Wzmocnić stronę jako notatkę wykładową

Należy dodać:

- krótką mapę pojęć;
- bardziej formalny model stanu jako odwzorowania nazw lub lokalizacji na wartości;
- wyraźne rozróżnienie expressions i statements;
- rozróżnienie wartości, obiektu, referencji i zmiennej jako zapowiedź modelu pamięci;
- przykład błędnego rozumowania i jego naprawę;
- sekcję `What you must be able to explain`.

### 3.4. Zachować przykłady Python i C++ jako wsparcie teorii

Kod jest poprawnym dodatkiem, ale nie powinien być osią rozdziału. Najpierw idea i model, potem pseudokod, a dopiero potem implementacje.

### 3.5. Przenieść część zadań do wspólnej strony problemowej

Rozdział może zachować kilka pytań kontrolnych. Większy zestaw problemów powinien później znaleźć się w `problems.md`, aby strona tematyczna pozostała spójnym wykładem.

## 4. Czego jeszcze brakuje w Module 01

Sylabus wymaga w pierwszym bloku:

- imperative computation;
- preconditions and postconditions;
- forms of algorithm representation;
- properties of algorithms;
- pseudocode;
- basic techniques for structuring algorithms.

Obecnie opracowany jest tylko pierwszy element. Moduł nie może zostać uznany za materiał do nauki pierwszego bloku, dopóki nie powstaną pełne strony:

1. `preconditions-and-postconditions.md`;
2. `algorithm-representations.md`;
3. `properties-of-algorithms.md`;
4. `pseudocode.md`;
5. `structuring-algorithms.md`;
6. `worked-examples.md`;
7. `python-and-cpp.md`;
8. `problems.md`;
9. `review.md`.

## 5. Zmiany wynikające z całego sylabusa

### 5.1. Każdy moduł musi realizować nie tylko listę tematów

Treści kursu muszą wspólnie realizować efekty `W1`, `U1`, `U2`, `K1` i `K2`.

Oznacza to, że kolejne moduły muszą uczyć:

- formułowania kontraktów;
- uzasadniania poprawności;
- porównywania wariantów rozwiązania;
- doboru struktury danych;
- szacowania Big O;
- poprawiania błędnych lub słabych rozwiązań;
- precyzyjnego opisywania problemu technicznego.

### 5.2. Problemy muszą wymagać rozumowania

Zestawy zadań powinny zawierać:

- pytania definicyjne;
- ręczne śledzenie;
- konstruowanie kontraktów;
- analizę błędów;
- argumenty poprawności;
- argumenty zakończenia;
- analizę złożoności;
- porównanie implementacji;
- poprawę rozwiązania na podstawie informacji zwrotnej.

### 5.3. Struktury danych muszą być wyjaśniane jako modele

Tablice, listy, drzewa, sterty i grafy nie mogą być przedstawione wyłącznie jako gotowe kontenery biblioteczne. Student ma rozumieć:

- reprezentację;
- niezmienniki struktury;
- operacje;
- koszt operacji;
- wpływ wyboru struktury na algorytm;
- różnice między Pythonem i C++.

### 5.4. Rekurencja wymaga dwóch etapów

Zgodnie z sylabusem:

- Moduł 02 ma wprowadzić rekurencję i warunki stopu;
- Moduł 05 ma szczegółowo opracować stos wywołań, efekty uboczne, anatomię wywołania, rekurencję pośrednią i zagnieżdżoną, implementację stosową oraz porównanie z iteracją.

Nie należy scalić tych dwóch poziomów w jeden skrót.

### 5.5. Złożoność musi być rozwijana przez cały kurs

Moduł 10 systematyzuje teorię złożoności, ale analiza kosztu powinna pojawiać się wcześniej przy każdym istotnym algorytmie i strukturze danych.

## 6. Kolejność najbliższych prac

1. przebudować `docs/index.md` na stronę do nauki;
2. uprościć publiczną nawigację;
3. przebudować `docs/course/01-foundations-of-algorithm-design/index.md`;
4. dopracować `imperative-computation.md` według punktów audytu;
5. napisać pełny rozdział `preconditions-and-postconditions.md`;
6. kontynuować Moduł 01 zagadnienie po zagadnieniu;
7. po ukończeniu wykonać audyt całego Modułu 01 względem obu sylabusów.

## 7. Decyzja

Dotychczasowa infrastruktura pozostaje. Publiczna warstwa strony zostaje przebudowana na kurs. Pierwszy rozdział zostaje zachowany i poprawiony. Kolejne prace mają charakter merytorycznego opracowania wykładu, nie technicznego rozbudowywania repozytorium.