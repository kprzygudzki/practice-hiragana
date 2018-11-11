export { updateContainer, registerCallback };
import { initialize, render } from './app.js';

const updateContainer = () => {
	document.getElementById("container").innerHTML = render();
};

const registerCallback = (name, callback) => {
	window[name] = callback;
};

initialize(registerCallback, updateContainer);
updateContainer();
