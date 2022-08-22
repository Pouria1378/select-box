import React from 'react'
import SelectBox from '../SelectBox/SelectBox'

const MultiSelectComponent = ({ title, data }) => {

    const getSelectedItems = (selectedItems) => {
        console.log('====================================');
        console.log("selectedItems from MultiSelectComponent", selectedItems);
        console.log('====================================');
    }

    return (
        <div> 
            <h1>
                MultiSelectComponent
            </h1>
            <SelectBox
                title={title}
                data={data}
                multiSelect={true}
                getSelectedItems={getSelectedItems}
            />
        </div>
    )
}

export default MultiSelectComponent