import {CONTACT_LIST, CONTACT_ADD, CONTACT_EDIT, CONTACT_DELETE} from "./actionTypes";
import axios from "axios";


export const getContacts = () => {  // public function when adding export
    return dispatch => {
        axios
        .get("http://localhost:1337/contact")
        .then( response => {
            console.log("response : ",response.data);
            dispatch(setContactsList(response.data))

        })
        .catch(error => {
            console.log("error : ", error)
            dispatch(setContactsList())
        })
    }
}

export const setContactsList = value =>{
    return{
        type: CONTACT_LIST,
        listcontacts: value
    };
};