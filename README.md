# Review-Project

## Table of Contents
- [How To Run](#how-to-run)
- [List Of Services](#list-of-services)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Feature](#feature)
- [Step By Step](#step-by-step)
- [Unit Test](#unit-test)
- [Source](#source)

## How To Run
Please make sure you already install **docker** and port **3306, 3000, 8080, and 8000** are not used.
Run command **`docker compose up --build -d`** and wait until all of the images are installed properly.

## List Of Services
* `localhost:3000` is for the client web;
* `localhost:8000` is for the server / API;
* `localhost:3306` is for the mysql;
* `localhost:8080` is for the phpmyadmin;

## Technology Stack
### `Client`
* `React (using hook and functional component)`, `Typescript`, `Material UI`, `Redux`
* `Lint`, `Jest`, `Enzyme`
* `Webpack`

### `Server`
* `NodeJs`, `ExpressJs`, `Typescript`, `Sequelize`

### `DB`
* `MySQL`

### `Etc`
* `Docker`

## Architecture
![Architecture Diagram](https://user-images.githubusercontent.com/6867870/116280127-52876b80-a7c3-11eb-9ed4-4eaae2fb8b2c.jpg)

## Feature
### Admin view
* -[x] Add/remove/update/view employees
* -[x] Add/update/view performance reviews
* -[x] Assign employees to participate in another employee's performance review

### Employee view
* -[x] List of performance reviews requiring feedback
* -[x] Submit feedback

## Step By Step
Here is step by step to operate this project.

### Admin
#### Default Data
* `Email: email@gmail.com`
* `Password: 123456`

#### Login Page
![image](https://user-images.githubusercontent.com/6867870/116281864-16eda100-a7c5-11eb-9586-9002529797b8.png)
* `Email and password must inserted correctly to go to the home page`
* `If email or password is invalid will show an error message`

#### Home Page
![image](https://user-images.githubusercontent.com/6867870/116283392-cb3bf700-a7c6-11eb-850f-9de8c1b5cdd9.png)
* `Home page or dashboard template for container`
* `3 Menus are available: Employee, Performance Review, and Feedback`

#### Employee Page

##### List Page
![image](https://user-images.githubusercontent.com/6867870/116282901-47820a80-a7c6-11eb-9bcf-c65f562fa8e4.png)
* `Showing table list for employee data with 
`
* `Add button to add new employee data and will go to Employee Detail Page with default data`
* `Pencil icon button to edit row employee data and will go to Employee Detail Page with selected employee data`
* `Checkbox to select which row do you want to delete`
* `Delete button to delete employee(s) data`

##### Detail Page
![image](https://user-images.githubusercontent.com/6867870/116283551-f6264b00-a7c6-11eb-8b44-af0e32acedba.png)
* `Name field for employee name`
* `Email Address field for employee email address which used for login`
* `Status field for employee status (like suspended or not)`
* `Type field for employee type either admin or employee (default is employee)`
* `Reviewers field for employee reviewers. Employee will receive feedback from reviewers`
* `Reviewees field for employee reviewees. Employee will give feedback to reviewees`
* `Save button to add or update employee's data`
* `Cancel button to go back to list page`

#### Performance Review Page

##### List Page
![image](https://user-images.githubusercontent.com/6867870/116284228-ce83b280-a7c7-11eb-9c2a-9450718f69b9.png)
* `Showing table list for performance review data with pagination`
* `Add button to add new performance review data and will go to Performance Review Detail Page with default data`
* `Pencil icon button to edit row performance review data and will go to Performance Review Detail Page with selected performance review data`
* `Visible icon button to view row performance review data + employee's feedback with that period and will go to Performance Review View Page`
* `Checkbox to select which row do you want to delete`
* `Delete button to delete performance review(s) data`

##### Detail Page
![image](https://user-images.githubusercontent.com/6867870/116284549-291d0e80-a7c8-11eb-93bd-11fc8bdf3682.png)
* `Period Start field for performance review start period`
* `Period End field for performance review end period`
* `Feedback Start field for start date when employee can give their feedback to reviewees`
* `Feedback End field for end date when employee can give their feedback to reviewees`
* `Save button to add or update performance review's data`
* `Cancel button to go back to list page`
* **You must fill insert reviewers and reviewees for the employee first before add new performance review. Any changes after performance review created will affected for the next performance review**

##### View Page
![image](https://user-images.githubusercontent.com/6867870/116285301-f7587780-a7c8-11eb-9594-8f29fcd540b4.png)
* `Showing list of employee with feedbacks from their reviewers within selected performance review period with pagination`

#### Feedback Page
* **This page is available in Admin because Admin is employee too who can give their feedback to others and receive feedback from others**

##### List Page
![image](https://user-images.githubusercontent.com/6867870/116285838-82d20880-a7c9-11eb-9254-68a4470b9726.png)
* `Showing table list for feedback for employee's reviewees which must be submitted with pagination`
* `Write button to write feedback data fore selected reviewee and will open feedback dialog`

##### Feedback Dialog
![image](https://user-images.githubusercontent.com/6867870/116286253-f70cac00-a7c9-11eb-8fd2-71fbd2dd5668.png)
* `Review Period text for performance review period info`
* `Name text for reviewee's name info`
* `Email Address text for reviewee's email address info`
* `Score field for reviewee's feedback score`
* `Score field for reviewee's feedback message`
* `Send button to submit feedback data (disabled when score is not selected)`
* `Cancel button will close dialog`

### Employee
#### Default Data
* `Email: employee1@gmail.com`
* `Password: 123456`

#### Login Page
![image](https://user-images.githubusercontent.com/6867870/116286601-5ec2f700-a7ca-11eb-99f1-cee461cbbc9f.png)
* `Email and password must inserted correctly to go to the home page`
* `If email or password is invalid will show an error message`

#### Home Page
![image](https://user-images.githubusercontent.com/6867870/116286745-8ca83b80-a7ca-11eb-9cf9-b44aa0505d4a.png)
* `Just 1 menu is available: Feedback`

#### Feedback Page

##### List Page
![image](https://user-images.githubusercontent.com/6867870/116286902-b8c3bc80-a7ca-11eb-9f5d-3901b80a3891.png)
* `Showing table list for feedback for employee's reviewees which must be submitted with pagination`
* `Write button to write feedback data fore selected reviewee and will open feedback dialog`

##### Feedback Dialog
![image](https://user-images.githubusercontent.com/6867870/116287048-e6106a80-a7ca-11eb-9143-d12a8728027c.png)
* `Review Period text for performance review period info`
* `Name text for reviewee's name info`
* `Email Address text for reviewee's email address info`
* `Score field for reviewee's feedback score`
* `Score field for reviewee's feedback message`
* `Send button to submit feedback data (disabled when score is not selected)`
* `Cancel button will close dialog`

## Unit Test
### Client
* Go to **client** folder and run command **`yarn test:coverage -u`**
* Coverage are above **80%**

### Server
* Unit test not implemented since controller just using sequelize for database CRUD purpose

## Source
### Client
* This client web was created from [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate-cra-template)
* Component based on [Material UI](https://material-ui.com/)

### Server
* This server was created from [ExpressJs](https://expressjs.com/)
