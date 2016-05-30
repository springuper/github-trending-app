import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import TrendingDetail from './detail';
import api from '../lib/api';
import mockData from '../lib/mockdata';
const DEBUG = true;

class TrendingList extends Component {
  constructor(props) {
    console.log('list props', props);
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      loaded: false,
      error: null,
      ds,
    };
  }
  componentDidMount() {
    this.request();
  }
  request() {
    let search;
    if (DEBUG) {
      search = Promise.resolve(mockData);
    } else {
      search = api.search(this.props.lang, this.props.period);
    }
    search.then(result => {
        console.log('result', result);
        this.setState({
          loaded: true,
          ds: this.state.ds.cloneWithRows(result.items),
          error: null,
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          loaded: true,
          error,
        });
      });
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }
    if (this.state.error) {
      return this.renderError();
    }

    return (
      <View style={ styles.container }>
        <ListView
          dataSource={ this.state.ds }
          renderRow={ this.renderRow.bind(this) }
        />
      </View>
    );
  }
  renderLoading() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.loading }>loading...</Text>
      </View>
    );
  }
  renderError() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.loading }>Error: { this.state.error.message }</Text>
      </View>
    );
  }
  renderRow(rowData) {
    console.log('@renderRow', this._navigate);
    return (
      <TouchableHighlight onPress={ () => this._navigate(rowData) } underlayColor='#DFEDFF'>
        <View style={ styles.rowContainer }>
          <Text style={ styles.title }>
            <Text>{ rowData.owner.login }/</Text>
            <Text style={ styles.name }>{ rowData.name }</Text>
          </Text>
          <Text style={ styles.desc }>{ rowData.description }</Text>
        </View>
      </TouchableHighlight>
    );
  }
  _navigate(data) {
    console.log('@_navigate', this.props);
    this.props.navigator.push({
      component: TrendingDetail,
      title: data.owner.login + '/' + data.name,
      passProps: {
        data,
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loading: {
    marginTop: 60,
    textAlign: 'center',
    color: '#999999',
  },
  rowContainer: {
    padding: 10,
    paddingLeft: 0,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    marginBottom: 6,
    fontSize: 20,
    color: '#4078C0',
  },
  name: {
    fontWeight: 'bold',
  },
  desc: {
    color: '#666666',
  },
});

module.exports = TrendingList;
