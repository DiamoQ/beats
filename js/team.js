const nameButton = document.querySelectorAll('.team__name');

for (let index = 0; index < nameButton.length; index++) {
  const button = nameButton[index];

  button.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    console.log('target', target);
    const description = target.nextElementsSibling;
    console.log('description', description)

    description.classList
  })
} 