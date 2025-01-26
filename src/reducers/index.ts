import { combineReducers, Reducer } from "redux";
import authReducer from "./authReducer";
import majorTest from "./majorTest";
import minorTest from "./minorTest";
import doctors from "./doctor";
import patients from "./patients";

// Define the overall state type
interface RootState {
  authReducer: ReturnType<typeof authReducer>;
  majorTest: ReturnType<typeof majorTest>;
  minorTest: ReturnType<typeof minorTest>;
  doctors: ReturnType<typeof doctors>;
  patients: ReturnType<typeof patients>;
}

interface Action {
  type: string;
  payload?: any;
}

// Combine the reducers with inferred state types
const appReducers = combineReducers({
  authReducer,
  majorTest,
  minorTest,
  doctors,
  patients,
});

// Define the rootReducer with proper types
const rootReducer: Reducer<RootState> = (state: any, action: Action) => {
  return appReducers(state, action);
};

export default rootReducer;
