import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import LoginView from '../screens/Login'
import SurveysView from '../screens/Surveys'
import DraftView from '../screens/Draft'
import FamiliesView from '../screens/Families'
import FamilyView from '../screens/Family'
import DraftsView from '../screens/Drafts'

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
    Surveys: {
      screen: SurveysView
    },
    Families: { screen: FamiliesView },
    Drafts: { screen: DraftsView }
  },
  {
    contentComponent: DrawerContent,
    labelStyle: {
      color: '#89BD76'
    },
    contentOptions: {
      activeBackgroundColor: '#FCF9F3',
      activeTintColor: '#89BD76',
      itemsContainerStyle: {
        marginVertical: 20
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    initialRouteName: 'Surveys',
    drawerWidth: 304
  }
)

export default createStackNavigator(
  {
    Login: { screen: LoginView },
    Draft: { screen: DraftView },
    Family: { screen: FamilyView },
    Drawer: {
      screen: Drawer,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#FAEFE1'
        },
        headerLeft: (
          <Icon
            name="menu"
            styles={styles.burger}
            size={30}
            color="#7A756F"
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
