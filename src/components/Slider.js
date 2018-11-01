import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import colors from '../theme.json'
import globalStyles from '../globalStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'

const slideColors = {
  RED: 'red',
  YELLOW: 'gold',
  GREEN: 'green'
}

class Slider extends Component {
  state = {
    selectedColor: colors.green
  }
  render() {
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
              <Image source={{ uri: slide.url }} style={styles.image} />
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
        <View style={styles.nav}>
          <View
            style={{
              ...styles.iconBig,
              backgroundColor: this.state.selectedColor
            }}
          >
            <Icon name="done" size={56} color={colors.white} />
          </View>
        </View>
      </View>
    )
  }
}

Slider.propTypes = {
  slides: PropTypes.array.isRequired,
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
    backgroundColor: colors.green,
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
  iconSmall: {
    backgroundColor: colors.white,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -18
  }
})

export default Slider
