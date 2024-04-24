
let server_url = 'http://localhost:3000/employees';

//Function to add event listner to add EMployee button
async function addingEmployee() {
    document.getElementById('add_employee').addEventListener('click', async () => {
        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementsByClassName("btn-add")[0].style.display = 'block';
        document.getElementsByClassName('btn-save-chnge')[0].style.display = 'none';
        await form_submission(0, 0, 'POST');





    });

}


// submiting form
async function form_submission(a, value, http_method) {

    if (a === 0) {
        document.getElementsByClassName('btn-save-chnge')[0].type = 'button';
        document.getElementsByClassName('btn-add')[0].type = 'submit';
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
                "qualifications": `${document.getElementById('salutation').value}`,
                "address": `${document.getElementById('address').value}`,
                "city": `${document.getElementById('city').value}`,
                "state": `${document.getElementById('state').value}`,
                "country": `${document.getElementById('country').value}`,
                "username": `${document.getElementById('username').value}`,
                "password": `${document.getElementById('password').value}`

            };


            console.log(value);
            let validate_result = await validate_form(value);
            if (validate_result[1] == 1) {
                event.preventDefault();
                let error_messages = validate_result[0];
                console.log(error_messages);

                document.getElementById('salutation_err').innerHTML = error_messages['salutation'];



                document.getElementById('firstName_err').innerHTML = error_messages['firstName'];



                document.getElementById('lastName_err').innerHTML = error_messages['lastName'];



                document.getElementById('email_err').innerHTML = error_messages['email'];



                document.getElementById('phone_err').innerHTML = error_messages['phone'];



                document.getElementById('dob_err').innerHTML = error_messages['dob'];



                document.getElementById('gender_err').innerHTML = error_messages['gender'];



                document.getElementById('address_err').innerHTML = error_messages['address'];


                document.getElementById('country_err').innerHTML = error_messages['country'];


                document.getElementById('state_err').innerHTML = error_messages['state'];

                document.getElementById('city_err').innerHTML = error_messages['city'];

                document.getElementById('username_err').innerHTML = error_messages['username'];

                document.getElementById('password_err').innerHTML = error_messages['password'];




            }
            else {
                event.preventDefault();
                let error_messages = validate_result[0];
                console.log(error_messages);

                document.getElementById('salutation_err').innerHTML = error_messages['salutation'];



                document.getElementById('firstName_err').innerHTML = error_messages['firstName'];



                document.getElementById('lastName_err').innerHTML = error_messages['lastName'];



                document.getElementById('email_err').innerHTML = error_messages['email'];



                document.getElementById('phone_err').innerHTML = error_messages['phone'];



                document.getElementById('dob_err').innerHTML = error_messages['dob'];



                document.getElementById('gender_err').innerHTML = error_messages['gender'];



                document.getElementById('address_err').innerHTML = error_messages['address'];


                document.getElementById('country_err').innerHTML = error_messages['country'];


                document.getElementById('state_err').innerHTML = error_messages['state'];

                document.getElementById('city_err').innerHTML = error_messages['city'];

                document.getElementById('username_err').innerHTML = error_messages['username'];

                document.getElementById('password_err').innerHTML = error_messages['password'];

                fetch(server_url, {
                    method: `${http_method}`, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value)
                }).then((response) => {

                    if (!response.ok) {
                        throw new Error('Check the URL please');
                    }
                    else {
                        return response.json();
                    }

                }).then((data) => {

                    console.log(data.id);
                    let image = document.getElementById('file').files[0];
                    let image_object = new FormData();
                    image_object.append('avatar', image);
                    console.log(server_url + '/' + data.id + '/avatar');

                    fetch(`${server_url}/${data.id}/avatar`, { method: 'POST', body: image_object, }).then((response) => {

                        if (!response.ok) {
                            throw new Error('Check the URL please');
                        }
                        else {
                            return response.json();
                        }

                    }).then((data) => {
                        return data;
                    });

                }).catch((error) => {
                    console.log(error);
                })
            }




        });

    }
    else {

        let data = await fetchUser(value);

        let date = data.dob.split('-').reverse().join('-');
        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementsByClassName("label_upld")[0].style.display = 'none';
        document.getElementsByClassName("btn-add")[0].style.display = 'none';
        document.getElementsByClassName("btn-save-chnge")[0].style.display = 'block';


        if (data.gender == 'male') {
            document.getElementById('male').checked = true;
        }

        document.getElementsByClassName('edit-image')[0].src = `${server_url + '/' + value + '/avatar'}`
        document.getElementById('salutation').value = data.salutation;
        document.getElementById('first_name').value = data.firstName;
        document.getElementById('last_name').value = data.lastName;
        document.getElementById('email').value = data.email;
        document.getElementById('mobile_number').value = data.phone;
        document.getElementById('country').value = data.country;
        document.getElementById('state').value = data.state;
        document.getElementById('date_of_birth').value = date;

        document.getElementById('address').value = data.address;
        document.getElementById('city').value = data.city;
        document.getElementById('username').value = data.username;
        document.getElementById('password').value = data.password;


        document.getElementsByClassName('btn-save-chnge')[0].type = 'submit';
        document.getElementsByClassName('btn-add')[0].type = 'button';


        document.getElementById('form').addEventListener('submit', async (event) => {


            let dob = document.getElementById('date_of_birth').value;

            let crctdDob = dob.slice(8, 10) + '-' + dob.slice(5, 7) + '-' + dob.slice(0, 4);

            let from_data = {
                "salutation": `${document.getElementById('salutation').value}`,
                "firstName": `${document.getElementById('first_name').value}`,
                "lastName": `${document.getElementById('last_name').value}`,
                "email": `${document.getElementById('email').value}`,
                "phone": `${document.getElementById('mobile_number').value}`,
                "dob": crctdDob,
                "gender": `${document.querySelector('input[name="gender"]:checked').id}`,
                "qualifications": `${document.getElementById('salutation').value}`,
                "address": `${document.getElementById('address').value}`,
                "city": `${document.getElementById('city').value}`,
                "state": `${document.getElementById('state').value}`,
                "country": `${document.getElementById('country').value}`,
                "username": `${document.getElementById('username').value}`,
                "password": `${document.getElementById('password').value}`

            };

            let validate_result = await validate_form(from_data);
            if (validate_result[1] == 1) {
                event.preventDefault();
                let error_messages = validate_result[0];
                console.log(error_messages);

                document.getElementById('salutation_err').innerHTML = error_messages['salutation'];



                document.getElementById('firstName_err').innerHTML = error_messages['firstName'];



                document.getElementById('lastName_err').innerHTML = error_messages['lastName'];



                document.getElementById('email_err').innerHTML = error_messages['email'];



                document.getElementById('phone_err').innerHTML = error_messages['phone'];



                document.getElementById('dob_err').innerHTML = error_messages['dob'];



                document.getElementById('gender_err').innerHTML = error_messages['gender'];



                document.getElementById('address_err').innerHTML = error_messages['address'];


                document.getElementById('country_err').innerHTML = error_messages['country'];


                document.getElementById('state_err').innerHTML = error_messages['state'];

                document.getElementById('city_err').innerHTML = error_messages['city'];

                document.getElementById('username_err').innerHTML = error_messages['username'];

                document.getElementById('password_err').innerHTML = error_messages['password'];




            }

            else {

                event.preventDefault();
                let error_messages = validate_result[0];
                document.getElementById('salutation_err').innerHTML = error_messages['salutation'];



                document.getElementById('firstName_err').innerHTML = error_messages['firstName'];



                document.getElementById('lastName_err').innerHTML = error_messages['lastName'];



                document.getElementById('email_err').innerHTML = error_messages['email'];



                document.getElementById('phone_err').innerHTML = error_messages['phone'];



                document.getElementById('dob_err').innerHTML = error_messages['dob'];



                document.getElementById('gender_err').innerHTML = error_messages['gender'];



                document.getElementById('address_err').innerHTML = error_messages['address'];


                document.getElementById('country_err').innerHTML = error_messages['country'];


                document.getElementById('state_err').innerHTML = error_messages['state'];

                document.getElementById('city_err').innerHTML = error_messages['city'];

                document.getElementById('username_err').innerHTML = error_messages['username'];

                document.getElementById('password_err').innerHTML = error_messages['password'];




                fetch(server_url + '/' + value, {

                    method: `${http_method}`, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(from_data)
                }).then((response) => {

                    if (!response.ok) {
                        throw new Error('Check the URL please');
                    }
                    else {
                        return response.json();
                    }

                }).then((data) => {

                    let image = document.getElementById('edit_image').files[0];
                    if (image) {
                        let image_object = new FormData();
                        image_object.append('avatar', image);
                        console.log(server_url + '/' + value + '/avatar');

                        fetch(`${server_url}/${value}/avatar`, { method: 'POST', body: image_object, }).then((response) => {

                            if (!response.ok) {
                                throw new Error('Check the URL please');
                            }
                            else {
                                return response.json();
                            }

                        }).then((data) => {
                            return data;
                        });

                    }


                }).catch((error) => {
                    console.log(error);
                })
            }

        });





    }


}

