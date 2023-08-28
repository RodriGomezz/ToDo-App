const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const list = document.querySelector(".list");
const allCircles = document.querySelector(".allCircles");
const itemsLeft = document.querySelector(".items-left");

const active = document.querySelector(".active");
const all = document.querySelector(".all");
const completed = document.querySelector(".completed");
const clear = document.querySelector(".clear");

const emptyMessage = document.querySelector(".empty-message");

let text = "";
let itemsL = 0;

function saveData() {
  localStorage.setItem("list", list.innerHTML);
  localStorage.setItem("items", itemsL);
}

function showData() {
  list.innerHTML = localStorage.getItem("list");
  itemsL = Number(localStorage.getItem("items"));
  itemsLeft.innerHTML = itemsL;
}

showData();

// Create new elements to the list from input
btn.addEventListener("click", () => {
  if (input.value == "") alert("Input field must not be empty");
  else {
    text = input.value;
    document.querySelector(".empty").classList.add("hideText");
    const article = document.createRange().createContextualFragment(
      `<li class="listItem inputAnimation"> 
      <span class="circle"></span>
      <p class="text">${text}</p>
      <button class=" close material-symbols-outlined">delete</button>
      </li>
      `
    );
    list.append(article);
    input.value = "";
    itemsL += 1;
    itemsLeft.innerHTML = itemsL;
    all.click();
    saveData();
  }
});

if (document.querySelector(".inputAnimation") != undefined)
document.querySelectorAll(".inputAnimation").forEach((e)=> {
  e.classList.remove("inputAnimation");
})

if (document.querySelector(".circle") != undefined)
  document.querySelector(".empty").classList.add("hide");

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") btn.click();
});

// add a class when the item is selected for style the item
list.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    e.target.classList.toggle("completedSpan");
    e.target.nextElementSibling.classList.toggle("completedP");
  }
  if (e.target.tagName === "P") {
    e.target.classList.toggle("completedP");
    e.target.previousElementSibling.classList.toggle("completedSpan");
  }
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
    if (e.target.parentElement.children[0].classList[1] === undefined)
      itemsL -= 1;
  }
  if (
    e.target.classList[1] === "completedSpan" ||
    e.target.classList[1] === "completedP"
  )
    itemsL -= 1;
  if (
    (e.target.classList[0] === "circle" || e.target.classList[0] === "text") &&
    e.target.classList[1] === undefined
  )
    itemsL += 1;
  itemsLeft.innerHTML = itemsL;
  document.querySelector('.selected').click()
  saveData();
});

// select all the item in the list
allCircles.addEventListener("click", () => {
  if (allCircles.classList[1] == "completedAll") {
    allCircles.classList.remove("completedAll");
    itemsL = 0;
    document.querySelectorAll(".circle").forEach((e) => {
      e.classList.remove("completedSpan");
      itemsL += 1;
    });
    document.querySelectorAll(".text").forEach((e) => {
      e.classList.remove("completedP");
    });
    itemsLeft.innerHTML = itemsL;
  } else {
    allCircles.classList.add("completedAll");
    document.querySelectorAll(".circle").forEach((e) => {
      e.classList.add("completedSpan");
    });
    document.querySelectorAll(".text").forEach((e) => {
      e.classList.add("completedP");
    });
    itemsL = 0;
    itemsLeft.innerHTML = itemsL;
  }
  all.click();
  saveData();
});

// show all the items on screen and select only if the items are active or completed
all.addEventListener("click", (event) => {
  document.querySelector('.selected').classList.remove('selected')
  event.target.classList.add("selected")
  if (itemsL > 0 || document.querySelector(".completedSpan") != undefined)
    document.querySelector(".empty").classList.add("hideText");
  else {
    emptyMessage.innerHTML = "There are no tasks added.";
    document.querySelector(".empty").classList.remove("hideText")}
  document.querySelectorAll(".hide").forEach((e) => {
    e.classList.remove("hide");
  });
});


active.addEventListener("click", (event) => {
  document.querySelector('.selected').classList.remove('selected')
  event.target.classList.add("selected")
  document.querySelectorAll(".hide").forEach((e) => {
    e.classList.remove("hide");
  });
  document.querySelectorAll(".completedSpan").forEach((e) => {
    if (e.parentElement.classList != "newTask") {
      e.parentElement.classList.add("hide");
    }
  });
  if (itemsL == 0) {
    document.querySelector(".empty").classList.remove("hideText");
    emptyMessage.innerHTML = "There are no active tasks";
  } else document.querySelector(".empty").classList.add("hideText");
});


completed.addEventListener("click", (event) => {
  document.querySelector('.selected').classList.remove('selected')
  event.target.classList.add("selected")
  document.querySelectorAll(".hide").forEach((e) => {
    e.classList.remove("hide");
  });
  document.querySelectorAll(".circle").forEach((e) => {
    if (e.classList[1] != "completedSpan") {
      e.parentElement.classList.add("hide");
    }
  });
  if (document.querySelector(".completedSpan") == null) {
    document.querySelector(".empty").classList.remove("hideText");
    emptyMessage.innerHTML = "There are no completed tasks";
  } else document.querySelector(".empty").classList.add("hideText");
});

// delete all the selected items
clear.addEventListener("click", () => {
  document.querySelectorAll(".completedSpan").forEach((e) => {
     e.parentElement.remove();
  });
  document.querySelector('.selected').click()
  allCircles.classList.remove("completedAll")
  saveData();
});

all.click();
