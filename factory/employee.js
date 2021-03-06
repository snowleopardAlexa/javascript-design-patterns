// FACTORY PATTERN --> this is CREATIONAL pattern 
// it uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. 
// it makes the code more robust, less coupled and easy to extend and read.
// FACTORY --> it is a building where things are manufactured. 
// FACOTRY is an object that manufactures different objects. 
// Why do I need an object to create an object?
// FACTORY allows you to create your objects in centralized location - it is clean.

// FACTORY PATTERN
// Three types of employees --> developers, testers, designers
// Write a code that creates three type of employees and insert them into a database.

// JAVASCRIPT

function Developer(name)
{
    this.name = name 
    this.type = "Developer"
}

function Tester(name)
{
    this.name = name
    this.type = "Tester"
}

function Designer(name)
{
    this.name = name
    this.type = "Designer"
}

// factory pattern
function EmployeeFactory() 
{
    this.create = (name, type) => {
        switch(type)
        {
            case 1:
                return new Developer(name)
                break;
            case 2:
                return new Tester(name)
                break;
            case 3:
                return new Designer(name)
                break;  
             default: 
                console.log("No employee")   
        }
    }
}

function say() 
{
    console.log("Hi, I am " + this.name + " and I am a " + this.type)
}

const employeeFactory = new EmployeeFactory()
const employees = []

employees.push(employeeFactory.create("Patrick", 1))
employees.push(employeeFactory.create("John", 2))
employees.push(employeeFactory.create("Clara", 3))

employees.forEach(emp => {
    say.call(emp)
})


