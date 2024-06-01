let server_url = 'http://localhost:3000/employees';


//To set the initial state --  and populate the data for the first time
displayPagination(0);


//=======================pagenation=============================================================================//


//The state 
let state = {
    page: 1,
    rows: 3,
    window: 3,
    users: []
};

//the dom element corresponding to employee row value is fetched.
let employeesInRow = document.getElementById('employee-row');

//adding an event-listner change to the element ,whenever the value changes the function triggers
employeesInRow.addEventListener('change', handleRowValueChnage);


//function to handle the value change in the element
function handleRowValueChnage(event) {
    state.rows = parseInt(event.target.value);
    state.page = 1;
    displayPagination(1);
}

//default value to show in the front end
document.getElementById('employee-row').value = state.rows;



async function pageNationsetUp() {
    let allUsers = state.users;

    let currentPage = state.page;
    let noOfRows = state.rows;



    const trimStart = (currentPage - 1) * noOfRows;
    const trimEnd = trimStart + noOfRows;

    const trimData = allUsers.slice(trimStart, trimEnd);

    const pages = Math.ceil(allUsers.length / noOfRows);

    return {
        trimedUserData: trimData,
        pages: pages
    };
}

//Pagenation button functionalities
async function pageNationButton(pages) {
    const buttonDiv = document.getElementById('page-button-wrapper');
    let buttonHtml = `<button id='firstPageButton' class="btn btn-info"><span class="material-symbols-outlined">
    keyboard_double_arrow_left
    </span></button>`;

    buttonHtml += '<button id="chvrn_left" class="btn  btn-lg  btn-info"><span class="material-symbols-outlined"> chevron_left </span> </button>';

    let maxLeft = (state.page - Math.floor(state.window / 2));
    let maxRight = (state.page + Math.floor(state.window / 2));
    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.window;
    }
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1);
        maxRight = pages;

        if (maxLeft < 1) {
            maxLeft = 1;
        }
    }
    for (let page = maxLeft; page <= maxRight; page++) {
        buttonHtml += `<button value="${page}" class='btn button_page btn-lg  btn-info'>${page}</button>`;
    }

    buttonHtml += '<button id ="chvrn_right" class="btn  btn-lg  btn-info"><span class="material-symbols-outlined"> chevron_right </span> </button>';
    buttonHtml += `<button id='lastPageButton' class="btn "><span class="material-symbols-outlined">
    keyboard_double_arrow_right
    </span> </button>`
    buttonDiv.innerHTML = buttonHtml;
    document.getElementById('firstPageButton').addEventListener('click', () => {
        state.page = 1;
        displayPagination(1);

    });
    document.getElementById('lastPageButton').addEventListener('click', () => {
        state.page = pages;
        displayPagination(1);

    });

    document.getElementById('chvrn_left').addEventListener('click', () => {



        let currentPage = state.page;
        let nextPage = currentPage - 1;
        if (nextPage < 1) {
            nextPage = 1;
        }
        state.page = nextPage;
        displayPagination(1);

    });
    document.getElementById('chvrn_right').addEventListener('click', () => {


        let currentPage = state.page;
        let nextPage = currentPage + 1;
        if (nextPage > pages) {
            nextPage = pages;
        }
        state.page = nextPage;
        displayPagination(1);

    });
    const pageNationButtons = document.getElementsByClassName('button_page');
    Array.from(pageNationButtons).forEach((eachPageBtn) => {
        eachPageBtn.addEventListener('click', async () => {

            state.page = parseInt(eachPageBtn.value);
            await displayPagination(1);



        });
    });

}

