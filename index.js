const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
    inquirer.prompt([
        {
            type: "input",
            prefix: ">",
            name: "projectName",
            message: "Project title:"
        },
        {
            type: "input",
            prefix: ">",
            name: "projectDescription",
            message: "Project description:"
        },
        {
            type: "input",
            prefix: ">",
            name: "projectInstallation",
            message: "Project installation instructions:"
        },
        {
            type: "input",
            prefix: ">",
            name: "projectUsage",
            message: "Usage information:"
        },
        {
            type: "input",
            prefix: ">",
            name: "projectContribution",
            message: "Contribution guidelines:"
        },
        {
            type: "input",
            prefix: ">",
            name: "projectTest",
            message: "Project test instructions:"
        },
        {
            type: "checkbox",
            prefix: ">",
            name: "license",
            message: "If applicable, select a license:",
            choices: ["Apache License 2.0", "MIT License", "Mozzila Public License", "GNU General Public License v3.0", "none"]
        },
        {
            type: "input",
            prefix: ">",
            name: "github",
            message: "Please enter your GitHub username:"
        },
        {
            type: "input",
            prefix: ">",
            name: "email",
            message: "Please enter your email address (to be displayed):"
        },
    ]);

let licenseName = "";
let licenseIcon = "";

const licenseIconFinder = (answers) => {

    if (answers.license[0] === "Apache License 2.0") {
        licenseName = "By contributing, you agree that your contributions will be licensed under its Apache License 2.0"
        licenseIcon = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (answers.license[0] === "MIT License") {
        licenseName = "By contributing, you agree that your contributions will be licensed under its  MIT License"
        licenseIcon = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (answers.license[0] === "Mozzila Public License") {
        licenseName = "By contributing, you agree that your contributions will be licensed under its Mozzila Public License"
        licenseIcon = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    } else if (answers.license[0] === "GNU General Public License v3.0") {
        licenseName = "By contributing, you agree that your contributions will be licensed under its GNU General Public License v3.0"
        licenseIcon = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
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

<h4>Table of Contents</h4>

[Description](#description)

[Installation](#install)

[Usage Information](#usage)

[License](#license)

[Contributing](#contributing)

[Tests](#tests)

[Questions](#questions)

<a name="description">
<h3>Description</h3>

${answers.projectDescription} 

<a name="install">
<h3>Installation</h3>

${answers.projectInstallation}

<a name="usage">
<h3>Usage Infromation</h3>

${answers.projectUsage}

<a name="license">
<h3>License</h3>

${licenseName}

<a name="contributing">
<h3>Contributing</h3>

${answers.projectContribution}

<a name="tests">
<h3>Tests</h3>

${answers.projectTest}

<a name="questions">
<h3>Questions</h3>

* Email me at ${answers.email}
* Follow me on Github link: <https://github.com/${answers.github}> 
* Or search by my GitHub username: ${answers.github}
`;
    return readme;
}

promptUser()
    .then((answers) => {
        licenseIconFinder(answers);
        writeFileAsync('READMEsample.md', generateReadMe(answers));
        console.log('Sucessfully wrote to README')
    })
    .catch((err) => console.log(err));
