let inputField = document.querySelector('.inputField');
let btnAdd = document.querySelector('.btnAdd');
let btnDlt = document.querySelector('.btnDlt');
let list = document.querySelector('.list');
let alertText = document.querySelector('.alertText');

btnDlt.addEventListener('click', () => {
    list.innerHTML = "";
    saveData()
})

btnAdd.addEventListener('click', () => {
    if (inputField.value == ""){
        alertText.classList.add("active")
    } else{
        let li = document.createElement('li');
        li.innerHTML = inputField.value;
        list.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        span.title = "delete";
    }
    inputField.value = "";
    saveData();
})

inputField.addEventListener('input', () => {
    if(inputField.value !== ""){
        alertText.classList.remove("active");
    }
})

list.addEventListener('click', (e) => {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
})

function saveData() {
    localStorage.setItem('data', list.innerHTML);
}

function showList() {
    list.innerHTML = localStorage.getItem('data');
}

showList()