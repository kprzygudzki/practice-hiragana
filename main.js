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
