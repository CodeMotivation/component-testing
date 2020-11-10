import React from 'react'
import styles from './styles.module.css'

export const Dashboard = ({onSearchChange,onRowCountChange,onUpdate}) => {
    return (
        <div className={styles.dtDashboard}>
            <div>
                <input className={styles.dtDashboardSearchInput} onChange={(e)=>{onSearchChange(e)}}  type='text' placeholder='search...'></input>
            </div>
            <div>
            <span>rows count &nbsp;</span>
            <select onChange={(e)=>{onRowCountChange(e)}}>
                <option value="1">10</option>
                <option value="2">20</option>
                <option value="3">50</option>
                <option value="10">100</option>
            </select>
            </div>
            <div>
                <button onClick={(e)=>{onUpdate(e)}}>Refresh</button>
            </div>
            <div>
                <button>+ Split payment</button>
            </div>
        </div>
    )
}
