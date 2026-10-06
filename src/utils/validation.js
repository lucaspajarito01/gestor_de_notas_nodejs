export function requiredText(value, label = 'El valor') {
  const text = value.trim();
  if (!text) throw new Error(`${label} es obligatorio.`);
  return text;
}

export function parseInteger(value, label, { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = {}) {
  const normalized = value.trim();
  if (!/^-?\d+$/.test(normalized)) throw new Error(`${label} debe ser un número entero.`);

  const number = Number(normalized);
  if (!Number.isSafeInteger(number) || number < min || number > max) {
    throw new Error(`${label} debe estar entre ${min} y ${max}.`);
  }
  return number;
}

export function parseDateTime(value, label = 'La fecha') {
  const normalized = value.trim();
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2}))?$/);
  if (!match) throw new Error(`${label} debe tener formato YYYY-MM-DD o YYYY-MM-DD HH:mm.`);

  const [, year, month, day, hour = '00', minute = '00'] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)));
  const valid = date.getUTCFullYear() === Number(year)
    && date.getUTCMonth() === Number(month) - 1
    && date.getUTCDate() === Number(day)
    && date.getUTCHours() === Number(hour)
    && date.getUTCMinutes() === Number(minute);
  if (!valid) throw new Error(`${label} no es una fecha y hora válida.`);

  return `${year}-${month}-${day} ${hour}:${minute}:00`;
}
