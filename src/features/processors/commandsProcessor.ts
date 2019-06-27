import * as R from 'ramda'
import * as RH from '../helpers/resultHelper'
import State from '../../models/state'
import Command from '../../models/command'

// processCommandAndGetResult :: String -> State -> Result
const processCommandAndGetResult: (
  command: Command,
  state: State
) => any = R.cond([
  [
    (command, state) => R.equals(R.prop('order', command), 'Look'),
    (command, state) => RH.getOverviewResult(state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'LookAt'),
    (command, state) => RH.getDescriptionResult(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Go'),
    (command, state) => RH.getChangeStageResult(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Take'),
    (command, state) => RH.getTakenElemResult(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Put'),
    (command, state) => RH.getPutElemResult(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Pocket'),
    (command, state) => RH.getPocketResult(command, state)
  ],
  [
    (command, state) => R.equals(R.prop('order', command), 'Undefined'),
    (command, state) => RH.getUndefinedResult(command, state)
  ],
  [R.T, (command, state) => 'Errorrrr!!!']
])

export { processCommandAndGetResult }