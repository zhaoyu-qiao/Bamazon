let inquirer = require("inquirer");
let mysql = require("mysql");
let divider = "-------------------";
let connection = mysql.createConnection({
    host: "localhost",
    // Port Number
    port: 3306,
    // Username
    user: "root",
    // Password - this should be saved in .env file
    password: "putyourpasswordhere",
    // DB name
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //afterConnection();
    display();
});

//function afterConnection() {

// display information of all 10 products


// prompt ask two questions:
// the ID of the product,
// the amount to buy.


// After the user put in the answer, check if the amount <= inventory
// If no, display message "Insufficient quantity!" => And don't make any change on the DB.

// If yes, update quantity to minus the amount 
// Once update is finished, show the user the cost.
//cost();
//}

// display -ids, names, and prices of products
function display() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //console.log(results);
        for (i = 0; i < results.length; i++) {
            console.log(
                divider,
                "\nID: ", results[i].item_id,
                "\nProduct Name: ", results[i].product_name,
                "\nPrice: $", results[i].price,
                "\n", divider
            )
        }

        purchase();
    })
}

// Purchase function - prompt ask two questions:
// the ID of the product,
// the amount to buy.
// ???? Do I still need connection query?  -Yes
function purchase() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //console.log(results);
        inquirer.prompt(
            [{
                name: "choice",
                type: "list",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item_id);
                    }
                    //console.log(choiceArray);
                    return choiceArray;
                },
                message: "Which product would you like to purchase?"
            }, {
                name: "amount",
                type: "input",
                message: "How many would you like to purchase?"
            }]
        ).then(function (answers) {
            // Check which product the user has chosen    
            // console.log(results[i]); // results[i] seem to be undefined.
            let chosenItem;
            for (let i = 0; i < results.length; i++) {
                if (results[i].item_id === parseInt(answers.choice)) {
                    chosenItem = results[i];
                    console.log(chosenItem);
                }
            }
            //Check if the inventory is lower than the amount
            if (chosenItem.stock_quantity < parseInt(answers.amount)) {
                // OR PUT ANOTHER INQUIRE HERE
                console.log("Sorry, we don't have enough items in stock, do you want to change the amount to " + chosenItem.stock_quantity + " instead?")
            } else {
                let amountLeft = (chosenItem.stock_quantity - answers.amount);
                console.log(amountLeft);
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: amountLeft
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    //"UPDATE products SET stock_quantity = ? WHERE item_id ="
                    function (error) {
                        if (error) throw err;
                        //console.log(error);
                        console.log("Total cost:", chosenItem.price * answers.amount)

                        console.log("Order placed successfully!");
                        // !!!console.log the amount cost here!!!
                        // console.log('display:', display)
                        // console.log('display func', display())
                        setTimeout(display, 3000);
                        // display();
                        //display();
                        // add exit function to end the connection.
                        // function exit(
                        //     connection.end
                        // )

                    }
                );

            }
        })
        // }).catch(err => {
        //     console.log(err)
        //     return false
        // })
    })

}