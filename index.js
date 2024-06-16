// index.js

const inquirer = require('inquirer');
const fs = require('fs');

// Function to prompt user for README details
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Write a short description of your project:'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Describe the installation process (if applicable):'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What is the usage of this project?'
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'How can others contribute to this project?'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide examples of how to run tests:'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project:',
            choices: ['MIT', 'GNU GPLv3', 'Apache 2.0', 'ISC', 'None']
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?'
        }
    ]);
};

// Function to generate README content
const generateREADME = (answers) => {
    const licenseBadge = generateLicenseBadge(answers.license);
    const licenseNotice = generateLicenseNotice(answers.license);

    return `
# ${answers.title}

${licenseBadge}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## License
${licenseNotice}

## Questions
GitHub: [${answers.github}](https://github.com/${answers.github})  
For any questions, please contact me at ${answers.email}.
    `;
};

// Function to generate license badge based on user selection
const generateLicenseBadge = (license) => {
    if (license === 'None') {
        return '';
    }
    return `![License](https://img.shields.io/badge/license-${encodeURIComponent(license)}-blue.svg)`;
};

// Function to generate license notice based on user selection
const generateLicenseNotice = (license) => {
    if (license === 'None') {
        return 'This project is not licensed.';
    }
    return `This project is licensed under the ${license} License.`;
};

// Function to write README file
const writeREADME = (fileName, data) => {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('README.md successfully created!')
    );
};

// Main function to run the application
const init = () => {
    promptUser()
        .then((answers) => generateREADME(answers))
        .then((READMEContent) => writeREADME('README.md', READMEContent))
        .catch((err) => console.error(err));
};

// Initialize the application
init();