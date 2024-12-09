
# **Sports Training Scheduling Application**

A smart application for managing and scheduling sports training sessions offers a convenient and efficient user experience for regular users and administrators.

---

## **Table of Contents**
1. [Project Description](#project-description)
2. [Key Features](#key-features)
3. [Technologies and Libraries Used](#technologies-and-libraries-used)
4. [Future Enhancements](#future-enhancements)
5. [Credits](#credits)

---

## **Project Description**

The application provides a smart solution for managing and scheduling sports training sessions, focusing on high user experience, administrative flexibility, and advanced functionality.  
The application is designed for two types of users:  
1. **Regular Users** – Can schedule, cancel, and manage their training sessions.  
2. **Administrators (Admins)** – Can manage the training sessions and users in the system.

---

## **Key Features**

### **Regular User:**
1. **Homepage:**  
   - View a list of available training sessions.  
   - Book training sessions.  
   - View details about each session (date, time, additional information).  
2. **My Training Sessions:**  
   - View a list of sessions selected by the user.  
   - Cancel booked sessions.  
3. **Profile Editing:**  
   - Update personal information (name, email, etc.).  

### **Administrator (Admin):**
1. **Training Management:**  
   - Edit existing training sessions.  
   - Delete training sessions.  
   - Add new training sessions.  
   - View the number of participants in each session.  
2. **User Management:**  
   - View the list of registered users.  
   - Change user roles (from client to admin and vice versa).  

---

## **Technologies and Libraries Used**

### **Backend:**
The application utilizes the following libraries and tools:
- **bcrypt** – For password encryption.  
- **chalk** – For enhancing console messages.  
- **cors** – For handling cross-origin requests.  
- **dotenv** – For managing environment variables.  
- **express** – For building the server-side application.  
- **joi** – For validating user data.  
- **jsonwebtoken** – For creating and managing JWT.  
- **moment** – For working with dates and times.  
- **mongoose** – For interacting with the MongoDB database.  
- **morgan** – For logging HTTP requests.  
- **path** – For file path manipulation.

### **Frontend:**
The application utilizes the following libraries and tools:
- **axios** – For making API calls.  
- **bcrypt** / **bcryptjs** – For encrypting data (mainly passwords).  
- **joi** – For validating user data.  
- **jwt-decode** – For decoding JWT on the client side.  
- **moment** – For working with dates and times.  
- **react** – For building a dynamic client-side application.  

## **Future Enhancements**

1. **Waiting List:**  
   - When a session reaches full capacity (25 participants), users can join a waiting list.  
   - Once a spot becomes available, the first user on the waiting list will be notified or granted access.  

2. **Enhanced User Management:**  
   - Allow administrators to edit user details, such as:  
     - Update user name.  
     - Reset password.  
     - Edit additional personal details (email, phone, etc.).  

3. **UI Improvements:**  
   - Add **Dark Mode** and **Light Mode** options for all users.  
   - Redesign the UI using **Sass**/**SCSS** for more efficient, flexible, and organized styling.  

4. **API Call Management with Redux:**  
   - Move all API calls to a centralized system managed by **Redux**.  
   - Improve code organization by separating API calls from individual React components.  
   - Create cleaner, more maintainable, and unified code.  

5. Support for multiple languages.  

---

## **Credits**

- Developed by: **Inon Moshe Yosef**.  

---

