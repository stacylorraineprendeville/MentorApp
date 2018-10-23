import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
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

import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation'

const DrawerContent = props => (
  <ScrollView>
    <Text>Username</Text>
    <DrawerItems {...props} />
  </ScrollView>
)

const Drawer = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardView
    },
    Surveys: {
      screen: SurveysView,
      navigationOptions: {
        drawerLabel: 'Create a Life Map',
        drawerIcon: <DrawerIcon name="map" />
      }
    },
    Families: {
      screen: FamiliesView,
      navigationOptions: {
        drawerIcon: <DrawerIcon name="people" />
      }
    },
    Sync: {
      screen: SyncView,
      navigationOptions: {
        drawerIcon: <DrawerIcon name="sync" />
      }
    }
  },
  {
    contentComponent: DrawerContent,
    labelStyle: {
      color: colors.palegreen
    },
    contentOptions: {
      activeBackgroundColor: colors.palebeige,
      activeTintColor: colors.palegreen,
      itemsContainerStyle: {
        marginVertical: 20
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    initialRouteName: 'Dashboard',
    drawerWidth: 304
  }
)

const DrawerIcon = ({ tintColor, name }) => (
  <Icon name={name} color={tintColor} />
)

DrawerIcon.propTypes = {
  tintColor: PropTypes.string,
  name: PropTypes.string
}

export default createStackNavigator(
  {
    Login: { screen: LoginView },
    Draft: { screen: DraftView },
    Family: { screen: FamilyView },
    Drafts: { screen: DraftsView },
    Drawer: {
      screen: Drawer,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.beige
        },
        headerLeft: (
          <Icon
            name="menu"
            styles={styles.burger}
            size={30}
            color={colors.lightdark}
            onTouchEnd={() => navigation.toggleDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'Drawer'
  }
)

const styles = StyleSheet.create({
  burger: {}
})
