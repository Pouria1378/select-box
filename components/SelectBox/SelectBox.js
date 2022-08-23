import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { sortByName } from '../functions';

const SelectBox = ({
    data,
    multiSelect,
    getSelectedItems,
    title
}) => {
    const SelectBoxWrapperRef = useRef(null);
    const dropDownRef = useRef(null);

    const [dropDownData, setdropDownData] = useState([])
    const [searchState, setSearchState] = useState([])
    const [selectedItems, setSelectedItems] = useState([])

    useEffect(() => {
        if (!data.length) return
        const addCheckedData = data.map(coin => ({ ...coin, checked: false }))
        setdropDownData(addCheckedData)
        setSearchState(addCheckedData)
    }, [data])

    useEffect(() => {
        if (!dropDownData.length) return
        const filteredDataSelected = dropDownData.filter(coin => coin.checked === true)
        setSearchState(searchState.sort(sortByName).sort((a, b) => Number(b.checked) - Number(a.checked)))
        setSelectedItems(filteredDataSelected)
    }, [dropDownData])

    useEffect(() => {
        getSelectedItems(selectedItems)
    }, [selectedItems])



    const handleClick = (selectedCoin) => {
        if (selectedCoin.checked) {
            setdropDownData(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedCoin.id) {
                        return { ...coin, checked: false }
                    }
                    return coin
                })
            })

            setSearchState(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedCoin.id) {
                        return { ...coin, checked: false }
                    }
                    return coin
                })
            })
        } else {
            setdropDownData(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedCoin.id) {
                        return { ...coin, checked: true }
                    }

                    if (multiSelect) return coin
                    else return { ...coin, checked: false }
                })
            })

            setSearchState(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedCoin.id) {
                        return { ...coin, checked: true }
                    }

                    if (multiSelect) return coin
                    else return { ...coin, checked: false }
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

    const search = (value = "") => {
        setSearchState(dropDownData.filter(item =>
            (item.name.toLowerCase()).search(value.toLowerCase()) >= 0 ? item : null)
        )
    }

    const showHideComponent = (ref) => {
        ref.current.style.display = ref.current.style.display === "flex" ? "none" : "flex"
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
                                forHtml={coin.id}
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