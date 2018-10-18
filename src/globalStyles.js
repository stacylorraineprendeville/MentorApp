import { Platform, StyleSheet } from 'react-native'
import colors from './theme.json'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palebeige
  },
  content: {
    padding: 25,
    paddingTop: 48
  },
  heading1: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: '600'
      },
      android: {
        fontFamily: 'Poppins SemiBold'
      }
    }),

    fontSize: 24
  },
  heading2: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: '500'
      },
      android: {
        fontFamily: 'Poppins Medium'
      }
    }),
    fontSize: 18,
    lineHeight: 26
  },
  heading3: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: '500'
      },
      android: {
        fontFamily: 'Poppins Medium'
      }
    }),
    fontSize: 16,
    lineHeight: 20
  },
  heading4: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: '500'
      },
      android: {
        fontFamily: 'Poppins Medium'
      }
    }),
    fontSize: 12
  },
  heading5: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: '500'
      },
      android: {
        fontFamily: 'Poppins Medium'
      }
    }),
    fontSize: 12,
    color: colors.lightdark
  },
  paragraph: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 21
  },
  subline: {
    fontFamily: 'Roboto',
    fontSize: 14,
    lineHeight: 20
  },
  tag: {
    fontFamily: 'Roboto',
    fontSize: 12
  },
  buttonText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Poppins',
        fontWeight: '600'
      },
      android: {
        fontFamily: 'Poppins SemiBold'
      }
    }),
    fontSize: 18,
    color: colors.white
  },
  buttonGreen: {
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    height: 48
  }
})
