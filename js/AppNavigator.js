//@flow
'use-strict';

import { StackNavigator } from 'react-navigation';
import Workspace from './components/workspace'
import NoteForm from './components/noteForm'
import MainView from './main'
import List from './components/list'
import ParamsList from './components/math/form'
import Result from './components/result'
const AppRouteConfigs = {
  MainView: {
    screen: MainView
  }, 
  Workspace: {
    screen: Workspace
  },
  NoteForm: {
    screen: NoteForm
  },
  List: {
    screen: List
  },
  ParamsList: {
    screen: ParamsList
  },
  Result : {
    screen: Result
  }
  // // Planner specific
  // Planner: {
  // 	screen: Planner
  // },
  // NewTask: {
  //   screen: NewTask
  // },
  // // Staf specific
  // Staff: {
  //   screen: Staff
  // },

  // //Supervisor specific
  // Supervisor: {
  //   screen: Supervisor
  // },
  // Assign: {
  //   screen: Assign
  // },
  // StaffEvaluation: {
  //   screen: StaffEvaluation
  // }

}

const StackNavigatorConfig = {
  initialRouteName: 'MainView',
  header: null,
  headerMode: 'none',
  navigationOptions: {
    header: null
  }

}
export default StackNavigator(AppRouteConfigs, StackNavigatorConfig);
