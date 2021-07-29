const saveUser =  (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const getUesrID = () => {
    return JSON.parse(localStorage.getItem('user')).id
}

export {
    saveUser,
    getUser,
    getUesrID
}