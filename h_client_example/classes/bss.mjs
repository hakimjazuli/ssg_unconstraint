// @ts-check
import { class_extender, vars } from '../../index.mjs';

export class bss extends class_extender {
	/**
	 * Description
	 * @param {Array<string>} target_attribute_n_value
	 * - ...attribute_name,attribute_value,mode_attr_or_prop;
	 */
	select = async (...target_attribute_n_value) => {
		const option_child = this.element.querySelector('option');
		if (!option_child) {
			return;
		}
		for (let i = 0; i < target_attribute_n_value.length; i++) {
			const [attribute, value, mode_attr_or_prop = 'attr'] = this.split(
				target_attribute_n_value[i],
				vars.delimiter[1]
			);
			switch (mode_attr_or_prop) {
				case 'attr':
					option_child.setAttribute(attribute, value);
					break;
				case 'prop':
					option_child[attribute] = value;
					break;
			}
		}
	};
}
