const tokenKey = 'authenticationToken'
const Account = {
    isLoggedIn: () => {
        return true
    },
    updateToken: (jwt) => {
    },
    refreshToken: () => {
    },
    token: () => {
        return window.localStorage.getItem(tokenKey);
    },
    user: () => {
        return "user display name";
    },
    userGuid: () => {
        return "user guid";
    },
    logout: () => {
    },
    role: () => {
        return "role";
    },
    isSuperAdmin: () => {
        return true;
    },
    checkLogin: (callback) => {
    },
    removeToken: () => {
    }
}

export default Account;
