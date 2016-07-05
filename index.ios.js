import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  StatusBar,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import merge from 'lodash.merge';
import TrendingMain from './components/main';
import TrendingFilter from './components/filter';

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor='transparent'
          onPress={ () => { if (index > 0) { navigator.pop() } } }
        >
          <Text style={ styles.leftNavButtonText }>{ route.leftText || 'Back' }</Text>
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
        <TouchableHighlight
          underlayColor='transparent'
          onPress={ () => route.onPress(navigator) }
        >
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
      lang: 'All',
      period: 'today',
    };
  }
  renderScene(route, navigator) {
    return <route.component {...route.passProps} navigator={navigator} />
  }
  configureScene(route, routeStack) {
    if (route.type == 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />
        <Navigator
          style={{ flex: 1 }}
          initialRoute={{
            title: this.state.lang,
            component: TrendingMain,
            rightText: 'Filter',
            onPress: navigator => {
              const routes = navigator.getCurrentRoutes();
              navigator.immediatelyResetRouteStack([merge(routes[0], {
                passProps: {
                  lang: this.state.lang,
                  period: this.state.period,
                  filterVisible: true,
                }
              })]);
            },
            passProps: {
              lang: this.state.lang,
              period: this.state.period,
            },
          }}
          renderScene={ this.renderScene }
          configureScene={ this.configureScene }
          navigationBar={
            <Navigator.NavigationBar
              style={ styles.nav }
              routeMapper={ NavigationBarRouteMapper } />}
        />
      </View>
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
    marginRight: 13,
    marginTop: 7,
    color: '#DFEDFF',
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
