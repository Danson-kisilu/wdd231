/* YEAR */

document.querySelector("#year").textContent = new Date().getFullYear();

/* LAST MODIFIED */

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;

/* MOBILE MENU */

const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {
navMenu.classList.toggle("open");
});

/* COURSE ARRAY */

const courses = [

{subject:"WDD",number:130,title:"Web Fundamentals",credits:2,completed:true},

{subject:"WDD",number:131,title:"Dynamic Web Fundamentals",credits:2,completed:true},

{subject:"WDD",number:231,title:"Frontend Development",credits:2,completed:false},

{subject:"CSE",number:110,title:"Programming Building Blocks",credits:2,completed:true},

{subject:"CSE",number:111,title:"Programming with Functions",credits:2,completed:false}

];

/* DISPLAY COURSES */

const container = document.querySelector("#course-container");

function displayCourses(courseList){

container.innerHTML="";

courseList.forEach(course=>{

const card=document.createElement("div");

card.classList.add("course");

if(course.completed){
card.classList.add("completed");
}

card.innerHTML=`
<h3>${course.subject} ${course.number}</h3>
<p>${course.title}</p>
<p>${course.credits} Credits</p>
`;

container.appendChild(card);

});

displayCredits(courseList);

}

/* FILTER BUTTONS */

document.querySelector("#all").addEventListener("click",()=>displayCourses(courses));

document.querySelector("#wdd").addEventListener("click",()=>{
const filtered=courses.filter(course=>course.subject==="WDD");
displayCourses(filtered);
});

document.querySelector("#cse").addEventListener("click",()=>{
const filtered=courses.filter(course=>course.subject==="CSE");
displayCourses(filtered);
});

/* TOTAL CREDITS */

function displayCredits(courseList){

const total=courseList.reduce((sum,course)=>sum+course.credits,0);

document.querySelector("#credits").textContent=`Total Credits: ${total}`;

}

/* INITIAL LOAD */

displayCourses(courses);
