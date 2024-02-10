const startbutton = document.getElementById("timer-control")
const sec = document.getElementById("seconds")
const min = document.getElementById("minutes")
const hr = document.getElementById("hour")
const details = document.getElementById("entries")
const nameinput = document.getElementById("name")
const desinput = document.getElementById("description")
const detailsTable = document.getElementById("entriesTable");
const detailsBody = document.getElementById("entriesBody");
const tabeldetails = document.getElementById("tabeldetails");
const outer = document.getElementById("outer");
const showtimer = document.getElementById("showtimer");
const pausebutton = document.getElementById("pausebutton");
const resume = document.getElementById("resumebutton");
let timerid
let arraydetails=[]
function starttimer()
{

    let s= parseInt(sec.textContent)
    let m=parseInt(min.textContent)
    let h=parseInt(hr.textContent)
   
    
    s++
    if(s === 60)
    {
        m++
        s=0
    }
   if(m === 60)
   {
    h++
    m=0
   }
   sec.innerHTML = s.toString().padStart(2,'0')
   min.innerHTML = m.toString().padStart(2,'0')
   hr.innerHTML = h.toString().padStart(2,'0')
}
function stoptimer() {
    const time = { hr: hr.textContent, min: min.textContent, sec: sec.textContent };
    const name = nameinput.value;
    const description = desinput.value;
    arraydetails.push({ name, description, time });

    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${name}</td><td>${description}</td><td>${time.hr} hours, ${time.min} minutes, ${time.sec} seconds</td>`;
    detailsBody.appendChild(newRow);

    // Store data in local storage
    const storedDetails = JSON.parse(localStorage.getItem('taskDetails')) || [];
    storedDetails.push({ name, description, time });
    localStorage.setItem('taskDetails', JSON.stringify(storedDetails));

    startbutton.textContent = "Start";
    startbutton.style.background = "green";
    clearInterval(timerid);
    sec.textContent = '00';
    min.textContent = '00';
    hr.textContent = '00';
    document.getElementById("name").value = "";
    document.getElementById('description').value = "";
    arraydetails.pop();
    return;
}
window.addEventListener('load', () => {
    const storedDetails = JSON.parse(localStorage.getItem('taskDetails')) || [];
    storedDetails.forEach(element => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${element.name}</td><td>${element.description}</td><td>${element.time.hr} hours, ${element.time.min} minutes, ${element.time.sec} seconds</td>`;
        detailsBody.appendChild(newRow);
    });
});

function clickbutton()
{
    
   
    if(startbutton.textContent === "Start")
    {  
        if(nameinput.value === "" && desinput.value === "")
    {
        window.alert("Fill the Input Fields")
    }
    else {
    
        startbutton.textContent="Finish"
        timerid=setInterval(starttimer,1000)
        startbutton.style.background="red"
        
        pausebutton.style.display="block"
    }
    }
    else if(startbutton.textContent==='Finish')
    {
       stoptimer()
       resume.style.display="none"
        pausebutton.style.display="none"
       
    }
}
startbutton.addEventListener('click',clickbutton)
function showTable()
{
    outer.style.display="none";
    details.style.display="block"
}
function displaytimer()
{
    outer.style.display="flex";
    details.style.display="none";
}
tabeldetails.addEventListener('click',showTable)
showtimer.addEventListener('click',displaytimer)
function deleteData() {
    detailsBody.innerHTML = '';
    localStorage.removeItem('taskDetails');
}

document.getElementById('delete').addEventListener('click', () => {
    deleteData();
});

function pauseTimer() {
    clearInterval(timerid);
    resume.style.display="block"
}
pausebutton.addEventListener('click', pauseTimer);
function resumeTimer(){
    if(resume.textContent === 'Resume')
    {
        timerid = setInterval(starttimer, 1000);
        resume.style.display="none"
    }
    
}
resume.addEventListener('click',resumeTimer);