import content from './content'

export default function () {
  return {
    getComponent(nextState: any, next: any) {
      next(null, {content})
    },
  }
}
