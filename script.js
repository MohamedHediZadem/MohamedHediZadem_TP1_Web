let start_button = document.querySelector('#start');
let restat_button = document.querySelector('#restart');
let difficulty_buttons = document.querySelectorAll('.btn-check');
let numberToGuess = null; // number to guess
let checked_index = null;  // index of the chosen difficulty
let guess = null; // the number you guessed
let tries_left = null; // how many tries i have more to guess before i lose
let difficulty = null; // difficulty level

// make sure only one difficulty level is selected at a time and checking one difficulty unchecks the other difficulty buttons
difficulty_buttons.forEach(btn => {
    btn.addEventListener('change', () => {
        difficulty_buttons.forEach(cb => {
            if(cb!== btn){
                cb.checked = false;
            }
            else cb.checked = true;
        });
        checked_index = Array.from(difficulty_buttons).indexOf(btn);
    })
});
// updates of the ui and the process that runs on each start event
start_button.addEventListener('click', () => {
    switch (checked_index) {
        case 0:
            difficulty = "Easy";
            numberToGuess = Math.floor(Math.random()*(10)+ 1 );
            tries_left = 3;
            range = 10;
            break;
        case 1:
            difficulty = "Medium";
            numberToGuess = Math.floor(Math.random()*(20)+ 1 );
            tries_left = 5;
            range = 20;
            break;
        case 2:
            difficulty = "Hard";
            numberToGuess = Math.floor(Math.random()*(30)+ 1 );
            tries_left = 7;
            range = 30;
            break;
        default:
            difficulty = "Easy";
            numberToGuess = Math.floor(Math.random()*(10)+ 1 );
            tries_left = 3;
            range = 10;
            break;
    }
    document.querySelector('#diff').textContent = difficulty;
    document.querySelector('#tries').textContent = tries_left;
    document.querySelector('#range').textContent = range;

    setTimeout(Play, 100);
});
// updates to the ui on each click on the restart button
restat_button.addEventListener('click', () => {
    numberToGuess = null;
    guess = null;
    tries_left = null;
    range = null;
    checked_index = null;
    difficulty = null;

    document.querySelector('#diff').textContent = 'N/A';
    document.querySelector('#tries').textContent = 'N/A';
    document.querySelector('#range').textContent = 'N/A';

    difficulty_buttons.forEach(btn => btn.checked = false);
});
// main play function
function Play() {
    if (tries_left > 0) {
        guess = parseInt(prompt(`Guss the number between 1 and ${range} (You still have ${tries_left} tries left):`));

        if (isNaN(guess)) {
            alert("Error: Invalid guess, please Enter a number.");
            Play();
            return;
        }

        tries_left--;
        document.querySelector('#tries').textContent = tries_left;

        if (guess > numberToGuess) {
            alert('Go Lower!');
            setTimeout(Play, 100);
        } else if (guess < numberToGuess) {
            alert('Go Higher!');
            setTimeout(Play, 100);
        } else {
            alert(`Congrats!! you found the number ${guess}! SUUUUUUUUUUIII!!`);
        }
    } else {
        alert(`Unlucky! The Unknown number was ${numberToGuess}.`);
    }
}
