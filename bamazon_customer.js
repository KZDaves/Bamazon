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
	var temp = Object.keys(results[0]);
	temp.pop();
	var table = new Table({
	  	head: temp
	  });
	  for(var i=0; i<results.length; i++){
	  	temp = Object.values(results[i]);
	  	temp.pop();
	  	table.push(temp);
	  }
	  console.log(table.toString());
}

connection.connect();

connection.query('SELECT id, product_name, FORMAT(price, 2) AS price, stock_quantity FROM `products` WHERE stock_quantity >0', function (error, data, fields) {
  if (error) throw error;
  printTable(data);
  inquire
  	.prompt([
  	{
  		type: "input",
  		message: "Please enter the ID# of the item you would like to purchase: ",
  		name: "purchase_id"	
  	},
  	{
  		type: "input", 
  		message: "How many would you like to purchase? ",
  		name: "purchase_qty"
  	}
  	]).then(function(response){
  		if(data[response.purchase_id-1].stock_quantity>=response.purchase_qty){

        connection.query('UPDATE `products` SET stock_quantity = stock_quantity-?, product_sales= product_sales+(price*?) WHERE id = ?', [response.purchase_qty, response.purchase_qty, response.purchase_id], function(error, results, fields){
          if(error) throw error;
        }); 
  			console.log("Your total was: $" + data[response.purchase_id-1].price*response.purchase_qty);
  		}else{
  			console.log("Sorry, insufficient supply available to meet your order. Purchase unsuccessful.");
  		}	
      connection.end();
  	});
});



