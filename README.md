# Face Detection Web App
## Overview
The face detection web application serves as a personal project to pick up web technologies and libraries (ReactJS, Tachyons), integration with persistence storage (PostgreSQL) and API callback (Clarifai Face-Detection API).

## Table of Contents
- [Technical Architecture](#technical-architecture)
- [QuickStart](#quick-start)

## Technical Architecture
<img src="https://github.com/junrong09/facerecognition/blob/master/docs/imgs/architecture.jpg" alt="architecture" width="700"/>

* The database serves as a persistent storage for account management (account creation and sign-in validation)

## Quick Start
1. Go to https://face-recognitionbrain.herokuapp.com/
1. Enter Email: `user1.@gmail.com` Password: `user1` and hit **Sign in**.
1. Enter a image URL e.g. `https://images.unsplash.com/photo-1548142813-c348350df52b` and hit **Detect**.

\* Users may face hiccups (i.e. slow startup) accessing and signing in the website. This is because the Heroku Servers, where the application and its [restful APIs](https://github.com/junrong09/facerecognition_api/) are hosted, go into idle after a undefined period of inactivity.