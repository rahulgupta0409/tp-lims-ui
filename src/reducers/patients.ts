import {
  SET_ALL_PATIENTS,
  SET_PATIENT_TEST_DETAIL,
} from "../actions/actionTypes";

// Define interfaces for the state
interface MinorLabTest {
  testId: string;
  value: any;
}

interface Test {
  testId: string;
  isMajorLabTest?: boolean;
  value?: any;
  minorLabTestList?: MinorLabTest[];
}

interface Patient {
  patientId: string;
  tests: Test[];
}

interface PatientsState {
  patients: Patient[];
}

// Define action interfaces
interface SetAllPatientsAction {
  type: typeof SET_ALL_PATIENTS;
  payload: Patient[];
}

interface SetPatientTestDetailAction {
  type: typeof SET_PATIENT_TEST_DETAIL;
  payload: {
    patientId: string;
    testId: string;
    value: any;
  };
}

type PatientsAction = SetAllPatientsAction | SetPatientTestDetailAction;

// Initial state
const initialState: PatientsState = {
  patients: [],
};

// Reducer function
export default function patients(
  state: PatientsState = initialState,
  action: PatientsAction
): PatientsState {
  switch (action.type) {
    case SET_ALL_PATIENTS: {
      return { ...state, patients: [...action.payload] };
    }

    case SET_PATIENT_TEST_DETAIL: {
      const { patientId, testId, value } = action.payload;

      return {
        ...state,
        patients: state.patients.map((patient) => {
          if (patient.patientId === patientId) {
            return {
              ...patient,
              tests: patient.tests.map((test) => {
                if (test.isMajorLabTest) {
                  return {
                    ...test,
                    minorLabTestList: test.minorLabTestList?.map((mTest) =>
                      mTest.testId === testId
                        ? { ...mTest, value: value } // Update minor lab test
                        : { ...mTest }
                    ),
                  };
                } else if (test.testId === testId) {
                  return { ...test, value: value }; // Update regular test
                }
                return { ...test };
              }),
            };
          }
          return { ...patient };
        }),
      };
    }

    default:
      return state;
  }
}
