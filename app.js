import { Char, allChars } from './chars.js'

const state = {
	currentChar: undefined,
	charsInPlay: allChars,
	result: undefined
};

const skip = () => {
	state.result = undefined;
	generateNext();
}
const guess = (entry) => {
	const isAnswerCorrect = validateGuess(entry);
	state.result = isAnswerCorrect;
	if (isAnswerCorrect) { generateNext(); }
	else { render(state); }
}
const validateGuess = (guess) => guess === state.currentChar.latin;

const generateNext = () => {
	state.currentChar = getNextChar(state.charsInPlay, state.currentChar);
	render(state);
}
const getNextChar = (charsInPlay, currentChar) => {
	const element = randomElement(flattenArrayOfArrays(charsInPlay).filter(char => char !== currentChar));
	return element ? element : currentChar;
};

const containerHandle = document.getElementById("container");

const render = (state) => {
	const output = containerRender(state);
	setContent(containerHandle, output);
}

const containerRender = (state) => {
	return headerRender() + charDisplayRender(state.currentChar) + buttonsRender() + footerRender()
};

const headerRender = () => '<div class="header"><h1>Hiragana Practice</h1></div>';
const charDisplayRender = (char) => {
	const hiraganaChar = char ? char.hiragana : '&nbsp;';
	return '<div id="charDisplay" class="display">' + '<div id="character">' + hiraganaChar + '</div>' + '</div>';
};
const buttonsRender = () => {
	const obligatoryContents = resultTile(state.result) + skipButton();
	const contents = state.currentChar === undefined ? obligatoryContents : obligatoryContents + guessButtons(state.charsInPlay);
	return '<div id="buttons" class="buttons">' + contents + '</div>';
};
const footerRender = () => '<div class="footer"></div>';

const skipButton = () => '<button id="generate" onclick="skip()">Generate</button>';
const guessButtons = (charGroups) => '<div id="guessButtons" class="guessButtons">' + charGroups.map(charGroup => guessButtonGroup(charGroup)).join('') + '</div>';
const guessButtonGroup = (chars) => '<div class="guessButtonsGroup">' + chars.map(char => guessButton(char)).join('') + '</div>';
const guessButton = (char) => '<button type="button" onClick="guess(\'' + char.latin + '\')" class="guessButton">' + char.latin + '</button>';

const resultTile = (result) => wrapWithDiv(resultMessage(result));
const resultMessage = (result) => result === undefined ? '&nbsp' : result ? 'Good job!' : 'Wrong...';
const wrapWithDiv = (text) => '<div>' + text + '</div>';

const setContent = (handle, value) => {
	handle.innerHTML = value;
};

const getRandom = (max) => Math.floor(Math.random() * Math.floor(max));
const randomElement = (array) => array[getRandom(array.length)];
const flattenArrayOfArrays = (array) => array.reduce((acc, el) => [...acc, ...el])

window.skip = skip;
window.guess = guess;

render(state);
