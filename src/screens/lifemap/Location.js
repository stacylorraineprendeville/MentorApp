import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import globalStyles from '../../globalStyles'

export default class Location extends Component {
  state = {
    latitude: null,
    longitude: null,
    error: null
  }
  getDeviceLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
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
    const { latitude, longitude } = this.state
    return latitude ? (
      <View style={styles.container}>
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
          <Marker coordinate={{ latitude, longitude }} title="You are here" />
        </MapView>
      </View>
    ) : (
      <View style={[styles.placeholder, styles.map]}>
        <ActivityIndicator size="large" />
        <Text style={globalStyles.h3}>Getting your location…</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: 300,
    width: '100%'
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
