//@flow
'use strict';
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var { connect } = require('react-redux');
import { primary, secondary, Header } from './components/common';
import Workspace from './components/workspace';
import Logo from './components/logo'
import MathSolver from './components/math'
import { Container, View, Content, Footer, FooterTab, Button, Icon, Text, Badge, StyleProvider } from 'native-base';

type Props = {
  notes: number
}
type Tab = 'workspace' | 'logo' | 'math';
type State = {
  tab: Tab
};
class MainView extends React.Component {
  state: State;
  props: Props;
  constructor(props) {
    super()
    this.state = {
      tab: 'workspace'
    }
  }

  onTabSelect(tab: Tab) {
    if (this.state.tab !== tab) {
      this.setState({tab: tab})
    }
  }

  render() {
    return (
      
        <Container>
          {this.renderSelectedTab()}
          <Footer>
            <FooterTab>
              <Button vertical badge={true}
                  active={this.state.tab === 'workspace'} 
                  onPress={() => this.onTabSelect('workspace')} >
                  <Badge style={{ backgroundColor: primary.normal }}><Text>{this.props.notes}</Text></Badge>
                <Icon ios={this.state.tab === 'workspace' ? "ios-tablet-landscape" : "ios-tablet-landscape-outline"} 
                android="md-tablet-landscape"
                active={this.state.tab === 'workspace'}
                />
                <Text>Workspace</Text>
              </Button>


              <Button vertical
                  active={this.state.tab === 'logo'} 
                  onPress={() => this.onTabSelect('logo')} >
                <Icon ios={this.state.tab === 'logo' ? 'ios-menu' : "ios-menu-outline" }
                android="md-menu"
                active={this.state.tab === 'logo'}/>
                <Text>Logo</Text>
              </Button>


              <Button vertical
                  active={this.state.tab === 'math'} 
                  onPress={() => this.onTabSelect('math')}>
                <Icon ios={this.state.tab === 'math' ? 'ios-calculator' : "ios-calculator-outline"}
                android="md-calculator"
                active={this.state.tab === 'math'}/>
                <Text>MILP</Text>
              </Button>

            </FooterTab>
          </Footer>
        </Container>
    );
  }

  renderSelectedTab() {
    switch (this.state.tab) {
      case 'workspace':
      return <Workspace navigation={this.props.navigation}/>

      case 'logo':
      return <Logo navigation={this.props.navigation}/>

      default:
      return <MathSolver navigation={this.props.navigation}/>
    }
  }

}

const mapStateToProps = (state) => ({
  notes: state.notes.number
})

export default connect(mapStateToProps)(MainView)
