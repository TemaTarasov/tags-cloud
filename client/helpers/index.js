export function isEmpty(value) {
  return value === null ||
    value === undefined ||
    value === '' ||
    (isArray(value) && !value.length) ||
    (isObject(value) && !Object.keys(value).length)
}

export function isObject(object) {
  return object && !isArray(object) && typeof object === 'object'
}

export function isArray(array) {
  return array && typeof array === 'object' && Array.isArray(array);
}

export function get(source, path, defaultValue) {
  if (path && source) {
    const parts = path.split('.');
    const length = parts.length;
    let result = source;

    for (let i = 0; i < length; i++) {
      const item = result[parts[i]];

      if (item === null || item === undefined) {
        return item || defaultValue;
      }

      result = item;
    }

    return result || defaultValue;
  }

  return defaultValue;
}

export function randomHEX() {
  const hex = '#' + Math.floor(Math.random() * 16777215).toString(16);

  return hex === '#ffffff'
    ? randomHEX()
    : hex;
}
