export const sortByName = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }
    return 0;
}

export const search = (dropDownInputRef, optionsRef) => {
    const filter = dropDownInputRef.current.value.toLowerCase();
    const options = optionsRef.current.children
    let txtValue
    for (const option of options) {
        txtValue = option.textContent || option.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            option.style.display = "";
        } else {
            option.style.display = "none";
        }
    }
}

export const showHideComponent = (ref) => {
    ref.current.style.display = ref.current.style.display === "flex" ? "none" : "flex"
}