import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LoginView from '../screens/Login'
import SurveysView from '../screens/Surveys'
import DraftView from '../screens/Draft'
import FamiliesView from '../screens/Families'
import FamilyView from '../screens/Family'
import DraftsView from '../screens/Drafts'
import DashboardView from '../screens/Dashboard'
import SyncView from '../screens/Sync'
import colors from '../theme.json'
import i18n from '../i18n'

const mapStateToProps = ({ language }) => ({
  language
})

// Component that renders the drawer menu content. DrawerItems are the links to
// the given views.
const DrawerContent = connect(mapStateToProps)(
  class DrawerContent extends Component {
    switchLanguage(language) {
      i18n.locale = language
    }
    render() {
      return (
        <ScrollView>
          <Image
            style={{ height: 172, width: 304 }}
            source={require('../../assets/images/navigation_image.png')}
          />
          <View style={styles.languageSwitch}>
            <TouchableOpacity onPress={() => this.switchLanguage('en')}>
              <Text style={styles.whiteText}>EN</Text>
            </TouchableOpacity>
            <Text style={styles.whiteText}> | </Text>
            <TouchableOpacity onPress={() => this.switchLanguage('es')}>
              <Text style={styles.whiteText}>ESP</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.username, styles.whiteText]}>Username</Text>
          <DrawerItems {...this.props} />
        </ScrollView>
      )
    }
  }
)

// Separate component for the icon next to each nav link as color and size are
// the same for each.
const DrawerIcon = ({ name }) => (
  <Icon name={name} color={colors.palegreen} size={20} />
)

DrawerIcon.propTypes = {
  name: PropTypes.string.isRequired
}

// Each of the major views has a stack that needs the same nav options.
// These options handle the header styles and menu icon.
const generateNavOptions = navigation => ({
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
  headerLeft: (
    <Icon
      name="menu"
      size={30}
      color={colors.lightdark}
      onTouchEnd={() => navigation.toggleDrawer()}
    />
  )
})

const DashboardStack = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardView,
      navigationOptions: {
        title: i18n.t('navigation.dashboard')
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => generateNavOptions(navigation)
  }
)

const LifemapStack = createStackNavigator(
  {
    Surveys: {
      screen: SurveysView,
      navigationOptions: {
        title: 'Create a Life Map'
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => generateNavOptions(navigation)
  }
)

const FamiliesStack = createStackNavigator(
  {
    Families: {
      screen: FamiliesView,
      navigationOptions: {
        title: 'Families'
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => generateNavOptions(navigation)
  }
)

const SyncStack = createStackNavigator(
  {
    Sync: {
      screen: SyncView,
      navigationOptions: {
        title: 'Sync'
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => generateNavOptions(navigation)
  }
)

// the drawer navigation menu
const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        drawerLabel: i18n.t('navigation.dashboard'),
        drawerIcon: <DrawerIcon name="dashboard" />
      }
    },
    Surveys: {
      screen: LifemapStack,
      navigationOptions: {
        drawerLabel: 'Create a Life Map',
        drawerIcon: <DrawerIcon name="map" />
      }
    },
    Families: {
      screen: FamiliesStack,
      navigationOptions: {
        drawerIcon: <DrawerIcon name="people" />
      }
    },
    Sync: {
      screen: SyncStack,
      navigationOptions: {
        drawerIcon: <DrawerIcon name="sync" />
      }
    }
  },
  {
    contentComponent: DrawerContent,
    contentOptions: {
      labelStyle: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 14,
        color: colors.palegreen
      },
      iconContainerStyle: {
        opacity: 1,
        marginRight: 0
      },
      activeBackgroundColor: colors.palebeige,
      activeTintColor: colors.palegreen,
      itemsContainerStyle: {
        marginVertical: 0
      }
    },
    initialRouteName: 'Dashboard',
    drawerWidth: 304
  }
)

// The drawer nav doesn't have it's own way of showing a menu toggle icon,
// so we put it as a part of the App stack. This is also where we control which
// stack has a header bar, which stack to show if the user us not authenticated.
export default createStackNavigator(
  {
    Login: { screen: LoginView },
    Drawer: {
      screen: DrawerNavigator
    }
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
)

const styles = StyleSheet.create({
  whiteText: {
    color: colors.white,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 20
  },
  languageSwitch: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    left: 16
  },
  username: {
    position: 'absolute',
    top: 139,
    left: 16
  }
})
