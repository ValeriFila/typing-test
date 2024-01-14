self["webpackHotUpdate"]("main",{

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

const URL='https://fish-text.ru/get?format=html&number=1'
const textContent = document.getElementById('text')
const pointsSpan = document.getElementById('points')
const loadingSpan = document.getElementById('loading')
const prec = document.getElementById('precision')

let timeoutText
let intervalTitle
let arrayOfLetters
let correctAnswers


const fetchRandomText = url => {
    return new Promise(resolve => {
        const fetchedText = fetch(url)
        resolve(fetchedText)
    })
}

fetchRandomText(URL)
    .then((fetchedData) => {
        return fetchedData.text()
    })
    .then((data) => {
        const arrayLength = data.length
        console.log(arrayLength)
        arrayOfLetters = data.split('').slice(3, arrayLength - 4)
        correctAnswers = arrayOfLetters.length
    })
    .then(() => {
        return new Promise((resolve ,reject) => {
            loadText(arrayOfLetters)
            setTimeout(() => resolve(), 3000)
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
            textContent.innerHTML += `<span class="letter${index + 1}">${letter}</span>`
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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ac7e3e3f000bc4e463b9")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.70fc63a36de9dd4e610c.hot-update.js.map