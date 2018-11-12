export { Header, Footer, CharDisplay, Buttons, Result };

const Header = () => '<div class="header"><h1>Hiragana Practice</h1></div>';
const Footer = () => '<div class="footer"></div>';

const CharDisplay = (char) => {
	const hiraganaChar = char ? char.hiragana : '&nbsp;';
	return '<div class="display">' + '<div>' + hiraganaChar + '</div>' + '</div>';
};
const Buttons = (state) => {
	const obligatoryContents = ResultTile(state.result) + SkipButton();
	const contents = state.currentChar ? obligatoryContents + GuessButtons(state.charsInPlay) : obligatoryContents;
	return '<div class="buttons">' + contents + '</div>';
};

const SkipButton = () => '<button onclick="skip()">Generate</button>';

const GuessButtons = (charGroups) => '<div class="guessButtons">' + charGroups.map(charGroup => GuessButtonGroup(charGroup)).join('') + '</div>';
const GuessButtonGroup = (chars) => '<div class="guessButtonsGroup">' + chars.map(char => GuessButton(char)).join('') + '</div>';
const GuessButton = (char) => '<button type="button" onClick="guess(\'' + char.latin + '\')" class="guessButton">' + char.latin + '</button>';

const ResultTile = (result) => wrapWithDiv(resultMessage(result));
const resultMessage = (result) => {
	switch (result) {
		case Result.CORRECT: return 'Good job!';
		case Result.WRONG: return 'Wrong...';
		default: console.error('Could not prapare message for provided result type');
		case Result.NONE: return '&nbsp';
	};
};
const wrapWithDiv = (text) => '<div>' + text + '</div>';

const Result = Object.freeze({
    CORRECT:	Symbol("correct"),
    WRONG:		Symbol("wrong"),
    NONE:			Symbol("none")
});
