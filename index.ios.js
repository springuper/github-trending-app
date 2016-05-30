import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import TrendingMain from './components/main';

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight
           underlayColor="transparent"
           onPress={ () => { if (index > 0) { navigator.pop() } } }>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>
      );
    }
    else {
      return null;
    }
  },
  RightButton(route, navigator, index, navState) {
    if (route.onPress && route.rightText ) {
      return (
        <TouchableHighlight onPress={ () => route.onPress() }>
          <Text style={ styles.rightNavButtonText }>
            { route.rightText }
          </Text>
        </TouchableHighlight>
      );
    }
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>{ route.title }</Text>;
  }
};

class GithubTrending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'all',
      period: 'day',
    };
  }
  renderScene(route, navigator) {
    return <route.component {...route.passProps} navigator={navigator} />
  }
  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ title: this.state.lang, component: TrendingMain }}
        renderScene={ this.renderScene }
        navigationBar={
          <Navigator.NavigationBar
            style={ styles.nav }
            routeMapper={ NavigationBarRouteMapper } />}
      />
    );
  }
};

const styles = StyleSheet.create({
  leftNavButtonText: {
    fontSize: 18,
    marginLeft: 13,
    marginTop: 7,
    color: '#DFEDFF',
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight:13,
    marginTop:2
  },
  nav: {
    height: 60,
    backgroundColor: '#4078C0',
  },
  title: {
    marginTop: 6,
    fontSize: 20,
    color: '#FFFFFF',
  },
});

AppRegistry.registerComponent('githubtrending', () => GithubTrending);
