import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_CURRENT_USER,
  GET_DOCUMENTS,
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  CHECK_DOCUMENT,
  SEND_EMAIL_DOCUMENT,
  GET_MAINTENANCE_TYPES,
  ADD_MAINTENANCE_TYPE,
  DELETE_MAINTENANCE_TYPE,
  UPDATE_MAINTENANCE_TYPE,
  GET_ZONES,
  ADD_ZONE,
  DELETE_ZONE,
  UPDATE_ZONE,
  GET_CLIENT_TYPE,
  ADD_CLIENT_TYPE,
  UPDATE_CLIENT_TYPE,
  DELETE_CLIENT_TYPE,
  GET_USERS,
  PAGE_TITLE,
  SEARCH_DOCUMENT,
  CLEAR_DOCUMENT_SEARCH,
  GET_EMAIL_SETTINGS,
  UPDATE_EMAIL_SETTINGS
} from "../actions/types";


const isEmpty = require("is-empty");


const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  pageTitle: ''
};


export default function(state = initialState, action) {

  switch (action.type) {
    case PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload.documents,
        count: action.payload.count,
        reload: false,
      }
    case SEARCH_DOCUMENT:
      return {
        ...state,
        s_documents: action.payload.documents,
        s_count: action.payload.count,
        reload: false,
      }
    case CLEAR_DOCUMENT_SEARCH:
        return {
          ...state,
          s_documents: null,
          reload: false,
        }
    case ADD_DOCUMENT:
      return {
        ...state,
        reload: true,
      }
    case UPDATE_DOCUMENT:
      return {
          ...state,
          reload: true,
      }
    case SEND_EMAIL_DOCUMENT:
      return {
        ...state,
        reload: true
      }
    case DELETE_DOCUMENT:
      return {
        ...state,
        reload: true,
      }
    case CHECK_DOCUMENT:
      return{
        ...state,
        reload: true,
      }
    case GET_MAINTENANCE_TYPES:
      return {
        ...state,
        maintenance_types: action.payload,
        reload: false
      }
    case ADD_MAINTENANCE_TYPE:
      return {
        ...state,
        reload: true,
      }
    case DELETE_MAINTENANCE_TYPE:
        return {
          ...state,
          reload: true,
        }
    case UPDATE_MAINTENANCE_TYPE:
        return {
          ...state,
          reload: true,
        }
    case GET_ZONES:
      return {
        ...state,
        zones: action.payload,
        reload: false
      }
    case ADD_ZONE:
      return {
        ...state,
        reload: true,
      }
    case DELETE_ZONE:
        return {
          ...state,
          reload: true,
        }
    case UPDATE_ZONE:
        return {
          ...state,
          reload: true,
        }
    case GET_CLIENT_TYPE:
      return {
        ...state,
        client_types: action.payload,
        reload: false
      }
    case ADD_CLIENT_TYPE:
      return {
        ...state,
        reload: true,
      }
    case DELETE_CLIENT_TYPE:
        return {
          ...state,
          reload: true,
        }
    case UPDATE_CLIENT_TYPE:
        return {
          ...state,
          reload: true,
        }
    case GET_USERS:
        return {
          ...state,
          users: action.payload
        }
    case GET_EMAIL_SETTINGS:
        return {
          ...state,
          email: action.payload.items,
          reload: false,
        }
    case UPDATE_EMAIL_SETTINGS:
      return {
        ...state,
        reload: true,
      }
    default:
      return state;
  }
}
