import { Char, allChars } from './chars.js'

const getRandom = (max) => Math.floor(Math.random() * Math.floor(max));
const randomElement = (array) => array[getRandom(array.length)];
const flattenArrayOfArrays = (array) => array.reduce((acc, el) => [...acc, ...el])

const state = {
	currentChar: undefined,
	charsInPlay: allChars,
	result: undefined
};

const charsInPlay = [...allChars];
var currentChar;

const skip = () => {
	state.result = undefined;
	generateNext();
}
const guess = (entry) => {
	const isAnswerCorrect = validateGuess(entry);
	state.result = isAnswerCorrect;
	if (isAnswerCorrect) { generateNext(); }
	else { renderButtons(); }
}
const validateGuess = (guess) => guess === state.currentChar.latin;
const guessResult = (bool) => bool ? "Good job!" : "Wrong...";

const generateNext = () => {
	state.currentChar = getNextChar(state.charsInPlay, state.currentChar);
	setContent(elementHandle, state.currentChar.hiragana);
	renderButtons();
}
const getNextChar = (charsInPlay, currentChar) => {
	const element = randomElement(flattenArrayOfArrays(charsInPlay).filter(char => char !== currentChar));
	return element ? element : currentChar;
};

window.skip = skip;
window.guess = guess;

const elementHandle = document.getElementById("character");
const resultHandle = document.getElementById("result");
const guessButtonsHandle = document.getElementById("guessButtons");
const buttonsHandle = document.getElementById("buttons");

const renderButtons = () => {
	const output = resultTile(state.result) + skipButton() + guessButtons(state.charsInPlay);
	setContent(buttonsHandle, output);
};
const renderInitialButtons = () => {
	const output = emptyResultTile() + skipButton();
	setContent(buttonsHandle, output);
}

const skipButton = () => '<button id="generate" onclick="skip()">Generate</button>';
const guessButtons = (charGroups) => '<div id="guessButtons" class="guessButtons">' + charGroups.map(charGroup => guessButtonGroup(charGroup)).join('') + '</div>';
const guessButtonGroup = (chars) => '<div class="guessButtonsGroup">' + chars.map(char => guessButton(char)).join('') + '</div>';
const guessButton = (char) => '<button type="button" onClick="guess(\'' + char.latin + '\')" class="guessButton">' + char.latin + '</button>';

const resultTile = (bool) => bool === undefined ? emptyResultTile() : bool ? correctResultTile() : wrongResultTile();
const correctResultTile = () => wrapWithDiv('Good job!');
const wrongResultTile = () => wrapWithDiv('Wrong...');
const emptyResultTile = () => wrapWithDiv('&nbsp');

const wrapWithDiv = (text) => '<div>' + text + '</div>';

const setContent = (handle, value) => {
	handle.innerHTML = value;
};

const clearContent = (handle) => {
	handle.innerHTML = "&nbsp;";
};

renderInitialButtons();
