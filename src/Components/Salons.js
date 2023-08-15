// App.js
import React from 'react';
import TopImageWithText from './TopImageWithText';
import SquareCardsContainer from './SquareCardsContainer';
import Footer from './Footer';

function App() {
    return (
        <div className="app">
            <TopImageWithText />
            <SquareCardsContainer />
            <Footer />
        </div>
    );
}

export default App;
