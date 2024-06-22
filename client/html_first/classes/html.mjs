// @ts-check
import { _ClientExtender } from '@html_first/ssg_unconstraint';

export class html extends _ClientExtender {
	/**
	 * @param {string} message
	 */
	example = (message) => {
		this.event('click', () => {
			console.log(message);
		});
	};
	/**
	 * @param {string} class_name
	 * @param {string} method
	 * @param {string[]} arguments_
	 */
	compound = (class_name, method, ...arguments_) => {
		this.set_c_next('html', 'example', 'hi');
		this.set_c_next(class_name, method, ...arguments_);
	};
}
