import { combineReducers } from 'redux';
import ajaxCallIsInProgress from './ajaxStatusReducers';
import { reducer as reducerForm } from 'redux-form';
import companies from './company'




const rootReducer = combineReducers({
  form: reducerForm,
  ajaxCallIsInProgress,
  companies
})
export default rootReducer;