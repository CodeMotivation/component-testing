import React from 'react'
import styles from './styles.module.css'

export const Dashboard = ({onSearchChange,onRowCountChange,onUpdate,onSplitPayment}) => {
    return (
        <div className={styles.dtDashboard}>
            <div>
                <input className={styles.dtDashboardSearchInput} onChange={(e)=>{onSearchChange(e)}}  type='text' placeholder='search...'></input>
            </div>
            <div>
            <span>rows count &nbsp;</span>
            <select onChange={(e)=>{onRowCountChange(e)}}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            </div>
            <div>
                <button onClick={(e)=>{onUpdate(e)}}>Refresh</button>
            </div>
            <div>
                <button onClick={(e)=>onSplitPayment(e)}>+ Split payment</button>
            </div>
        </div>
    )
}
