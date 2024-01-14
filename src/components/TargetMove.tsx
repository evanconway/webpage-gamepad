import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectMatchedMove, selectTargetMove, setTargetMoveToRandom } from "../state/movesCheckSlice";
import { selectArcadeStickState } from "../state/arcadeStickSlice";

const TargetMove = () => {
    const dispatch = useAppDispatch();

    const matchedMove = useAppSelector(selectMatchedMove);
    const targetMove = useAppSelector(selectTargetMove);
    const arcadeStick = useAppSelector(selectArcadeStickState);

    const [moveSuccess, setMoveSuccess] = useState(false);

    // detect correct move executed
    useEffect(() => {
        if (matchedMove?.name === targetMove.name) setMoveSuccess(true);
    }, [matchedMove, targetMove]);

    // prepare next move
    useEffect(() => {
        if (!moveSuccess) return;
        let stickIsNeutral = true;
        if (arcadeStick.direction !== 5) stickIsNeutral = false;
        if (arcadeStick.punch1 === true) stickIsNeutral = false;
        if (arcadeStick.punch2 === true) stickIsNeutral = false;
        if (arcadeStick.punch3 === true) stickIsNeutral = false;
        if (arcadeStick.kick1 === true) stickIsNeutral = false;
        if (arcadeStick.kick2 === true) stickIsNeutral = false;
        if (arcadeStick.kick3 === true) stickIsNeutral = false;
        if (stickIsNeutral) {
            dispatch(setTargetMoveToRandom());
            setMoveSuccess(false);
        }
    }, [arcadeStick, moveSuccess]);

    return <div>
        <div>Target: {targetMove.name}</div>
        {moveSuccess ? <div>Success!</div> : null}
    </div>;
};

export default TargetMove;
