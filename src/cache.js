import store from './redux/store'
import RNFetchBlob from 'rn-fetch-blob'
import { NetInfo } from 'react-native'
let dirs = RNFetchBlob.fs.dirs

export const getSurveys = () => store.getState().surveys

export const filterURLsFromSurveys = surveys => {
  const imageURLs = []
  surveys.forEach(survey => {
    Object.values(survey.survey_schema.properties)
      .filter(
        prop =>
          prop.type === 'array' &&
          prop.hasOwnProperty('items') &&
          prop.items.hasOwnProperty('enum')
      )
      .forEach(prop =>
        prop.items.enum
          .filter(item => item.url && item.url !== 'NONE')
          .forEach(item => imageURLs.push(item.url))
      )
  })
  return imageURLs
}

export const cacheImages = imageURLs => {
  imageURLs.forEach(source => {
    RNFetchBlob.fs
      .exists(`${dirs.DocumentDir}/${source.replace(/https?:\/\//, '')}`)
      .then(exist => {
        if (!exist) {
          RNFetchBlob.config({
            fileCache: true,
            appendExt: 'jpg',
            path: `${dirs.DocumentDir}/${source.replace(/https?:\/\//, '')}`
          })
            .fetch('GET', source)
            .then(() => {
              // image is cached
            })
        }
      })
  })
}

export const initImageCaching = () => {
  // check if online before caching
  NetInfo.isConnected.fetch().then(async online => {
    if (online) {
      const surveys = await getSurveys()
      const imageURLs = await filterURLsFromSurveys(surveys)
      cacheImages(imageURLs)
    }
  })
}
