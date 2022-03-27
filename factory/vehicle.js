// The factory pattern is an object-oriented — — OOP design pattern that involves creating objects by using a factory.
// A factory is an object or class or a function in a functional programming paradigm for creating objects.
// Although there are different object creation methods in JavaScript, the factory pattern keeps our object creation logic concise and reusable.

////////////// 1 ////////////////

// creates vehicle using object literal
const Vehicle = {
    manufacturer: "Toyota",
    PlateNO: 12345,
    startEngine () {console.log("reving engine"},
    drive () {console.log("driving car...")}
}
	
// creates new vehicle using object literal
const Vehicle = {
    manufacturer: "Ford",
    PlateNO: 13345,
    startEngine () {console.log("reving engine"},
    drive () {console.log("driving car...")}
}

// DOWNSIDE --> REDUNDANT METHODS: startEngine, drive. 
// This small example just log a string to the console, but in reality our programs can be complex and repeating these methods the same way can lead us to bugs. 
// Also if we get a bug we would have to fix it across all the objecs they have been used. 

// SOLUTION
function vehicleFactory (manufacturer, plateNO) {
    return {
        manufacturer,
        plateNO,
        startEngine() {
            console.log("reving engine")
        },
        drive() {
            console.log("driving car...")
        }
    }
}

const VehicleOne = vehicleFactory("Toyota", "ZAW23456")
console.log(VehicleOne)

const VehicleTwo = vehicleFactory("Ferrari", "POO2345")
console.log(VehicleOne)

const VehicleThree = vehicleFactory("Lamborghini", "POO2345")
console.log(VehicleThree)

// From our code above, we see that our factory function centralizes our object creation logic thereby, keeping our code DRY. Also, in case of any bug, we only need to fix it in the factory and it would reflect in all our code. Thus increasing our code maintainability.
// Our example above is very basic and one can easily implement it using a constructor function or an ES6 class.

////////////// 2 ////////////////

// However, factories keep our code clean by centralizing our object creation logic and eliminating repeated constructor calls with the new operator.
// The factory pattern shines if the object creation process involves dynamic factors or application configuration.
// Imagine a vehicle factory that produces different kinds of vehicles: trucks, cars, buses ambulances, etc. We can implement this using the factory pattern as seen below.

class Car {
    constructor(options) {
        this.wheels = options.wheels || 4;
        this.doors = options.doors || 4;
        this.color = options.color || "silver"; 
    }
}

class Truck {
    constructor(options) {
        this.wheels = options.wheels || 6;
        this.doors = options.doors || 2;
        this.color = options.color || "red"; 
    }
}

// we create a new vehicle with Car and Truck class with usage of new operator
class Factory {
    // we determine which class to run using the vehicleType parameter
    // when class to run depends on dynamic factors -> the factory pattern is useful
    create = (options, vehicleType) => {

        if(!vehicleType) {
            return "unable to make vehicle. Please specify a vehicle type and tryagain!"
        }

        let vehicle;
        
        if (vehicleType === "car") {
            vehicle = new Car(options)
        } else if (vehicleType === "truck") {
            vehicle = new Truck(options);
        } else if (vehicleType == "bus") {
            vehicle = new Bus(options)
        } else if (vehicleType === "motorcycle") {
            vehicle = new Motorcycle(options)
        }

		
        vehicle.vehicleType = vehicleType;

        // factory design pattern promotes code reusability by reusing StartEngine, driveVehicle, and stopEngine methods --> regardless which type of vehicle is created by the class Factory, we can invoke/call these methods from the vehicle instance. --> ${vehicleType}
        vehicle.startEngine = ()=> console.log(`Reving ${vehicleType} engine`);
        vehicle.driveVehicle = ()=> console.log(`Driving ${vehicleType}...`);
        vehicle.stopEngine = ()=> console.log(`Stop ${vehicleType} engine`);

        return vehicle;
    }
	
};

const vehicleFactory = new Factory()

// CAR
const car = vehicleFactory.create({
    wheels: 4,
    doors: 2,
    color: "black",
}, "car")

console.log(car)
console.log(car.startEngine())
console.log(car.driveVehicle())

// TRUCK
const truck = vehicleFactory.create({
    wheels: 4,
	doors: 2,
	color: "yellow",
}, "truck")

console.log(truck)
console.log(truck.startEngine())
console.log(truck.stopEngine())

// BUS 
const bus = vehicleFactory.create({
    wheels: 4,
	doors: 2,
	color: "yellow",
}, "truck")

console.log(bus)
console.log(bus.startEngine())
console.log(bus.stopEngine())

// MOTORCYCLE
const motorcycle = vehicleFactory.create({
    wheels: 4,
	doors: 2,
	color: "yellow",
}, "truck")

console.log(motorcycle)
console.log(motorcycle.startEngine())
console.log(motorcycle.stopEngine())

// this code is easily maintainable, so if the business expands and the factory starts producing new kinds of vehicles, we can easily refactor our implementation to handle this. 

// ADD TWO MORE VEHICLES TO THE CODE ABOVE 

class Bus {
    constructor(options) {
        this.wheels = options.wheels || 4;
        this.doors = options.doors || 4;
        this.color = options.color || "white"; 
    }
}

class Motorcycle {
    constructor(options) {
        this.wheels = options.wheels || 2;
        this.doors = options.doors || 0;
        this.color = options.color || "Black"; 
    }
}

// THE ABOVE EXAMPLE RELIES HEAVILY ON CLASS FIELDS --> A NEW JS PROPOSAL. 

///////// ALTERNATIVE TO TASK 2 //////////
// Use class constructors --> this would allow us to create instances of our Class factory that id dedicated to creating a specific type of vehicle. Consider the code below:

class Car {
    constructor(options) {
        this.wheels = options.wheels || 4;
        this.doors = options.doors || 4;
        this.color = options.color || "silver"; 
    }
}

class Truck {
    constructor(options) {
        this.wheels = options.wheels || 6;
        this.doors = options.doors || 2;
        this.color = options.color || "red"; 
    }
}

class Factory {

    constructor(type) {
        this.type = type;
    }

    create = (options) => {
        let vehicleType = this.type
        let vehicle

        if (vehicleType === "car") {
            vehicle = new Car(options);
        } else if (vehicleType === "truck") {
            vehicle = new Truck(options);
        } else if (vehicleType === "bus") {
            vehicle = new Bus(options);
        } else if (vehicleType === "motocycle") {
            vehicle = new Motocycle(options);
        }

        vehicle.vehicleType = vehicleType
         
        vehicle.startEngine = ()=> console.log(`Reving ${vehicleType} engine`);
        vehicle.driveVehicle = ()=> console.log(`Driving ${vehicleType}...`);
        vehicle.stopEngine = ()=> console.log(`Stop ${vehicleType} engine`);

        return vehicle
    }
}

// CAR
const CarFactory = new Factory("car")
const car = CarFactory.create({
    wheels: 12,
    doors: 2,
    color: "yellow"
})

console.log(car)
car.startEngine()
car.stopEngine()

// TRUCK
const TruckFactory = new Factory("truck");
const truck = TruckFactory.create({
    wheels: 12,
    doors: 2,
    color: "yellow"
})


console.log(truck)

truck.startEngine();
truck.stopEngine();

// In our factory above, we dynamically set the vehicleType to the class field declared in the constructor. Thus during initialization, we can specify which type of vehicle the factory instance would create. And the result of this is that TruckFactory only creates trucks and CarFactory only creates cars.

// WHEN TO USE A FACTORY PATTERN 
// when out object creation process involves a high level complexity
// when we need to return different instances/particular cases of an object depending on some dynamic factors or application config
// when a class can't determine the subclass it must create
// when we need to create different small objects that share some properties

// PROS
// Promotes loose decoupling by separating the object creation from its implementation
// Enables us to create different instances based on conditions
// Promotes code reusability and maintainability
// Encapsulates the constructor or class and exposes only a defined interface.

// CONS
// Can be complex to implement in some cases
// Depending on the complexity can be difficult to test because of the level of abstraction it introduces.

// The factory pattern is a very powerful object creation mechanism. And it is particularly useful in complex object creation processes that involve dynamic factors


