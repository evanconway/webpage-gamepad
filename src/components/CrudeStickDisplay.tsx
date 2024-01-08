import { selectArcadeStickDirection, selectArcadeStickKick1, selectArcadeStickKick2, selectArcadeStickKick3, selectArcadeStickPunch1, selectArcadeStickPunch2, selectArcadeStickPunch3 } from "../state/arcadeStickSlice";
import { useAppSelector } from "../state/hooks";

const CrudeStickDisplay = () => {
    const direction = useAppSelector(selectArcadeStickDirection);
    const punch1 = useAppSelector(selectArcadeStickPunch1);
    const punch2 = useAppSelector(selectArcadeStickPunch2);
    const punch3 = useAppSelector(selectArcadeStickPunch3);
    const kick1 = useAppSelector(selectArcadeStickKick1);
    const kick2 = useAppSelector(selectArcadeStickKick2);
    const kick3 = useAppSelector(selectArcadeStickKick3);

    return <ul>
        <li>Direction: {direction}</li>
        <li>Punch 1: {punch1 ? '+' : ''}</li>
        <li>Punch 2: {punch2 ? '+' : ''}</li>
        <li>Punch 3: {punch3 ? '+' : ''}</li>
        <li>Kick 1: {kick1 ? '+' : ''}</li>
        <li>Kick 2: {kick2 ? '+' : ''}</li>
        <li>Kick 3: {kick3 ? '+' : ''}</li>
    </ul>
};

export default CrudeStickDisplay;
