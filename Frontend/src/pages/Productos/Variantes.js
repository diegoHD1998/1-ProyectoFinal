import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import VarienteService from '../../service/ProductosService/VarianteService'
import ProductoService from '../../service/ProductosService/ProductoService'


export default function Variantes ()  {

    let emptyProduct = {
        idVariante: null,
        nombre: '',
        productoIdProducto: null
    };

    const [variantes, setVarientes] = useState(null); /* <----------------- */
    const [variante, setVariante] = useState(emptyProduct);/* <----------------- */
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    
    const [productos, setProductos] = useState([])

    const [loading, setloading] = useState(true)
    
    
    
    const varienteService = new VarienteService(); 

    useEffect(() => {
        const productoService = new ProductoService();
        productoService.readAll().then(res => {
            if(res.status >= 200 && res.status<300){
                setProductos(res.data) 
                setloading(false)
            }else{
                console.log('Error al cargar Datos de Productos')
            }

        });

        const varienteService = new VarienteService();
        varienteService.readAll().then((res) => {
            if(res.status >= 200 && res.status<300){
                setVarientes(res.data)
            }else{
                console.log('Error al cargar Datos de Variantes')
            }
            
        })

    }, []);


    const openNew = () => {
        setVariante(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const saveProduct = async() => { 
        setSubmitted(true);

        if (variante.nombre.trim() && variante.productoIdProducto != null) {
            let _variantes = [...variantes];
            let _variante = { ...variante };

            if (variante.idVariante) {
                await varienteService.update(variante)
                .then(res => {
                    if(res.status >= 200 && res.status<300){

                        const index = findIndexById(variante.idVariante);
                        _variantes[index] = _variante;
                        toast.current.show({ severity: 'success', summary: 'Operacion Exitosa', detail: 'Variante Actualizada', life: 3000 });
                        console.log(res.data)

                    }else if(res.status >= 400 && res.status<500){
                        console.log(res)
                        toast.current.show({ severity: 'error', summary: 'Operacion Fallida', detail: `${res.data}`, life: 5000 });
                    }else{
                        console.log(res)
                        toast.current.show({ severity: 'error', summary: 'Operacion Fallida', detail: `Error en Update de Variante, Status no controlado`, life: 5000 });
                    }
                    

                })
            }
            else {
                delete _variante.idVariante;
                await varienteService.create(_variante)
                .then(res => {
                    if(res.status >= 200 && res.status<300){

                        _variantes.push(res.data);
                        toast.current.show({ severity: 'success', summary: 'Operacion Exitosa', detail: 'Variante Creada', life: 3000 });
                        console.log(res.data)

                    }else if(res.status >= 400 && res.status<500){
                        console.log(res)
                        toast.current.show({ severity: 'error', summary: 'Operacion Fallida', detail: `${res.data}`, life: 5000 });
                    }else{
                        console.log(res)
                        toast.current.show({ severity: 'error', summary: 'Operacion Fallida', detail: `Error en Create Variante, Status No controlado`, life: 5000 });
                    }
                });
            }

            setVarientes(_variantes);
            setProductDialog(false);
            setVariante(emptyProduct);
        }
    }

    const editProduct = (product) => {/* <----------------- */
        setVariante({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {/* <----------------- */
        setVariante(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = async() => { 
        await varienteService.delete(variante.idVariante)
        .then(res => {

            if(res.status >= 200 && res.status < 300){

                setVarientes(variantes.filter(val => val.idVariante !== res.data))
                setDeleteProductDialog(false);
                setVariante(emptyProduct);
                toast.current.show({ severity: 'success', summary: 'Operacion Exitosa', detail: 'Variante Eliminada', life: 3000 });

            }else if(res.status >= 400 && res.status < 500){
                toast.current.show({ severity: 'error', summary: 'Operacion Fallida', detail: `${res.data}`, life: 5000 });
            }else{
                console.log(res)
                toast.current.show({ severity: 'error', summary: 'Operacion Fallida', detail: `Error en Delete Variante, Status No controlado`, life: 5000 });
            }
        });
    }

    const findIndexById = (id) => {/* <----------------- */
        let index = -1;
        for (let i = 0; i < variantes.length; i++) {
            if (variantes[i].idVariante === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const onInputChange = (e, name) => {/* <----------------- */
        const val = (e.target && e.target.value) || '';
        let _product = { ...variante };
        _product[`${name}`] = val;

        setVariante(_product);
    }
    /* console.log(zonas) */
    const ColorBodytemplate = (rowData) => {

        if(productos){

            let _producto = productos.find(val => val?.idProducto === rowData?.productoIdProducto)  // Aqui estan todos los datos producto 

            return (
                <>
                    {`${_producto?.nombre}`}
                </>
            );
        }
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }

    const header = (/* <----------------- */
        <div className="table-header">
            <h5 className="p-m-0">Administracion de Variantes</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    return (
        
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={variantes}
                        dataKey="idVariante" paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Zonas"
                        globalFilter={globalFilter} emptyMessage="Variantes No Encontradas." header={header} loading={loading}>
                        
                        <Column field="nombre" header="Nombre" sortable ></Column>
                        <Column field="productoIdProducto" header="Producto" body={ColorBodytemplate} sortable ></Column>
                        <Column body={actionBodyTemplate}></Column>

                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px'}} header="Detalle Variante " modal className="p-fluid " footer={productDialogFooter} onHide={hideDialog}>
                        
                        <div className="p-field">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText id="nombre" value={variante.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !variante.nombre })} />
                            {submitted && !variante.nombre && <small className="p-invalid">Nombre Requerido.</small>}
                        </div>

                        <div className="p-field" style={{height:'200px'}}>
                            <label htmlFor="productoIdProducto">Producto</label>
                            <Dropdown id="productoIdProducto" optionLabel="nombre" optionValue="idProducto" value={variante.productoIdProducto} options={productos} placeholder='Seleccione Producto' onChange={(e) => onInputChange(e, 'productoIdProducto')} required className={classNames({ 'p-invalid': submitted && !variante.productoIdProducto })}rows={3} cols={20} />
                            {submitted && !variante.productoIdProducto && <small className="p-invalid">Producto Requerido.</small>}
                            
                        </div>
                
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {variante && <span>Estas seguro que quieres eliminar la Variente <b>{variante.nombre}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    );
}