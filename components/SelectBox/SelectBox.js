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
    const [searchState, setSearchState] = useState([])
    const [selectedItems, setSelectedItems] = useState([])

    useEffect(() => {
        if (!data.length) return
        // after data props change add checked:false property for default value of input checkbox 
        const addCheckedData = data.map(coin => ({ ...coin, checked: false }))
        // setstate in dropDownData for save data with checked in whole program
        setdropDownData(addCheckedData)
        // setstate default value searchState state that show in drop down before type anything
        setSearchState(addCheckedData)
    }, [data])

    useEffect(() => {
        if (!dropDownData.length) return
        // after click on check box dropDownData will change and this useeffect will work here we sort fltered data
        // in searchState first by name (in case that uncheck an element it should remove from first of array) 
        // and then by checked property 
        setSearchState(searchState.sort(sortByName).sort(sortByChecked))
        // setstate selectedItems for fun. that need these items
        setSelectedItems(dropDownData.filter(coin => coin.checked === true))
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
                ))

            // second update setSearchState that store filtered data by input
            setSearchState(prev =>
                prev.map(coin =>
                    coin.id === selectedOption.id
                        ? ({ ...coin, checked: false })
                        : coin)
            )
        } else {
            // first update dropDownData that store all data in 
            setdropDownData(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedOption.id) {
                        return { ...coin, checked: true }
                    }

                    return multiSelect ? coin : ({ ...coin, checked: false })
                })
            })

            // second update setSearchState that store filtered data by input
            setSearchState(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedOption.id) {
                        return { ...coin, checked: true }
                    }

                    return multiSelect ? coin : ({ ...coin, checked: false })
                })
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
        setSearchState(
            dropDownData.filter(item =>
                (item.name.toLowerCase()).search(value.toLowerCase()) >= 0 ? item : null)
                .sort(sortByChecked)
        )
    }

    const showHideComponent = (ref) => {
        // change display of component when click on select element 
        ref.current.style.display = ref.current.style.display === "flex" ? "none" : "flex"
    }

    return (
        <div
            ref={selectBoxWrapperRef}
            className={`SelectBoxWrapper ${selectedItems.length ? "active" : ""}`}
        >
            <div
                className="selectBox"
                onClick={() => showHideComponent(dropDownRef)}
            >
                {title}
                <div className='row'>
                    <span className='selectedBoxCount'>
                        {selectedItems.length || ""}
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
                        (searchState).map(coin => (
                            <label
                                key={coin.id}
                                forhtml={coin.id}
                            >
                                <input
                                    id={coin.id}
                                    type="checkbox"
                                    checked={coin.checked}
                                    onChange={() => handleClick(coin)}
                                />
                                {coin.name}
                            </label>
                        ))
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