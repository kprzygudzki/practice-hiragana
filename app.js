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
const charsInPlay = chars;

const generateNext = () => {
	currentChar = randomElement(flattenArrayOfArrays(chars));
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

const elementHandle = document.getElementById("character");
const resultHandle = document.getElementById("result");
const guessButtonsHandle = document.getElementById("guessButtons");

var currentChar;

const buttons = (subcomponents) => '<div id="result"></div>' + subcomponents();
const generateButton = () => '<div id="generate" onclick="generateNext()">Generate</div>';
const guessButtons = (charGroups) => chars.map(charGroup => guessButtonGroup(charGroup)).join('');
const guessButtonGroup = (chars) => '<div class="guessButtonsGroup">' + chars.map(char => guessButton(char)).join('') + '</div>';
const guessButton = (char) => '<div onClick="guess(\'' + char.latin + '\')" style="guessButton">' + char.latin + '</div>';
