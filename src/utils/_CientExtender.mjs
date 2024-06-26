// @ts-check

import { __AppSettings as __AppSettings } from '../vars/__AppSettings.mjs';

export class _ClientExtender {
	/** @type {Element} */
	element;
	/** @type {number} */
	index;
	/**
	 * @param {Element} element
	 * @param {number} index
	 */
	constructor(element, index) {
		this.element = element;
		this.index = index;
	}
	/**
	 * @protected
	 * @param {string} element_string
	 * @param {false|string} [only_inner]
	 */
	replace_with = (element_string, only_inner = false) => {
		if (only_inner) {
			this.element.innerHTML = element_string;
			return;
		}
		this.start_with(element_string, only_inner);
		this.element.remove();
	};
	/**
	 * @protected
	 * @param {string} argument_open
	 * @param {string} argument_close
	 * @param {false|string} [use_inner]
	 * - false default: use outerHTML of the element to be looped
	 * - true;
	 */
	surround_with = (argument_open, argument_close, use_inner = false, use_first_child = false) => {
		/** @param {string} string */
		const assign_new_string = (string) => `${argument_open}${string}${argument_close}`;
		if (use_inner) {
			let string = this.element.innerHTML;
			try {
				if (use_first_child) {
					// @ts-ignore
					string = this.element.firstChild.outerHTML;
				}
			} catch (error) {
				// @ts-ignore
				string = this.element.firstChild;
			}
			this.element.innerHTML = assign_new_string(string);
			return;
		}
		this.element.outerHTML = assign_new_string(this.element.outerHTML);
	};
	/**
	 * @protected
	 * @param {string} open_arguments
	 * @param {false|string} [use_inner]
	 * - false default: use outerHTML of the element to be looped
	 * - true;
	 */
	start_with = (open_arguments, use_inner = false) => {
		const text_before = document.createTextNode(open_arguments);
		if (use_inner) {
			const parent_node = this.element;
			const elem = this.element.childNodes[0];
			parent_node.insertBefore(text_before, elem);
			return;
		}
		const parent_node = this.element.parentNode;
		if (!parent_node) {
			return;
		}
		parent_node.insertBefore(text_before, this.element);
	};
	/**
	 * @protected
	 * @param {string} close_argument
	 * @param {false|string} [use_inner]
	 * - false default: use outerHTML of the element to be looped
	 * - true;
	 */
	end_with = (close_argument, use_inner = false) => {
		const text_after = document.createTextNode(close_argument);
		if (use_inner) {
			const parent_node = this.element;
			const elem = this.element.childNodes[0];
			parent_node.insertBefore(text_after, elem.nextSibling);
			return;
		}
		const parent_node = this.element.parentNode;
		if (!parent_node) {
			return;
		}
		parent_node.insertBefore(text_after, this.element.nextSibling);
	};
	/**
	 * @protected
	 * @param {string} new_tag
	 */
	tag = async (new_tag) => {
		const build_element_attribute = this.element.attributes;
		const new_element = document.createElement(new_tag);
		for (var i = 0; i < build_element_attribute.length; i++) {
			const attribute = build_element_attribute[i];
			new_element.setAttribute(attribute.name, attribute.value);
		}
		new_element.innerHTML = this.element.innerHTML;
		const parent_node = this.element.parentNode;
		if (parent_node) {
			parent_node.replaceChild(new_element, this.element);
		}
	};
	/**
	 * @protected
	 * @param {string} trigger
	 * @param {()=>(any|Promise<any>)} callback__
	 */
	event = (trigger, callback__) => {
		const observer = new MutationObserver(
			/**
			 * @param {MutationRecord[]} mutations_list
			 * @param {MutationObserver} observer
			 */
			(mutations_list, observer) => {
				mutations_list.forEach((mutation) => {
					if (!this.element.parentNode) {
						this.element.removeEventListener(trigger, callback__);
						observer.disconnect();
					}
				});
			}
		);
		observer.observe(this.element, { childList: true, subtree: true });
		this.element.addEventListener(trigger, callback__);
	};
	/**
	 * @protected
	 * @param {string} string
	 * @param {string} delimiter
	 */
	split = (string, delimiter) => {
		return string
			.split(new RegExp(`(?<!\\\\)${delimiter}`))
			.map((part) => part.replace(/\\/, ''));
	};
	/**
	 * @private
	 * @param {number} index
	 */
	get_current_valid_index = (index) => {
		index++;
		while (this.element.hasAttribute(`${__AppSettings.__._instruction_identifier}${index}`)) {
			index++;
		}
		return index;
	};
	/**
	 * @protected
	 * @param {string[]} arguments_
	 */
	set_c_next = (...arguments_) => {
		this.element.setAttribute(
			`${__AppSettings.__.instruction(this.get_current_valid_index(this.index))}`,
			arguments_.join(__AppSettings.__._separator[0])
		);
	};
	static helper = {
		/**
		 * @param {number} index
		 * @param {Element} element
		 * @param {...string} arguments_
		 */
		set_c: (index, element, ...arguments_) => {
			element.setAttribute(
				`${__AppSettings.__.instruction(index)}`,
				arguments_.join(__AppSettings.__._separator[0])
			);
		},
		/**
		 * @param {Element} element
		 */
		initiate_c: (element) => {
			element.setAttribute(__AppSettings.__._instruction_identifier, '');
		},
		/**
		 * @param {number} index
		 * @param {Element} element
		 * @param {...string} arguments_
		 */
		set_c_then_init: (index, element, ...arguments_) => {
			_ClientExtender.helper.set_c(index, element, ...arguments_);
			_ClientExtender.helper.initiate_c(element);
		},
	};
}
