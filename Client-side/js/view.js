

let server_url = 'http://localhost:3000/employees';
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const params = new URLSearchParams(url.search);
const userId = params.get('id');
console.log('User ID:', userId);



async function fetchdata(userId) {
    const resposne = await fetch(server_url + '/' + userId);
    const data = await resposne.json();
    return data;

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

async function ViewDetails() {
    let userData = await fetchdata(userId);

    console.log(userData);

    document.getElementsByClassName('details')[0].style.display = 'flex';
    document.getElementById('page-title').innerText = `Dashboard/Employee/Employee Details`;
    document.getElementById('page-subtitle').innerText = `Employee Details`;


    let currentyear = new Date().getFullYear();

            let age = currentyear - userData.dob.slice(6, 10);

            let month1 = parseInt(userData.dob.split('-')[1]);
            let month = await getcurrentmonth(month1);
            console.log(month);
            if (userData.hasOwnProperty('avatar')) {
                document.getElementsByClassName('img_view')[0].innerHTML = `<img src="${server_url + '/' + userId + '/avatar'}" alt="" >`;
            }
            else {
                document.getElementsByClassName('img_view')[0].innerHTML = ` <div class='d-flex align-items-center justify-content-center'>${userData.firstName[0].toUpperCase() + userData.lastName[0].toUpperCase()}</div>`
            }
            document.getElementsByClassName('full_name')[0].innerHTML = `<h5>${userData.salutation} ${userData.firstName} ${userData.lastName}<h5>`;
            document.getElementsByClassName('usr-email')[0].innerHTML = `<h5 class='view-details-box'>${userData.email}</h5>`;
            document.getElementsByClassName('usr-gndr')[0].innerHTML = `${userData.gender}`;
            document.getElementsByClassName('usr-age')[0].innerHTML = `${age}`;
            document.getElementsByClassName('usr-dob')[0].innerHTML = `${userData.dob.split('-')[0] + ' ' + month + ' ' + userData.dob.split('-')[2]}`;
            document.getElementsByClassName('usr-mob')[0].innerHTML = `${userData.phone}`;
            document.getElementsByClassName('usr-qualifctn')[0].innerHTML = `${userData.qualifications}`;
            document.getElementsByClassName('usr-addrs')[0].innerHTML = `${userData.address}`;
            document.getElementsByClassName('usr-usrname')[0].innerHTML = `${userData.username}`;
           


            let btns = document.querySelectorAll('.user_info button');
            btns.forEach(async (btn) => {
                btn.value = userData.id;
                if (btn.classList.contains('edit_btn')) {
                    await edit_employee(btn);
                   

                }
                if (btn.classList.contains('delete_btn')) {

                    await delete_employee(btn);
                    

                }
            });
};


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

ViewDetails();


async function edit_employee(btn) {

    btn.addEventListener('click', async () => {

        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementById('overlay_new').style.display = 'block';
        document.getElementsByClassName("label_upld")[0].style.display = 'none';
        document.getElementsByClassName("btn-add")[0].innerHTML = 'Save Changes';
        document.getElementsByClassName('edit_image_div')[0].style.display = 'flex';
        
        await clearFormEntries();

        let All_error = document.getElementsByClassName('err');
        //clearing any errors displayed , for previous function call
        for (let each of All_error) {
            each.innerHTML = '';
        }
        image = document.getElementById('edit_image').files[0];
        let data = await fetchdata(userId);
        
        let date = data.dob.split('-').reverse().join('-');

        if (data.gender == 'male') {
            document.getElementById('male').checked = true;
        }


        document.getElementsByClassName('edit-image')[0].src = `${server_url + '/' + userId + '/avatar'}`;
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


async function handlingFormSubmission(event) {
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
//==================================//
        }

        let data = await fetchdata(user);

        let currentyear = new Date().getFullYear();

        let age = currentyear - data.dob.slice(6, 10);

        let month1 = parseInt(data.dob.split('-')[1]);


        let month = await getcurrentmonth(month1);

        if (data.hasOwnProperty('avatar')) {
            console.log(`${server_url + '/' + data.id + '/avatar'}`);
            document.getElementsByClassName('img_view')[0].innerHTML = `<img src="${server_url + '/' + data.id + '/avatar'}" alt="" >`;
        }
        else {
            document.getElementsByClassName('img_view')[0].innerHTML = ` <div class='d-flex align-items-center justify-content-center'>${data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase()}</div>`
        }
        document.getElementsByClassName('usr-dob')[0].innerHTML = `${data.dob.split('-')[0] + ' ' + month + ' ' + data.dob.split('-')[2]}`;
        document.getElementsByClassName('usr-age')[0].innerHTML = `${age}`;
        document.getElementsByClassName('full_name')[0].innerHTML = `<h5>${data.salutation} ${data.firstName} ${data.lastName}<h5>`;
        document.getElementsByClassName('usr-email')[0].innerHTML = `<h5 class='view-details-box'>${data.email}</h5>`;
        document.getElementsByClassName('usr-gndr')[0].innerHTML = `${data.gender}`;
        document.getElementsByClassName('usr-mob')[0].innerHTML = `${data.phone}`;
        document.getElementsByClassName('usr-qualifctn')[0].innerHTML = `${data.qualifications}`;
        document.getElementsByClassName('usr-addrs')[0].innerHTML = `${data.address}`;
        document.getElementsByClassName('usr-usrname')[0].innerHTML = `${data.username}`;





    
}


async function addOrSaveEmployee(URL, method, value) {

    let errors = await validateEmployee(value);

    //============================//
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

            document.getElementsByClassName('card')[0].style.display = 'none';
            document.querySelector('.add-emp-cnfrmation h5').innerText = data['message'];
            document.getElementsByClassName('add-emp-cnfrmation')[0].style.display = 'flex';
            document.getElementsByClassName('employee-add-btn')[0].addEventListener('click', () => {
                document.getElementsByClassName('add-emp-cnfrmation')[0].style.display = 'none';
                document.getElementById('overlay_new').style.display = 'none';
             

            })
            return (data.id)


        }
        catch (err) {
            console.error(`chehck URL : ${err}`)
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

async function delete_employee(btn) {

    btn.addEventListener('click', () => {

        document.getElementById('overlay_new').style.display = 'block';
        document.getElementsByClassName('delete')[0].style.display = 'flex';
       
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
         
            document.getElementById('overlay_new').style.display = 'none';

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
                document.getElementById('overlay_new').style.display = 'none';
                window.location.href = 'index.html';
                


            });
        })
    });
}
                    



//==========================================================//





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
    document.getElementById('overlay_new').style.display = 'none';

    displayPagination(1);
})

//button to change image

let change_btn = document.getElementsByClassName('change_btn')[0];
let input_editimage = document.getElementById('edit_image');

change_btn.addEventListener('click', () => {
    input_editimage.click();
})




document.getElementById('overlay_new').addEventListener('click', () => {
    document.getElementsByClassName('card')[0].style.display = 'none';
    document.getElementById('overlay_new').style.display = 'none';
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


function cancelAdding() {
    document.getElementsByClassName('card')[0].style.display = 'none';
    document.getElementById('overlay_new').style.display = 'none';
    displayPagination(1);
}

document.getElementsByClassName('btn-cncl')[0].addEventListener('click', cancelAdding);

document.addEventListener('click', hideContainer);




