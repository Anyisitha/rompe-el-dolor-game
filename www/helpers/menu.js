$(document).ready(() => {

    const URL = 'https://api-rompe-dolor.emlproyectos.com.co/api/';

    const getUnlockedLevels = async (userId, token) => {
        const url = URL + 'levels/get-levels?user_id=' + userId;

        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization':  `Bearer ${token}`
                }
            });

            const data = await res.json();
            
            return {
                succcess: data.message.type,
                data: data.data
            }

        } catch(error) {
            console.log(error);
        }
    }

    const userData = JSON.parse(localStorage.getItem('data'));
    const token = localStorage.getItem('token');

    const menuItem2 = $('#to-level-2');
    const menuItem3 = $('#to-level-3');

    const showLevels = async (id, token) => {
        const res = await getUnlockedLevels(id, token);
         
        if(res.succcess == 'success') {

            const isLevel2Unlocked = res.data.level2;
            const isLevel3Unlocked = res.data.level3;

            if(isLevel2Unlocked) {
                menuItem2.parent()[0].classList.remove('locked');
                menuItem2.parent()[0].setAttribute('href', '../level2/index.html');
            }

            if(isLevel3Unlocked) {
                menuItem3.parent()[0].classList.remove('locked');
                menuItem3.parent()[0].setAttribute('href', '../level3/index.html');
            }

            $('.loader').hide();
            $('.menu-item').show();

        } else {
            alert('Oops! Algo salió mal');
        }
    }

    showLevels(userData.id, token);

});