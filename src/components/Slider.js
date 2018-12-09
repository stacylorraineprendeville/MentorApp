import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Image from './CachedImage'
import colors from '../theme.json'
import globalStyles from '../globalStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'

const slideColors = {
  1: 'red',
  2: 'gold',
  3: 'green'
}

class Slider extends Component {
  state = {
    selectedColor: colors.green
  }

  render() {
    console.log(this.props.value)
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: 850,
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          ref={comp => {
            this._scrollView = comp
          }}
        >
          {this.props.slides.map((slide, i) => (
            <TouchableOpacity
              onPress={() => {
                this.props.selectAnswer(slide.value)
                this.setState({
                  selectedColor: colors[slideColors[slide.value]]
                })
              }}
              key={i}
              style={{
                ...styles.slide,
                backgroundColor: colors[slideColors[slide.value]]
              }}
            >
              <Image source={slide.url} style={styles.image} />
              <Text
                style={{
                  ...globalStyles.p,
                  ...styles.text,
                  color: slide.value === 'YELLOW' ? '#000' : colors.white
                }}
              >
                {slide.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {this.props.value ? (
          <View style={styles.nav}>
            <View
              id="icon-view"
              style={{
                ...styles.iconBig,
                backgroundColor: colors[slideColors[this.props.value]]
              }}
            >
              <Icon name="done" size={56} color={colors.white} />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    )
  }
}

Slider.propTypes = {
  slides: PropTypes.array.isRequired,
  value: PropTypes.number,
  selectAnswer: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  slide: {
    width: 270
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    padding: 15,
    paddingBottom: 25
  },
  image: {
    width: 270,
    height: 180,
    marginTop: 15
  },
  iconBig: {
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 32,
    marginRight: 32,
    borderColor: colors.white,
    borderWidth: 3
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -18
  }
})

export default Slider
