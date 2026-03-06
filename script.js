let time = 3600000; // 1 hour
let timer;

let tenMinCalled = false;
let oneMinCalled = false;

const showtimer = document.querySelector(".timer");

function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

function beep() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);

  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.3);
}

function startTimer() {
  clearInterval(timer);

  timer = setInterval(function () {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    document.getElementById("hours").innerText = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
      .toString()
      .padStart(2, "0");
    document.getElementById("milliseconds").innerText = milliseconds
      .toString()
      .padStart(2, "0");

    time -= 10;

    /* apply lowtime style for last 10 minutes */

    if (time <= 600000) {
      showtimer.classList.add("lowtime");
    } else {
      showtimer.classList.remove("lowtime");
    }

    /* 10 minute voice warning */

    if (time <= 600000 && time > 590000 && !tenMinCalled) {
      beep();
      speak("10 minutes left");
      tenMinCalled = true;
    }

    /* 1 minute voice warning */

    if (time <= 60000 && time > 50000 && !oneMinCalled) {
      beep();
      speak("1 minute left");
      oneMinCalled = true;
    }

    /* timer finished */

    if (time < 0) {
      clearInterval(timer);
      beep();
      speak("Time is over");
      alert("ITECA Competition Time Over!");
    }
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);

  time = 3600000;

  tenMinCalled = false;
  oneMinCalled = false;

  document.getElementById("hours").innerText = "01";
  document.getElementById("minutes").innerText = "00";
  document.getElementById("seconds").innerText = "00";
  document.getElementById("milliseconds").innerText = "00";

  showtimer.classList.remove("lowtime");
}
