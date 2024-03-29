// @ts-check
import { client_extender } from './client_extender.mjs';
import { observer } from './observer.mjs';
import { vars } from './vars.mjs';

export class dispatcher {
	/** @type {observer} */
	observer;
	/**
	 * Description
	 * @param {observer} observer
	 */
	constructor(observer) {
		this.observer = observer;
	}
	/**
	 * @private
	 * @param {Element} element
	 * @param {number} index
	 * @returns {false|string}
	 */
	get_instruction = (element, index) => {
		const attribute = vars.instruction(index);
		if (!element.hasAttribute(attribute)) {
			return false;
		}
		const attribute_ = element.getAttribute(attribute);
		element.removeAttribute(attribute);
		// @ts-ignore
		return attribute_;
	};
	classes = {};
	/**
	 * @param {Element} element
	 */
	dispatch = async (element) => {
		element.removeAttribute(vars.identifier);
		let index = 1;
		let instructions;
		while ((instructions = this.get_instruction(element, index))) {
			try {
				const [class_, method_, ...arguments_] = instructions.split(vars.delimiter[0]);
				/** @type {client_extender} */
				this.classes[class_] = this.observer[class_];
				// @ts-ignore
				const class_instruction = new this.classes[class_](element);
				await class_instruction[method_](...arguments_);
				index++;
			} catch (error) {
				console.error(error);
			}
		}
	};
}