//function to populate data on each row on the table
async function eachRowData(start_value, user, month) {


    return (`<tr scope='row' >
                <td scope='col' class='td-data'>#0${start_value}</td>
                <td scope='col'  class='td-data d-flex align-items-center  gap-2'>
                   <span>
                    ${user.hasOwnProperty('avatar')
            ? `<img src="${server_url}/${user.avatar.split('.')[0]}/avatar" class="side_images">`
            : `<div class="side_images d-flex align-items-center justify-content-center">${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}</div>`
        }
                </span>
                    ${user.salutation + ' ' + user.firstName + ' ' + user.lastName}
                </td>
                <td scope='col' class='td-data'>${user.email}</td>
                <td scope='col' class='td-data'>${user.phone}</td>
                <td scope='col' class='td-data'>${user.gender}</td>
                <td scope='col' class='td-data'>${user.dob.split('-')[0] + ' ' + month + ' ' + user.dob.split('-')[2]}</td>
                <td scope='col' class='td-data'>${user.country}</td>
                <td scope='col' class='edit'>
                    <span class='material-symbols-outlined select-dots'>
                        more_horiz
                    </span>
                    <ul class='edit-details'>
                        <li class='d-flex'>
                            <span class='material-symbols-outlined'>visibility</span>
                            <a class='view_btn' value="${user.id}" href="view.html?id=${user.id}">View Details</a>
                           
                        </li>
                        <li class='d-flex'>
                            <span class='material-symbols-outlined'>edit</span>
                            <button class='edit_btn' value="${user.id}">Edit</button>
                        </li>
                        <li class='d-flex'>
                            <span class='material-symbols-outlined'>delete</span>
                            <button class='delete_btn' value="${user.id}">Delete</button>
                        </li>
                    </ul>
                </td>
            </tr>`);

}


//function to call all related pagenation functions in order
async function displayPagination(Option) {

    if (Option == 0) {
        let allUsers = await fetchUser('all');

        state.users = allUsers;
        const pageNationSetUpData = await pageNationsetUp();

        const trimedUserData = pageNationSetUpData.trimedUserData;

        let start_value = (parseInt(state.page) - 1) * parseInt(state.rows) + 1;

        let eachRows = '';


        for (let user of trimedUserData) {

            let month = await getcurrentmonth(parseInt(user.dob.split('-')[1]));

            eachRows += await eachRowData(start_value, user, month);
            start_value++;
        };


        document.getElementById("table-body").innerHTML = eachRows;
        pageNationButton(pageNationSetUpData.pages);
    }
    else {


        const pageNationSetUpData = await pageNationsetUp();

        const trimedUserData = pageNationSetUpData.trimedUserData;

        let start_value = (parseInt(state.page) - 1) * parseInt(state.rows) + 1;

        let eachRows = '';


        for (let user of trimedUserData) {

            let month = await getcurrentmonth(parseInt(user.dob.split('-')[1]));

            eachRows += await eachRowData(start_value, user, month);
            start_value++;
        };


        document.getElementById("table-body").innerHTML = eachRows;
        pageNationButton(pageNationSetUpData.pages);
    }

    document.getElementsByClassName('page-option')[1].innerText = `of ${state.users.length}`;




    addCLickEvent();
    editemployees();

    let pageButtons = document.getElementsByClassName('button_page');

    Array.from(pageButtons).forEach((eachBtn) => {
        if (eachBtn.value == state.page) {
            eachBtn.classList.add('btn_onchange');
        }
    })
}




//=================================ENd of Pagenation==========================================================================//

//==================Employee --Addding, viewing,editing,deleting ,===================//


//Adding Click events to each of the user


async function addCLickEvent() {

    let selectDotsElements = document.getElementsByClassName('select-dots');

    Array.from(selectDotsElements).forEach((each_dot, index) => {



        each_dot.addEventListener('click', () => {
            if (document.getElementsByClassName('edit-details')[index].style.display === 'flex') {
                document.getElementsByClassName('edit-details')[index].style.display = 'none';
            }
            else {
                document.getElementsByClassName('edit-details')[index].style.display = 'flex';
                document.getElementsByClassName('edit-details')[index].style.flexDirection = 'column';
                document.getElementsByClassName('edit-details')[index].style.padding = '15px';
                document.getElementsByClassName('edit-details')[index].style.gap = '10px';
            }
        })
    });


}

