export const sortByName = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }
    return 0;
}


export const showHideComponent = (ref) => {
    ref.current.style.display = ref.current.style.display === "flex" ? "none" : "flex"
}