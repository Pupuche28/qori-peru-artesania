document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const renderCart = () => {
        const cartItemsContainer = document.getElementById('cart-items');
        const orderSummaryContainer = document.getElementById('order-summary');
        const orderTotalContainer = document.getElementById('order-total');
        let orderTotal = 0;

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            cartItems.forEach((item, index) => {
                orderTotal += item.price * item.quantity;

                const cartItem = document.createElement('tr');
                cartItem.innerHTML = `
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded-start" style="width: 50px; height: 50px;">
                            <div class="ms-3">
                                <h5 class="mb-0 fw-bold">${item.name}</h5>
                                <h6 class="mb-0">${item.subname}</h6>
                            </div>
                        </div>
                    </td>
                    <td>S/${item.price}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-light btn-sm decrease-quantity" data-index="${index}">-</button>
                            <input type="text" value="${item.quantity}" class="form-control text-center mx-2" style="width: 50px;" disabled>
                            <button class="btn btn-light btn-sm increase-quantity" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td>S/${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-light btn-sm remove-from-cart" data-index="${index}">x</button>
                    </td>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        if (orderSummaryContainer) {
            orderSummaryContainer.innerHTML = '';
            cartItems.forEach(item => {
                const summaryItem = document.createElement('div');
                summaryItem.classList.add('d-flex', 'justify-content-between');
                summaryItem.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>S/${(item.price * item.quantity).toFixed(2)}</span>
                `;
                orderSummaryContainer.appendChild(summaryItem);
            });

            if (orderTotalContainer) {
                orderTotalContainer.textContent = `S/${orderTotal.toFixed(2)}`;
            }
        }
    };

    const updateCart = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    };

    const showToast = (message) => {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast', 'align-items-center', 'text-white', 'bg-success', 'border-0');
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex" style="background-color: #FBD88F;">
                <div class="toast-body" style="color: black;">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-dark me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        toastContainer.appendChild(toast);
        const bootstrapToast = new bootstrap.Toast(toast);
        bootstrapToast.show();

        // Remove the toast after it hides
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    };

    renderCart();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const id = card.getAttribute('data-id') || card.querySelector('.product-name').textContent;
            const name = card.querySelector('.product-name').textContent;
            const subname = card.querySelector('.product-subname').textContent;
            const price = parseFloat(card.querySelector('.product-price').textContent.replace('S/', ''));
            const image = card.querySelector('.product-image').getAttribute('src');
            const existingItemIndex = cartItems.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].quantity += 1;
            } else {
                const product = { id, name, subname, price, image, quantity: 1 };
                cartItems.push(product);
            }

            updateCart();
            showToast(`${name} agregado al carrito`);
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const index = e.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            updateCart();
        }

        if (e.target.classList.contains('increase-quantity')) {
            const index = e.target.getAttribute('data-index');
            cartItems[index].quantity += 1;
            updateCart();
        }

        if (e.target.classList.contains('decrease-quantity')) {
            const index = e.target.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
                updateCart();
            } else {
                cartItems.splice(index, 1);
                updateCart();
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const renderCart = () => {
        const orderSummaryContainer = document.getElementById('order-summary');
        const orderTotalContainer = document.getElementById('order-total');
        let orderTotal = 0;

        if (orderSummaryContainer) {
            orderSummaryContainer.innerHTML = '';
            cartItems.forEach(item => {
                orderTotal += item.price * item.quantity;

                const summaryItem = document.createElement('div');
                summaryItem.classList.add('d-flex', 'justify-content-between');
                summaryItem.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>S/${(item.price * item.quantity).toFixed(2)}</span>
                `;
                orderSummaryContainer.appendChild(summaryItem);
            });

            if (orderTotalContainer) {
                orderTotalContainer.textContent = `S/${orderTotal.toFixed(2)}`;
            }
        }
    };

    const updateCart = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    };

    renderCart();
    
    document.getElementById('pay-button').addEventListener('click', () => {
        alert('Compra completada');
        localStorage.removeItem('cartItems');
    });
});