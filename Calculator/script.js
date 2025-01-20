// Select the screen
const screen = document.getElementById('screen');

// Track the current input and previous calculation
let currentInput = '';
let previousInput = '';
let operator = null;

// Handle button clicks
document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        // Clear screen
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            updateScreen('');
            return;
        }

        // Handle equals button
        if (value === '=') {
            if (operator && previousInput !== '') {
                currentInput = calculate(previousInput, currentInput, operator);
                operator = null;
                previousInput = '';
                updateScreen(currentInput);
            }
            return;
        }

        // Handle operators
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (operator && previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                updateScreen(previousInput);
            }
            return;
        }

        // Append number or decimal point
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        updateScreen(currentInput);
    });
});

// Update screen
function updateScreen(value) {
    screen.textContent = value || '0';
}

// Perform calculations
function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return b !== 0 ? (a / b).toString() : 'Error';
        default:
            return '0';
    }
}
