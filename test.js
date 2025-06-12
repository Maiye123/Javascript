// // // // console.log("Hello, World!");
// // // // console.log(2+2);

// // // // let greet= "Hello world!";

// // // // console.log(greet);

// // // // function showGreet(){
// // // //     console.log(greet); 

// // // //     let reply ='hi';

// // // //     console.log(reply);
// // // // }

// // // // showGreet();
// // // // console.log(reply);

// // // const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

// // // array.push(true);   // adds element at the end of the array
// // // console.log(array);

// // // array.pop();  // remove last element in the array
// // // console.log(array);

// // // array.shift();   // remove first element in the array
// // // console.log(array);

// // // array.unshift(77, 99, 67);   // adds multiple element to the begining of an array
// // // console.log(array);

// // // console.log(array.slice(2)); //starts from index 2

// // // console.log(array.slice(2,8)); //starts from index 2 and ends on index 7

// // // let newArray = array.map((x) => x*2);  // multiply the element in the array by 2
// // // console.log(newArray);

// // // let newArrayy= array.filter((a) => a>=5);
// // // console.log(newArrayy);


// // // let person = {
// // //     name: "Ade",
// // //     age: "20",
// // //     height: "150m",
// // //     isMarried: "False",
// // //     cars: null,
// // //     startEngine: function () {
// // //         console.log("car has started");
// // //     },
// // //     address: {
// // //         state: "Lagos",
// // //         lga: "Ikeja",
// // //         streetNumber: 23,
// // // },
// // //     bestFruits: ["apple", "orange", "tangerine", "pawpaw"],
// // // };

// // // console.log(person.isMarried);
// // // person.startEngine();

// // // console.log(person.address.lga);
// // // console.log(person.bestFruits[2]);


// // // const age = 20;

// // // if (age <=18){
// // //     console.log("No access");
// // // }

// // // else {
// // //     console.log("Welcome");
// // // }


// // // let userInput= prompt("Enter your age");

// // // if (userInput <=18){
// // //     console.log("No access");
// // // }

// // // else {
// // //     console.log("Welcome");
// // // }


// // // let grade= prompt("Enter your grade"); //He used const grade = 57;

// // // if (grade<40){
// // //     console.log("F");
// // // }

// // // else if (grade<50){
// // //     console.log("D");
// // // }
// // // else{
// // //     console.log("C")
// // // }


// // let day= new Date().getDay();  // days of the wee are represented as 0-6
// // // let day= new Date();  //shows todays date


// // // day =7;
// // // let day= new Date().getMonth();  //shows the month fom 0-11

// // // console.log(day);


// // //Switch statement
// // switch(day){
// //     case 0: 
// //     console.log("Today is Sunday");
// //     break;

// //     case 1: 
// //     console.log("Today is Monday");
// //     break;

// //     case 2: 
// //     console.log("Today is Tuesday");
// //     break;

// //     case 3: 
// //     console.log("Today is Wednesday");
// //     break;

// //     case 4: 
// //     console.log("Today is Thursday");
// //     break;

// //     case 5: 
// //     console.log("Today is Friday");
// //     break;

// //     case 6: 
// //     console.log("Today is Saturday");
// //     break;

// //     default:
// //         console.log("not a valid day of the week");
// // }


// //Functions

// // function add(x, y){
// //     return x + y;
// //     console.log("This is a code");// nothing work after return keyword.
// // }

// // let result = add(4, 6);
// // console.log(result);

// // const person ={
// //     name: "David",
// //     greet: function() {
// //        console.log("My name is:" + " "+ this.name);
// //     }

// // }
// // person.greet(); // Calls the greet method of the person object

// // const add = (x, y) => {
// //     return x + y;    //Arrow function syntax
// // }

// // const double = (x) => x * 2;  //single line arrow function

// // function Person() {
// //     this.age = 10;  //this refers to the global object in this context
// //     this.height = 150;  
// //     this.name = "John"; 

// // setInterval(() => {
// //     this.age ++;  
// //     console.log(this.age);  
// // }, 3000);  //Executes the function every 3 seconds
// // }

// // Person();

// // const person = {
// //     name: "Kemi",
// //     age: 40,  
// //     address: {
// //         state: "Lagos",
// //         lga: "Ikeja"
// //     },
// //     complexion: "dark"
// // };

