const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');

const generateMarkdown = profileData => {
  return `


![profile-photo](${profileData.avatar_url})

### **My Info**
- **Github Email:** &nbsp; [${profileData.email}](mailto:${profileData.email})
<br/>
- **Git Hub Username:**  &nbsp; ${profileData.username}

<hr>
<br/>

### **My Project**
- **Title of the project:** &nbsp; ${profileData.title}
<br/>
- **Description of the project:** &nbsp; ${profileData.description}
<br/>
- **Anything Needed for install?:** &nbsp; ${profileData.install}
<br/>
- **How will this project be used?:**  &nbsp; ${profileData.usage}
<br/>
- **How will this project be tested?:** &nbsp; ${profileData.test}

<hr>
<br/>

### **Matters of Legality**
- **Which legal lisence did this project use?:** &nbsp; ${profileData.license}
<br/>
- **Is anyone else offered credit due for this project?:** &nbsp; ${profileData.contribution}

<hr>
<br/>

### **What does the future hold for this project?**
- ${profileData.future}

<hr>
<br/>

<img src="https://img.shields.io/badge/powered%20by-NODE-green" alt="made with node">
<img src="https://img.shields.io/badge/-100%25%20Javascript-yellow" alt="100% Javascript">
<img src="https://img.shields.io/badge/-Rutgers%20Coding%20Bootcamp-red" alt="Coding Bootcamp">
<img src="https://img.shields.io/badge/supercalifragilisticexpialidocious-I%20am%20having%20too%20much%20fun%20with%20these%20badges-blue" alt="don't ask>

  `
}

inquirer.prompt([
  {
    type: 'input',
    message: 'What is your Github username?',
    name: 'username',
    validate: githubInput =>
    (githubInput ? true : false)
  },
  {
    type: 'input',
    message: 'What is your Github Email Address?',
    name:'email',
  },
  {
    type: 'input',
    message: 'What is the title of your project?',
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
  {
    type: 'input',
    message: 'What is the next step for this project?',
    name: 'future',
  },

])
.then(inquirerResponse => {
  const queryUrl = `https://api.github.com/users/${inquirerResponse.username}`;
  axios.get(queryUrl)
  .then(({ data: { avatar_url } }) => {
      const profileData = { ...inquirerResponse, avatar_url};
      const finishedMarkdown = generateMarkdown(profileData);

      fs.writeFile("./readme.md", finishedMarkdown, err => {
          if (err) {
              return console.log(err);
          }
          console.log("Success!");
      });
  });
});
