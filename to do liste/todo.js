var state = [];

function setDefaultState() {
  var id = generateID(); 
  var baseState = {};
  baseState[id] = {
    status: "new",
    id: id,
    title: " "
  };
  syncState(baseState);
}

function generateID() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}

function pushToState(title, status, id) {
  var baseState = getState();
  baseState[id] = { id: id, title: title, status: status };
  syncState(baseState);
}

function setToDone(id) {
  var baseState = getState();
  if (baseState[id].status === 'new') {
    baseState[id].status = 'done'
  } else {
    baseState[id].status =  'new';
  }
  syncState(baseState);
}

function deleteTodo(id) {
  console.log(id)
  var baseState = getState();
  delete baseState[id]
  syncState(baseState)
}



function syncState(state) {
  localStorage.setItem("state", JSON.stringify(state));
}

function getState() {
  return JSON.parse(localStorage.getItem("state"));
}

function addItem(text, status, id, noUpdate) {
  var id = id ? id : generateID();
  var c = status === "done" ? "danger" : "";
  var close='<span class="close"><i class="fa fa-times"></i></span>';
  var checkBtn='<label><span class="checkbox-mask"></span><input type="checkbox" />'+text +'</label>';
  var itemContent='<div class="checkbox">'+close+ checkBtn+'</div>';
  var item ='<li data-id="' +id +'" class="animated flipInX '+c+'">'+itemContent+'</li>';
  if (text === "") {
    $(".err").removeClass("hidden").addClass("animated bounceIn");
  } else {
      $(".err").addClass("hidden");
      $(".todo-list").append(item);
      $(".no-items").addClass("hidden");
      $(".form-control").val("").attr("placeholder", "✍️ اضافة عنصر...");
      setTimeout(function() {
        $(".todo-list li").removeClass("animated flipInX");
      }, 500);
      if (!noUpdate) {
          pushToState(text, "new", id);
        }
  }  
}
//when document is ready execute this
$(function() {
  var  formControl = $(".form-control");
  // when the add button is clicked add the item 
  $(".add-btn").on("click", function() {
    var itemVal = $(".form-control").val();
    addItem(itemVal);
    formControl.focus();
  });

  //when u check done on a todo ([] btn )
  $(".todo-list").on("click", 'input[type="checkbox"]', function() {
    var li = $(this).parent().parent().parent(); //input[checkbox] parents: label->div->li
    li.toggleClass("danger");
    li.toggleClass("animated flipInX");
    //update the statue of the todo in the LocalStorage
    setToDone(li.data().id);
    //to bounce again when toggled
    setTimeout(function() {
      li.removeClass("animated flipInX");
    }, 600);
  });
  //when u click close on a todo (x btn )
  $(".todo-list").on("click", ".close", function() {
    var box = $(this).parent().parent();//span (.close) parents:div->li
    box.removeClass("animated flipInX").addClass("animated  bounceOutLeft");
    //if there is one element and u delate it 
    if ($(".todo-list li").length == 1) {
      //wait 5s then romeve the box and show the icon no items
      setTimeout(function() {
        box.remove();
        $(".no-items").removeClass("hidden");
      }, 500);
    } else {
      setTimeout(function() {
        box.remove();
      }, 500);
    }
    deleteTodo(box.data().id)
  });
  // u can also add an element by clicking the enter button
  $(".form-control").keypress(function(e) {
    if (e.which == 13) {
      var itemVal = $(".form-control").val();
      addItem(itemVal);
    }
  });
  //drag and drop elements to sort them
  $(".todo-list").sortable();
  //disable text selection while sorting elements
  $(".todo-list").disableSelection();
});
// day message generation
var todayContainer = document.querySelector(".today");
var d = new Date();
var weekday = new Array(7);
weekday[0] = "يوم الأحد 😴";
weekday[1] = "يوم الاثنين 💪😀";
weekday[2] = "يوم الثلاثاء 😜";
weekday[3] = "يوم الأربعاء 😌☕️";
weekday[4] = "يوم الخميس 🤗";
weekday[5] = "يوم الجمعة 🕌";
weekday[6] = "يوم السبت 😴";
var n = weekday[d.getDay()];
var randomWordArray = Array(
  "أوه ، إنه ",
  "عظيم ، إنه ",
  "يبدو أنه ",
  "رائع ، إنه ",
  "استمتع بيومك ، إنه ",
  "يوم رائع سعيد ، إنه ",
  "استمتع ب"
);
var randomWord =
  randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
todayContainer.innerHTML = randomWord + n;

$(document).ready(function() {
  var state = getState();
  // if state is not in local storage create it
  if (!state) {
    setDefaultState(); 
    state = getState();
  }
  //return a liste of ids from the state array of objects
  //then for each one 
  Object.keys(state).forEach(function(todoKey) {
    var todo = state[todoKey];
    console.log(todoKey);
    addItem(todo.title, todo.status, todo.id, true);
  });
}); 


// <link href="https://fonts.googleapis.com/css?family=Nunito:400,700" rel="stylesheet">
/*


check clicked
    
    */
