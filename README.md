[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23397080)
# LBYCPG3 Term End Project — A Sari-Sari Store Web-Based Application for Low-End Devices

**Group Members: Karl Timothy D. Cadiz, Jared Joshua A. Lofamia, Rogelio Q. Sebua Jr.** 

## Abstract

	This project presents a web-based, lightweight inventory and debt management app that is designed for sari-sari store owners with low-end mobile devices has been developed through this project. These traditional neighborhood stores in the Philippines typically use technology that consists of paper-based records and manual calculation in order to perform their business transactions, thus making it difficult to accurately track and record business processes like sales, expenses, and inventory levels as a consequence of common issues associated with manual data entry, for example, error in calculation, damage to paper records, and loss of paper records.


	The aim of this project is to provide a solution to the problem of bridging the gap between manual processes and complex retail software, which are typically complex and depend heavily on cloud-based services by providing a solution with a focus on low data consumption, minimal storage requirements less than 20 MB, and high usability.


	The application was developed using a web-based technology stack consisting of HTML, CSS, and JavaScript using the Bootstrap framework for the front-end user interface, PHP and MySQL for back-end data management. Some of the key features include real-time inventory tracking, calculating of debt balances in real-time with the ability to partially pay off a debt balance, and daily sales summary production.


	Testing is done on low-end Android devices shows that the app successfully meets all functional requirements and that users are experiencing a seamless user experience with each action completed within 2 seconds. Although the current version of this application requires internet connectivity to access a centralized database, it demonstrates that simplified “mobile first” technology solutions can dramatically enhance both the operational efficiency of micro-retailers and the accuracy of their financial reporting.


## Introduction

	Small neighborhood store owners, commonly sari-sari stores, often rely on handwritten notebooks to manage sales, inventory, and customer debts. While this method is accessible, it frequently leads to calculation errors, misplaced records, and inefficient tracking of daily transactions, ultimately affecting profitability and operational efficiency.
	
	Based on field validation interviews, many store owners struggle to accurately monitor the outstanding balances, manage inventory levels, and summarize sales performance. Despite these challenges, most owners already possess Android smartphones, commonly used for social media and digital wallet applications, such as GCash. This shows an opportunity to transition from manual to digital systems.

	However, due to reliance on prepaid mobile data, fully cloud-based solutions may not be practical. Therefore, this project proposes a lightweight web-based sari-sari store inventory and debt management system designed for low data consumption and ease of use. The system prioritizes quick transaction recording, simple navigation, and large, user-friendly interface elements to support efficient day-to-day store operations.


## Description of the Proposed System

	Sari-sari store owners require a system that can efficiently track customer debts and basic inventory while accommodating constraints such as limited mobile data access, restricted smartphone storage, and the need for ease of use. In response to this, this project proposes a web-based application optimized for low-end mobile devices. The system enables store owners to record debt transactions, manage inventory, monitor customers’ outstanding balances, and generate sales summaries.

	The application will be developed using HTML, CSS, JavaScript, and Bootstrap for the frontend, Node.js for the backend, and MySQL for the database. To ensure accessibility and performance, the system will be designed with a total size of under 20 MB and the capability to function with minimal connectivity. The user interface will prioritize readability through large buttons and simple layouts, while the core functionalities will be accessible within no more than three interactions.

	To further optimize the storage and battery efficiency, advanced features such as complex analytics, multi-store management, real-time cloud integration, and artificial intelligence will be excluded.


## Objectives

**General Objective:**

	To develop a lightweight web-based mobile application for sari-sari store owners that supports efficient tracking of sales, inventory, and customer debts on low-end devices.

**Specific Objectives:**

1. To design and implement a system capable of running on low-end devices with minimal data usage and local storage requirements.
2. To provide functionalities for recording and managing sales transactions, customer debts, and basic inventory.
3. To enable store owners to monitor outstanding balances and generate simple sales summaries for daily operations.


## Web Development Tools and Algorithms

	This section presents the web development tools and core algorithms used in the development of the proposed system, along with their roles and significance.

**Web Development Tools:**

**1. HTML (Hypertext Markup Language)**

HTML serves as the structural foundation of the web application. It defines the content and layout for the interface, including text elements, forms, buttons, lists, and other essential components required for user interaction.

**2. CSS (Cascading Style Sheets)**

CSS is used to enhance the visual presentation of the application. It defines styles such as colors, fonts, spacing, and layout. Key implementations include the box mode, responsive layouts, and the styling of buttons and item cards to improve readability and usability.

**3. JavaScript**

JavaScript provides the core logic and interactivity of the system. It enables dynamic features such as adding and updating customer records, processing sales and debt transactions, and displaying real-time updates within the user interface.

**4. Bootstrap**

Bootstrap is a front-end framework used to support responsive and mobile-first design. It simplifies the development of the user interface components and ensures compatibility across different screen sizes, essential for low-end mobile devices.

**5. PHP (Hypertext Preprocessor)**

PHP is used as a server-side scripting language to handle communication between the frontend and the database. It processes requests, performs data validation, and executes database operations such as inserting, updating, and retrieving records.

**6. MySQL**

MySQL is used as the database management system for storing and organizing data related to customers, inventory, sales, and debts. It ensures structured data storage and efficient retrieval using queries. The database was managed using phpMyAdmin.


**Algorithms Implemented:**

