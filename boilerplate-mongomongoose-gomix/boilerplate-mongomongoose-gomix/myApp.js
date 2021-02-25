require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewURLParser: true, 
  useUnifiedTopology: true
});

const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String] 
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  
  const daveFooty = new Person({
    name: "Dave Footy",
    age: 24,
    favoriteFoods: ["Rice","Beans","Greens"]
  });


  daveFooty.save((err,data)=>{
    if(err){
      return console.log(err)
    }
    
      done(null, data);

  });
  
};

const arrayOfPeople = [{name: "Happy Fiona", age: 34, favoriteFoods: ["Apple","Eggs","Veggies"]},
{name: "Jane Gary", age: 64, favoriteFoods: ["Chicken","Burger","Salad"]},{
  name: "Jone Fonte", age: 22, favoriteFoods: ["Pizza","Bacon","Cabbage"]
}]

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, people)=>{
    if(err){
      return console.log(err)
    }
  done(null, people);

  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data)=>{
    if(err){
      return console.log(err)
    }
      done(null, data);

  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data)=>{
    if(err){
      return console.log(err)
    }
    done(null,data);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data)=>{
    if(err){
      return console.log(err)
    }
  done(null, data);
  })
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err,person)=>{
    if(err){
      return console.log(err)
    }
      person.favoriteFoods.push(foodToAdd);
      person.save((err, data)=>{
        if(err){
          return console.log(err)
        }
        done(null,data)
      })
  })
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err,updatedDoc)=>{
    if(err){
      return console.log(err)
    }
      done(null,updatedDoc)
    })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,data)=>{
    if(err){
      return console.log(err)
    }
    done(null, data);
  })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err,data) =>{
    if(err){
      console.log(err)
    }
    done(null, data);
  })

  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err,data)=>{
    if(err){
      console.log(err)
    }
    done(null, data);
  })
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
