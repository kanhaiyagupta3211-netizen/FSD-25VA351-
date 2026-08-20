const arr1=[1,2,3];
const arr2=[4,5,6];

const combined=[...arr1,...arr2];
console.log(combined);

function sumALL(...nums){
    return nums.reduce((a,b)=>a+b,0);

}

console.log(sumAll(1,2,3,4,5));

