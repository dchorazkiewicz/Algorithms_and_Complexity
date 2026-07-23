# Algorithms and Complexity

This repository is being rebuilt as a complete set of English-language lecture notes and study materials for **Algorithms and Complexity**.

The website is generated with **MkDocs Material** and is designed to cover the retained syllabus content in its original order, without omitting required topics.

## Source documents

- `SYLABUS.md` — filtered Polish source syllabus;
- `SYLLABUS_EN.md` — English terminology version of the same syllabus.

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

The detailed, iterative content plan is available in `docs/development-plan.md` and on the generated website.