function editemployees() {

    let btns = document.querySelectorAll('.edit-details button');
    Array.from(btns).forEach(async (btn) => {
        if (btn.className === 'view_btn') {
            await view_employee(btn)
        }

        if (btn.className === 'edit_btn') {

            await edit_employee(btn);
        }
        if (btn.className == 'delete_btn') {

            await delete_employee(btn);


        }

    })
}

//It also enable the form section.function trigger when a click happens
async function addingEmployee() {

    document.getElementsByClassName('card')[0].style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementsByClassName('btn-add')[0].innerHTML = 'Add Employee';
    document.getElementsByClassName('edit_image_div')[0].style.display = 'none';
    document.getElementsByClassName("label_upld")[0].style.display = 'block';
    await clearFormEntries();
    let All_error = document.getElementsByClassName('err');
    //clearing any errors displayed , for previous function call
    for (let each of All_error) {
        each.innerHTML = '';
    }
    //add event listner to form submision
    document.getElementById('form').addEventListener('submit', handlingFormSubmission);
}


// add event listner to add EMployee button
document.getElementById('add_employee').addEventListener('click', addingEmployee);




//function to add or update employee
async function addOrSaveEmployee(URL, method, value) {



    let errors = await validateEmployee(value);
    let All_error = document.getElementsByClassName('err');
    for (let each of All_error) {
        each.innerHTML = '';
    };
    errors.map((each) => {
        let eachError = each.split(' ')[0].toLocaleLowerCase();
        console.log(eachError);
        if (eachError != 'invalid') {
            document.getElementById(`${eachError}` + '_err').innerText = each;
        }
        if (eachError == 'invalid') {
            let eachError = each.split(' ')[1].toLocaleLowerCase();
            document.getElementById(`${eachError}` + '_err').innerText = each;
        }
    });


    if (errors.length == 0) {
        try {
            let response = await fetch(URL, {
                method: `${method}`, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value)
            });
            let data = await response.json();

            if (method == 'PUT') {
                let idofEmp = URL.split('/').pop();
                value['id'] = idofEmp;
                let src = document.getElementsByClassName('edit-image')[0].src;
                let defaultOrAvaatar = src.split('/').pop().split('.').shift();

                if (defaultOrAvaatar != 'default') {
                    value['avatar'] = `${idofEmp}.jpg`;
                }

            }
            if (value.hasOwnProperty('id')) {

                let users = state.users;
                let id = URL.split('/').pop();
                let objectToRemove = users.filter((each) => {
                    return each.id == id;
                });




                let newobject = value;

                //Used spread operator to remove the old elemeent and addd the new elemeent
                let newArray = [
                    newobject, ...state.users.filter(obj => obj !== objectToRemove[0])
                ];

                state.users = [...newArray];

            }
            else {
                let src = document.getElementsByClassName('edit-image')[0].src;
                let defaultOrAvaatar = src.split('/').pop().split('.').shift();

                if (defaultOrAvaatar != 'default') {
                    value['avatar'] = `${data.id}.jpg`;
                }
                value.id = data.id;
                state.users = [value, ...state.users];

            }



            document.getElementsByClassName('card')[0].style.display = 'none';
            document.querySelector('.add-emp-cnfrmation h5').innerText = data['message'];
            document.getElementsByClassName('add-emp-cnfrmation')[0].style.display = 'flex';
            document.getElementsByClassName('employee-add-btn')[0].addEventListener('click', () => {
                document.getElementsByClassName('add-emp-cnfrmation')[0].style.display = 'none';
                document.getElementById('overlay').style.display = 'none';


                displayPagination(1);



            });
            return (data.id)


        }
        catch (err) {
            console.error(`chehck URL : ${err}`)
        }
    }




}

