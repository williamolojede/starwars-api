export const calculateCharactersTotalHeight = (characters) => {
  const totalHeight = characters
    .reduce((acc, cur) =>  acc + Number(cur.height), 0);
  const totalHeightToFoot = totalHeight / (12 * 2.54);

  return {
    cm: `${totalHeight}cm`,
    'ft_in': `${Math.floor(totalHeightToFoot)}ft and ${((totalHeightToFoot % 1) * 12).toFixed(2)}inches`,
  }
}
