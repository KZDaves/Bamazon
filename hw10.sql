CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255) NOT NULL,
	price DECIMAL(50, 2) NOT NULL,
	stock_quantity INT NOT NULL,
	product_sales DECIMAL(50,2),
	PRIMARY KEY(id)
);

CREATE TABLE departments(
	id INT AUTO_INCREMENT,
	department_name VARCHAR(255) NOT NULL,
	overhead_costs DECIMAL(50,2) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES
("Fancy Feast Seafood Variety Pack", "Pet Supplies", 24.99, 23, 0),
("Black Pencil Skirt", "Women's Clothing", 34.99, 15, 0),
("Stapler", "Office Supplies", 3.99, 20, 0), 
("72in Samsung TV", "Electronics", 1299.95, 90, 0), 
("3lb. Hand Weights", "Health and Fitness", 13.49, 400, 0), 
("Scratching Post", "Pet Supplies", 31.80, 45, 0), 
("Red Cocktail Dress", "Women's Clothing", 125.50, 200, 0), 
("2019 Planner", "Office Supplies", 25.43, 120, 0), 
("Treadmill", "Health and Fitness", 1623.91, 40, 0), 
("Nintendo Switch", "Electronics", 297.99, 450, 0);

INSERT INTO departments(department_name, overhead_costs) VALUES
("Pet Supplies", 4000),
("Women's Clothing", 3200), 
("Office Supplies", 1200), 
("Electronics", 4399), 
("Health and Fitness", 1541);











