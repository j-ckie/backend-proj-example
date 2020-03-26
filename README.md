# Backend Project Example for the DigitalCrafts Jan 2020 Cohort
```JavaScript
const createdBy = {
    name: "Jackie Legacion"
};
```
Visit the live site <a href="https://backend-proj-example.herokuapp.com/" target="_blank">here!</a>

## Things to remember when deploying to Heroku:
1. install the Heroku CLI globally
`npm i heroku -g`
2. Make sure your LOCAL master branch is up to date. If it's not, run `git pull origin master`
3. Create the project on Heroku <REMINDER: INSERT IMAGE HERE>
4. `heroku git:remote -a <NAME-OF-PROJECT>` to add your repo to Heroku
5. `git push heroku master` to deploy - the console will give you the URL of your newly hosted site