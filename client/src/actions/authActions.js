import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  USER_LOADING,
  GET_DOCUMENTS,
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  UPDATE_DOCUMENT,
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
  DELETE_CLIENT_TYPE,
  UPDATE_CLIENT_TYPE,
  GET_USERS,
  PAGE_TITLE,
  SEARCH_DOCUMENT,
  CLEAR_DOCUMENT_SEARCH,
  GET_EMAIL_SETTINGS,
  UPDATE_EMAIL_SETTINGS,
} from "./types";


//Page title

export const setPageTitle = (title) => dispatch => {
  dispatch({
    type: PAGE_TITLE,
    payload: title,
  });
}

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/account/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/account/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ''
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return ({
    type: SET_CURRENT_USER,
    payload: decoded
  });
};

// Get current user
export const getCurrentUser = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get("/api/account/currentuser")
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {

  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};


// Get documents
export const getDocuments = (page, order, orderBy) => dispatch => {
  axios
    .get("/api/document?page=" + page + "&order=" + order + "&orderBy=" + orderBy)
    .then(res => {
      dispatch({
        type: GET_DOCUMENTS,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const searchDocument = params => dispatch => {

  axios.post('/api/document/search', params )
    .then(function(res){
      dispatch({
        type: SEARCH_DOCUMENT,
        payload: res.data
      })
    });
};

export const clearDocumentSearch = () => dispatch => {

  dispatch({
    type: CLEAR_DOCUMENT_SEARCH
  });

}


// Add document
export const addDocument = document => dispatch => {
  axios.post('/api/document', document)
  .then(function(res) {
    dispatch({
      type: ADD_DOCUMENT,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


// Delete  document
export const deleteDocument = document => dispatch => {
  axios.delete('/api/document/' + document._id)
  .then(res => {
    dispatch({
      type: DELETE_DOCUMENT,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


//Update document
export const updateDocument = document => dispatch => {
  axios.put('/api/document/' + document._id, document)
  .then(res => {
    dispatch({
      type: UPDATE_DOCUMENT,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}


export const checkDocument = document => dispatch => {
  axios.put('/api/document/' + document._id + '/check', document)
  .then(res => {
    dispatch({
      type: CHECK_DOCUMENT,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}


export const sendDocumentEmail = document => dispatch => {
  axios.post('/api/document/' + document._id + '/send')
  .then(res => {
    dispatch({
      type: SEND_EMAIL_DOCUMENT,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}


//Get Maintenance
export const getMaintenanceTypes = () => dispatch => {
  axios
    .get("/api/maintenance_type")
    .then(res => {
      dispatch({
        type: GET_MAINTENANCE_TYPES,
        payload: res.data.items
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Add maintenance type
export const addMaintenanceType = item => dispatch => {
  console.log(item);
  axios.post('/api/maintenance_type', {title: item })
  .then(function(res) {
    dispatch({
      type: ADD_MAINTENANCE_TYPE,
      payload: res.data
    });

    getMaintenanceTypes();
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Delete maintenance type
export const deleteMaintenanceType = maintenance => dispatch => {
  axios.delete('/api/maintenance_type/' + maintenance)
  .then(res => {
    dispatch({
      type: DELETE_MAINTENANCE_TYPE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


//Update maintenance type
export const updateMaintenanceType = maintenance => dispatch => {
  axios.put('/api/maintenance_type/' + maintenance._id, maintenance)
  .then(res => {
    dispatch({
      type: UPDATE_MAINTENANCE_TYPE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}


//Get Zones

export const getZones = () => dispatch => {
  axios
    .get("/api/zone")
    .then(res => {
      dispatch({
        type: GET_ZONES,
        payload: res.data.items
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Add zone
export const addZone = item => dispatch => {

  axios.post('/api/zone', {name: item })
  .then(function(res) {
    dispatch({
      type: ADD_ZONE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


// Delete zone
export const deleteZone = zoneId => dispatch => {
  axios.delete('/api/zone/' + zoneId)
  .then(res => {
    dispatch({
      type: DELETE_ZONE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


//Update zone
export const updateZone = zone => dispatch => {
  axios.put('/api/zone/' + zone._id, zone)
  .then(res => {
    dispatch({
      type: UPDATE_ZONE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}



//Get Client Type

export const getClientTypes = () => dispatch => {
  axios
    .get("/api/client_type")
    .then(res => {
      dispatch({
        type: GET_CLIENT_TYPE,
        payload: res.data.items
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Add client type
export const addClientType = item => dispatch => {

  axios.post('/api/client_type', {name: item })
  .then(function(res) {
    dispatch({
      type: ADD_CLIENT_TYPE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


// Delete client type
export const deleteClientType = clientId => dispatch => {
  axios.delete('/api/client_type/' + clientId)
  .then(res => {
    dispatch({
      type: DELETE_CLIENT_TYPE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


//Update client type
export const updateClientType = client => dispatch => {
  axios.put('/api/client_type/' + client._id, client)
  .then(res => {
    dispatch({
      type: UPDATE_CLIENT_TYPE,
      payload: res.data
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

//Get users

export const getUsers = users => dispatch => {
  axios.get('/api/users')
  .then(res => {
    dispatch({
      type: GET_USERS,
      payload: res.data.users
    });
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

//Get email settings

export const getEmailSettings = settings => dispatch => {
  axios.get('/api/email_settings')
  .then( res => {
    dispatch({
      type: GET_EMAIL_SETTINGS,
      payload: res.data
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}


//Update email settings

export const updateEmailSettings = formData => dispatch => {


  axios({
    url: '/api/email_settings',
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
      }
  })
  .then (res => {
    dispatch({
      type: UPDATE_EMAIL_SETTINGS,
      payload: res.data
    })
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  });
}
