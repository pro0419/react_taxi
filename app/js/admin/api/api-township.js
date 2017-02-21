export function requestData(type) {
  return {type: type}
};

export function receiveData(json, type) {
  return{
    type: type,
    data: json
  }
};

export function receiveError(json, type) {
  return {
    type: type,
    data: json
  }
};

export function updateData(json, type) {
  return {
    type: type,
    data: json
  }
};