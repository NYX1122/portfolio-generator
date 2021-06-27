const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template.js");

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your Github Username (Required)",
            validate: githubUser => {
                if (githubUser) {
                    return true;
                } else {
                    console.log("Please enter your GitHub username!");
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About' section?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:",
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = (portfolioData) => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
=================
Add a New Project
=================
    `);
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project? (Required)",
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log("Please enter a project name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: projectDescription => {
                if (projectDescription) {
                    return true;
                } else {
                    console.log("Please enter a project description!");
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all that apply)",
            choices: ["Javascript", "HTML", "CSS", "ES6", "JQeury", "Bootstrap", "node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter your GitHub link to your project. (Required)",
            validate: githubLink => {
                if (githubLink) {
                    return true;
                } else {
                    console.log("Please provide a GitHub link!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
});

//const pageHTML = generatePage(name, github);

//fs.writeFile("index.html", generatePage(name, github), err => {
//    if (err) throw err;

//    console.log("Portfolio complete! Check out index.html to see the output!");
//});