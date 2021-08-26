const db = require("../db");

module.exports.insert= (tableName,fields,inputs)=>{
    let input1 = inputs.map(myfun);
    function myfun(str)
    {
        if(typeof(str)===`string`){
            console.log(str);
        return (`"`+str+`"`);
        }
        else{
            return str;
        }
    }   
    fields = fields.join(",");
    input1 = input1.join(",");
    console.log(tableName);
    console.log(fields);
    console.log(input1);
    // return db.execute(`insert into ? (?) values (?)`,[tableName,fields,input1]);
    // return db.execute(`insert into user (name,address,email,password,admin) values (${input1})`); ---This is working
    // return db.execute(`insert into user (name,address,email,password,admin) values (?,?,?,?,?)`,[input1]); ---Malperformed communication package
    return db.query(`insert into user (name,address,email,password,admin) values (?,?,?,?,?)`,[[...input1]]);
    // return db.execute(`insert into user (${fields}) values (${input1})`); --- This is working fine
}
module.exports.update = (tableName,fields,clause)=>{
    return db.execute(
        `update ? set name=?, address=?,email=?, password=? where id = ?`,
        [tableName, fields.name, fields.address,fields.email,fields.password,...clause]);        
}  
module.exports.read=(tableName,fields,clause)=>{
    if(clause == id)
    {
         return db.execute(
            `select ? from ? where id = ?`,[...fields,tableName,id] );
    }
    else if (clause == email) {
        return db.execute(
            `select * from ? where email = ?`,[tableName,email]);   
    }
    else
    {
        return db.execute(`select ? from ?`,[...fields,tableName]);
    }
},
module.exports.drop = (tableName,clause)=>{
    if(clause!==undefined)
    {
      return db.execute(`delete from ? `,[tableName]);
    }
    else
    {
      return db.execute(`delete from ? where id = ?`,[tableName,clause]);
    }
}