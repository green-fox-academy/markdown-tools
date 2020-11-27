Feature: Show the features if no command is specified
  As a Mentor,
  I can check the possible commands,
  So I know how to use the tool

  Scenario:
    Given the package installed
    Given a bash prompt in "test/" as working directory
    When the "markdown-tools" command is executed
    Then it should print to the standard error:
      """
      markdown-tools <command>

      Commands:
        markdown-tools stories2csv  Creates csv file for Jira from markdown story
                                    definitions

      Options:
        --help     Show help                                                 [boolean]
        --version  Show version number                                       [boolean]

      Please specify at least one command!

      """
    Then the last exit code should be 1

  Scenario:
    Given the package installed
    Given a bash prompt in "test/" as working directory
    When the "markdown-tools --help" command is executed
    Then it should print to the standard out:
      """
      markdown-tools <command>

      Commands:
        markdown-tools stories2csv  Creates csv file for Jira from markdown story
                                    definitions

      Options:
        --help     Show help                                                 [boolean]
        --version  Show version number                                       [boolean]

      """
    Then the last exit code should be 0
