﻿// @ts-check

export class class_extender {
	/** @type {Element} */
	element;
	/**
	 * Description
	 * @param {Element} element
	 */
	constructor(element) {
		this.element = element;
	}
	/**
	 * Description
	 * @param {string} element_string
	 * @param {boolean} [only_inner]
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
	 * Description
	 * @param {string} argument_open
	 * @param {string} argument_close
	 * @param {boolean} [use_inner]
	 * - false default: use outerHTML of the element to be looped
	 * - true;
	 */
	surround_with = (argument_open, argument_close, use_inner = false) => {
		const text_before = document.createTextNode(argument_open);
		const text_after = document.createTextNode(argument_close);
		if (use_inner) {
			const parent_node = this.element;
			const elem = this.element.childNodes[0];
			parent_node.insertBefore(text_before, elem);
			parent_node.insertBefore(text_after, elem.nextSibling);
			return;
		}
		const parent_node = this.element.parentNode;
		if (!parent_node) {
			return;
		}
		parent_node.insertBefore(text_before, this.element);
		parent_node.insertBefore(text_after, this.element.nextSibling);
	};
	/**
	 * Description
	 * @param {string} open_arguments
	 * @param {boolean} [use_inner]
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
	 * Description
	 * @param {string} close_argument
	 * @param {boolean} [use_inner]
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
	 * Description
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
	 * Description
	 * @param {string} string
	 * @param {string} delimiter
	 */
	split = (string, delimiter) => {
		return string
			.split(new RegExp(`(?<!\\\\)${delimiter}`))
			.map((part) => part.replace(/\\/, ''));
	};
}
