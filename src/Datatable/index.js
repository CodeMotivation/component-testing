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
     //when search field changes
     useEffect(() => {
        setFilterChanges({...filterChanges, text:true});
        console.log('searchfilter')
    }, [searchFilter])
    //when row filters changes
    useEffect(() => {
        setFilterChanges({...filterChanges, rows:true});
    // }, [filters.maximunRows,filters.page])
    },[])
    //when sort changes
    useEffect(() => {
        setFilterChanges({...filterChanges, sort:true});
    // }, [filters.sortColumn,filters.sortOrder])
    },[])
    //when filterChanges change
    useEffect(() => {
         dataSetEffects(searchFilteredDataset);
    //  }, [filterChanges])
     },[])
     
     //events
     const onSearchChange = (e)=>{
        setSearchFilter(e.target.value);      
    }
    const onRowCountChange = (e)=>{
        const count = e.target.value
        if(typeof count === 'number')setFilters({...filters,maximunRows:parseInt(count)})
    }
    const onPaginationChange = ()=>{

    }

     //methods
    const dataSetEffects = (inputDataSet)=>{
        const _filterChanges = filterChanges
            //si hubo un cambio en el filtro de texto, filtrar la data
            if(_filterChanges.text){
                inputDataSet = rowSearchUpdate(initialDataset);
                setSearchFilter(inputDataSet);
                _filterChanges.text=false;
            }
            //si hubo un cambio en el orden filtrar el orden
            if(_filterChanges.sort){
                inputDataSet = rowSortUpdate(inputDataSet);
                setSearchFilter(inputDataSet);
                _filterChanges.sort=false;
            }
            //si hubo cambios en la paginación cortar lo seleccionado
            if(_filterChanges.rows){
                inputDataSet = rowCountUpdate(inputDataSet);
                _filterChanges.rows=false;
            }
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
         }
    }
    const rowCountUpdate = (_dataset)=>{
        const start = 0+((filters.page-1)*filters.maximunRows);
        const end = start + filters.maximunRows;
        return _dataset.slice(start,end);
    }
    const rowSortUpdate = (_dataset)=>{
        return _dataset;
    }

      //TODO:eliminar estos solo son de prueba
    const onEdit = (item)=>{
        console.log('edit ' + item)
    }
    const onCancel = (item)=>{
        console.log('cancel ' + item)
    }


    
    
    
    
    
    
    
    
    
    
    
    //  //cada vez que se cambia el filtro por texto
    //  useEffect(() => {
    //     if(searchFilter!==''){
    //         const newDataset = initialDataset.filter(item=>{
    //             return item['Name'].includes(filterText) ||
    //                    item['Email'].includes(filterText) ||
    //                    item['Deadline'].includes(filterText) ||
    //                    item['Order Date'].includes(filterText)
    //         });
    //         setsearchFilteredDataset(newDataset);
    //      }
    // }, [searchFilter])
    // //cada vez que se termina de filtrar por texto
    //  useEffect(() => {
    //     //  const dataSetAfterSortUpdate = rowSortUpdate(dataSetAfterRowCountUpdate)
    //     const dataSetAfterRowCountUpdate = rowCountUpdate(searchFilteredDataset)
    //     setDataSet(dataSetAfterSortUpdate)
    // }, [searchFilteredDataset])


    return (
        <div className={styles.dtBase}>   
        <Dashboard onSearchChange={onSearchChange} onRowCountChange={onRowCountChange}></Dashboard>
            <table className={styles.dtTable}>
                {/* header section */}
                <thead>
                    <tr className={styles.dtHeader}>
                        <th><a href='#'>* {'Order Date'}</a></th>
                        <th><a href='#'>* {'Name'}</a></th>
                        <th><a href='#'>* {'Status'}</a></th>
                        <th><a href='#'>* {'Paid Account'}</a></th>
                        <th><a href='#'>* {'Type'}</a></th>
                        <th><a href='#'>* {'Email'}</a></th>
                        <th><a href='#'>* {'Deadline'}</a></th>
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
            <Pagination/>
        </div>
    )
}
