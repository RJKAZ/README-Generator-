const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'input',
    message: 'What is your Github username?',
    name: 'github',
    validate: githubInput =>
    (githubInput ? true : false)
  },
  {
    type: 'input',
    message: 'What is your email address?',
    name: 'email',
    validate: function(emailInput) {
      return (/^.+@.+\..+$/gi.test(emailInput) ? true : false)
    }
  },
])

const axios = require('axios');

inquirer
  .prompt(questions)
  .then(response => {
    axios
    .get(`https://api.github.com/users/${response.username}`)
    .then(({data}) => {