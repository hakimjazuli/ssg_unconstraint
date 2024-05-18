// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';
import { __Observer } from './__Observer.mjs';

export class Dispatcher {
	/**
	 * @private
	 * @param {Element} element
	 * @param {number} index
	 * @returns {false|string}
	 */
	static get_instruction = (element, index) => {
		const attribute = __AppSettings.__.instruction(index);
		if (!element.hasAttribute(attribute)) {
			return false;
		}
		const attribute_ = element.getAttribute(attribute);
		element.removeAttribute(attribute);
		// @ts-ignore
		return attribute_;
	};
	/**
	 * @param {Element} element
	 */
	static dispatch = async (element) => {
		element.removeAttribute(__AppSettings.__._client_identifier);
		let index = 1;
		let instructions;
		while ((instructions = Dispatcher.get_instruction(element, index))) {
			try {
				if (!element.parentNode) {
					continue;
				}
				const [class_, method_, ...arguments_] = instructions.split(
					__AppSettings.__._separator[0]
				);
				/** @type {typeof import("./_CientExtender.mjs")._ClientExtender}*/
				const class_name = __Observer[class_];
				const class_instruction = new class_name(element, index);
				await class_instruction[method_](...arguments_);
				index++;
			} catch (reason) {
				console.error({
					message: `instruction: ${instructions} for ${element.outerHTML}, skiped`,
					reason,
				});
			}
		}
	};
}
