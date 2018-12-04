import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../../theme.json'

// Each of the major views has a stack that needs the same nav options.
// These options handle the header styles and menu icon.
export const generateNavOptions = ({ navigation, burgerMenu = true }) => ({
  headerTitleStyle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginLeft: 35
  },
  headerStyle: {
    height: 66,
    backgroundColor: colors.beige
  },
  headerLeftContainerStyle: {
    marginLeft: 19
  },
  headerRightContainerStyle: {
    marginRight: -16
  },
  headerRight: !burgerMenu ? (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => navigation.navigate('Dashboard')}
    >
      <Icon name="close" size={25} color={colors.lightdark} />
    </TouchableOpacity>
  ) : (
    ''
  ),
  headerLeft: burgerMenu ? (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => navigation.toggleDrawer()}
    >
      <Icon name="menu" size={30} color={colors.lightdark} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => navigation.goBack()}
    >
      <Icon name="arrow-back" size={25} color={colors.lightdark} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  touchable: {
    justifyContent: 'center',
    width: 60,
    height: 60
  }
})
