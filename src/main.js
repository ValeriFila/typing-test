const URL_RU='https://fish-text.ru/get?format=html&number=3'
const textContent = document.getElementById('text')
const spansDiv = document.getElementById('spans')
const pointsSpan = document.getElementById('points')
const loadingSpan = document.getElementById('loading')
const prec = document.getElementById('precision')
const againButton = document.getElementById('again-button')
const startButton = document.getElementById('start')
const welcomeTitle = document.getElementById('welcome-title')
const initialInfo = document.getElementById('initial-information')
const languageButtons = document.getElementById('language')
const englishButton = document.getElementById('en')
const russianButton = document.getElementById('ru')

let timeoutText
let intervalTitle
let timeoutPromise
let arrayOfLetters
let correctAnswers

const fetchRandomText = url => {
    return new Promise(resolve => {
        const fetchedText = fetch(url)
        resolve(fetchedText)
    })
}

// fetchRandomText(URL)
//     .then((fetchedData) => {
//         return fetchedData.text()
//     })
//     .then((data) => {
//         const arrayLength = data.length
//         arrayOfLetters = data.split('').slice(3, arrayLength - 4)
//         arrayOfLetters.forEach((letter, index) => {
//             if (letter === '—') {
//                 arrayOfLetters[index] = '-'
//             }
//             if (letter === '  ') {
//                 arrayOfLetters[index] = '   '
//             }
//         })
//         correctAnswers = arrayOfLetters.length
//     })
//     .then(() => {
//         return new Promise((resolve ,reject) => {
//             loadText(arrayOfLetters)
//             setTimeout(() => resolve(), 3000)
//         })
//     })
//     .then(() => {
//         clearTimeout(timeoutText)
//         clearInterval(intervalTitle)
//         loadingSpan.textContent = 'Текст загружен'
//         pointsSpan.textContent = ''
//         loadingSpan.classList.add('smooth-hide')
//         setAttributesForFirstElement()
//     })
//     .catch(e => console.error(e))

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
            return
        }
        nextElem.setAttribute('id', 'current-element')
        nextElem.classList.add('active-letter')
        counter++
    } else if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || event.key === 'Tab' || event.key === 'Enter' || event.key === 'Backspace' || event.key === 'AltGraph') {

    } else {
        if (currentElem.classList.contains('active-letter')) {
            countPrecision(currentElem.textContent, event.key, arrayOfLetters)
        }
        currentElem.classList.remove('active-letter')
        currentElem.classList.add('wrong-letter')

    }
}

function setAttributesForFirstElement() {
    const firstElement = document.querySelector('span')
    firstElement.setAttribute('id', 'current-element')
    firstElement.classList.add('active-letter')

    document.addEventListener('keydown', checkLetterForListener)
}

function loadText(array) {
    timeoutText = setTimeout(() => {
        array.forEach((letter, index) => {
            spansDiv.innerHTML += `<span class="letter${index + 1}">${letter}</span>`
        })
    }, 3000)

    intervalTitle = setInterval(() => {
            switch (pointsSpan.textContent) {
                case '...': pointsSpan.textContent = '.'
                    break;
                case '.': pointsSpan.textContent = '..'
                    break;
                default: pointsSpan.textContent = '...'
            }
    },500)
}

let precision
function countPrecision(curElem, pressedKey, array) {
    if (curElem !== pressedKey) {
        correctAnswers = correctAnswers - 1
    }
    precision = (correctAnswers / array.length * 100).toFixed(1)
    prec.textContent = precision + '%'
}

function clickOnToggle(firstLanguage, secondLanguage) {
    firstLanguage.style.backgroundColor = '#2d8843'
    firstLanguage.style.color = '#e9ffea'
    secondLanguage.style.backgroundColor = 'transparent'
    secondLanguage.style.color = '#2d8843'
}

englishButton.addEventListener('click', function () {
    clickOnToggle(englishButton, russianButton)
})

russianButton.addEventListener('click', function () {
    clickOnToggle(russianButton, englishButton)
})
function clickStartButton() {
    welcomeTitle.classList.add('hide-element')
    startButton.classList.add('hide-element')
    languageButtons.classList.add('hide-element')
    loadingSpan.textContent = 'Загрузка'
    pointsSpan.textContent = '...'
    initialInfo.style.display = 'flex'
    textContent.style.width = '600px'
    textContent.style.flexDirection = 'row'
    textContent.style.display = 'block'
    textContent.style.textAlign = 'initial'

    fetchRandomText(URL_RU)
    .then((fetchedData) => {
        return fetchedData.text()
    })
    .then((data) => {
        const arrayLength = data.length
        arrayOfLetters = data.split('').slice(3, arrayLength - 4)
        arrayOfLetters.forEach((letter, index) => {
            if (letter === '—') {
                arrayOfLetters[index] = '-'
            }
            if (letter === '  ') {
                arrayOfLetters[index] = ' '
            }
        })
        correctAnswers = arrayOfLetters.length
    })
    .then(() => {
        return new Promise((resolve ,reject) => {
            loadText(arrayOfLetters)
            timeoutPromise = setTimeout(() => resolve(), 3000)
        })
    })
    .then(() => {
        clearTimeout(timeoutText)
        clearInterval(intervalTitle)
        loadingSpan.textContent = 'Текст загружен'
        pointsSpan.textContent = ''
        loadingSpan.classList.add('smooth-hide')
        setAttributesForFirstElement()
    })
    .catch(e => console.error(e))
}

function clickAgainButton() {
    clearTimeout(timeoutText)
    clearTimeout(timeoutPromise)
    clearInterval(intervalTitle)
    document.removeEventListener('keydown', checkLetterForListener)
    welcomeTitle.classList.remove('hide-element')
    startButton.classList.remove('hide-element')
    spansDiv.innerHTML = ''
    languageButtons.classList.remove('hide-element')
    loadingSpan.textContent = 'Тренажер слепой печати'
    loadingSpan.style.opacity = '100%'
    loadingSpan.classList.remove('smooth-hide')
    pointsSpan.textContent = ''
    initialInfo.style.display = 'none'
    textContent.style.display = 'flex'
    textContent.style.flexDirection = 'column'
    textContent.style.width = '800px'
    textContent.style.alignItems = 'center'
    textContent.style.textAlign = 'center'
}

startButton.onclick = clickStartButton
againButton.onclick = clickAgainButton
function countVelocity() {

}



//1 вариант функции
// async function loadTextContent() {
//     const RESPONSE = await fetch(URL)
//     const TEXT_FROM_RESPONSE = await RESPONSE.text()
//     let arrayLength = TEXT_FROM_RESPONSE.length
//     arrayOfLetters = TEXT_FROM_RESPONSE.split("").slice(3, arrayLength - 4)
//
//     const promise = new Promise((resolve, reject) => {
//         loadText(arrayOfLetters)
//         setTimeout(() => {
//             resolve()
//         }, 3000)
//     })
//     promise.then(() => {
//         clearTimeout(timeoutText)
//         clearInterval(intervalTitle)
//         LOADING_SPAN.textContent = 'Текст загружен'
//         POINTS_SPAN.textContent = ''
//         LOADING_SPAN.classList.add('smooth-hide')
//         setAttributesForFirstElement()
//     })
// }