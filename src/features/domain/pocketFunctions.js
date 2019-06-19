const R = require('ramda')
const SF = require('./stagesFunctions')
const GH = require('../helpers/genericHelper')
const L = require('../utils/lenses')

const maxPocketSize = 2

const getPocket = R.view(L.pocketLens)

const isPlaceInPocket = state => getPocket(state).length < maxPocketSize

const addElemToPocket = (elem, state) => {
  const elemsInCurrentStage = SF.getElemsForCurrentStage(state)
  const elemsAfterTakeElem = R.filter(GH.notEqualNameTo(GH.nameOf(elem)))(
    elemsInCurrentStage
  )

  const stagesAfterTakeElem = GH.updateIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    elemsAfterTakeElem
  )

  const pocket = getPocket(state)
  const addElemTo = R.append(elem)

  const swapElemFromStageToPocket = state => {
    const stateAfterTakeElemFromStage = R.set(
      L.stagesLens,
      stagesAfterTakeElem,
      state
    )
    const stateAfterPutElemInPocket = R.set(
      L.pocketLens,
      addElemTo(pocket),
      stateAfterTakeElemFromStage
    )
    return stateAfterPutElemInPocket
  }

  return swapElemFromStageToPocket(state)
}

const putElemToStage = (elem, state) => {
  const addElemToElemsInCurrentStage = R.compose(
    R.append(elem),
    SF.getElemsForCurrentStage
  )

  const stagesAfterPutElem = GH.updateIterable(
    SF.getStages(state),
    SF.getCurrentStageId(state),
    'elems',
    addElemToElemsInCurrentStage(state)
  )

  const pocket = getPocket(state)
  const takeElemFrom = R.filter(GH.notEqualNameTo(GH.nameOf(elem)))

  const swapElemFromPocketToStage = state => {
    const stateAfterPutElemInStage = R.set(
      L.stagesLens,
      stagesAfterPutElem,
      state
    )
    const stateAfterTakeElemFromPocket = R.set(
      L.pocketLens,
      takeElemFrom(pocket),
      stateAfterPutElemInStage
    )
    return stateAfterTakeElemFromPocket
  }

  return swapElemFromPocketToStage(state)
}

module.exports = {
  getPocket,
  isPlaceInPocket,
  maxPocketSize,
  addElemToPocket,
  putElemToStage
}
