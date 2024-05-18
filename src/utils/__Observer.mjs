// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';
import { Dispatcher } from './Dispatcher.mjs';
import { _ClientExtender } from './_CientExtender.mjs';
import { __ClassList } from './__ClassList.mjs';

/**
 * - extends __Observer;
 * - register extended _ClientExtender:
 * > - 'name' = typeof class;
 */
export class __Observer {
	/** @type {__Observer} */
	static __;
	/**
	 * @param {typeof __AppSettings} __app_settings
	 * @param {typeof __ClassList} __class_list
	 */
	constructor(__app_settings, __class_list) {
		new __app_settings();
		new __class_list();
		if (typeof __AppSettings.__._use_window_object_helper === 'string') {
			// @ts-ignore
			window[use_helper] = _ClientExtender.helper;
		}
		__Observer.__ = this;
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
				if (!target.hasAttribute(__AppSettings.__._client_identifier)) {
					return;
				}
				await Dispatcher.dispatch(target);
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
			await Dispatcher.dispatch(element);
		}
	};
	/**
	 * @private
	 * @param {Element|Document} target
	 * @returns {false|Element}
	 */
	get_client_element = (target) => {
		const elem = target.querySelector(`[${__AppSettings.__._client_identifier}]`);
		if (!elem) {
			return false;
		}
		return elem;
	};
}
