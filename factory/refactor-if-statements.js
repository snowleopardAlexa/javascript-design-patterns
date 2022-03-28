// 5 ways to refactor if/else statements in JS functions
// default parameters,
// or (||) operator
// ternary operator
// nullish coalescing,
// optional chaining,
// no-else-returns 
// guard clauses

// Imagine that you work with inconsistent API and your code breaks because some values are UNDEFINED?

// c is inconsistent - you might get its value or not 
let sum = (a, b, c) => a + b + c

sum(1, 45, 5) // => 51
sum(40, 10, undefined) // => NaN

// instictive solution to this problem is to add if/else statement
let sum = (a, b, c) => {
    if (c === undefined) {
        return a + b
    } else {
        return a+b+c
    }
}

sum(1, 45, 5) // => 51
sum(1, 45, undefined) //> 51


// DEFAULT PARAMETERS
// You can simplify function and kick out if/else logic by implementing DEFAULT PARAMETERS:
let sum = (a, b, c = 0) => a + b + c

sum(1, 45, 5) // => 51
sum(40, 10, undefined) // => 51

// OR OPERATOR
// The above problem not always can be solved with default parameters. Sometimes, you may be in a situation when you need to use an if-else logic, especially when trying to build conditional rendering feature. In this case, the above problem would be typically solved in this way:

let sum = (a, b, c) => {
    if (c === undefined || c === null || c === false) {
        return a + b 
    } else {
        return a + b + c
    }
}

sum(1, 39, 2) // => 42
sum(2, 40, undefined) // => 42
sumf(2, 40, null) // => 42
sum(2, 40, false) // => 42
sumf(2, 40, 0) // => 42
/// 🚨🚨🚨 but:
sumFunctionWithIf(1, 39, '') // => "40"

// TERNARY OPERATOR
let sum = (a, b, c) => {
    c = !c ? c : 0 
    return a + b + c 
}

sumFunctionWithTernary(1,39,2) // => 42
sumFunctionWithTernary(2, 40, undefined) // => 42
sumFunctionWithTernary(2, 40, null) // => 42
sumFunctionWithTernary(2, 40, false) // => 42
sumFunctionWithTernary(1, 39, '') // => 42
sumFunctionWithTernary(2, 40, 0) // => 42

// OR || operator
// it returns the right hand side when the left side is a FALSEY value
// returns the left side if it is TRUTHY

let sum = (a, b, c) => {
    c = c || 0
    return a + b + c 
}

sumFunctionWithOr(1,39,2) // => 42
sumFunctionWithOr(2,40, undefined) // => 42
sumFunctionWithOr(2,40, null) // => 42
sumFunctionWithOr(2,40, false) // => 42
sumFunctionWithOr(2,40, '') // => 42
sumFunctionWithOr(2, 40, 0) // => 42

// NULLISH COALESCING
// Sometimes, however, you do want to preserve 0 or '' as valid arguments and you cannot do that with the || operator, as visible in the above example. Fortunately, starting with this year, JavaScript gives us access to the ?? (nullish coalescing) operator, which returns the right side only when the left side is null or undefined. This means that if your argument is 0 or '', it will be treated as such. Let's see this in action:

let sum = (a, b, c) => {
    c = c ?? 0.424242
    return a + b + c
}

sumFunctionWithNullish(2, 40, undefined) // => 42.424242
sumFunctionWithNullish(2, 40, null) // => 42.424242
/// 🚨🚨🚨 but:
sumFunctionWithNullish(1, 39, 2) // => 42
sumFunctionWithNullish(2, 40, false) // => 42
sumFunctionWithNullish(2, 40, '') // => "42"
sumFunctionWithNullish(2, 40, 0) // => 42

// OPTIONAL CHAINING
//Lastly, when dealing with inconsistent data structure, it is a pain to trust that each object will have the same keys. See here:

let functionThatBreaks = (object) => {
    return object.name.firstName
  }

  functionThatBreaks({name: {firstName: "Sylwia", lasTName: "Vargas"}, id:1}) // ✅ "Sylwia" 
  functionThatBreaks({id:2}) // 🚨 Uncaught TypeError: Cannot read property 'firstName' of undefined

// This happens because object.name is undefined and so we cannot call firstName on it.

// instictive solution - if statement
let functionWithIf = (object) => {
    if (object && object.name && object.name.firstName) {
      return object.name.firstName
    }
  }

  functionWithIf({name: {firstName: "Sylwia", lastName: "Vargas"}, id:1) // "Sylwia"
  functionWithIf({name: {lasName: "Vargas"}, id:2}) // undefined
  functionWithIf({id:3}) // undefined
  functionWithIf() // undefined

  // ECMA2020 JS FEATURE: OPTIONAL CHAINING
  // Optional chaining checks at every step whether the return value is undefined and if so, it returns just that instead of throwing an error.
  let functionWithChaining = (object) => object?.name?.firstName 

  functionWithChaining({name: {firstName: "Sylwia", lastName: "Vargas"}, id:1}) // "Sylwia"
  functionWithChaining({name: {lasName: "Vargas"}, id:2}) // undefined
  functionWithChaining({id:3}) // undefined
  functionWithChaining() // undefined

  // NO-ELSE-RETURNS

  // Imagine the problem
  let nestedIfElseHell = (str) => {
    if (typeof str == "string"){
      if (str.length > 1) {
        return str.slice(0,-1)
      } else {
        return null
      }
    } else { 
      return null
    }
  }

nestedIfElseHell("") // => null 
nestedIfElseHell("h") // => null
nestedIfElseHell("hello!") // => "hello"

// Now, we could simplify this function with the no-else-return statement since all we are returning is null anyway:
let noElseReturns = (str) => {
    if (typeof str == "string"){
      if (str.length > 1) {
        return str.slice(0,-1)
      }
    }

    return null
  }

noElseReturns("") // => null 
noElseReturns("h") // => null
noElseReturns("hello!") // => "hello"

// The benefit of the no-else-return statement is that if the condition is not met, the function ends the execution of the if-else and jumps to the next line. You could even do without the last line (return null) and then the return would be undefined.

// GUARD CLAUSES
// Now we could take it a step further and set up guards that would end the code execution even earlier:
let guardClauseFun = (str) => {
    // ✅ first guard: check the type
    if (typeof str !== "string") return null
    // ✅ second guard: check for the length
    if (str.length <= 3) console.warn("your string should be at least 3 characters long and its length is", str.length) 
    // otherwise:
    return str.slice(0,-1)
  }

guardClauseFun(5) // => null 
guardClauseFun("h") // => undefined with a warning
guardClauseFun("hello!") // => "hello"




