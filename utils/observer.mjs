// @ts-check
import { dispatcher } from './dispatcher.mjs';
import { vars } from './vars.mjs';

export class observer {
	constructor() {
		this.dispatcher = new dispatcher(this);
	}
	first_run = true;
	first_run_call = async () => {
		await this.dispatcher.dispatch(document.head);
		await this.dispatcher.dispatch(document.body);
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
				let element;
				while ((element = this.get_client_element(target))) {
					if (!element) {
						return;
					}
					await this.dispatcher.dispatch(element);
				}
			}
		});
	};
	/**
	 * @private
	 * @param {Element} target
	 * @returns {false|Element}
	 */
	get_client_element = (target) => {
		const elem = target.querySelector(`${vars.identifier}`);
		if (!elem) {
			return false;
		}
		return elem;
	};
}
