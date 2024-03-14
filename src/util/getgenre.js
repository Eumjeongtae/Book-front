export const getgenre = (genreNum) => {
    if (genreNum === 0) {
        return 'All';
    } else if (genreNum === 1) {
        return 'Development';
    } else if (genreNum === 2) {
        return 'Marketing';
    } else {
        return 'General';
    }
};
