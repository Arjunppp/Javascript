//fetching URL and populating data
let server_url = 'http://localhost:3000/employees';
fetch(server_url).then((res) => {
    if (!res.ok) {
        throw new Error('check the URL');
    }
    else {
        return res.json();
    }
}).then((data) => {
    let employess = '';
    let count = 1;
    data.forEach((user) => {
        employess += `<tr scope='row'>
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
    document.getElementById("table-body").innerHTML = employess;
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

    let view_btns = document.getElementsByClassName('view_btn');
    Array.from(view_btns).forEach((btn) => {

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

                console.log(data);
                let view_data = `
           <h5>${data.salutation + " " + data.firstName + " " + data.lastName}</h5>
           <p>${data.email}<p>
           <p>${data.gender}</p>
           <p>${data.age}</p>
           <p>${data.dob}</p>
           <p>${data.phone}</p>
           <p>${data.qualifications}</p>
           <p>${data.adress}</p>
           <p>${data.username}</p>  

          `;
                document.getElementsByClassName('details')[0].innerHTML = view_data;

            })

        })
    });

    let edit_btns = document.getElementsByClassName('edit_btn');
    Array.from(edit_btns).forEach((btn) => {

        btn.addEventListener('click', () => {
            console.log(`The Id of the user to be edited is ${btn.value}`)
        })
    });

    let delete_btns = document.getElementsByClassName('dlte_btn');
    Array.from(delete_btns).forEach((btn) => {

        btn.addEventListener('click', () => {
            document.getElementsByClassName('delete')[0].style.display = 'block';
            let delete_items = `<h4>Delete Employees</h4>
            <p>Are you sure you wanna delete this employee</p>
            <button>Cancel</button>
            <button value=${btn.value}>Delete</button>`;
            document.getElementsByClassName('delete')[0].innerHTML = delete_items;

            let cncl_dlt = document.querySelectorAll('.delete button');
            cncl_dlt[0].addEventListener('click', () => {
               
                document.querySelector('.delete').style.display ='none';
                document.querySelector('.edit-details').style.display ='none';

            });

            cncl_dlt[1].addEventListener('click', () => {


                let options = {method :'DELETE' ,
                                headers:{'content-type' : 'application/JSON'},
                                };
                fetch(server_url + '/' + btn.value , options).then((res) => 
            {
                if(!res.ok)
                {
                    throw new Error('Check your URL');
                }
                else
                {
                    return res.json();
                }
            }).then((data) => 
        {
            document.querySelector('.delete').style.display ='none';
            window.location.reload();

            });
        })
    });


})
    
}).catch((error) => {
    console.log(error);
});










