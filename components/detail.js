import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

class TrendingDetail extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    const listData = [
      {
        label: 'Language',
        value: data.language,
      },
      {
        label: 'Created',
        value: data.created_at,
      },
      {
        label: 'Stars',
        value: data.stargazers_count,
      },
      {
        label: 'Forks',
        value: data.forks_count,
      },
      {
        label: 'Watchers',
        value: data.watchers_count,
      },
      {
        label: 'Issues',
        value: data.open_issues_count,
      }
    ];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds: ds.cloneWithRows(listData),
    };
  }
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.sectionContainer }>
          <Text style={ styles.desc }>{ this.props.data.description }</Text>
        </View>
        <View >
          <ListView
            style={ styles.sectionContainer }
            dataSource={ this.state.ds }
            renderRow={ this.renderRow }
            scrollEnabled={ false }
          />
        </View>
      </View>
    );
  }
  renderRow(rowData) {
    return (
      <View style={ styles.rowContainer }>
        <Text style={ styles.label }>{ rowData.label }</Text>
        <Text style={ styles.value }>{ rowData.value }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#EFEFEF',
  },
  sectionContainer: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  desc: {
    padding: 10,
    fontSize: 14,
    color: '#666666',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 0,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  label: {
    fontSize: 16,
    color: '#000000',
  },
  value: {
    fontSize: 16,
    color: '#666666',
  },
});

module.exports = TrendingDetail;
