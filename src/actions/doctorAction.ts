import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { SET_ALL_DOCTORS } from "./actionTypes";

// Define the type for the doctors response (you should adjust the structure based on the actual API response)
interface DoctorResponse {
  data: any[]; // Adjust this to the actual data structure for doctors
}

// Define the type for the callback function
type CallbackType = (res: any) => void;

// Action creator for setting the list of doctors
const setAllDoctors = (payload: DoctorResponse) => {
  return {
    type: SET_ALL_DOCTORS,
    payload: payload,
  };
};

// Thunk action to fetch all doctors
export const getAllDoctors = (callback?: CallbackType) => {
  return (dispatch: any) =>
    requestHelper.getRequest({
      url: `${API_URL}/doctors/getAllDoctors`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onSuccess: (res: DoctorResponse) => {
        dispatch(setAllDoctors(res));
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};
