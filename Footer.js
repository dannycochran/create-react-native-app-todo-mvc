import React from 'react';

import {
  TouchableHighlight,
  View,
  Text
} from 'react-native';

import styles, { buttonUnderlayLight } from './styles';

const tabs = ['active', 'completed'];

export default class Footer extends React.Component {
  renderTab(tab, index) {
    const tabStyles = [
      styles.tabContainer,
      tab === this.props.selectedTab ? styles.selectedTab : {}
    ];
    return (
      <TouchableHighlight style={tabStyles} key={tab}
        underlayColor={buttonUnderlayLight}
        onPress={() => this.props.onChangeTab(tab)}>
        <Text style={styles.tabText}>{tab}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.footerContainer}>
        {tabs.map(this.renderTab.bind(this))}
      </View>
    );
  }
}