//function to upload image
async function uploadOrUpdateImage(img_url, image_object) {
    await fetch(img_url, {
        method: 'POST',
        body: image_object
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Check the URL please');

        } else {
            return response.json();
        }

    }).then((data) => {
        return data;
    });



}

//this function will be triggered when the submit event triggered
async function handlingFormSubmission(event) {
    event.preventDefault();

    let btnnInnerHTML = document.getElementsByClassName('btn-add')[0].innerHTML;

    let addOrSave = btnnInnerHTML.split(' ')[0].toLocaleLowerCase();
    let dob = document.getElementById('date_of_birth').value;
    let crctdDob = dob.slice(8, 10) + '-' + dob.slice(5, 7) + '-' + dob.slice(0, 4);
    let value = {

        "salutation": `${document.getElementById('salutation').value}`,
        "firstName": `${document.getElementById('first_name').value}`,
        "lastName": `${document.getElementById('last_name').value}`,
        "email": `${document.getElementById('email').value}`,
        "phone": `${document.getElementById('mobile_number').value}`,
        "dob": crctdDob,
        "gender": `${document.querySelector('input[name="gender"]:checked').value}`,
        "qualifications": `${document.getElementById('qualification').value}`,
        "address": `${document.getElementById('address').value}`,
        "city": `${document.getElementById('city').value}`,
        "state": `${document.getElementById('state').value}`,
        "country": `${document.getElementById('country').value}`,
        "username": `${document.getElementById('username').value}`,
        "password": `${document.getElementById('password').value}`

    };

    if (addOrSave == 'add') {
        let URL = server_url;
        let method = 'POST';

        let returnValue = await addOrSaveEmployee(URL, method, value);



        if (returnValue == 'error') {
            console.log('There are some error while adding employee');
        }
        else {

            let image = await document.getElementById('file').files[0];
            console.log(image);

            if (image) {
                let img_url = `${server_url}/${returnValue}/avatar`;
                let image_object = new FormData();
                image_object.append('avatar', image);

                await uploadOrUpdateImage(img_url, image_object);
            }


        }



    }
    else if (addOrSave == 'save') {
        let user = document.getElementsByClassName('btn-add')[0].value;
        let URL = server_url + '/' + user;
        let method = 'PUT';
        await addOrSaveEmployee(URL, method, value);
        let image = await document.getElementById('edit_image').files[0];
        if (image) {
            let img_url = `${server_url}/${user}/avatar`;
            let image_object = new FormData();
            image_object.append('avatar', image);
            await uploadOrUpdateImage(img_url, image_object);

        }



    }
}

