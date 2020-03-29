# Backend Project Example for the DigitalCrafts Jan 2020 Cohort
```JavaScript
const createdBy = {
    name: "Jackie Legacion"
};
```
Visit the live site <a href="https://backend-proj-example.herokuapp.com/" target="_blank">here!</a>

## Things to remember when deploying to Heroku:
1. install the Heroku CLI globally (only needs to be done once) `npm i heroku -g`
2. setup heroku app
    a. Create New App
    b. App name
3. `heroku login`
4. `heroku git:remote -a <HEROKU_APP_NAME>`
5. Add Procfile with `web:node index.js` in contents
6. in package.json file, add `"start": "node index.js"` to `"scripts"`
7. Commit like normal
8. Make sure local master branch is up to date - if not, `git pull origin master`
9. `git push heroku master` This pushes local master branch to heroku and deploys
10. Debug with `heroku logs --tail` if app is experiencing issues
