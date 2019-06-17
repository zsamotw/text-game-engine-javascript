const R = require('ramda')
const L = require('../utils/lenses')

const getRestOfCommand = command => R.view(L.restLens, command)

const nameEq = name => R.propEq('name', name)

const restCommandEqName = R.compose(
  nameEq,
  getRestOfCommand
)

const getElemEqualsToCommand = R.curry(
  (command, elems) =>
    R.find(restCommandEqName(command), elems)
)

module.exports = {
  restCommandEqName,
  getElemEqualsToCommand
}
