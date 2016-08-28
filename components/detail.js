import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  Text,
  Linking,
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
      isChromeInstalled: false,
    };

    this.checkChrome();
  }
  render() {
    let desc = null;
    if (this.props.data.description) {
      desc = (
        <View style={ styles.sectionContainer }>
          <Text style={ styles.desc }>{ this.props.data.description }</Text>
        </View>
      );
    }

    let chromeButton = null;
    if (this.state.isChromeInstalled) {
      chromeButton = (
        <View style={ styles.sectionContainer }>
          <TouchableHighlight
            onPress={ () => this.openUrl(this.props.data.html_url.replace('https://', 'googlechromes://')) }
            underlayColor='#DFEDFF'
          >
            <Text style={ styles.button }>Open in Chrome</Text>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <View style={ styles.container }>
        { desc }
        <View >
          <ListView
            style={ styles.sectionContainer }
            dataSource={ this.state.ds }
            renderRow={ this.renderRow }
            scrollEnabled={ false }
          />
        </View>
        <View style={ styles.sectionContainer }>
          <TouchableHighlight
            onPress={ () => this.openUrl(this.props.data.html_url) }
            underlayColor='#DFEDFF'
          >
            <Text style={ styles.button }>Open in Safari</Text>
          </TouchableHighlight>
        </View>
        { chromeButton }
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
  openUrl(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }
  checkChrome() {
    const self = this;
    Linking.canOpenURL('googlechromes://www.github.com').then(supported => {
      self.setState({
        isChromeInstalled: !!supported,
      });
    });
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
    fontSize: 16,
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
  button: {
    padding: 10,
    fontSize: 16,
    color: '#4078C0',
    textAlign: 'center',
  },
});

module.exports = TrendingDetail;
