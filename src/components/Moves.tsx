import { selectArcadeStickHistory } from "../state/arcadeStickHistorySlice";
import { useAppSelector } from "../state/hooks";
import { arcadeStickHistoryMultiMatch, hadoukenLeftHeavy, hadoukenLeftLight, hadoukenLeftMedium, hadoukenRightHeavy, hadoukenRightLight, hadoukenRightMedium, shoryukenLeftHeavy, shoryukenLeftLight, shoryukenLeftMedium, shoryukenRightHeavy, shoryukenRightLight, shoryukenRightMedium } from "../util/moves";

const Moves = () => {
    const arcadeStickHistory = useAppSelector(selectArcadeStickHistory);

    // shoryuken
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, shoryukenRightLight)) return <div>Shoryuken Right Light</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, shoryukenRightMedium)) return <div>Shoryuken Right Medium</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, shoryukenRightHeavy)) return <div>Shoryuken Right Heavy</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, shoryukenLeftLight)) return <div>Shoryuken Left Light</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, shoryukenLeftMedium)) return <div>Shoryuken Left Medium</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, shoryukenLeftHeavy)) return <div>Shoryuken Left Heavy</div>

    // hadouken
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, hadoukenRightLight)) return <div>Hadouken Right Light</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, hadoukenRightMedium)) return <div>Hadouken Right Medium</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, hadoukenRightHeavy)) return <div>Hadouken Right Heavy</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, hadoukenLeftLight)) return <div>Hadouken Left Light</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, hadoukenLeftMedium)) return <div>Hadouken Left Medium</div>
    if (arcadeStickHistoryMultiMatch(arcadeStickHistory, hadoukenLeftHeavy)) return <div>Hadouken Left Heavy</div>

    return null;
};

export default Moves;
