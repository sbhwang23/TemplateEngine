const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

let employees = [];

const managerPrompt = async () => {
    return inquirer
    .prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the manager\'s first and last name.'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the manager\'s id.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the manager\'s email address.'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter the manager\'s office number.'
    },
    {
        type: 'input',
        name: 'numOfEmployees',
        message: 'How many employees would you like to add?'
    },
    ])
};

const employeesPrompt = async () => {
    return inquirer
    .prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the employee\'s first and last name.'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the employee\'s id.'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter the employee\'s email address.'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please select employee\'srole.',
        choices: [
            'Engineer',
            'Intern'
        ]
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter the engineer\'s Github username.',
        when: function(answers) { return (answers.role === 'Engineer'); }
    },
    {
        type: 'input',
        name: 'school',
        message: 'Please enter the name of intern\'s school.',
        when: function(answers) { return (answers.role === 'Intern'); }
    },
    ])
}; 

async function init() {
    const managerAnswers = await managerPrompt();
    let employeesAnswers;
   
    manager = employees.push(new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber));
   
    for (let i = 0; i < parseInt(managerAnswers.numOfEmployees); i++){
        employeesAnswers = await employeesPrompt();
        if (employeesAnswers.role === 'Engineer') {
            employees.push(new Engineer(employeesAnswers.name, employeesAnswers.id, employeesAnswers.email, employeesAnswers.github));
        } else {
            employees.push(new Intern(employeesAnswers.name, employeesAnswers.id, employeesAnswers.email, employeesAnswers.school));
        }
    }
    console.log('manager: ', manager);
    console.log('employee: ', employees);
};


function writeHTML(data) {
    fs.writeFile( outputPath, data, 
        (err) => {
            if(err) throw err;
        }
)};


async function renderPage() {
    try {
        await init();
        const html = render(employees);
        writeHTML(html);
    }
    catch(err) {
        console.log('error')
    }
}

renderPage();