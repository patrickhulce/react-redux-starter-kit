import content from './content'

export default function () {
  return {
    getComponent(nextState, next) {
      next(null, {content})
    },
  }
}
