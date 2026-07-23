# Algorithms and Complexity

This repository contains a complete set of English-language lecture notes and self-study materials for **Algorithms and Complexity**.

The primary objective is educational: a student should be able to learn the required syllabus material from the website, understand the definitions and theory, follow worked examples, compare Python and C++ implementations, reason about correctness and termination, and analyse computational complexity.

The repository is not intended to be a collection of short tasks or technical project documentation.

## Source documents

- `SYLABUS.md` — filtered Polish source syllabus and the primary scope reference;
- `SYLLABUS_EN.md` — English terminology version of the same syllabus;
- `CONTENT_REQUIREMENTS.md` — binding student-first editorial requirements;
- `CONTENT_AUDIT.md` — current audit and required corrections.

## Website

The notes are published with MkDocs Material through GitHub Pages.

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

Development remains iterative, but the public website prioritises learning content. Technical planning documents are kept outside the main student navigation.