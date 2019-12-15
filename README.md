# BamazonCustomer App

# Introduction

A node app that allows user to view the products in the current database, and select the product they want, then put in orders, while the order is put, the database will be updated real time. After a user finished ordering, he/she can choose to exit the app.

# Using the app

- use node to initiate the app, commandline: node BamazonCustomer.js
- View the product details
- Choose the id that you would like to purchase
- Decide if you'd like to put another order

# How the app was built

- In order to use the app, a database is needed to be set up. bamazon.sql included the sql commands.
  commands used for connections:
  connection.createConnection()
  connection.connect()
  connection.query()
  connection.end()
  to update the database:
  UPDATE products SET ? WHERE ?

- Use npm to install and reference to mysql, inquirer, in order to link to the database and be able to interact with user input.
- Compare the inquirer's answer, and information in the database, to determine what to be updated in the database, also whether to end connection, inquire types in use are list and input.
- A detailed capture is below:
- [View all products](/images/display1.png)
- [Choose product id and amount to purchase](/images/choose.png)
- [Order and exit the app](/images/order-exit.png)
- [Keep ordering](/images/keep-ordering.png)
  [Video]()
