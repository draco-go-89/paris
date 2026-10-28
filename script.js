const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");


const songs = [
    { name: "Every Breath You Take", artist: "The Police", src: "songs/thekids.mp3" },
    { name: "After Party", artist: "The Weeknd", src: "songs/afterparty.mp3" },
    { name: "Daisies", artist: "Justin Bieber", src: "songs/daises.mp3" },
    { name: "My Person", artist: "Spencer Crandall", src: "songs/myperson.mp3" },
    { name: "August", artist: "Taylor Swift", src: "songs/august.mp3" },
    { name: "Slut", artist: "Taylor Swift", src: "songs/slut.mp3" },
    { name: "I Thought I Saw Your Face Today", artist: "She & Him", src: "songs/sawurface.mp3" },
    { name: "Whats Up", artist: "4 Non Blondes", src: "songs/whatsup.mp3" },
    { name: "Jiyaa", artist: "Darshan Raval", src: "songs/jiyaa.mp3" },
    { name: "Love Me Not", artist: "Ravyn Lenae", src: "songs/lovemenot.mp3" },
    { name: "Brooklyn Baby", artist: "Lana Del Rey", src: "songs/brooklynbaby.mp3" },
    { name: "Paris", artist: "The Chainsmokers", src: "songs/paris.mp3" },
    { name: "Dil Diya Gallan", artist: "Atif Aslam", src: "songs/dildiya.mp3" },
    { name: "Made In Japan", artist: "Buck Owens", src: "songs/madeinjapan.mp3" },
    { name: "About You", artist: "The 1975", src: "songs/aboutyou.mp3" },
    { name: "Country Road Take Me Home", artist: "John Denver", src: "songs/takemehome.mp3" }

];

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
    title.textContent = songs[index].name;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
}

function playSong() {
    audio.play();
    playBtn.innerHTML = "||";
    isPlaying = true;
}

function pauseSong() {
    audio.pause();
    playBtn.innerHTML = "▶";
    isPlaying = false;
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;  // play previous even when the song is at the first index
    loadSong(songIndex);
    playSong();
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

loadSong(songIndex);

// SCRIPT FOR TIME UPDATE
const current = document.getElementById("current");
const duration = document.getElementById("duration");

audio.addEventListener("timeupdate", () => {
    const curMin = Math.floor(audio.currentTime / 60);
    const curSec = Math.floor(audio.currentTime % 60);

    current.textContent =
        `${curMin}:${String(curSec).padStart(2, "0")}`;
});

audio.addEventListener("loadedmetadata", () => {
    const durMin = Math.floor(audio.duration / 60);
    const durSec = Math.floor(audio.duration % 60);

    duration.textContent =
        `${durMin}:${String(durSec).padStart(2, "0")}`;
});