jest.mock('../services/riotApiClient')
import mockRiotApiClient from '../services/riotApiClient'

import { handleGetChampionInfo, handleGetChampionSkins } from './tftRoutes'

describe('When fetching champion info from the riotApiClient, the tft Route handler', () => {
    let req = {}
    const mockJson = jest.fn(() => {})
    const mockSend = jest.fn(() => {})
    let res = { json: mockJson, send: mockSend }
    const mockStatus = jest.fn(() => {
        return res
        })
    res.status = mockStatus

    beforeEach(() => {
        req.params = {}
    })

    test('sends champion info to the caller', async () => {
        req.params.champion = 'Aatrox'
        await handleGetChampionInfo(req, res)

        expect(mockSend).toHaveBeenCalledTimes(1)
    })
    
    test('The handler is called with the correct Route Parameter', async () => {
        req.params.champion = 'Aatrox'
        await handleGetChampionInfo(req, res)

        expect(mockRiotApiClient.getChampionInfo).toHaveBeenCalledWith('Aatrox')
    })

    test('the handler throws an error', async () => {
        req.params.champion = 'Aatrox'
        mockRiotApiClient.getChampionInfo.mockImplementation(() => {
            throw new Error('Champion not found')
        })
        await handleGetChampionInfo(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
    })

    
})

describe('When fetching champion skins from the riotApiClient, the tft Route handler', () => {
    let req = {}
    const mockJson = jest.fn(() => {})
    const mockSend = jest.fn(() => {})
    let res = { json: mockJson, send: mockSend }
    const mockStatus = jest.fn(() => {
        return res
        })
    res.status = mockStatus

    beforeEach(() => {
        req.params = {}
    })

    test('sends champion info to the caller', async () => {
        req.params.champion = 'Aatrox'
        await handleGetChampionSkins(req, res)

        expect(mockSend).toHaveBeenCalledTimes(1)
    })
    
    test('The handler is called with the correct Route Parameter', async () => {
        req.params.champion = 'Aatrox'
        await handleGetChampionSkins(req, res)

        expect(mockRiotApiClient.getChampionSkins).toHaveBeenCalledWith('Aatrox')
    })

    test('the handler throws an error', async () => {
        req.params.champion = 'Aatrox'
        mockRiotApiClient.getChampionSkins.mockImplementation(() => {
            throw new Error('Champion not found')
        })
        await handleGetChampionSkins(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
    })

    
})