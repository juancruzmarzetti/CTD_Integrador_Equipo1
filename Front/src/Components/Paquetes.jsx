import React, { useContext, useEffect, useState } from 'react';
import { productos } from '../utils/products'; 
import customCss from "./Paquetes.module.css";
import { useNavigate } from 'react-router-dom';
import { BotonContext } from '../Context/Context';
import Swal from 'sweetalert2';

const Paquetes = () => {
  const { prods, updateProd, deleteProd, getProds } = useContext(BotonContext);
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [visibleMenuCaract, setVisibleMenuCaract] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [refreshKey, setRefreshKey] = useState(0); // estado para forzar render despues de eliminar un producto
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteProd(id);
    setRefreshKey(prevKey => prevKey + 1);
  };

  const toggleMenu = (productId) => {
    if (visibleMenu === productId) {
      setVisibleMenu(null);
      setVisibleMenuCaract(null);
    } else {
      setVisibleMenu(productId);
      setVisibleMenuCaract(null); // Asegúrate de cerrar el menú de categorías cuando se abra el menú principal
    }
  };

  const toggleMenuCaract = (productId) => {
    if (visibleMenuCaract === productId) {
      setVisibleMenuCaract(null);
    } else {
      setVisibleMenu(productId);
      setVisibleMenuCaract(productId);
    }
  };

  useEffect(() => {
    const initialCategories = {};
    let handledCategory = "";

    prods.forEach(p => {
      if(p.category == "SALUD_Y_BELLEZA"){
        handledCategory = "Salud/Belleza";
      }else if(p.category == "MASCOTAS"){
        handledCategory = "Mascotas";
      }else if(p.category == "OFICINA"){
        handledCategory = "Oficina";
      }else if(p.category == "ALIMENTOS"){
        handledCategory = "Alimentos";
      };

      initialCategories[p.id] = handledCategory;
    });
    setSelectedCategories(initialCategories);
  }, [prods])

  useEffect(() => {
    getProds();
  }, [])
  

  const updateCategory = (prodId) => {
    const findedProd = prods.find(p => p.id === prodId);
    let categoryUpdate = "";

    if(selectedCategories[prodId] == "Salud/Belleza"){
      categoryUpdate = "SALUD_Y_BELLEZA";
    }else if(selectedCategories[prodId] == "Mascotas"){
      categoryUpdate = "MASCOTAS";
    }else if(selectedCategories[prodId] == "Oficina"){
      categoryUpdate = "OFICINA";
    }else if(selectedCategories[prodId] == "Alimentos"){
      categoryUpdate = "ALIMENTOS";
    };

    const prodUpdate = {...findedProd, category: categoryUpdate};
    updateProd(prodUpdate);
  }

  const handleCategoryChange = (productId, category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [productId]: category,
    }));
  };

  return (
    <div className={customCss.padreProds}>
      <div className={customCss.headerProds}>
        <h2>Productos</h2>
        <button className={customCss.añadirProd}><a href="/addProd">Agregar Producto</a></button>
      </div>
      <table className={customCss.tableHeader}>
        <thead>
          <tr className={customCss.headerTitles}>
            <th></th>
            <th>PRODUCTO</th>
            <th></th>
            <th>PRECIO</th>
            <th style={{ textAlign: "center"}}>CATEGORÍA</th>
            <th>ID</th>
            <th>CANTIDAD IMAGENES</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prods.map(producto => (
            <tr key={producto.id} className={customCss.trListado}>
              <td>
                <img src={producto.images[0]} alt={producto.name} style={{ width: '60px', marginRight: '10px' }} />
              </td>
              <td>{producto.name}</td>
              <td className={customCss.letraVer}>${producto.price.toLocaleString('es-AR')}</td>
              <td>{producto.category}</td>
              <td>{producto.id}</td>
              <td>{producto.images.length}</td>
              <td>
                <div className={customCss.actionMenu} onClick={() => toggleMenu(producto.id)}>
                  &#9776;
                  {visibleMenu === producto.id && (
                    <div className={customCss.actionDropdown}>
                      <a className={customCss.editar} onClick={() => navigate(`/admin/edit/product/${producto.id}`)}><img src="./iEdit.png" alt="icon-edit" />Editar</a>
                      <a href="#" className={customCss.editar} onClick={(e) => {
                          e.stopPropagation();
                          toggleMenuCaract(producto.id);
                        }}><img src="./iCategories.png" alt="icon-categories" />Categorias</a>
                      <a href="#" className={customCss.eliminar} onClick={(e) => {
  e.preventDefault(); // Evita la recarga de la página
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, cancelar',
    customClass: {
      title: 'swal2-title-custom',     // Clase personalizada para el título
      content: 'swal2-text-custom',    // Clase personalizada para el contenido
      confirmButton: 'swal2-button-custom', // Clase personalizada para el botón de confirmación
      cancelButton: 'swal2-button-custom'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(producto.id);  // Llama a la función de eliminar
      Swal.fire({
        tittle: 'Eliminado',
        content: 'El producto ha sido eliminado correctamente.',
        confirmButton: 'success',
        customClass: {
          title: 'swal2-title-custom',
          content: 'swal2-text-custom',
          confirmButton: 'swal2-button-custom'
        }
      }).then(() => {
        window.location.reload();
      });
    }
  });
}}>
  <img src="./iDelete.png" alt="icon-Delete" />Eliminar
</a>
                    </div>
                  )}
                </div>
              </td>
              {visibleMenuCaract === producto.id && (
                      <td className={customCss.dropdownRow}>
                        <div className={customCss.divCaracteristicas}>
                          <p>Categoría:</p>
                          <div className={customCss.caracteristicas}>
                            {['Salud/Belleza', 'Mascotas', 'Oficina', 'Alimentos'].map((category) => (
                              <label key={category}>
                                <input
                                  type="radio"
                                  name={`categoria-${producto.id}`}
                                  value={category}
                                  checked={selectedCategories[producto.id] == category}
                                  onChange={() => handleCategoryChange(producto.id, category)}
                                />
                                <div>
                                  <div className={customCss.customRadio} style={{color: "green"}}>   
                                    {selectedCategories[producto.id] === category && "✓"}                                 
                                  </div>
                                </div>
                                <text>
                                  {category}
                                </text>
                              </label>
                            ))}
                          </div>
                          <div className={customCss.saveBtnDiv}>
                            <button
                              className={customCss.btnVer}
                              onClick={() => updateCategory(producto.id)}
                              style={{
                                margin: 5,
                                width: "100px",
                              }}>Guardar
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className={customCss.btnVer}>Ver más</button>
    </div>
  );
};

export default Paquetes;