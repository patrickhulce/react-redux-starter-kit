import Container from './container'

export default function (store) {
  return {
    getComponent(nextState, next) {
      next(null, Container)
    },
  }
}
