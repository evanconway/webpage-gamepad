import { selectArcadeStickHistory } from "../state/arcadeStickHistorySlice";
import { useAppSelector } from "../state/hooks";
import { arcadeStickHistoryMatchMove, hadoukenHeavy, hadoukenLight, hadoukenMedium, shoryukenHeavy, shoryukenLight, shoryukenMedium } from "../util/moves";

const Moves = () => {
    const arcadeStickHistory = useAppSelector(selectArcadeStickHistory);

    // shoryuken
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, shoryukenLight)) return <div>Shoryuken Right Light</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, shoryukenMedium)) return <div>Shoryuken Right Medium</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, shoryukenHeavy)) return <div>Shoryuken Right Heavy</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, shoryukenLight, 'horizontal')) return <div>Shoryuken Left Light</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, shoryukenMedium, 'horizontal')) return <div>Shoryuken Left Medium</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, shoryukenHeavy, 'horizontal')) return <div>Shoryuken Left Heavy</div>

    // hadouken
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, hadoukenLight)) return <div>Hadouken Right Light</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, hadoukenMedium)) return <div>Hadouken Right Medium</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, hadoukenHeavy)) return <div>Hadouken Right Heavy</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, hadoukenLight, 'horizontal')) return <div>Hadouken Left Light</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, hadoukenMedium, 'horizontal')) return <div>Hadouken Left Medium</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, hadoukenHeavy, 'horizontal')) return <div>Hadouken Left Heavy</div>

    return null;
};

export default Moves;
