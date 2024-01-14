//промисы
let content
const p = new Promise(function (resolve, reject) {
    let response =  fetch('https://fish-text.ru/get?format=html&number=1') //асинхронная операция запроса
    content = 'text content' //типа получаем тело ответа
    resolve() //переводим промис в остояние fulfilled
})

p.then(() => { //данный коллбэк будет вызван тогда, когда закончится асинхронная операция, т.е. вызван resolve()
    console.log(content)
})
const errorPromise = new Promise(function (resolve, reject) {
    reject(new Error('ошибка!')) //переводим промис в состояни rejected. результат выполнения - объект error
})
errorPromise.catch(() => {
    console.log('catch the error')
})

//еще один пример промисов
console.log('Request data...')
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Preparing data...')
        const backendData = {
            server: 'aws',
            port: 2000,
            status: 'working'
        }
        resolve(backendData)
    }, 2000)
})

p2.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 2000)
    })
})
    .then((clientData) => {
    console.log('Data received', clientData)
})
    .catch(err => console.error('Error: ', err))
    .finally(() => console.log('Finally')) //выполнится в любом случае, независимо от того с ошибкй выполнился промис или нет


//3 пример промисов
const sleep = (ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })
})

sleep(2000).then(() => console.log('After 2 sec'))
sleep(5000).then(() => console.log('After 5 sec'))

//методы промисов
Promise.all([sleep(2000), sleep(5000)]).then(() => { //в данный метод мы передаем массив промисов, и он тоже возвращает промис
    console.log('Promise.all') // и промис, который возвращается в методе All будет выполнен только тогда, когда выполняться переданные ему промисы
}) // этот метод полезен тогда, когда нам нужно дождаться набор данных с разных эндпоинтов, чтобы их затем скомбинировать например

Promise.race([sleep(2000), sleep(5000)]).then(() => { // тоже передактся массив просмисов
    console.log('Promise.race') //как только выполнится первый промис, который быстрее всего, стразу же промис который возвращается в методе race выполняется
})

//рекурсивный вызов
function factorial(n) {
    if (n <= 1) { //базовый случай - это выход из рекурсии, точка, на которой функция перестает вызывать саму себя
        return 1
    }

    return n * factorial(n - 1) //повторяемое действие
}

console.log(factorial(5))

let timeout = setTimeout(function greet() {
    console.log('hello')
    clearTimeout(timeout)
}, 5000)
console.log('bye')