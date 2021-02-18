jest.mock('axios')
import mockAxios from 'axios'
import riotApiClient from './riotApiClient'

const log = require('loglevel')

describe('When fetching Champion info using the Champion\'s name, the Riot API Client', () => {
    
    beforeEach(() => {
        riotApiClient.latestPatchVersion = 1
    })
    
    test('The Riot API client returns a valid response', async () => {
        const champion = 'Aatrox'
        const mockedResponse = {data : { 
            data: {
                'Aatrox' : {
                    'lore': 'Blah blah blah',
                    'title': 'Mr. Aatrox'
                    }
                }
            }}
        const expectedResult = {
            championName : champion,
             championTitle: mockedResponse.data.data.Aatrox.title,
            championLore: mockedResponse.data.data.Aatrox.lore,
            championImage: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`,
        }

        mockAxios.get.mockResolvedValue(mockedResponse)
        
        const result = await riotApiClient.getChampionInfo(champion)
        expect(result).toEqual(expectedResult)

    })

    test('the right champion is being called', async () => {
        const champion = 'Aatrox'
        const url = `http://ddragon.leagueoflegends.com/cdn/1/data/en_US/champion/${champion}.json`
        

        await riotApiClient.getChampionInfo(champion)
        const options = mockAxios.get.mock.calls[0][0]

        expect(options).toEqual(url)

        
    })

    test('Riot API Client throws an error when the GET request Fails', async () => {
        log.disableAll()
        const champion = 'Aatrox'
        const errorMessage = 'No Champion Found'
        mockAxios.get.mockRejectedValue(new Error(errorMessage))

        await riotApiClient.getChampionInfo
        expect(riotApiClient.getChampionJsonData(champion)).rejects.toThrow(errorMessage)
    })
})

describe('When fetching the Champion\'s verious skin details, the Riot API Client', () => {
    
    beforeEach(() => {
        riotApiClient.latestPatchVersion = 1
    })
    
    test('The Riot API Client returns a valid response', async () => {
        const champion = 'Aatrox'
        const mockedResponse =  { data: 
            { data : {
                'Aatrox' : {
                    skins : [{
                        id : 1,
                        name: 'Aatrox',
                        num: 0,
                        },
                        {
                            id: 2,
                            name: 'Aatrox2',
                            num:1
                        }]
                    }
                }   
            }
        }
        const expectedResult = {championSkins: mockedResponse.data.data.Aatrox.skins.map(info => {
            return {
              skinId: info.id,
              skinName: info.name,
              skinNum: info.num,
              skinLoadingScreen: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${info.num}.jpg`
              }
            })
        }

        mockAxios.get.mockResolvedValue(mockedResponse)
    
        const result = await riotApiClient.getChampionSkins(champion)
        expect(result).toEqual(expectedResult)
    })

    test('the right champion is being called', async () => {
        const champion = 'Aatrox'
        const url = `http://ddragon.leagueoflegends.com/cdn/1/data/en_US/champion/${champion}.json`
        

        await riotApiClient.getChampionSkins(champion)
        const options = mockAxios.get.mock.calls[0][0]

        expect(options).toEqual(url)

        
    })

    test('Riot API Client throws an error when the GET request Fails', async () => {
        log.disableAll()
        const champion = 'Aatrox'
        const errorMessage = 'No Champion Found'
        mockAxios.get.mockRejectedValue(new Error(errorMessage))

        await riotApiClient.getChampionSkins
        expect(riotApiClient.getChampionJsonData(champion)).rejects.toThrow(errorMessage)
    })

})

describe('Fetching the latest patch version', () => {
    test('Returns the latest patch version', async () => {
      mockAxios.get.mockResolvedValue({ data: ['11.1.1', '10.1.2', '9.2.1'] })
  
      expect(await riotApiClient.fetchLatestLolPatchVersion()).toBe('11.1.1')
    })
  
    test('Riot API Client throws an error when the GET request fails.', async () => {
      log.disableAll()
      expect.assertions(1)
  
      const errorMessage = 'API Key out of date.'
      mockAxios.get.mockImplementation(() => {
        throw new Error(errorMessage)
      })
  
      await expect(riotApiClient.fetchLatestLolPatchVersion()).rejects.toThrow(
        new Error(errorMessage)
      )
    })
  })

  describe('Retrieving the patch version JSON and return the latest.', () => {
  
    test('Retrieves and returns the lates Lol Patch Version', async () => {
      const mockedResponse = '11.1.1'
      mockAxios.get.mockResolvedValue({ data: ['11.1.1', '10.1.2', '9.2.1'] })
      
      await riotApiClient.initialize()
      expect(riotApiClient.latestPatchVersion).toEqual(mockedResponse)
    })
  
    test('The Riot Api Client throws an error when the GET request fails.', async () => {
      log.disableAll()
      expect.assertions(1)
      const errorMessage = 'API Key out of date'
  
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage))
      )
      await expect(riotApiClient.initialize()).rejects.toThrow(errorMessage)
    })
  })
