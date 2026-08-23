import { describe, expect, it } from 'vitest'

import { formatSelectionByDefault, formatSendingBody } from './formatPayload'

const createSelection = (overrides = {}) => ({
    paroi: 'PL WRU',
    finitionParoi: '4',
    verre: 'Verre clair',
    sizeParoi: 1000,
    montage: 'angle',
    receveur: 'RECEVEUR-1',
    textureReceveur: 'Soft White',
    sizeReceveur: 1600,
    finitionProfile: '4',
    niche: null,
    finitionNiche: null,
    vipanelLeft: 'Z2',
    vipanelNiche: 'X4',
    vipanelRight: 'X4',
    ...overrides,
})

const createConfiguratorData = (overrides = {}) => ({
    parois: [
        {
            id: 'PL WRU',
            finitionsDisponibles: [{ code: '4' }, { code: '7' }],
            verresDisponibles: ['Verre clair'],
        },
    ],
    receveurs: [
        {
            id: 'RECEVEUR-1',
            finitionsDisponibles: ['Soft Grey', 'Soft White'],
        },
    ],
    vipanels: [
        { id: 'VIPANEL-1', decor: 'Z2' },
        { id: 'VIPANEL-2', decor: 'X4' },
    ],
    niches: [
        {
            id: 'NICHE-1',
            finitionsDisponibles: ['Noir'],
        },
    ],
    profiles: [
        {
            id: 'PROFILE-1',
            finitionsDisponibles: ['4'],
        },
    ],
    ...overrides,
})

describe('formatSendingBody', () => {
    it('adds the second shower screen for an angle installation', () => {
        const result = formatSendingBody(createSelection())

        expect(result.parois).toEqual([
            { modele: 'PL WRU', largeur: 1000 },
            { modele: 'PL TWU', largeur: 1000 },
        ])
    })

    it('keeps only the selected shower screen for a niche installation', () => {
        const result = formatSendingBody(
            createSelection({ montage: 'niche' })
        )

        expect(result.parois).toEqual([
            { modele: 'PL WRU', largeur: 1000 },
        ])
    })

    it('sends the selected niche finish when a niche is enabled', () => {
        const result = formatSendingBody(
            createSelection({ niche: 'NICHE-1', finitionNiche: 'Noir' })
        )

        expect(result.finition_niche).toBe('Noir')
        expect(result.largeur_niche).toBe(910)
    })

    it('sends None when no complete niche selection exists', () => {
        const result = formatSendingBody(
            createSelection({ niche: 'NICHE-1', finitionNiche: null })
        )

        expect(result.finition_niche).toBe('None')
        expect(result.largeur_niche).toBe('None')
    })

    it('sends None when no profile finish is selected', () => {
        const result = formatSendingBody(
            createSelection({ finitionProfile: null })
        )

        expect(result.finition_profile).toBe('None')
    })
})

describe('formatSelectionByDefault', () => {
    it('creates the expected initial selection from configurator data', () => {
        const result = formatSelectionByDefault(createConfiguratorData())

        expect(result).toMatchObject({
            paroi: 'PL WRU',
            finitionParoi: '4',
            verre: 'Verre clair',
            sizeParoi: 1000,
            sizeReceveur: 1600,
            receveur: 'RECEVEUR-1',
            textureReceveur: 'Soft White',
            vipanelLeft: 'Z2',
            vipanelRight: 'X4',
            vipanelNiche: 'X4',
            niche: 'NICHE-1',
            finitionNiche: 'Noir',
            profile: 'PROFILE-1',
            finitionProfile: '4',
            montage: 'angle',
        })
    })
})
