import { calculateCharactersTotalHeight } from '../../src/utils/calculateCharactersTotalHeight';

describe('Calculate Characters Total Height', () => {
  it('should return the correct value in cm and ft/inches', () => {
    const characters = [
      { height: '20' },
      { height: '15' },
      { height: '30' },
    ]
    const totalHeight = calculateCharactersTotalHeight(characters)
    expect(totalHeight.cm).toBe('65cm');
    expect(totalHeight['ft_in']).toBe('2ft and 1.59inches');
  })
})

