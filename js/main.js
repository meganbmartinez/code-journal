/* global data */
/* exported data */

var $deleteButton = document.querySelector('.delete-button');
var $entriesButton = document.querySelector('.entries-button');
var $entriesNone = document.querySelector('.entries-none');
var $entryList = document.querySelector('.entry-list');
var $form = document.querySelector('form');
var $img = document.querySelector('img');
var $newButton = document.querySelector('.new-button');
var $notes = document.querySelector('#notes');
var $pageTitle = document.querySelector('div[data-view="entry-form"] h1');
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
  $pageTitle.textContent = 'New Entry';
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

  event.preventDefault();

  var newEntry = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };

  if (data.edit !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = newEntry.title;
        data.entries[i].photoUrl = newEntry.photoUrl;
        data.entries[i].notes = newEntry.notes;
        var editedEntry = renderEntry(data.entries[i]);
      }
    }

    var replaceEntry = document.querySelector('li[data-entry-id' + '=' + '"' + data.edit.entryId + '"' + ']');
    replaceEntry.replaceWith(editedEntry);
  } else {
    data.nextEntryId++;
    data.entries.unshift(newEntry);
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entryList.prepend(renderEntry(newEntry));
  }
  if (data.entries.length > 0) {
    $entriesNone.className = 'view hidden';
  }
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  switchViews('entries');
  data.edit = null;
}

function renderEntry(entry) {
  var newEl = document.createElement('li');
  newEl.setAttribute('class', 'margin-bottom-1');
  newEl.setAttribute('data-entry-id', entry.entryId);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  newEl.appendChild(row);

  var columnHalfImage = document.createElement('div');
  columnHalfImage.setAttribute('class', 'column-half');
  row.appendChild(columnHalfImage);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  columnHalfImage.appendChild($img);

  var colText = document.createElement('div');
  colText.setAttribute('class', 'column-half');
  row.appendChild(colText);

  var rowName = document.createElement('div');
  rowName.setAttribute('class', 'row space-between align-center');
  colText.appendChild(rowName);

  var $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  rowName.appendChild($h3);

  var pencilIcon = document.createElement('i');
  pencilIcon.setAttribute('class', 'fas fa-pen');
  rowName.appendChild(pencilIcon);

  var paraRow = document.createElement('div');
  paraRow.setAttribute('class', 'row');
  colText.appendChild(paraRow);

  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  paraRow.appendChild($p);

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

$entryList.addEventListener('click', function clickEdit(event) {
  if (!event.target.matches('i')) {
    return;
  }
  switchViews('entry-form');
  for (var i = 0; i < data.entries.length; i++) {
    if (JSON.stringify(data.entries[i].entryId) === (event.target.closest('li').getAttribute('data-entry-id'))) {
      data.edit = data.entries[i];
    }
  }
  $title.value = data.edit.title;
  $photoUrl.value = data.edit.photoUrl;
  $img.setAttribute('src', $photoUrl.value);
  $notes.value = data.edit.notes;
  $pageTitle.textContent = 'Edit Entry';
  $deleteButton.className = 'delete-button view';
});

document.addEventListener('DOMContentLoaded', handleNewEntry);
$entriesButton.addEventListener('click', handleEntryButton);
$form.addEventListener('submit', handleSubmit);
$newButton.addEventListener('click', handleNewButton);
$photoUrl.addEventListener('input', handleInput);
