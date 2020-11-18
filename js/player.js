const audio = new Audio("./audio/epic_sax_guy.mp3");
audio.loop = true;
let isPlaying = false;

const playMusic = () => {
  const icon = document.getElementById("ic-music");
  const video = document.getElementById("bg-video");
  if (!isPlaying) {
    audio.play();
    video.load();
    video.play();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    console.log("play");
    isPlaying = true;
    sessionStorage.setItem("isPlaying", "true");
  } else {
    audio.pause();
    video.pause();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    console.log("pause");
    isPlaying = false;
    sessionStorage.setItem("isPlaying", "false");
  }
};
