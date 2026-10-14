#!/usr/bin/env python3
"""Create the demo issues in a GitHub repo with the GitHub CLI (gh).

Usage:
    gh auth login                                   # once
    python create_issues.py OWNER/REPO --dry-run    # print what would happen
    python create_issues.py OWNER/REPO              # do it
"""
import json
import subprocess
import sys

COLORS = {"bug": "d73a4a", "enhancement": "a2eeef", "documentation": "0075ca",
          "question": "d876e3", "good first issue": "7057ff"}


def gh(args, dry):
    print("gh", " ".join(repr(a) if " " in a else a for a in args))
    if dry:
        return ""
    result = subprocess.run(["gh"] + args, capture_output=True, text=True)
    if result.returncode != 0:
        print("  ->", result.stderr.strip())
    return result.stdout.strip()


def main(argv):
    if not argv or argv[0].startswith("-"):
        sys.exit(__doc__)
    repo, dry = argv[0], "--dry-run" in argv
    with open("issues.json", encoding="utf-8") as f:
        issues = json.load(f)
    for name, color in COLORS.items():
        gh(["label", "create", name, "--repo", repo, "--color", color, "--force"], dry)
    for issue in issues:
        args = ["issue", "create", "--repo", repo, "--title", issue["title"], "--body", issue["body"]]
        for label in issue["labels"]:
            args += ["--label", label]
        url = gh(args, dry)
        if issue.get("close") and (url or dry):
            gh(["issue", "close", url or "<issue-url>", "--reason", issue["close"],
                "--comment", issue.get("close_comment", "")], dry)
    opened = sum(1 for i in issues if not i.get("close"))
    print(f"\nDone. {len(issues)} issues created, {opened} left open.")


if __name__ == "__main__":
    main(sys.argv[1:])
