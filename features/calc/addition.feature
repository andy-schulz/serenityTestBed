Feature: Addition

  Addition is great as a verification exercise to get the Cucumber-js infrastructure up and running

  Scenario Outline: Add two number
    Given a WebCalculator is used
    Given the numbers <x> and <y>
    When they are added together
    Then should the result be <result>

    Examples:
    |x      |y      |result    |
    |1      |2      |3         |
    |3      |4      |7         |
    |-10    |15     |5         |
    |-10    |-10    |-20       |
    |10     |-10    |0         |

  Scenario Outline: Add two number
    Given a Calculator is used
    Given the numbers <x> and <y>
    When they are added together
    Then should the result be <result>

    Examples:
      |x      |y      |result    |
      |1      |2      |3         |
      |3      |4      |7         |
      |-10    |15     |5         |
#    |-10    |-10    |-20       |
#    |10     |-10    |0         |