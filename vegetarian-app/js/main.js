//Get a food item name, photo, and ingredients and place them in the DOM
// Nutella 009800895007

//Get value out of input when press the button. name function getDrink
document.querySelector('button').addEventListener('click', getFood)

//create the getDrink function

function getFood(){
    //get value out of input (text entered) and store it
    let inputVal = document.getElementById("barcode").value
    const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data) // get an object back with a  property products: which is an array of objs. grab any
        if (data.status === 1) { //if product is found. status is in the json
            //call additional stuff
            const item = new ProductInfo(data.product) //build a new object and call the constructor
          //item.testCall()
            item.showInfo()
            item.listIngredients()
        }else if (data.status === 0) {
            alert(`Product ${inputVal} not found. Please try another.`)
        }
        // document.querySelector('h2').innerText = data.product.product_name
        // document.querySelector('img').src = data.product.image_url
        // document.getElementById('ingredient-column').innerText = data .product.ingredients
        

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
    //console.log()

}

class ProductInfo {
    constructor(productData) { //Passin in data.product
        this.name = productData.product_name
        this.ingredients = productData.ingredients
        this.image = productData.image_url
    }

    // testCall(){
    //     console.log(this.ingredients)
    // }

    showInfo(){
        document.getElementById("product-image").src = this.image
        document.getElementById("product-name").innerText = this.name
    }
// Fill in the table rows
// USe a for in loop which is for objects, loop through all items, no matter how many there are. Dont need to specify how many
    listIngredients() {
        let tableRef = document.getElementById("ingredient-table")

        for(let key in this.ingredients){ // for each ingredient in the list of ingredients
            //Add a new row with 2 cells
            let newRow = tableRef.insertRow(-1) // -1 adds row below - to end of table
            let newICell = newRow.insertCell(0) // inserts a cell at index 0 of new row
            let newVCell = newRow.insertCell(1) // inserts a cell at index 1 of new row
            //Place text in new cells
            let newIText = document.createTextNode(
                //Get the name of the ingredient which is in ingredients: text: "name"
                this.ingredients[key].text  //[key] is basically like [i] in traditional loops
            )
            let vegStatus = this.ingredients[key].vegetarian
            let newVText = document.createTextNode(vegStatus)
            newICell.appendChild(newIText)
            newVCell.appendChild(newVText)

        }
    }
}