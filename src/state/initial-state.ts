import Actor from '../models/actor'
import Doors from '../models/doors'
import Element from '../models/element'
import Stage from '../models/stage'
import CommandsHistory from '../models/commandsHistory'
import * as S from 'sanctuary'

const stages: Stage[] = [
  {
    id: 0,
    name: 'kitchen.',
    description:
      'kitchen, kitchen, och kitchen...Dirty table, two chairs  and one door.',
    elements: [
      {
        name: 'knife',
        description: 'very sharp knife.'
      } as Element,
      {
        name: 'flower',
        description: 'green flower which needs water.'
      } as Element
    ],
    doors: {
      north: S.Just(2),
      south: S.Nothing,
      west: S.Just(1),
      east: S.Nothing
    } as Doors
  } as Stage,
  {
    id: 1,
    name: 'living room',
    description:
      'Huge room with nothing. One sofa. There are one door to kichen. You can go there.',
    elements: [
      {
        name: 'newspaper',
        description:
          'It is Gazeta Wyborcza with articele about Tomasz is Great!!!'
      } as Element,
      {
        name: 'hammer',
        description: 'black hammer'
      } as Element
    ],
    doors: {
      north: S.Nothing,
      south: S.Nothing,
      west: S.Nothing,
      east: S.Just(0)
    } as Doors
  } as Stage,
  {
    id: 2,
    name: 'Bathroom',
    description: 'Just Bathroom.',
    elements: [
      {
        name: 'soap',
        description: 'Red soap.'
      } as Element
    ],
    doors: {
      north: S.Nothing,
      south: S.Just(0),
      west: S.Nothing,
      east: S.Nothing
    } as Doors
  } as Stage
]

const currentStageId: number = 0

const pocket: Element[] = []

const actors: Actor[] = [
  {
    id: 1,
    name: 'tomasz',
    description: 'It is tomasz',
    knowledge: 'halo it is Tomasz',
    interval: 2,
    stageId: 2
  } as Actor,
  {
    id: 2,
    name: 'antonina',
    description: 'It is antonina',
    knowledge: 'halo it is Antonina',
    interval: 1,
    stageId: 1
  } as Actor
]

const messages: string[] = []

const commandsHistory = {
  command: '',
  commands: [],
  position: 0
} as CommandsHistory

const settings = {
  maxPocketSize: 2,
  commands: [
    'look at',
    'look',
    'take',
    'put',
    'talk to',
    'talk with',
    'pocket',
    'go'
  ],
  minStringDistance: 0.7
}

export {
  stages,
  currentStageId,
  pocket,
  actors,
  messages,
  commandsHistory,
  settings
}
