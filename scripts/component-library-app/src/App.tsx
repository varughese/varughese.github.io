import { useState } from "react";
import "./App.css";
import { Medication } from "./components/medication/Medication";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <h1>Medication</h1>
            <p>
                <Medication name="Abilify" />
                <Medication name="Lithium" />
                <Medication name="Zyprexa" />
            </p>
        </div>
    );
}

export default App;
