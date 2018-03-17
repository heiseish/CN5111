//@flow
'use strict';

import type { Action } from './types';

module.exports = {
	registerNumberOfNotes: (number: number): Action => ({
		type: 'NOTE_NUMBER',
		number,
	}),

};
