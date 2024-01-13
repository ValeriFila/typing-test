//промисы
let content
const p = new Promise(function (resolve, reject) {
    let response =  fetch(URL) //асинхронная операция запроса
    content = 'text content' //типа получаем тело ответа
    resolve() //переводим промис в остояние fulfilled. результат выполнения - объект data
})

p.then(() => { //данный коллбэк будет вызван тогда, когда закончится асинхронная операция, т.е. вызван resolve()
    console.log(content)
})
const errorPromise = new Promise(function (resolve, reject) {
    reject(new Error('ошибка!')) //переводим промис в состояни rejected. результат выполнения - объект error
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
}).then((clientData) => {
    console.log('Data received', clientData)
}).catch(err => console.error('Error: ', err))
    .finally(() => console.log('Finally')) //выполнится в любом случае, независимо от того с ошибкй выполнился промис или нет

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