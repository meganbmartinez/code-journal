/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photoUrl');
var $imageContainer = document.querySelector('.image-container');
var $entryForm = document.querySelector('#entry-form');

function handleInput(event) {
  $imageContainer.setAttribute('src', $photoUrl.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var entry = {
    title: $entryForm.elements.title.value,
    photoUrl: $entryForm.elements.photoUrl.value,
    notes: $entryForm.elements.notes.value
  };
  entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entry);
  $imageContainer.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$photoUrl.addEventListener('input', handleInput);
$entryForm.addEventListener('submit', handleSubmit);
