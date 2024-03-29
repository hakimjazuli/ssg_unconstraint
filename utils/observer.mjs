// @ts-check
import { dispatcher } from './dispatcher.mjs';
import { vars } from './vars.mjs';

export class observer {
	constructor() {
		this.dispatcher = new dispatcher(this);
	}
	/** @private */
	config = { attributes: true, childList: true, subtree: true };
	run = () => {
		const observer_ = new MutationObserver(this.watcher);
		const target_node = document.querySelector('head');
		if (!target_node) {
			return;
		}
		observer_.observe(target_node, this.config);
		const target_node_2 = document.querySelector('body');
		if (!target_node_2) {
			return;
		}
		observer_.observe(target_node_2, this.config);
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
				const element = target.querySelector(`[${vars.identifier}]`);
				if (!element) {
					return;
				}
				await this.dispatcher.dispatch(element);
			}
		});
	};
}
