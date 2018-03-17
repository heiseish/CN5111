//@flow
'use-strict';
import { combineReducers } from 'redux';
import navigation from './navigation'
import notes from './notes'
export default combineReducers({
  nav: navigation,
  notes
});
