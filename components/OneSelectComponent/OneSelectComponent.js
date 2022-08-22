import React from 'react'
import SelectBox from '../SelectBox/SelectBox'

const OneSelectComponent = ({ title, data }) => {

    const getSelectedItems = (selectedItems) => {
        console.log('====================================');
        console.log("selectedItems from OneSelectComponent", selectedItems);
        console.log('====================================');
    }

    return (
        <div>
            <h1>
                OneSelectComponent
            </h1>
            <SelectBox
                title={title}
                data={data}
                multiSelect={false}
                getSelectedItems={getSelectedItems}
            />
        </div>
    )
}

export default OneSelectComponent