import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const SelectBox = ({
    data,
    multiSelect,
    getSelectedItems,
    title
}) => {
    const SelectBoxWrapperRef = useRef(null);
    const inputRef = useRef(null);
    const optionsRef = useRef(null);
    const dropDownRef = useRef(null);

    const [coinData, setCoinData] = useState([])
    const [filteredCoinData, setFilteredCoinData] = useState([])
    const [selectedItems, setSelectedItems] = useState([])

    useEffect(() => {
        if (!data.length) return
        setCoinData(data.map(coin => ({ ...coin, checked: false })))
    }, [data])

    useEffect(() => {
        if (!coinData.length) return
        const filteredDataNotSelected = coinData.filter(coin => coin.checked !== true)
        const filteredDataSelected = coinData.filter(coin => coin.checked === true)
        setFilteredCoinData(filteredDataSelected.concat(filteredDataNotSelected))
        setSelectedItems(filteredDataSelected)
    }, [coinData])

    useEffect(() => {
        getSelectedItems(selectedItems)
    }, [selectedItems])


    const search = () => {
        const filter = inputRef.current.value.toLowerCase();
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

    const handleClick = (selectedCoin) => {
        if (!selectedCoin.checked) {
            setCoinData(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedCoin.id) {
                        return { ...coin, checked: true }
                    }

                    if (multiSelect) return coin
                    else return { ...coin, checked: false }
                })
            })

        } else {
            setCoinData(prev => {
                return prev.map(coin => {
                    if (coin.id === selectedCoin.id) {
                        return { ...coin, checked: false }
                    }
                    return coin
                })
            })
        }
    }

    const showHideSelect = () => {
        if (window.getComputedStyle(dropDownRef.current).display === "flex")
            dropDownRef.current.style.display = "none"
        else
            dropDownRef.current.style.display = "flex"
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (SelectBoxWrapperRef.current && !SelectBoxWrapperRef.current.contains(event.target)) {
                dropDownRef.current.style.display = "none"
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [SelectBoxWrapperRef]);

    return (
        <div
            ref={SelectBoxWrapperRef}
            className={`SelectBoxWrapper ${selectedItems.length ? "active" : ""}`}
        >
            <div
                className="selectBox"
                onClick={showHideSelect}
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
                    ref={inputRef}
                    onKeyUp={search}
                    className="inputDropDown"
                />
                <div
                    className='options'
                    ref={optionsRef}
                >
                    {
                        (filteredCoinData || coinData || []).map(coin => (
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