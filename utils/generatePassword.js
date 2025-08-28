// utils/generatePassword.js

// --- наборы символов ---
const CYRILLIC_LOWER = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const CYRILLIC_UPPER = CYRILLIC_LOWER.toUpperCase();
const LATIN_LOWER = "abcdefghijklmnopqrstuvwxyz";
const LATIN_UPPER = LATIN_LOWER.toUpperCase();
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>/?~`";

// --- утилиты для случайности ---
function _getRandomInt(max) {
    // Пытаемся использовать криптографически безопасный генератор, если доступен.
    try {
        const cryptoObj = (typeof global !== "undefined" && global.crypto) ||
            (typeof window !== "undefined" && window.crypto) ||
            (typeof self !== "undefined" && self.crypto);
        if (cryptoObj && cryptoObj.getRandomValues) {
            const arr = new Uint32Array(1);
            cryptoObj.getRandomValues(arr);
            return arr[0] % max;
        }
    } catch (e) {
        // fallback ниже
    }
    return Math.floor(Math.random() * max);
}

function _pickRandom(str) {
    return str.charAt(_getRandomInt(str.length));
}

function _shuffleArray(a) {
    // Fisher-Yates shuffle
    for (let i = a.length - 1; i > 0; i--) {
        const j = _getRandomInt(i + 1);
        const t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
    return a;
}

/**
 * generatePassword(options)
 *
 * options: {
 *   length: number,        // желаемая длина пароля
 *   cyrLower: boolean,
 *   cyrUpper: boolean,
 *   latLower: boolean,
 *   latUpper: boolean,
 *   numbers: boolean,
 *   symbols: boolean
 * }
 *
 * Возвращает сгенерированную строку-пароль.
 * Бросает ошибку, если не выбрана ни одна категория символов.
 */
export function generatePassword(options = {}) {
    const {
        length = 12,
        cyrLower = false,
        cyrUpper = false,
        latLower = true,
        latUpper = true,
        numbers = true,
        symbols = false,
    } = options;

    const pools = [];
    if (cyrLower) pools.push(CYRILLIC_LOWER);
    if (cyrUpper) pools.push(CYRILLIC_UPPER);
    if (latLower) pools.push(LATIN_LOWER);
    if (latUpper) pools.push(LATIN_UPPER);
    if (numbers) pools.push(NUMBERS);
    if (symbols) pools.push(SYMBOLS);

    if (pools.length === 0) {
        throw new Error("Нужно выбрать хотя бы одну категорию символов");
    }

    // Количество обязательных символов — по одному из каждого выбранного пула
    const mandatoryCount = pools.length;
    const finalLength = Math.max(mandatoryCount, Number.isFinite(length) ? Math.floor(length) : 12);

    const result = [];

    // Гарантируем по одному символу из каждой выбранной категории
    for (const pool of pools) {
        result.push(_pickRandom(pool));
    }

    // Объединённый пул для заполнения оставшихся символов
    const allPool = pools.join("");

    for (let i = result.length; i < finalLength; i++) {
        result.push(_pickRandom(allPool));
    }

    _shuffleArray(result);

    return result.join("");
}
