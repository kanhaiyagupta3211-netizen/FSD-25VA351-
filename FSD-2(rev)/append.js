const fs =require('fs');

//update
fs.appendFile('example.txt','this is the updated content .',(err)=>{
    if(err) throw err;
    console.log('File overwritten (append)!');
});