# DISTINCT

'about' goes here
https://docs.google.com/presentation/d/1yXcqzQ_bF7ZG4YzCxm1gXvq6DyfmKGHy297GhTXRL20/edit?usp=sharing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setup
Step by step instructions for creating/setting up your app on the Bluemix cloud platform (10/5/2017):

1. [Create/Login](https://idaas.iam.ibm.com/idaas/mtfim/sps/authsvc?PolicyId=urn:ibm:security:authentication:asf:basicldapuser) your Bluemix account
2. Go to Catalog
3. Search "node.js"
4. Click on the "Node.js Cloudant DB Web Starter" boilerplate
5. Enter an app name and host name and click create
6. Follow the "Getting started" in order to familiarize yourself on how to use Bluemix CLI (how to login and how to push)

### Accessing Cloudant Credentials
Your Cloudant account should have been generated when you previously created your app. They can be found in your app's environmental variables. Step by step instructions for setting up your **vcap-local.json** that should go into your config folder (**_important_** for starting the app locally) (10/5/2017):

1. Somehow navigate to your app on Bluemix

2. Click on "Runtime" in the side menu
3. Click on the "Environment variables" tab
alternatively:
2. Click on "Connections" in the side menu
3. In the container that is subtitled "Cloudant NoSQL DB Lite", click on the button "View credentials"

4. Copy the JSON that pops up and paste into your **vcap-local.json** file

### Running
Server is hosted on port 3000. It can be changed in the **config/config.js** file.

**Locally:**
Prerequisites:
1. This repository forked
2. [Node.js](https://nodejs.org/en/download) installed (verify using ```node --version```)
3. Dependency packages installed ( ```npm install```)
3. **config/vcap-local.json** file created (refer to [Accessing Cloudant Credentials](#accessing-cloudant-credentials))

In command line in your downloaded repository's directory, type ```node app.js```.

**Bluemix:**
Prerequisites:
1. This repository forked
2. [Bluemix CLI](https://clis.ng.bluemix.net/ui/home.html) installed
3. Bluemix "Node.js Cloudant DB Web Starter" boilerplate app created (refer to [Setup](#setup))

In command line in your downloaded repository's directory, type ```cf push```.
For more detailed instructions follow [this guide](https://console.bluemix.net/docs/starters/install_cli.html).

xx Follow this guide for Bluemix [here](https://console.bluemix.net/docs/starters/upload_app.html)

## Development

Middlewares - body-parser, express-session, connect-cloudant-store, passport, multer, multer-autoreap

### app.js
This application uses the Express.js web framework. It starts in the **app.js** file. Near the top, *database.js* is first required and initialized. [Pug](https://pugjs.org) is then set as the template engine in the Express framework. Following that are the middlewares. When adding middlewares, one must be careful of the order they put them in, else errors may occur. The order of the routes are also imporant as it affects which middlewares used in the application’s request-response cycle. The base routes here are test routes and should be "decomissioned" when going into production.

- Every hour, expired sessions will be cleaned up. (**app.js**)(doesn't work currently :/)
- Every half hour, expired events on scheduler will be cleaned up. (**database.js**)

Adding a Cloudant database to use: in **database.js**, append the following code near the end of the **initDBConnection()** function:
```
cloudant.db.create(<dbname>, function(err, res) {
  db.<dbname> = cloudant.use(<dbname>);
  // do stuff like initializing or whatever
});
```
Using/accessing the Cloudant database you added:
```
var db = require('./database'); // relative file path may be different
db.<dbname>.get( ... // whatever function provided by cloudant-nano
...
```

## Development - Editor
Instructions on how to use the editor is listed in the .pug template file.

### \#svgfocus
This element deals with the focus on the SVG. Specifically, keycodes.
- case 27: // ESCAPE - for deselecting everything
- case 46: // DELETE - for deleting selected nodes/links

### control
The object that stores and controls the state of the simulation. Pretty much miscellaneous stuff.

### Options Panel - (function(shapes){...})
Parameter **shapes**: a string array of shapes that can be created. ```["circle", "cross", "diamond", "square", "star", "triangle", "wye"]```. Returns the function **createNodeOptionsPanel**.
An interface to allow editing the data of nodes/links. **svgeditor_optionspanel.js** contains a closure for some reason...

#### Creating editable properties
These schemas are split into base and the rest of the shapes. Base includes the array of specified editable properties that all shapes will have, "name" and "color". In order to add your own custom editable property, the object must have **label** and **type**. **Type** is the type of DOM element it will be, which is limited to "input", "select", and "textarea". Additional types must be specified in the ```switch(trait.type) { ... }``` that is in the function createNodeOptionsPanel. If the type is a "select", then an additional array property called "options" is required as well. **update** is an optional function you can include to change other stuff; otherwise, only the data attribute will be updated. The **update** function may have up to three parameters: formdata, node, panel. Formdata is the new data submitted. node is the d3 selection of the relevant node. panel refers to the options panel of the node.

#### svgeditor_optionspanel.js - getShape(s)
returns the relevant element in the shapes array

### Toolbox
A clipPath specifies the boundaries of the toolbox. Each icon of the toolbox is 24px x 24px.
Stpes to add your own icon with functionality:
1. expand the height of the clipPath boundary by 24
2. follow the pattern of mediabutton/interationbutton/shapebutton

#### Toolbox - toolboxButtonMaker(name,transform)
Given the parameters provided, this function will create and return a button to fit in the toolbox. The *name* is used to set the id of the elements: "[name]-title" and "[name]-path". The *transform* is used to set the transform.

### topologySchema
A schema to verify the json of the topology. Uses AJV as its JSON Schema validator. The topology object must contain the array properties: "nodes" and "links". Each object element in the array "nodes" must have a property: "name". Each object element in the array "links" must have the properties: "source" and "target" which reference to an existing "name" in the "nodes" array.

## Built With

* [express.js](https://expressjs.com/) - The web framework used
* [Node.js](https://nodejs.org/) - Idk what

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Eric Xin** - *Initial work* - [theBowja](https://github.com/theBowja)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
