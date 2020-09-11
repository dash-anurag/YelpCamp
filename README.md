# YelpCamp
My implementation of the famous Colt Steele's WebDev Bootcamp Project.

Yelp Camp is a fun application that allows you to view campgrounds with a short description. Once you login or signup you can begin to create your own campgrounds that includes a title, image address and short description.

YelpCamp is a more complex application built from scratch using the following technologies:

On the front-end I have used HTML5, CSS3, JavaScript, Bootstrap for responsive layout, and jQuery. On the back-end I used NodeJS, NPM, ExpressJS, REST, Authentication, Authorization and PassportJS. For datastore I used non-sql MongoDB. The application is hosted on Heroku servers and MongoDB Atlas.

---
## Requirements

For development, you will only need Node.js and MongoDB as the database.



### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm


If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### MongoDB

For this project you need to have _MongoDB Community Edition_ installed and running. Having a local instance of _MongoDB_ running on your system is the preferred option.

Alternatively, you can sign up for an account from a _Database As A Service_ (DBAAS) provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [mlab](https://mlab.com/). Both _DBAAS_ providers offer a free tier with 500MB size limit that can be used for development and testing.

#### Using a Local MongoDB Server

If you don't have MongoDB installed, please click on [this link](https://docs.mongodb.com/manual/administration/install-community/) for instructions on how to **install** and **run** the _Community Server_ and the _mongo shell_. Follow the instructions for your _Operating System_.

After MongoDB is installed, follow the instructions on the documentation to start the server. Then run the _mongo shell_ from a separate terminal and execute the `show dbs` command. If all goes well you should see a list of available databases, similar to the sample below.

```
 > show dbs
 admin  0.000GB
 local  0.000GB
```

---
## Running the application

For development, you will only need Node.js and MongoDB as the database.

1. Clone the repo
2. Install dependencies: `npm install`
3. Start your mongoDB instance. This repo works on an instance running on `localhost:27017` on Testing Environment.
4. Start the application: `node app.js`
5. Open locally at [http://localhost:3000/](http://localhost:3000/)