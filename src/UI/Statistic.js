import useTableContext from '../hooks/useTableContext';

const Statistic = () => {
    const [tableState, dispatch] = useTableContext();

    return (
        <div className='chess-statistic'>
            Currently playing: <br />
            {tableState.currentPlaying}
            <div style={{ marginTop: '16px' }}>
                {tableState.movements.map((move) => (
                    <span
                        onClick={() =>
                            dispatch({
                                type: 'SET_TABLE_STATE',
                                payload: move.state,
                            })
                        }
                        style={{ fontSize: '12px' }}>
                        {move.name}, &nbsp;
                    </span>
                ))}
            </div>
        </div>
    );
};
export default Statistic;
