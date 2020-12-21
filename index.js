const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "projectName",
            message: "Project title:"
        },
        {
            type: "input",
            name: "projectDescription",
            message: "Project description:"
        },
        {
            type: "input",
            name: "projectInstallation",
            message: "Project installation instructions:"
        },
        {
            type: "input",
            name: "projectUsage",
            message: "Usage infromation:"
        },
        {
            type: "input",
            name: "projectContribution",
            message: "Contribution guidelines:"
        },
        {
            type: "input",
            name: "projectTest",
            message: "Project test instructions:"
        },
        {
            type: "input",
            name: "link",
            message: "Deployed Link:"
        },
        //{
         //   type: "checkbox",
        // name: "link",
         //   message: "license:",
        //    choices: ["Apache License 2.0", "MIT License", "Mozzila Public License"]
        //},
        {
            type: "input",
            name: "github",
            message: "Please enter your GitHub username:"
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email address (to be displayed):"
        },
    ]);

const generateReadMe = (answers) =>
    `
# ${answers.projectName}

### Description 
${answers.projectDescription} 

### Table of Contents
[Usage](#usage)

### Installation Instructions

${answers.projectInstallation}

<a name="usage"/>
### Usage
${answers.projectUsage}

### License
### Contributing
${answers.projectContribution}

### Tests
${answers.projectTest}

### Questions
Email me at ${answers.email}
Follow me on Github link: <https://${answers.github}> username:${answers.github}
`

promptUser()
    .then((answers) => writeFileAsync('README.md', generateReadMe(answers)))
    .then(() => console.log('Sucessfully wrote to README'))
    .catch((err) => console.log(err));
