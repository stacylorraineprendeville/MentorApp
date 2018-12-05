import TermsView from '../../screens/lifemap/Terms'
import SocioEconomicQuestionView from '../../screens/lifemap/SocioEconomicQuestion'
import FinalView from '../../screens/lifemap/Final'
import FamilyParticipantView from '../../screens/lifemap/FamilyParticipant'
import FamilyMembersNamesView from '../../screens/lifemap/FamilyMembersNames'
import FamilyMembersGenderView from '../../screens/lifemap/FamilyMembersGender'
import FamilyMembersBirthdatesView from '../../screens/lifemap/FamilyMembersBirthdates'
import QuestionView from '../../screens/lifemap/Question'
import BeginLifemapView from '../../screens/lifemap/BeginLifemap'
import LocationView from '../../screens/lifemap/Location'
import OverviewView from '../../screens/lifemap/Overview'
import AddPriorityView from '../../screens/lifemap/AddPriority'
import AddAchievementView from '../../screens/lifemap/AddAchievement'
import { generateNavOptions } from './helpers'

// Reusable object for all screens related to a draft
export default {
  Terms: {
    screen: TermsView,
    navigationOptions: ({ navigation }) => ({
      title: 'Terms & Conditions',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  Privacy: {
    screen: TermsView,
    navigationOptions: ({ navigation }) => ({
      title: 'Privacy Policy',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  Location: {
    screen: LocationView,
    navigationOptions: ({ navigation }) => ({
      title: 'Location',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  SocioEconomicQuestion: {
    screen: SocioEconomicQuestionView,
    navigationOptions: ({ navigation }) => ({
      title: 'Socio Economic',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  BeginLifemap: {
    screen: BeginLifemapView,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Life Map',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  Question: {
    screen: QuestionView,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Life Map',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  Overview: {
    screen: OverviewView,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Life Map',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  AddPriority: {
    screen: AddPriorityView,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Life Map',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  AddAchievement: {
    screen: AddAchievementView,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Life Map',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  Final: {
    screen: FinalView,
    navigationOptions: ({ navigation }) => ({
      title: 'Thank you!',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  FamilyParticipant: {
    screen: FamilyParticipantView,
    navigationOptions: ({ navigation }) => ({
      title: 'Primary participant',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  FamilyMembersNames: {
    screen: FamilyMembersNamesView,
    navigationOptions: ({ navigation }) => ({
      title: 'Family members',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  FamilyMembersGender: {
    screen: FamilyMembersGenderView,
    navigationOptions: ({ navigation }) => ({
      title: 'Gender',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  },
  FamilyMembersBirthdates: {
    screen: FamilyMembersBirthdatesView,
    navigationOptions: ({ navigation }) => ({
      title: 'Birth dates',
      ...generateNavOptions({ navigation, burgerMenu: false })
    })
  }
}
