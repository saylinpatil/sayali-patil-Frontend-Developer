import React, { useEffect, useState, useCallback } from "react";
import '../Rockets/Rocket.css';
import RocketModal from '../Rockets/ViewRocket/ViewRocketDetails';

const Rockets = () => {
    const apiUrl = 'https://api.spacexdata.com/v4/rockets';
    const [allRockets, setAllRockets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRocket, setSelectedRocket] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('ANY');
    const [currentPage, setCurrentPage] = useState(1);
    const rocketsPerPage = 3;

    useEffect(() => {
        const fetchRocketDetails = async () => {
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setAllRockets(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRocketDetails();
    }, [apiUrl]);

    const filteredRockets = useCallback(() => {
        let searchKey = searchInput.trim().toLowerCase();

        return allRockets.filter((rocket) => {
            let rocketName = rocket.name.toLowerCase();
            let rocketType = rocket.type.toLowerCase();
            let rocketCost = rocket.cost_per_launch.toString().toLowerCase();

            return (
                rocketName.includes(searchKey) ||
                rocketType.includes(searchKey) ||
                rocketCost.includes(searchKey)
            );
        });
    }, [searchInput, allRockets]);

    const displayedRockets = filteredRockets().slice(
        (currentPage - 1) * rocketsPerPage,
        currentPage * rocketsPerPage
    );

    const handleCardClick = (rocket) => {
        setSelectedRocket(rocket);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="container mt-3 ">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fa fa-search"></i>
                            </span>
                            <select
                                onChange={handleSearchTypeChange}
                                value={searchType}
                            >
                                <option value="ANY">Any</option>
                                <option value="NAME">Name</option>
                                <option value="TYPE">Type</option>
                                <option value="COST">Cost</option>
                            </select>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Enter ${searchType.toLowerCase()}`}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                    </div>
                    {displayedRockets.length === 0 ? (
                        <div className="col-md-12 text-center mt-5">
                            <h5 className="empty-rockets-message">No rockets found. Please try a different search.</h5>
                        </div>
                    ) : (
                        displayedRockets.map((rocket) => (
                            <div className="col-md-4 my-4" key={rocket.id}>
                                <div className="card h-100" onClick={() => handleCardClick(rocket)}>
                                    <img className="card-img-top card-image" src={rocket.flickr_images[0]} alt={rocket.name} />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h3 className="card-title text-center mb-3 custom-font">{rocket.name}</h3>
                                        </div>
                                        <div className="row rocket-Info">
                                            <div className="col-sm-4">
                                                <h5>Type</h5>
                                                <p>{rocket.type}</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h5>Cost</h5>
                                                <p>${rocket.cost_per_launch}</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <h5>Active</h5>
                                                <p>{rocket.active ? `Yes` : `No`}</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-custom-color  align-self-center mt-3">
                                            View More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="custom-pagination">
                    {(() => {
                        let pageCount = Math.ceil(filteredRockets().length / rocketsPerPage);
                        let pageButtons = [];

                        for (let i = 1; i <= pageCount; i++) {
                            pageButtons.push(
                                <button key={i} onClick={() => handlePageChange(i)}>
                                    {i}
                                </button>
                            );
                        }
                        return pageButtons;
                    })()}
                </div>
            </div>
            <RocketModal show={showModal} onHide={handleCloseModal} rocket={selectedRocket} />
        </>
    );
};

export default Rockets;
