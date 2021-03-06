import * as S from 'sanctuary'
import * as SF from './stage-functions'
import Doors from '../../models/doors'
import Stage from '../../models/stage'
import { getRandomInt } from './general-usage-functions'
import { Maybe } from '../../features/utils/types'
const { size } = require('sanctuary')

const maybeDoorsOf: (maybeStage: Maybe<Stage>) => Maybe<Doors> = maybeStage =>
  S.map((stage: Stage) => SF.doorsOf(stage))(maybeStage) as Maybe<Doors>

const getRandomWayOut = (maybeDoors: Maybe<Doors>) => {
  const maybeIdOfNextStageFrom = S.ifElse(S.isNothing)(() => S.isNothing)(
    justDoors => {
      const stageIdToGo = S.pipe([
        openedDoors,
        S.map(size),
        S.map(getRandomInt)
      ])
      return stageIdToGo(justDoors)
    }
  )
  return maybeIdOfNextStageFrom(maybeDoors)
}

const maybeDoorsForStage = (stages: Stage[]) =>
  S.compose(maybeDoorsOf)(SF.maybeStage(stages))

const openedDoors = (maybeDoors: Maybe<Doors>) => {
  const openedDoorsOf = S.ifElse(S.isNothing)(() => S.Nothing)(justDoors => {
    const doors = S.maybeToNullable(justDoors)
    const maybesOfStagesIds = S.values(doors as any)
    const justStagesIds = S.pipe([S.filter(S.isJust), S.sequence(S.Maybe)])

    return justStagesIds(maybesOfStagesIds)
  })
  return openedDoorsOf(maybeDoors)
}

const openedDoorsForStage = (stages: Stage[]) =>
  S.compose(openedDoors)(maybeDoorsForStage(stages))

export {
  maybeDoorsOf,
  openedDoors,
  maybeDoorsForStage,
  openedDoorsForStage,
  getRandomWayOut
}
