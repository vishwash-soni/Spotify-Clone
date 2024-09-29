// ######### for play section animation ##############333

let playCard = document.getElementsByClassName("music-card")[0];
let palyBtn = document.getElementsByClassName("play-button")[0];
playCard.addEventListener('mouseover', () => {
    palyBtn.setAttribute('style', 'opacity: 1.0; bottom: 15px;');
})
playCard.addEventListener('mouseout', () => {
    palyBtn.setAttribute('style', 'opacity:0; bottom: -10px;');
})

// ####################33 control ###################################


let playPauseBtn = document.getElementsByClassName('play-toggle-button')[0]
let playPauseText = document.querySelector('.play-toggle-button p')
let img = document.getElementById("play-pause-toggle");
let loopBtn = document.getElementsByClassName("repeat-button")[0];
let downloadBtn = document.getElementsByClassName("download-track-button")[0];
let shuffleBtn = document.getElementsByClassName("random-button")[0];
let rightLeftBtns = document.querySelectorAll(".skip-button, .skip-backward-button, .skip-forward-button");

// console.log(playPauseText);

// console.log("vishwash");

playPauseBtn.addEventListener('click', function () {
    if (img.src.includes("play")) {
        img.src = "resources/pause.svg";
        img.style.width = "20px";
        img.style.margin = "28px 0 0 1px";
        playPauseText.innerHTML = "Pause";
        this.style.background = "white";
    } else {
        img.style.width = "15px";
        img.style.margin = " 30px 0px 3px 3px";
        img.src = "resources/play.svg";
        playPauseText.innerHTML = "Play";
        this.style.background = "#1db954";
    }

});

loopBtn.addEventListener('click', function () {
    if (loopBtn.style.background === "white") {
        loopBtn.style.background = "#1db954";
    } else {
        loopBtn.style.background = "white";
    }
});

downloadBtn.addEventListener('click', function () {
    downloadBtn.style.background = "white";
    setTimeout(() => {
        downloadBtn.style.background = "#1db954";
    }, 800);
});

shuffleBtn.addEventListener('click', function () {
    shuffleBtn.style.background = "white";
    setTimeout(() => {
        shuffleBtn.style.background = "#1db954";
    }, 800);
});

rightLeftBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        // Change the background color of the clicked button
        this.style.backgroundColor = 'white';

        // Optionally, revert the color back after 1 second
        setTimeout(() => {
            this.style.backgroundColor = '#1db954';
        }, 300);
    });
});


//#################### change Songs ##############################\



let currentTrack = null; // Variable to store the current playing track
let isPlaying = false; // Track if a song is currently playing
let progressInterval; // Interval for updating the progress bar

let cardSongName = document.querySelector(".music-info h3");
let cardArtistName = document.querySelector(".music-info p");
let play_pause = document.querySelector("#play-pause-toggle");
let loop = document.querySelector("#loop");
let albumImage = document.querySelector(".music-card .image img");
// console.log(albumImage);

// Function to handle play/pause toggle


function playStop() {
    // const playPauseToggle = document.getElementById('play-pause-toggle');
    // const playButton = document.getElementById('play');
    const songTitle = document.getElementById('song-title');



    if (isPlaying) {
        currentTrack.pause();
        clearInterval(progressInterval);
        isPlaying = false;
    } else {
        if (!currentTrack) {
            currentTrack = document.getElementById('Cleanin-out-my-closet');


            cardSongName.innerHTML = currentTrack.parentElement.querySelector(".track-info h3").textContent;
            cardArtistName.innerHTML = currentTrack.parentElement.querySelector(".track-info p").textContent;
            // Example: default first song
            let flag = 1;
            loop.addEventListener("click", () => {
                if (flag) {
                    currentTrack.loop = true;
                    flag = 0;
                }
                else {
                    currentTrack.loop = false;
                }

            })

            currentTrack.play();
            songTitle.textContent = 'Cleanin out my closet';
        }

        let flag = 1;
        loop.addEventListener("click", () => {
            if (flag) {
                currentTrack.loop = true;
                flag = 0;
            }
            else {
                currentTrack.loop = false;
            }

        })
        currentTrack.play();
        isPlaying = true;
        progressInterval = setInterval(updateProgressBar, 1000);

        albumImage.src = currentTrack.parentElement.querySelector("img").src;





        // console.log(currentTrack.parentElement);



    }
}

// Function to update the progress bar as the song plays
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const startTime = document.getElementById('start-time');
    const endTime = document.getElementById('end-time');

    if (currentTrack) {
        const currentTime = currentTrack.currentTime;
        const duration = currentTrack.duration;

        progressBar.value = (currentTime / duration) * 100;
        startTime.textContent = formatTime(currentTime);
        endTime.textContent = formatTime(duration);
    }
}

// Format time to minutes:seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ':' + (secs < 10 ? '0' + secs : secs);
}

