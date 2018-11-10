import { Char, allChars } from './chars.js'

const getRandom = (max) => Math.floor(Math.random() * Math.floor(max));
const randomElement = (array) => array[getRandom(array.length)];
const flattenArrayOfArrays = (array) => array.reduce((acc, el) => [...acc, ...el])

const charsInPlay = [...allChars];
var currentChar;

const generateNext = () => {
	currentChar = randomElement(flattenArrayOfArrays(charsInPlay));
	elementHandle.innerHTML = currentChar.hiragana;
	guessButtonsHandle.innerHTML = guessButtons(charsInPlay);
}
const guess = (entry) => {
	const isAnswerCorrect = validateGuess(entry);
	resultHandle.innerHTML = guessResult(isAnswerCorrect);
	if (isAnswerCorrect) generateNext();
}
const validateGuess = (guess) => guess === currentChar.latin;
const guessResult = (bool) => bool ? "Good job!" : "Wrong...";

window.generateNext = generateNext;
window.guess = guess;

const elementHandle = document.getElementById("character");
const resultHandle = document.getElementById("result");
const guessButtonsHandle = document.getElementById("guessButtons");

const buttons = (subcomponents) => '<div id="result"></div>' + subcomponents();
const generateButton = () => '<div id="generate" onclick="generateNext()">Generate</div>';
const guessButtons = (charGroups) => charGroups.map(charGroup => guessButtonGroup(charGroup)).join('');
const guessButtonGroup = (chars) => '<div class="guessButtonsGroup">' + chars.map(char => guessButton(char)).join('') + '</div>';
const guessButton = (char) => '<div onClick="guess(\'' + char.latin + '\')" style="guessButton">' + char.latin + '</div>';
