const getRandom = (max) => Math.floor(Math.random() * Math.floor(max));
const randomElement = (array) => array[getRandom(array.length)];
const flattenArrayOfArrays = (array) => array.reduce((acc, el) => [...acc, ...el])

class Char {
	constructor(hiragana, latin) {
		this.hiragana = hiragana;
		this.latin = latin;
	}

	equals(other) {
		return this.hiragana.toUpperCase() === other.hiragana.toUpperCase() &&
		this.latin.toUpperCase() === other.latin.toUpperCase();
	}
}

const chars = [[
		new Char('あ', 'a'), new Char('い', 'i'), new Char('う', 'u'),
	 	new Char('え', 'e'), new Char('お', 'o')
	], [
		new Char('か', 'ka'), new Char('き', 'ki'), new Char('く', 'ku'),
		new Char('け', 'ke'), new Char('こ', 'ko')
]];
const charsInPlay = flattenArrayOfArrays(chars);

const generateNext = () => {
	currentChar = randomElement(charsInPlay);
	elementHandle.innerHTML = currentChar.hiragana;
	guessButtonsHandle.innerHTML = guessButtons(charsInPlay);
}
const guess = (entry) => {
	resultHandle.innerHTML = validateGuess(entry);
	generateNext();
}
const validateGuess = (guess) => guess === currentChar.latin ? "Good job!" : "Wrong...";

const elementHandle = document.getElementById("character");
const resultHandle = document.getElementById("result");
const guessButtonsHandle = document.getElementById("guessButtons");

var currentChar;

const buttons = (subcomponents) => '<div id="result"></div>' + subcomponents();
const generateButton = () => '<div id="generate" onclick="generateNext()">Generate</div>';
const guessButtons = (chars) => chars.map(char => guessButton(char)).join('');
const guessButton = (char) => '<div onClick="guess(\'' + char.latin + '\')">' + char.latin + '</div>';
