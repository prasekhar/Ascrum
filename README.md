# Ascrum


## Description

Ascrum is a project management system which deals with complete project info like adding new project, view the current projects, add backlog information of projects, adds and view the sprints.


## Article & Demo

Article: ascrum-doc.docx

Demo: `http:/127.0.0.1:3000`


## Features

- [x] Handle logout
- [ ] new user registration

##Admin		##User	
- [x]		[ ]		Manage Projects
- [x]		[ ]		Manage users
- [x]		[ ]		Add project
- [x]		[ ]		Add user
- [x]		[x]		Add product backlog
- [x]		[x]		Add sprint
- [x]		[x]		Add task


## Dependencies

You need `express` up and running on port `3000`

You need `mongodb-2.6.1` up and running on port `27017`

You need `nodejs`

You need `mongoose`


## Installation

Install mongodb into C drive

Set path for bin in environmental variables of advanced options
	--paste c:/mongodb/bin in path at the end


### Start mongodb server

Start your mongodb instance:
Open command prompt from run

Go to mongodb bin folder in command by using commands
	cd c:\
	cd mongodb
	cd bin
	
Start the server by using command mongo

	c:\mongodb\bin>mongo
	MongoDB shell version: 2.6.1
	connecting to: test
	Server has startup warnings:
	2015-05-06T09:01:04.057+0530 [initandlisten]
	2015-05-06T09:01:04.057+0530 [initandlisten] ** NOTE: This is a 32 bit MongoDB b
	inary.
	2015-05-06T09:01:04.057+0530 [initandlisten] **       32 bit builds are limited
	to less than 2GB of data (or less with --journal).
	2015-05-06T09:01:04.057+0530 [initandlisten] **       Note that journaling defau
	lts to off for 32 bit and is currently off.
	2015-05-06T09:01:04.057+0530 [initandlisten] **       See http://dochub.mongodb.
	org/core/32bit
	2015-05-06T09:01:04.057+0530 [initandlisten]


### Install Nodejs App

Go to the api folder and install the dependencies: `npm install`

Edit api/ascrum-server.js and replace the value of Access-Control-Allow-Origin to match your server configuration.

Run the application: `node ascrum-server.js`


### Build angularjs app

The build result is already available, but if you want to build it yourself, install grunt and the dependencies, then run it.

### Install 

## Run

You can now open your browser: `http://127.0.0.1:3000`

## Stack

* AngularJS ~1.4.0
* Bootstrap ~3.3.4
* MongoDB ~2.6.1
* Express ~4.12.3
* Nodejs ~0.12.2




