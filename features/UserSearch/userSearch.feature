Feature: Customer Search

  Searches the Customer by different means

  xScenario Outline: Search Customer by customer number
    Given the user <Actor> is loged into <system>
    When he searches for CustomerNumber <cn>
    Then a list with <listcount> Customer is shown

    Examples:
    | Actor     |system   |cn     |listcount |
    | Christoph |AM Info  |1234   |1         |
    | Hannes    |AM Info  |23455  |2         |
    | Rolf      |AM Info  |4557678|3         |