const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

let manager;
let employee = [];

const managerPrompt = async function() {
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
} 
    
const employeePrompt = async function() {
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
        message: 'Please select your role.',
        choices: [
            'Engineer',
            'Intern'
        ]
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter the engineer\'s Github username.'
    },
    {
        type: 'input',
        name: 'school',
        message: 'Please enter the name of intern\'s school.'
    },
    ])
} 

async function init() {
    await managerPrompt().then(function(answers){
        // console.log(answers)
        manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        
        for (let i = 0; i < parseInt(answers.numOfEmployees); i++){
            employeePrompt().then(function(answers){
                if (answers.role === 'Engineer') {
                    employee.push(new Engineer(answers.name, answers.id, answers.email, answers.github))
                } else {
                    employee.push(new Intern(answers.name, answers.id, answers.email, answers.school))
                }
        
            }) 
        }
    });
}

   init();

    console.log('manager: ', manager);
    console.log('employee: ', employee);
// Write code to use inquirer to gather information about the development team members,

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
