import store from './redux/store'
import RNFetchBlob from 'rn-fetch-blob'
import { NetInfo } from 'react-native'
let dirs = RNFetchBlob.fs.dirs

export const getSurveys = () => store.getState().surveys
export let isInProgress = false
let isOnline = true

NetInfo.addEventListener('connectionChange', () => {
  NetInfo.isConnected.fetch().then(connection => {
    isOnline = connection
    if (connection) {
      initImageCaching()
    }
  })
})

export const filterURLsFromSurveys = surveys => {
  const imageURLs = []
  surveys.forEach(survey =>
    survey.surveyStoplightQuestions.forEach(question =>
      question.stoplightColors.forEach(color => imageURLs.push(color.url))
    )
  )
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
        if (!exist && isOnline) {
          RNFetchBlob.config({
            fileCache: true,
            appendExt: 'jpg',
            path: `${dirs.DocumentDir}/${source.replace(/https?:\/\//, '')}`
          })
            .fetch('GET', source)
            .then(() => {
              // image is cached
            })
            .catch(() => {})
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
