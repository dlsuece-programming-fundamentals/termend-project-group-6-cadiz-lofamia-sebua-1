[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23397080)
# LBYCPG3 Term End Project — A Sari-Sari Store Web-Based Application for Low-End Devices

**Group Members: Karl Timothy D. Cadiz, Jared Joshua A. Lofamia, Rogelio Q. Sebua Jr.** 

## Abstract

A concise summary of the project, its objectives, and its outcomes.

## Introduction

For small neighborhood store owners who now use handwritten notebooks to track sales, inventory, and customer debts, this project suggests creating a web-based sari-sari store inventory and debt management system. Based on our field validation interviews, many store owners struggle with manual debt tracking, inventory management, and sales computation, resulting in lost revenue and ineffective day-to-day operations. Most sari-sari stores still use notebooks for tracking customer debt. This often results in calculation errors and lost sales and profit. It was discovered that store owners want simple, easy-to-use tools, and they rely on prepaid mobile data plans. Initially, it was assumed that store owners did not own smartphones, but they already have Android phones for Facebook and GCash use. Cloud-based systems can work in this setting, but it may be impractical for fully online systems due to data usage concerns. Given these concerns, the mobile app will focus on quick debt recording with minimal data consumption and large, simple user interface elements. 

## Description of the Proposed System

The sari-sari store owners require a system to track customer debts and basic inventory while accommodating strict constraints on limited mobile data access, limited smartphone storage, and ease of use. The proposed solution is a web-based application that is optimized for low-end mobile devices. Store owners can record debt transactions, track inventory, monitor customers’ outstanding balances, and generate sales summaries. The system will use HTML, CSS, JavaScript, and Bootstrap for the frontend, Node.js for the backend, and MySQL for the database. The system size must remain under 20 MB and work with minimal connectivity; the UI must use large buttons and elements for readability; and the core functionality and actions must require no more than 3 clicks. To preserve the user’s local storage and battery life, complex analytics, multi-store management, real-time cloud integration, and AI elements will not be included. 

## Objectives

1. To create a web-based mobile application for sari-sari store owners running on a budget, which can run on low-end devices locally.
2. To utilize HTML, CSS, JavaScript, and Bootstrap for the development of the application
3. To record sales, debt, and customers that will be tracked by store owners


## Web Development Tools and Algorithms

1. HTML—It will act as a skeleton and foundation for the webpage’s content. Contains text, paragraphs, lists, links, and images. 
2. CSS—This adds colors, fonts, and layouts for HTML elements. Styles include a box model, button positioning, and item cards.
3. JavaScript - Gives the logic and functionality in the web application to add customers, sales, and debts, as well as real-time information about it. 
4. MySQL- Stores the information about customers, sales, transactions, and debts using a database. It was created using PHPMyAdmin.
5. PHP - Gives functionality for MySQL. 
6. Bootstrap - A CSS library that aims to develop a mobile-first application, which is very helpful for this project. 


## Methodology

A. Development
	A front-end is first developed to visualize how the program will look. A template is created in Figma, and afterward it will be coded in HTML and CSS. The site should contain 4 interfaces using 4 HTML files, namely, “Sell,” "Inventory," “Customers,” and “Summary.” The design is then enhanced using Bootstrap to make it mobile-friendly. 

	After the front-end development is finished, an SQL database is created to store the website’s data. Five tables were created, containing customers, items, transactions, transaction items, and debt. A PHP script will be used to connect the application to the database. 


	To design the back-end, the JavaScript files will create the logic for adding and deleting the items, customers, and their debts. These files will also provide the application's functionality. The buttons should be enabled for the aforementioned functionalities, and the database should be updated based on the site’s transactions. 


B. Testing


	To thoroughly test the program's functionality, features such as adding inventory, customers, and transactions should work as intended. When adding inventories, for example, a Coke worth 20 Php should be added to the database. For customers, a customer named “Juan” should also be added to the database. During transactions, sales are recorded on the summary page, and inventory items are removed from the database upon completion. Response times should be 1-2 seconds or less, without any crashes, to meet the needs of sari-sari store owners. The testing will be made using an Android device. 


## Testing and Evaluation of Results

### Results
Present the outcomes of the project, including functionality and performance. Use screenshots or tables if necessary to illustrate testing results.

### Discussion
Analyze the results and discuss their implications. Compare the project's outcomes with the initial objectives presented in your proposal.

### Conclusion
Summarize the key findings and contributions of the project. Offer insights into the future potential of the website.

## References

Cite all sources, research papers, and references used in the project.

## Project Deliverables

Check off each item as you complete it:

- [ ] **Project Documentation** — this README or uploaded document following the format above
- [ ] **App Design** — Figma link submitted on Canvas
- [ ] **Source Code** — all HTML, CSS, JS, and assets in `src/`
- [ ] **Video Walkthrough** — max 5 minutes, link below
- [ ] **Peer Grade** — individual submission on Canvas

## Video Walkthrough

Paste your video link here:
> (Replace this line with your video link)

Your walkthrough should demonstrate your website's key features and functionality. Max 5 minutes. There will be no presentation — your video should be clear enough that any student taking this course can understand your project.

## How to Run

Provide step-by-step instructions so that anyone who downloads this repository can run your website:

```
# Example:
# 1. Open index.html in a browser
# 2. Or run a local server: python -m http.server 8000
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
