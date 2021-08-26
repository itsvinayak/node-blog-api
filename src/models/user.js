const db = require("../db");
const dbUtil = require("../wrappers/db_wrappers")
module.exports =  {
  create(name, address, email, password, admin) {
      return dbUtil.insert('user',['name', 'address', 'email', 'password', 'admin'],[name, address, email, password, admin]);
  },
    getUsers(){
        const query =  dbUtil.read('user',['name', 'address', 'email', 'password', 'admin'])
        return db.execute(query);
             },
    getUserByUserId(id){
        const query = dbUtil.read('user',['name', 'address', 'email', 'password', 'admin'],id);
        return db.execute(query);
    },
    updateUser(id,name,address,email,password){
        const query = dbUtil.updateUser('user',[name,address,email,password],id);
        return db.execute(query);
        },
     deleteUser(id){
         const query = dbUtil.delete('user',id);
         return db.execute(query);
    },
    getUserByUserEmail(email){
        const query = dbUtil.read('user',['name', 'address', 'email', 'password', 'admin'],email);   
        return db.execute(query);
    },
    signUp(name,address,email,password,admin){
        return dbUtil.insert('user',['name','address','email', 'password', 'admin'],[name, address, email, String(password), admin]);
       
}
}

