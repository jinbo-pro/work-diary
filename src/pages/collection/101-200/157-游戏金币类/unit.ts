const keyList = [...'abcdefghijklmnopqrstuvwxyz']

/**单位列表 */
export const GoldUnitList = ['N', 'K', 'M', 'B', 'T']
for (let a of keyList) {
  for (let b of keyList) {
    GoldUnitList.push(a + b)
  }
}
/**获取单位索引值 */
export function getUnitIndex(unit: string) {
  const index = GoldUnitList.findIndex((e) => e === unit)
  return index == -1 ? 0 : index
}
