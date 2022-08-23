import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { showHideComponent } from '../functions';

const SelectBox = ({
    data,
    multiSelect,
    getSelectedItems,
    title
}) => {
    const SelectBoxWrapperRef = useRef(null);
    const dropDownInputRef = useRef(null);
    const optionsRef = useRef(null);
    const dropDownRef = useRef(null);

    const [dropDownData, setdropDownData] = useState([])
    const [filteredDropDownData, setFilteredDropDownData] = useState([])
    const [selectedItems, setSelectedItems] = useState([])

    useEffect(() => {
        if (!data.length) return
        setdropDownData(data.map(coin => ({ ...coin, checked: false })))
    }, [data])

    useEffect(() => {
        if (!dropDownData.length) return
        const filteredDataNotSelected = dropDownData.filter(coin => coin.checked !== true)
        const filteredDataSelected = dropDownData.filter(coin => coin.checked === true)
        setFilteredDropDownData(filteredDataSelected.concat(filteredDataNotSelected))
        setSelectedItems(filteredDataSelected)
    }, [dropDownData])

    useEffect(() => {
        getSelectedItems(selectedItems)
    }, [selectedItems])

    useEffect(() => {
        console.log("filteredDropDownData", filteredDropDownData);
    }, [filteredDropDownData])


    const handleClick = (selectedCoin) => {
        if (!selectedCoin.checked) {
            setdropDownData(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedCoin.id) {
                        return { ...coin, checked: true }
                    }

                    if (multiSelect) return coin
                    else return { ...coin, checked: false }
                })
            })

        } else {
            setdropDownData(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedCoin.id) {
                        return { ...coin, checked: false }
                    }
                    return coin
                })
            })
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (SelectBoxWrapperRef.current && !SelectBoxWrapperRef.current.contains(event.target)) {
                dropDownRef.current.style.display = "none"
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [SelectBoxWrapperRef]);

    const search = (value) => {
        setFilteredDropDownData(dropDownData.filter(item => (item.name.toLowerCase()).search(value.toLowerCase()) >= 0 ? item : null))
    }

    return (
        <div
            ref={SelectBoxWrapperRef}
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
                    ref={dropDownInputRef}
                    onChange={(e) => search(e.target.value)}
                    className="inputDropDown"
                />
                <div
                    className='options'
                    ref={optionsRef}
                >
                    {
                        (filteredDropDownData || dropDownData || []).map(coin => (
                            <span
                                key={coin.id}
                                onClick={() => handleClick(coin)}
                            >
                                <input
                                    type="checkbox"
                                    checked={coin.checked}
                                    onChange={() => { }}
                                />
                                {coin.name}
                            </span>
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