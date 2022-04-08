const video = document.getElementById("video");
const playerBtn = document.querySelector(".video__btn-start");
const playerSmallBtn = document.querySelector(".duration__start");
const durationControl = document.getElementById("durationLevel");
const soundControl = document.getElementById('micLvl');
const soundBtn = document.getElementById('mic');
const dynamBtn = document.getElementById('dynam');
let intervalId;


video.addEventListener("loadeddata", function () {
video.addEventListener('click',  playStop);

let playButtons = document.querySelectorAll(".start");

for (let i = 0; i < playButtons.length; i++) {
  playButtons[i].addEventListener('click', playStop);
};

durationControl.min = 0;
durationControl.value = 15;
durationControl.max = video.duration;
durationControl.addEventListener('input', setVideoDuration)

soundControl.min = 0;
soundControl.max = 10;
soundControl.value = soundControl.max;
soundControl.addEventListener('input', changeSoundVolume)

dynamic.addEventListener("click", soundOf);

video.addEventListener('ended', () => {
  playerSmallBtn.classList.toggle('video__btn-start--active');
  playerSmallBtn.classList.remove('duration__start--active');
  video.currentTime = 0;
})
});

function playStop() {
  playerBtn.classList.toggle("video__btn-start--active")
  playerSmallBtn.classList.toggle("duration__start--active")
  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 60)
  } else {
    clearInterval(intervalId);
    video.pause();
  }
}

function setVideoDuration() {
   video.currentTime = durationControl.value;
  updateDuration();
}

function updateDuration() {
  durationControl.value = video.currentTime;
  let step = video.duration / 100;
  let percent = video.currentTime / step;
  durationControl.style.background  = `linear-gradient(90deg, #E01F3D 0%,#E01F3D ${percent}%, #333333 ${percent}%)`
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
  if (video.volume === 0) {
    soundBtn.classList.add('sound--active');
    dynamBtn.classList.add('sound__btn--active');
  } else {
    soundBtn.classList.remove('sound--active');
    dynamBtn.classList.remove('sound__btn--active')
  }
}

function soundOf() {
  if (video.volume === 0) {
     video.volume = soundLevel;
     soundControl.value = soundLevel * 10;
     dynamBtn.classList.remove('sound__btn--active')
  } else{
  soundLevel = video.volume;
  video.volume = 0;
  soundControl.value = 0;
  dynamBtn.classList.add('sound__btn--active');
}
}