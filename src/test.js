let J = 'aabbdcah'
let S = 'abc'

const countJewelery = function(jewl, rocks) {
    let counter = 0
    const jewArr = jewl.split('')
    const rocksArr = rocks.split('')
    rocksArr.forEach((rock) => {
        jewArr.forEach((jew) => {
            jew === rock ? counter++ : counter
        })
    })
    return counter
}
console.log(countJewelery(J, S))

//two-sum
const twoSum = (nums, total) => {
    const previousValues = {};
    for (let i = 0; i < nums.length; i++) {

        const complement = total - nums[i];
        if (previousValues[complement]) {
            console.log(previousValues)
            return [complement, nums[i]];
        }

        previousValues[nums[i]] = true;
    }

};
console.log(twoSum([1, 1, 3], 4));
console.log(twoSum([3, 9, 12, 20], 21));


//2619. Array Prototype Last
Array.prototype.last = function() {
    if (this.length > 0 && this.length <=1000) {
        return this[this.length - 1]
    } else {
        return -1
    }
};
const arr = [1, 4, 8];
console.log(arr.last()) // 3

//2620. Counter
const createCounter = function(n) {
    let result = []
    return function() {
        result.push(n)
        n++
        return result
    };
};


const counter = createCounter(10)
console.log(counter()) // 10
console.log(counter())  // 11
console.log(counter())  // 12

//2621. Sleep
async function sleep2(millis) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, millis)
    })
}


let t1 = Date.now()
sleep2(5000).then(() => console.log(Date.now() - t1)) // 100

//2626. Array Reduce Transformation
let nums = [1,2,3,4]
function sum(accum, curr) { return accum + curr }
let init = 0

const reduce = function(numbers, fn, initial) {
    numbers.forEach((num) => {
        initial = fn(initial, num)
    })
    return initial
};

console.log(reduce(nums, sum, init))

//2629. Function Composition
const compose = function(functions) {
    let index = functions.length - 1
    return function(x) {
        for (let i = index; i >= 0; i--) {
            x = functions[i](x)
        }
        return x
    }
};

const fn = compose([x => x + 1, x => 2 * x])
console.log(fn(4)) // 9

//2634. Filter Elements from Array
const filter = function(arr, fn) {
    let resArr = []
    arr.forEach((elem) => {
        let result = fn(elem)
        if (result) {
            resArr.push(elem)
        }
    })
    return resArr
}


let array = [0,10,20,30]
let fn1 = function greaterThan10(n) { return n > 10; }

const newArray = filter(array, fn1)
console.log(newArray)

//2635. Apply Transform Over Each Element in Array
const map = function(arr, fn) {
    arr.forEach((elem, i) => {
        arr[i] = (fn(elem, i))
    })
    return arr
}

let arr1 = [1,2,3]
let fn2 = function plusone(n) { return n + 1; }
console.log(map(arr1, fn2))

// 2648. Generate Fibonacci Sequence
let res = []
const fibGenerator = function*() {
    let res = []
    for (let i = 0; i <= 50; i++) {
        if (i < 2) {
            res.push(i)
            yield res[i]
        } else {
            res.push(res[i-1] + res[i-2])
            yield res[i]
        }
    }
}

const gen = fibGenerator();
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)

//2665. Counter II
const createCounter1 = function(init) {
    const initial = init
    return new Object({
        increment: function () {
            return ++init
        },
        reset: function () {
            return init = initial
        },
        decrement: function () {
            return --init
        }
    })
};

const counter1 = createCounter1(5)
// counter1.increment(); // 6
// counter1.reset(); // 5
// counter1.decrement(); // 4

console.log(counter1.increment())
console.log(counter1.reset())
console.log(counter1.decrement())

//2666. Allow One Function Call
const once = function(fn) {
    let called = true
    return function(...args){
        if (!called) {
            return
        }
        called = false
        return fn(...args)
    }
}

let fn3 = (a,b,c) => (a + b + c)
let onceFn = once(fn3)

console.log(onceFn(1,2,3)) // 6
console.log(onceFn(2,3,6)) // returns undefined without calling fn

