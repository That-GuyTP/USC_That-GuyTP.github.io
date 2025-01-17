//THOMAS PETERSON

//STAR PRINTING
function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
};

const pageHeight = document.documentElement.scrollHeight;
const pageWidth = document.documentElement.scrollWidth;

window.onload = () => {
    for( let i = 0; i < 70; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.innerHTML = "★";

        star.style.top = `${Math.random() * pageHeight}px`;
        star.style.left = `${Math.random() * pageWidth}px`;
        document.body.append(star);
    }
};

//CHART BUTTONS
const img = document.getElementById("chart-img");

//Normal
document.getElementById("normal").onclick = () => {
    document.getElementById("normal").classList = "isClicked";
    document.getElementById("narcoleptic").classList = "notClicked";
    document.getElementById("both").classList = "notClicked";
    img.src = "../../images/ProjectPart_03_Normal-Sleep.png";
};

//Narcoleptic
document.getElementById("narcoleptic").onclick = () => {
    document.getElementById("normal").classList = "notClicked"
    document.getElementById("narcoleptic").classList = "isClicked"
    document.getElementById("both").classList = "notClicked"
    img.src = "../../images/ProjectPart_03_Narc-Sleep.png";
};

//Both
document.getElementById("both").onclick = () => {
    document.getElementById("normal").classList = "notClicked";
    document.getElementById("narcoleptic").classList = "notClicked";
    document.getElementById("both").classList = "isClicked";
    img.src = "../../images/ProjectPart_03_Both.png";
};

//SUCCESS STORIES BOXES
const ss_fn = document.getElementById("first-name");
const ss_ln = document.getElementById("last-name");
const ss_dd = document.getElementById("date_diagnosed");
const ss_ton = document.getElementById("type_of_narcolepsy");
const ss_ut = document.getElementById("user_test");
const ss_s = document.getElementById("state");
const ss_c = document.getElementById("city");

//Retrieve json file contents
const ss_url = "https://that-guytp.github.io/csce242/projects/part6/success-stories.json";
const getStories = async() => {
    try {
        const response = await fetch(ss_url);
        return response.json();
    } catch(error) {
        console.log("---Error retreiving URL data.---");
        console.log(error);
    }
};

const showStories = async() => {
    const stories = await getStories();
    console.log(stories); // DEBUG
    stories.forEach((story) => {
        console.log(stories); // DEBUG
        document.getElementById("success-stories-container").append(getStoriesSect(story));
    });
};

const getStoriesSect = (story) => {
    const sect = document.createElement("section");
    console.log(story); // DEBUG
    sect.classList.add("ss-sect");
    
    //Fetch Img
    const ss_img = document.createElement("img");
    ss_img.src = `./images/${story.first_name}.jpg`; 
    ss_img.classList.add("lifestyle-img");
    sect.append(ss_img);

    //Fetch Name
    const h3 = document.createElement("h3");
    h3.innerHTML = `<b>${story.first_name} ${story.last_name}</b>`;
    sect.append(h3);


    //Fetch Info
    const p = document.createElement("p");
    p.innerHTML = `<b>From:</b> ${story.city}, ${story.state}<br>
                   <b>Date Diagnosed:</b> ${story.date_diagnosed}<br>
                   <b>Narcolepsy Type:</b> ${story.type_of_narcolepsy}
                   <b>Story:</b> ${story.user_text}`;
    sect.append(p);

    return sect;
};

showStories();

//Email Submit
const sendEmail = async(json) => {
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:json
        });

        return response;
    } catch(error){
        console.log(error);
        result.innerHTML = "Sorry, your email couldn't be sent";
    }
};

document.getElementById("form-email").onsubmit = async(e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    console.log(JSON) //*** DEBUG ***

    const result = document.getElementById("result");
    result.innerHTML = "Sending...";

    const httpsResult = await sendEmail(json);
    console.log(httpsResult); //*** DEBUG ***

    if(httpsResult.status == 200) {
        result.innerHTML = "Email successfully sent";
    }else {
        result.innerHTML = "ERROR! Email could not send";
    }
}