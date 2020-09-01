const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function getRandomColor() {

    let h = randomInt(0, 360);
    let s = randomInt(42, 98);
    let l = randomInt(30, 50);
    return [`hsl(${h},${s}%,${l}%)`, `hsl(${h},${s}%,${90}%)`];

}

export const mod = (x, m) => {
    return (x % m + m) % m;
};
