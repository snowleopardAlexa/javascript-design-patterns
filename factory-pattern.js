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

// REACT 
// Let’s say we need to implement a screen where users can enter their info using different React Native input components. The list of components is received from the server, meaning, it can be changed at any time dynamically. For the sake of brevity, in this example we will assume that only the following four fields are received: Username, Password, Birthday and Gender. We will also assume that we have already created matching React Native components for these fields, called <Username>, <Password>, <Birthday> and <Gender>

// simplified JSON response recieved from server could look like
{
    "items": [
      {
        "id": "item-id-1",
        "type": "username",
        "placeholder": "Please enter your username",
        "required:": true,
        "minLength": 3,
        "maxLength": 15
      },
      {
        "id": "item-id-2",
        "type": "password",
        "required:": true,
        "placeholder": "Please enter your password",
        "minLength": 8,
        "maxLength": 64
      },
      {
        "id": "item-id-3",
        "type": "birthday",
        "required:": false,
        "placeholder": "Please enter your birthday",
        "minDate": "1900-01-01",
        "maxDate": "2020-01-01"
      },
      {
        "id": "item-id-4",
        "type": "gender",
        "required:": false,
        "placeholder": "Please enter your gender",
        "options": [
          "male",
          "female"
        ]
      }
    ]
  }

// --> THE APP MAKES A DECISION ON WHICH COMPONENT IT WILL USE BY LOOKING AT THE TYPE PROPERTY.
// TYPE property

// typical factory based on the switch statement:
function userInfo(item) {
    switch(item.type) {
        case 'username':
            return <Username item={item} />
        case 'password':
            return <Password item={item} />
        case 'birthday':
            return <Birthday item={item} />
        case 'gender':
            return <Gender item={item} />
        default: 
            return null;                
    }
}

// this function can be called in the screen render method

    const {items} = props;

    const components = items.map(item => <UserInfo item={item} />)

    return (
       <div>
           {components}
       </div>
    )


// WHY SWITCH AND CONDITIONAL STATEMENTS ARE SOMETIMES BAD TO USE WITH FACTORY PATTERN?
// ask yourself these questions:
// Does it need to be maintainable?
// Does it need to be fast? 
// Does it need to scale? 
// Does it need to be extendable? 
// Does it need to be simple?

// Switch statements are great for simple tasks and avoiding using them can cause an issue too. Sometimes there is no better solution than a switch statement --> in a procedural language such as C - switch is better than any of the alternatives, but in OOP language, there are other alternatives that better utilise the object structure. 

// SWITCH STATEMENT VIOLATES OPEN/CLOSE PRINCIPLE
// your code entities - classes, modules, functions should be OPEN FOR EXTENSION, BUT CLOSED FOR MODIFICATION --> you should be able to add NEW FUNCTIONALITY without changing the exisiting code. --> this prevents the situation in which changes to one of yout classes also requires you to adapt all depending classes. 
// Switch statements are scattered throughout the project --> if you add or remove a clause in one switch, you need to change all the other switch statement too. 

// SIZE AND SCALABILITY OF YOUR CODE
// if your task contains just a few different types of objects and is NOT EXPECTED to grow, switch can do just fine, and the alternatives will only BLOAT your code with a lot of boilerplate. 
// But if you expect many different types of objects in the future, you should definitely reconsider the approach. 
// logic inside the switch statement will get harder to read
// each new case will be redundant 
// you will end up with unmaintainable and ugly chunk of code
// if you don't use a LINTER and you forget to add a break in one case, you're screwed!
// every method in your code should be as small as possible 
// having to scroll through dozens or hundreds of conditionals is not user friendly and can be confusing for others too. 

