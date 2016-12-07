import Container from './container'

export default function () {
  return {
    getComponent(nextState, next) {
      next(null, Container)
    },
  }
}
