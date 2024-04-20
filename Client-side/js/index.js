
let server_url = 'http://localhost:3000/employees';

//Function to add event listner to add EMployee button
 function addingEmployee() 
 {
    document.getElementById('add_employee').addEventListener('click', async () => {
        document.getElementsByClassName('card')[0].style.display = 'block';
        document.getElementsByClassName('btn-save-chnge')[0].style.display ='none';
        await form_submission(0 , 0 , 'POST');
    });
}
//Function to add Event listner to cancel the adding
 function cancelAdding() 
{
    document.getElementsByClassName('btn-cncl')[0].addEventListener('click', () => {
        document.getElementsByClassName('card')[0].style.display = 'none';
    });
}
 
// submiting form
async function form_submission(a , value ,http_method)
{ 
   
     if(a === 0)
     {
        document.getElementsByClassName('btn-save-chnge')[0].type ='button';
        document.getElementsByClassName('btn-add')[0].type ='submit';
        document.getElementById('form').addEventListener('submit', (event) => {
            event.preventDefault();
            let dob = document.getElementById('date_of_birth').value;
                          
                           let crctdDob = dob.slice(8,10) + '-' + dob.slice(5,7) + '-' + dob.slice(0,4) ; 
    
            fetch(server_url, {
                method: `${http_method}`, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
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
        
                })
            }).then((response) => {
        
                if (!response.ok) {
                    throw new Error('Check the URL please');
                }
                else {
                    return response.json();
                }
        
            }).then((data) => {
        
                console.log(data);
               
                return data;
        
            }).catch((error) => {
                console.log(error);
            })
        });
       
     }
     else 
     {
        
        let data = await fetchUser(value);
                 document.getElementsByClassName('card')[0].style.display = 'block';
                document.getElementsByClassName("label_upld")[0].style.display='none';
                document.getElementsByClassName("btn-add")[0].style.display='none';

                document.getElementById('first_name').value = data.firstName;
                document.getElementById('last_name').value = data.lastName;
                document.getElementById('email').value = data.email;
                document.getElementById('mobile_number').value = data.phone;
                document.getElementById('date_of_birth').value = data.dob;
              
                document.getElementById('address').value = data.address;
                document.getElementById('city').value = data.city;
                document.getElementById('username').value = data.username;
                document.getElementById('password').value = data.password;


                document.getElementsByClassName('btn-save-chnge')[0].type ='submit';
                document.getElementsByClassName('btn-add')[0].type ='button';
               
               
                document.getElementById('form').addEventListener('submit' , async (event) => 
            {
                
                           event.preventDefault();
                           let dob = document.getElementById('date_of_birth').value;
                          
                           let crctdDob = dob.slice(8,10) + '-' + dob.slice(5,7) + '-' + dob.slice(0,4) ; 
                              
                 
    
            fetch(server_url + '/' + value, {
               
                method: `${http_method}`, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
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
        
                })
            }).then((response) => {
        
                if (!response.ok) {
                    throw new Error('Check the URL please');
                }
                else {
                    return response.json();
                }
        
            }).then((data) => {
        
                console.log(data);
               
                return data;
        
            }).catch((error) => {
                console.log(error);
            })
        });
            

        


     }
   

}
async function addEmployee ()
{
     addingEmployee();
     cancelAdding() ;
 
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
//populate each user data in each row of the table
async function populateData() {
    let users = await fetchUser('all');
    let eachrows = '';
    let count = 1;
    users.forEach((user) => {
        eachrows += `<tr scope='row'>
             <td scope='col' >#0${count++}</td>
             <td scope='col' >${user.firstName}</td>
             <td scope='col' >${user.email}</td>
             <td scope='col' >${user.phone}</td>
             <td scope='col' >${user.gender}</td>
             <td scope='col' >${user.dob}</td>
             <td scope='col' >${user.country}</td>
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
            if (document.getElementsByClassName('edit-details')[index].style.display === 'block') {
                document.getElementsByClassName('edit-details')[index].style.display = 'none';
            }
            else {
                document.getElementsByClassName('edit-details')[index].style.display = 'block'
            }
        })
    });


}

function editemployees() {

    let btns = document.querySelectorAll('.edit-details button');
    Array.from(btns).forEach((btn) => {
        if (btn.className === 'view_btn') {
            btn.addEventListener('click', () => {

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

                   
                    let currentyear = new Date().getFullYear();
                   
                    let age = currentyear - data.dob.slice(6,10) ;
                    
                    let view_data = `
                           <h5>${data.salutation + " " + data.firstName + " " + data.lastName}</h5>
                           <p>${data.email}<p>
                           <p>${data.gender}</p>
                           <p>${data.age}</p>
                           <p>${age}</p>
                           <p>${data.phone}</p>
                           <p>${data.qualifications}</p>
                           <p>${data.adress}</p>
                           <p>${data.username}</p>  
                    
                          `;
                    document.getElementsByClassName('details')[0].innerHTML = view_data;

                })
            })
        }

        if (btn.className === 'edit_btn') {
            btn.addEventListener('click', async () => {
                await form_submission(1 , btn.value , 'PUT');
                console.log(1);
                
            });
        }
        if (btn.className === 'dlte_btn') {

            btn.addEventListener('click', () => {
                console.log('haiii');
                document.getElementsByClassName('delete')[0].style.display = 'block';
                let delete_items = `<h4>Delete Employees</h4>
                       <p>Are you sure you wanna delete this employee</p>
                       <button>Cancel</button>
                       <button value=${btn.value}>Delete</button>`;
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

//calling the above functions in order
async function employeeFunction() {
    await populateData();
    addCLickEvent();
    editemployees();
}

employeeFunction();










