import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import TrendingList from './list';
import TrendingFilter from './filter';

class TrendingMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={ styles.container }>
        <TrendingList
          lang={ this.props.lang }
          period={ this.props.period }
          navigator={ this.props.navigator }
        />
        <TrendingFilter
          lang={ this.props.lang }
          period={ this.props.period }
          visible={ this.props.filterVisible }
          navigator={ this.props.navigator }
        />
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
