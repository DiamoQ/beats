let teamList = document.getElementById("teamList");

const buttons = document.querySelectorAll(".team__name");


teamList.addEventListener("click", function (event){
 event.preventDefault();

 function closeItems() {
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const description = button.nextElementSibling;
    description.classList.remove('team__dropdown--active');
    button.classList.remove('team__name--active');
  }
}

 const target = event.target;
 if (target.classList.contains('team__name')){
  const description = target.nextElementSibling;

  if (description.classList.contains('team__dropdown--active')){
    closeItems()
  } else{
    closeItems();
    description.classList.add('team__dropdown--active');
    target.classList.add('team__name--active');
   }
  }
});



