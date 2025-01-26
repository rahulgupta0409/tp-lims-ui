import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";

// Define the type for the callback function
type CallbackType = (res: any) => void;

// Define the type for the patientIds parameter (assuming it's an array of strings)
type PatientIdsType = string[]; 

export const getProgressByPatientIds = (
  patientIds: PatientIdsType,
  callback?: CallbackType
) => {
  return (dispatch: any) =>
    requestHelper.postRequest({
      url: `${API_URL}/reportProgress/getProgressByPatientIds`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(patientIds),
      onSuccess: (res: any) => {
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};
