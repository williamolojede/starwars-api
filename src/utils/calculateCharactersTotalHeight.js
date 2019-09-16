export const calculateCharactersTotalHeight = (characters) => {
  const totalHeight = characters.reduce((acc, cur) => {
    // the height of some charactes are "unknown" so after beign converted
    // to number(in formatCharacter()) it would be null, so use 0 for those
    return acc + (cur.height ? cur.height : 0)
  }, 0);
  const totalHeightToFoot = totalHeight / (12 * 2.54);

  return {
    cm: `${totalHeight}cm`,
    'ft_in': `${Math.floor(totalHeightToFoot)}ft and ${((totalHeightToFoot % 1) * 12).toFixed(2)}inches`,
  }
}
