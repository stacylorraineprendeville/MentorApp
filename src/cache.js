import store from './redux/store'
import RNFetchBlob from 'rn-fetch-blob'
import { NetInfo } from 'react-native'
let dirs = RNFetchBlob.fs.dirs

export const getSurveys = () => store.getState().surveys
export let isInProgress = false
let isOnline = true

NetInfo.addEventListener('connectionChange', () => {
  NetInfo.isConnected.fetch().then(connetction => {
    isOnline = connetction
  })
})

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

export const cacheImages = async imageURLs => {
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      // break loop if offline
      if (!isOnline) {
        break
      }
      await callback(array[index], index, array)
    }
  }

  await asyncForEach(imageURLs, async source => {
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
  isInProgress = false
}

export const initImageCaching = () => {
  isInProgress = true
  // check if online before caching
  NetInfo.isConnected.fetch().then(async online => {
    if (online) {
      const surveys = await getSurveys()
      const imageURLs = await filterURLsFromSurveys(surveys)
      cacheImages(imageURLs)
    }
  })
}
