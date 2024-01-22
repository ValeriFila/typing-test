/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

const textContent = document.getElementById('text')
const spansDiv = document.getElementById('spans')
const pointsSpan = document.getElementById('points')
const loadingSpan = document.getElementById('loading')
const prec = document.getElementById('precision')
const velocity = document.getElementById('velocity')
const againButton = document.getElementById('again-button')
const startButton = document.getElementById('start')
const welcomeTitle = document.getElementById('welcome-title')
const initialInfo = document.getElementById('initial-information')
const languageButtons = document.getElementById('language')
const englishButton = document.getElementById('en')
const russianButton = document.getElementById('ru')
const skeleton = document.getElementById('skeleton-body')


let urlRu = 'https://fish-text.ru/get?format=html&number=1'
let urlEn = 'https://baconipsum.com/api/?type=all-meat&sentences=1&format=html'
let url = urlRu
let requiredLastElement
let lastElement

let timeoutText
let intervalTitle
let countVelocityInterval
let renderInterval
let timeoutPromise1
let timeoutPromise2
let arrayOfLetters
let correctAnswers
let chosenLanguage

const fetchRandomText = url => {
    return new Promise(resolve => {
        const fetchedText = fetch(url)
        resolve(fetchedText)
    })
}
let counter
function checkLetterForListener (event){
    let currentElem = document.getElementById('current-element')
    let requiredNextElement = document.getElementsByClassName(`letter${counter}`)
    let nextElem = requiredNextElement[0]

    if (currentElem.textContent === event.key) {
        countVelocity()
        currentElem.classList.remove('active-letter', 'wrong-letter')
        currentElem.classList.add('correct-letter')
        currentElem.removeAttribute('id')
        if (currentElem.classList.contains(`letter${arrayOfLetters.length}`)) {
            console.log('you entered the last letter')
            clearInterval(renderInterval)
            clearInterval(plusOneSecondCounter)
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
    }, 1500)
}

function pointsSpanAnimation() {
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
    chosenLanguage = 'english'
    url = urlEn
    clickOnToggle(englishButton, russianButton)
})

russianButton.addEventListener('click', function () {
    chosenLanguage = 'russian'
    url = urlRu
    clickOnToggle(russianButton, englishButton)
})
function clickStartButton() {
    welcomeTitle.classList.add('hide-element')
    startButton.classList.add('hide-element')
    languageButtons.classList.add('hide-element')
    loadingSpan.textContent = 'Загрузка'
    pointsSpan.textContent = '...'
    pointsSpanAnimation()
    initialInfo.style.display = 'flex'
    textContent.style.width = '600px'
    textContent.style.flexDirection = 'row'
    textContent.style.display = 'block'
    textContent.style.textAlign = 'initial'
    skeleton.style.display = 'flex'
    fillSkeletonWithText()
    precision = 100
    prec.textContent = precision + '%'
    counter = 2

    fetchRandomText(url)
    .then((fetchedData) => {
        return new Promise((resolve, reject) => {
            timeoutPromise1 = setTimeout(() => resolve(fetchedData.text()), 1500)
        })
    })
    .then((data) => {
        const arrayLength = data.length
        if (url === urlEn) {
            arrayOfLetters = data.split('').slice(3, arrayLength - 5)
        } else {
            arrayOfLetters = data.split('').slice(3, arrayLength - 4)
        }
        arrayOfLetters.forEach((letter, index) => {
            if (letter === '—') {
                arrayOfLetters[index] = '-'
            }
            if (letter === '  ') {
                arrayOfLetters[index] = ' '
            }
        })
        correctAnswers = arrayOfLetters.length
        return new Promise((resolve ,reject) => {
            loadText(arrayOfLetters)
            timeoutPromise2 = setTimeout(() => resolve(), 1500)
        })
    })
    .then(() => {
        renderVelocity()
        clearTimeout(timeoutText)
        clearTimeout(timeoutPromise1)
        clearTimeout(timeoutPromise2)
        clearInterval(intervalTitle)
        requiredLastElement = document.getElementsByClassName(`letter${arrayOfLetters.length}`)
        lastElement = requiredLastElement[0]
        lastElement.setAttribute('id', 'last-element')
        loadingSpan.textContent = 'Текст загружен'
        pointsSpan.textContent = ''
        loadingSpan.classList.add('smooth-hide')
        skeleton.style.display = 'none'
        setAttributesForFirstElement()
    })
    .catch(e => console.error(e))
}

function clickAgainButton() {
    clearTimeout(timeoutText)
    clearTimeout(timeoutPromise1)
    clearTimeout(timeoutPromise2)
    clearInterval(intervalTitle)

    clearInterval(renderInterval)
    clearInterval(plusOneSecondCounter)

    document.removeEventListener('keydown', checkLetterForListener)

    welcomeTitle.classList.remove('hide-element')
    startButton.classList.remove('hide-element')
    languageButtons.classList.remove('hide-element')

    spansDiv.innerHTML = ''

    loadingSpan.textContent = 'Тренажер слепой печати'
    loadingSpan.style.opacity = '100%'
    loadingSpan.classList.remove('smooth-hide')

    velocity.textContent = '0 зн./мин'

    pointsSpan.textContent = ''
    initialInfo.style.display = 'none'

    textContent.style.display = 'flex'
    textContent.style.flexDirection = 'column'
    textContent.style.width = '800px'
    textContent.style.alignItems = 'center'
    textContent.style.textAlign = 'center'

    skeleton.innerHTML = ''
    url = urlRu
    clickOnToggle(russianButton, englishButton)
}

startButton.onclick = clickStartButton
againButton.onclick = clickAgainButton

let pressedKeysNumber
let pressVelocity
let plusOneSecondCounter
let seconds

function countVelocity() {
    pressedKeysNumber++
}

function fillSkeletonWithText() {
    let text = 'skeleton skeleton skeleton skeleton skeleton skeleton skeleton skeleton'
    let arrayOfSkeletonText = text.split(' ')
    arrayOfSkeletonText.forEach((word) => {
        skeleton.innerHTML += `<span class="skeleton__text">${word}</span>`
    })
}

function renderVelocity() {
    pressedKeysNumber = 1
    seconds = 1
    plusOneSecondCounter = setInterval(() => {
        seconds++
    }, 1000)
    renderInterval = setInterval(() => {
        pressVelocity = pressedKeysNumber/(seconds/60)
        velocity.textContent = `${pressVelocity.toFixed(0)} зн./мин`
    }, 100)
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

//2 вариант
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


/***/ }),

/***/ "./favicon.ico":
/*!*********************!*\
  !*** ./favicon.ico ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "./favicon.ico";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ "./css/style.css");
/* harmony import */ var _src_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../src/main.js */ "./src/main.js");
/* harmony import */ var _src_main_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_main_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _favicon_ico__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../favicon.ico */ "./favicon.ico");



// import '/src/learning-info'
// import '/src/test'
// import '/src/test2'


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map