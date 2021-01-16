import { merge } from 'lodash';
import { getName } from './nameGetter';

export const getMovement = (state, figure, row, col, owner) => {
    if (
        (state.currentPlaying === 'white' && owner !== 'white') ||
        (state.currentPlaying === 'black' && owner !== 'black')
    )
        return { ...state, selectedFieldId: '' };
    if (figure === 'P') {
        return {
            ...getPionMovement(
                state,
                row,
                col,
                state.currentPlaying === 'white' ? 1 : -1,
            ),
        };
    } else if (figure === 'T') {
        return {
            ...getTopMovement(state, row, col),
        };
    } else if (figure === 'K') {
        return {
            ...getKonjMovement(state, row, col),
        };
    } else if (figure === 'L') {
        return {
            ...getLovacMovement(state, row, col),
        };
    } else if (figure === 'DA') {
        return {
            ...getQueenMovement(state, row, col),
        };
    } else if (figure === 'KR') {
        return {
            ...getKraljMovement(state, row, col),
        };
    } else {
        return { ...state, selectedFieldId: '' };
    }
};

export const getKraljMovement = (tableState, row, col) => {
    const { table } = tableState;

    if (
        table[row + 1] &&
        table[row + 1][col] &&
        table[row + 1][col].figure === ''
    ) {
        table[row + 1][col].canPlay = true;
    }
    if (
        table[row - 1] &&
        table[row - 1][col] &&
        table[row - 1][col].figure === ''
    ) {
        table[row - 1][col].canPlay = true;
    }
    if (
        table[row + 1] &&
        table[row + 1][col + 1] &&
        table[row + 1][col + 1].figure === ''
    ) {
        table[row + 1][col + 1].canPlay = true;
    }
    if (
        table[row + 1] &&
        table[row + 1][col - 1] &&
        table[row + 1][col - 1].figure === ''
    ) {
        table[row + 1][col - 1].canPlay = true;
    }
    if (
        table[row - 1] &&
        table[row - 1][col + 1] &&
        table[row - 1][col + 1].figure === ''
    ) {
        table[row - 1][col + 1].canPlay = true;
    }
    if (
        table[row - 1] &&
        table[row - 1][col - 1] &&
        table[row - 1][col - 1].figure === ''
    ) {
        table[row - 1][col - 1].canPlay = true;
    }
    if (
        table[row] &&
        table[row][col - 1] &&
        table[row][col - 1].figure === ''
    ) {
        table[row][col - 1].canPlay = true;
    }
    if (
        table[row] &&
        table[row][col + 1] &&
        table[row][col + 1].figure === ''
    ) {
        table[row][col + 1].canPlay = true;
    }

    return {
        ...tableState,
        table: [...table],
        selectedFieldId: table[row][col].id,
    };
};

export const getQueenMovement = (tableState, row, col) => {
    const queenTable = merge(
        getLovacMovement(tableState, row, col).table,
        getTopMovement(tableState, row, col).table,
    );
    return {
        ...tableState,
        table: [...queenTable],
        selectedFieldId: tableState.table[row][col].id,
    };
};
const setEat = (state, victim, attacker) => {
    if (victim.owner !== state.currentPlaying) {
        const canBeEaten = victim.canBeEaten ? victim.canBeEaten : [];
        let already = false;
        canBeEaten.forEach((id) => {
            if (id === attacker.id) {
                already = true;
            }
        });
        if (already) return;
        victim.canBeEaten = [attacker.id, ...canBeEaten];
    }
};

