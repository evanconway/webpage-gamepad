import { useAppDispatch, useAppSelector } from "../state/hooks";
import { ActionMapping, selectActionInputMappings, setActionDirectionDown, setActionDirectionLeft, setActionDirectionRight, setActionDirectionUp, setActionKick1, setActionKick2, setActionKick3, setActionPunch1, setActionPunch2, setActionPunch3 } from "../state/actionInputMappingSlice";
import { selectKeyboard } from "../state/keyboardSlice";
import { selectGamepads } from "../state/gamepadSlice";
import { useEffect, useRef, useState } from "react";
import { getNewGamepadOn, getNewKeyboardOn } from "../util/controls";

const mappingToString = (mapping: ActionMapping | null) => {
    if (mapping === null) return 'INPUT NOT MAPPED';
    return `${mapping.port === 'keyboard' ? 'Keyboard' : ('Gamepad ' + mapping.port)}: ${mapping.input.toUpperCase()}`;
};

const Mapper = () => {
    const dispatch = useAppDispatch();

    const keyboard = useAppSelector(selectKeyboard);
    const gamepads = useAppSelector(selectGamepads);

    const keyboardRef = useRef(keyboard);
    const gamepadsRef = useRef(gamepads);

    const [actionMapper, setActionMapper] = useState<{ actionName: string, mapActionFunction: (newMapping: ActionMapping) => void } | null>(null);
    const [mostRecentInput, setMostRecentInput] = useState<ActionMapping | null>(null);

    // detect input changes
    useEffect(() => {
        const newKeyOn = getNewKeyboardOn(keyboardRef.current, keyboard);
        const newGamepadOn = getNewGamepadOn(gamepadsRef.current, gamepads);
        const act = (i: ActionMapping | null) => {
            setMostRecentInput(i);
            if (actionMapper !== null && i !== null) actionMapper?.mapActionFunction(i);
            setActionMapper(null);
        };

        if (newKeyOn !== null) act({ input: newKeyOn, port: 'keyboard' });
        else if (newGamepadOn !== null) act(newGamepadOn);

        keyboardRef.current = keyboard;
        gamepadsRef.current = gamepads;
    }, [keyboard, gamepads, actionMapper]);

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

    const getMappingRowElements = (actionName: string, actionMapping: ActionMapping | null, setActionSetter: Function) => {
        return [
            <div key={actionName}>{actionName}</div>,
            <div key={actionName + '-mapping'}>{actionMapper?.actionName === actionName ? 'AWAITING INPUT...' : mappingToString(actionMapping)}</div>,
            <button
                key={'assign-' + actionName}
                onClick={() => setActionMapper({ actionName, mapActionFunction: (newMapping) => dispatch(setActionSetter(newMapping)) })}
                disabled={actionMapper !== null}
            >Assign Input</button>,
        ];
    };

    return <div>
        <div>Most Recent Input: {mappingToString(mostRecentInput)}</div>
        <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, auto)', columnGap: '8px', rowGap: '4px' }}>
            {[
                <h3 key='action'>Action</h3>,
                <h3 key='input'>Input</h3>,
                <div key='blank'></div>,
                ...getMappingRowElements('Left', directionLeft, setActionDirectionLeft),
                ...getMappingRowElements('Right', directionRight, setActionDirectionRight),
                ...getMappingRowElements('Up', directionUp, setActionDirectionUp),
                ...getMappingRowElements('Down', directionDown, setActionDirectionDown),
                ...getMappingRowElements('Punch 1', punch1, setActionPunch1),
                ...getMappingRowElements('Punch 2', punch2, setActionPunch2),
                ...getMappingRowElements('Punch 3', punch3, setActionPunch3),
                ...getMappingRowElements('Kick 1', kick1, setActionKick1),
                ...getMappingRowElements('Kick 2', kick2, setActionKick2),
                ...getMappingRowElements('Kick 3', kick3, setActionKick3),
            ]}
        </div>
    </div>;
};

export default Mapper;
