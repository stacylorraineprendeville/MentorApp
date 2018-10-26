import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  AsyncStorage
} from 'react-native'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import DraftListItem from '../components/DraftListItem'
import globalStyles from '../globalStyles'
import family from '../../assets/images/family.png'
import { connect } from 'react-redux'
import { loadFamilies, loadSnapshots, loadSurveys } from '../redux/actions'
import { url } from '../config'
import colors from '../theme.json'

export class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Dashboard')
  })

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    AsyncStorage.getItem('userVisitedDashboard').then(
      value => (value === 'false' ? this.loadData() : null)
    )
    AsyncStorage.setItem('userVisitedDashboard', 'true')

    this.props.navigation.setParams({
      title: this.props.t('views.dashboard')
    })
  }

  loadData() {
    this.props.loadSnapshots(url[this.props.env], this.props.token.token)
    this.props.loadSurveys(url[this.props.env], this.props.token.token)
    this.props.loadFamilies(url[this.props.env], this.props.token.token)
  }

  render() {
    const { t } = this.props
    return (
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={globalStyles.container}>
          <View>
            <Text
              style={{
                ...globalStyles.h3,
                marginBottom: 33,
                alignSelf: 'center'
              }}
            >
              {t('general.welcome')}!
            </Text>
          </View>
          <Image style={{ ...styles.img, ...styles.center }} source={family} />
          <Button
            text="Create a lifemap"
            colored
            handleClick={() => this.props.navigation.navigate('Surveys')}
          />
          <View style={styles.columns}>
            <Button text="Find a family" icon="search" handleClick={() => {}} />
            <Button text="Add a family" icon="add" handleClick={() => {}} />
          </View>
        </View>
        <View style={styles.borderBottom}>
          <Text style={{ ...globalStyles.subline, ...styles.listTitle }}>
            Drafts
          </Text>
        </View>
        <FlatList
          style={styles.list}
          data={this.props.drafts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DraftListItem
              item={item}
              handleClick={() =>
                this.props.navigation.navigate('Draft', {
                  draft: item.draft_id
                })
              }
            />
          )}
        />
        {!this.props.drafts.length && (
          <Text
            id="no-drafts-message"
            style={{ ...globalStyles.subline, ...styles.listTitle }}
          >
            No drafts to display
          </Text>
        )}
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  img: { width: 166, height: 166, alignSelf: 'center', marginBottom: 43 },
  columns: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginTop: 13,
    marginBottom: -13
  },
  listTitle: {
    backgroundColor: colors.white,
    height: 41,
    lineHeight: 41,
    flex: 1,
    textAlign: 'center'
  },
  list: {
    backgroundColor: colors.white
  },
  borderBottom: {
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1
  }
})

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  loadFamilies: PropTypes.func.isRequired,
  loadSurveys: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  loadSnapshots: PropTypes.func.isRequired,
  drafts: PropTypes.array.isRequired,
  env: PropTypes.oneOf(['production', 'demo', 'testing', 'development']),
  token: PropTypes.object.isRequired
}

const mapStateToProps = ({ env, token, drafts }) => ({
  env,
  token,
  drafts
})

const mapDispatchToProps = {
  loadFamilies,
  loadSnapshots,
  loadSurveys
}

export default withNamespaces()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
)
