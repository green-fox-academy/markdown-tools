Feature: Generate Jira importable CSV file from markdown story list
  As a Project mentor,
  I can generate a story CSV file,
  So I can import the task easily to Jira

  Scenario:
    Given the package installed
    Given a bash prompt in "test/" as working directory
    Given a file at "stories.md", containing:
      """
      # Test Story

      ## As Somebody, I can do something, so I am happy

      More details

      ## Acceptance Criteria

      - Something

      ## Tasks

      ### Task one

      Do something unexpected
      """
    When the "markdown-tools stories2csv -i stories.md -o stories.csv" command is executed
    Then the file at "stories.csv", should contain:
      """
      Summary,Issue id,Parent id,Issue Type,Description
      Test Story,1,,Story,"h2.Description
      As Somebody, I can do something, so I am happy
      More details
      h2.Acceptance Criteria
      - Something"
      Task one,2,1,Sub-task,Do something unexpected
      """
