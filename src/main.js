const URL='https://fish-text.ru/get?format=html&number=1'
const TEXT_CONTENT = document.getElementById('text')
const POINTS_SPAN = document.getElementById('points')
const LOADING_SPAN = document.getElementById('loading')

let timeoutText
let intervalTitle
let arrayOfLetters

async function loadTextContent() {
    const RESPONSE = await fetch(URL)
    const TEXT_FROM_RESPONSE = await RESPONSE.text()
    let arrayLength = TEXT_FROM_RESPONSE.length
    arrayOfLetters = TEXT_FROM_RESPONSE.split("").slice(3, arrayLength - 4)

    const promise = new Promise((resolve, reject) => {
        loadText(arrayOfLetters)
        setTimeout(() => {
            resolve()
        }, 3000)
    })
    promise.then(() => {
        clearTimeout(timeoutText)
        clearInterval(intervalTitle)
        LOADING_SPAN.textContent = 'Текст загружен'
        POINTS_SPAN.textContent = ''
        LOADING_SPAN.classList.add('smooth-hide')
        setAttributesForFirstElement()
    })
}

loadTextContent()
let counter = 2
function checkLetterForListener (event){
    let currentElem = document.getElementById('current-element')
    let requiredNextElement = document.getElementsByClassName(`letter${counter}`)
    let nextElem = requiredNextElement[0]

    let requiredLastElement = document.getElementsByClassName(`letter${arrayOfLetters.length}`)
    let lastElement = requiredLastElement[0]
    lastElement.setAttribute('id', 'last-element')


    if (currentElem.textContent === event.key) {
        currentElem.classList.remove('active-letter', 'wrong-letter')
        currentElem.classList.add('correct-letter')
        currentElem.removeAttribute('id')
        if (currentElem === lastElement) {
            document.removeEventListener('keydown', checkLetterForListener)
            return 0
        }
        nextElem.setAttribute('id', 'current-element')
        nextElem.classList.add('active-letter')
        counter++
    } else {
        currentElem.classList.remove('correct-letter')
        currentElem.classList.add('wrong-letter')
    }
}

function setAttributesForFirstElement() {
    const FIRST_ELEMENT = document.querySelector('span')
    FIRST_ELEMENT.setAttribute('id', 'current-element')
    FIRST_ELEMENT.classList.add('active-letter')

    document.addEventListener('keydown', checkLetterForListener)
}

function loadText(array) {
    timeoutText = setTimeout(() => {
        array.forEach((letter, index) => {
            TEXT_CONTENT.innerHTML += `<span class="letter${index + 1}">${letter}</span>`
        })
    }, 3000)

    intervalTitle = setInterval(() => {
            switch (POINTS_SPAN.textContent) {
                case '...': POINTS_SPAN.textContent = '.'
                    break;
                case '.': POINTS_SPAN.textContent = '..'
                    break;
                default: POINTS_SPAN.textContent = '...'
            }
    },500)
}
