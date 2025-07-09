function createEmpty28() {
    return Array.from({ length: 28 }, () => Array(28).fill(0));
}

export function digit0() {
    const grid = createEmpty28();
    for (let i = 6; i <= 21; i++) {
        grid[i][6] = 1;
        grid[i][21] = 1;
    }
    for (let j = 6; j <= 21; j++) {
        grid[6][j] = 1;
        grid[21][j] = 1;
    }
    return grid;
}

export function digit1() {
    const grid = createEmpty28();
    for (let i = 6; i <= 21; i++) {
        grid[i][14] = 1;
    }
    grid[21][13] = 1;
    grid[21][15] = 1;
    return grid;
}

export function digit2() {
    const grid = createEmpty28();
    for (let j = 7; j <= 21; j++) {
        grid[6][j] = 1;
        grid[13][j] = 1;
        grid[21][j] = 1;
    }
    for (let i = 6; i <= 13; i++) {
        grid[i][21] = 1;
    }
    for (let i = 13; i <= 21; i++) {
        grid[i][6] = 1;
    }
    return grid;
}

export function digit3() {
    const grid = createEmpty28();
    for (let j = 7; j <= 21; j++) {
        grid[6][j] = 1;
        grid[13][j] = 1;
        grid[21][j] = 1;
    }
    for (let i = 6; i <= 21; i++) {
        grid[i][21] = 1;
    }
    return grid;
}

export function digit4() {
    const grid = createEmpty28();
    for (let i = 6; i <= 21; i++) {
        grid[i][6] = 1;
        grid[i][14] = 1;
    }
    for (let j = 14; j <= 21; j++) {
        grid[13][j] = 1;
    }
    return grid;
}

export function digit5() {
    const grid = createEmpty28();
    for (let j = 6; j <= 21; j++) {
        grid[6][j] = 1;
        grid[13][j] = 1;
        grid[21][j] = 1;
    }
    for (let i = 6; i <= 13; i++) {
        grid[i][6] = 1;
    }
    for (let i = 13; i <= 21; i++) {
        grid[i][21] = 1;
    }
    return grid;
}

export function digit6() {
    const grid = createEmpty28();
    for (let i = 6; i <= 21; i++) {
        grid[i][6] = 1;
    }
    for (let j = 6; j <= 21; j++) {
        grid[6][j] = 1;
        grid[13][j] = 1;
        grid[21][j] = 1;
    }
    for (let i = 13; i <= 21; i++) {
        grid[i][21] = 1;
    }
    return grid;
}

export function digit7() {
    const grid = createEmpty28();
    for (let j = 6; j <= 21; j++) {
        grid[6][j] = 1;
    }
    for (let i = 6; i <= 21; i++) {
        grid[i][21] = 1;
    }
    return grid;
}

export function digit8() {
    const grid = createEmpty28();
    for (let j = 6; j <= 21; j++) {
        grid[6][j] = 1;
        grid[13][j] = 1;
        grid[21][j] = 1;
    }
    for (let i = 6; i <= 21; i++) {
        grid[i][6] = 1;
        grid[i][21] = 1;
    }
    return grid;
}

export function digit9() {
    const grid = createEmpty28();
    for (let j = 6; j <= 21; j++) {
        grid[6][j] = 1;
        grid[13][j] = 1;
        grid[21][j] = 1;
    }
    for (let i = 6; i <= 13; i++) {
        grid[i][6] = 1;
    }
    for (let i = 6; i <= 21; i++) {
        grid[i][21] = 1;
    }
    return grid;
}

const flatten = (grid: number[][]) => grid.flat();
export const dataset = [
    { input: flatten(digit0()), label: 0 },
    { input: flatten(digit1()), label: 1 },
    { input: flatten(digit2()), label: 2 },
    { input: flatten(digit3()), label: 3 },
    { input: flatten(digit4()), label: 4 },
    { input: flatten(digit5()), label: 5 },
    { input: flatten(digit6()), label: 6 },
    { input: flatten(digit7()), label: 7 },
    { input: flatten(digit8()), label: 8 },
    { input: flatten(digit9()), label: 9 },
];

