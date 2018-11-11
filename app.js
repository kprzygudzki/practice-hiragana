export { initialize, render };
import { Char, allChars } from './chars.js';
import { Header, Footer, CharDisplay, Buttons } from './components.js';

let state = {
	currentChar: undefined,
	charsInPlay: allChars,
	result: undefined
};
let updateContainer;

const initialize = (registerCallback, updateHandler) => {
	registerCallback('skip', skip);
	registerCallback('guess', guess);
	updateContainer = updateHandler;
};

const render = () => Header() + CharDisplay(state.currentChar) + Buttons(state) + Footer();

const updateState = (stateUpdater) => {
	state = stateUpdater(state);
	updateContainer();
};

const setNextChar = () => setChar(getNextChar(state.charsInPlay, state.currentChar));
const setChar = (char) => updateState(state => ({ ...state, currentChar: char }));
const setResult = (result) => updateState(state => ({ ...state, result: result }));
const eraseResult = () => setResult(undefined);

const skip = () => {
	eraseResult();
	setNextChar();
};
const guess = (entry) => {
	const isAnswerCorrect = validateGuess(entry);
	setResult(isAnswerCorrect);
	if (isAnswerCorrect) {
		setNextChar();
	}
};
const validateGuess = (guess) => guess === state.currentChar.latin;

const getNextChar = (charsInPlay, currentChar) => {
	const element = randomElement(flattenArrayOfArrays(charsInPlay).filter(char => char !== currentChar));
	return element ? element : currentChar;
};

// const Header = () => '<div class="header"><h1>Hiragana Practice</h1></div>';
// const Footer = () => '<div class="footer"></div>';

// const CharDisplay = (char) => {
// 	const hiraganaChar = char ? char.hiragana : '&nbsp;';
// 	return '<div id="charDisplay" class="display">' + '<div id="character">' + hiraganaChar + '</div>' + '</div>';
// };
// const Buttons = (state) => {
// 	const obligatoryContents = ResultTile(state.result) + SkipButton();
// 	const contents = state.currentChar ? obligatoryContents + GuessButtons(state.charsInPlay) : obligatoryContents;
// 	return '<div id="buttons" class="buttons">' + contents + '</div>';
// };

// const SkipButton = () => '<button id="generate" onclick="skip()">Generate</button>';
// const GuessButtons = (charGroups) => '<div id="guessButtons" class="guessButtons">' + charGroups.map(charGroup => GuessButtonGroup(charGroup)).join('') + '</div>';
// const GuessButtonGroup = (chars) => '<div class="guessButtonsGroup">' + chars.map(char => GuessButton(char)).join('') + '</div>';
// const GuessButton = (char) => '<button type="button" onClick="guess(\'' + char.latin + '\')" class="guessButton">' + char.latin + '</button>';

// const ResultTile = (result) => wrapWithDiv(resultMessage(result));
// const resultMessage = (result) => typeof result === 'undefined' ? '&nbsp' : result ? 'Good job!' : 'Wrong...';
// const wrapWithDiv = (text) => '<div>' + text + '</div>';

const getRandom = (max) => Math.floor(Math.random() * Math.floor(max));
const randomElement = (array) => array[getRandom(array.length)];
const flattenArrayOfArrays = (array) => array.reduce((acc, el) => [...acc, ...el])
