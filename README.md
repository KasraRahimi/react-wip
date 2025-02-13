# Lethal Clips
Work on this website is still ongoing. The plans at the moment are for this to be a small video sharing site specifically geared for short clips of funny moments in video games, mainly of Lethal Company.

## The Stack
### Frontend
For the frontend of the site, I'm making using of React and Typescript. React is easy to use and versatile for building websites. I'm using React Router for routing as well as Redux for state management. The technologies in use for the frontend are:
- React
- Typescript
- Redux
- React Router
- Axios

### Backend
The backend is written in Go using the Gin framework for creating a robust server. I chose Go for its relative simplicity and speed. The database is a relational database running on MariaDB server. The backend technologies are:
- Go
- Gin
- MariaDB (MySQL)
- Docker

## Installation
If you'd like to set up this project locally, you can do so by clonning the repository and installing the dependencies.
### Frontend
First clone the project and install all the requirements for the frontend. You'll need Node and NPM to run these commands.
```
git clone git@github.com:KasraRahimi/react-wip.git
cd react-wip/frontend
npm i
```
### Backend
Afterwards, you want to install all the dependencies for the backend. You can do this easily if you already have Go installed. If you don't, install it first.
```
cd ../backend
go mod tidy
```
### Database
Finally, you'll need a functional database for the backend to run properly. Make sure you have docker installed, then you can run a quick command to get it up and running.
```
cd ../database
docker compose up -d
```
If you ever want to run the server afterwards, you have to make sure that docker is running, otherwise the backend won't have a database to connect to.
## Running the project
Make sure you're in situated in the project before you run these commands
- Start the backend first.
```
cd backend
go run .
```
- Then, in a seperate terminal, run the frontend.
```
cd frontend
npm run dev
```
- Afterwards you should be able to connect to the site @ `http://localhost:3000`