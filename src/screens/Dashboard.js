import React, { Component } from 'react'
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import globalStyles from '../globalStyles'
import family from '../../assets/images/family.png'
import { connect } from 'react-redux'
import { loadFamilies, loadSnapshots, loadSurveys } from '../redux/actions'
import { url } from '../config'

export class Dashboard extends Component {
  componentDidMount() {
    this.props.loadFamilies(url[this.props.env], this.props.token.token)
    this.props.loadSnapshots(url[this.props.env], this.props.token.token)
    this.props.loadSurveys(url[this.props.env], this.props.token.token)
  }
  render() {
    return (
      <ScrollView style={globalStyles.container}>
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
        <Image style={{ ...styles.img, ...styles.center }} source={family} />
        <Button
          style={{ padding: 80 }}
          text="Create a lifemap"
          colored
          handleClick={() => {}}
        />
        <View style={styles.columns}>
          <Button text="Find a family" icon="search" handleClick={() => {}} />
          <Button text="Add a family" icon="add" handleClick={() => {}} />
        </View>
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
    marginTop: 13
  }
})

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
