export const sortByName = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }
    return 0;
}


export const sortArrayByNameByChecked = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return Number(a.checked) < Number(b.checked)
            ? 1
            : Number(a.checked) > Number(b.checked)
                ? -1
                : -1
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return Number(a.checked) < Number(b.checked)
            ? 1
            : Number(a.checked) > Number(b.checked)
                ? -1
                : 1
    }
    return Number(a.checked) < Number(b.checked)
        ? 1
        : Number(a.checked) > Number(b.checked)
            ? -1
            : 0
}