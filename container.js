import { Char, allChars } from './chars.js';
import { Header, Footer, CharDisplay, Buttons, Result, Font } from './components.js';

let state = {
	currentChar: undefined,
	charsInPlay: allChars,
	result: Result.NONE,
	font: Font.SANS_SERIF
};
let updateContainer;

export const initialize = (updateHandler) => {
	updateContainer = updateHandler;
};

export const render = () => {
	const div = document.createElement('div');
	div.className = 'container';
	[Header(), CharDisplay(state.currentChar, state.font, changeFont), Buttons(state, skip, guess), Footer()]
		.forEach(it => div.appendChild(it));
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
const setNextFont = () => setFont(getNextElement(Object.values(Font), state.font));
const setFont = (font) => updateState(state => ({ ...state, font: font }));

const skip = () => {
	eraseResult();
	setNextChar();
};
const guess = (entry) => {
	const isAnswerCorrect = validateGuess(entry);
	setResult(resultFrom(isAnswerCorrect));
	if (isAnswerCorrect) {
		setNextChar();
	}
};
const changeFont = () => setNextFont();

const validateGuess = (guess) => guess === state.currentChar.latin;
const resultFrom = (bool) => bool ? Result.CORRECT : Result.WRONG;

const getNextChar = (charsInPlay, currentChar) => getNextElement(flattenArrayOfArrays(charsInPlay), currentChar);

const getNextElement = (elements, currentElement) => {
	const newElement = randomElement(elements.filter(element => element !== currentElement));
	return newElement ? newElement : currentElement;
};
const randomElement = (array) => array[getRandom(array.length)];
const getRandom = (max) => Math.floor(Math.random() * Math.floor(max));

const flattenArrayOfArrays = (array) => array.reduce((acc, el) => [...acc, ...el])
