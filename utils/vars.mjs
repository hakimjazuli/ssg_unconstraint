// @ts-check

export class vars {
	static identifier = 'client';
	static instruction_identifier = 'c-';
	/**
	 * @param {number} index
	 */
	static instruction = (index) => `${vars.instruction_identifier}${index}`;
	static delimiter = [';', ',', '^'];
}
