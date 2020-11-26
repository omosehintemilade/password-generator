const button = document.querySelector('.button')
const screen = document.querySelector('.screen')
const input = document.querySelector('form input')
const checkUppercase = document.querySelector('#uppercase')
const checkLowercase = document.querySelector('#lowercase')
const checkNumbers = document.querySelector('#numbers')
const checkSymbols = document.querySelector('#symbols')
const clipBoard = document.querySelector('.icon-btn')
    //     // const button = document.querySelector('.button')
    // console.log({ checkUppercase, checkLowercase, checkNumbers, checkSymbols });

const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUppercase,
    number: getRandomNumber,
    symbols: getRandomSymbols
}


// copy to clipboard
clipBoard.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = screen.innerText
    if (!password) {
        return
    }
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('password copied to clipboard')
})



// generator functions

function getRandomLower() {
    // console.log( String.fromCharCode(97));
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbols() {
    const symbols = '~`!@#$%^&*()_-=+[]{}:;"/?>.<,\|'
        // console.log();
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function generatePassword() {
    const passwordLength = parseInt(input.value)
        // console.log(typeof passwordLength);
        //  the plus sign is a shorthand form of parse int   // +input.value
    const isLowercaseChecked = checkLowercase.checked
    const isUppercaseChecked = checkUppercase.checked
    const isNumberChecked = checkNumbers.checked
    const isSymbolsChecked = checkSymbols.checked
    screen.innerText = generatePasswordBackend(isLowercaseChecked, isUppercaseChecked, isNumberChecked, isSymbolsChecked, passwordLength);
}

function generatePasswordBackend(lower, upper, number, symbols, passwordLength) {
    let generatedPassword = ''
    const totalChecked = lower + upper + number + symbols
        // console.log('totalChecked: ', totalChecked);

    const totalCheckedArray = [{ lower }, { upper }, { number }, { symbols }]
        .filter(checked => Object.values(checked)[0])
        // console.log('totalCheckedArray: ', totalCheckedArray);
    let finalPassword
    if (totalChecked === 0) {
        return finalPassword = 'please check one or more boxes'
    }
    if (passwordLength > 20) {
        alert('20 is the maximum number of password that can be generated')
        return finalPassword = ''
    }
    for (let i = 0; i < passwordLength; i += totalChecked) {
        totalCheckedArray.forEach(item => {
            const functionName = Object.keys(item)[0]
                // console.log('functionName: ', functionName)

            generatedPassword += randomFunctions[functionName]();
        })
    }
    // console.log(generatedPassword.slice(0, passwordLength));// will make it generate passwords less than 4

    finalPassword = generatedPassword.slice(0, passwordLength)
    return finalPassword
}


// add Event Listener
button.addEventListener('click', generatePassword)