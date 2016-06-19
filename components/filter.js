import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  SegmentedControlIOS,
  Picker,
  Text,
  Modal,
  View
} from 'react-native';
import merge from 'lodash.merge';
import constant from '../lib/constant';

class TrendingFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: this.props.lang,
      period: this.props.period,
    };
  }
  render() {
    if (!this.props.visible) {
      return null;
    }

    const selectedIndex = constant.periods.indexOf(this.state.period);
    const items = constant.languages.map(lang => (
      <Picker.Item label={ lang } value={ lang } />
    ));
    return (
      <Modal
        animationType='slide'
        transparent={ true }
        visible={ true }
        style={{ marginTop: 0 }}
      >
        <View style={ styles.container }>
          <View style={ styles.innerContainer }>
            <SegmentedControlIOS
              values={ constant.periods }
              selectedIndex={ selectedIndex }
              onChange={event => {
                this.setState({
                  period: constant.periods[event.nativeEvent.selectedSegmentIndex],
                });
              }}
            />
            <Picker
              style={ styles.picker }
              selectedValue={ this.state.lang }
              onValueChange={value => {
                this.setState({ lang: value });
              }}
            >
              { items }
            </Picker>
            <TouchableHighlight
              style={ styles.button }
              underlayColor='transparent'
              onPress={() => {
                const routes = this.props.navigator.getCurrentRoutes();
                this.props.navigator.immediatelyResetRouteStack([merge(routes[0], {
                  title: this.state.lang,
                  passProps: {
                    lang: this.state.lang,
                    period: this.state.period,
                    filterVisible: false,
                  }
                })]);
              }}
            >
              <Text style={ styles.buttonText }>Done</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EFEFEF',
  },
  button: {
    padding: 15,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#007AFF',
  },
});

module.exports = TrendingFilter;
