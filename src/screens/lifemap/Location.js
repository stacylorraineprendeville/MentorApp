import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import MapView, { Marker } from 'react-native-maps'
import globalStyles from '../../globalStyles'
import SearchBar from '../../components/SearchBar'
import CountrySelect from '../../components/CountrySelect'

export default class Location extends Component {
  state = {
    latitude: null,
    longitude: null,
    accuracy: null,
    postcode: '',
    houseDescription: '',
    searchAddress: '',
    errorsDetected: [],
    country: null
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
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    )
  }
  detectError = (error, field) => {
    if (error && !this.state.errorsDetected.includes(field)) {
      this.setState({ errorsDetected: [...this.state.errorsDetected, field] })
    } else
      this.setState({
        errorsDetected: this.state.errorsDetected.filter(item => item !== field)
      })
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
  componentDidMount() {
    this.getDeviceLocation()
  }
  render() {
    const {
      latitude,
      longitude,
      accuracy,
      postcode,
      houseDescription,
      searchAddress
    } = this.state

    return (
      <ScrollView contentContainerStyle={globalStyles.background}>
        {latitude ? (
          <View>
            <SearchBar
              id="searchAddress"
              style={styles.search}
              placeholder="Search by street or postal code"
              onChangeText={searchAddress => this.setState({ searchAddress })}
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
            >
              <Marker
                draggable
                coordinate={{ latitude, longitude }}
                onDragEnd={e =>
                  this.setState({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                  })
                }
                title="You are here"
              />
            </MapView>
          </View>
        ) : (
          <View style={[styles.placeholder, styles.map]}>
            <ActivityIndicator size="large" />
            <Text style={globalStyles.h3}>Getting your location…</Text>
          </View>
        )}
        <View>
          <Text id="accuracy" style={styles.container}>
            {accuracy ? `GPS: Accurate to ${Math.round(accuracy)}m` : ' '}
          </Text>
          <CountrySelect
            onChange={country =>
              this.setState({
                country
              })
            }
          />
          <TextInput
            id="postcode"
            onChangeText={postcode => this.setState({ postcode })}
            field="postcode"
            value={postcode}
            placeholder="Postcode"
            detectError={this.detectError}
          />
          <TextInput
            id="houseDescription"
            onChangeText={houseDescription =>
              this.setState({ houseDescription })
            }
            field="houseDescription"
            value={houseDescription}
            placeholder="Street or house description"
            validation="long-string"
            detectError={this.detectError}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Button
            disabled={!!this.state.errorsDetected.length}
            colored
            text="Continue"
            handleClick={() => this.handleClick()}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: '100%'
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    paddingHorizontal: 16
  },
  search: {
    zIndex: 2,
    position: 'absolute',
    top: 7.5,
    right: 7.5,
    left: 7.5
  }
})
