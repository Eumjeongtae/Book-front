export const signValidation = (info, vali) => {

    if (info.id === '') {
        return 'id'
    } else if (!vali.id) {
        return 'id'
    }
    if(info.name === ''){
        return 'name'
    }
    if (info.password === '') {
        return 'password'
    } else if (!vali.password) {
        return 'password'
    }
    if (info.pwcheck !== info.password) {
        return 'pwcheck'
    }

    if (info.mailAuthNum === '') {
        return 'mailAuthNum'
    } else if (!vali.mailAuthNum) {
        return 'mailAuthNum'
    }

    return false
}