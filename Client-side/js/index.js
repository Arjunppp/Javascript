
let server_url = 'http://localhost:3000/employees';


//pagenation ---data


document.getElementById('employee-row').addEventListener('click', (event) => {

    state.rows = parseInt(event.target.value);

    state.page = 1;

    displayPagination();
});


let state = {
    page: 1,
    rows: 7,
};

document.getElementById('employee-row').value = state.rows;
async function PageNationsetUp() {
    let users = await fetchUser('all');

    function pagination(queryset, page, rows) {

        const trimStart = (page - 1) * rows;
        const trimEnd = trimStart + rows;

        const trimData = queryset.slice(trimStart, trimEnd);

        const pages = Math.ceil(queryset.length / rows);
        return {
            queryset: trimData,
            pages: pages
        };
    }

    return pagination(users, state.page, state.rows);
}


async function pageButton(pages) {
    const buttonDiv = document.getElementById('page-button-wrapper');
    let buttonHtml = '';


    for (let page = 1; page <= pages; page++) {
        buttonHtml += `<button value="${page}" class='btn button_page'>${page}</button>`;
    }


    buttonDiv.innerHTML = buttonHtml;

    const pageButtons = document.getElementsByClassName('button_page');
    Array.from(pageButtons).forEach((eachBtn) => {
        eachBtn.addEventListener('click', () => {

            state.page = parseInt(eachBtn.value, 10);

            displayPagination();
        });
    });
}


async function displayPagination() {

    const a = await PageNationsetUp();
    const b = a.queryset;


    let eachRows = '';
    let count = 1;
    for (let user of b) {

        let month = await getcurrentmonth(parseInt(user.dob.split('-')[1]));
        
        if (user.hasOwnProperty('avatar')) {


            eachRows += `<tr scope='row' >
                <td scope='col' class='td-data'>#0${count++}</td>
                <td scope='col'  class='td-data d-flex align-items-center  gap-2'>
                    <span>
                    
                        <img src=${server_url + '/' + user.avatar.split('.')[0] + '/avatar'} class='side_images'>
                    </span>
                    ${user.salutation + ' ' + user.firstName + ' ' + user.lastName}
                </td>
                <td scope='col' class='td-data'>${user.email}</td>
                <td scope='col' class='td-data'>${user.phone}</td>
                <td scope='col' class='td-data'>${user.gender}</td>
                <td scope='col' class='td-data'>${user.dob.split('-')[0]+' '+month+' '+user.dob.split('-')[2]}</td>
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
            </tr>`;
        }
        else {

            eachRows += `<tr scope='row' class='py-3 '>
                <td scope='col' class='td-data'>#0${count++}</td>
                <td scope='col' class='td-data d-flex align-items-center  gap-2'>
                    <span>
                        <div class='side_images d-flex align-items-center justify-content-center'>${user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}</div>
                     </span>
                    ${user.salutation + ' ' + user.firstName + ' ' + user.lastName}
                </td>
                <td scope='col' class='td-data'>${user.email}</td>
                <td scope='col' class='td-data'>${user.phone}</td>
                <td scope='col' class='td-data'>${user.gender}</td>
                <td scope='col' class='td-data'>${user.dob.split('-')[0]+' '+month+' '+user.dob.split('-')[2]}</td>
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
            </tr>`;
        }

    };


    document.getElementById("table-body").innerHTML = eachRows;


    pageButton(a.pages);
    addCLickEvent();
    editemployees();
    search_user();
}


displayPagination();



//Function to add event listner to add EMployee button
//It also enable the form section.
async function addingEmployee() {
    document.getElementById('add_employee').addEventListener('click', async () => {
        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementById('overlay').style.display ='block';
        document.getElementsByClassName('btn-add')[0].innerHTML = 'Add Employee';
        
        // calling add employee function
        await form_submission('Add', 0, 'POST');
        cancelAdding();
    });

}


