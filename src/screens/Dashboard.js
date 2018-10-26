import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  FlatList,
  AsyncStorage
} from 'react-native'

import PropTypes from 'prop-types'

import Button from '../components/Button'
import RoundImage from '../components/RoundImage'
import DraftListItem from '../components/DraftListItem'
import globalStyles from '../globalStyles'
import { connect } from 'react-redux'
import { loadFamilies, loadSnapshots, loadSurveys } from '../redux/actions'
import { url } from '../config'
import colors from '../theme.json'

export class Dashboard extends Component {
  componentDidMount() {
    AsyncStorage.getItem('userVisitedDashboard').then(
      value => (value === 'false' ? this.loadData() : null)
    )
    AsyncStorage.setItem('userVisitedDashboard', 'true')
  }

  loadData() {
    this.props.loadSnapshots(url[this.props.env], this.props.user.token)
    this.props.loadSurveys(url[this.props.env], this.props.user.token)
    this.props.loadFamilies(url[this.props.env], this.props.user.token)
  }

  render() {
    return (
      <ScrollView style={styles.background}>
        <View style={globalStyles.container}>
          <View>
            <Text
              style={{
                ...globalStyles.h3,
                marginBottom: 33,
                alignSelf: 'center'
              }}
            >
              Welcome!
            </Text>
          </View>
          <RoundImage source="family" />
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
            Latest drafts
          </Text>
        </View>
        <FlatList
          style={{ ...styles.background, paddingLeft: 25 }}
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
  columns: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginTop: 13,
    marginBottom: -13
  },
  listTitle: {
    backgroundColor: colors.beige,
    height: 41,
    lineHeight: 41,
    flex: 1,
    textAlign: 'center'
  },
  background: {
    backgroundColor: colors.palebeige
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
  loadSnapshots: PropTypes.func.isRequired,
  drafts: PropTypes.array.isRequired,
  env: PropTypes.oneOf(['production', 'demo', 'testing', 'development']),
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ env, user, drafts, offline }) => ({
  env,
  user,
  drafts,
  offline
})

const mapDispatchToProps = {
  loadFamilies,
  loadSnapshots,
  loadSurveys
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
