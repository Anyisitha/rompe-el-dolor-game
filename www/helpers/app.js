$(document).ready(() => {

    let userData = {};

    $(document).on('click', '.continue', function () {
        const id = $(this)[0].id.split('-')[1];

        $(`#info .info-${id}`).hide();
        $(`#info .info-${+id + 1}`).show();
    });

    // * MAIN SCREEN
    const mainScreen = $('#main');

    $(document).on('click', '.main-btn', function () {
        const id = $(this)[0].id.split('-')[1];

        mainScreen.fadeOut('fast');
        $(`#${id}`).fadeIn('fast');
    });

    // * RATE FUNCTIONS
    const rateOptions = $('#rate-btns-wrapper');
    const rateInfo = $('#rate-feedback');

    $(document).on('click', '.rate-option', function () {
        const id = $(this)[0].id.split('-')[2];

        rateOptions.fadeOut('fast');
        rateInfo.fadeIn('fast');
        $(`#feedback-${id}`).fadeIn('fast');
    });

    // * API CONECTION
    const URL = 'https://api-rompe-dolor.emlproyectos.com.co/api/';

    const loginUser = async (name) => {
        const url = URL + 'auth/login';
        const body = new FormData();
        body.append('fullname', name);
        body.append('password', 'password');

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: body
            });

            const data = await res.json();

            return {
                success: data.message.type,
                data: data.data
            };

        } catch (error) {
            console.log(error);
        }
    }

    const registerUser = async (registerName, email, pharmacy, phone) => {
        const url = URL + 'auth/register';
        const body = new FormData();
        body.append('fullname', registerName);
        body.append('email', email);
        body.append('pharmacy', pharmacy);
        body.append('phone', phone);

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: body
            });

            const data = await res.json();

            return {
                success: data.message.type,
                data: data.data
            };

        } catch (error) {
            console.log(error);
        }
    }

    const updateUserData = async (newName, email, pharmacy, phone, id) => {
        const url = URL + 'auth/edit-user';
        const body = new FormData();
        body.append('fullname', newName);
        body.append('email', email);
        body.append('pharmacy', pharmacy);
        body.append('phone', phone);
        body.append('id', id);

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: body
            });

            const data = await res.json();

            return {
                success: data.message.type,
                data: data.data
            };

        } catch (error) {
            console.log(error);
        }
    }

    const unlockLevel = async (userId, level, token) => {
        const url = URL + 'levels/set-levels';
        const body = new FormData();
        body.append('user_id', userId);
        body.append('level_id', level);

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: body,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            return data.message.type;

        } catch (error) {
            console.log(error);
        }
    }

    const rateGame = async (option, token) => {
        const url = URL + 'levels/set-satisfaction';
        const body = new FormData();
        body.append('response', option);

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: body,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            return data.message.type;

        } catch (error) {
            console.log(error);
        }
    }

    // * LOGIN
    const loginLoader = $('#login .loader');
    const loginBtn = $('#submit-login');

    loginBtn.click(async () => {
        const name = $('#login-name').val();

        
        if (name != '') {

            loginBtn.hide();
            loginLoader.show();

            const res = await loginUser(name);

            if (res.success == 'success') {
                window.localStorage.setItem('token', res.data.token);

                const userData = {
                    id: res.data.user.id,
                    name: res.data.user.fullname,
                    email: res.data.user.email,
                    pharmacy: res.data.user.pharmacy.name,
                    phone: res.data.user.phone
                };

                window.localStorage.setItem('token', res.data.token);
                window.localStorage.setItem('data', JSON.stringify(userData));

                document.location.href = './views/menu/index.html';

            } else {
                alert('Los datos ingresados son incorrectos');

                loginBtn.show();
                loginLoader.hide();
            }

        } else {
            alert('Ingresa los datos');
        }
    });

    // * REGISTER
    const registerName = $('#register-name');
    const phone = $('#phone');
    const email = $('#email');
    const farmacia = $('#farmacia');

    const registerBtn = $('#register-btn');
    const registerLoader = $('#register .loader')

    registerBtn.click(async () => {
        if (registerName.val() != '' && phone.val() != '' && email.val() != '' && farmacia.val() != '') {

            registerBtn.show();
            registerLoader.hide();

            const res = await registerUser(registerName.val(), email.val(), farmacia.val(), phone.val());

            if (res.success == 'success') {
                alert('Usuario creado con exito! Logueate para jugar');
                location.reload();
            } else {
                if (res.data.includes('Duplicate')) {
                    alert('El email ingresado ya esta registrado');
                } else {
                    alert('El nombre ingresado ya esta registrado');
                }

                registerBtn.hide();
                registerLoader.show();
            }

        } else {
            alert('Por favor completa los datos');
        }
    });

    // * UPDATE USER DATA
    const newName = $('#new-name');
    const newPhone = $('#new-phone');
    const newEmail = $('#new-email');
    const newFarmacia = $('#new-farmacia');

    const updateBtn = $('#update-data');
    const updateLoader = $('#settings .loader');

    updateBtn.click(async () => {
        const data = JSON.parse(localStorage.getItem('data'));
        const id = data.id;

        if (newName.val() != '' && newPhone.val() != '' && newEmail.val() != '' && newFarmacia.val() != '') {

            updateBtn.hide();
            updateLoader.show();

            const res = await updateUserData(newName.val(), newEmail.val(), newFarmacia.val(), newPhone.val(), id);

            if (res.success == 'success') {

                const userData = {
                    id: res.data.id,
                    name: res.data.fullname,
                    email: res.data.email,
                    pharmacy: res.data.pharmacy.name,
                    phone: res.data.phone
                };

                window.localStorage.setItem('data', JSON.stringify(userData));

                alert('Datos actualizados correctamente!');

                document.location.href = '../menu/index.html';

            } else {
                alert('Algo salió mal');

                updateBtn.show();
                updateLoader.hide();
            }

        } else {
            alert('Por favor llena los datos');
        }
    });

    // ? UNLOCK LEVEL 2
    $('#unlock-level-2').click(async () => {
        const token = localStorage.getItem('token');
        const data = JSON.parse(localStorage.getItem('data'));

        const res = await unlockLevel(data.id, 1, token);

        if (res == 'success') {
            document.location.href = '../menu/index.html';
        }
    });

    // ? UNLOCK LEVEL 3
    $('#unlock-level-3').click(async () => {
        const token = localStorage.getItem('token');
        const data = JSON.parse(localStorage.getItem('data'));

        const res = await unlockLevel(data.id, 2, token);

        if (res == 'success') {
            document.location.href = '../menu/index.html';
        }
    });

    // RATE GAME 
    const sendBtn = $('.send');
    const rateLoader = $('#rate .loader');

    const sendResponse = async (btn) => {

        sendBtn.hide();
        rateLoader.show();

        const response = btn[0].id.split('-')[1];
        const token = localStorage.getItem('token');

        const res = await rateGame(response, token);

        if (res == 'success') {
            alert('Su respuesta ha sido enviada!');
            document.location.href = '../menu/index.html';
        } else {
            alert('Algo salió mal');
            
            sendBtn.show();
            rateLoader.hide();
        }
    }

    $(document).on('click', '.send', function () {
        sendResponse($(this));
    });


    // LOGOUT
    $('#logOut').click(() => {
        localStorage.removeItem('data');
        localStorage.removeItem('token');

        document.location.href = '../../index.html';
    });

});