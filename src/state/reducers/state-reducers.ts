import {
  stages,
  currentStageId,
  pocket,
  actors,
  messages,
  commandsHistory
} from '../initial-state'
import { createStore } from 'redux'
import * as AT from '../actions/action-types'
import * as PF from '../../features/domain/pocket-functions'
import * as R from 'ramda'
import Actor from '../../models/actor'
import Elem from '../../models/elem'
import Stage from '../../models/stage'
import CommandsHistory from '../../models/commandsHistory'
import * as L from '../../features/utils/lenses'

function reduceStages(stagesState: Stage[] = stages, action: any): Stage[] {
  switch (action.type) {
    case AT.NOTHING_CHANGE:
      return stagesState

    case AT.TAKE_ELEM_FROM_STAGE: {
      const { elem, currentStageId } = action
      return R.over(
        R.lensPath([currentStageId, 'elems']),
        R.filter((e: Elem) => e.name !== elem.name),
        stagesState
      )
    }

    case AT.PUT_ELEM_INTO_STAGE: {
      const { elem, currentStageId } = action
      const stages = R.over(
        R.lensPath([currentStageId, 'elems']),
        R.append(elem),
        stagesState
      )
      return stages
    }

    default:
      return stagesState
  }
}

function reduceCurrentStageId(
  state: number = currentStageId,
  action: any
): number {
  switch (action.type) {
    case AT.CHANGE_STAGE:
      const { nextStageId } = action
      return nextStageId

    default:
      return state
  }
}

function reducePocket(pocketState: Elem[] = pocket, action: any): Elem[] {
  switch (action.type) {
    case AT.PUT_ELEM_INTO_POCKET:
      const { elem } = action
      const pocket = PF.addElemTo(elem, pocketState)
      return pocket

    case AT.TAKE_ELEM_FROM_POCKET: {
      const { elem } = action
      const elemsWithDifferentNameTo = R.curry(
        (name: string, elem: Elem) => elem.name !== name
      )
      const pocket = R.filter(elemsWithDifferentNameTo(elem.name), pocketState)
      return pocket
    }

    default:
      return pocketState
  }
}

function reduceActors(actorState: Actor[] = actors, action: any): Actor[] {
  switch (action.type) {
    case AT.CHANGE_ACTOR_STAGE:
      const { stageId, actorId } = action
      const actors = R.map((el: Actor) => {
        if (el.id === actorId) return R.assoc('stageId', stageId, el)
        else return el
      }, actorState)
      return actors

    default:
      return actorState
  }
}

function reduceMessages(
  messagesState: string[] = messages,
  action: any
): string[] {
  switch (action.type) {
    case AT.ADD_MESSAGE:
      const { message } = action
      return R.append(message, messagesState)

    default:
      return messagesState
  }
}

function reduceCommandsHistory(
  commandsHistoryState: CommandsHistory = commandsHistory,
  action: any
): CommandsHistory {
  switch (action.type) {
    case AT.ADD_COMMAND:
      const { command } = action
      const commands = R.view(L.commandsLens, commandsHistoryState) as string[]
      const updatedCommands = R.prepend(command, commands)
      const updatedCommandHistoryState = R.set(
        L.commandsLens,
        updatedCommands,
        commandsHistoryState
      )
      return updatedCommandHistoryState

    case AT.SET_NEXT_COMMAND_HISTORY_POSITION:
      if (commandsHistoryState.position < commandsHistoryState.commands.length)
        return R.over(
          L.positionLens,
          position => position + 1,
          commandsHistoryState
        )
      else return R.over(L.positionLens, () => 0, commandsHistoryState)
    case AT.SET_PREVIOUS_COMMAND_HISTORY_POSITION:
      if (commandsHistoryState.position > 0)
        return R.over(
          L.positionLens,
          position => position - 1,
          commandsHistoryState
        )
      else
        return R.over(
          L.positionLens,
          () => commandsHistoryState.commands.length - 1,
          commandsHistoryState
        )

    default:
      return commandsHistoryState
  }
}

function reduceState(state: any = {}, action: any) {
  return {
    stages: reduceStages(state.stages, action),
    currentStageId: reduceCurrentStageId(state.currentStageId, action),
    pocket: reducePocket(state.pocket, action),
    actors: reduceActors(state.actors, action),
    messages: reduceMessages(state.messages, action),
    commandsHistory: reduceCommandsHistory(state.commandsHistory, action)
  }
}

const appStore = createStore(
  reduceState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export { appStore }
