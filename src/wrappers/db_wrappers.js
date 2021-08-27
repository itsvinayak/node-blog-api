const db = require("../db");

// module.exports.insert = (tableName, fields, inputs) => {
//     // let exe = "insert into " + tableName + " (";
//     // for (let i = 0; i < fields.length - 1; i++)
//     //     exe += fields[i] + ',';
//     // exe += fields[fields.length - 1] + ") ";
//     // exe += "values ";
//     // console.log(exe);
//     // return db.execute(`${exe} (?,?,?,?,?)`, [...inputs]);
// }
module.exports.insert = (table, data) => {
    let exe = `INSERT INTO ${table} SET ?`;
    return db.query(exe, data);
  };
  
module.exports.update = (tableName, fields,values,clause) => {
    let exe = "update " + tableName + " set ";
    for (let i = 0; i < fields.length - 1; i++)
        exe += fields[i] + "=?, ";
    exe += fields[fields.length - 1] + "=? ";
    exe += "where id =? ";
    values = values.map(myfun);
    function myfun(str)
    {
        if(typeof(str)=="string")
            return  `"`+str+`"`;
        else
            return str;
    } 
    values.push(clause);
    console.log(exe);
    console.log(...values);
    return db.query(
        `${exe}`, [...values]);
    // `update ? set name=?, address=?,email=?, password=? where id = ?`,
    // [tableName, fields.name, fields.address,fields.email,fields.password,...clause]);        
}
module.exports.read = (tableName, fields, clause) => {
    if (typeof (clause) == Number)  // retrieval by user-id
    {
        let exe = "select *";
        exe += " from user where id = ?";
        return db.execute(
            `${exe}`,[clause]);
    }
    else if (typeof (clause) === "string") //retrieval by email id
    {
        return db.query(`select * from ${tableName} where email = ?`,[clause]);
    }
    else {
        
        let val = "select ";
        for(let i=0;i<fields.length-1;i++)
            val+=fields[i]+",";
        val+=fields[fields.length-1];
        val+=" from "+tableName;
        return db.execute(val);
    }
},
module.exports.drop = (tableName, clause) => {
    return db.execute(`delete from ${tableName} where id = ?`,[clause]);

    }