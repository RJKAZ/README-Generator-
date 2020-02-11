const inquirer = require('inquirer');
const fs = require('fs');


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
    message: 'What is the title of your roject?',
    name: 'title',
  },
  {
    type: 'input',
    message: 'Please describe your project.',
    name: 'description',
  },
  {
    type: 'input',
    message: 'Is anything required for Installation?',
    name: 'install',
  },
  {
    type: 'input',
    message: 'Which license did you use?.',
    name: 'license',
  }





]).then(responseObj => {
  console.log(responseObj);
  const finishedMarkdown = generateMarkdown(responseObj);

  fs.writeFile('./readme.md', finishedMarkdown, err => {
    if (err) {
      return console.log(err);
    }
    console.log('success!')
  })
});



