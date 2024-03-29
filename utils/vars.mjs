// @ts-check

export class vars {
	static identifier = 'client';
	/**
	 * @param {number} index
	 */
	static instruction = (index) => `c-${index}`;
	static delimiter = [';', ',', '^'];
}
