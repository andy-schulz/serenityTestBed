Feature: Addition

  Addition is great as a verification exercise to get the Cucumber-js infrastructure up and running

  @SimpleTest
  Scenario: Add two number
    Given James is able to use a WebCalculator
    When James adds the numbers 1 and 4
    Then James should get the result 5


  @OutlineTest
  Scenario Outline: Scenario runner
    Given James is able to use a WebCalculator
    When James adds the numbers <x> and <y>
    Then James should get the result <result>

    Examples:
    | x   | y   | result |
    | 1   | 2   | 3      |
    | 3   | 4   | 7      |
    | -10 | 15  | 5      |
    | -10 | -10 | -20    |
    | 10  | -10 | 0      |

  @rest
  Scenario Outline: Add two number
    Given James is able to use a RestCalculator
    When James adds the numbers <x> and <y>
    Then James should get the result <result>

    Examples:
      | x   | y   | result |
      | 1   | -12 | -11    |
      | 0   | -0  | 0      |
      | -10 | 15  | 5      |
      | -10 | -10 | -20    |
      | 10  | -10 | 0      |