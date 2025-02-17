const form = document.querySelector("#registrationForm");
    const nameVar = document.querySelector("#name");
    const ageVar = document.querySelector("#age");
    const hometownVar = document.querySelector("#hometown");
    const schoolVar = document.querySelector("#school");
    const interestsVar = document.querySelector("#interests");

    form.addEventListener('submit', (e) => {
        e.preventDefault(); //prevent reloading page

        sendMessage(nameVar.value, ageVar.value, schoolVar.value, interestsVar.value);

        form.reset();
    });

    function sendMessage(name, age, hometown, school, interests) {
        const personalData = {
            name: name,
            age: age,
            hometown: hometown,
            school: school,
            interests: interests
        }

        fetch(`http://localhost:${window.location.port}/api/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personalData)
        }).then((response) => {
            if (response.ok) {
                console.log(`Data sent succesfully!`);
            } else {
                throw new Error(`Network response was not ok ${response.statusText}`);
            }
        }).then((data) => {
            console.log(`Success: ${data}`);
        }).catch((error) => {
            console.error(`Error: ${error}`);
        });
    }