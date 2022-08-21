import React, { useEffect, useState } from 'react'

const SelectBox = ({
    data = [],
    multiSelect = true
}) => {

    const [selected, setSelected] = useState([])

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
        console.log('====================================');
        console.log(selected);
        console.log('====================================');
    }, [selected])

    return (
        <div>
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
                        data.map(coin => (
                            <span key={coin.id}>
                                <input
                                    onClick={(e) => {
                                        if (e.target.checked) {
                                            if (multiSelect) setSelected(prev => ([...prev, coin]))
                                            else setSelected([coin])
                                        } else {
                                            setSelected(prev => prev.filter(selected => selected.id !== coin.id))
                                        }


                                    }}
                                    type="checkbox"
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