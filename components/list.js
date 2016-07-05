import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  Text,
  Image,
  View
} from 'react-native';
import TrendingDetail from './detail';
import api from '../lib/api';
import mockData from '../lib/mockdata';
const DEBUG = false;

class TrendingList extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.page = 0;
    this.state = {
      loaded: false,
      error: null,
      ds,
      data: [],
    };
  }
  componentDidMount() {
    this.request(this.props.period, this.props.lang);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.period !== nextProps.period ||
       this.props.lang !== nextProps.lang) {
      this.page = 0;
      this.setState({
        loaded: false,
        error: null,
        data: [],
      });
      this.request(nextProps.period, nextProps.lang);
    }
  }
  request(period, lang) {
    let search;
    if (DEBUG) {
      search = Promise.resolve(mockData);
    } else {
      search = api.search(lang, period, this.page);
    }
    search.then(result => {
        const data = this.state.data.concat(result.items);
        this.setState({
          loaded: true,
          ds: this.state.ds.cloneWithRows(data),
          data,
          error: null,
        });
      })
      .catch(error => {
        this.setState({
          loaded: true,
          error,
        })
      });
  }
  render() {
    let loadingTail;
    if (!this.state.loaded) {
      loadingTail = (
        <Text style={ styles.loading }>loading...</Text>
      );
    }
    if (this.state.error) {
      return this.renderError();
    }

    return (
      <View style={ styles.container }>
        <ListView
          dataSource={ this.state.ds }
          renderRow={ this.renderRow.bind(this) }
          onEndReached={ () => this._loadNextPage() }
          onEndReachedThreshold={ 50 }
        />
        { loadingTail }
      </View>
    );
  }
  renderError() {
    // TODO reload button
    return (
      <View style={ styles.container }>
        <Text style={ styles.loading }>Error: { this.state.error.message }</Text>
      </View>
    );
  }
  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={ () => this._navigate(rowData) } underlayColor='#DFEDFF'>
        <View style={ styles.rowContainer }>
          <Text style={ styles.title }>
            <Text>{ rowData.owner.login }/</Text>
            <Text style={ styles.name }>{ rowData.name }</Text>
          </Text>
          <Text style={ styles.desc }>{ rowData.description }</Text>
          <Text style={ styles.tagsContainer }>
            <Text sytle={ styles.tag }>{ rowData.language || 'Unknown' }</Text>
            <Text sytle={ styles.seperator }> &middot; </Text>
            <Text sytle={ styles.tag }>{ rowData.stargazers_count } stars { this.props.period }</Text>
            <Text sytle={ styles.seperator }> &middot; </Text>
            <Image style={ styles.avatar } source={{ uri: rowData.owner.avatar_url }} />
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  _navigate(data) {
    const title = data.owner.login + '/' + data.name;
    this.props.navigator.push({
      component: TrendingDetail,
      title: title.length > 26 ? data.name : title,
      passProps: {
        data,
      },
    });
  }
  _loadNextPage() {
    this.page = this.page + 1;
    this.request(this.props.period, this.props.lang);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loading: {
    marginTop: 0,
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
    fontSize: 14,
    color: '#666666',
  },
  tagsContainer: {
    marginBottom: 0,
    fontSize: 12,
    color: '#999999',
  },
  tag: {
  },
  avatar: {
    width: 20,
    height: 20,
    marginTop: 6,
    borderRadius: 3,
  },
  seperator: {
  },
});

module.exports = TrendingList;
