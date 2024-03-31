// @ts-check
import { class_extender } from '@html_first/ssg_unconstraint';

export class html extends class_extender {
	example = (message) => {
		this.event('click', () => {
			console.log(message);
		});
	};
}