// Let's imagine that our JSON response have more fields
// now we are stuck with this code
function userInfo(item) {
    switch (item.type) {
      case 'username':
        return <Username item={item} />;
      case 'password':
        return <Password item={item} />;
      case 'birthday':
        return <Birthday item={item} />;
      case 'gender':
        return <Gender item={item} />;
      case 'firstName':
        return <FirstName item={item} />;
      case 'lastName':
        return <LastName item={item} />;
      case 'email':
        return <Email item={item} />;
      case 'country':
        return <Country item={item} />;
      case 'city':
        return <City item={item} />;
      case 'avatar':
        return <Avatar item={item} />;
      case 'coverImage':
        return <CoverImage item={item} />;
      case 'about':
        return <About item={item} />;
      case 'phone':
        return <Phone item={item} />;
      case 'website':
        return <Website item={item} />;
      case 'favoriteColor':
        return <FavoriteColor item={item} />;
      case 'company':
        return <Company item={item} />;
      case 'facebook':
        return <Facebook item={item} />;
      case 'twitter':
        return <Twitter item={item} />;
      case 'snapchat':
        return <Snapchat item={item} />;
      case 'tiktok':
        return <TikTok item={item} />;
      case 'instagram':
        return <Instagram item={item} />;
      case 'Linkedin':
        return <Linkedin item={item} />;
      default:
        return null;
    }
  }

// Let's refactor this code
class Field extends Component {
    constructor({ type }) {
        super();
        this.type = type;
    }
}

export default Field;

// Create factory for each of the fields

// username
class Username extends Field {
    const { item } = this.props;
  
    render() {
      ...
    }
  }
  
  class UsernameFactory {
    get type() { return 'username'; }
    
    create({ item }) {
      return <Username item={item} />;
    }
  }
  
  export default UsernameFactory;

// password
class Password extends Field {
    const { item } = this.props;
  
    render() {
      ...
    }
  }
  
  class PasswordFactory {
    get type() { return 'password'; }
    
    create({ item }) {
      return <Password item={item} />;
    }
  }
  
  export default PasswordFactory;

  // birthday 
  class Birthday extends Field {
    const { item } = this.props;
  
    render() {
      ...
    }
  }
  
  class BirthdayFactory {
    get type() { return 'birthday'; }
    
    create({ item }) {
      return <Birthday item={item} />;
    }
  }
  
  export default BirthdayFactory;

  // gender
  class Gender extends Field {
    const { item } = this.props;
  
    render() {
      ...
    }
  }
  
  class GenderFactory {
    get type() { return 'gender'; }
    
    create({ item }) {
      return <Gender item={item} />;
    }
  }
  
  export default GenderFactory;

// Each one of these factories is completely responsible for handling everything related to its field. You will put all UI code here, as well as the event listeners which are different for every field. There is no need to scatter the field-specific code anywhere else in the app, and it’s very easy to add and remove fields.

// Now, let’s connect everything by creating the controller classes for the factory:

class FactoryMapper {
    constructor() {
      const usernameFactory = new UsernameFactory();
      const passwordFactory = new PasswordFactory();
      const birthdayFactory = new BirthdayFactory();
      const genderFactory = new GenderFactory();
  
      this.factories = {};
      this.factories[usernameFactory.type] = usernameFactory;
      this.factories[passwordFactory.type] = passwordFactory;
      this.factories[birthdayFactory.type] = birthdayFactory;
      this.factories[genderFactory.type] = genderFactory;
    }
  
    factory = type => type && this.factories[type];
  }
  
  export default FactoryMapper;



  class Factory {
    constructor() {
      this.factoryMapper = new FactoryMapper();
    }
  
    create({ item }) {
      const { type } = item;
      const factory = this.factoryMapper.factory(type);
      return factory.create({ item });
    }
  }
  
  export default Factory;

// SCREEN COMPONENT
class Screen extends Component {
    constructor() {
      super(props);
      this.factory = new Factory();
    }
  
    render() {
      const { items } = this.props;
      
      const components = items.map(item => this.factory.create({ item });
  
      return (
        <View>
          {components}
        </View>
      );
    }
  }

  // now each time you need to add a new type of component you can create its own factory and link it in the FactoryMapper class
  // this makes your code easily readable and allows you to add or remove components very easily - no fear to break existing code!
  // this approach scares us because of the boliterplate code at the beginning but it's all about scaling, and when you finish the initial setup described here, maintaining this code is a breeze, as it requires very little effort in order to add or remove components. 

  // Switch statements are not bad, they are just not always very OOP
  // if you plan to support only a couple of componenents by all means, stick to switch-based factories. 
  // if you are going to support a huge number of dynamically generated components, this is a perfect tool for you. 


