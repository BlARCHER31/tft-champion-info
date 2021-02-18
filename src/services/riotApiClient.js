import logger from 'loglevel'
import config from 'config'
import axios from 'axios'

class RiotAPiClient { 
    async getChampionJsonData(champion) {
        let response
        try {
            response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.latestPatchVersion}/data/en_US/champion/${champion}.json`)
            return this.transformChampionInfo(response.data.data)
        } catch(err) {
            logger.error(`There was a problem getting Champion Info: ${err.message}`)
            throw err
        }
    }
    async fetchLatestLolPatchVersion() {
        let response
        try {
          response = await axios.get(
            'https://ddragon.leagueoflegends.com/api/versions.json'
          )
        } catch (err) {
          logger.error(
            `An error occurred attempting to fetch the latest LOL patch version, ${err.message}`
          )
          throw err
        }
    
        const versions = response.data
        return versions[0]
      }

    async initialize() {
        try {
        const latestPatchVersion = await this.fetchLatestLolPatchVersion()
        this.latestPatchVersion = latestPatchVersion
        } catch (err) {
        logger.error(
            `An error ocurred attempting to fetch the latest patch version. ${err.message}`
        )
        throw err
        }
    }

    transformChampionInfo(championInfo) {
          for( let key in championInfo) {
            return {
              championName : key,
              championTitle: championInfo[key].title,
              championLore: championInfo[key].lore,

            }
          }
        
    }
}

export default new RiotAPiClient()