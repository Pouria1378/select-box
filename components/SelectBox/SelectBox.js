import React, { useEffect, useRef, useState } from 'react'

const SelectBox = ({
    data = [],
    multiSelect = true,
    getSelectedItems = () => { },
    title = "select"
}) => {
    const ref = useRef(null);

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
        const input = document.getElementById("input");
        const filter = input.value.toLowerCase();
        const div = document.getElementById("SelectBox");
        const a = div.getElementsByTagName("span");
        let txtValue
        for (let i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }

    useEffect(() => {
        // console.log('====================================');
        // console.log("coinData", coinData);
        // console.log('====================================');
    }, [coinData])

    const handleClick = (selectedCoin) => {
        // console.log('====================================');
        // console.log("selectedCoin", selectedCoin);
        // console.log('====================================');
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
        const selectBox = document.getElementById("SelectBox")
        if (window.getComputedStyle(selectBox).display === "flex")
            selectBox.style.display = "none"
        else
            selectBox.style.display = "flex"
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                document.getElementById("SelectBox").style.display = "none"
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div
            id='SelectBoxWrapper'
            ref={ref}
            className={`${selectedItems.length ? "active" : ""}`}
        >
            <div
                className="dropDown"
                onClick={showHideSelect}
            >
                {title}
                <div className='row'>
                    <span className='selectedBoxCount'>
                        {selectedItems.length || ""}
                    </span>
                    <span className='dropDownIcon' />
                </div>
            </div>
            <div
                id="SelectBox"
                className="selectBox"
            >
                <input
                    type="text"
                    placeholder="Search "
                    id="input"
                    onKeyUp={search}
                    className="inputSelectBox"
                />
                <div className='options'>
                    {
                        (filteredCoinData || coinData || []).map(coin => (
                            <span
                                key={coin.id}
                                onClick={() => handleClick(coin)}
                            >
                                <input
                                    type="checkbox"
                                    checked={coin.checked}
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

export default SelectBox