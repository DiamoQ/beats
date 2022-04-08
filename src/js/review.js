const reviewPhoto = document.querySelector("#review-photo");

const findReview = (reviewNumber) => {
  const activeReview = document.querySelector('.review__box.review__box--active');
  activeReview.classList.remove("review__box--active");
  let currentItem = document.querySelector(`.review__box[data-item="${reviewNumber}"]`);
  currentItem.classList.add("review__box--active");
}

reviewPhoto.addEventListener('click', function (ev) {
  ev.preventDefault ();
  const target= ev.target;

 if (target.classList.contains('review__photo-icons')) {
   const activeListItem = document.querySelector('.review__item--active');
   if (activeListItem) {
    activeListItem.classList.remove('review__item--active');
  }
   const button = target.parentElement;
   const reviewItem = button.parentElement;
   const id = button.getAttribute("data-item");
   reviewItem.classList.add("review__item--active");
   findReview(id);
 }
});