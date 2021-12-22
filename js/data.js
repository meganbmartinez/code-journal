/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var prevEntry = localStorage.getItem('form-data');
if (prevEntry !== null) {
  data = JSON.parse(prevEntry);
}
function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('form-data', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
