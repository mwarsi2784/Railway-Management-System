# 🚆 Railway Management System

> A robust and user-friendly Railway Management System designed to streamline the operations of railway services. This system enables effective management of trains, schedules, passengers, and ticketing while ensuring data integrity using database triggers.

---

## 📌 Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database](#database)
- [Setup Instructions](#setup-instructions)

---

## 📖 About the Project

The **Railway Management System** is a CRUD-based application developed as part of a university coursework. The main objective is to simulate the operations of a railway service system, allowing for seamless management of:
- Train schedules
- Passenger records
- Ticket bookings
- Real-time updates using triggers

---

## ✨ Features

✅ Add, edit, and delete train schedules  
✅ Manage passenger records  
✅ Book tickets  
✅ Auto-updates via SQL triggers  
✅ Clean and intuitive UI  
✅ Real-time data reflection in database

---

## 🛠 Tech Stack

| Category       | Technologies Used                  |
|----------------|------------------------------------|
| Frontend       | `Embedded Javascript`  |
| Backend        | `Node.js` `Express.js`     |
| Database       | `MySQL`             |
| Version Control| `Git` `GitHub`                    |

---

## 🗃️ Database

The system uses triggers to maintain integrity. For example:
- When a ticket is booked, available seat count is updated.
- When a ticket is canceled, the seat is restored.

📝 **SQL Triggers** ensure consistency without manual intervention.

---

## 🚀 Setup Instructions

```bash
# 1. Install Required Software

# 👉 Download and install Node.js:
#    https://nodejs.org/en/download

# 👉 Download and install MySQL and MySQL Workbench:
#    https://dev.mysql.com/downloads/workbench/

# 👉 (Optional) Install Git if not already installed:
#    https://git-scm.com/downloads


# 2. Clone the Project Repository
git clone https://github.com/mwarsi2784/Railway-Mnagement-System.git
cd Railway-Mnagement-System


# 3. Install Node.js Dependencies
npm install


# 4. Set Up the MySQL Database

# 👉 Open MySQL Workbench
# 👉 Create a new database named `railway_management`
# 👉 Import the provided SQL file (railway_management.sql) to create tables and insert initial data // admin_name is zulqarnain and password is abcd'



# 5. Configure Environment Variables

# 👉 In the project root, create a `.env` file
# 👉 Add the following content:

DB_USER=root
DB_PASS=[YOUR DATABASE PASSWORD]
DB_NAME=railway_management
PORT=8000
SESSION_SECRET=123456789


# 6. Start the Server
node index.js


# 7. Access the application
# 👉 Open your browser and navigate to:
http://localhost:8000/admin/adminLogin
# 👉 Open your browser and navigate to:
http://localhost:8000/user/userLogin

---
