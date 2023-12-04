const eyeLeft = document.querySelector('.eyes__left span');
const eyeRight = document.querySelector('.eyes__right span');
const formEmail = document.querySelector('.form__control[type=email]');
const formPassword = document.querySelector('.form__control[type=password]');
const btnLogin = document.querySelector('.form__submit');
const mouth = document.querySelector('.robot__mouth');



formEmail.onfocus = (e)=> {
    eyeLeft.style.top = '50%';
    eyeRight.style.top = '50%';
    let value = e.target.value.length;
    eyeLeft.style.left =  (15 + (value / 2))  + 'px';
    eyeRight.style.left = (15 + (value / 2)) + 'px';
    eyeLeft.style.opacity = '100%';
    eyeRight.style.opacity = '100%';

}

formEmail.oninput = (e)=> {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let value = e.target.value;

    if(!value.match(emailRegex)) {
        emojis(e,'failed');
        e.target.nextElementSibling.innerHTML = 'Invalid Email.';

    }else {
        emojis(e,'success');
        e.target.nextElementSibling.innerHTML = '';
    }

    btnLogin.disabled = formValid();
    eyeLeft.style.left =  (15 + (value.length / 2))  + 'px';
    eyeRight.style.left = (15 + (value.length / 2)) + 'px';

}

formEmail.onblur = ()=> {
    eyeLeft.style.top = '20px';
    eyeRight.style.top = '20px';
    eyeRight.style.left = '50%';
    eyeLeft.style.left = '50%';

}

formPassword.onblur = ()=> {
    eyeLeft.style.opacity = '100%';
    eyeRight.style.opacity = '100%';

}

formPassword.onfocus = ()=> {
    eyeLeft.style.opacity = '0%';
    eyeRight.style.opacity = '0%';

}

formPassword.oninput = (e)=> {
    let value = e.target.value;

    if(value.length < 3) {
        emojis(e,'failed');
        e.target.nextElementSibling.innerHTML = 'Password Must Be Greater Than 3';

    }else {
        emojis(e,'success');
        e.target.nextElementSibling.innerHTML = '';
    }
    btnLogin.disabled = formValid();
}


function formValid() {
    const formEmailError = document.querySelector('.form__control[type=email]+.form__error');
    const formPasswordError = document.querySelector('.form__control[type=password]+.form__error');
    return !(!formPasswordError.innerHTML && !formEmailError.innerHTML);
}

function emojis(obj,status) {
    if(status === 'failed') {
        mouth.style.width = "150px";
        mouth.style.height = "30px";
        mouth.style.borderRadius = "5px";
        if(obj != 1) {
            obj.target.style.boxShadow = '5px 5px 15px #FF000080';
        }
    }else {
        mouth.style.width = "120px";
        mouth.style.borderRadius = "0 0 50% 50%";
       if(obj != 1) {
           obj.target.style.boxShadow = '5px 5px 15px #3829E080';
       }
    }
}


btnLogin.onclick = (e)=> {
    e.preventDefault();

    if(formValid){

        let cardHeaderOverlay = document.querySelector('.card__header__overlay');

        if(formEmail.value === 'caci@gmail.com' && formPassword.value === "12345678") {
            cardHeaderOverlay.style.animation = 'success .8s ease-in-out infinite alternate';
            emojis(1,'success');
            formEmail.value = formPassword.value = '';
        }else {
            emojis(1,'failed');
            cardHeaderOverlay.style.animation = 'failed .8s ease-in-out infinite alternate';
        }

        setTimeout(()=> {
            cardHeaderOverlay.style.animation = "none";
        },5000);
    }
}

