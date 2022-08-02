const title = document.querySelector('.title')
const price = document.querySelector('.price')
const taxs = document.querySelector('.taxs')
const ads = document.querySelector('.ads')
const discount = document.querySelector('.discount')
const inputs = document.querySelectorAll('.money input')
const no = document.querySelector('.no')
const count = document.querySelector('.count')
const category = document.querySelector('.category')
const createBtn = document.querySelector('.create')
const clear = document.querySelector('.clear')
const searchInput = document.querySelector('.search')

let arr
let tmp
let mood = 'create'

if(localStorage.getItem('data')) {
    arr = JSON.parse(localStorage.getItem('data'))
}else {
    arr = []
}

window.onload = title.focus()

createBtn.addEventListener('click', () => {
        if(title.value.length > 0) {
            addData()
            addProduct(arr)
            addToLocal(arr)
            empty()
            title.focus()
        }

})

function money() {
    if(price.value.length > 0) {
        no.innerHTML = +price.value + +taxs.value + +ads.value - discount.value
        no.parentNode.style.backgroundColor = '#040'
    }else{
        no.innerHTML = ''
        no.parentNode.style.backgroundColor = '#f00'
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', () => {
        money()
    })
})

function empty() {
    title.value = ''
    no.innerHTML = ''
    price.value = ''
    taxs.value = ''
    ads.value = ''
    discount.value = ''
    count.value = ''
    category.value = ''
}

function addData() {
    let data = {
        title : title.value,
        price : price.value,
        taxs : taxs.value,
        ads : ads.value,
        discount : discount.value,
        total: no.innerHTML,
        count : count.value,
        category : category.value,
    }
    if(mood === 'create') {
        if(title.value.length > 0 && price.value.length > 0 && category.value.length > 0) {
            for(let i = 0; i < data.count; i++) {
                arr.push(data)
            }
        }
    }else {
        arr[tmp] = data
        no.parentNode.style.backgroundColor= '#f00'
        count.style.display = 'block'
        mood = 'create'
        createBtn.innerHTML = 'Create'
    }
    addToLocal(arr)
}

function addProduct(arr) {
        let html = ''
        for(let i = 0; i < arr.length; i++) {
            html +=
                `<tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].title}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].taxs}</td>
                    <td>${arr[i].ads}</td>
                    <td>${arr[i].discount}</td>
                    <td>${arr[i].total}</td>
                    <td>${arr[i].category}</td>
                    <td><button class='btn update' onclick='updateData(${i})'>Update</button></td>
                    <td><button class='btn delete' onclick='deleteData(${i})'>Delete</button></td>
                </tr>`
            }
            document.querySelector('.bodyTable').innerHTML = html
            addcount()
}

addProduct(arr)

function addToLocal(arr) {
    localStorage.setItem('data', JSON.stringify(arr))
}

function deleteData(e) {
    arr.splice(e, 1)
    addToLocal(arr)
    addProduct(arr)
}

function addcount(){
    if(arr.length > 0) {
        clear.innerHTML = `Clear All (${arr.length})`
    }else {
        clear.innerHTML = 'Clear All'
    }
}

clear.addEventListener('click', () => {
    document.querySelector('.bodyTable').innerHTML = ''
    arr = []
    addToLocal(arr)
    addcount()
})

function updateData(i) {
    title.value = arr[i].title
    price.value = arr[i].price
    taxs.value = arr[i].taxs
    ads.value = arr[i].ads
    discount.value = arr[i].discount
    category.value = arr[i].category
    mood = 'update'
    title.focus()
    money()
    count.style.display = 'none'
    createBtn.innerHTML = 'Update'
    tmp = i
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

function searchData(value) {
    let table = ''
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].title.includes(value.toLowerCase()) || arr[i].category.includes(value.toLowerCase())) {
            table +=
                `<tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].title}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].taxs}</td>
                    <td>${arr[i].ads}</td>
                    <td>${arr[i].discount}</td>
                    <td>${arr[i].total}</td>
                    <td>${arr[i].category}</td>
                    <td><button class='btn update' onclick='updateData(${i})'>Update</button></td>
                    <td><button class='btn delete' onclick='deleteData(${i})'>Delete</button></td>
                </tr>`
        }
    }
    document.querySelector('.bodyTable').innerHTML = table
}
searchInput.addEventListener('keyup', () => {
    searchData(searchInput.value)
})