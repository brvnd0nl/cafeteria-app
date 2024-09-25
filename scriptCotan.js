function redirigirAcceso() {
    window.location.href = "Acceso.html";
}

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Nombre: ${fullName.value}<br> Correo: ${email.
        value}<br> Numero: ${phone.value}<br> Mensage: ${mess.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "salicota14@gmail.com",
        Password : "F902C1A0ACB038490ACDB015E04C9B9418D0",
        To : 'salicota14@gmail.com',
        From : "salicota14@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Exito!",
                text: "Mensaje enviado con éxito!",
                icon: "success"
            });
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        item.addEventListener("keyup", () => {
            if (item.value !== "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && 
    !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")){
        sendEmail();

        form.reset();
        return false
    }

    
});

