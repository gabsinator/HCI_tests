# HCI Exam Trainer

A small offline web app that replays the four Ilias tests from the HCI lecture (SS26),
the way they looked on the learning platform: answer everything, hand the test in,
get a score and the solution for every question.

## Run it

Double-click `app/index.html` — that is all. No build step, no server, no dependencies.

If your browser blocks `localStorage` on `file://` (best scores would not be remembered),
serve the folder instead:

```bash
python -m http.server 8765
```

and open <http://127.0.0.1:8765/app/>.

## What is in it

| Test | Topic | Questions | Points |
|------|-------|-----------|--------|
| 1 | Human Information Processing | 9 | 17 |
| 2 | Perception | 9 | 25 |
| 3 | Design & Analysis | 14 | 33 |
| 4 | Observation & Evaluation | 14 | 39 |

Question types match the originals: single choice, multiple choice, matching (dropdowns),
free-text blanks and a numeric answer. Two questions from Test 1 and one from Test 2
include the original figure, cropped out of the PDFs into `app/img/`.

## Scoring

Partial credit, as in Ilias:

- **single choice** — 1 point
- **multiple choice** — 1 point per correct option you tick, minus 1 per wrong one, never below 0
- **matching** — 1 point per correct pair
- **free text** — 1 point per blank, matched case- and punctuation-insensitively
  (a "count this as correct" checkbox is offered in the review, because literal matching is brittle)
- **numeric** — 1 point if inside the accepted range

Best score per test is kept in `localStorage`. Question order and answer order can be
shuffled from the menu (answer order is shuffled by default).

## Sources

Everything comes from `../Ilias_Tests/`:

- questions: the text layer of `Test2/3/4.pdf`; `Test1.pdf` is screenshot-based, so those
  questions were transcribed from the images
- answers: the lecturer's solution slides in the same PDFs, cross-checked against the
  personal notes in `Test*_*.txt`

One conflict was found: for Test 4 question 5 (expert inspection), the solution slide marks
*"Expert biases can distort problem prioritization"* as **correct**, while `Test4_Observation.txt`
marks it as false. The slide is used, and the question shows a note about it.

## Editing

All questions live in `app/data.js` as plain objects — add, fix or extend them there;
`app.js` renders and grades whatever it finds.
