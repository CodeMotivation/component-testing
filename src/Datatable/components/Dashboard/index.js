import React from 'react'
import styles from './styles.module.css'

export const Dashboard = ({onSearchChange,onRowCountChange}) => {
    return (
        <div className={styles.dtDashboard}>
            <div>
                <input onChange={(e)=>{onSearchChange(e)}}  type='text' placeholder='search...'></input>
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
                <button>Refresh</button>
            </div>
            <div>
                <button>+ Split payment</button>
            </div>
        </div>
    )
}
