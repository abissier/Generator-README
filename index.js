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
        {
            type: "checkbox",
            name: "license",
            message: "If applicable, select a license:",
            choices: ["Apache License 2.0", "MIT License", "Mozzila Public License", "none"]
        },
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

let licenseName = "";
let licenseIcon = "";

const licenseIconFinder = (answers) => {

    if (answers.license[0] === "Apache License 2.0") {
        licenseName = "This application is covered under the Apache License 2.0"
        licenseIcon = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (answers.license[0] === "MIT License") {
        licenseName = "This application is covered under the MIT License"
        licenseIcon = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (answers.license[0] === "Mozzila Public License") {
        licenseName = "This application is covered under the Mozzila Public License"
        licenseIcon = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    } else {
        licenseName = ""
        licenseIcon = ""
    }
}

const generateReadMe = (answers) => {
    console.log(licenseIcon);
    const readme = `
# ${answers.projectName}

${licenseIcon}

${licenseName}

#### Table of Contents
[Description](#description)

[Installation](#install)

[Usage Information](#usage)

[Contributing](#contributing)

[Tests](#tests)

[Questions](#questions)

<a name="description">
## Description 

${answers.projectDescription} 

<a name="install">
## Installation 

${answers.projectInstallation}

<a name="usage">
## Usage Infromation

${answers.projectUsage}

<a name="contributing">
## Contributing

${answers.projectContribution}

<a name="tests">
## Tests

${answers.projectTest}

<a name="questions">
## Questions

* Email me at ${answers.email}
* Follow me on Github link: <https://github.com/${answers.github}> 
* Or search by my GitHub username:${answers.github}
`;
    return readme;
}

promptUser()
    .then((answers) => {
        licenseIconFinder(answers);
        writeFileAsync('README2.md', generateReadMe(answers));
        console.log('Sucessfully wrote to README')
    })
    .catch((err) => console.log(err));
