// @ts-check

export class observer {
	constructor() {}
	/** @private */
	config = { attributes: true, childList: true, subtree: true };
	run = () => {
		const observer_ = new MutationObserver(this.watcher);
		const targetNode = document.querySelector(this.target);
		if (!targetNode) {
			return;
		}
		observer_.observe(targetNode, this.config);
	};
	/** @private */
	target = 'body';
	/**
	 * @private
	 * @param {MutationRecord[]} mutations_list
	 * @param {MutationObserver} observer
	 */
	watcher = (mutations_list, observer) => {
		mutations_list.forEach((mutation) => {
			console.log(mutation);
			if (mutation.type === 'attributes') {
				console.log('Attributes mutated');
			} else if (mutation.type === 'childList') {
				console.log('Child list mutated');
			}
		});
	};
}
