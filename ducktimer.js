// Select the HTML elements for manipulation
const timerDisplay = document.getElementById('time-display'); // Timer display element
const pomodoroButton = document.getElementById('pomodoro');   // Pomodoro mode button
const shortBreakButton = document.getElementById('short-break'); // Short break mode button
const longBreakButton = document.getElementById('long-break');   // Long break mode button
const startButton = document.getElementById('start');         // Start button
const pauseButton = document.getElementById('pause');         // Pause button
const resetButton = document.getElementById('reset');         // Reset button
const taskList = document.getElementById('task-list');        // Task list container
const addTaskButton = document.getElementById('add-task');    // Add task button
const newTaskInput = document.getElementById('new-task');     // Input field for new tasks

// Variables for managing the timer
let timer;           // Variable to store the timer interval
let timeLeft = 0;    // Time remaining in seconds
let isRunning = false; // Flag to track if the timer is running

// Time durations for different modes in seconds
const POMODORO_TIME = 25 * 60;  // 25 minutes
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes
const LONG_BREAK_TIME = 15 * 60; // 15 minutes

/*Updates the timer display in MM:SS format.*/
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60); // Calculate remaining minutes
  const seconds = timeLeft % 60;            // Calculate remaining seconds
  // Update the display with padded zeroes (e.g., 05:00)
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/* Starts the timer countdown.*/
function startTimer() {
  if (!isRunning && timeLeft > 0) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--; // Decrease the time left by one second
      updateTimerDisplay(); // Update the timer display
      if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer when it reaches 0
        isRunning = false;    // Set running flag to false
        alert('Time is up!'); // Notify the user
      }
    }, 1000); // Interval of 1 second
  }
}

/*Pauses the timer countdown.*/
function pauseTimer() {
  clearInterval(timer); // Stop the timer interval
  isRunning = false;    // Set running flag to false
}

/* Resets the timer to its default state.*/
function resetTimer() {
  clearInterval(timer); // Stop the timer interval
  isRunning = false;    // Set running flag to false
  timeLeft = 0;         // Reset the time left
  updateTimerDisplay(); // Clear the display
}

/* Sets the timer to a specific duration (e.g., Pomodoro, Short Break).
  @param {number} duration - Duration in seconds.
 */
function setTimer(duration) {
  clearInterval(timer); // Stop any running timer
  isRunning = false;    // Reset running flag
  timeLeft = duration;  // Set the new time duration
  updateTimerDisplay(); // Update the display immediately
}

// Add event listeners to mode buttons
pomodoroButton.addEventListener('click', () => setTimer(POMODORO_TIME)); // Set timer for Pomodoro
shortBreakButton.addEventListener('click', () => setTimer(SHORT_BREAK_TIME)); // Set timer for Short Break
longBreakButton.addEventListener('click', () => setTimer(LONG_BREAK_TIME)); // Set timer for Long Break

// Add event listeners to control buttons
startButton.addEventListener('click', startTimer); // Start the timer
pauseButton.addEventListener('click', pauseTimer); // Pause the timer
resetButton.addEventListener('click', resetTimer); // Reset the timer

//Adds a new task to the task list.
function addTask() {
  const taskText = newTaskInput.value.trim(); // Get the input value and remove whitespace
  if (taskText) {
    const taskItem = document.createElement('div'); // Create a new task container
    taskItem.classList.add('task-item');            // Add a class for styling

    // Create a checkbox for the task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Create a label for the task
    const label = document.createElement('label');
    label.textContent = taskText;

    // Append the checkbox and label to the task container
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);

    // Add the new task to the task list
    taskList.appendChild(taskItem);

    // Clear the input field
    newTaskInput.value = '';
  } else {
    alert('Please enter a task name!'); // Notify the user if the input is empty
  }
}

// Add an event listener to the "Add Task" button
addTaskButton.addEventListener('click', addTask);
