const slider = $('.slide').bxSlider({
  controls: false,
  pager: false
})

$('.swap--left').click(e =>{
  e.preventDefault();
  slider.goToPrevSlide();
 })

$('.swap--right').click(ev => {
  ev.preventDefault();
  slider.goToNextSlide();
})