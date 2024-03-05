Feature: To book tickets

Scenario: Successful booking for tomorrow
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When selects tomorrow in the calendar
        When selects a session at Zveropolis at 12:00
        When chooses a seat 8th row 6th seat
        Then receives bookings before payment

Scenario: Successful booking ticket for the day after tomorrow
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When selects the day after tomorrow in the calendar
        When selects a session at Mickey Mouse at 11-00
        When chooses a seat 7th row 6th seat
        Then get bookings before payment

Scenario: Trying to buy reserved seat
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When selects the day after tomorrow in the calendar
        When selects a session at Gone with the Wind
        When chooses a seat 5th row 6th seat
        Then get information that the place is occupied