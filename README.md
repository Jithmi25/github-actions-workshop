# GitHub Actions Workshop 🚀

Welcome! This is **your guide** for the session — follow it step by step and
you'll go from an empty `.github/workflows/` folder to a working CI pipeline
that automatically tests your code every time you push. No prior GitHub
Actions experience needed.

By the end of this workshop you will have:

- ✅ Created your own GitHub Actions workflow file from scratch
- ✅ Watched a workflow run **fail** and learned how to read the logs
- ✅ Fixed a real bug and watched the workflow turn **green**
- ✅ Learned the core building blocks: workflows, jobs, steps, and triggers

---

## 📁 What's in this repo

```
github-actions-workshop/
├── .github/
│   └── workflows/              <- Empty for now. YOU will add a workflow file here.
├── src/
│   ├── app.js                  <- Sample code (has one intentional bug 🐛)
│   └── app.test.js             <- Unit tests for app.js
├── materials/
│   └── ci-workflow-answer-key.yml   <- Reference only — don't open until Step 6!
├── package.json
└── README.md                   <- You are here
```

---

## ✅ Setup checklist (do this before the session starts)

- [ ] **Step 1: Fork the repository**
      Go to the repo on GitHub and click **Fork** (top-right corner). This
      creates your own copy under your GitHub account.

- [ ] **Step 2: Clone your fork locally**
      Replace `<your-username>` with your actual GitHub username:

  ```bash
  git clone https://github.com/<your-username>/github-actions-workshop.git
  cd github-actions-workshop
  ```

- [ ] **Step 3: Check you have Node.js installed**

  ```bash
  node -v
  ```

  Any recent version works. If this command isn't found, install Node.js
  from [nodejs.org](https://nodejs.org) before the session.

- [ ] **Step 4: Run the tests locally**
  ```bash
  npm test
  ```
  You should see **one test fail** (`subtract`). That's expected — it's
  your bug-fixing task in Step 7. Don't fix it yet!

If all four boxes are checked, you're ready for the session. 🎉

---

## 🧠 Step 5: Understand the building blocks

Before writing any YAML, know these four terms — you'll use all of them:

| Term               | What it means                                             |
| ------------------ | --------------------------------------------------------- |
| **Workflow**       | The whole automated process, defined in one `.yml` file   |
| **Trigger (`on`)** | The event that starts the workflow (e.g. a `push`)        |
| **Job**            | A group of steps that run together on one virtual machine |
| **Step**           | A single command or reusable action inside a job          |

Workflow files always live in `.github/workflows/` — GitHub only looks for
them in that exact folder.

---

## 🛠️ Step 6: Create your workflow file

1. Create a new file at this exact path:

   ```
   .github/workflows/ci.yml
   ```

   (You can create it locally in your editor, or directly on GitHub.com by
   navigating to `.github/workflows/` and clicking **Add file → Create new file**.)

2. Paste in the following, building it up piece by piece as we go through it
   together in the session:

   ```yaml
   name: CI

   on:
     push:
       branches: [main]
     pull_request:
       branches: [main]

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v4

         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: "20"

         - name: Install dependencies
           run: npm install

         - name: Run tests
           run: npm test
   ```

3. Save, commit, and push:

   ```bash
   git add .github/workflows/ci.yml
   git commit -m "Add CI workflow"
   git push
   ```

4. On GitHub.com, open your fork and click the **Actions** tab. You should
   see your workflow running (a yellow dot 🟡).

5. Because of the bug in `src/app.js`, the run will finish with a **red ❌**.
   Click into the run → click the `test` job → expand **Run tests** to see
   exactly which check failed and why. This is how you'll debug real CI
   failures in the future — reading the log is the whole skill.

---

## 🐞 Step 7: Fix the bug and go green

1. Open `src/app.js` and find the `subtract` function:
   ```js
   function subtract(a, b) {
     return a + b; // BUG: should be "return a - b;"
   }
   ```
2. Fix the return statement so it actually subtracts:
   ```js
   function subtract(a, b) {
     return a - b;
   }
   ```
3. Commit and push your fix:
   ```bash
   git add src/app.js
   git commit -m "Fix subtract bug"
   git push
   ```
4. Go back to the **Actions** tab and watch the new run. It should finish
   with a **green ✅** — and you'll see the checkmark next to your commit
   too.

**🎉 Congratulations — you just built and used a working CI pipeline.**

---

## 🌟 Stretch goals (if you finish early)

Pick any of these to try on your own fork:

- **Add a status badge** to this README showing the workflow's pass/fail state
- **Run on multiple Node.js versions** using a build matrix
- **Only trigger on `src/` changes** by scoping the `push`/`pull_request` triggers with `paths:`
- **Add a second job** that runs a linter (e.g. `eslint`) alongside the tests

---

## 📖 Cheat sheet: workflow file anatomy

```yaml
name: CI # Name shown in the Actions tab

on: # When the workflow runs
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test: # Job ID
    runs-on: ubuntu-latest # Which VM to run on
    steps:
      - uses: actions/checkout@v4 # Reusable action
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm install # Shell command
      - run: npm test
```

📌 **Reference only:** `materials/ci-workflow-answer-key.yml` has
the same content as above. Try building Step 6 yourself first — only peek
if you get stuck.

---

## 🆘 Troubleshooting

| Problem                                       | Fix                                                                     |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| Actions tab shows nothing after push          | Confirm the file path is exactly `.github/workflows/ci.yml`             |
| Workflow fails at "Run tests" (before Step 7) | Expected — that's the bug you fix in Step 7                             |
| Workflow still fails after fixing the bug     | Check you edited `src/app.js` (not the test file) and pushed the commit |
| `npm test` does nothing locally               | Make sure you're running it from the repo root folder                   |
| "Permission denied" on push                   | Make sure you cloned **your fork**, not the original repo               |

---

## 🗒️ Quick recap

- Workflows live in `.github/workflows/*.yml`
- `on:` defines what triggers a run (push, pull request, etc.)
- `jobs:` → `steps:` define what actually happens, in order
- `uses:` runs someone else's reusable action; `run:` runs a shell command
- Check the **Actions** tab after every push to see results

Happy shipping! 🎉
