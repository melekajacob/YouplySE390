# Youply

## Description
When trying to find a job/internship, a candidate could apply to hundreds of positions. Many of these positions requiring them to fill out an online form, with their personal information, work experience, skills, etc. Most of these forms allow a user to upload their resume, and the form will attempt to parse the resume and fill out all the information. Unfortunately, these methods are quite error prone and have a high error rate due to the variability in resume formats. 

Youply looks to solve this with a Chrome Extension which allows the user to upload their resume and fill out a single form, and then when they navigate to a job application form, the Youply will allow with to fill the form in seconds.

## Getting Started

1. `npm i` to install dependancies
2. `npm start` to start running the fast development mode Webpack build process that bundle files into the `dist` folder
3. `npm i --save-dev <package_name>` to install new packages

## Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder
   function should be your extension name
