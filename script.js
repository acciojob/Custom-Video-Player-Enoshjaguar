const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// -------------------------
// Play / Pause
// -------------------------

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}


function updateButton() {
    if (video.paused) {
        toggle.textContent = '►';
    } else {
        toggle.textContent = '❚ ❚';
    }
}


toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);


// -------------------------
// Update Progress Bar
// -------------------------

function handleProgress() {

    const percent = (video.currentTime / video.duration) * 100;

    progressBar.style.flexBasis = `${percent}%`;
}


video.addEventListener('timeupdate', handleProgress);


// -------------------------
// Skip / Seek Buttons
// -------------------------

function skip() {

    const skipAmount = Number(this.dataset.skip);

    video.currentTime += skipAmount;
}


skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});


// -------------------------
// Volume and Playback Speed
// -------------------------

function handleRangeUpdate() {

    if (this.name === 'volume') {
        video.volume = this.value;
    }

    if (this.name === 'playbackRate') {
        video.playbackRate = this.value;
    }
}


ranges.forEach(range => {
    range.addEventListener('input', handleRangeUpdate);
});


// -------------------------
// Click Progress Bar to Seek
// -------------------------

function scrub(event) {

    const scrubTime =
        (event.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}


progress.addEventListener('click', scrub);


// -------------------------
// Video Error Handling
// -------------------------

video.addEventListener('error', function () {

    const errorMessage = document.createElement('p');

    errorMessage.textContent =
        'Unable to load the video. Please check that download.mp4 exists.';

    errorMessage.style.color = 'white';
    errorMessage.style.fontSize = '16px';
    errorMessage.style.padding = '10px';

    player.appendChild(errorMessage);
});