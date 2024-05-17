## Loan Manager
This is a simple MERN stack application that helps users submit loan applications and allows admins to approve or deny them.

To demo a live version of the application, visit [https://loanmanager.onrender.com](https://loanmanager.onrender.com)

### Installation

OR

To get the application running locally on your machine, clone this repo and run 
- ```npm run start-backend``` to run the API backend server
- ```npm run start-frontend``` to run the React frontend server
- Visit [http://localhost:5173](http://127.0.0.1:5173) to access the home page.


### Usage

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
