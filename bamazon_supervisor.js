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
		message: "Please make a selection:",
		choices: ["* View Product Sales by Department", "* Create New Department"],
		name: "action"
	}
		]).then(function(response){
			switch(response.action){
				case "* View Product Sales by Department":
					connection.query('SELECT d.id, d.department_name, d.overhead_costs, FORMAT(COALESCE(SUM(p.product_sales),0),2) AS product_sales, FORMAT(COALESCE(SUM(p.product_sales)-d.overhead_costs, 0), 2) AS total_profit FROM departments d LEFT JOIN products p ON p.department_name = d.department_name GROUP BY d.id, d.department_name, d.overhead_costs', function(error, results, fields){
							printTable(results);
						});
					connection.end();
				break;

				case "* Create New Department":
					inquire
						.prompt([
						{
							type:"input",
							message: "What is the name of the new department?",
							name: "name"
						},
						{
							type:"input", 
							message: "What is the overhead cost for the new department?",
							name: "overhead"
						}
							]).then(function(response){
								connection.query('INSERT INTO departments(department_name, overhead_costs) VALUES(?,?)', [response.name, response.overhead], function(error, data, fields){
									if(error) throw error;
									console.log("New department has been created successfully.");
								});
								connection.end();
							});
				break;
			}
		});