import { GoldUnitList, getUnitIndex } from './unit'
/**
 * 精度
 * 1000e4
 * 超过数量级则不进行加减计算
 */
const limit = 4
/**保留三位小数 */
const dmax = 3

interface IFGoldObj {
  goldUnit: number
  goldValue: number
}

export default class Gold {
  public goldUnit: number // 单位索引
  public goldValue: number // 值
  constructor(value: number | string, unit?: number) {
    if (typeof value == 'string') {
      const m = this.strFormat(value)
      value = m.goldValue
      unit = m.goldUnit
    }
    const { goldUnit, goldValue } = this.parse(value, unit)
    this.goldUnit = goldUnit
    this.goldValue = goldValue
  }
  strFormat(str: string): IFGoldObj {
    const goldValue = parseFloat(str)
    const unitStr = str.replace(String(goldValue), '')
    const goldUnit = getUnitIndex(unitStr)
    return { goldValue, goldUnit }
  }
  getGold(): string {
    const valStr = String(this.goldValue)
    let small = valStr.split('.')[1]
    let result = ''
    if (small && small.length > dmax) {
      result = parseInt(valStr) + '.' + small.slice(0, dmax)
    } else {
      result = valStr
    }
    return this.goldUnit ? result + GoldUnitList[this.goldUnit] : result
  }
  parse(value: number, unit = 0): IFGoldObj {
    let goldValue = value
    let goldUnit = unit
    if (!goldUnit) {
      return { goldUnit, goldValue }
    }
    // 值大于500  进一位
    while (goldValue > 500 && goldUnit < 30) {
      goldUnit++
      goldValue /= 1000
    }
    // 值大于0 小于 1 且 拥有金币单位  退一位
    while (goldValue > 0 && goldValue < 1 && goldUnit > 0) {
      goldUnit--
      goldValue *= 1000
    }
    return { goldUnit, goldValue }
  }
  /**加 */
  add(B: Gold) {
    const A = this
    let tempUnit = 0
    let tempValue = 0
    if (A.goldUnit == B.goldUnit) {
      tempUnit = A.goldUnit
      tempValue = A.goldValue + B.goldValue
    } else if (A.goldUnit > B.goldUnit) {
      if (A.goldUnit - B.goldUnit <= limit) {
        tempUnit = A.goldUnit
        tempValue =
          A.goldValue + B.goldValue / Math.pow(1000, A.goldUnit - B.goldUnit)
      } else if (A.goldUnit - B.goldUnit > limit) {
        tempUnit = A.goldUnit
        tempValue = A.goldValue
      }
    } else if (A.goldUnit < B.goldUnit) {
      if (B.goldUnit - A.goldUnit <= limit) {
        tempUnit = B.goldUnit
        tempValue =
          A.goldValue / Math.pow(1000, B.goldUnit - A.goldUnit) + B.goldValue
      } else if (B.goldUnit - A.goldUnit > limit) {
        tempUnit = B.goldUnit
        tempValue = B.goldValue
      }
    }
    return new Gold(tempValue, tempUnit)
  }
  /**减 */
  min(B: Gold) {
    const A = this
    let tempUnit = 0
    let tempValue = 0
    if (A.goldUnit == B.goldUnit) {
      tempUnit = A.goldUnit
      tempValue = A.goldValue - B.goldValue
      if (tempValue == 0) {
        tempUnit = 0
      }
    } else if (A.goldUnit > B.goldUnit) {
      if (A.goldUnit - B.goldUnit <= limit) {
        tempUnit = A.goldUnit
        tempValue =
          A.goldValue - B.goldValue / Math.pow(1000, A.goldUnit - B.goldUnit)
      } else if (A.goldUnit - B.goldUnit > limit) {
        tempUnit = A.goldUnit
        tempValue = A.goldValue
      }
    } else if (A.goldUnit < B.goldUnit) {
      if (B.goldUnit - A.goldUnit <= limit) {
        tempUnit = B.goldUnit
        tempValue =
          A.goldValue / Math.pow(1000, B.goldUnit - A.goldUnit) - B.goldValue
      } else if (B.goldUnit - A.goldUnit > limit) {
        tempUnit = B.goldUnit
        tempValue = -B.goldValue
      }
    }
    return new Gold(tempValue, tempUnit)
  }
  /**乘 */
  tim(B: Gold) {
    const A = this
    let tempUnit = A.goldUnit + B.goldUnit
    let tempValue = A.goldValue * B.goldValue
    return new Gold(tempValue, tempUnit)
  }
  /**除 */
  div(B: Gold) {
    const A = this
    let tempUnit = A.goldUnit - B.goldUnit
    let tempValue = A.goldValue / B.goldValue
    return new Gold(tempValue, tempUnit)
  }
}
