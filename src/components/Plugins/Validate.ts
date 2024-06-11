export class Validate {
  static validateReaction = (target: any): target is reaction => {
    if (typeof target === 'object' && 'roomID' in target && 'reactionID' in target) {
      return true
    }
    return false
  }
  static validateSection = (target: any): target is section => {
    /*
    if (!(typeof target === 'object')) {
      console.log('not object')
    } else if (!('roomID' in target)) {
      console.log('not roomID')
    } else if (!('sectionID' in target)) {
      console.log('not sectionID')
    } else {
      return true
    }
    return false
    */
    if (typeof target !== 'object') return false
    else if (!('sectionID' in target)) {
      return false
    }
    return true
  }
}
