﻿// @ts-check
import { _ClientExtender, __AppSettings } from '@html_first/ssg_unconstraint';

export class bss extends _ClientExtender {
	/**
	 * @param {Array<string>} target_attribute_n_value
	 * - ...attribute_or_prop_name,attribute_or_prop_value,mode_attr_or_prop;
	 */
	select = async (...target_attribute_n_value) => {
		const option_child = this.element.querySelector('option');
		if (!option_child) {
			return;
		}
		for (let i = 0; i < target_attribute_n_value.length; i++) {
			const [attribute, value, mode_attr_or_prop = 'attr'] = this.split(
				target_attribute_n_value[i],
				__AppSettings.__._separator[1]
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
