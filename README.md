## Installation

1. Install NodeJS. Use the labs if you are unsure how to do this.
1. Create a new folder anywhere, call it anything you want
2. Navigate to said folder and type: git pull https://github.com/Alexz1008/FAST
3. Go into the folder that has the "src" folder in it and type:
4. npm install firebase
5. npm install expressjs
6. npm install react-router
7. npm install react-router-dom
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

To start, go into the src folder and open up index.js with your favorite text editor. You'll see that we are rendering our App encapsulated by a "BrowserRouter". Essentially this router will be what we use to make our otherwise single-page app have multiple pages. As a note, you should NEVER change index.js. It should never need any changes, all changes should go into the components.

Now go into the components folder and open up App.js. This file will be used as a skeleton for everything we'll put in later. It'll help us keep certain parts of the page separate. Note that we have a header and a main in the app, and these parts are self-explanatory. App.js should also rarely change unless we are adjusting the skeleton of the app.

Open up Main.js. This file acts as little more than a switch that displays something different depending on what route (or URL) we're on. In other words, if we're on the "/" route (nothing), then we display the home component. If we're on the "/profile" route, then we display the profile component. In a real-world scenario, the url for a profile page would look like tritonmarket.com/profile.

Open up Home.js. Surprise! There's nothing there except for a crude message exclaiming how good our homepage is! This component is the component we'll be working on with the code in the next 12 weeks, along with all of the other components that are routed to by Main.

Finally, open up Header.js. Here we have a list of 3 texts: "Home", "Profile", "My Listings". When you click one of these texts, your URL is automatically changed to whatever is inside the "Link to" portion. An important distinction to make is that the header DOES NOT control what is being displayed. All it's doing is allowing you to change the URL. Main.js is responsible for actually reacting to the change in URL and displaying something else.

Now that all that's done, if you haven't already, go ahead and type npm start in the folder containing the src directory. If done right, your internet browser should open up with the url localhost:3000/. Try clicking on any of the 3 links in the list and seeing what happens, paying attention to both the URL and what's being displayed.

That's about it! You're ready to start working on the future of innovation that is triton market! You can start by adding your name to the comments in index.js. If you're feeling it, make some kind of improvement to the webpage too to get your feet wet!