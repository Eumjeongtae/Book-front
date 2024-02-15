
export const dateCheck = (date) => {

    var targetDate = new Date(date);
    var currentDate = new Date();

    targetDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (targetDate > currentDate) {
        return false
    } else return true
}