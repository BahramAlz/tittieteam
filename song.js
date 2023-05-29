//importing audio
"use strict";

const audioEl = new Audio("song.mp3");
const audioCtx = new AudioContext();
const sourceNode = audioCtx.createMediaElementSource(audioEl); //this is our source, moving it to the audio thread!
const gainNode = audioCtx.createGain();
sourceNode.connect(gainNode);
gainNode.connect(audioCtx.destination);
// ^^ connecting the gainnode, which makes it possible for us to manipulate the gain, ex:
gainNode.gain.value = 0.1; //setting the volume to 0.1 percent
// sourceNode.connect(audioCtx.destination); // connecting audio directly to spekaers, we need to start

export function playSong() {
  audioCtx.resume(); // the ctx isnt active by default, we need to resume it
  audioEl.play();
}