async function validateEmployee(value) {
    let userData = value;
    let errorStack = [];
    for (let data in userData) {

        if (userData[data] == '' || userData[data] == '--') {
            errorStack.push(`${data} is required`);
        }
        else if (data === 'phone') {
            const regExpPhone = /^\d{10}$/;
            let check = regExpPhone.test(userData[data]);
            if (!check) {
                errorStack.push(`invalid phone number`);

            }
        }
        else if (data === 'email') {
            const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let check = regExpEmail.test(userData[data]);
            if (!check) {
                errorStack.push(`invalid email`);
            }
        }

    }
    return errorStack;
}
//function to edit employee
async function edit_employee(btn) {

    btn.addEventListener('click', async () => {

        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.getElementsByClassName("label_upld")[0].style.display = 'none';
        document.getElementsByClassName("btn-add")[0].innerHTML = 'Save Changes';
        document.getElementsByClassName('edit_image_div')[0].style.display = 'flex';
        document.getElementsByClassName('edit-details')[0].style.display = 'none';
        await clearFormEntries();

        let All_error = document.getElementsByClassName('err');
        //clearing any errors displayed , for previous function call
        for (let each of All_error) {
            each.innerHTML = '';
        }
        image = document.getElementById('edit_image').files[0];

        let currentUser = state.users.filter((each) => {
            return each.id == btn.value;
        });



        let data = currentUser[0];

        console.log(data);
        let date = data.dob.split('-').reverse().join('-');

        if (data.gender == 'male') {
            document.getElementById('male').checked = true;
        }

        if (data.hasOwnProperty('avatar')) {
            document.getElementsByClassName('edit-image')[0].src = `${server_url + '/' + btn.value + '/avatar'}`;
        }
        else {
            document.getElementsByClassName('edit-image')[0].src = `image/default.png`;
        }

        document.getElementById('salutation').value = data.salutation;
        document.getElementById('first_name').value = data.firstName;
        document.getElementById('last_name').value = data.lastName;
        document.getElementById('email').value = data.email;
        document.getElementById('mobile_number').value = data.phone;
        document.getElementById('country').value = data.country;
        document.getElementById('state').value = data.state;
        document.getElementById('date_of_birth').value = date;
        document.getElementById('address').value = data.address;
        document.getElementById('qualification').value = data.qualifications;
        document.getElementById('city').value = data.city;
        document.getElementById('username').value = data.username;
        document.getElementById('password').value = data.password;
        document.getElementsByClassName('btn-add')[0].value = btn.value;

        //add event listner to form submision
        document.getElementById('form').addEventListener('submit', handlingFormSubmission);
    });


}

//to view the selected employee
async function view_employee(btn) {
    btn.addEventListener('click', () => {
        document.getElementsByClassName('details')[0].style.display = 'flex';
        document.getElementsByClassName('table-main')[0].style.display = 'none';
        document.getElementsByClassName('table')[0].style.display = 'none';
        document.getElementById('page-title').innerText = `Dashboard/Employee/Employee Details`;
        document.getElementById('page-subtitle').innerText = `Employee Details`;
        document.getElementsByClassName('edit-details')[0].style.display = 'none';

        fetch(server_url + '/' + btn.value).then((res) => {
            if (!res.ok) {
                throw new Error('check URL please');
            }
            else {
                return res.json();
            }
        }).then(async (data) => {

            let currentyear = new Date().getFullYear();

            let age = currentyear - data.dob.slice(6, 10);

            let month1 = parseInt(data.dob.split('-')[1]);


            let month = await getcurrentmonth(month1);



            if (data.hasOwnProperty('avatar')) {
                document.getElementsByClassName('img_view')[0].innerHTML = `<img src="${server_url + '/' + btn.value + '/avatar'}" alt="" >`;
            }
            else {
                document.getElementsByClassName('img_view')[0].innerHTML = ` <div class='d-flex align-items-center justify-content-center'>${data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase()}</div>`
            }

            document.getElementsByClassName('full_name')[0].innerHTML = `<h5>${data.salutation} ${data.firstName} ${data.lastName}<h5>`;
            document.getElementsByClassName('usr-email')[0].innerHTML = `<h5 class='view-details-box'>${data.email}</h5>`;
            document.getElementsByClassName('usr-gndr')[0].innerHTML = `${data.gender}`;
            document.getElementsByClassName('usr-age')[0].innerHTML = `${age}`;
            document.getElementsByClassName('usr-dob')[0].innerHTML = `${data.dob.split('-')[0] + ' ' + month + ' ' + data.dob.split('-')[2]}`;
            document.getElementsByClassName('usr-mob')[0].innerHTML = `${data.phone}`;
            document.getElementsByClassName('usr-qualifctn')[0].innerHTML = `${data.qualifications}`;
            document.getElementsByClassName('usr-addrs')[0].innerHTML = `${data.address}`;
            document.getElementsByClassName('usr-usrname')[0].innerHTML = `${data.username}`;

            let btns = document.querySelectorAll('.user_info button');
            btns.forEach(async (btn) => {
                btn.value = data.id;
                if (btn.classList.contains('edit_btn')) {
                    await edit_employee(btn);
                    console.log('hello');

                }
                if (btn.classList.contains('delete_btn')) {

                    await delete_employee(btn);

                }
            });


        })
    });


}


