export function login(user){
    delete user.password;
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(){
    return JSON.parse(localStorage.getItem('user'));
}

export function logoff(){
    localStorage.setItem('user', 'null');
}

export function userIsAdmin(){
    return 2 == getUser().level;
}

export function isValidUser() {
    return getUser() && getUser().level >=1;
}
