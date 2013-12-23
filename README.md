#lift-examples

Different Lift examples that I publish on my blog at http://blog.fmpwizard.com

#Requirements

* Nodejs versions >= 0.8.0 [http://nodejs.org/](http://nodejs.org/)
* Grunt 0.4.x [http://gruntjs.com/](http://gruntjs.com/)
* Bower [http://bower.io/](http://bower.io/)

#Install required components

Install node using your operating system package management.

Then: (you may need to run them as sudo)

```
$ npm install -g grunt
$ npm install -g grunt-cli
$ npm install -g bower

```

#Getting the resources build dependencies

At the root of the project, run:

```
$ npm install
```
Running `npm install` reads the file `package.json` and gets all the dependecies it needs and puts them in the `node_modules` folder.

Now let's get the javascript/css dependencies.

```
$ bower install
```

This step will  read the `bower.json` file and add the dependencies to the `bower_components/` folder.

#Initial workflow

Once you have the setup in place, we need to do the initial build of the resources (javascript, css anf font files). This is why we use `Grunt`. So go ahead and run this on the terminal:

```
$ grunt
```

This will run:

* **jshint**: this task will look for code errors on your javascript files, things like unused variables, missing semicolons, etc
* **requirejs**: this task will minify your js files and the dependencies (like jquery, bootstrap.js, etc) and it will concatenate them into `src/main/webapp/static/dist/main.min.js`
* **cssmin**: It will minify and concatenate your css files (including bootstrap files) and produce `src/main/webapp/static/dist/main.min.css`
* **copy**: this task will copy the bootstrap fonts files to `src/main/webapp/static/fonts/`

#Normal workflow

While you are developing your application, you can run

```
$ grunt watch
```

And this task will watch for changes on your css/js files and run the minification and concatenation automatically. This step may take some time. If the time it takes is too long, you could modify the `Gruntfile.js` file not to run the minification/uglifycation step during dev mode. Future versions of this template will provide that.

#Questions.

Feel free to email us on the Lift mailing list at [https://groups.google.com/forum/?fromgroups#!forum/liftweb](https://groups.google.com/forum/?fromgroups#!forum/liftweb)