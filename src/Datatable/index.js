import React, { useState, useEffect } from 'react'
import { Dashboard } from './components/Dashboard';
import { Pagination } from './components/Pagination';
import { TableRow } from './components/TableRow';
import styles from './styles.module.css'

export const Datatable
 = ({data}) => {
     //constructor
     const initialDataset = data.map(item=>{
         return {
             'id':item.id,
             'Order Date':item.created_at,
             'Name': item.name,
             'Status':item.status,
             'Paid Account':' 20 USD',
             'Type':'Multiple Payment',
             'Email': item.email,
             'Deadline': item.created_at,
         }
     });

     //hooks
     const [dataSet, setDataSet] = useState(initialDataset) //dataset que se muestra en el componente
     const [searchFilteredDataset, setsearchFilteredDataset] = useState(initialDataset) //dataset que resulta del filtro por texto
     const [filterChanges, setFilterChanges] = useState({text:false,sort:false,rows:false});
     const [searchFilter, setSearchFilter] = useState('') //estado del filtro por texto
     const [filters, setFilters] = useState({maximunRows:10,sortColumn:'',sortOrder:'',page:1}) //filtros especificos
    

     //effects
         //when filterChanges change
    useEffect(() => {       
        if(filterChanges.rows||filterChanges.sort||filterChanges.text){
             dataSetEffects(searchFilteredDataset); 
        }
     }, [filterChanges])
     //when search field changes
     useEffect(() => {
        setFilterChanges({...filterChanges, text:true});
    }, [searchFilter])
    //when row filters changes
    useEffect(() => {
        setFilterChanges({...filterChanges, rows:true});
    }, [filters.maximunRows,filters.page])
    //when sort changes
    useEffect(() => {
        setFilterChanges({...filterChanges, sort:true});
    }, [filters.sortColumn,filters.sortOrder])
     
     //events
     const onSearchChange = (e)=>{
        setSearchFilter(e.target.value);      
    }
    const onRowCountChange = (e)=>{
        const count = parseInt(e.target.value)
        if(typeof count === 'number') setFilters({...filters,maximunRows:count})
    }
    const onPaginationChange = (e)=>{
        const pageText = e.target.innerText;
        const page = parseInt(pageText);
        const maxpage = Math.ceil(searchFilteredDataset.length/filters.maximunRows);
        if(!(page!==page)) setFilters({...filters,page:page})
        else {
            let p=filters.page;;
            switch(pageText){
                case '<':
                    setFilters({...filters,page:(p>1?(p-1):1)})
                    break;
                case '>':      
                    setFilters({...filters,page:(p<maxpage?(p+1):maxpage)})
                    break;
                case '<<':
                    setFilters({...filters,page:1})
                    break;
                case '>>':
                    setFilters({...filters,page:maxpage})
                    break;
            }
            console.log(filters.page);
        }
    }
    const onSortChanged = (_column)=>{
        const currentColumn = filters.sortColumn
        const currentOrder = filters.sortOrder
        if(currentColumn === _column) setFilters({...filters,sortOrder:currentOrder=='ASC'?'DES':'ASC'})
        else setFilters({...filters,sortColumn:_column,sortOrder:'ASC'})
    }

     //methods
    const dataSetEffects = (inputDataSet)=>{
        const _filterChanges = {...filterChanges}
            //si hubo un cambio en el filtro de texto, filtrar la data
            if(filterChanges.text){
                inputDataSet = rowSearchUpdate(initialDataset);
                setsearchFilteredDataset(inputDataSet);
                _filterChanges.text=false;
            }
            //si hubo un cambio en el orden filtrar el orden
            if(filterChanges.sort||filterChanges.text){
                inputDataSet = rowSortUpdate(inputDataSet);
                setsearchFilteredDataset(inputDataSet);
                _filterChanges.sort=false;
            }
            //si hubo cambios en la paginación cortar lo seleccionado
            if(filterChanges.rows||filterChanges.sort||filterChanges.text){
                const pages = paginationFixer(inputDataSet)
                inputDataSet = rowCountUpdate(inputDataSet,pages);
                _filterChanges.rows=false;
            }
            setFilterChanges(_filterChanges)
            setDataSet(inputDataSet);
    }
    const rowSearchUpdate = (_dataset)=>{
        const filterText = searchFilter;
        if(filterText!==''){
            const newDataset = _dataset.filter(item=>{
                return item['Name'].includes(filterText) ||
                       item['Email'].includes(filterText) ||
                       item['Deadline'].includes(filterText) ||
                       item['Order Date'].includes(filterText)
            });
            return newDataset;
         }else{
             return _dataset
         }
    }
    const rowCountUpdate = (_dataset,page)=>{
        const start = 0+((page-1)*filters.maximunRows);
        const end = start + filters.maximunRows;
        return _dataset.slice(start,end);
    }
    const rowSortUpdate = (_dataset)=>{
        const comparison = filters.sortOrder === 'DES'?
        (a,b)=>{return a[filters.sortColumn] > b[filters.sortColumn]}:
        (a,b)=>{return a[filters.sortColumn] < b[filters.sortColumn]}
        return _dataset.sort((a,b)=>{
            return comparison(a,b)?-1
            : a[filters.sortColumn] == b[filters.sortColumn]?0:1
        })
    }
    const paginationFixer = (_dataset)=>{
        const count = _dataset.length
        const res = count/filters.maximunRows;
        return res<=1?1:filters.page;
    }

      //TODO:eliminar estos solo son de prueba
    const onEdit = (item)=>{
        console.log('edit ' + item)
    }
    const onCancel = (item)=>{
        console.log('cancel ' + item)
    }
    const onUpdate = (item)=>{
        console.log('update')
    }
    const onSplitPayment = ()=>{
        console.log('split payment clicked');
    }

    return (
            <div className={styles.dtBase}>   
                <Dashboard 
                    onSearchChange={onSearchChange} 
                    onRowCountChange={onRowCountChange} 
                    onUpdate={onUpdate}
                    onSplitPayment={onSplitPayment}
                />
                <div className={styles.tableContainer}>
                    <table className={styles.dtTable}>
                        {/* header section */}
                        <thead>
                            <tr className={styles.dtHeader}>
                                <th><a href='#' onClick={()=>onSortChanged('Order Date')}>
                                            {filters.sortColumn ==='Order Date'?<span 
                                            className={`${styles.dtSortArrow}
                                            ${filters.sortOrder==='DES'?styles.dtSortArrowDown:''}`}>^</span>:''} 
                                        &nbsp; {'Order Date'}
                                </a>
                            </th>
                                <th>
                                    <a href='#' onClick={()=>onSortChanged('Name')}>
                                            {filters.sortColumn ==='Name'?<span 
                                            className={`${styles.dtSortArrow}
                                            ${filters.sortOrder==='DES'?styles.dtSortArrowDown:''}`}>^</span>:''} 
                                        &nbsp; {'Name'}
                                    </a>
                                </th>
                                <th>
                                    <a href='#' onClick={()=>onSortChanged('Status')}>
                                            {filters.sortColumn ==='Status'?<span 
                                            className={`${styles.dtSortArrow}
                                            ${filters.sortOrder==='DES'?styles.dtSortArrowDown:''}`}>^</span>:''} 
                                        &nbsp; {'Status'}
                                    </a>
                                </th>
                                <th>
                                    <a href='#' onClick={()=>onSortChanged('Paid Account')}>
                                            {filters.sortColumn ==='Paid Account'?<span 
                                            className={`${styles.dtSortArrow}
                                            ${filters.sortOrder==='DES'?styles.dtSortArrowDown:''}`}>^</span>:''} 
                                        &nbsp; {'Paid Account'}
                                    </a>
                                </th>
                                <th>
                                    <a href='#' onClick={()=>onSortChanged('Type')}>
                                            {filters.sortColumn ==='Type'?<span 
                                            className={`${styles.dtSortArrow}
                                            ${filters.sortOrder==='DES'?styles.dtSortArrowDown:''}`}>^</span>:''} 
                                        &nbsp; {'Type'}
                                    </a>
                                </th>
                                <th>
                                    <a href='#' onClick={()=>onSortChanged('Email')}>
                                            {filters.sortColumn ==='Email'?<span 
                                            className={`${styles.dtSortArrow}
                                            ${filters.sortOrder==='DES'?styles.dtSortArrowDown:''}`}>^</span>:''} 
                                        &nbsp; {'Email'}
                                    </a>
                                </th>
                                <th>
                                    <a href='#' onClick={()=>onSortChanged('Deadline')}>
                                            {filters.sortColumn ==='Deadline'?<span 
                                            className={`${styles.dtSortArrow}
                                            ${filters.sortOrder==='DES'?styles.dtSortArrowDown:''}`}>^</span>:''} 
                                        &nbsp; {'Deadline'}
                                    </a>
                                </th>
                                <th><div>{'Actions'}</div></th>
                            </tr>
                        </thead>
                        {/* body section */}
                        <tbody>
                        {dataSet.map((item,i)=>{
                            return (
                                <TableRow 
                                key={i} item={item} 
                                onCancel={onCancel} 
                                onEdit={onEdit}
                                />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination 
                    selectedPage = {filters.page}
                    count = {searchFilteredDataset.length} 
                    maximunRows={filters.maximunRows} 
                    onPaginationChange={onPaginationChange} 
                    />
            </div>
    )
}
