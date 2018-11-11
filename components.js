export { Header, Footer, CharDisplay, Buttons };

const Header = () => '<div class="header"><h1>Hiragana Practice</h1></div>';
const Footer = () => '<div class="footer"></div>';

const CharDisplay = (char) => {
	const hiraganaChar = char ? char.hiragana : '&nbsp;';
	return '<div id="charDisplay" class="display">' + '<div id="character">' + hiraganaChar + '</div>' + '</div>';
};
const Buttons = (state) => {
	const obligatoryContents = ResultTile(state.result) + SkipButton();
	const contents = state.currentChar ? obligatoryContents + GuessButtons(state.charsInPlay) : obligatoryContents;
	return '<div id="buttons" class="buttons">' + contents + '</div>';
};

const SkipButton = () => '<button id="generate" onclick="skip()">Generate</button>';

const GuessButtons = (charGroups) => '<div id="guessButtons" class="guessButtons">' + charGroups.map(charGroup => GuessButtonGroup(charGroup)).join('') + '</div>';
const GuessButtonGroup = (chars) => '<div class="guessButtonsGroup">' + chars.map(char => GuessButton(char)).join('') + '</div>';
const GuessButton = (char) => '<button type="button" onClick="guess(\'' + char.latin + '\')" class="guessButton">' + char.latin + '</button>';

const ResultTile = (result) => wrapWithDiv(resultMessage(result));
const resultMessage = (result) => typeof result === 'undefined' ? '&nbsp' : result ? 'Good job!' : 'Wrong...';
const wrapWithDiv = (text) => '<div>' + text + '</div>';