async function validate_form(value) {
    let error_data = {
        address: '',
        city: '',
        country: '',
        dob: '',
        email: '',
        firstName: '',
        gender: '',
        lastName: '',
        password: '',
        phone: '',
        qualifications: '',
        salutation: '',
        state: '',
        username: ''
    };
    let err_flg = 0;
    let form_data = value;
    console.log(form_data);
    for (let eachdata in form_data) //eachdata represents key
    {

        if (eachdata == 'address') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr address';

            }

        }
        if (eachdata == 'city') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr city';

            }

        }
        if (eachdata == 'country') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr country';

            }

        }
        if (eachdata == 'dob') {
            if (form_data[eachdata] == '--' || form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr dob';

            }

        }
        if (eachdata === 'email') {
            let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr email';


            }
            else if (!emailRegex.test(form_data[eachdata])) {

                err_flg = 1;
                error_data[eachdata] = 'Enetr valid email';
            }


        }
        if (eachdata == 'firstName') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr firstName';

            }

        }
        if (eachdata == 'gender') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr gender';

            }

        }
        if (eachdata == 'lastName') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr lastName';

            }

        }
        if (eachdata == 'password') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr password';

            }

        }
        if (eachdata == 'phone') {
            let mob_regex = /\d{10}/;
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr phone';

            }
            else if (!mob_regex.test(form_data[eachdata])) {
                err_flg = 1;
                error_data[eachdata] = 'Enter valid phone number';
            }

        }
        if (eachdata == 'qualifications') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr qualifications';

            }

        }
        if (eachdata == 'salutation') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr salutation';

            }

        }
        if (eachdata == 'state') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr state';

            }

        }
        if (eachdata == 'username') {
            if (form_data[eachdata] == '') {
                err_flg = 1;
                error_data[eachdata] = 'Enetr username';

            }

        }



    };
    return [error_data, err_flg];

}



