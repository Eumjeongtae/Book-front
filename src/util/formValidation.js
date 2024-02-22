export const formValidation = (form) => {
    if (form.image === '') {
        return 'image';
    }

    if (form.book_name === '') {
        return 'book_name';
    }

    if (form.author === '') {
        return 'author'

    }
    if (form.publisher === '') {

        return 'publisher'

    }
    if (form.publicatio_ndate === '') {
        return 'publicatio_ndate'
    }
    if (form.income_date === '') {
        return 'income_date'
    }
    if (form.memo === '') {
        return 'memo'
    }

    if (form.income_type === 'present' && form.income_method === '') {
        return 'income_method'
    } else {
        return false
    }
}