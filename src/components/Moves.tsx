import { selectArcadeStickHistory } from "../state/arcadeStickHistorySlice";
import { useAppSelector } from "../state/hooks";
import { arcadeStickHistoryMatchMove, move214PH, move214PL, move214PM, move236PH, move236PL, move236PM, move421PH, move421PL, move421PM, move623PH, move623PL, move623PM } from "../util/moves";

const Moves = () => {
    const arcadeStickHistory = useAppSelector(selectArcadeStickHistory);

    // shoryuken
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move623PL)) return <div>{move623PL.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move623PM)) return <div>{move623PM.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move623PH)) return <div>{move623PH.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move421PL)) return <div>{move421PL.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move421PM)) return <div>{move421PM.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move421PH)) return <div>{move421PH.name}</div>

    // hadouken
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move236PL)) return <div>{move236PL.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move236PM)) return <div>{move236PM.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move236PH)) return <div>{move236PH.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move214PL)) return <div>{move214PL.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move214PM)) return <div>{move214PM.name}</div>
    if (arcadeStickHistoryMatchMove(arcadeStickHistory, move214PH)) return <div>{move214PH.name}</div>

    return null;
};

export default Moves;
