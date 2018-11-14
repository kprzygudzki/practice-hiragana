export { updateContainer, registerCallback };
import { initialize, render } from './container.js';

const updateContainer = () => {
	const oldContainer = document.getElementById('container');
	document.body.replaceChild(render(), oldContainer);
};

const registerCallback = (name, callback) => {
	window[name] = callback;
};

initialize(registerCallback, updateContainer);
updateContainer();
