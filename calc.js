console.log('I am alive!');

// Basic math logic goes here
const add = function(...args) {
    let total = 0;
    for (let x of args) {
        total += x;
    }
    return total;
}

const multiply = function(...args) {
    if(args.length === 0) return 0;
    let total = 1;
    for (let x of args) {
        total *= x;
    }
    return total;
}

