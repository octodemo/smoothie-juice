---
name: 🧪 End to End testing template
about: Tracking issue for end to end testing
title: '[Batch] End to end testing for launch '
labels: 'batch, end-to-end'
assignees: ''

---

## Process

End to end tests should be done to completely emulate the end user behavior by conducting manual tests on a repository created for the purpose of testing Howie configuration files and corresponding behavior from the tooling. 

## Repository

Some of these should also be tested by leveraging both the `_include` and `_extends` functionality.

### Automations

- [ ]  Create a batch with `Batch:` at the start of the title and have it automatically get the `batch` label:
- [ ]  Create a batch with `[Batch]` at the start of the title and have it automatically get the `batch` label:
- [ ]  Create an epic with `Epic:` at the start of the title and have it automatically get the `epic` label: 
- [ ]  Create an epic with `[Epic]` at the start of the title and have it automatically get the `epic` label: 
- [ ]  Create an initiative with `Initiative:` at the start of the title and have it automatically get the `initiative` label: 
- [ ]  Create an initiative with `[Initiative]` at the start of the title and have it automatically get the `initiative` label: 

### Templates

For each of the following, tests should be done to change the configuration to add and remove templates to ensure the workflow fires as expected and the expected templates get added or removed in a pull request. Without side effects such as removing files that Howie does not maintain. Then each template should be tested as a final confirmation to make sure that after the pull request is merged, the installed template works as expected.

- [ ] issues
- [ ] issue comments
- [ ] commands

### Other settings

- [ ]  Color label overrides (green, yellow, grey, red, black)
- [ ]  Work type label overrides (initiative, epic, batch, task)
- [ ]  Timezone override

## Projects

Tests on project automations should be tested on both configurations with one project and configurations with multiple projects.

Some of these should also be tested by leveraging both the `_include` and `_extends` functionality.

### Fields

- [ ]  Create an issue and automatically add it to multiple project boards
- [ ]  Start date field override
- [ ]  Target date field override
- [ ]  Ignore target date label

### Automations

- [ ]  Automate target date
- [ ]  Automate slack feed (Batch)
- [ ]  Automate slack feed (Initiative) 
- [ ]  Automate slack feed (Epic)
- [ ]  Automate target date and start date
- [ ]  Automate status labels
- [ ]  Automate options fields (Team)
- [ ]  Automate options fields (Priority)
- [ ]  Automate options fields (Type)
- [ ]  Automate status field (Ready for work)
- [ ]  Automate status field (Done)
- [ ]  Automate status field (blocked)
- [ ]  Automate status field (In progress)
- [ ]  Automate status field (Backlog)
- [ ]  Automate slack updates based on status
- [ ]  Automate slack updates based on in progress

### Other settings

- [ ]  Only include labels: `- a_label`
- [ ]  Only include labels: `- [a_label, and_b_label]`
- [ ]  Ignore labels

### Failbot / Sentry tests

- [ ] Confirm workflow bugs get sent to Sentry

## Update script tests

When we upgrade users to this version of the codebase, we need to make sure that the corresponding pull request does everything we expect it to without side effects. Including any changes to `hww.yml` configurations and the removal, addition, and modification of existing files.

### Basic tests

- [ ] Confirm upgrade PRs on a one project config that explicitly defines every configuration in the yml
- [ ] Confirm upgrade PRs on a config that utilizes _extends
- [ ] Confirm upgrades PRs on a config that utilizes multiple projects that both explicitly define every configuration in the yml

