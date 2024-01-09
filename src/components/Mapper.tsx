import { useAppSelector } from "../state/hooks";
import { ActionMapping, selectInputMappings } from "../state/inputMappingSlice";

const mappingToString = (mapping: ActionMapping | null) => {
    if (mapping === null) return 'INPUT NOT MAPPED';
    return `${mapping.port === 'keyboard' ? 'Keyboard' : ('Gamepad ' + mapping.port)}: ${mapping.input.toUpperCase()}`;
};

const Mapper = () => {
    const {
        directionLeft,
        directionRight,
        directionUp,
        directionDown,
        punch1,
        punch2,
        punch3,
        kick1,
        kick2,
        kick3,
    } = useAppSelector(selectInputMappings);

    return <ul>
        <li>Left: {mappingToString(directionLeft)}</li>
        <li>Right: {mappingToString(directionRight)}</li>
        <li>Up: {mappingToString(directionUp)}</li>
        <li>Down: {mappingToString(directionDown)}</li>
        <li>Punch 1: {mappingToString(punch1)}</li>
        <li>Punch 2: {mappingToString(punch2)}</li>
        <li>Punch 3: {mappingToString(punch3)}</li>
        <li>Kick 1: {mappingToString(kick1)}</li>
        <li>Kick 2: {mappingToString(kick2)}</li>
        <li>Kick 3: {mappingToString(kick3)}</li>
    </ul>;
};

export default Mapper;
