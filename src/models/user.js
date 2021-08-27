const db = require("../db");
const dbUtil = require("../wrappers/db_wrappers")
module.exports =  {
  create(name, address, email, password, admin) {
    let data= {};
    let field =['name','address','email', 'password', 'admin']
    let input =[name,address,email,password,admin];
    for (let i=0;i<input.length;i++)
    {
        data[field[i]]=input[i];
    }
    return dbUtil.insert('user',data);
  },
    getUsers(){
        return  dbUtil.read('user',['name', 'address', 'email', 'password', 'admin'])
             },
    getUserByUserId(id){
        return dbUtil.read('user',['name', 'address', 'email', 'password', 'admin'],id);
    },
    updateUser(id,name,address,email,password){
        return dbUtil.update('user',['name', 'address', 'email', 'password'],[name,address,email,password],id);
        },
     deleteUser(id){
         return dbUtil.drop('user',id);
    },
    getUserByUserEmail(email){
        return dbUtil.read('user',['name', 'address', 'email', 'password', 'admin'],email);   
    },
    signUp(name,address,email,password,admin){
        let data= {};
        let field =['name','address','email', 'password', 'admin']
        let input =[name,address,email,password,admin];
        for (let i=0;i<input.length;i++)
        {
            data[field[i]]=input[i];
        }
        return dbUtil.insert('user',data);
       
}
}