**1. Transaction Recording Algorithm**

This algorithm handles the process of recording sales and debt transactions. When a user inputs transaction data, the system validates the input, determines whether the transaction is cash or credit, and stores the corresponding record in the database. This ensures accurate and consistent tracking of store activities.

**2. Debt Calculation Algorithm**

The system computes each customer’s outstanding balance by accumulating unpaid transactions and subtracting recorded payments. This allows store owners to monitor debts in real time and reduce manual calculation errors.

**3. Inventory Update Algorithm**

Whenever a sale is recorded, the system automatically deducts the corresponding quantity from the inventory. This ensures that stock levels remain updated and prevents discrepancies between the actual and recorded inventory.

**4. Sales Summary Generation Algorithm**

This system aggregates transaction data to produce summaries. This involves iterating through stored records and computing totals such as revenue, cash received, and outstanding debts.


## Methodology

A. Development
	A front-end is first developed to visualize how the program will look. A template is created in Figma, and afterward it will be coded in HTML and CSS. The site should contain 4 interfaces using 4 HTML files, namely, “Sell,” "Inventory," “Customers,” and “Summary.” The design is then enhanced using Bootstrap to make it mobile-friendly. 

	After the front-end development is finished, an SQL database is created to store the website’s data. Five tables were created, containing customers, items, transactions, transaction items, and debt. A PHP script will be used to connect the application to the database. 


	To design the back-end, the JavaScript files will create the logic for adding and deleting the items, customers, and their debts. These files will also provide the application's functionality. The buttons should be enabled for the aforementioned functionalities, and the database should be updated based on the site’s transactions. 


B. Testing


	To thoroughly test the program's functionality, features such as adding inventory, customers, and transactions should work as intended. When adding inventories, for example, a Coke worth 20 Php should be added to the database. For customers, a customer named “Juan” should also be added to the database. During transactions, sales are recorded on the summary page, and inventory items are removed from the database upon completion. Response times should be 1-2 seconds or less, without any crashes, to meet the needs of sari-sari store owners. The testing will be made using an Android device. 


## Testing and Evaluation of Results

### Results


### Discussion
	The results show that the system successfully fulfills its primary objective of providing a simple and efficient tool for sari-sari store owners to manage customers, track debts, and record transactions. Functional testing confirmed that all the core features operate correctly when the system is connected to the internet, including debt management, inventory updates, and sales recording.

	The application also met the objective of maintaining ease of use, as tasks can be completed within a few interactions, and the interface remains simple and easy to use. This supports the goal of creating a user-friendly system for non-technical users.

	However, the system requires an active internet connection to function, as it relies on a centralized database for data storage and retrieval. This limitation may affect usability in areas with unstable or limited connectivity. Despite this, the system remains suitable for users with basic internet access, which aligns with the initial assumption that store owners already use smartphones and have access to mobile data.

	Overall, the outcomes are consistent with the proposed objectives in terms of simplicity, usability, and core functionality, while acknowledging the dependency on internet connectivity.

### Conclusion
	The project successfully developed a web-based application that supports sari-sari store owners in managing sales, inventory, and customer debts. The system provides a simple and structured approach to recording transactions and monitoring outstanding balances to reduce reliance on manual record-keeping methods.

	The key contribution of the system lies in its ease of use and ability to optimize basic store operations through a lightweight interface. Testing results confirm that the application performs its intended functions effectively when an internet connection is available.

	For future improvements, the system may be enhanced by incorporating offline functionality, enabling data synchronization once connectivity is restored, and expanding reporting features for better analysis of store performance. These improvements could further increase the system’s usability and accessibility for a wider range of users.

## References

Mzizi, S. (2024). HTML, CSS, and JavaScript: Essential front-end languages explained. ITonlinelearning. https://www.itonlinelearning.com/blog/html-css-and-javascript-essential-front-end-languages-explained/#:~:text=Programming%20languages%20are%20the%20building,functionality%20to%20the%20web%20page. 

## Project Deliverables

Check off each item as you complete it:

- [x] **Project Documentation** — this README or uploaded document following the format above
- [X] **App Design** — Figma link submitted on Canvas
- [X] **Source Code** — all HTML, CSS, JS, and assets in `src/`
- [X] **Video Walkthrough** — max 5 minutes, link below
- [X] **Peer Grade** — individual submission on Canvas

## Video Walkthrough

Video link: https://youtu.be/QKwshvWta24


## How to Run

Provide step-by-step instructions so that anyone who downloads this repository can run your website:

```
# 1. Import the database in http://localhost/phpmyadmin
# 2. Open XAMPP Control Panel and start Apache and MySQL
# 3. Open a browser
# 4. Type http://localhost/termend-project-group-6-cadiz-lofamia-sebua-1/src/sell.html in the search bar.
# 5. Another alternative is to have a server running, the website is https://dorothy-unhectic-valarie.ngrok-free.dev/termend-project-group-6-cadiz-lofamia-sebua-1/src/sell.html
```

## Project Structure

```
├── src/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── assets/
│   │   └── (images, fonts, etc.)
│   └── ...
├── docs/
│   └── (documentation files, if separate from README)
└── README.md
```

## Submission Notes

- All source code must be committed and pushed before the deadline (**April 9, 2359**).
- Do **not** upload generated or binary files.
- Keep your repository organized — use folders as shown above.
- All team members should contribute commits.
