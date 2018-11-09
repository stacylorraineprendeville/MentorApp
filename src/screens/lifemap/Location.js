import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import globalStyles from '../../globalStyles'

export default class Location extends Component {
  state = {
    latitude: null,
    longitude: null,
    accuracy: null
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
    const { latitude, longitude, accuracy } = this.state
    return (
      <ScrollView style={globalStyles.background}>
        {latitude ? (
          <View>
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
          <Text>
            {accuracy ? `GPS: Accurate to ${Math.round(accuracy)}m` : ' '}
          </Text>
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
    marginTop: 3,
    paddingHorizontal: 16
  }
})
