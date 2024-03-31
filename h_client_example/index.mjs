// @ts-check
import { observer } from '@html_first/ssg_unconstraint';
import { alpine } from './classes/alpine.mjs';
import { bss } from './classes/bss.mjs';
import { html } from './classes/html.mjs';

new (class extends observer {
	alpine = alpine;
	bss = bss;
	html = html;
	/**
	 * classes above can get you hint on how to extends to more customizable class
	 * register your classes bellow
	 */
})().run();
