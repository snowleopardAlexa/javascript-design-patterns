// BACKEND CODE 
// FACTORY PATTERN - CREATIONAL PATTERN
// In this example we leveraging JavaScript’s prototypal inheritance and OLOO — Objects Linking to Other Objects to create objects with a shared prototype.

// The factory pattern wraps a constructor for different types of objects and returns instances of the objects via a simple API. It makes it easy to create different objects by exposing a simple API that return the specified object type.

// LAPTOP.JS

// constructor function - it accepts and object as a parameter with attributes for running the object with various specs we want to capture - ram, hdd, name. 
const Laptop = function({ ram, hdd, name }) {
    this.ram = ram || 0;
    this.hdd = hdd || 0;
    this.name = name || "";
  };
// we export laptop constructor function from the module
module.exports = Laptop;

// TABLET.JS
const Tablet = function({ ram, hdd, name, network }) {
    this.ram = ram || 0;
    this.hdd = hdd || 0;
    this.network = network || 0;
    this.name = name || "";
};
module.exports = Tablet;

// we create factory function that will expose the API for creating new instances of these items. 
// GADGETFACTORY.JS

// we import constructors to create laptop and tablet objects
const Laptop = require("./laptop");
const Tablet = require("./tablet");
// we create a gadget object using the constructor names as the keys
// we can ccess the type of constructor we want using gadget[type] - laptop or tablet
const gadget = { Laptop, Tablet };
module.exports = {
    // we export an object from the module with createGadget method
    // this method accepts a gadget type as the first parameter and calls the
    // specified constructor type while passing in the attributes to it. 
    createGadget(type, attributes) {
        const GadgetType = gadget[type];
        // we call function with a NEW keyword - we get in return an empty object with a this binding set to the one in the executing function. 
        return new GadgetType(attributes);
    }
};

// At this point, we can now create the file that will make use of (or consume) our factory pattern API.

// we need to call gadgetFactory module with its createGadet method
const gadgetFactory = require("./gadgetFactory");

// we create two instanes
const myLaptop = gadgetFactory.createGadget("Laptop", {
    ram: 8,
    ssd: 256,
    name: "Bab's MacBook Pro"
});
const myTablet = gadgetFactory.createGadget("Tablet", {
    ram: 4,
    hdd: 128,
    name: "Bab's iPad",
    network: '4G'
});

// we log out instances to the console
console.log(myLaptop);
console.log(myTablet);

