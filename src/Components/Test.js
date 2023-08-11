// Test.js
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Test = ({ data }) => {
    const [cardsPerPage, setCardsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const updateCardsPerPage = () => {
            const screenWidth = window.innerWidth;
            const columnsPerRow = Math.floor(screenWidth / 350);
            const rowsPerCard = Math.floor(window.innerHeight / 250);
            setCardsPerPage(columnsPerRow * rowsPerCard);
        };

        updateCardsPerPage();

        window.addEventListener('resize', updateCardsPerPage);
        return () => window.removeEventListener('resize', updateCardsPerPage);
    }, []);

    const totalPages = Math.ceil(data.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

    const numEmptyCells = cardsPerPage - currentCards.length;

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <div style={styles.gridContainer}>
                {currentCards.map((card) => (
                    <div key={card.id} style={styles.gridItem}>
                        <Card {...card} />
                    </div>
                ))}
                {Array.from({ length: numEmptyCells }, (_, index) => (
                    <div key={`empty-${index}`} style={styles.gridItem}></div>
                ))}
            </div>

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
        gridGap: '10px',
    },


    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
};

export default Test;
