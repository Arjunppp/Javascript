export async function view_employee(btn) {
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
                }
                if (btn.classList.contains('delete_btn')) {

                    await delete_employee(btn);
                }
            })

        })
    });

}