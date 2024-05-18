// @ts-check

import { __ClassList } from '@html_first/ssg_unconstraint';
import { alpine } from './classes/alpine.mjs';
import { bss } from './classes/bss.mjs';
import { html } from './classes/html.mjs';

export class ClassList extends __ClassList {
	alpine = alpine;
	bss = bss;
	html = html;
}
