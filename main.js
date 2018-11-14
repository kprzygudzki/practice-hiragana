export { updateContainer, registerCallback };
import { initialize, render } from './container.js';

const updateContainer = () => {
	const containerId = 'container';
	const oldContainer = document.getElementById(containerId);
	const newContainer = render();
	newContainer.id = containerId;
	document.body.replaceChild(render(), oldContainer);
};

const registerCallback = (name, callback) => {
	window[name] = callback;
};

initialize(registerCallback, updateContainer);
updateContainer();
