import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEFE1',
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
    color: '#7A756F'
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
    color: '#ffffff'
  },
  buttonGreen: {
    backgroundColor: '#50AA47',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    height: 48
  }
})
