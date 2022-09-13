Calculator


Js Specs:
1. helper functions for operations: add, subtract, multiply, divide
2. Operate function: args(operator, num1, num2) and then calls one of the above functions on the numbers.


html specs:
1. buttons: numbers, operators (add, subtract, multiply, divide, Equals), and clear. - separate by type (number, operator, clear, equals)
2. display field (default display is 0)

html+js


Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.
Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.

You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

Don't evaluate more than one pair of numbers at a time.
When users string together several operations, each pair of numbers is evaluated one at a time. (i.e: 12 + 7 - 5 * 3 = 42 -> (((12+7) - 5) * 3) = 42)

Round answers to a certain place in order to fit screen size.

Pressing = before entering all of the numbers or an operator could cause problems!

Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”

Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!





Extra Credit
Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.
Add a “backspace” button, so the user can undo if they click the wrong number.
Add keyboard support!