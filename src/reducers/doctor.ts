import { SET_ALL_DOCTORS } from "../actions/actionTypes";

// Define the types for the state
interface Doctor {
  id: string;
  name: string;
  [key: string]: any; // You can extend this if the doctor object has more properties
}

interface DoctorsState {
  doctors: Record<string, Doctor> | {}; // or just `Doctor[]` if you want an array
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: DoctorsState = {
  doctors: {},
};

export default function doctors(state = initialState, action: Action): DoctorsState {
  switch (action.type) {
    case SET_ALL_DOCTORS: {
      return { ...state, doctors: { ...action.payload } };
    }
    default:
      return state;
  }
}
