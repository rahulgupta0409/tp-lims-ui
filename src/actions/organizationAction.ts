import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { SET_ALL_ORGANIZATION } from "./actionTypes";

// Define the type for the organization response (adjust this based on the actual response structure)
interface OrganizationResponse {
  data: any[]; // Adjust this type to match the actual response structure
}

// Define the type for the callback function
type CallbackType = (res: any) => void;

// Action creator for setting all organizations
const setAllOrganization = (payload: OrganizationResponse) => {
  return {
    type: SET_ALL_ORGANIZATION,
    payload: payload,
  };
};

// Thunk action to fetch all organizations
export const getAllOrganization = (callback?: CallbackType) => {
  return (dispatch: any) =>
    requestHelper.getRequest({
      url: `${API_URL}/organization/getAllOrganizations`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onSuccess: (res: OrganizationResponse) => {
        dispatch(setAllOrganization(res));
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};
