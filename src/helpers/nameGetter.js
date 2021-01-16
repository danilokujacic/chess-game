export const getName = (type) => {
    const names = {
        P: 'Pawn',
        KR: 'King',
        K: 'Horse',
        DA: 'Queen',
        T: 'Rock',
        L: 'Bishop',
    };
    return names[type];
};
