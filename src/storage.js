const saveUser =  (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const getUserID = () => {
    return JSON.parse(localStorage.getItem('user')).id
}

export {
    saveUser,
    getUser,
    getUserID
}