// Handle when the progress bar is manually changed
document.getElementById('progress-bar').addEventListener('input', function () {
    if (currentTrack) {
        const seekTime = (this.value / 100) * currentTrack.duration;
        currentTrack.currentTime = seekTime;
    }
});

// Function to stop the currently playing song and reset it
function stopSong() {
    if (currentTrack) {
        currentTrack.pause();
        currentTrack.currentTime = 0;
        clearInterval(progressInterval);
        isPlaying = false;
        document.getElementById('play-pause-toggle').src = 'resources/play.svg';
        document.getElementById('play').querySelector('p').textContent = 'Play';
    }
}

// Function to play a selected track
function playTrack(trackId, trackName) {
    stopSong(); // Stop and reset the current track if any
    currentTrack = document.getElementById(trackId);
    document.getElementById('song-title').textContent = trackName;

    playStop(); // Start the new track
}


// Add event listeners to track cards for selection
let currentTrackIndex = 0; // Variable to keep track of the current track index

const trackCards = document.querySelectorAll('.track-card');
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");

function playRandom() {
    // console.log(trackCards.length);
    let idx = Math.floor(Math.random() * (trackCards.length));
    // console.log(trackCards[7]);
    // console.log(idx);
    playTrackByIndex(idx);
    let loop = document.querySelector("#loop");
    loop.style.background = "#1db954"
}

// Function to play a track based on the index
function playTrackByIndex(index) {
    if (index < 0 || index >= trackCards.length) return; // Ensure index is valid
    currentTrackIndex = index; // Update current track index
    let trackId = trackCards[currentTrackIndex].querySelector('audio').id;
    let trackName = trackCards[currentTrackIndex].querySelector('.track-info h3').textContent;
    playTrack(trackId, trackName); // Play the selected track
    // Update the song info
    play_pause.src = "resources/pause.svg";
    play_pause.style.width = "20px";
    play_pause.style.margin = "28px 0 0 1px";
    play_pause.parentElement.querySelector("p").innerHTML = "Pause";
    play_pause.parentElement.style.background = "white";

    cardSongName.innerHTML = trackCards[currentTrackIndex].querySelector(".track-info h3").textContent;
    cardArtistName.innerHTML = trackCards[currentTrackIndex].querySelector(".track-info p").textContent;
}

// Add click event listeners for each track card
trackCards.forEach(function (trackCard, index) {
    trackCard.addEventListener('click', function () {
        let loop = document.querySelector("#loop");
        loop.style.background = "#1db954"
        playTrackByIndex(index); // Play the track corresponding to the clicked card
    });
});

// Add event listeners for previous and next buttons
previousButton.addEventListener("click", function () {
    playTrackByIndex(currentTrackIndex - 1); // Play the previous track
});

nextButton.addEventListener("click", function () {
    playTrackByIndex(currentTrackIndex + 1); // Play the next track
});



// Function to download the currently playing song
function downloadSong() {
    if (currentTrack) {
        const trackSource = currentTrack.querySelector('source').src;
        const a = document.createElement('a');
        a.href = trackSource;
        a.download = trackSource.split('/').pop(); // Extract the file name from the URL
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('No track is currently playing to download!');
    }
}

function shareIt() {
    window.open("https://wa.me/?text=" + window.location.href);
}


// ####################### search box ###############################


let keyWords = ["Cleanin out my closet",
    "Evil",
    "Habits",
    "Hailies Song",
    "Lucky You",
    "My Dads Gone Crazy",
    "Not Alike",
    "Favorite Bitch"
];


let mp = new Map([
    ["Cleanin out my closet", 0],
    ["Evil", 1],
    ["Habits", 2],
    ["Hailies Song", 3],
    ["Lucky You", 4],
    ["My Dads Gone Crazy", 5],
    ["Not Alike", 6],
    ["Favorite Bitch", 7]
]);

let resultBox = document.querySelector(".input .searchOutput");
let searchInput = document.getElementById("seachInput");

searchInput.onkeyup = function () {
    let result = [];
    let input = searchInput.value;
    if (input.length == 0) {
        resultBox.style.display = "none";
    }
    if (input.length) {
        resultBox.style.display = "block";
        result = keyWords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        })
        if (result.length) {
            resultBox.style.display = "block";
        }
        else {
            resultBox.style.display = "none";
        }
        // console.log(result);

    }
    display(result)
}

function display(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>" + list + "</li>"
    });
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
function selectInput(list) {
    searchInput.value = list.innerHTML
    playTrackByIndex(mp.get(list.innerHTML));
    resultBox.style.display = "none"
}
let inputSeachBar = document.querySelector(".input");
document.addEventListener('click', function (event) {
    if (!inputSeachBar.contains(event.target)) {
        resultBox.style.display = "none";
    }
})
inputSeachBar.addEventListener('click', function (event) {
    event.stopPropagation();
});


