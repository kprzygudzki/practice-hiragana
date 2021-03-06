export { Header, Footer, CharDisplay, Buttons, Result, Font };

const Header = () => {
	const div = document.createElement('div');
	div.className = 'header';
	const h1 = document.createElement('h1');
	h1.appendChild(document.createTextNode('Hiragana Practice'));
	div.appendChild(h1);
	return div;
};
const Footer = () => {
	const div = document.createElement('div');
	div.className = 'footer';
	return div;
};

const CharDisplay = (char, font, clickHandler) => {
	const hiraganaChar = char ? char.hiragana : nonBreakingSpace;
	const div = document.createElement('div');
	div.className = 'display';
	div.style['font-family'] = font;
	div.appendChild(document.createTextNode(hiraganaChar));
	div.onclick = clickHandler;
	return div;
};
const Buttons = (state, skipHandler, guessHandler) => {
	const div = document.createElement('div');
	div.className = 'buttons';
	div.appendChild(ResultTile(state.result));
	div.appendChild(SkipButton(skipHandler));
	if (state.currentChar) {
		div.appendChild(GuessButtons(state.charsInPlay, guessHandler));
	}
	return div;
};

const SkipButton = (skipHandler) => {
	const button = document.createElement('button');
	button.onclick = skipHandler;
	button.appendChild(document.createTextNode('Generate'));
	return button;
}

const GuessButtons = (charGroups, guessHandler) => {
	const div = document.createElement('div');
	div.className = 'guessButtons';
	charGroups
		.map(charGroup => GuessButtonGroup(charGroup, guessHandler))
		.forEach(charGroup => div.appendChild(charGroup));
	return div;
};

const GuessButtonGroup = (chars, guessHandler) => {
	const div = document.createElement('div');
	div.className = 'guessButtonsGroup';
	chars
		.map(char => GuessButton(char, guessHandler))
		.forEach(char => div.appendChild(char));
	return div;
};

const GuessButton = (char, guessHandler) => {
	const button = document.createElement('button');
	button.className = 'guessButton';
	button.onclick = () => guessHandler(char.latin);
	button.appendChild(document.createTextNode(char.latin));
	return button;
};

const ResultTile = (result) => {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(resultMessage(result)));
	return div;
};
const resultMessage = (result) => {
	switch (result) {
		case Result.CORRECT: return 'Good job!';
		case Result.WRONG: return 'Wrong...';
		default: console.error('Could not prapare message for provided result type');
		case Result.NONE: return nonBreakingSpace;
	};
};
const wrapWithDiv = (text) => {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(text));
	return div;
};

const Result = Object.freeze({
	CORRECT: Symbol("correct"),
	WRONG: Symbol("wrong"),
	NONE: Symbol("none")
});

const Font = Object.freeze({
	SERIF: 'serif',
	SANS_SERIF: 'sans-serif'
});

const nonBreakingSpace = '\u00A0';
