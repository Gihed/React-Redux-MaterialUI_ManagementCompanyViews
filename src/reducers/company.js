import actions from "redux-form/lib/actions";
import {COMPANY_LIST, COMPANY_ADD, COMPANY_EDIT, COMPANY_DELETE} from "../actions/actionTypes";

const initialState = {
    companies: []
    
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_LIST:
        return{
            ... state,
            companies:actions.listcompany
        };
    default:
        return state;
}
};
export default reducer;