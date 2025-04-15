const userData = {
    "type": "friendsFound",
    "content": [
        {
            "username": "Colest_",
            "name": "Mark Tom",
            "interests": "Football",
            "school": "Hill school",
            "age": 20,
            "hometown": "Eldoret"
        },
        {
            "username": "qwerty",
            "name": "Mark",
            "interests": "Football",
            "school": "Hillschool",
            "age": 20,
            "hometown": "Eldoret"
        }
    ]
}

userData.content.map((element) => {
    console.log(element.name);
})