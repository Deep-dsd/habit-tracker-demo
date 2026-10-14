# Habit Tracker (demo repo)

A tiny habit tracker used in the SkillCaptain AI Engineer course, Day 7 (MCP). The code is small on purpose. The point of this repo is its **issues**: practise reading them through an MCP server and turning them into a plan.

## Run it

Open `index.html` in your browser. There is nothing to install.

## Files

- `index.html`: the page
- `app.js`: behaviour (add a habit, mark it done)
- `storage.js`: saves and loads habits with localStorage
- `storage.test.js`: automated unit tests for storage.js
- `style.css`: styling

## Tests

Run the automated tests using Node's built-in test runner (no third-party dependencies required):

```bash
npm test
# or
node --test
```

## Practising with the issues

1. Connect a read-only GitHub MCP server to your coding agent.
2. Ask it to list the open issues in this repo.
3. Ask for a prioritised plan, and make every task point to its issue number.
4. Open a few issues yourself and check the plan against them.

Please do not edit or close the issues in the original repo. Fork it if you want your own copy to experiment on.
