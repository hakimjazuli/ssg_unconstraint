// @ts-check
import { class_extender } from '@html_first/ssg_unconstraint';

export class html extends class_extender {
	example = (message) => {
		this.event('click', () => {
			console.log(message);
		});
	};
	compound = (class_name, method, ...arguments_) => {
		this.set_c_next('html', 'example', 'hi');
		this.set_c_next(class_name, method, ...arguments_);
	};
}
