
let server_url = 'http://localhost:3000/employees';


//=======================pagenation=============================================================================//

//the dom element corresponding to employee row value is fetched.
let employeesInRow = document.getElementById('employee-row');

//function to handle the value change in the element
function handleRowValueChnage(event) {
    let newRowCount = event.target.value;
    state.rows = parseInt(newRowCount);
    state.page = 1;
    displayPagination();
}


//adding an event-listner change to the element ,whenever the value changes the function triggers
employeesInRow.addEventListener('change', handleRowValueChnage);


let state = {
    page: 1,
    rows: 6,
    window: 3
};
//default value to show in the front end
document.getElementById('employee-row').value = state.rows;


async function pageNationsetUp() {
    let allUsers = await fetchUser('all');
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
    let buttonHtml = '<button id="chvrn_left" class="btn  btn-lg  btn-info"><span class="material-symbols-outlined"> chevron_left </span> </button>';

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
    buttonDiv.innerHTML = buttonHtml;
    document.getElementById('chvrn_left').addEventListener('click', () => {

        

        let currentPage = state.page;
        let nextPage = currentPage -1;
        if(nextPage <1)
            {
                nextPage =1;
            }
        state.page = nextPage;
        displayPagination();

    });
    document.getElementById('chvrn_right').addEventListener('click', () => {


        let currentPage = state.page;
        let nextPage = currentPage +1;
      if(nextPage > pages)
        {
            nextPage =pages;
        }
        state.page = nextPage;
        displayPagination();

    });
    const pageNationButtons = document.getElementsByClassName('button_page');
    Array.from(pageNationButtons).forEach((eachPageBtn) => {
        eachPageBtn.addEventListener('click', async() => {
            
            state.page = parseInt(eachPageBtn.value);
            await displayPagination();
            
           
            
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
                            <button class='view_btn' value="${user.id}">View Details</button>
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
async function displayPagination() {

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
    addCLickEvent();
    editemployees();
    search_user();
     let pageButtons = document.getElementsByClassName('button_page');
     console.log(pageButtons);
     Array.from(pageButtons).forEach((eachBtn) => 
    {
        if(eachBtn.value == state.page)
            {
                eachBtn.classList.add('btn_onchange');
            }
    })
}

//Poulate data for the first time
displayPagination();

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
}


// add event listner to add EMployee button
document.getElementById('add_employee').addEventListener('click', addingEmployee);

//add event listner to form submision
document.getElementById('form').addEventListener('submit', handlingFormSubmission);


//function to add or update employee
async function addOrSaveEmployee(URL, method, value) {
    let response = await fetch(URL, {
        method: `${method}`, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value)
    });
    let data = await response.json();
    for (let eachdata in data) {
        if (eachdata == 'errors') {
            let errors = data[eachdata];
            let All_error = document.getElementsByClassName('err');
            //Not giving any data if there is no error
            for (let each of All_error) {
                each.innerHTML = '';
            }
            //displaying errors if there is error
            for (let eacherror of errors) {
                let lower_err = eacherror.split(' ')[0].toLowerCase();

                if (lower_err != 'invalid') {
                    document.getElementById(`${lower_err}` + '_err').innerText = eacherror;
                }
                if (lower_err === 'invalid') {
                    let lower_err = eacherror.split(' ')[1].toLowerCase();
                    document.getElementById(`${lower_err}` + '_err').innerText = eacherror;
                }
            }
            return ('error');
        }
        else {

            document.getElementsByClassName('card')[0].style.display = 'none';
            document.querySelector('.add-emp-cnfrmation h5').innerText = data['message'];
            document.getElementsByClassName('add-emp-cnfrmation')[0].style.display = 'flex';
            document.getElementsByClassName('employee-add-btn')[0].addEventListener('click', () => {
                document.getElementsByClassName('add-emp-cnfrmation')[0].style.display = 'none';
                document.getElementById('overlay').style.display = 'none';
                displayPagination();

            })
            return (data.id)
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
        if(image)
            {
                let img_url = `${server_url}/${user}/avatar`;
                let image_object = new FormData();
                image_object.append('avatar', image);
                await uploadOrUpdateImage(img_url, image_object);

            }
       

    }
}


//function to edit employee
async function edit_employee(btn) {



    btn.addEventListener('click', async () => {

        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.getElementsByClassName("label_upld")[0].style.display = 'none';
        document.getElementsByClassName("btn-add")[0].innerHTML = 'Save Changes';
        document.getElementsByClassName('edit_image_div')[0].style.display = 'block';
        document.getElementsByClassName('edit-details')[0].style.display = 'none';
        await clearFormEntries();

        let All_error = document.getElementsByClassName('err');
        //clearing any errors displayed , for previous function call
        for (let each of All_error) {
            each.innerHTML = '';
        }
        image = document.getElementById('edit_image').files[0];
        let data = await fetchUser(btn.value);
        let date = data.dob.split('-').reverse().join('-');

        if (data.gender == 'male') {
            document.getElementById('male').checked = true;
        }


        document.getElementsByClassName('edit-image')[0].src = `${server_url + '/' + btn.value + '/avatar'}`;
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

    });

}

//to view the selected employee
async function view_employee(btn) {
    btn.addEventListener('click', () => {
        document.getElementsByClassName('details')[0].style.display = 'flex';
        document.getElementsByClassName('table-main')[0].style.display = 'none';
        document.getElementsByClassName('table')[0].style.display = 'none';
        document.getElementsByClassName('edit-details')[0].style.display = 'none';

        fetch(server_url + '/' + btn.value).then((res) => {
            if (!res.ok) {
                throw new Error('check URL please');
            }
            else {
                return res.json();
            }
        }).then(async (data) => {

            console.log(data);
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
                }
                if (btn.classList.contains('delete_btn')) {

                    await delete_employee(btn);
                }
            })

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
                displayPagination();


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
    displayPagination();
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




async function search_user() {
    let users = await fetchUser('all');
    let search_value = document.getElementById('sub-search');
    let searchValue = '';
   
    search_value.addEventListener('keydown', async function (e) {

        let eachRows = '';
        
        if (e.key !== 'Backspace' && e.key !== 'Alt' && e.key !== 'Shift' && e.key !== 'Control') {
            searchValue += e.key;
        }
        else if (e.key == 'Backspace') {
            searchValue = searchValue.slice(0, -1);
        }

        let search_result = users.filter((user) => {
            if (searchValue.length == 0) {

                search_name = user.firstName.toLowerCase();

                return search_name;
            }
            else {
                let search_name = user.firstName.slice(0, searchValue.length);
                if (search_name.toLowerCase() == searchValue) {
                    return search_name.toLowerCase();
                }

            }

        });


        console.log(search_result);
        let count=0;
        for (let user of search_result) {
            count++;
            let month = await getcurrentmonth(parseInt(user.dob.split('-')[1]));
            eachRows += await eachRowData(count , user , month);
           
        };
        document.getElementById("table-body").innerHTML = eachRows;
        addCLickEvent();
        editemployees();
    });
    

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
    document.getElementsByClassName('edit_image_div')[0].style.display = 'block';
    document.getElementsByClassName('label_upld')[0].style.flex = '0 0 75%';
    document.querySelector(`label[for="file"] h5`).innerHTML = 'Change image';
    document.getElementsByClassName('edit-image')[0].src = URL.createObjectURL(file);
})

let cncl_cls = document.getElementsByClassName('cncl-symbl');

document.getElementsByClassName('cncl-symbl')[0].addEventListener('click', () => {
    document.getElementsByClassName('card')[0].style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    displayPagination();
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
    displayPagination();
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




