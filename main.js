import { initialize, render } from './container.js';

const updateContainer = () => {
	const containerId = 'container';
	const oldContainer = document.getElementById(containerId);
	const newContainer = render();
	newContainer.id = containerId;
	document.body.replaceChild(newContainer, oldContainer);
};

initialize(updateContainer);
updateContainer();

let input = "";
const parse = (letters, letter) => {
	if (!isCharacter(letter)) {
		return letters;
	};
	const newLetters = letters.slice(-2) + letter;
};
const isCharacter = (key) =>
 (key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')

document.addEventListener('keydown', event => {
	input = parse(input, event.key);
	console.log(input);
});
