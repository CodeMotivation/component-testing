import React, { useEffect } from 'react'
import styles from './styles.module.css'
export const Pagination = ({count,maximunRows,onPaginationChange,selectedPage}) => {
    let pages = []
    const paginationInitializer = ()=>{
        pages = []
        let pagesToPrint = count;
        let pagesCounter = 1;
        while(pagesToPrint>0){
            pages.push(
            <button 
            key={pagesCounter}
                className={`${styles.dtPaginationNumber} ${selectedPage===pagesCounter?styles.dtPaginationSelectedNumber:''}`}
                onClick={(e)=>{onPaginationChange(e)}}
                >
                {pagesCounter}
            </button>
            )
                pagesToPrint-=maximunRows;
                pagesCounter++;
        }
    }
    paginationInitializer()
    useEffect(() => {
        paginationInitializer()
    }, [count,maximunRows])
    

    return (
        <div className={styles.dtPagination}>
            <div className={styles.dtPaginationNumbers}>
                <button 
                onClick={(e)=>{onPaginationChange(e)}}
                className={styles.dtPaginationNumber}>
                    {'<'}
                </button>
                    {pages}
                <button 
                onClick={(e)=>{onPaginationChange(e)}}
                className={styles.dtPaginationNumber}>
                    {'>'}
                </button>
            </div>
        </div>
    )
}
