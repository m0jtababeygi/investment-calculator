
import './ResultsTable.css';

const ResultsTable = ( props ) => {
    return (
        <table className="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Invested Capital</th>
                    {/* <th>Total Interest</th> */}
                </tr>
            </thead>
            <tbody>
                {props.table.length > 0 ? (
                    props.table.map((data) => (
                        <tr key={data.year}>
                            <td>{data.year}</td>
                            <td>{data.savingsEndOfYear.toFixed(2)}</td>
                            <td>{data.yearlyInterest.toFixed(2)}</td>
                            <td> {data.yearlyContribution} </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan="4">No data available</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default ResultsTable;