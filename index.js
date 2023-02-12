class Calculator {
    constructor(previousAperandTextElement, currentAperandTextElement) {
        this.previousAperandTextElement = previousAperandTextElement
        this.currentAperandTextElement  = currentAperandTextElement
        this.clear()
    }
    clear() {
        this.currentAperand = '';
        this.previousAperand = '';
        this.operation = undefined
    }
    
    delete() {
        this.currentAperand = this.currentAperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentAperand.includes('.')) return
        this.currentAperand = this.currentAperand.toString() + number.toString()
    }

    chooseOperation(operation) {

        this.operation = operation
        this.previousAperand = this.currentAperand
        this.currentAperand = ''
    }

    compute() {
        let computation ;
        const prev = parseFloat(this.previousAperand)
        const current = parseFloat(this.currentAperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break 
                case '-':
                computation = prev - current
                break 
                case '*':
                computation = prev * current
                break 
                case '/':
                computation = prev / current
                break 
                default:
                    return
        }
        this.currentAperand = computation
        this.operation = undefined
        this.previousAperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentAperandTextElement.innerText = 
        this.getDisplayNumber(this.currentAperand)
        if(this.operation != null) {
            this.previousAperandTextElement.innerText = `
            ${this.getDisplayNumber(this.previousAperand)} ${this.operation}`
        }else {
            this.previousAperandTextElement.innerText = ''
        }
    }
} 



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousAperandTextElement = document.querySelector('[data-previous-aprand]');
const currentAperandTextElement = document.querySelector('[data-current-aprand]');



const calculator = new Calculator(previousAperandTextElement, currentAperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay()
})