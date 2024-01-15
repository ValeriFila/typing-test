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
    console.log('Promise.all') // и промис, который возвращается в методе All будет выполнен только тогда, когда выполняться переданные ему промисы. причем переданные в метод промисы выполняются не друг за другом, а параллельно
}) // этот метод полезен тогда, когда нам нужно дождаться набора данных с разных эндпоинтов, чтобы их затем скомбинировать например

Promise.race([sleep(2000), sleep(5000)]).then(() => { // тоже передается массив просмисов
    console.log('Promise.race') //как только выполнится первый промис, который быстрее всего, сразу же промис который возвращается в методе race выполняется
})

//рекурсивный вызов
function factorial(n) {
    if (n <= 1) { //базовый случай - это выход из рекурсии, точка, на которой функция перестает вызывать саму себя
        return 1
    }

    return n * factorial(n - 1) //повторяемое действие
}

console.log(factorial(5))

//=============1.0 прототип - это объект который присутствует у других объектов и вызывается по цепочке сверху вниз
//т.е. если мы находим какие-то поля или функции на верхнем уровне, то мы обращаемся к ним ,если не находим, идем вниз по прототипу и тд
const person = new Object({ //создаем объект через глобальный класс
    name: 'Lera',
    age: 21,
    sayHi: function () {
        console.log('Hi!')
    }
})
console.log(person)

Object.prototype.sayGoodbye = function () { //добавляем в глобальный прототип свойство
    console.log('goodbye')
}

const lena = Object.create(person) //создаем прототип для лены
lena.name = 'Lena'

console.log(lena)


//===========2.0 this. как работает bind, call, apply
//слово this - всегда динамичное, оно указывает на объект, в контексте которого оно было вызвано

function hello() {
    console.log('Hello', this)
}

const person2 = {
    name: 'Lera',
    age: 21,
    sayHello: hello,
    sayHelloWindow: hello.bind(window), //можно передать контекст прямо в  объекте
    logInfo: function (job, phone) {
        console.group(`${this.name} info:`)
        console.log(`Name is ${this.name}`)
        console.log(`Age is ${this.age}`)
        console.log(`Job is ${job}`)
        console.log(`Phone is ${phone}`)
        console.groupEnd()
    }
}

//в данном случае this - это объект person2 (при вызове метода объекта)
person2.sayHello()

//используя метод .bind() мы можем передать контекст выполнения
person2.sayHello.bind(window)()

person2.sayHelloWindow()
person2.logInfo()

const roma = {
    name: 'Roman',
    age: 25
}

//чтобы передать контекст выполнения roma в метод loginfo объекта person2, можно использовать следующие методы:
person2.logInfo.bind(roma, 'Frontend', '8-999-563-65-21')() //возвращает функцию и мы можем вызвать ее когда угодно, как в данном примере сразу
person2.logInfo.call(roma, 'Frontend', '8-999-563-65-21') //этот метод в отличие от bind сразу же вызывает функцию
person2.logInfo.apply(roma, ['Frontend', '8-999-563-65-21']) //в apply только 2 параметра: контекст и парамерт, который может быть массивом аргументов, которые мы передадим в функцию

//////
const array = [1, 2, 3, 4, 5]
// function multBy(arr, number) {
//     return arr.map(function (i) {
//         return i * number
//     })
// }
// console.log(multBy(array, 5))

//но как сделать так, чтобы у любого массива был всегда метод, который позволит умножить каждый эллемент массива на заданное число
Array.prototype.multBy = function (number) {
    return this.map(function (i) {
        return i * number
    })
}
console.log(array.multBy(2))

//============3.0 замыкания - это функция внутри другой функции
function logName(name) {
    return function (secondName) {
        console.log('Fullname:', name, secondName)
    }
}

const fullname = logName('Lera')
fullname('Filatova')

















