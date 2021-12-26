let filterStatus = "all"; // all or active or completed

function addItem(event) {
    event.preventDefault();
    let text = document.getElementById("todo-input");
    
    db.collection("todo-items").add({
        text:text.value,
        status:"active"
    })

    text.value = "";   
    
}

function getItems(){ 
    db.collection("todo-items").onSnapshot((snapshot) => {
        // console.log(snapshot);
        let items = [];
        snapshot.docs.forEach((doc) => {

            if(filterStatus === "all") {
                items.push({
                    id: doc.id,
                    ...doc.data()
                })
            }else if(filterStatus === "completed") {
                if(doc.data().status === "completed") {
                    items.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            }else if(filterStatus === "active") {
                if(doc.data().status === "active") {
                    items.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            }

            
        })
        generateItems(items);
        updateNoOfItems(items);
        createEventListners();
    })
}

function generateItems(items) {
    let itemsHTML = "";
    items.forEach(item => {
        itemsHTML += `
        
            <div class="todo-item">
                <div class="check">
                    <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked" : ""}">
                        <img src="./assets/icon-check.svg" alt="">
                    </div>
                </div>

                <div class="todo-text ${item.status == "completed" ? "checked-text" : ""}">
                    ${item.text}
                </div>
            </div>
        
        `
    });
    document.querySelector(".todo-items").innerHTML = itemsHTML;
}

function createEventListners() {
    allCheckMarks = document.querySelectorAll(".todo-item .check .check-mark");
    allCheckMarks.forEach(checkMark => {
        checkMark.addEventListener("click" , function() {
            markCompleted(checkMark.dataset.id);
        } )
    })

}

function markCompleted(id) {

    let itemFromDb = db.collection("todo-items").doc(id);

    itemFromDb.get().then(function(doc) {
        if(doc.exists) {
            let status = doc.data().status;
            if(status == "active") {
                itemFromDb.update({
                    status: "completed"
                })
            }else if(status == "completed") {
                itemFromDb.update({
                    status: "active"
                })
            }
        }
    })
}

function updateNoOfItems(items) {
    let x = document.querySelector(".items-left");
    x.innerHTML = items.length + " items left"
}

function clearCompletedItems() {
    
    allCheckMarks = document.querySelectorAll(".todo-item .check .check-mark");
    allCheckMarks.forEach(checkMark => {
        let itemsClasses = ""+ checkMark.classList;
        let isCompleted = ((itemsClasses).includes("checked"));
        if(isCompleted) {
            // console.log(checkMark.dataset.id)
            db.collection("todo-items").doc(checkMark.dataset.id).delete();
        }
    })
}

function filterActiveItems() {
    console.log("act")
    filterStatus = "active";
    getItems();
    // updating color clue on html
    document.getElementById("allFilter").classList.remove("active");
    document.getElementById("activeFilter").classList.add("active");
    document.getElementById("completedFilter").classList.remove("active");

}

function filterCompletedItems() {
    filterStatus = "completed";
    getItems();
    // updating color clue on html
    document.getElementById("allFilter").classList.remove("active");
    document.getElementById("activeFilter").classList.remove("active");
    document.getElementById("completedFilter").classList.add("active");
    
}

function showAllItems() {
    filterStatus = "all";
    getItems();
        // updating color clue on html
        document.getElementById("allFilter").classList.add("active");
        document.getElementById("activeFilter").classList.remove("active");
        document.getElementById("completedFilter").classList.remove("active");
    
}

getItems();