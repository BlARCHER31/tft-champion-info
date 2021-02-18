import logger from 'loglevel'
import axios from 'axios'

class RiotAPiClient { 

  async getChampionInfo(champion) {
    try{
      let championInfo = await this.getChampionJsonData(champion)
      for( let key in championInfo) { 
          return {
            championName : key,
            championTitle: championInfo[key].title,
            championLore: championInfo[key].lore,
            championImage: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`,
          }
        }
      } catch(err) {
          logger.error(`There was a problem getting the Champion's skins: ${err.message}`)
        }
    }

    async getChampionSkins(champion){
      try{
        let championInfo = await this.getChampionJsonData(champion)
        for( let key in championInfo) { 
          return { championSkins: championInfo[key].skins.map(info => {
            return {
              skinId: info.id,
              skinName: info.name,
              skinNum: info.num,
              skinLoadingScreen: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${info.num}.jpg`
              }
            })
          }
        }
      } catch(err) {
        logger.error(`There was a problem getting the Champion's skins: ${err.message}`)
      }

    }

    async getChampionJsonData(champion) {
        let response
        try {
            response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.latestPatchVersion}/data/en_US/champion/${champion}.json`)
            return response.data.data
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

    
}

export default new RiotAPiClient()