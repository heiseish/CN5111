//@flow
'use-strict';
import type {Action} from '../actions/types';

export type Tab = 'Workspace'
type State = {
  tab: Tab;
};


const initialState = {
	number: 0
}
export default (state: any = initialState, action: Action) => {

	switch (action.type) {
  		case 'NOTE_NUMBER':
  			return {
  				number: action.number
  			};

  		default:
  			return state
 
	}
};





