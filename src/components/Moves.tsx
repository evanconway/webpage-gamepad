import { selectArcadeStickHistory } from "../state/arcadeStickHistorySlice";
import { useAppSelector } from "../state/hooks";
import { arcadeStickHistoryMultiMatch, hadoukenLight, shoryukenLight } from "../util/moves";

const Moves = () => {
    const arcadeStickHistory = useAppSelector(selectArcadeStickHistory);

    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, shoryukenLight)) return <div>Shoryuken Light</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, hadoukenLight)) return <div>Hadouken Light</div>

    return null;
};

export default Moves;
