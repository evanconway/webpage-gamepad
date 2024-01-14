import { useAppSelector } from "../state/hooks";
import { selectMatchedMove } from "../state/movesCheckSlice";

const Moves = () => {
    const matchedMove = useAppSelector(selectMatchedMove);
    if (matchedMove !== null) return <div>{matchedMove.name}</div>;
    return null;
};

export default Moves;
