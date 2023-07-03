//importing audio
"use strict";

// sourceNode.connect(audioCtx.destination); // connecting audio directly to spekaers, we need to start
let audioCtx;
export function playSong() {
  const audioEl = new Audio("song.mp3");
  audioCtx = new AudioContext();
  const sourceNode = audioCtx.createMediaElementSource(audioEl); //this is our source, moving it to the audio thread!
  const gainNode = audioCtx.createGain();
  sourceNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  // ^^ connecting the gainnode, which makes it possible for us to manipulate the gain, ex:
  gainNode.gain.value = 0.1; //setting the volume to 0.1 percent

  // const volumeBar = document.getElementById("volumeBar");
  // volumeBar.addEventListener("input", function () {
  //   const volume = parseFloat(this.value);
  //   gainNode.gain.value = volume;
  // });

  audioCtx.resume(); // the ctx isnt active by default, we need to resume it
  audioEl.play();
}

export function stopSong() {
  audioCtx.close();
}
