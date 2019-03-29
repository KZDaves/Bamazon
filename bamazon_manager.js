var inquire = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'bamazon_db'
});

function printTable(results){
	var table = new Table({
		head: Object.keys(results[0])
	});
	for(var i=0; i<results.length; i++){
		table.push(Object.values(results[i]));
	}
	console.log(table.toString());
}

connection.connect();

inquire
	.prompt([
	{
		type: "list", 
		message: "What would you like to do?",
		choices: ["* View Products for Sale", "* View Low Inventory", "* Add to Inventory", "* Add New Product"],
		name: "action"
	}
	]).then(function(response){
		switch(response.action){
			case "* View Products for Sale":
				connection.query('SELECT id, product_name, FORMAT(price, 2) AS price, stock_quantity FROM products', function(error, data, fields){
					if(error) throw error;
					printTable(data);
					connection.end();
				});
			break;

			case "* View Low Inventory":
				connection.query('SELECT id, product_name, stock_quantity FROM products WHERE stock_quantity<5', function(error,data, fields){
					if(error) throw error;
					if(data.length ==0){
						console.log("No items are low on inventory.");
					}else{
						printTable(data);
					}
					connection.end();
				});
			break;

			case "* Add to Inventory":
				connection.query('SELECT id, product_name, FORMAT(price,2) AS price, stock_quantity FROM products', function(error, data, fields){
					if(error) throw error;
					printTable(data);
					inquire
						.prompt([
						{
							type: "input",
							message: "For which item would you like to add supply (provide item id)?",
							name: "item_id"
						},
						{
							type: "input",
							message: "How many units are you adding to supply?",
							name: "add_qty"
						}
						]).then(function(response){
							connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?', [response.add_qty, response.item_id], function(error, data, fields){
								if(error) throw error;
								console.log(`Inventory for ID#${response.item_id} has been increased by ${response.add_qty} units.`);
							});
						connection.end();	
					});	
									
				});				
			break;

			case "* Add New Product":
				inquire
					.prompt([
					{
						type: "input",
						message: "What is the name of the product you would like to add?",
						name: "name"
					},
					{
						type: "input",
						message: "Which department will sell the item?",
						name: "department"
					},
					{
						type: "input",
						message: "What is the cost of the item?",
						name: "price"
					},
					{
						type: "input",
						message: "How many units of initial stock?",
						name: "stock"
					}
					]).then(function(response){
						connection.query('INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', [response.name, response.department, response.price, response.stock], function(error, data, fields){
								if(error) throw error;
								console.log("New item successfully added to database"); 
							});
						connection.end();
					});
			break;
		}
	});


