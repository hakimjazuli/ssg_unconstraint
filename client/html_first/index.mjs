// @ts-check

import { __Observer } from '@html_first/ssg_unconstraint';
import { AppSettings } from './AppSettings.mjs';
import { ClassList } from './ClassList.mjs';

new __Observer(AppSettings, ClassList).run();
