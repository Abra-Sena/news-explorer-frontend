# News Explorer

A [website](https://abra-newsapp.students.nomoreparties.site/) where users can search for news articles and save them to their profiles.
This repository contains the frontend built with React.js and Node.js.


## Features
This website has two main features:
  - When the user enters a keyword in the search bar, the website send a request to the News API service, find all the relevant articles over the last week, and display a list of cards for each of them.
  - It displays all articles saved by a user in the *Saved articles* section of the website.


## Frontend
The front end of the website consists of two pages:
  - The main page with a search box
  - The page with saved news items where all the liked materials are displayed
Additionally, the website has two popup windows:
 - A registration form
 - A login form
Each page has identical blocks that are reused in different parts of the website. Using React, we created reusable components and style them according to BEM specifications.


## Backend
In this project, we work with two APIs:
  - [The News API](https://newsapi.org), which returns JSON data containing headlines, bylines and other data from keyword searches.
  - An API for user authentication and saving articles created independently.

## The Infrastructure
  - Git: for storing the project in a public repository
  - Create React App: to create a template for the front end.
  - Trello: project's decomposition using Agile methodology


## Problem encountered
  - **News API** 
The project requested to retreive articles from NewsAPI once user entered a search word, but the free Developer account only allows search for development and testing purposes. That makes it impossible to get news on the frontend using our domainame, but return the below message instead: 
> "Requests from the browser are not allowed on the Developer plan, except from localhost."
In other to allow user to retrieve data, we look for alternatives by referring to APIs available [here](https://github.com/public-apis/public-apis). [TheNewsAPI](https://www.thenewsapi.com) will be used in replacement in the future.


## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode with backend on Port 3000 and frontend at Port 3001.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run deploy`
Deploys frontend, build and copy files directly to the VM to update code after refactor/correction.

