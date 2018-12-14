const getById = id => document.getElementById(id)

let help = getById('help')
let open = getById('open')
let close = getById('close')

help.addEventListener('click', toggle('hidden'));

function toggle (id) {
	return function () {
	    let help = getById(id);

	    if (help.style.display == "block") {
	      help.style.display = "none"
	      close.style.display = "none"
	      open.style.display = "block"
	    } else {
	      help.style.display = "block"
	      close.style.display = "block"
	      open.style.display = "none"
	    }
	}
}

let form = getById('registration')
form.onsubmit = save

let data = [
		{ fullname: "lkjljl", email: "lkj@sf.com", city: "jj", group: "Sometimes", days: ['Mon'], date: splitAndStyle('14/12/2018, 14:19:51') + '<i class="fa fa-trash-alt grey end on-hover" onclick="remove(this)"></i>' },
		{ fullname: "lkjljl", email: "lkj@sf.com", city: "jj", group: "Sometimes", days: ['Tue'], date: splitAndStyle('14/12/2018, 14:19:51') + '<i class="fa fa-trash-alt grey end on-hover" onclick="remove(this)"></i>' },
		{ fullname: "lkjljl", email: "lkj@sf.com", city: "jj", group: "Sometimes", days: ['Wed'], date: splitAndStyle('14/12/2018, 14:19:51') + '<i class="fa fa-trash-alt grey end on-hover" onclick="remove(this)"></i>' }
	]

data.map(showData)

function save (event) {
	event.preventDefault();
	const elems = form.elements;

    let obj = {};
    let i = 0
    for (let i = 0; i < elems.length; i++){
        let item = elems.item(i)
        if (item.type == 'radio' && item.checked) {
        	obj[item.name] = item.value
        }
        if (item.type == 'checkbox' && item.checked) {
        	let name = obj[item.name]

        	if (!name)
        		obj[item.name] = []

    			obj[item.name].push(item.value)
        }
        const invalidTypes = ['submit', 'reset', 'checkbox', 'radio']
        if (invalidTypes.every(type => type !== item.type)){
            obj[item.name] = item.value;
        }
    }

    obj["date"] = splitAndStyle(new Date().toLocaleString()) +
    	'<i class="fa fa-trash-alt grey end on-hover" onclick="remove(this)"></i>';

	showData(obj)

	form.reset()
}

function splitAndStyle (str) {
	let [date, time] = str.split(',')
	return date + `<span class="fontS dark-grey">${time}</span>`
}

function showData (obj) {
	let tbody = getById('bikers').getElementsByTagName('tbody')[0]

	let row = "<tr>"
	Object.values(obj)
		.map(value => row += `<td>${value}</td>`)
	row += "</tr>"

	tbody.innerHTML += row
}

function remove (e) {
	let elem = e.parentNode.parentNode
	elem.parentNode.removeChild(elem)
}