//to dlete an selected employee
async function delete_employee(btn) {

    btn.addEventListener('click', () => {

        document.getElementById('overlay').style.display = 'block';
        document.getElementsByClassName('delete')[0].style.display = 'flex';
        document.getElementsByClassName('edit-details')[0].style.display = 'none';
        let delete_items = `<h4>Delete Employees</h4>
               <p>Are you sure you wanna delete this employee</p>
               <div class='delete_btns'>
               <button class='btn btn-cncl'>Cancel</button>
               <button class='btn delte-btn' value=${btn.value}>Delete</button>
               </div>`;
        document.getElementsByClassName('delete')[0].innerHTML = delete_items;

        let cncl_dlt = document.querySelectorAll('.delete button');
        cncl_dlt[0].addEventListener('click', () => {

            document.querySelector('.delete').style.display = 'none';
            document.querySelector('.edit-details').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';

        });

        cncl_dlt[1].addEventListener('click', () => {


            let options = {
                method: 'DELETE',
                headers: { 'content-type': 'application/JSON' },
            };
            fetch(server_url + '/' + btn.value, options).then((res) => {
                if (!res.ok) {
                    throw new Error('Check your URL');
                }
                else {
                    return res.json();
                }
            }).then((data) => {

                document.querySelector('.delete').style.display = 'none';
                document.getElementById('overlay').style.display = 'none';
                window.location.reload();
                displayPagination(1);


            });
        })
    });
}



//function to clear the entries in the form

async function clearFormEntries() {
    document.getElementById('salutation').value = '';
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mobile_number').value = '';
    document.getElementById('country').value = '';
    document.getElementById('state').value = '';
    document.getElementById('date_of_birth').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('username').value = '';
    document.getElementById('qualification').value = '';
    document.getElementById('password').value = '';
}




//====================================================End of Adding, deleteing ,viewing, cancelling========================


//Functionality on clicing on close button.
function cancelAdding() {
    document.getElementsByClassName('card')[0].style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    displayPagination(1);
}


//add event listner on clicking on close icon
document.getElementsByClassName('btn-cncl')[0].addEventListener('click', cancelAdding);




//Fetch user data from back_end--Based on params single or all data will be fetched
async function fetchUser(selector) {
    try {
        if (selector === 'all') {
            const resposne = await fetch(server_url);
            const data = await resposne.json();

            return data;
        }
        else {
            const resposne = await fetch(server_url + '/' + selector);
            const data = await resposne.json();
            return data;
        }

    }
    catch (error) {
        console.error(error);
    }

}
//fetch image
async function fetch_image(id) {
    let image = fetch(`${server_url}/${id}/avatar`);
    return image
}


async function getcurrentmonth(monthnum) {
    let month;
    switch (monthnum) {
        case 1:
            month = "January";
            break;
        case 2:
            month = "February";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
    }
    return month;
}


let search_value = document.getElementById('sub-search');

//according to the search value the function will be triggered/.

search_value.addEventListener('input', search_user);


async function search_user() {
    let users = await fetchUser('all');
    let searchValue = search_value.value.toLowerCase();
    let search_result = users.filter((user) => {
        let search_name = user.firstName.toLowerCase();
        return search_name.startsWith(searchValue);
    });

    state.users = search_result;
   
    if (search_result.length > 10  ) {
        let optionElement = document.createElement('option');
        optionElement.value = search_result.length;
        optionElement.innerText = search_result.length;
        document.getElementById('employee-row').appendChild(optionElement);

    };
    document.getElementById('employee-row').value = search_result.length;
    state.page = 1;
    displayPagination(1);



}
//footer dynamic year
document.getElementById('present-year').innerHTML = new Date().getFullYear();

