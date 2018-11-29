import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { addSurveyData } from '../../redux/actions'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import MapView from 'react-native-maps'
import marker from '../../../assets/images/marker.png'
import globalStyles from '../../globalStyles'
import SearchBar from '../../components/SearchBar'
import Select from '../../components/Select'

export class Location extends Component {
  state = {
    latitude: null,
    longitude: null,
    accuracy: null,
    searchAddress: '',
    errorsDetected: [],
    mapsError: ''
  }
  addSurveyData = (text, field) => {
    this.props.addSurveyData(
      this.props.navigation.getParam('draftId'),
      'familyData',
      {
        [field]: text
      }
    )
  }
  getFieldValue = (draft, field) => {
    if (!draft) {
      return
    }
    return draft.familyData[field]
  }
  getDeviceLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
      },
      error => this.setState({ mapsError: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    )
  }
  detectError = (error, field) => {
    if (error && !this.state.errorsDetected.includes(field)) {
      this.setState({ errorsDetected: [...this.state.errorsDetected, field] })
    } else if (!error) {
      this.setState({
        errorsDetected: this.state.errorsDetected.filter(item => item !== field)
      })
    }
  }

  searcForAddress = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.searchAddress.replace(
        ' ',
        '+'
      )}&key=AIzaSyBLGYYy86_7QPT-dKgUnFMIJyhUE6AGVwM`
    )
      .then(r =>
        r
          .json()
          .then(res =>
            this.setState({
              latitude: res.results[0].geometry.location.lat,
              longitude: res.results[0].geometry.location.lng
            })
          )
          .catch()
      )
      .catch()
  }
  onDragMap = region => {
    const { latitude, longitude } = region
    this.setState({
      latitude,
      longitude
    })
  }
  getDraft = () =>
    this.props.drafts.filter(
      draft => draft.draftId === this.props.navigation.getParam('draftId')
    )[0]
  componentDidMount() {
    this.getDeviceLocation()
    if (!this.getFieldValue(this.getDraft(), 'country')) {
      this.setState({
        errorsDetected: ['country']
      })
    }
  }
  handleClick = () => {
    this.addSurveyData(this.state.latitude, 'latitude')
    this.addSurveyData(this.state.longitude, 'longitude')
    this.addSurveyData(this.state.accuracy, 'accuracy')

    this.props.navigation.navigate('SocioEconomicQuestion', {
      draftId: this.props.navigation.getParam('draftId'),
      survey: this.props.navigation.getParam('survey')
    })
  }

  render() {
    const {
      mapsError,
      latitude,
      longitude,
      accuracy,
      searchAddress,
      errorsDetected
    } = this.state

    const draft = this.getDraft()

    return (
      <ScrollView
        style={globalStyles.background}
        contentContainerStyle={styles.contentContainer}
      >
        {!mapsError ? (
          <View>
            {latitude ? (
              <View>
                <View pointerEvents="none" style={styles.fakeMarker}>
                  <Image source={marker} />
                </View>
                <SearchBar
                  id="searchAddress"
                  style={styles.search}
                  placeholder="Search by street or postal code"
                  onChangeText={searchAddress =>
                    this.setState({ searchAddress })
                  }
                  onSubmit={this.searcForAddress}
                  value={searchAddress}
                />
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                  }}
                  region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                  }}
                  onRegionChangeComplete={this.onDragMap}
                />
              </View>
            ) : (
              <View style={[styles.placeholder, styles.map]}>
                <ActivityIndicator size="large" />
                <Text style={globalStyles.h3}>Getting your location…</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text>{mapsError}</Text>
          </View>
        )}

        <View>
          <Text id="accuracy" style={styles.container}>
            {accuracy ? `GPS: Accurate to ${Math.round(accuracy)}m` : ' '}
          </Text>
          <Select
            id="countrySelect"
            required
            onChange={this.addSurveyData}
            label="Country"
            countrySelect
            placeholder="Select a country"
            field="country"
            value={this.getFieldValue(draft, 'country') || ''}
            detectError={this.detectError}
          />
          <TextInput
            id="postalCode"
            onChangeText={this.addSurveyData}
            field="postalCode"
            value={this.getFieldValue(draft, 'postalCode') || ''}
            placeholder="Postcode"
            detectError={this.detectError}
          />
          <TextInput
            id="houseDescription"
            onChangeText={this.addSurveyData}
            field="houseDescription"
            value={this.getFieldValue(draft, 'houseDescription') || ''}
            placeholder="Street or house description"
            validation="long-string"
            detectError={this.detectError}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Button
            id="continue"
            disabled={!!errorsDetected.length}
            colored
            text="Continue"
            handleClick={this.handleClick}
          />
        </View>
      </ScrollView>
    )
  }
}

Location.propTypes = {
  navigation: PropTypes.object.isRequired,
  addSurveyData: PropTypes.func.isRequired,
  drafts: PropTypes.array
}

const mapDispatchToProps = {
  addSurveyData
}

const mapStateToProps = ({ drafts }) => ({
  drafts
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: '100%'
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    paddingHorizontal: 16
  },
  fakeMarker: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    zIndex: 2,
    position: 'absolute',
    top: 7.5,
    right: 7.5,
    left: 7.5
  }
})
