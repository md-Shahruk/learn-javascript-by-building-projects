class CountdownTimer {
  constructor() {
    this.intervalTime = null;
    this.isClockRunning = false;
    this.remainingTime = 0;

    // get id from html
    this.display = document.getElementById("time-display");
    this.inputHours = document.getElementById("hours");
    this.inputMinutes = document.getElementById("minutes");
    this.inputSeconds = document.getElementById("seconds");
    this.startBtn = document.getElementById("startBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.completeMessage = document.getElementById("completeMessage");
    this.clockCircle = document.querySelector(".clock-circle");

    // make some event listener for important buttons

    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.resetBtn.addEventListener("click", () => this.reset());

    // input value
    [this.inputHours, this.inputMinutes, this.inputSeconds].forEach((input) => {
      input.addEventListener(("change", () => this.validInput(input)));
      input.addEventListener("input", () => this.validInput(input));
    });

    this.updateTimeDisplay();
  }

  // start function declear
  validInput(input) {
    const max = parseInt(input.max);
    const min = parseInt(input.min);
    let value = parseInt(input.value) || 0;

    if (value > max) input.value = max;
    if (value < min) input.value = min;

    this.updateTimeDisplay();
  }

  getTotalSeconds() {
    const h = parseInt(this.inputHours.value) || 0;
    const m = parseInt(this.inputMinutes.value) || 0;
    const s = parseInt(this.inputSeconds.value) || 0;

    return h * 3600 + m * 60 + s;
  }
  formatTime(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2, "0")}`;
  }
  // Update Time Display
  updateTimeDisplay() {
    const totalSeconds = this.isClockRunning
      ? this.remainingTime
      : this.getTotalSeconds();

    this.display.textContent = this.formatTime(totalSeconds);

    // progress bar
    if (!this.isClockRunning) {
      this.clockCircle.style.background =
        "conic-gradient(var(--primary) 0%, transparent 0%)";
    }
  }

  updateProgress() {
    const totalTime = this.getTotalSeconds();
    if (totalTime <= 0) return;

    const progress = ((totalTime - this.remainingTime) / totalTime) * 100;

    this.clockCircle.style.background = `conic-gradient(var(--secondary) ${progress}%, transparent ${progress}%`;
  }

  start() {
    if (this.isClockRunning) return;
    [this.inputHours, this.inputMinutes, this.inputSeconds].forEach((input) =>
      this.validInput(input)
    );

    if (this.remainingTime === 0) {
      this.remainingTime = this.getTotalSeconds();
      if (this.remainingTime <= 0) return;
    }
    this.updateProgress();
    // state update
    this.isClockRunning = true;
    this.startBtn.disabled = true;
    this.pauseBtn.disabled = false;
    this.resetBtn.disabled = false;
    this.completeMessage.style.display = "none";

    // also disable all input taken option
    [this.inputHours, this.inputMinutes, this.inputSeconds].forEach((input) => {
      input.disabled = true;
    });

    this.intervalTime = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.intervalTime);
        this.isClockRunning = false;
        this.completeMessage.style.display = "block";
        return;
      }
      this.updateTimeDisplay();
      this.updateProgress();
    }, 1000);
  }

  pause() {
    if (!this.isClockRunning) return;
    this.isClockRunning = false;
    clearInterval(this.intervalTime);
    this.pauseBtn.disabled = true;
    this.startBtn.disabled = false;
  }

  reset() {
    this.isClockRunning = false;
    clearInterval(this.intervalTime);
    this.remainingTime = 0;
    this.startBtn.disabled = false;
    this.resetBtn.disabled = true;
    this.pauseBtn.disabled = true;
    this.completeMessage.style = "none";

    [this.inputHours, this.inputMinutes, this.inputSeconds].forEach((input) => {
      input.disabled = false;
    });
    this.updateTimeDisplay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CountdownTimer();
});
