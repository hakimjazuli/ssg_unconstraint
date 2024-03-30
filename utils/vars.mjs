// @ts-check

import { class_extender } from './class_extender.mjs';

export class vars {
	static identifier = 'client';
	/** @private */
	static instruction_identifier = 'c-';
	/**
	 * @param {number} index
	 */
	static instruction = (index) => `${vars.instruction_identifier}${index}`;
	static delimiter = [';', ',', '^'];
	/**
	 * @private
	 * @param {Element} element
	 * @param {number} index
	 */
	static get_current_valid_index = (element, index) => {
		while (element.hasAttribute(`${vars.instruction_identifier}${index}`)) {
			index++;
		}
		return index;
	};
	/**
	 * @param {class_extender} classes_instance
	 * @param {string[]} arguments_
	 */
	static set_c_next = (classes_instance, ...arguments_) => {
		classes_instance.element.setAttribute(
			`${vars.instruction(
				vars.get_current_valid_index(classes_instance.element, classes_instance.index)
			)}`,
			arguments_.join(vars.delimiter[0])
		);
	};
}
