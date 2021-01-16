import { useReducer, createContext } from 'react';
import {
    applyMovement,
    eatFigure,
    getMovement,
} from './helpers/figureMovements';
import { initialTableState } from './initialState';
import Statistic from './UI/Statistic';
import Table from './UI/Table';

const chessReducer = (state, { payload, type }) => {
    if (type === 'EAT_FIGURE') {
        const { attacker, victim } = payload;
        return { ...eatFigure(state, attacker, victim) };
    }
    if (type === 'SET_TABLE_STATE') {
        return { ...payload };
    }
    if (type === 'REVERT_TABLE') {
        if (state.prevStates.length) {
            const prevMove = state.prevStates.splice(0, 1);
            return {
                ...state,
                table: [...prevMove[0]],
                selectedFieldId: '',
                currentPlaying:
                    state.currentPlaying === 'white' ? 'black' : 'white',
            };
        }
    }
    if (type === 'APPLY_MOVEMENT') {
        return { ...applyMovement(state, payload) };
    }
    if (type === 'CLEAR_CANPLAY_ALL') {
        const newTable = state.table.map((row) => {
            return row.map((col) => {
                col = {
                    ...col,
                    canPlay: false,
                };
                return col;
            });
        });
        return { ...state, table: [...newTable] };
    }
    if (type === 'COLUMN_SELECTED') {
        const { table } = state;
        let newState = state;
        table.forEach((row, rowInd) => {
            row.forEach((col, colInd) => {
                if (col.id === payload.id) {
                    newState = {
                        ...getMovement(
                            state,
                            col.figure,
                            rowInd,
                            colInd,
                            col.owner,
                        ),
                    };
                }
            });
        });
        return { ...newState };
    }
};
export const TableContext = createContext();

function App() {
    const methods = useReducer(chessReducer, {
        table: initialTableState,
        selectedFieldId: '',
        currentPlaying: 'white',
        movements: [],
        prevStates: [],
    });

    return (
        <TableContext.Provider value={methods}>
            <div className='chess-container'>
                <Table />
                <Statistic />
            </div>
        </TableContext.Provider>
    );
}

export default App;
