import { useEffect, useState } from 'react';
import { getIcon } from '../helpers/iconGetter';
import useTableContext from '../hooks/useTableContext';

const Table = () => {
    const [tableSize, setTableSize] = useState(
        window.innerWidth > 768 ? 850 : 350,
    );
    const [tableState, dispatch] = useTableContext();

    useEffect(() => console.log(tableState), [tableState]);

    return (
        <div
            style={{ width: tableSize, height: tableSize }}
            className='chess-table'>
            {tableState.table &&
                tableState.table.map((row, index) => {
                    return (
                        <div
                            key={index}
                            className='chess-row'
                            style={{ width: '100%', height: tableSize / 8 }}>
                            {row.map((column, colNum) => {
                                const color =
                                    index % 2 === 0
                                        ? colNum % 2 === 0
                                            ? '#e0a604'
                                            : '#cfcfcf'
                                        : colNum % 2 !== 0
                                        ? '#e0a604'
                                        : '#cfcfcf';
                                const fieldContent = column.figure ? (
                                    getIcon(column)
                                ) : column.canPlay ? (
                                    <div className='canplay-circle'></div>
                                ) : (
                                    ''
                                );

                                return (
                                    <div
                                        onClick={() => {
                                            dispatch({
                                                type: 'CLEAR_CANPLAY_ALL',
                                            });
                                            if (column.canBeEaten) {
                                                column.canBeEaten.forEach(
                                                    (id) => {
                                                        if (
                                                            tableState.selectedFieldId ===
                                                            id
                                                        ) {
                                                            return dispatch({
                                                                type:
                                                                    'EAT_FIGURE',
                                                                payload: {
                                                                    attacker:
                                                                        tableState.selectedFieldId,
                                                                    victim:
                                                                        column.id,
                                                                },
                                                            });
                                                        }
                                                    },
                                                );
                                            }
                                            if (column.canPlay) {
                                                dispatch({
                                                    type: 'APPLY_MOVEMENT',
                                                    payload: column,
                                                });
                                            } else {
                                                dispatch({
                                                    type: 'COLUMN_SELECTED',
                                                    payload: column,
                                                });
                                            }
                                        }}
                                        style={{
                                            background: color,
                                            width: tableSize / 8,
                                            height: tableSize / 8,
                                        }}
                                        className='chess-field'>
                                        {fieldContent}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
        </div>
    );
};
export default Table;
