import { useAppSelector } from "../state/hooks";
import { ActionMapping, selectActionInputMappings } from "../state/actionInputMappingSlice";
import { selectKeyboard } from "../state/keyboardSlice";
import { selectGamepads } from "../state/gamepadSlice";
import { useEffect, useRef, useState } from "react";
import { getNewGamepadOn, getNewKeyboardOn } from "../util/controls";

const mappingToString = (mapping: ActionMapping | null) => {
    if (mapping === null) return 'INPUT NOT MAPPED';
    return `${mapping.port === 'keyboard' ? 'Keyboard' : ('Gamepad ' + mapping.port)}: ${mapping.input.toUpperCase()}`;
};

const Mapper = () => {
    const keyboard = useAppSelector(selectKeyboard);
    const gamepads = useAppSelector(selectGamepads);

    const keyboardRef = useRef(keyboard);
    const gamepadsRef = useRef(gamepads);

    const [mapActionToInputFunction, setMapActionToInputFunction] = useState<(() => void) | null>(null);
    const [mostRecentInput, setMostRecentInput] = useState<ActionMapping | null>(null);

    // detect input changes
    useEffect(() => {
        //if (mapActionToInputFunction === null) return;
        const newKeyOn = getNewKeyboardOn(keyboardRef.current, keyboard);
        const newGamepadOn = getNewGamepadOn(gamepadsRef.current, gamepads);
        const act = (i: ActionMapping | null) => {
            //mapActionToInputFunction();
            setMostRecentInput(i);
        };

        if (newKeyOn !== null) act({ input: newKeyOn, port: 'keyboard' });
        else if (newGamepadOn !== null) act(newGamepadOn);

        keyboardRef.current = keyboard;
        gamepadsRef.current = gamepads;
    }, [keyboard, gamepads]);

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
    } = useAppSelector(selectActionInputMappings);

    const getMappingRowElements = (actionName: string, mapping: ActionMapping | null) => {
        return [
            <div key={actionName}>{actionName}</div>,
            <div key={actionName + '-mapping'}>{mappingToString(mapping)}</div>,
            <button key={'assign-' + actionName} onClick={() => console.log('set mapper component to assigning state')}>Assign Input</button>,
        ];
    };

    return <div>
        <div>Most Recent Input: {mappingToString(mostRecentInput)}</div>
        <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, auto)', columnGap: '8px', rowGap: '4px' }}>
            {[
                <h3 key='action'>Action</h3>,
                <h3 key='input'>Input</h3>,
                <div key='blank'></div>,
                ...getMappingRowElements('Left', directionLeft),
                ...getMappingRowElements('Right', directionRight),
                ...getMappingRowElements('Up', directionUp),
                ...getMappingRowElements('Down', directionDown),
                ...getMappingRowElements('Punch 1', punch1),
                ...getMappingRowElements('Punch 2', punch2),
                ...getMappingRowElements('Punch 3', punch3),
                ...getMappingRowElements('Kick 1', kick1),
                ...getMappingRowElements('Kick 2', kick2),
                ...getMappingRowElements('Kick 3', kick3),
            ]}
        </div>
    </div>;
};

export default Mapper;
