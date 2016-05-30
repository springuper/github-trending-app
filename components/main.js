import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import TrendingList from './list';

class TrendingMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'all',
      period: 'day',
    };
  }
  render() {
    return (
      <View style={ styles.container }>
        <TrendingList lang={ this.state.lang } period={ this.state.period } navigator={ this.props.navigator } />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#EFEFEF',
  },
});

module.exports = TrendingMain;