export const getLovacMovement = (tableState, row, col) => {
    const { table } = tableState;
    let counterPlus = 1;
    while (
        table[row + counterPlus] &&
        table[row + counterPlus][col + counterPlus]
    ) {
        if (table[row + counterPlus][col + counterPlus].figure !== '') {
            setEat(
                tableState,
                table[row + counterPlus][col + counterPlus],
                table[row][col],
            );

            break;
        }
        table[row + counterPlus][col + counterPlus].canPlay = true;
        counterPlus++;
    }
    counterPlus = 1;
    while (
        table[row - counterPlus] &&
        table[row - counterPlus][col - counterPlus]
    ) {
        if (table[row - counterPlus][col - counterPlus].figure !== '') {
            setEat(
                tableState,
                table[row - counterPlus][col - counterPlus],
                table[row][col],
            );
            break;
        }
        table[row - counterPlus][col - counterPlus].canPlay = true;
        counterPlus++;
    }
    counterPlus = 1;
    while (
        table[row - counterPlus] &&
        table[row - counterPlus][col + counterPlus]
    ) {
        if (table[row - counterPlus][col + counterPlus].figure !== '') {
            setEat(
                tableState,
                table[row - counterPlus][col + counterPlus],
                table[row][col],
            );
            break;
        }
        table[row - counterPlus][col + counterPlus].canPlay = true;
        counterPlus++;
    }
    counterPlus = 1;
    while (
        table[row + counterPlus] &&
        table[row + counterPlus][col - counterPlus]
    ) {
        if (table[row + counterPlus][col - counterPlus].figure !== '') {
            setEat(
                tableState,
                table[row + counterPlus][col - counterPlus],
                table[row][col],
            );
            break;
        }
        table[row + counterPlus][col - counterPlus].canPlay = true;
        counterPlus++;
    }
    return { ...tableState, selectedFieldId: table[row][col].id };
};
export const getKonjMovement = (tableState, row, col) => {
    const { table } = tableState;
    if (table[row + 2] && table[row + 2][col + 1]) {
        if (table[row + 2][col + 1].figure === '') {
            table[row + 2][col + 1].canPlay = true;
        } else {
            setEat(tableState, table[row + 2][col + 1], table[row][col]);
        }
    }
    if (table[row + 2] && table[row + 2][col - 1]) {
        if (table[row + 2][col - 1].figure === '') {
            table[row + 2][col - 1].canPlay = true;
        } else {
            setEat(tableState, table[row + 2][col - 1], table[row][col]);
        }
    }
    if (table[row - 2] && table[row - 2][col - 1]) {
        if (table[row - 2][col - 1].figure === '') {
            table[row - 2][col - 1].canPlay = true;
        } else {
            setEat(tableState, table[row - 2][col - 1], table[row][col]);
        }
    }
    if (table[row - 2] && table[row - 2][col + 1]) {
        if (table[row - 2][col + 1].figure === '') {
            table[row - 2][col + 1].canPlay = true;
        } else {
            setEat(tableState, table[row - 2][col + 1], table[row][col]);
        }
    }

    if (table[row - 1] && table[row - 1][col + 2]) {
        if (table[row - 1][col + 2].figure === '') {
            table[row - 1][col + 2].canPlay = true;
        } else {
            setEat(tableState, table[row - 1][col + 2], table[row][col]);
        }
    }
    if (table[row - 1] && table[row - 1][col - 2]) {
        if (table[row - 1][col - 2].figure === '') {
            table[row - 1][col - 2].canPlay = true;
        } else {
            setEat(tableState, table[row - 1][col - 2], table[row][col]);
        }
    }
    if (table[row + 1] && table[row + 1][col + 2]) {
        if (table[row + 1][col + 2].figure === '') {
            table[row + 1][col + 2].canPlay = true;
        } else {
            setEat(tableState, table[row + 1][col + 2], table[row][col]);
        }
    }
    if (table[row + 1] && table[row + 1][col - 2]) {
        if (table[row + 1][col - 2].figure === '') {
            table[row + 1][col - 2].canPlay = true;
        } else {
            setEat(tableState, table[row + 1][col - 2], table[row][col]);
        }
    }

    return { ...tableState, selectedFieldId: table[row][col].id };
};
export const getPionMovement = (tableState, row, col, ind) => {
    const { table } = tableState;
    let firstMove = false;
    if (table[row][col].owner === 'white' && row === 1) {
        firstMove = true;
    }
    if (table[row][col].owner === 'black' && row === 6) {
        firstMove = true;
    }
    if (!table[row + ind]) return tableState;
    if (table[row][col].owner === 'white') {
        if (
            table[row + 1] &&
            table[row + 1][col + 1] &&
            table[row + 1][col + 1].figure !== ''
        ) {
            setEat(tableState, table[row + 1][col + 1], table[row][col]);
        }
        if (
            table[row + 1] &&
            table[row + 1][col - 1] &&
            table[row + 1][col - 1].figure !== ''
        ) {
            setEat(tableState, table[row + 1][col - 1], table[row][col]);
        }
    }
    if (table[row][col].owner === 'black') {
        if (
            table[row - 1] &&
            table[row - 1][col + 1] &&
            table[row - 1][col + 1].figure !== ''
        ) {
            setEat(tableState, table[row - 1][col + 1], table[row][col]);
        }
        if (
            table[row - 1] &&
            table[row - 1][col - 1] &&
            table[row - 1][col - 1].figure !== ''
        ) {
            setEat(tableState, table[row - 1][col - 1], table[row][col]);
        }
    }

    if (table[row + ind][col].figure === '') {
        if (firstMove) {
            if (table[row + ind + ind][col].figure === '') {
                table[row + ind + ind][col] = {
                    ...table[row + ind + ind][col],
                    canPlay: true,
                };
            }
        }
        table[row + ind][col] = {
            ...table[row + ind][col],
            canPlay: true,
        };
    }

    return { ...tableState, selectedFieldId: table[row][col].id };
};

