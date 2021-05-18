const db = require("../data/dbConfig.js");
module.exports={}


module.exports = {
    add,
    find,
    findById,
    findByAdmin
  };


async function add(notification) {
  const [id] = await db('notifications').insert(notification);
  return findById(id);
}
function findById(id){
  return db('notifications').where({id})
}
function findByAdmin(id){
  return db('notifications').where({"admin_id":id})
}
function find(){
  return db('notifications')
}