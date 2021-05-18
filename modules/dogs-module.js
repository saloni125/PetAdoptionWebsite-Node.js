const db = require("../data/dbConfig.js");
module.exports={}

module.exports = {
    find,
    findById,
    findByKennel,
    add,
  };

async function add(dog){
  const [id] = await db('dogs').insert(dog);
  return findById(id);
}
async function find() {
  const dogs = await db("dogs")
  var fullDogs =[]
  for(i=0; i<dogs.length; i++){
    // console.log(dogs[i].id)
    const dog = await findById(dogs[i].id)
    fullDogs.push(dog)
  }
  return fullDogs;
}
async function findById(id) {
  const dog = await db("dogs").where({id}).first();
  const breedID = await db("dog_breeds").innerJoin('dogs', 'dogs.id', 'dog_breeds.dog_id').where({"dog_id": dog.id})
  const breeds = await Promise.all(
    breedID.map(async(breed)=>{
      try {
        const name = await findBreed(breed.breed_id)
        return name[0].name
      } catch (error) {
        console.log(error)
      }
    })
  )
  return {...dog, breeds}
}
function findBreed(id){
    return db("breeds").where({id})
}
async function findByKennel(kennel_id){
  const dogs = await db("dogs").where({kennel_id});;
  var full =[]
  for(i=0; i<dogs.length; i++){
    const dog = await findById(dogs[i].id)
    full.push(dog)
  }
  return full
}