export const getTopMovement = (tableState, row, col) => {
    const { table } = tableState;
    let rowCountUpper = row + 1;
    let rowCountLower = row - 1;
    let colcounterPlusLower = col - 1;
    let colcounterPlusUpper = col + 1;

    //Vertical movement
    while (rowCountUpper < table.length) {
        if (table[rowCountUpper][col].figure !== '') {
            setEat(tableState, table[rowCountUpper][col], table[row][col]);
            break;
        }
        table[rowCountUpper][col].canPlay = true;
        rowCountUpper++;
    }
    while (rowCountLower >= 0) {
        if (table[rowCountLower][col].figure !== '') {
            setEat(tableState, table[rowCountLower][col], table[row][col]);
            break;
        }
        table[rowCountLower][col].canPlay = true;
        rowCountLower--;
    }

    //Horizontal movement
    while (colcounterPlusLower >= 0) {
        if (table[row][colcounterPlusLower].figure !== '') {
            setEat(
                tableState,
                table[row][colcounterPlusLower],
                table[row][col],
            );
            break;
        }
        table[row][colcounterPlusLower].canPlay = true;
        colcounterPlusLower--;
    }
    while (colcounterPlusUpper < 8) {
        if (table[row][colcounterPlusUpper].figure !== '') {
            setEat(
                tableState,
                table[row][colcounterPlusUpper],
                table[row][col],
            );
            break;
        }
        table[row][colcounterPlusUpper].canPlay = true;
        colcounterPlusUpper++;
    }

    return {
        ...tableState,
        selectedFieldId: table[row][col].id,
        table: [...table],
    };
};

const getField = (table, id) => {
    let field;
    table.forEach((row) =>
        row.forEach((col) => {
            if (col.id === id) {
                field = col;
            }
        }),
    );
    return field;
};
const clearField = (target, table) => {
    const prevAttack = getField(table, target);
    return table.map((row) =>
        row.map((col) => {
            if (col.id === prevAttack.id) {
                col = {
                    ...col,
                    figure: '',
                    owner: undefined,
                };
            }
            return col;
        }),
    );
};

export const eatFigure = (state, attacker, victim) => {
    const { table } = state;

    const attackerField = getField(table, attacker);
    const oldState = state;
    let victimField;
    const clearedTable = table.map((row) =>
        row.map((col) => {
            if (col.id === victim) {
                victimField = col;
                return {
                    ...col,
                    figure: attackerField.figure,
                    owner: attackerField.owner,
                    canBeEaten: [],
                };
            }
            return col;
        }),
    );
    const newTable = clearField(attacker, clearedTable);
    return {
        ...state,
        table: [...newTable],
        prevStates: [state, ...state.prevStates],
        movements: [
            {
                name: `(${state.currentPlaying})${getName(
                    attackerField.figure,
                )} > ${getName(victimField.figure)}(${victimField.owner})`,
                state: oldState,
            },
            ...state.movements,
        ],
        selectedFieldId: '',
        currentPlaying: state.currentPlaying === 'white' ? 'black' : 'white',
    };
};

export const applyMovement = (state, colR) => {
    const { table } = state;

    const fieldState = getField(state.table, state.selectedFieldId);
    const oldState = state;
    let field = '';

    const newTable = table.map((row) =>
        row.map((col) => {
            if (col.id === fieldState.id) {
                return { ...col, figure: '' };
            }
            if (col.id === colR.id) {
                field = col.id;
                return {
                    ...col,
                    figure: fieldState.figure,
                    owner: state.currentPlaying,
                };
            }
            return { ...col };
        }),
    );

    return {
        ...state,
        selectedFieldId: '',
        table: [...newTable],
        prevStates: [oldState, ...state.prevStates],
        movements: [
            {
                name: `(${fieldState.owner})${getName(
                    fieldState.figure,
                )} to ${field}`,
                state: oldState,
            },
            ...state.movements,
        ],
        currentPlaying: state.currentPlaying === 'white' ? 'black' : 'white',
    };
};
