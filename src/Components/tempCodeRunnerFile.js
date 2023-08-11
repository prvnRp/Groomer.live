// Test.js
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Test = ({ data }) => {
    const [cardsPerPage, setCardsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const updateCardsPerPage = () => {
            const screenWidth = window.innerWidth;
            // Calculate the number of columns per row based on the screen size
            const columnsPerRow = Math.floor(screenWidth / 300); // Assuming each card has a width of 300px
            // Calculate the number of rows per card based on the screen size
            const rowsPerCard = Math.floor(window.innerHeight / 300); // Assuming each card has a height of 300px
            setCardsPerPage(columnsPerRow * rowsPerCard);
        };

        updateCardsPerPage();

        // Update cards per page when the window is resized
        window.addEventListener('resize', updateCardsPerPage);
        return () => window.removeEventListener('resize', updateCardsPerPage);
    }, []);

    // Pagination logic to slice the cards array into pages
    const totalPages = Math.ceil(data.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

    // Calculate the number of empty cells needed in the last row
    const numEmptyCells = cardsPerPage - currentCards.length;

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            {/* Render the cards for the current page */}
            <div style={styles.gridContainer}>
                {currentCards.map((card) => (
                    <div key={card.id} style={styles.gridItem}>
                        <Card {...card} />
                    </div>
                ))}
                {/* Add empty grid items for the remaining cells in the row */}
                {Array.from({ length: numEmptyCells }, (_, index) => (
                    <div key={`empty-${index}`} style={styles.gridItem}></div>
                ))}
            </div>

            {/* Pagination controls */}
            <div style={styles.paginationContainer}>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: '20px',
    },

    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
};

export default Test;
