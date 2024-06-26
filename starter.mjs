﻿// @ts-check
import ncp from 'ncp';
import { join as path_join } from 'path';

const base = process.cwd();
const folder_ = 'client';
const source_dir = path_join(base, 'node_modules', '@html_first', 'ssg_unconstraint', folder_);
const dest_dir = path_join(base, folder_);

const options = {
	clobber: true,
};
[source_dir].forEach((source_dir_) => {
	ncp.ncp(source_dir_, dest_dir, options, function (err) {
		if (err) {
			return console.error(err);
		}
		console.log('example files copied successfully!');
	});
});
