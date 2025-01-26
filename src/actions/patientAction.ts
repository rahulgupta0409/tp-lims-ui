import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { dateRange } from "../utils/dateRange";
import { SET_ALL_PATIENTS, SET_PATIENT_TEST_DETAIL } from "./actionTypes";

// Type for the patient test detail payload
interface PatientTestDetailPayload {
  patientId: string;
  testId: string;
  value: any; // Adjust this type as necessary
}

// Type for the patient list response (you can adjust this to match the actual response structure)
interface PatientListResponse {
  data: any[]; // Adjust this type according to the actual response structure
}

// Type for the callback function
type CallbackType = (res: any) => void;

export const setPatientTestDetail = (payload: PatientTestDetailPayload) => {
  return {
    type: SET_PATIENT_TEST_DETAIL,
    payload: payload,
  };
};

const setAllPatients = (payload: PatientListResponse) => {
  return {
    type: SET_ALL_PATIENTS,
    payload: payload,
  };
};

export const getAllPatientsListByDate = (
  startDate: string,
  endDate: string,
  callback?: CallbackType
) => {
  let startDateIST: string;
  let endDateIST: string;
  if (startDate !== endDate) {
    startDateIST = dateRange(startDate, 0);
    endDateIST = dateRange(endDate, 0);
  } else {
    startDateIST = dateRange(startDate, 0);
    endDateIST = dateRange(endDate, 1);
  }
  return (dispatch: any) =>
    requestHelper.getRequest({
      url: `${API_URL}/patient/getAllPatientsByDateRange?startDate=${startDateIST}&endDate=${endDateIST}`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onSuccess: (res: PatientListResponse) => {
        dispatch(setAllPatients(res));
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};

export const updatePatientTestDetails = (
  patientId: string,
  testId: string,
  value: any,
  callback?: CallbackType
) => {
  return (dispatch: any) =>
    requestHelper.putRequest({
      url: `${API_URL}/patient/updateTest/${patientId}/tests/${testId}?value=${value}`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onSuccess: (res: any) => {
        dispatch(setPatientTestDetail({ patientId, testId, value }));
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};
