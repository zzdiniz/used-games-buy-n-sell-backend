interface User {
    name: string
    age: number
}

const saveUser = (user:User) =>{
    console.log(user, typeof user)
}


const user = {name:'bruno', age:21}

saveUser(user)