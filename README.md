#Bamazon 

##Overview

Bamazon is a node application which allows users to access store product infomation from a MySQL database. There are 3 view options:

	+ customer view
	+ manager view
	+ supervisor view

A user specifies which view they would like to access in the format of: 'node bamazon_<view name>'

All three views require the following npm packages:
	+ inquirer
	+ mysql
	+ cli-table

Demonstration of each of the views is avaliable in video format at: https://drive.google.com/file/d/14LJonly1Bp6Rxhhq9-AQrZXaEyhHqX4E/view

###Customer View

Customer view automatically prints a table to the terminal of the id, product name, and price information for all items which are currently in stock (supply over 0 in the products table of the bamazon database). The customer is then prompted for the id number of the item they would like to purchase, along with the quantity they would like to purchase. 

If the quantity available for the item in question is greater than or equal time the number the customer would like to purchase, the quantity purchased is reduced from the database's supply count and the customer's total cost is displayed in the terminal. 

After a purchase, the product sales data for that item is also updated in the database (product sales is an aggregated value of total revenue generated from that item). 

If there is not enough supply available to complete the customer's purchase, an error message is displayed instead. 

###Manager View

Manager view displays a menu of options from which the user can select:
	+ view products for sale
	+ view low inventory
	+ add to inventory
	+ add new product

####View Products for sale

This option will display a table of all items available in the bamazon database (regardless of current inventory available). Information displayed includes product id, product name, price, and quantity in stock.  

####View low inventory

This option will display all products in the database that have fewer than 5 units on-hand. Information displayed includes product id, product name, and current inventory count. 

If there are no items with fewer than 5 units in stock, a response stating "No items are low on inventory" will be displayed instead. 

####Add to inventory

This option allows the manager to add more stock for a given product. The user is prompted for the product id number and how many additional units of stock should be added to inventory. The database is then updated based on those inputs and displays a success message to terminal. 

####Add new product

This option allows the manager to add an entirely new product to the bamazon database. The manger is prompted to provide the name of the product, department which will sell it, the price, and how many initial units of stock will be available. The product's id will be automatically generated. A new row is added to the database with the inputed information, and a success message is displayed in the terminal. 

###Supervisor View

Supervisor view displays a menu of two options:
	+ view product sales by department
	+ create new department

####View product sales by department

This option aggregates all of the product sales information and groups by department. Overhead costs for each department are also displayed, as well as total profits (sales - overhead costs). 

####Create new department

This option allows the supervisor to add an entirely new department to the 'departments' table of the bamazon database. The user is prompted for the department name and overhead costs, which are then used to create a new row for the table. 


