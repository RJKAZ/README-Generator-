const inquirer = require('inquirer');
const fs = require('fs');

const generateMarkdown = profileData => {
  return `
#${profileData.username}

## My Info
Github Email: [${profileData.email}](mailto:${profileData.email})
Git Hub Username: ${profileData.username}

### My Project
Title of the project: ${profileData.title}
Description of the project: ${profileData.description}
Anything Needed for install?: ${profileData.install}
How will this project be used?: ${profileData.usage}

#### Those pesky and annoying legal tid bits
Which legal lisence does this project have: ${profileData.license}
Is anyone else offered credit due for this project: ${profileData.contribution}

##### How will this project be Tested?
Very Good Question: ${profileData.test}


  `
}

inquirer.prompt([
  {
    type: 'input',
    message: 'What is your Github username?',
    name: 'username',
  },
  {
    type: 'input',
    message: 'What is your Github email address?',
    name: 'email',
  },
  {
    type: 'input',
    message: 'What is the title of your project',
    name: 'title',
  },
  {
    type: 'input',
    message: 'In your own words, please describe your project.',
    name: 'description',
  },
  {
    type: 'input',
    message: 'What is needed for the installation of the project?',
    name: 'install',
  },
  {
    type: 'input',
    message: 'How is the project used?',
    name: 'usage',
  },
  {
    type: 'checkbox',
    message: 'Which lisence did you use?',
    name: 'license',
    choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'other']
  },
  {
    type: 'input',
    message: 'Did anyone else contribute to the project?',
    name: 'contribution',
  },
  {
    type: 'input',
    message: 'How will you test the project?',
    name: 'test',
  },



]).then(responseObj => {
  console.log(responseObj);
  const finishedMarkdown = generateMarkdown(responseObj);

  fs.writeFile('./profile.md', finishedMarkdown, err => {
    if (err) {
      return console.log(err);
    }
    console.log('success!')
  })
});