// // console.log(person.address.state);  // Accessing nested object property


// // console.log("My name is:" + " " + person.name + ",I am " + person.age + " years old, I live in " + person.address.state + ", " + person.address.lga + ", and my complexion is " + person.complexion + ".");  



let data ={
"companyName": "TechNova Solutions",
"location": "San Francisco, CA",
"departments": [
{
"name": "Engineering",
"manager": {
"name": "Alice Johnson",
"email": "alice.j@technova.com",
"role": "Engineering Director"
},
"employees": [
{
"name": "Bob Smith",
"role": "Senior Software Engineer",
"skills": ["JavaScript", "React", "Node.js"]
},
{
"name": "Charlie Lee",
"role": "Frontend Developer",
"skills": ["HTML", "CSS", "Vue.js"]
}
]
},
{
"name": "Marketing",
"manager": {
"name": "Diana Moore",
"email": "diana.m@technova.com",
"role": "Marketing Lead"
},
"employees": [
{
"name": "Elena Torres",
"role": "Content Strategist",
"projects": ["Blog Campaign Q1", "Social Media Strategy"]
},
{
"name": "Frank Chen",
"role": "SEO Specialist",
"projects": ["SEO Audit", "Keyword Research"]
}
]
}
],
"foundedYear": 2015,
"isRemoteFriendly": true
}


// const engineeringEmployeeNames = data.departments[0].employees;

// engineeringEmployeeNames.map((x) => console.log(x.name)); 
// engineeringEmployeeNames.map((x) => console.log(x.role)); 

// engineeringEmployeeNames.push({
//         name: "Kemi Maiye",
//         roles: "Data Analyst",
//         skills: ["Python", "SQL", "Excel", "PowerBi"],
//     }
// )
// console.log(engineeringEmployeeNames);

// //find an employee in the engineering dept
// let result;

// for (let dept of data.departments) {
//     result = dept.employees.find((x) => x.name === "Kemi Maiye");
//     if (result) break;

// }

// console.log(result);


for (let dept of data.departments) {
    result = dept.employees.find((x) => x.name === "Bob Smith");
    if (result) break;

}

console.log(result);

// // console.log(data.departments[1].employees);  // Accessing nested object property
// // const marketingEmployeeNames = data.departments[1].employees;

// //  marketingEmployeeNames.map((x) => console.log(x.name)); 
// //  marketingEmployeeNames.map((x) => console.log(x.role)); 


// //  marketingEmployeeNames.push({
// //         name: "David Owolabi",
// //         roles: "Senior Developer",
// //         skills: ["Javascript", "HTML", "CSS", "React-native"],
// //     }
// // )
// // console.log( marketingEmployeeNames);


// const header = document.getElementById("para");
// const paragraph = document.getElementsByClassName("text");
// const cards = document.getElementById("cards")


// console.log(paragraph);
// header.innerText ="We just started coding";
// header.style.backgroundColor= "red"
// paragraph[0].innerText = "I am soo happy";
// paragraph[1].innerHTML = "I want to be a great dev";

// cards.innerHTML = `<p class= "att"> ${result.name} </p>`;

// //Appending a new item to a list in HTML

// let newItem = document.createElement("li");
// newItem.innerText = "I am a new item";

// let ul= document.getElementById("myList");
  // Appends the new item to the list


// let parentDiv = document.getElementById("parentElement");
// let childDiv = document.getElementById("childElement");

// parentDiv.removeChild(childDiv);  // Removes the child element from the parent element


// Event Handling
// const button = document.getElementById("button");

// button.addEventListener("click", function () {
// ul.appendChild(newItem);   //since the ul has been named initially, it just runs it once when you click
// }
// )



// const button = document.getElementById("button");

// button.addEventListener("click", function(){

// let newItem = document.createElement("li");
// newItem.innerText = "I am a new item";

// let ul= document.getElementById("myList");
// ul.appendChild(newItem);   //compared to the first, this append new item everytime you click the submit button.
// }
// )
const username= document.getElementById("username");

document.querySelector("form").addEventListener("submit", function (x) {
    x.preventDefault();
    alert("form has been submitted without page reload");
});