//Function to add Event listner to cancel the adding
function cancelAdding() {
    document.getElementsByClassName('btn-cncl')[0].addEventListener('click', () => {
        document.getElementsByClassName('card')[0].style.display = 'none';
        window.location.reload();
    });
}


async function addEmployee() {
    await addingEmployee();
    cancelAdding();

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
//populate each user data in each row of the table
async function populateData() {
    let users = await fetchUser('all');

    let eachrows = '';
    let count = 1;
    users.forEach(async (user) => {
        console.log();
        eachrows += `<tr scope='row'>
            
             <td scope='col' class='fw-bold' >#0${count++}</td>
             <td scope='col' class='fw-bold' >
             <span> 
             <img src=${server_url + '/' + user.avatar.split('.')[0] + '/avatar'} class='side_images'></span>
             ${user.firstName}
             </td>
             <td scope='col' class='fw-bold' >${user.email}</td>
             <td scope='col' class='fw-bold' >${user.phone}</td>
             <td scope='col' class='fw-bold' >${user.gender}</td>
             <td scope='col' class='fw-bold' >${user.dob}</td>
             <td scope='col' class='fw-bold' >${user.country}</td>
             <td scope='col' class="edit"><span class="material-symbols-outlined select-dots">
             more_horiz
             </span>
             <ul class='edit-details'>
                <li class='d-flex '><span class="material-symbols-outlined">
                visibility
                </span><button class='view_btn' value="${user.id}">View Details</button></li>
                <li class='d-flex '><span class="material-symbols-outlined">
                edit
                </span><button class='edit_btn' value="${user.id}">Edit</button></li>
                <li class='d-flex '><span class="material-symbols-outlined">
                delete
                </span><button class='dlte_btn' value="${user.id}">Delete</button></li>
             </ul 
               </td>
        
           </tr>`;
    });
    document.getElementById("table-body").innerHTML = eachrows;
}







//Adding Click events to each of the user
function addCLickEvent() {

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
    Array.from(btns).forEach((btn) => {
        if (btn.className === 'view_btn') {
            btn.addEventListener('click', () => {
                document.getElementsByClassName('details')[0].style.display = 'flex';
                document.getElementsByClassName('table-main')[0].style.display = 'none';
                document.getElementsByClassName('table')[0].style.display = 'none';
                console.log(server_url + '/' + btn.value);
                fetch(server_url + '/' + btn.value).then((res) => {
                    if (!res.ok) {
                        throw new Error('check URL please');
                    }
                    else {
                        return res.json();
                    }
                }).then((data) => {

                    console.log(data);
                    let currentyear = new Date().getFullYear();

                    let age = currentyear - data.dob.slice(6, 10);


                    document.getElementsByClassName('img_view')[0].src = `${server_url + '/' + btn.value + '/avatar'}`
                    document.getElementsByClassName('full_name')[0].innerHTML = `<h5>${data.salutation} ${data.firstName} ${data.lastName}</h5>`;
                    document.getElementsByClassName('usr-email')[0].innerHTML = `<h5>${data.email}</h5>`;
                    document.getElementsByClassName('usr-gndr')[0].innerHTML = `<h5>${data.gender}</h5>`;
                    document.getElementsByClassName('usr-age')[0].innerHTML = `<h5>${age}</h5>`;
                    document.getElementsByClassName('usr-dob')[0].innerHTML = `<h5>${data.dob}</h5>`;
                    document.getElementsByClassName('usr-mob')[0].innerHTML = `<h5>${data.phone}</h5>`;
                    document.getElementsByClassName('usr-qualifctn')[0].innerHTML = `<h5>${data.qualifications}</h5>`;
                    document.getElementsByClassName('usr-addrs')[0].innerHTML = `<h5>${data.address}</h5>`;
                    document.getElementsByClassName('usr-usrname')[0].innerHTML = `<h5>${data.username}</h5>`;


                })
            });





        }

        if (btn.className === 'edit_btn') {
            btn.addEventListener('click', async () => {
                await form_submission(1, btn.value, 'PUT');


            });
        }
        if (btn.className === 'dlte_btn') {

            btn.addEventListener('click', () => {
                console.log('haiii');
                document.getElementsByClassName('delete')[0].style.display = 'flex';
                let delete_items = `<h4>Delete Employees</h4>
                       <p>Are you sure you wanna delete this employee</p>
                       <div class='delete_btns'>
                       <button>Cancel</button>
                       <button value=${btn.value}>Delete</button>
                       </div>`;
                document.getElementsByClassName('delete')[0].innerHTML = delete_items;

                let cncl_dlt = document.querySelectorAll('.delete button');
                cncl_dlt[0].addEventListener('click', () => {

                    document.querySelector('.delete').style.display = 'none';
                    document.querySelector('.edit-details').style.display = 'none';

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
                        window.location.reload();

                    });
                })
            });


        }

    })
}
//search option

