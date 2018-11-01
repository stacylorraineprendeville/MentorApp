import store from './redux/store'
import RNFetchBlob from 'rn-fetch-blob'
import { NetInfo } from 'react-native'
let dirs = RNFetchBlob.fs.dirs

export const cacheImages = () => {
  // check if online before caching
  NetInfo.isConnected.fetch().then(online => {
    if (online) {
      const arr = []
      store.getState().surveys.forEach(survey => {
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
              .forEach(item => arr.push(item.url))
          )
      })

      arr.forEach(source => {
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
  })
}