// submiting form defenition
async function form_submission(option, value, http_method) {
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
    document.getElementById('password').value ='';
    let All_error = document.getElementsByClassName('err');
                //Not giving any data if there is no error
                for (let each of All_error) {
                    each.innerHTML = '';
                }
                var function_option = '';
                var method = '';
                var button_value = '';
                var URL = '';

    if (option == 'Add') {

         function_option = option;
         method = http_method;
         button_value = value;
         URL = server_url;
        document.getElementsByClassName('edit_image_div')[0].style.display ='none';
        document.getElementsByClassName("label_upld")[0].style.display = 'block';
        console.log('its an add');
        

    }
    else if (option == 'Update') {
        image = document.getElementById('edit_image').files[0];

        function_option = option;
        method = http_method;
        button_value = value;
        URL = server_url + '/' + value;
        let data = await fetchUser(value);
        let date = data.dob.split('-').reverse().join('-');
        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementsByClassName("label_upld")[0].style.display = 'none';

    

        if (data.gender == 'male') {
            document.getElementById('male').checked = true;
        }
        document.getElementsByClassName('edit-image')[0].src = `${URL + '/avatar'}`;
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
    }

    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();

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


        let response = await fetch(URL, {
            method: `${method}`, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value)
        });
        let data = await response.json();
        console.log(data);
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
                    console.log(lower_err);
                    if (lower_err != 'invalid') {
                        document.getElementById(`${lower_err}` + '_err').innerText = eacherror;
                    }
                    if (lower_err === 'invalid') {
                        let lower_err = eacherror.split(' ')[1].toLowerCase();
                        document.getElementById(`${lower_err}` + '_err').innerText = eacherror;
                    }
                }

            }
            else {

                document.getElementsByClassName('card')[0].style.display = 'none';
                document.querySelector('.add-emp-cnfrmation h5').innerText = data['message'];
                document.getElementsByClassName('add-emp-cnfrmation')[0].style.display = 'flex';
                document.getElementsByClassName('employee-add-btn')[0].addEventListener('click', () => {
                    document.getElementsByClassName('add-emp-cnfrmation')[0].style.display = 'none';
                    document.getElementById('overlay').style.display='none';
                    displayPagination();

                })

            }
        }

        let image = '';
        let img_url = '';
        if (option === 'Add') {
            image = await document.getElementById('file').files[0];
            img_url = `${server_url}/${data.id}/avatar`;
        }
        else {
            image = await document.getElementById('edit_image').files[0];
            img_url = `${server_url}/${button_value}/avatar`;

        }
        let image_object = new FormData();
        image_object.append('avatar', image);
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


    })
    


}







//Function to add Event listner to cancel the adding
function cancelAdding() {
    document.getElementsByClassName('btn-cncl')[0].addEventListener('click', () => {
        document.getElementsByClassName('card')[0].style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
       displayPagination();
    });
}


async function addEmployee() {
    await addingEmployee();


}

addEmployee();

