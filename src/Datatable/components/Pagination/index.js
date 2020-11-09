import React from 'react'
import styles from './styles.module.css'
export const Pagination = () => {
    return (
        <div className={styles.dtPagination}>
            <div className={styles.paginationNumbers}>
                <button className={styles.paginationNumber}>
                    {'<'}
                </button>
                <button className={styles.paginationNumber}>
                    1
                </button>
                <button className={styles.paginationNumber}>
                    2
                </button>
                <button className={styles.paginationNumber}>
                    {'>'}
                </button>
            </div>
        </div>
    )
}
