
const fs=require('fs');

//Create
fs.writeFile('example.txt','I AM KANHAIYA GUPTA FROM KANPUR CURRENTLY PURSUIONG MY B.TECH FROM ABES ENGINEERING COLLEGE TALKING ABOUT MY STRENGHT I AM A QUICK LEARNER ,HARDWORKING AND HAVE A POSITIVE ATTITUDE ',(err)=>{
    if(err) throw err;
    console.log('File created');

    //READ
    fs.readFile('example.txt','utf8',(err,data)=>{
        console.log('File content:',data);
    });
    
});