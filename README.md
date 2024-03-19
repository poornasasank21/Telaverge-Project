# Telaverge-Project
1. Introduction:

The URL Shortener Application is developed to provide users with the ability to shorten long URLs into more manageable and shareable links. The application offers features such as user registration, secure authentication, URL shortening, redirection, link analytics, and a user dashboard.

2. Technologies Used:

AngularJS for the frontend user interface and dashboard.
Python Flask for the backend server and API development.
MySQL Workbench for database management and storage.
MatSnackBar for providing user-friendly error messages during registration and login.
AgChartOptions for generating graphical analytics on user shortened URLs.
3. Functionalities Implemented:

User Registration and Authentication:

Users can register and log in securely using authentication mechanisms provided by AngularJS and Flask.
MatSnackBar is utilized to display error messages for incorrect user inputs during registration.
URL Shortening:

Users can submit long URLs to the system, and the application generates a unique short alias for each URL.
Redirecting Short URLs:

When users access the short URL, they are redirected to the original long URL.
Link Analytics:

Basic analytics such as the number of clicks, referral sources, etc., are provided for each shortened URL.
User Dashboard:

Users have access to a dashboard where they can view their shortened URLs and analytics.
Persistence:

User data, URL mappings, and analytics data are stored securely in a MySQL database.
4. Architecture Overview:

The frontend developed using AngularJS interacts with the backend server implemented in Python Flask through RESTful APIs. The server handles user authentication, URL shortening, redirection, and analytics calculations. MySQL database stores user-related data, URL mappings, and analytics.

5. Conclusion:

The URL Shortener Application provides a user-friendly interface for shortening URLs, managing user accounts, and analyzing URL usage. By leveraging AngularJS, Python Flask, and MySQL, the application ensures security, reliability, and scalability. MatSnackBar and AgChartOptions enhance the user experience by providing informative messages and graphical analytics.