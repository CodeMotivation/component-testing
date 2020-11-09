import React from 'react'
import styles from './styles.module.css'

export const TableRow = ({item,onEdit,onCancel}) => {
    return (
        <tr>
            <td>{item['Order Date']}</td>
            <td>{item['Name']}</td>
            <td>{item['Status']}</td>
            <td>{item['Paid Account']}</td>
            <td>{item['Type']}</td>
            <td>{item['Email']}</td>
            <td>{item['Deadline']}</td>
            <td>
                <div className={styles.dtActions}>
                    <button onClick={()=>{onEdit(item.id)}}>Edit</button>
                    <button onClick={()=>{onCancel(item.id)}}>Cancel</button>
                </div>
            </td>
        </tr>
    )
}
