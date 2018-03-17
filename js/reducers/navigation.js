//@flow
'use-strict';
import AppNavigator from '../AppNavigator';
import type {Action} from '../actions/types';

export type Tab = 'Workspace'
type State = {
  tab: Tab;
};


const initialState = {
	...AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('MainView')),
	tab: 'Home'
}
export default (state: any = initialState, action: Action) => {

	switch (action.type) {
  		case 'SWITCH_TAB':
  			return {...state, tab: action.tab};

  		default:
  			const nextState = AppNavigator.router.getStateForAction(action, state);
	    	// Simply return the original `state` if `nextState` is null or undefined.
	    	return nextState || state;
	}
};





