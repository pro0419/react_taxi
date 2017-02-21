export const optionsSelectize = (fetchedData, dataField) => {
  return fetchedData.map(function(data){
    if (data[dataField] === null || data[dataField] === undefined) {
      return {id: data.id, label: 'n/a - submitted blank', value: 'n/a - submitted blank'}
    } else if (typeof data[dataField] !== 'string') {
      return {id: data.id, label: data[dataField].toString(), value: data[dataField].toString()}
    } else {
      return {id: data.id, label: data[dataField], value: data[dataField]}
    }
  });
};