# AniPedia

https://anipedia.onrender.com (deployed to [Render.com](https://render.com))

Project report : https://drive.google.com/drive/folders/1Bwsg1LnoP3vpVSeL0zAJ_96AH2Dkm39_?usp=sharing

### Instructions to build the project locally

1. Go to `/server` folder. Run `npm install` and `npm run start`. The server should start at port 8080.
2. Go to `/client` folder. Run `npm install` and `npm run start`. The client should start at port 3000.
3. Go to your browser, and go to `http://localhost:3000` to start coding.

### Instructions to build the project for deployment

1. Go to `/client` folder. Run `npm install` and `npm run build`. This will create the HTML, CSS, JS to the `/client/build` folder.
2. Go to `/server` folder. Run `npm run start`. The server should start at port 8080 and it will also host the front-end files.
3. Go to your browser, and go to `http://localhost:8080` to see the version to deploy.

### Instructions to deploy

1. `git push`
2. Render will automatically pick the latest change to deploy
3. Visit https://anipedia.onrender.com to see the result

