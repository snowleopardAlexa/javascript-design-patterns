// FACTORY PATTERN WITHOUT SWITCH OR IF STATEMENT

// We try to avoid switch and if statement in this example
switch(carType)
{
    case "Audi-A5":
        return new Audi({ Model = "A5"})
        break;
    case "Mercedes-C200":
        return new Audi({ Model = "C200"})
        break;
    case "Mercedes-A180":
        return new Audi({ Model = "A180"})
        break; 
     default: 
        console.log("No car")   
}

// The issue with logical statements such as switch and if-else in a factory class is whenever you’re developing some new type it should be able to create, you’ll have to modify the factory itself.

// Some developers — often more junior ones — prefer if-else above all else. It’s insanely easy to implement and it’s performant. For a very simple and small codebase, a factory implemented with logical statements might be tolerable.

// Great code is easy to read, extend, and maintain!


