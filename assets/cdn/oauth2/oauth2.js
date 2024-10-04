document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById("signinForm");
    const signupForm = document.getElementById("signupForm");
    const goToSignUp = document.getElementById("goToSignUp");
    const goToSignIn = document.getElementById("goToSignIn");
    const code = document.body.dataset.code;

    goToSignUp.addEventListener("click", () => {
        signinForm.classList.remove("active");
        signupForm.classList.add("active");
    });

    goToSignIn.addEventListener("click", () => {
        signupForm.classList.remove("active");
        signinForm.classList.add("active");
    });

    const toggleSigninPass = document.getElementById("toggleSigninPass");
    const signinPasswordField = document.getElementById("signinPassword");
    let showSigninPass = false;

    toggleSigninPass.addEventListener("click", () => {
        if (showSigninPass) {
            signinPasswordField.type = "password";
            toggleSigninPass.innerHTML = "<i class='bx bxs-hide'></i>";
        } else {
            signinPasswordField.type = "text";
            toggleSigninPass.innerHTML = "<i class='bx bxs-show'></i>";
        }
        showSigninPass = !showSigninPass;
    });

    const toggleSignupPass = document.getElementById("toggleSignupPass");
    const signupPasswordField = document.getElementById("signupPassword");
    let showSignupPass = false;

    toggleSignupPass.addEventListener("click", () => {
        if (showSignupPass) {
            signupPasswordField.type = "password";
            toggleSignupPass.innerHTML = "<i class='bx bxs-hide'></i>";
        } else {
            signupPasswordField.type = "text";
            toggleSignupPass.innerHTML = "<i class='bx bxs-show'></i>";
        }
        showSignupPass = !showSignupPass;
    });

    const toggleConfirmPass = document.getElementById("toggleConfirmPass");
    const confirmPasswordField = document.getElementById("confirmPassword");
    let showConfirmPass = false;

    toggleConfirmPass.addEventListener("click", () => {
        if (showConfirmPass) {
            confirmPasswordField.type = "password";
            toggleConfirmPass.innerHTML = "<i class='bx bxs-hide'></i>";
        } else {
            confirmPasswordField.type = "text";
            toggleConfirmPass.innerHTML = "<i class='bx bxs-show'></i>";
        }
        showConfirmPass = !showConfirmPass;
    });

    const signinFormElement = signinForm.querySelector('form');
    signinFormElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.querySelector('#signinEmail').value;
        const password = document.querySelector('#signinPassword').value;

        try {
            const response = await fetch('http://localhost:3000/oauth2/v1/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, code }),
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.redirectUrl;
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    const signupFormElement = signupForm.querySelector('form');
    signupFormElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.querySelector('#signupEmail').value;
        const user_name = document.querySelector('#signupName').value;
        const password = document.querySelector('#signupPassword').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/oauth2/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, user_name, password, code }),
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.redirectUrl;
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});