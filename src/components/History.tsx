import { useAppSelector } from "../state/hooks";
import { selectArcadeStickHistory } from "../state/arcadeStickHistorySlice";

const History = () => {
    const history = useAppSelector(selectArcadeStickHistory);

    return <ul>
        {history.map((s, i) =>{
            let str = 'dir: ' + s.direction.direction;
            if (s.punch1.down) str += ', p1';
            if (s.punch2.down) str += ', p2';
            if (s.punch3.down) str += ', p3';
            if (s.kick1.down) str += ', k1';
            if (s.kick2.down) str += ', k2';
            if (s.kick3.down) str += ', k3';
            return <li key={'history-' + i}>{str}</li>
        })}
    </ul>;
};

export default History;
