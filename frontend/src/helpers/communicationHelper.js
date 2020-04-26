/* global $ */

function sendPost(route, data = null) {
  let formData = null;
  if (data) {
    if (data instanceof HTMLFormElement) formData = new FormData(data);
    else {
      formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
  }
  return $.ajax({
    url: process.env.REACT_APP_SERVER_ROOT + route,
    data: formData,
    type: 'POST',
    processData: false,
    contentType: false,
    xhrFields: {
      withCredentials: true,
    },
  });
}

function get(route) {
  return $.ajax({
    url: process.env.REACT_APP_SERVER_ROOT + route,
    type: 'GET',
    xhrFields: {
      withCredentials: true,
    },
  });
}

export {
  sendPost, get,
};
