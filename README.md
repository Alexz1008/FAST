## Installation
1. Install NodeJS. Use the labs if you are unsure how to do this.
1. Create a new folder anywhere, call it anything you want
2. Navigate to said folder and type: git pull https://github.com/Alexz1008/FAST
3. Go into the folder that has the "src" folder in it and type:
4. npm install firebase
5. npm install expressjs
6. npm install react-router
7. npm install react-router-dom
8. npm install react-images-upload
8. You should now be able to initialize the webpage with: npm start

## How to contribute
0. Before making any changes, be sure to type git pull. This assures that you receive any changes made by the team before you start changing things on your own.
1. Type git status
2. Note any files that have changed will be in red. You'll need to add those files and commit them before pushing to our repo.
3. Type git add filename to add the file to your staged changes.
4. Then, type git commit -m "Yourname-#: what you did".
Alternatively, type git commit -a -m "Your-name#: what you did" to automatically add and commit all changed files (this skips part 3).
5. To push, you should be able to simply type git push origin master.

## How it works currently
To be honest, I'm learning at the same time all of you are, so note that most of my explanations for how things work could be flawed or entirely incorrect, but it should be enough to help you have a basic understanding of what's going on. On top of this, note that I have not taken much consideration into the "structuring" that Gary likes so much, so we may need to adjust things as we go.

Index.js is in charge of rendering everything. This means there will be no point where you will actually have to do ReactDOM.render(), as it is already handled. This also means index.js should never actually change. Don't edit this file unless you know what you're doing.

Components are separated into folders. Some components may just be full pages, like home.js and profile.js, and others may be commonly used parts that can be reused, like listing.js and header.js.

Main.js is responsible for all routing. In other words, Main.js is what handles what component to display when we're at a certain url. This is what you'd need to change if you wanted to add a new page URL in.

## Docker
1. First build the container locally
	$ docker build -t [tag] .
2. Login to docker and push it to the repo
	$ docker login
	$ docker tag [tag] [docker_username/repository:tag]
	$ docker push [docker_username/repository:tag]
3. Now just follow part two of lab7 and upload to aws. Make sure to run below command as stated in the lab.
	$ docker run -p 443:80 [docker_username/repository:tag]