import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import globalStyles from '../../globalStyles'
import SearchBar from '../../components/SearchBar'

export default class Location extends Component {
  state = {
    latitude: null,
    longitude: null,
    accuracy: null,
    postcode: '',
    houseDescription: '',
    searchAddress: ''
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
      <ScrollView style={[globalStyles.background, styles.view]}>
        {latitude ? (
          <View>
            <SearchBar
              id="searchAddress"
              style={styles.search}
              placeholder="Search by street or postal code"
              onChangeText={searchAddress => this.setState({ searchAddress })}
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
        <View style={styles.container}>
          <Text id="accuracy">
            {accuracy ? `GPS: Accurate to ${Math.round(accuracy)}m` : ' '}
          </Text>
          <TextInput
            id="postcode"
            placeholder="Postcode"
            onChangeText={postcode => this.setState({ postcode })}
            value={postcode}
          />
          <TextInput
            id="houseDescription"
            placeholder="Street or house description"
            onChangeText={houseDescription =>
              this.setState({ houseDescription })
            }
            value={houseDescription}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  map: {
    height: 300,
    width: '100%'
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    marginTop: 3,
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
