import React from 'react'
import SelectBox from '../SelectBox/SelectBox'
import PropTypes from 'prop-types'

const MultiSelectComponent = ({ title, data }) => {

    const getSelectedItems = (selectedItems) => {
        // console.log('====================================');
        // console.log("selectedItems from MultiSelectComponent", selectedItems);
        // console.log('====================================');
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

MultiSelectComponent.prototype = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}

MultiSelectComponent.defaultProps = {
    title: "search",
    data: []
}

export default MultiSelectComponent