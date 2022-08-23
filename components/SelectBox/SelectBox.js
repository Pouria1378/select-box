import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { sortByChecked, sortByName } from '../functions';

const SelectBox = ({
    data,
    multiSelect,
    getSelectedItems,
    title
}) => {
    const selectBoxWrapperRef = useRef(null);
    const dropDownRef = useRef(null);

    const [dropDownData, setdropDownData] = useState([])
    const [selectedItems, setSelectedItems] = useState([])

    useEffect(() => {
        if (!data.length) return
        // after data props change add checked:false property for default value of input checkbox 
        const addCheckedData = data.map(coin => ({ ...coin, checked: false, show: true }))
        // setstate in dropDownData for save data with checked in whole program
        setdropDownData(addCheckedData)
    }, [data])

    useEffect(() => {
        // setstate selectedItems for fun. that need these items
        setSelectedItems(dropDownData.filter(coin => coin.checked))
    }, [dropDownData])

    useEffect(() => {
        // after setSelectedItems called this useeffect will work and pass data to getSelectedItems fun. from parent
        getSelectedItems(selectedItems)
    }, [selectedItems])



    const handleClick = (selectedOption) => {
        if (selectedOption.checked) {
            // when clicked on input type checkbox
            // first update dropDownData that store all data in 
            setdropDownData(prev =>
                prev.map(coin =>
                    coin.id === selectedOption.id
                        ? ({ ...coin, checked: false })
                        : coin
                ).sort(sortByName).sort(sortByChecked))

        } else {
            // first update dropDownData that store all data in 
            setdropDownData(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedOption.id) {
                        return { ...coin, checked: true }
                    }

                    return multiSelect ? coin : ({ ...coin, checked: false })
                }).sort(sortByChecked)
            })
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectBoxWrapperRef.current && !selectBoxWrapperRef.current.contains(event.target)) {
                // when user click outside our component the drop down will close
                dropDownRef.current.style.display = "none"
            }
        }
        // add our fun. to event listener mousedown
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // in clean up function we remove event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectBoxWrapperRef]);

    const search = (value = "") => {
        // after we find similar data with input by filter fun. we will sort it by checked to show checked at first of 
        // list

        setdropDownData(dropDownData.map(item =>
            item.name.toLowerCase().search(value.toLowerCase()) >= 0
                ? { ...item, show: true }
                : { ...item, show: false }
        ))
    }

    const showHideComponent = (ref) => {
        // change display of component when click on select element 
        ref.current.style.display = ref.current.style.display === "flex" ? "none" : "flex"
    }

    return (
        <div
            ref={selectBoxWrapperRef}
            className={`SelectBoxWrapper ${selectedItems.length > 1 ? "active" : ""}`}
        >
            <div
                className="selectBox"
                onClick={() => showHideComponent(dropDownRef)}
            >
                {
                    selectedItems.length === 1
                        ? selectedItems[0].name
                        : title
                }
                <div className='row'>
                    <span className='selectedBoxCount'>
                        {selectedItems.length > 1 && selectedItems.length || ""}
                    </span>
                    <span className='selectBoxIcon' />
                </div>
            </div>
            <div
                className="dropDown"
                ref={dropDownRef}
            >
                <input
                    type="text"
                    placeholder={`Search ${title}`}
                    onChange={(e) => search(e.target.value)}
                    className="inputDropDown"
                />
                <div
                    className='options'
                >
                    {
                        (dropDownData || []).map(item => item.show ?
                            (
                                <label
                                    key={item.id}
                                    forhtml={item.id}
                                >
                                    <input
                                        id={item.id}
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => handleClick(item)}
                                    />
                                    {item.name}
                                </label>
                            )
                            : <React.Fragment />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

SelectBox.prototype = {
    data: PropTypes.array.isRequired,
    multiSelect: PropTypes.bool,
    getSelectedItems: PropTypes.func,
    title: PropTypes.string,
}

SelectBox.defaultProps = {
    data: [],
    multiSelect: true,
    getSelectedItems: () => { },
    title: "select"
}

export default SelectBox