//loader function
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add('loader-hidden');

});


//to change the src when image is added in edit form

document.getElementById('edit_image').addEventListener('change', () => {

    const file = document.getElementById('edit_image').files[0];


    document.getElementsByClassName('edit-image')[0].src = URL.createObjectURL(file);



}

);


//to change the src of add employeee form

document.getElementById('file').addEventListener('change', () => {
    let file = document.getElementById('file').files[0];
    let editImageDiv = document.getElementsByClassName('edit_image_div')[0];

    editImageDiv.style.display = 'flex';


    document.getElementsByClassName('label_upld')[0].style.display = 'none';

    document.getElementsByClassName('edit-image')[0].src = URL.createObjectURL(file);
})

let cncl_cls = document.getElementsByClassName('cncl-symbl');

document.getElementsByClassName('cncl-symbl')[0].addEventListener('click', () => {
    document.getElementsByClassName('card')[0].style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    displayPagination(1);
})

//button to change image

let change_btn = document.getElementsByClassName('change_btn')[0];
let input_editimage = document.getElementById('edit_image');

change_btn.addEventListener('click', () => {
    input_editimage.click();
})




document.getElementById('overlay').addEventListener('click', () => {
    document.getElementsByClassName('card')[0].style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementsByClassName('delete')[0].style.display = 'none';
    displayPagination(1);
});


let container = document.getElementsByClassName('edit-details');
let dots = document.getElementsByClassName('select-dots');


function hideContainer(event) {

    let containerArray = Array.from(container);
    let dotsArray = Array.from(dots);


    containerArray.forEach((containerElement) => {

        let isOutsideContainer = !containerElement.contains(event.target);
        let isOutsideDots = !dotsArray.some(dotElement => dotElement.contains(event.target));


        if (isOutsideContainer && isOutsideDots) {
            containerElement.style.display = 'none';
        }
    });
}


document.addEventListener('click', hideContainer);


document.getElementsByClassName('employee-nav')[0].addEventListener('click', () => {
    window.location.reload();
})



//==========================================//



document.getElementById(`salutation`).addEventListener('change', () => {

    document.getElementById('salutation_err').innerText = '';
});

//first_name
document.getElementById(`first_name`).addEventListener('change', () => {

    document.getElementById('firstname_err').innerText = '';
});

//last_name//lastname_err
document.getElementById(`last_name`).addEventListener('change', () => {

    document.getElementById('lastname_err').innerText = '';
});

//email//email_err
document.getElementById(`email`).addEventListener('change', () => {

    document.getElementById('email_err').innerText = '';
});

//mobile_number//phone_err

document.getElementById(`mobile_number`).addEventListener('change', () => {

    document.getElementById('phone_err').innerText = '';
});

//date_of_birth//dob_err

document.getElementById(`date_of_birth`).addEventListener('change', () => {

    document.getElementById('dob_err').innerText = '';
});


//address//address_err
document.getElementById(`address`).addEventListener('change', () => {

    document.getElementById('address_err').innerText = '';
});

//country//country_err

document.getElementById(`country`).addEventListener('change', () => {

    document.getElementById('country_err').innerText = '';
});

//state//state_err
document.getElementById(`state`).addEventListener('change', () => {

    document.getElementById('state_err').innerText = '';
});

//city_err //city
document.getElementById(`city`).addEventListener('change', () => {

    document.getElementById('city_err').innerText = '';
});

//qualification //qualifications_err
document.getElementById(`qualification`).addEventListener('change', () => {

    document.getElementById('qualifications_err').innerText = '';
});

//username //username_err
document.getElementById(`username`).addEventListener('change', () => {

    document.getElementById('username_err').innerText = '';
});

//password//password_err
document.getElementById(`password`).addEventListener('change', () => {

    document.getElementById('password_err').innerText = '';
});





window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        // If the page is loaded from the cache, reload it
        window.location.reload();
    }
});