// 2677. Chunk Array
const chunk = function(arr, size) {
    let initialSize = size
    let subArr = []
    let resArr = []
    for(let i = 0; i < arr.length; i++) {
        if (size > 0) {
            subArr.push(arr[i])
            size--
        } else {
            resArr.push(subArr)
            subArr = []
            subArr.push(arr[i])
            size = initialSize - 1
        }
        if(i === arr.length - 1) {
            resArr.push(subArr)
        }
    }
    return resArr
}

let arrBundle = [1,2,3,4,5]
console.log(chunk(arrBundle, 3))

//2695. Array Wrapper
const ArrayWrapper = function(nums) {
    this.nums = nums
}

ArrayWrapper.prototype.valueOf = function() {
    return this.nums.reduce((accum, num) => {
        return accum + num
    }, 0)
}

ArrayWrapper.prototype.toString = function() {
    return `[${this.nums}]`
}

const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);

console.log(obj1.valueOf())
console.log(obj2.valueOf())

console.log(obj1.toString())
console.log(obj2.toString())

//2703. Return Length of Arguments Passed
const argumentsLength = function(...args) {
    return args.length
}
console.log(argumentsLength(1,2,3))

// 2704. To Be Or Not To Be
const expect = function(val) {
    return {
        toBe: function (num) {
            if (val === num) return true
            throw new Error("Not Equal")

        },
        notToBe: function (num) {
            if (val !== num) return true
            throw new Error("Equal")
        }
    }
}
console.log(expect(5).toBe(5)) //true
// console.log(expect(5).notToBe(5))  // throws "Equal"

//2723. Add Two Promises
const addTwoPromises = async function(promise1, promise2) {
    return new Promise((resolve) => {
        Promise.allSettled([promise1, promise2])
            .then(([resp1, resp2]) => {
                resolve(resp1.value + resp2.value)
            })
    })
}

let promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50))
let promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))
addTwoPromises(promise1, promise2)
    .then((res) => {
        console.log(res)
    })

//2724. Sort By
const sortBy = function(arr, fn) {
    return arr.sort((a, b) => fn(a) - fn(b))
}
let fn5 = (x) => x.x
console.log(sortBy([{"x":1},{"x": 0},{"x": -1}], fn5)
)

//2726. Calculator with Method Chaining
class Calculator {

    constructor(value) {
        this.value = value
    }

    add(value){
        this.value += value
        return this
    }

    subtract(value){
        this.value -= value
        return this
    }

    multiply(value) {
        this.value *= value
        return this
    }

    divide(value) {
        if (value === 0) {
            throw new Error('Division by zero is not allowed')
        }
        this.value /= value
        return this
    }

    power(value) {
        this.value **= value
        return this
    }

    getResult() {
        return this.value
    }
}

let result = new Calculator(10).add(5).subtract(7).getResult()
console.log(result)

//2727. Is Object Empty
const isEmpty = function(obj) {
    return Object.keys(obj).length === 0
}

let obj = {"x": 5, "y": 42}
console.log(isEmpty(obj))


//2618. Check if Object Instance of Class
const checkIfInstanceOf = function(obj, classFunction) {
    if (classFunction === null || classFunction === undefined) {
        return false
    }
    while (obj !== null && obj !== undefined) {
        const currentPrototype = Object.getPrototypeOf(obj)
        if(currentPrototype === classFunction.prototype) {
            return true
        }
        obj = currentPrototype
    }
    return false
}

console.log(checkIfInstanceOf(Date, Date))

//1. Two Sum
// const twoSum = function(nums, target) {
//     let res = []
//     nums.some((num, index) => {
//         let n = index
//         let currNum = nums[n]
//         nums.some((num, index) => {
//             if (num + currNum === target && n !== index) {
//                 res.push(n)
//                 res.push(index)
//                 return true
//             }
//         })
//         if (res.length === 2) {
//             return true
//         }
//     })
//     return res
// }

const twoSum2 = function(nums, target) {
    let res = []
    let map = new Map()
    let diff
    nums.some((num, index) => {
        diff = target - num // 22 - 2 = 20 // 22 - 7 = 15 // 22 - 11 = 11 // 22 - 15 = 7
        if (map.has(diff)) {
            res.push(map.get(diff), index)
            return true
        } else {
            map.set(num, index)
        }
    })
    return res
}
console.log(twoSum2([2,7,11,15], 22)) // [1, 3]

