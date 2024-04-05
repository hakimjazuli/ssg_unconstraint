// @ts-check
import { class_extender } from './class_extender.mjs';
import { dispatcher } from './dispatcher.mjs';
import { vars } from './vars.mjs';

export class observer {
	/**
	 * @param {false|string} [use_helper]
	 * - false default= do nothing;
	 * - string: will assign to window[use_helper] object of functions to set classes intstuction to element;
	 */
	constructor(use_helper = false) {
		this.dispatcher = new dispatcher(this);
		if (typeof use_helper === 'string') {
			// @ts-ignore
			window[use_helper] = class_extender.helper;
		}
	}
	/** @private */
	first_run = true;
	/** @private */
	first_run_call = async () => {
		await this.loop_through_elements();
		this.first_run = false;
	};
	/** @private */
	config = { attributes: true, childList: true, subtree: true };
	run = () => {
		const observer_ = new MutationObserver(this.watcher);
		observer_.observe(document.head, this.config);
		observer_.observe(document.body, this.config);
		if (this.first_run) {
			this.first_run_call();
		}
	};
	/**
	 * @private
	 * @param {MutationRecord[]} mutations_list
	 * @param {MutationObserver} observer
	 */
	watcher = (mutations_list, observer) => {
		mutations_list.forEach(async (mutation) => {
			const target = mutation.target;
			if (!(target instanceof Element)) {
				return;
			}
			if (mutation.type === 'attributes') {
				if (!target.hasAttribute(vars.identifier)) {
					return;
				}
				await this.dispatcher.dispatch(target);
			} else if (mutation.type === 'childList') {
				this.loop_through_elements(target);
			}
		});
	};
	/**
	 * @private
	 * @param {Element|Document} [target=document]
	 */
	loop_through_elements = async (target = document) => {
		let element;
		while ((element = this.get_client_element(target))) {
			if (!element) {
				return;
			}
			await this.dispatcher.dispatch(element);
		}
	};
	/**
	 * @private
	 * @param {Element|Document} target
	 * @returns {false|Element}
	 */
	get_client_element = (target) => {
		const elem = target.querySelector(`[${vars.identifier}]`);
		if (!elem) {
			return false;
		}
		return elem;
	};
}
