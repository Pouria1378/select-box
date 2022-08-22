import React from 'react'
import SelectBox from '../SelectBox/SelectBox'

const MultiSelectComponent = ({ title, data }) => {

    const getSelectedItems = (selectedItems) => {
        console.log('====================================');
        console.log("selectedItems from MultiSelectComponent", selectedItems);
        console.log('====================================');
    }

    return (
        <SelectBox
            title={title}
            data={data}
            multiSelect={true}
            getSelectedItems={getSelectedItems}
        />
    )
}

export default MultiSelectComponent