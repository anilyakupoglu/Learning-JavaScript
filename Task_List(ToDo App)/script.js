

const form = document.querySelector('form');
const input = document.querySelector("#txtTaskName");
const btnDelete = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

eventListeners();

loadItems();

function eventListeners(){

	form.addEventListener('submit', addNewItem);

	taskList.addEventListener('click', deleteItem);

	btnDelete.addEventListener('click', deleteAllitems)
}

function loadItems(){

	items = getItemsFromLS();
	items.forEach(function(item){
		createItem(item);

	});
}

function getItemsFromLS(){
if(localStorage.getItem('items')===null){
	items = [];
}else{
	items = JSON.parse(localStorage.getItem('items'));
}
return items;

}

function setItemToLS(text){

	items = getItemsFromLS();
	items.push(text);
	localStorage.setItem('items',JSON.stringify(items));
}


function createItem(text){
	const li = document.createElement('li');
	li.className="list-group-item list-group-item-secondary";
	li.appendChild(document.createTextNode(text));

	const a =document.createElement('a');
	a.className='delete-item float-right';
	a.setAttribute('href', '#');
	a.innerHTML = '<i class = "fas fa-trash-alt"></i>';

	li.appendChild(a);
	taskList.appendChild(li);
}
function addNewItem(e){

	if(input.value ===''){
		alert('Please add new item!');
	}


	createItem(input.value);
	setItemToLS(input.value);
	input.value = '';
	e.preventDefault();
}


function deleteItemFromLS(text){
items = getItemsFromLS();
items.forEach(function (item,index){
	if(item === text){
	items.splice(index,1);
	}
});
localStorage.setItem('items', JSON.stringify(items));
}
function deleteItem(e){

if(e.target.className==='fas fa-trash-alt'){
	e.target.parentElement.parentElement.remove();
}

deleteItemFromLS(e.target.parentElement.parentElement.textContent);

e.preventDefault();
}

function deleteAllitems(e){

while(taskList.firstChild){
	taskList.removeChild(taskList.firstChild);
}
localStorage.clear();
e.preventDefault();
}