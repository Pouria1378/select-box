import React from 'react'
import SelectBox from '../SelectBox/SelectBox'
import PropTypes from 'prop-types'

const OneSelectComponent = ({ title, data }) => {

    const getSelectedItems = (selectedItems) => {
        // console.log('====================================');
        // console.log("selectedItems from OneSelectComponent", selectedItems);
        // console.log('====================================');
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

OneSelectComponent.prototype = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}

OneSelectComponent.defaultProps = {
    title: "search",
    data: []
}

export default OneSelectComponent