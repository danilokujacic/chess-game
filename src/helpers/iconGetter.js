import pion_w from '../assets/Bijele/pion_w.png';
import kralj_w from '../assets/Bijele/kralj_w.png';
import lovac_w from '../assets/Bijele/lovac_w.png';
import konj_w from '../assets/Bijele/konj_w.png';
import queen_w from '../assets/Bijele/queen_w.png';
import top_w from '../assets/Bijele/top_w.png';
import pion_b from '../assets/Crne/pion_b.png';
import kralj_b from '../assets/Crne/kralj_b.png';
import lovac_b from '../assets/Crne/lovac_b.png';
import konj_b from '../assets/Crne/konj_b.png';
import queen_b from '../assets/Crne/queen_b.png';
import top_b from '../assets/Crne/top_b.png';

export const getIcon = (column) => {
    const names = {
        PW: pion_w,
        KRW: kralj_w,
        LW: lovac_w,
        DAW: queen_w,
        KW: konj_w,
        TW: top_w,
        PB: pion_b,
        KRB: kralj_b,
        LB: lovac_b,
        DAB: queen_b,
        KB: konj_b,
        TB: top_b,
    };

    return (
        <img
            alt={column.figure}
            style={{ width: 45, height: 45 }}
            src={
                names[`${column.figure}${column.owner === 'white' ? 'W' : 'B'}`]
            }
        />
    );
};
