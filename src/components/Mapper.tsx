import { useAppDispatch, useAppSelector } from "../state/hooks";
import { ActionMapping, selectActionInputMappings, setActionDirectionDown, setActionDirectionLeft, setActionDirectionRight, setActionDirectionUp, setActionKick1, setActionKick2, setActionKick3, setActionPunch1, setActionPunch2, setActionPunch3 } from "../state/actionInputMappingSlice";
import { selectKeyboard } from "../state/keyboardSlice";
import { selectGamepads } from "../state/gamepadSlice";
import { useEffect, useRef, useState } from "react";
import { getNewGamepadOn, getNewKeyboardOn } from "../util/controls";
import { Dispatch } from "@reduxjs/toolkit";

const mappingToString = (mapping: ActionMapping | null) => {
    if (mapping === null) return 'INPUT NOT MAPPED';
    return `${mapping.port === 'keyboard' ? 'Keyboard' : ('Gamepad ' + mapping.port)}: ${mapping.input.toUpperCase()}`;
};

interface ActionMapper {
    actionName: string,
    mapActionFunction: (newMapping: ActionMapping) => void,
    nextActionMapper: ActionMapper | null,
}

const ActionNames = {
    up: 'Up',
    down: 'Down',
    left: 'Left',
    right: 'Right',
    punch1: 'Punch 1',
    punch2: 'Punch 2',
    punch3: 'Punch 3',
    kick1: 'Kick 1',
    kick2: 'Kick 2',
    kick3: 'Kick 3',
};

const Mapper = () => {
    const dispatch = useAppDispatch();

    const keyboard = useAppSelector(selectKeyboard);
    const gamepads = useAppSelector(selectGamepads);

    const keyboardRef = useRef(keyboard);
    const gamepadsRef = useRef(gamepads);

    const [actionMapper, setActionMapper] = useState<ActionMapper | null>(null);
    const [mostRecentInput, setMostRecentInput] = useState<ActionMapping | null>(null);

    // detect input changes
    useEffect(() => {
        const newKeyOn = getNewKeyboardOn(keyboardRef.current, keyboard);
        const newGamepadOn = getNewGamepadOn(gamepadsRef.current, gamepads);
        const act = (i: ActionMapping | null) => {
            setMostRecentInput(i);
            if (actionMapper !== null && i !== null) actionMapper?.mapActionFunction(i);
            setActionMapper(actionMapper !== null ? actionMapper.nextActionMapper : null);
        };

        if (newKeyOn !== null) act({ input: newKeyOn, port: 'keyboard' });
        else if (newGamepadOn !== null) act(newGamepadOn);

        keyboardRef.current = keyboard;
        gamepadsRef.current = gamepads;
    }, [keyboard, gamepads, actionMapper, dispatch]);

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

    const getMappingRowElements = (actionName: string, actionMapping: ActionMapping | null, setActionSetter: (mapping: ActionMapping) => (dispatch: Dispatch) => void) => {
        return [
            <div key={actionName}>{actionName}</div>,
            <div key={actionName + '-mapping'}>{actionMapper?.actionName === actionName ? 'AWAITING INPUT...' : mappingToString(actionMapping)}</div>,
            <button
                key={'assign-' + actionName}
                onClick={() => setActionMapper({
                    actionName,
                    mapActionFunction: (newMapping) => dispatch(setActionSetter(newMapping)),
                    nextActionMapper : null
                })}
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
                <button key='assign-all' onClick={() => {
                    const actionMapperKick3: ActionMapper = {
                        actionName: ActionNames.kick3,
                        mapActionFunction: (newMapping) => dispatch(setActionKick3(newMapping)),
                        nextActionMapper: null,
                    };
                    const actionMapperKick2: ActionMapper = {
                        actionName: ActionNames.kick2,
                        mapActionFunction: (newMapping) => dispatch(setActionKick2(newMapping)),
                        nextActionMapper: actionMapperKick3,
                    };
                    const actionMapperKick1: ActionMapper = {
                        actionName: ActionNames.kick1,
                        mapActionFunction: (newMapping) => dispatch(setActionKick1(newMapping)),
                        nextActionMapper: actionMapperKick2,
                    };
                    const actionMapperPunch3: ActionMapper = {
                        actionName: ActionNames.punch3,
                        mapActionFunction: (newMapping) => dispatch(setActionPunch3(newMapping)),
                        nextActionMapper: actionMapperKick1,
                    };
                    const actionMapperPunch2: ActionMapper = {
                        actionName: ActionNames.punch2,
                        mapActionFunction: (newMapping) => dispatch(setActionPunch2(newMapping)),
                        nextActionMapper: actionMapperPunch3,
                    };
                    const actionMapperPunch1: ActionMapper = {
                        actionName: ActionNames.punch1,
                        mapActionFunction: (newMapping) => dispatch(setActionPunch1(newMapping)),
                        nextActionMapper: actionMapperPunch2,
                    };
                    const actionMapperDirectionRight: ActionMapper = {
                        actionName: ActionNames.right,
                        mapActionFunction: (newMapping) => dispatch(setActionDirectionRight(newMapping)),
                        nextActionMapper: actionMapperPunch1,
                    };
                    const actionMapperDirectionLeft: ActionMapper = {
                        actionName: ActionNames.left,
                        mapActionFunction: (newMapping) => dispatch(setActionDirectionLeft(newMapping)),
                        nextActionMapper: actionMapperDirectionRight,
                    };
                    const actionMapperDirectionDown: ActionMapper = {
                        actionName: ActionNames.down,
                        mapActionFunction: (newMapping) => dispatch(setActionDirectionDown(newMapping)),
                        nextActionMapper: actionMapperDirectionLeft,
                    };
                    const actionMapperDirectionUp: ActionMapper = {
                        actionName: ActionNames.up,
                        mapActionFunction: (newMapping) => dispatch(setActionDirectionUp(newMapping)),
                        nextActionMapper: actionMapperDirectionDown,
                    };
                    setActionMapper(actionMapperDirectionUp);
                }}>Assign All</button>,
                ...getMappingRowElements(ActionNames.up, directionUp, setActionDirectionUp),
                ...getMappingRowElements(ActionNames.down, directionDown, setActionDirectionDown),
                ...getMappingRowElements(ActionNames.left, directionLeft, setActionDirectionLeft),
                ...getMappingRowElements(ActionNames.right, directionRight, setActionDirectionRight),
                ...getMappingRowElements(ActionNames.punch1, punch1, setActionPunch1),
                ...getMappingRowElements(ActionNames.punch2, punch2, setActionPunch2),
                ...getMappingRowElements(ActionNames.punch3, punch3, setActionPunch3),
                ...getMappingRowElements(ActionNames.kick1, kick1, setActionKick1),
                ...getMappingRowElements(ActionNames.kick2, kick2, setActionKick2),
                ...getMappingRowElements(ActionNames.kick3, kick3, setActionKick3),
            ]}
        </div>
    </div>;
};

export default Mapper;
