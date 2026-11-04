function workerRegistration() {
alert("Welcome to Worker Registration!");
}

function employerLogin() {
alert("Welcome to Employer Login!");
}

console.log("JavaScript connected successfully!");
function showSkills() {
    let name = document.getElementById("workerName").value;

localStorage.setItem("workerName", name);
    let age = document.getElementById("workerAge").value;
let gender = document.getElementById("workerGender").value;

localStorage.setItem("workerAge", age);
localStorage.setItem("workerGender", gender);
let experience = document.getElementById("workerExperience").value;

localStorage.setItem("workerExperience", experience);

    document.querySelector("form").style.display = "none";

    document.getElementById("skillSection").style.display = "block";
}
function showUpload() {

    document.getElementById("skillSection").style.display = "none";

    document.getElementById("uploadSection").style.display = "block";

}
function showAssessment() {

    document.getElementById("uploadSection").style.display = "none";

    document.getElementById("assessmentSection").style.display = "block";
    loadSkillQuestions();

}

function submitAssessment() {

    let score = 0;
    let total = assessmentQuestions.length;

    for (let i = 0; i < total; i++) {

        let answer = document.querySelector(
            `input[name="question${i}"]:checked`
        );

        if (!answer) {
            alert("Please answer all questions!");
            return;
        }

        if (answer.value === assessmentQuestions[i].answer) {
            score++;
        }
    }

    window.assessmentScore = score;

    document.getElementById("assessmentResult").innerText =
        "Your assessment score: " + score + "/" + total;

    localStorage.setItem("assessmentScore", score);
    localStorage.setItem("totalQuestions", total);
}

// Move to Skill Passport
function showPassport() {

    document.getElementById("assessmentSection").style.display = "none";

    document.getElementById("passportSection").style.display = "block";

    let skills = document.querySelectorAll(
        '#skillSection input[type="checkbox"]:checked'
    );

    let skillList = "";

    skills.forEach(function(skill) {
        skillList += "<p>" + skill.value + "</p>";
    });

    document.getElementById("passportSkills").innerHTML = skillList;

    let score = localStorage.getItem("assessmentScore");
    let total = localStorage.getItem("totalQuestions");

    document.getElementById("passportScore").innerText =
        "Assessment Score: " + score + "/" + total;
}


// Generate Skill Passport
function generatePassport() {

    document.getElementById("passportResult").innerHTML =
        "<h3>Skill Passport Generated Successfully!</h3>" +
        "<p>Your skill profile is ready.</p>";

}
// Generate Worker QR Code
function generateQRCode() {

    document.getElementById("passportSection").style.display = "none";
    document.getElementById("qrSection").style.display = "block";

    let skills = document.querySelectorAll(
        '#skillSection input[type="checkbox"]:checked'
    );

    let selectedSkills = [];

    skills.forEach(function(skill) {
        selectedSkills.push(skill.value);
    });

    let workerID = "WORKER" + Date.now();

    let score = localStorage.getItem("assessmentScore");
    let total = localStorage.getItem("totalQuestions");

    let passportData = {
        workerID: workerID,
        name: localStorage.getItem("workerName"),
        age: localStorage.getItem("workerAge"),
        gender: localStorage.getItem("workerGender"),
        experience: localStorage.getItem("workerExperience"),
        skills: selectedSkills,
        assessment: score + "/" + total
    };

    localStorage.setItem(
        "workerSkills",
        JSON.stringify(selectedSkills)
    );

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: JSON.stringify(passportData),
        width: 200,
        height: 200
    });
}
    

// JOB MATCHING SYSTEM

function showMatchedJobs() {

    document.getElementById("jobsSection").style.display = "block";

    let skills = JSON.parse(
        localStorage.getItem("workerSkills") || "[]"
    );

    let jobs = {
        "Electrician": ["Electrical Technician", "Electrician Assistant"],
        "Plumber": ["Plumbing Technician", "Plumber Assistant"],
        "Carpenter": ["Furniture Carpenter", "Carpenter Assistant"],
        "Painter": ["Building Painter", "Painting Assistant"],
        "Mason": ["Construction Worker", "Mason Assistant"],
        "Welder": ["Welding Technician", "Welder Assistant"]
    };

    let result = "";

    skills.forEach(function(skill) {

        if (jobs[skill]) {

            jobs[skill].forEach(function(job) {

                result += `
                    <div style="background:white;padding:15px;margin:10px;border-radius:8px;">
                        <h3>${job}</h3>
                        <p>Required Skill: ${skill}</p>
                        <p>Match: Based on your selected skill</p>
                    </div>
                `;

            });

        }

    });

    document.getElementById("jobResults").innerHTML =
        result || "No matching jobs found.";

}
const skillQuestions = {
    "Electrician": [
        {
            question: "Which tool measures voltage?",
            options: ["Multimeter", "Hammer", "Saw"],
            answer: "Multimeter"
        },
        {
            question: "What should be done before electrical maintenance?",
            options: ["Switch off power", "Touch the wire", "Pour water"],
            answer: "Switch off power"
        }
    ],

    "Plumber": [
        {
            question: "Which tool is commonly used to tighten pipe fittings?",
            options: ["Pipe wrench", "Paint brush", "Hammer"],
            answer: "Pipe wrench"
        },
        {
            question: "What should you do when a pipe leaks?",
            options: ["Ignore it", "Turn off water supply", "Paint it"],
            answer: "Turn off water supply"
        }
    ],

    "Carpenter": [
        {
            question: "Which tool measures wood length?",
            options: ["Measuring tape", "Paint brush", "Pipe wrench"],
            answer: "Measuring tape"
        },
        {
            question: "Which tool is used to cut wood?",
            options: ["Hand saw", "Multimeter", "Spanner"],
            answer: "Hand saw"
        }
    ],

    "Painter": [
        {
            question: "Which tool is used to apply paint?",
            options: ["Paint brush", "Wrench", "Chisel"],
            answer: "Paint brush"
        },
        {
            question: "What should be done before painting a wall?",
            options: ["Clean the surface", "Pour water on it", "Ignore dust"],
            answer: "Clean the surface"
        }
    ],

    "Mason": [
        {
            question: "Which material is commonly used to join bricks?",
            options: ["Mortar", "Petrol", "Paint"],
            answer: "Mortar"
        },
        {
            question: "Which tool helps check whether a wall is level?",
            options: ["Spirit level", "Paint brush", "Pliers"],
            answer: "Spirit level"
        }
    ],

    "Welder": [
        {
            question: "Which equipment protects a welder's eyes?",
            options: ["Welding helmet", "Cotton cap", "Sunglasses"],
            answer: "Welding helmet"
        },
        {
            question: "Why are welding gloves used?",
            options: ["To protect hands", "To measure length", "To clean floors"],
            answer: "To protect hands"
        }
    ]
};

let assessmentQuestions = [];

function loadSkillQuestions() {
    let selectedSkills = document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    assessmentQuestions = [];

    selectedSkills.forEach(function(skill) {
        if (skillQuestions[skill.value]) {
            assessmentQuestions.push(...skillQuestions[skill.value]);
        }
    });

    let html = "";

    assessmentQuestions.forEach(function(q, index) {
        html += `<h3>${index + 1}. ${q.question}</h3>`;

        q.options.forEach(function(option) {
            html += `
                <input type="radio"
                       name="question${index}"
                       value="${option}">
                ${option}<br>
            `;
        });
    });

    document.getElementById("dynamicQuestions").innerHTML = html;
    alert("Questions loaded: " + assessmentQuestions.length);
}