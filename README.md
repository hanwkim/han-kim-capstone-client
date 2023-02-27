# Food Fight

Food Fight is an app that gamifies the process of deciding where and what to eat. It's presented with a 16-bit game aesthetic to make it more fun and interactive. This is the client side portion of the app, remember to check out the server side as well!

[Server side repo](https://github.com/hanwkim/han-kim-capstone-server)

## What Does This App Do?

If you're like me, you grew up playing 8-bit/16-bit videogames. Food Fight takes inspiration from old school fighting games, and pits two food-related combatants against each other, picks a winner, and gives a whole bunch of restaurant listings based on the winning food item and location of your choosing. There are options to filter based on max price, and whether the restaurant is currently open. And clicking on a restaurant listing will give further details, like hours, reviews, and location (with a handy interactive map!).

## Installation

First, clone the repo:

```bash
$ git clone git@github.com:hanwkim/han-kim-capstone-client.git
```
Then to install the necessary dependencies:

```bash
$ cd han-kim-capstone-client
$ npm install
```
```$ npm install``` above should take care of installing what is needed, but just in case something goes wrong, the other dependencies that are being used can be installed with this command:

```bash
$ npm i sass react-router-dom axios framer-motion use-sound
```

## Environment Variables

A .env file will need to be created within the main repo folder, and it will need the following variables:

```
REACT_APP_BACKEND_URL=<ENTER BACKEND URL>
REACT_APP_API_KEY=<ENTER GOOGLE MAPS API KEY>
```
The backend URL should be formatted as such: ```http://localhost:<ENTER PORT FROM SERVER SIDE>```. Note that if on the server side you did not provide a PORT environment variable, then no need to provide a REACT_APP_BACKEND_URL variable, as it will default to ```http://localhost:5050```, same default port as on the server.

If you already created an API key for the server side, then you can enter it here for REACT_APP_API_KEY. Otherwise, follow the instructions below:

A Google Maps API key is mandatory. The link below gives detailed instructions on how to set up a Google Cloud project, which will allow you to generate an API key. 

[Google Maps API: Get Started](https://developers.google.com/maps/get-started)

You will need to create a billing account, but if it's your first then Google offers a credit of $300, which is roughly equivalent to over 30,000 GET requests from the API.

Once you have an API key, enter it into the .env file.


## Starting the App

Enter this command, and you should be greeted with the homepage!

```
$ npm start
```

Note: make sure the server side is running as well!

## Screenshots and Usage Instructions

<img src="https://i.ibb.co/BT5pSdD/screenshot1.png" alt="title page" height="200">

Title screen - hit "New Game", and select Savory or Sweet depending on your mood. You will be shown a different roster of characters depending on your selection.

<img src="https://i.ibb.co/0BHzZPW/screenshot2.png" alt="character select" height="200">

Select your characters. Which two food items are you deciding between?

<img src="https://i.ibb.co/0yGxKv8/screenshot3.png" alt="stage select" height="200">

Stage select. This will determine the location/proximity of the restaurant listings that you will get. Using current location is easiest, but you can enter another city name as well.

<img src="https://i.ibb.co/87Y1cBs/screenshot4.png" alt="showdown page" height="200">

Now that the match is set, time to fight!

<img src="https://i.ibb.co/LNjwnh6/screenshot5.png" alt="results page" height="200">

We have a winner! The results will show the restaurants where you can buy the winner. Filtering options below for max price, and whether the restaurants are currently open.

<img src="https://i.ibb.co/2W8MNqk/screenshot6.png" alt="place details" height="200">

Click on a listing and you'll be given more details - description, price level, hours, reviews, and interactive map.

Want another showdown? Press that button at the bottom of the results page.

## Tech Stacks/Libraries Used

 - [React](https://reactjs.org/)
 - [Sass](https://sass-lang.com/)
 - [Framer Motion](https://www.framer.com/motion/)
 - [Use-Sound](https://github.com/joshwcomeau/use-sound)
 - [Axios](https://axios-http.com/)

## Lessons Learned and Roadmap

Visuals matter, and trying to achieve a 16-bit game aesthetic requires a fair amount of state management to handle all of the various hover and click animations. Figuring out which component needed to handle which state variable was a challenge, but a very rewarding one. There is an opportunity here to utilize other libraries to manage state more cleanly as well.

Future plans include:
 - account creation, login, and sign-up, with the ability for restaurant listings to be saved to individual accounts
 - online multiplayer
 - a larger roster of characters

## Credits

Food Sprites:

 - [https://ghostpixxells.itch.io/pixelfood](https://ghostpixxells.itch.io/pixelfood)
 - [https://henrysoftware.itch.io/pixel-food](https://henrysoftware.itch.io/pixel-food)

Sound Effects:

 - [https://pixabay.com/](https://pixabay.com/) - jhyland and gamer127

## Thank You

Thank you for taking the time to check out my project. Feel free to reach out to me with any questions or comments!
