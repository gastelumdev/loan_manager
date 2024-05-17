# Loan Manager
This is a simple Typescript application that helps users submit loan applications and allows admins to approve or deny them.

To demo a live version of the application, visit [https://loanmanager.onrender.com](https://loanmanager.onrender.com)

## Table of Contents
- [Tech Stack](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#tech-stack)
  - [Backend](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#backend)
    - [Cron Job Reports](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#cron-job-reports)
    - [Socket.io for automatic updates](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#socketio-for-automatic-updates)
    - [Automated Testing](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#automated-tests)
  - [Frontend](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#frontend)
- [Installation](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#installation)
- [Usage](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#usage)
  - [Home Page](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#home-page)
  - [User Drawer](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#user-drawer)
  - [User Dashboard](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#user-dashboard)
  - [Admin Dashboard](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#admin-dashboard)
- [UI updated in real time](https://github.com/gastelumdev/loan_manager?tab=readme-ov-file#uis-updated-in-real-time)

## Tech Stack

### Backend
The backend serves as an API that provides several user and application endpoints that are called by the frontend. 
The application was built using Node.js, Express, and SQLite.

#### Cron Job Reports
Node-cron was implemented to run two daily cron jobs that create reports that include loans above $100,000 and saves it to a text file.
Reports are saved in ```backend/reports```. An improvement to the reports would be to email high dollar loans to an admin at certain intervals or 
times.

#### Socket.io for automatic updates
Socket.io allows for automatic updates. For example, when a loan is approved, the barrower can see the status change to "Approved" without
any user input or page reloading. To test functionality, put two browser windows side by side, and then navigate to the admin page on one browser window, and 
to a user page on the other. Then, submit a new loan and see it automatically dispaly in the admin page. Now, update the status on the admin
page and watch the status change in the user page. See [demo](https://github.com/gastelumdev/loan_manager/README.md#uis-updated-in-real-time)

#### Automated Tests
Automated tests for the API endpoints were implemented with Jest. To run the test suite, type ```cd backend``` to change into the backend directory and ```npm run test```
to run the Jest test suite.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/271ae469-8cf9-4cda-88fd-50687ad40cfa)


### Frontend
The frontend is a Vite React application that calls the API via Redux RTK Query. The UI consists of mostly Chakra UI components.

## Installation

To get the application running locally on your machine, clone this repo and run 
- ```npm run start-backend``` to run the API backend server
- ```npm run start-frontend``` to run the React frontend server
- Visit [http://localhost:5173](http://127.0.0.1:5173) to access the home page.

## Usage

#### Home page
The home page allows the user to navigate to either the admin page or applications page.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/e920d3bb-380b-4bce-a066-a08c6826a0f5)

#### User Drawer
Clicking the "Apply" button in the home page opens a side drawer. Within the drawer the user can either enter your
full name if they are a new user, or select their name from a list of users.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/1cd518df-9981-4468-bb5a-dc06930d28b3)

Entering your full name and clicking "Next" will create a new user and redirect you to that user's dashboard.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/44bfd9c9-0141-4884-a341-a1dfad3e62d3)
![image](https://github.com/gastelumdev/loan_manager/assets/96878603/007642d4-d817-44cd-857c-ffb02454b075)

This will also list the user next time they visit the user's drawer. Clicking the user card sends the user 
to their dashboard.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/afa7caa9-4e64-42b2-a683-36d0c61f4e55)

#### User Dashboard
The user dashboard provides a couple of actions for the user. One is the "Home" button which redirects the user
back to the Home page. The other is the "Apply" button where the user can apply for a loan.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/e4ce9fc6-2915-4227-81e3-7d019f914ec5)

Clicking the "Apply" button brings up a modal where the user can enter their full name and the amount to be barrowed.
By default, the "Apply" button within the modal is disabled until both inputs are filled out.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/82fedf75-a29d-48f2-a2f0-c0e05fb1ee37)
![image](https://github.com/gastelumdev/loan_manager/assets/96878603/97be9ac2-63c3-4134-a516-00b1f8bceb5b)

After the application is submitted, the application shows up in the dashboard. The application card displays the 
item's details including the status and provides a delete option.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/25a8370d-b080-4e91-b123-67ee80de723d)

#### Admin Dashboard
The admin dashboard shows every submitted loan application in the form of a card. The application cards display the 
item's details and also provide a way for the admin user to update the status in the form of a dropdown.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/cb266d06-5d99-417b-b91e-b85fdd389ceb)

Selecting "Approved" or "Denied" on the application's status dropdown will result in the status becoming disabled 
as per the use case requirements.

![image](https://github.com/gastelumdev/loan_manager/assets/96878603/617772e1-4f0d-4e89-8084-c99293c3c7aa)

### UI updated in real time

Any time the applications are created, updated or deleted, a message is sent with a socket.io server. The message triggers the applications to be 
refetched and rerendered. An improvement could be to implement toast notifications to alert the user of an update to the UI.

![socketioDemo-ezgif com-video-to-gif-converter (1)](https://github.com/gastelumdev/loan_manager/assets/96878603/7c074231-2a52-4064-ab81-214809557530)




















