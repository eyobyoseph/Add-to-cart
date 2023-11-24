import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" 
import { getDatabase,ref, push, onValue, remove }  from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://realtime-database-db74d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppinglist");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppinglistEl = document.getElementById("ul-el");

addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value 
  push(shoppingListInDB, inputValue)
  // appendShoppingListEl(inputValue);
  clearInputFieldEl();
});

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
      let itemsArray = Object.entries(snapshot.val());
    
    clearShoppingistEl();
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
    
      let currentItemID = currentItem[0];
    
      let currentItemValue = currentItem[1];
      appendShoppingListEl(currentItem);
    }
  
  } else {
    shoppinglistEl.innerHTML = "No items here... yet"
  }
})

function appendShoppingListEl(item) {
  
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function() {
    let exactLocationOfItemInDB = ref(database, `shoppinglist/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  shoppinglistEl.append(newEl);
}


function clearInputFieldEl(){
  inputFieldEl.value = "";
}

function clearShoppingistEl() {
  shoppinglistEl.innerHTML = "";
}


























