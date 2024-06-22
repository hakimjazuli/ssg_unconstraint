// @ts-check

export class __AppSettings {
	/**
	 * @type {false|string}
	 * string: assign _ClientExtender.helper to window[string_value]
	 */
	_use_window_object_helper = false;
	/**
	 * @type {string}
	 */
	_client_identifier = 'client';
	/**
	 * @type {string}
	 */
	_instruction_identifier = 'c-';
	/**
	 * @type {string[]}
	 */
	_separator = [';', ',', '^'];
	/**
	 * @type {string}
	 */
	_window_class_list_name = 'ssg_unconstraint_class_list';

	/**
	 * @readonly
	 * @param {number} index
	 * @returns {string}
	 */
	instruction = (index) => `${this._instruction_identifier}${index}`;

	/** @type {__AppSettings} */
	static __;
	constructor() {
		__AppSettings.__ = this;
	}
}
