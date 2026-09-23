# Algorithms and Complexity

This repository is a **syllabus-to-learning-material proof of concept** for **Algorithms and Complexity**.

It explores a simple question: given the course syllabus, what could a structured, student-facing web resource look like if the syllabus topics were expanded into explanations, worked examples, Python/C++ comparisons, correctness and termination arguments, and complexity analysis?

> **Scope note**
>
> This is not an official university course repository or an official set of lecture notes. It does not imply that I teach the lecture component of the course. The material is an independent proof of concept derived from the syllabus and built as an experiment in producing reusable learning resources.

The repository is not intended to be a collection of short programming assignments or technical grading infrastructure. A separate proof of concept explores the exercise/feedback workflow.

## Source documents

- `SYLABUS.md` — retained Polish syllabus and the primary scope reference;
- `SYLLABUS_EN.md` — English terminology version of the same syllabus;
- `CONTENT_REQUIREMENTS.md` — editorial requirements used by this prototype;
- `CONTENT_AUDIT.md` — current content audit and required corrections.

## Website

The prototype learning material is published with MkDocs Material through GitHub Pages.

## Local preview

```bash
python -m venv .venv
source .venv/bin/activate       # Linux/macOS
# .venv\Scripts\activate        # Windows
pip install -r requirements.txt
mkdocs serve
```

Open `http://127.0.0.1:8000`.

## Build

```bash
mkdocs build --strict
```

Development remains iterative. The public website prioritises the readability of the learning material; technical planning documents are kept outside the main navigation.
