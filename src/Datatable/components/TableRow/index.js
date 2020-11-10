import React from 'react'
import styles from './styles.module.css'

export const TableRow = ({item,onEdit,onCancel}) => {
    return (
        <tr className={styles.dtTableRow}>
            <td>{item['Order Date']}</td>
            <td>{item['Name']}</td>
            <td>{item['Status']}</td>
            <td>{item['Paid Account']}</td>
            <td>{item['Type']}</td>
            <td>{item['Email']}</td>
            <td>{item['Deadline']}</td>
            <td>
                <div className={styles.dtActions}>
                    <button className={styles.dtActionEdit} onClick={()=>{onEdit(item.id)}}>Edit</button>
                    <button className={styles.dtActionCancel} onClick={()=>{onCancel(item.id)}}>Cancel</button>
                </div>
            </td>
        </tr>
    )
}
