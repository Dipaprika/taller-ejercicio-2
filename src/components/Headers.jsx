import { useState } from 'react';

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  }) => {
    
  const [active, setActive] = useState(false);
  
  const onDeleteProduct = product => {
    const results = allProducts.filter(
      item => item.id !== product.id
    );
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const onRemoveProduct = product => {    
    if (allProducts.find(item => item.id === product.id)) {            

      let products = allProducts.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );     
      
      products = products.filter(item => item.quantity > 0);

      setTotal(total - (product.price * 1));
      setCountProducts(countProducts - 1); 
      
      console.log(products);

      return setAllProducts([...products]);
    }

    setTotal(total + product.price * 1);
    setCountProducts(countProducts + 1);
    setAllProducts([...allProducts, product]);
  };

  const onAddProduct = product => {
    if (allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.price * 1);
      setCountProducts(countProducts + 1);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price * 1);
    setCountProducts(countProducts + 1);
    setAllProducts([...allProducts, product]);
  };

  return (
    <header>
      <div className='container'>
        <h1>Himalaya</h1>
        <div className='container-icon'>
          <div
            className='container-cart-icon'
            onClick={() => setActive(!active)}
          >          
          <svg className="icon-cart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
          <div className='count-products'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>
        <div
          className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {allProducts.length ? (
            <>
              <div className='row-product'>
                {allProducts.map(product => (
                  <div className='cart-product' key={product.id}>
                    <div className='info-cart-product'>                      
                      <figure className='imagen-product'>
                        <img src={product.urlImage} alt={product.title}/>
                      </figure>
                      <div className='box'>
                        <p
                          className='titulo-producto-carrito'>
                          {product.title}
                        </p>
                        <div className='flex'>
                          <span
                            className='precio-producto-carrito'>
                            ${product.price}
                          </span>
                          <div className='quantity'>
                            <button type='button' onClick={() => onRemoveProduct(product)}>-</button>
                            <span className='cantidad-producto-carrito'>{product.quantity}</span>
                            <button type='button' onClick={() => onAddProduct(product)}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>                    
                    <svg className="icon-close" onClick={() => onDeleteProduct(product)} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"/></svg>
                  </div>
                ))}
              </div>
              <div className='cart-total'>
                <h3>Total:</h3>
                <span className='total-pagar'>${total}</span>
              </div>
              <div className='cart-total'>
                <button className='btn-clear-all' onClick={onCleanCart}>
                  Vaciar Carrito
                </button>
                </div>
            </>
          ) : (
            <p className='cart-empty'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </div>
  </header>
  );
}