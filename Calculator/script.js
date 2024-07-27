document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const equalButton = document.getElementById('equal');
    const clearButton = document.getElementById('clear');
    
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value === '+' || value === '-' || value === '*' || value === '/') {
                if (currentInput === '' && firstOperand !== '') {
                    operator = value;
                    display.innerText = firstOperand + ' ' + operator;
                } else {
                    firstOperand = currentInput;
                    currentInput = '';
                    operator = value;
                    display.innerText = firstOperand + ' ' + operator;
                }
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                    display.innerText = currentInput;
                }
            } else {
                currentInput += value;
                display.innerText = currentInput;
            }
        });
    });
    
    equalButton.addEventListener('click', () => {
        if (firstOperand === '' || operator === '' || currentInput === '') {
            return;
        }
        
        const result = evaluate(firstOperand, currentInput, operator);
        display.innerText = result;
        firstOperand = result;
        currentInput = '';
        operator = '';
    });
    
    clearButton.addEventListener('click', () => {
        currentInput = '';
        operator = '';
        firstOperand = '';
        display.innerText = '0';
    });
    
    function evaluate(first, second, operator) {
        const a = parseFloat(first);
        const b = parseFloat(second);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});
