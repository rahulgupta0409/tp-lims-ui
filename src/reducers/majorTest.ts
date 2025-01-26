import { ADD_MAJOR_LAB_TEST, SET_MAJOR_TESTS } from "../actions/actionTypes";

// Define the shape of the state
interface MajorTestsState {
    majorTests: Record<string, any>; // Replace `any` with a more specific type if known
}

// Define the shape of actions
interface SetMajorTestsAction {
    type: typeof SET_MAJOR_TESTS;
    payload: Record<string, any>;
}

interface AddMajorLabTestAction {
    type: typeof ADD_MAJOR_LAB_TEST;
    payload: Record<string, any>;
}

type MajorTestsAction = SetMajorTestsAction | AddMajorLabTestAction;

// Initial state
const initialState: MajorTestsState = {
    majorTests: {},
};

// Reducer function
export default function majorTest(
    state: MajorTestsState = initialState,
    action: MajorTestsAction
): MajorTestsState {
    switch (action.type) {
        case SET_MAJOR_TESTS:
            return { ...state, majorTests: { ...action.payload } };

        case ADD_MAJOR_LAB_TEST:
            return { ...state, majorTests: { ...state.majorTests, ...action.payload } };

        default:
            return state;
    }
}
