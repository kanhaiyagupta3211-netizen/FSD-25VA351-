const fs =require('fs');

//update
fs.writeFile('example.txt','this is the updated content .',(err)=>{
    if(err) throw err;
    console.log('File overwritten (updated)!');
});