export function getKnuffShuffle(array) {
    const _array = [...array]
    for (let i = _array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [_array[i], _array[randomIndex]] = [_array[randomIndex], _array[i]];
    }
    return _array
}