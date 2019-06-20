import React, {useState} from 'react';

const App = () => {
    const [number, setNumber] = useState(0);
    return <div>
        <button onClick={()=> setNumber(number+1)}>Click me</button>
        <span>This is my new App. You clicked {number} times</span>
    </div>;
};

export default App;