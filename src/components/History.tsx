import { useAppSelector } from "../state/hooks";
import { selectArcadeStickHistory } from "../state/arcadeStickHistorySlice";

const History = () => {
    const history = useAppSelector(selectArcadeStickHistory);

    return <ul>
        {history.map((s, i) => <li key={'history-' + i}>{`dir: ${s.direction}, p1: ${s.punch1}, p2: ${s.punch2}, p3: ${s.punch3}, k1: ${s.kick1}, k2: ${s.kick2}, k3: ${s.kick3}`}</li>)}
    </ul>;
};

export default History;
