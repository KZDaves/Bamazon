CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255) NOT NULL,
	price FLOAT NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES
("Fancy Feast Seafood Variety Pack", "Pet Supplies", 24.99, 23),
("Black Pencil Skirt", "Women's Clothing", 34.99, 15),
("Stapler", "Office Supplies", 3.99, 20), 
("72in Samsung TV", "Electronics", 1299.95, 90), 
("3lb. Hand Weights", "Health and Fitness", 13.49, 400), 
("Scratching Post", "Pet Supplies", 31.80, 45), 
("Red Cocktail Dress", "Women's Clothing", 125.50, 200), 
("2019 Planner", "Office Supplies", 25.43, 120), 
("Treadmill", "Health and Fitness", 1623.91, 40), 
("Nintendo Switch", "Electronics", 297.99, 450);