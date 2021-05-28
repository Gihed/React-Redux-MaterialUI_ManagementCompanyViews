import {COMPANY_LIST, COMPANY_ADD, COMPANY_EDIT, COMPANY_DELETE} from "./actionTypes";
import axios from "axios";




export const getCompanies = () => {  // public function when adding export
    return dispatch => {
        axios
        .get("http://localhost:1337/company")
        .then( response => {
            console.log("response : ",response.data);
            dispatch(setCompaniesList(response.data))

        })
        .catch(error => {
            console.log("error : ", error)
            dispatch(setCompaniesList())
        })
    }
}

export const setCompaniesList = value =>{
    return{
        type: COMPANY_LIST,
        listcompany: value
    };
};