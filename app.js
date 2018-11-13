import { Char, allChars } from './chars.js';
import { Header, Footer, CharDisplay, Buttons, Result } from './components.js';

let state = {
	currentChar: undefined,
	charsInPlay: allChars,
	result: Result.NONE
};
let updateContainer;

export const initialize = (callbackRegisterer, updateHandler) => {
	callbackRegisterer('skip', skip);
	callbackRegisterer('guess', guess);
	updateContainer = updateHandler;
};

export const render = () => {
	const div = document.createElement('div');
	div.id = 'container';
	div.className = 'container';
	[Header(), CharDisplay(state.currentChar), Buttons(state, skip, guess), Footer()]
		.forEach(it => div.appendChild(it));
	console.log(div);
	return div;
};

const updateState = (stateUpdater) => {
	state = stateUpdater(state);
	updateContainer();
};

const setNextChar = () => setChar(getNextChar(state.charsInPlay, state.currentChar));
const setChar = (char) => updateState(state => ({ ...state, currentChar: char }));
const setResult = (result) => updateState(state => ({ ...state, result: result }));
const eraseResult = () => setResult(Result.NONE);

const skip = () => {
	console.log('called skip');
	eraseResult();
	setNextChar();
};
const guess = (entry) => {
	console.log('called guess with parameter', entry);
	const isAnswerCorrect = validateGuess(entry);
	setResult(resultFrom(isAnswerCorrect));
	if (isAnswerCorrect) {
		setNextChar();
	}
};
const validateGuess = (guess) => guess === state.currentChar.latin;
const resultFrom = (bool) => bool ? Result.CORRECT : Result.WRONG;

const getNextChar = (charsInPlay, currentChar) => {
	const element = randomElement(flattenArrayOfArrays(charsInPlay).filter(char => char !== currentChar));
	return element ? element : currentChar;
};

const getRandom = (max) => Math.floor(Math.random() * Math.floor(max));
const randomElement = (array) => array[getRandom(array.length)];
const flattenArrayOfArrays = (array) => array.reduce((acc, el) => [...acc, ...el])
