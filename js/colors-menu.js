const list = document.getElementById("colorList");

const button = document.querySelectorAll(".colors__button");


function closeItems() {
  for (let i = 0; i < button.length; i++) {
    const buttons = button[i];
    const content = buttons.nextElementSibling;
    content.classList.remove('colors__content--active')
  }
}

list.addEventListener("click", function (event){
  event.preventDefault ();

  const target = event.target;
  if (target.classList.contains('colors__button')){
    const content = target.nextElementSibling;

    if (content.classList.contains('colors__content--active')){
      content.classList.remove('colors__content--active');
      target.classList.remove('colors__button--active');
    } else{
      closeItems();
      content.classList.add('colors__content--active');
      target.classList.add('colors__button--active');
     }
  }
})















