import React, {useState , useEffect} from 'react';
import './UserInput.css';
import ResultsTable from '../ResultsTable/ResultsTable';

const UserInput = props => {
    const [formData, setFormData] = useState({
        'current-savings': 0,
        'yearly-contribution': 0,
        'expected-return': 0,
        'duration': 0
    });

    const handleChange = event => {
        const {id, value} = event.target;
        setFormData((prevData) => {
            const updatedData = { ...prevData, [id]: +value,};
            return updatedData
        });
        // setYearlyData(calc(formData));
    }

    useEffect(() => {}, [formData]);
    

    const [yearlyData, setYearlyData] = useState([]); // per-year results

    const calc = (formData) => {
        const yearlyData = [];
        let currentSavings = +formData['current-savings']; // feel free to change the shape of this input object!
        const yearlyContribution = +formData['yearly-contribution']; // as mentioned: feel free to change the shape...
        const expectedReturn = +formData['expected-return'] / 100;
        const duration = +formData['duration'];
    
        for (let i = 0; i < duration; i++) {
          const yearlyInterest = currentSavings * expectedReturn;
          currentSavings += yearlyInterest + yearlyContribution;
          yearlyData.push({
            // feel free to change the shape of the data pushed to the array!
            year: i + 1,
            yearlyInterest: yearlyInterest,
            savingsEndOfYear: currentSavings,
            yearlyContribution: yearlyContribution,
          });
    }
        return yearlyData;
    }

    useEffect(() => {setYearlyData(calc(formData))}, [formData]);


    const formSubmitHandler = event => {
        event.preventDefault();
        setYearlyData(calc(formData));
    }

    const resetForm = () => {
        setFormData({});
        setYearlyData([]);
    }

    return (
        <div>
            <form className="form" onSubmit={formSubmitHandler}>
                <div className="input-group">
                    <p>
                        <label htmlFor="current-savings">Current Savings ($)</label>
                        <input type="number" id="current-savings" value={formData['current-savings']} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                        <input type="number" id="yearly-contribution" value={formData['yearly-contribution']} onChange={handleChange} />
                    </p>
                </div>
                <div className="input-group">
                    <p>
                        <label htmlFor="expected-return">
                            Expected Interest (%, per year)
                        </label>
                        <input type="number" id="expected-return" value={formData['expected-return']} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="duration">Investment Duration (years)</label>
                        <input type="number" id="duration" value={formData['duration']} onChange={handleChange} />
                    </p>
                </div>
                <p className="actions">
                    <button type="button" className="buttonAlt" onClick={resetForm} >
                        Reset
                    </button>
                    <button type="submit" className="button">
                        Calculate
                    </button>
                </p>
            </form>
            <ResultsTable table={yearlyData} />
        </div>
    )
}

export default UserInput;