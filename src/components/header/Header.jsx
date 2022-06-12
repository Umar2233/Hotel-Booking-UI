import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { DateRange } from 'react-date-range';
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {

    const [openDate, setOpenDate] = useState(false)

    const [openOptions, setOpenOptions] = useState(false)

    const [destination, setDestination] = useState('');

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleSearch = () => {
        navigate('/hotels', {state: {destination, date, options}})
    }

    const navigate = useNavigate()

    return (
        <div className="header" >
            <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rental</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxis</span>
                    </div>
                </div>
                {type !== 'list' &&
                    <>
                        <h1 className="headerTitle">A Lifetime of Discounts? it's Genius.</h1>
                        <p className="headerDesc">Get rewarded for your travels - unlock istant saving of 10% or more with a free lamabooking account</p>
                        <button className="headerBtn">Sign In / Register</button>
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                                <input type="text" placeholder="where are you going?" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)} />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendar} className='headerIcon' />
                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText" >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className='date'
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                                <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)} >{`${options.adult} Adult - ${options.children} Children - ${options.room} Room`}</span>
                                {openOptions && <div className="options">
                                    <div className="optionsItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")} >-</button>
                                            <span className="optionCounterNumber">{`${options.adult}`}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("adult", "i")} >+</button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.children <= 0} onClick={() => handleOption("children", "d")} >-</button>
                                            <span className="optionCounterNumber">{`${options.children}`}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("children", "i")} >+</button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.room <= 1} onClick={() => handleOption("room", "d")} >-</button>
                                            <span className="optionCounterNumber">{`${options.room}`}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("room", "i")} >+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch} >Search</button>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Header