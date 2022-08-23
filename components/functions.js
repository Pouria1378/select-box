export const sortByName = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }
    return 0;
}

export const sortByChecked = (a, b) => Number(b.checked) - Number(a.checked)