import { ADD_MINOR_LAB_TEST, SET_MINOR_TESTS } from "../actions/actionTypes";

// Define the shape of the state
interface MinorTestsState {
    minorTests: Record<string, any>; // Replace `any` with a more specific type if known
}

// Define the shape of actions
interface SetMinorTestsAction {
    type: typeof SET_MINOR_TESTS;
    payload: Record<string, any>;
}

interface AddMinorLabTestAction {
    type: typeof ADD_MINOR_LAB_TEST;
    payload: Record<string, any>;
}

type MinorTestsAction = SetMinorTestsAction | AddMinorLabTestAction;

// Initial state
const initialState: MinorTestsState = {
    minorTests: {},
};

// Reducer function
export default function minorTest(
    state: MinorTestsState = initialState,
    action: MinorTestsAction
): MinorTestsState {
    switch (action.type) {
        case SET_MINOR_TESTS: {
            return { ...state, minorTests: { ...action.payload } };
        }
        case ADD_MINOR_LAB_TEST: {
            return { ...state, minorTests: { ...state.minorTests, ...action.payload } };
        }
        default:
            return state;
    }
}