//Fetch user data from back_end
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
async function view_employee(btn) {
    btn.addEventListener('click', () => {
        document.getElementsByClassName('details')[0].style.display = 'flex';
        document.getElementsByClassName('table-main')[0].style.display = 'none';
        document.getElementsByClassName('table')[0].style.display = 'none';
        document.getElementsByClassName('edit-details')[0].style.display ='none';

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



            if(data.hasOwnProperty('avatar'))
            {
                document.getElementsByClassName('img_view')[0].innerHTML = `<img src="${server_url + '/' + btn.value + '/avatar'}" alt="" >`;
            }
            else{
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

async function edit_employee(btn) {
    btn.addEventListener('click', async () => {
        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementById('overlay').style.display ='block';
        document.getElementsByClassName("label_upld")[0].style.display = 'none';
        document.getElementsByClassName("btn-add")[0].innerHTML = 'Save Changes';
        document.getElementsByClassName('edit_image_div')[0].style.display = 'block';
        document.getElementsByClassName('edit-details')[0].style.display ='none';
        await form_submission('Update', btn.value, 'PUT');
        cancelAdding();
    });

}

async function delete_employee(btn) {

    btn.addEventListener('click', () => {

        document.getElementById('overlay').style.display ='block';
        document.getElementsByClassName('delete')[0].style.display = 'flex';
        document.getElementsByClassName('edit-details')[0].style.display ='none';
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
            document.getElementById('overlay').style.display ='none';

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
                document.getElementById('overlay').style.display ='none';
                displayPagination();
                

            });
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


async function search_user() {
    let users = await fetchUser('all');


    let search_value = document.getElementById('sub-search');
    search_value.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            let search_result = users.filter((user) => {
                if ((user.firstName).toLowerCase() === (search_value.value).toLowerCase()) {
                    return user;
                }
            });
            let eachRows = '';
            let count = 1;
           for(let user of search_result)
           {
            let month = await getcurrentmonth(parseInt(user.dob.split('-')[1]));
            

                if (user.hasOwnProperty('avatar')) {


                    eachRows += `<tr scope='row'>
                        <td scope='col' class='td-data'>#0${count++}</td>
                        <td scope='col'  class='td-data d-flex align-items-center gap-2 '>
                            <span>
                            
                                <img src=${server_url + '/' + user.avatar.split('.')[0] + '/avatar'} class='side_images'>
                            </span>
                            ${user.salutation + ' ' + user.firstName + ' ' + user.lastName}
                        </td>
                        <td scope='col' class='td-data'>${user.email}</td>
                        <td scope='col' class='td-data'>${user.phone}</td>
                        <td scope='col' class='td-data'>${user.gender}</td>
                        <td scope='col' class='td-data'>${user.dob.split('-')[0]+' '+month+' '+user.dob.split('-')[2]}</td>
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
                    </tr>`;
                }
                else {
                    eachRows += `<tr scope='row'>
                        <td scope='col' class='td-data '>#0${count++}</td>
                        <td scope='col' class='td-data  d-flex align-items-center  gap-2'>
                            <span>
                                <div class='side_images d-flex align-items-center justify-content-center'>${user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}</div>
                             </span>
                             ${user.salutation + ' ' + user.firstName + ' ' + user.lastName}
                        </td>
                        <td scope='col' class='td-data '>${user.email}</td>
                        <td scope='col' class='td-data '>${user.phone}</td>
                        <td scope='col' class='td-data '>${user.gender}</td>
                        <td scope='col' class='td-data '>${user.dob.split('-')[0]+' '+month+' '+user.dob.split('-')[2]}</td>
                        <td scope='col' class='td-data '>${user.country}</td>
                        <td scope='col' class='td-data edit'>
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
                    </tr>`;
                }
            };
            document.getElementById("table-body").innerHTML = eachRows;


        }

    });
    let a = ''
    search_value.addEventListener('keydown', async function (e) {

        let eachRows = '';
        let count = 1;
        if (e.key !== 'Backspace' && e.key !== 'Alt' && e.key !== 'Shift' && e.key !== 'Control') {
            a += e.key;
        }
        else if (e.key == 'Backspace') {
            a = a.slice(0, -1);
        }

        let search_result = users.filter((user) => {
            if (a.length == 0) {

                search_name = user.firstName.toLowerCase();

                return search_name;
            }
            else {
                let search_name = user.firstName.slice(0, a.length);
                if (search_name.toLowerCase() == a) {
                    return search_name.toLowerCase();
                }

            }

        });


        console.log(search_result);
        for(let user of search_result) {
            let month = await getcurrentmonth(parseInt(user.dob.split('-')[1]));
            
            if (user.hasOwnProperty('avatar')) {

                eachRows += `<tr scope='row'>
                <td scope='col' class='td-data'>#0${count++}</td>
                <td scope='col'  class='td-data d-flex align-items-center  gap-2'>
                    <span>
                    
                        <img src=${server_url + '/' + user.avatar.split('.')[0] + '/avatar'} class='side_images'>
                    </span>
                    ${user.salutation + ' ' + user.firstName + ' ' + user.lastName}
                </td>
                <td scope='col' class='td-data'>${user.email}</td>
                <td scope='col' class='td-data'>${user.phone}</td>
                <td scope='col' class='td-data'>${user.gender}</td>
                <td scope='col' class='td-data'>${user.dob.split('-')[0]+' '+month+' '+user.dob.split('-')[2]}</td>
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
            </tr>`;
            }
            else {
                eachRows += `<tr scope='row'>
                <td scope='col' class='td-data'>#0${count++}</td>
                <td scope='col' class='td-data d-flex align-items-center  gap-2'>
                    <span>
                        <div class='side_images d-flex align-items-center justify-content-center'>${user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}</div>
                     </span>
                     ${user.salutation + ' ' + user.firstName + ' ' + user.lastName}
                </td>
                <td scope='col' class='td-data'>${user.email}</td>
                <td scope='col' class='td-data'>${user.phone}</td>
                <td scope='col' class='td-data'>${user.gender}</td>
                <td scope='col' class='td-data'>${user.dob.split('-')[0]+' '+month+' '+user.dob.split('-')[2]}</td>
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
            </tr>`;
            }
        };
        document.getElementById("table-body").innerHTML = eachRows;

    })


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
console.log(cncl_cls);
document.getElementsByClassName('cncl-symbl')[0].addEventListener('click' , () =>
{
    document.getElementsByClassName('card')[0].style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
   
   displayPagination();
})

//button to change image

let change_btn = document.getElementsByClassName('change_btn')[0];
let input_editimage = document.getElementById('edit_image');

change_btn.addEventListener('click' ,() => 
{
    input_editimage.click();
})




document.getElementById('overlay').addEventListener('click' , () =>
{
    document.getElementsByClassName('card')[0].style.display ='none';
    document.getElementById('overlay').style.display='none';
    document.getElementsByClassName('delete')[0].style.display ='none';
    displayPagination();
})
