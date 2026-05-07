export const DEFAULT_NAME_COLOR = 'blue';

export const NAME_COLOR_OPTIONS = [
  { value: 'blue', label: 'أزرق', hex: '#3b82f6' },
  { value: 'green', label: 'أخضر', hex: '#10b981' },
  { value: 'pink', label: 'زهري', hex: '#ec4899' },
];

export const NAME_COLOR_MAP = NAME_COLOR_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.hex;
  return acc;
}, {});

export const getNameColorHex = (nameColor) =>
  NAME_COLOR_MAP[nameColor] || NAME_COLOR_MAP[DEFAULT_NAME_COLOR];

export const getContrastTextColor = (hexColor) => {
  if (!hexColor) return '#000000';

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#000000' : '#ffffff';
};
