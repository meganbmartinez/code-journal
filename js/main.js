/* global data */
/* exported data */

var $entriesButton = document.querySelector('.entries-button');
var $entryList = document.querySelector('.entry-list');
var $entriesNone = document.querySelector('.entries-none');
var $form = document.querySelector('form');
var $img = document.querySelector('img');
var $newButton = document.querySelector('.new-button');
var $notes = document.querySelector('#notes');
var $photoUrl = document.querySelector('#url');
var $showNodeList = document.querySelectorAll('.view');
var $title = document.querySelector('#title');

function handleEntryButton(event) {
  switchViews('entries');
}

function handleInput(event) {
  if ($photoUrl.value !== '') {
    $img.setAttribute('src', $photoUrl.value);
  } else {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

function handleNewButton(event) {
  switchViews('entry-form');
}

function handleNewEntry(event) {
  switchViews(data.view);

  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }

  if (data.entries.length > 0) {
    $entriesNone.className = 'view hidden';
  }
}

function handleSubmit(event) {
  var newEntry = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $entryList.prepend(renderEntry(newEntry));

  switchViews('entries');

  if (data.entries.length > 0) {
    $entriesNone.className = 'view hidden';
  }
}

function renderEntry(entry) {
  var newEl = document.createElement('li');
  newEl.setAttribute('class', 'margin-bottom');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  newEl.appendChild(row);

  var columnHalfImage = document.createElement('div');
  columnHalfImage.setAttribute('class', 'column-half');
  row.appendChild(columnHalfImage);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  columnHalfImage.appendChild($img);

  var columnHalfText = document.createElement('div');
  columnHalfText.setAttribute('class', 'column-half');
  row.appendChild(columnHalfText);

  var $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  columnHalfText.appendChild($h3);

  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  columnHalfText.appendChild($p);

  return newEl;
}

function switchViews(viewName) {
  for (var i = 0; i < $showNodeList.length; i++) {
    if ($showNodeList[i].getAttribute('data-view') === viewName) {
      $showNodeList[i].className = 'view';
    } else {
      $showNodeList[i].className = 'view hidden';
    }
  }
  data.view = viewName;
}

document.addEventListener('DOMContentLoaded', handleNewEntry);
$entriesButton.addEventListener('click', handleEntryButton);
$form.addEventListener('submit', handleSubmit);
$newButton.addEventListener('click', handleNewButton);
$photoUrl.addEventListener('input', handleInput);