async function search_user() {
    let users = await fetchUser('all');
    console.log(users);
    
    let search_value = document.getElementById('sub-search');
    search_value.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          let search_result = users.filter((user) => 
        {
           if((user.firstName).toLowerCase() === (search_value.value).toLowerCase())
           {
            return user;
           }
        });
        let eachrows = '';
        let count = 1;
        search_result.map(async (user) => {
           
            eachrows += `<tr scope='row'>
                
                 <td scope='col' class='fw-bold' >#0${count++}</td>
                 <td scope='col' class='fw-bold' >
                 <span> 
                 <img src=${server_url + '/' + user.avatar.split('.')[0] + '/avatar'} class='side_images'></span>
                 ${user.firstName}
                 </td>
                 <td scope='col' class='fw-bold' >${user.email}</td>
                 <td scope='col' class='fw-bold' >${user.phone}</td>
                 <td scope='col' class='fw-bold' >${user.gender}</td>
                 <td scope='col' class='fw-bold' >${user.dob}</td>
                 <td scope='col' class='fw-bold' >${user.country}</td>
                 <td scope='col' class="edit"><span class="material-symbols-outlined select-dots">
                 more_horiz
                 </span>
                 <ul class='edit-details'>
                    <li class='d-flex '><span class="material-symbols-outlined">
                    visibility
                    </span><button class='view_btn' value="${user.id}">View Details</button></li>
                    <li class='d-flex '><span class="material-symbols-outlined">
                    edit
                    </span><button class='edit_btn' value="${user.id}">Edit</button></li>
                    <li class='d-flex '><span class="material-symbols-outlined">
                    delete
                    </span><button class='dlte_btn' value="${user.id}">Delete</button></li>
                 </ul 
                   </td>
            
               </tr>`;
        });
        document.getElementById("table-body").innerHTML = eachrows;
       
        
        }
        
    });
    
}

//calling the above functions in order
async function employeeFunction() {
    await populateData();
    addCLickEvent();
    editemployees();
    search_user();
}

employeeFunction();




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





