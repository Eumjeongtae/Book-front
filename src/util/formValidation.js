export const formValidation = (form) => {


    if (form.book_name === '') {
        return 'book_name';
    }

    if (form.author === '') {
        return 'author'

    }
    if (form.publisher === '') {

        return 'publisher'

    }


    if (form.income_type === 2 && form.income_method === '') {
        return 'income_method'
    } else {
        return false
    }
}