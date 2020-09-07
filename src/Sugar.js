const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function getRandomColor() {

    let h = randomInt(0, 360);
    let s = randomInt(42, 98);
    let l = randomInt(30, 50);

    return [`hsl(${h},${s / 8}%,${l}%)`, `hsl(${h},${s}%,${70}%)`];

}

export const mod = (x, m) => {
    return (x % m + m) % m;
};

export function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        // eslint-disable-next-line no-mixed-operators
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
