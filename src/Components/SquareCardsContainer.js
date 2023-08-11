import React, { useEffect } from 'react';
import SquareCard from './SquareCard';
import { useState } from 'react';
import FilterSortPopup from './FilterSortPopup';
import LocationDropdown from './LocationDropdown';
import { cardData } from './Data';

function SquareCardsContainer() {

    const calculateAverageRating = (reviewData) => {
        if (!reviewData || reviewData.length === 0) {
            return 0; // If there are no reviews or reviewData is undefined, return 0
        }
        const totalRatings = reviewData.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRatings / reviewData.length;
        return Number(averageRating.toFixed(1)); // Round to 1 decimal place
    };
    const CardData = cardData.map((card) => ({
        ...card,
        ratings: calculateAverageRating(card.reviewData),
    }));
    const locations = ['All', ...new Set(CardData.map((card) => card.Location))];
    const [filterOptions, setFilterOptions] = useState({
        distance: 'All',
        priceFrom: 0,
        priceTo: 1000,
        ratings: 'All',
        services: 'All',
        sort: 'None',
        sortOrder: 'asc',
        combos: false,
    });

    const [selectedLocation, setSelectedLocation] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const toggleFilterPopup = () => {
        setShowFilters(true);
    };
    const handleFilterApply = () => {
        handleApplyFilters();
        setShowFilters(false);
    };

    // Function to apply filters and update displayed cards
    const handleApplyFilters = () => {
        // Filter logic based on filterOptions and selectedLocation
        const filteredCards = CardData.filter((card) => {
            let showCard = true;

            // Filter based on distance
            if (filterOptions.distance !== "All") {
                const [minDistance, maxDistance] = filterOptions.distance.split("-");
                showCard =
                    showCard &&
                    parseFloat(card.distance) >= parseFloat(minDistance) &&
                    parseFloat(card.distance) < parseFloat(maxDistance);
            }

            // Filter based on price range
            if (filterOptions.priceFrom !== '' && filterOptions.priceTo !== '') {
                showCard = showCard && card.services.some((service) => {
                    return service.DiscountedPrice >= parseInt(filterOptions.priceFrom) && service.DiscountedPrice <= parseInt(filterOptions.priceTo);
                });
            }

            // Filter based on ratings
            if (filterOptions.ratings !== 'All') {
                showCard = showCard && card.ratings >= parseFloat(filterOptions.ratings);
            }

            // Filter based on services
            if (filterOptions.services !== 'All') {
                if (filterOptions.combos) {
                    showCard = showCard && card.Combos && card.Combos.some(combo => combo.ComboServices.includes(filterOptions.services));
                    showCard = showCard || (card.services && card.services.some((service) => {
                        return service.ServiceName === filterOptions.services;
                    }));
                } else {
                    showCard = showCard && card.services.some((service) => {
                        return service.ServiceName === filterOptions.services;
                    });
                }
            }


            if (selectedLocation !== 'All') {
                showCard = showCard && card.Location === selectedLocation;
            }

            return showCard;
        });

        if (filterOptions.sort === 'distance') {
            filteredCards.sort((a, b) => {
                const distA = parseFloat(a.distance);
                const distB = parseFloat(b.distance);
                return filterOptions.sortOrder === 'asc' ? distA - distB : distB - distA;
            });
        } else if (filterOptions.sort === 'ratings') {
            filteredCards.sort((a, b) => {
                const ratingsA = parseFloat(a.ratings);
                const ratingsB = parseFloat(b.ratings);
                return filterOptions.sortOrder === 'asc' ? ratingsA - ratingsB : ratingsB - ratingsA;
            });
        } else if (filterOptions.sort === 'price') {
            filteredCards.sort((a, b) => {
                const priceA = Math.min(...a.services.map(service => service.DiscountedPrice));
                const priceB = Math.min(...b.services.map(service => service.DiscountedPrice));
                return filterOptions.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            });
        }
        setFilteredCards(filteredCards);
    };
    const [filteredCards, setFilteredCards] = useState(CardData);

    const handleLocationChange = (location) => {
        setSelectedLocation(location);
    };

    useEffect(() => {
        handleApplyFilters();
    }, [selectedLocation]);

    const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

    function getCardsPerPage() {
        if (window.innerWidth < 980) {
            return 4;
        }
        else if (window.innerWidth >= 980 && window.innerWidth < 1024) {
            return 9;
        }
        else {
            return 12;
        }
    }

    useEffect(() => {
        function handleResize() {
            setCardsPerPage(getCardsPerPage());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const allCards = [...filteredCards];

    const [currentPage, setCurrentPage] = React.useState(1);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = allCards.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(allCards.length / cardsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className='upnav' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "0vw 10vw", marginTop: "10px" }}>
                <div className="filter-sort">
                    {showFilters ? (
                        <button className='buttonapply' onClick={handleFilterApply}>Apply</button>
                    ) : (
                        <button className='buttonapply' onClick={() => setShowFilters(true)}>Filter & sort</button>
                    )}
                    {showFilters && (
                        <FilterSortPopup
                            close={() => {
                                setShowFilters(false);
                            }}
                            filterOptions={filterOptions}
                            setFilterOptions={setFilterOptions}
                            CardData={CardData}
                        />
                    )}
                </div>
                <div>
                    <LocationDropdown
                        label="Location"
                        value={selectedLocation}
                        options={locations}
                        onChange={(value) => handleLocationChange(value)}
                        searchFilter={true}
                    />
                </div>
            </div>
            <div className="square-cards-container">

                <div className="cards-wrapper">
                    {currentCards.map((card) => (
                        <div>
                            <SquareCard key={card.id} {...card} salonData={card} />
                        </div>
                    ))}
                    {Array.from({ length: cardsPerPage - currentCards.length }).map((_, index) => (
                        <div key={`empty_${index}`} className="empty-space" />
                    ))}
                </div>
                <div className="pagination">
                    <button className='navbutton' onClick={handlePrevPage} disabled={currentPage === 1}>
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'pagebutton active' : 'pagebutton'}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button className='navbutton' onClick={handleNextPage} disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                </div>
            </div>
        </>
    );
}

export default SquareCardsContainer;
