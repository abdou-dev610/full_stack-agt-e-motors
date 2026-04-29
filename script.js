const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        if (nav) nav.classList.toggle('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        if (nav) nav.classList.remove('active');
    });
}

function addToCart(product) {
    if (!product || !product.name || !product.quantity) {
        console.error("Le produit est invalide ou incomplet :", product);
        alert("Erreur : le produit n'a pas pu être ajouté au panier.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push({ name: product.name, quantity: product.quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} a été ajouté au panier !`);
    console.log("Panier mis à jour :", cart);
}

function showCarOptions() {
    var productSelect = document.getElementById("product");
    var carGroup = document.getElementById("car-group");
    if (!productSelect || !carGroup) return;

    if (productSelect.value === "vehicules-electriques") {
        carGroup.style.display = "block";
    } else {
        carGroup.style.display = "none";
    }
}

// Gestion dynamique des options (formulaire devis)
document.addEventListener('DOMContentLoaded', function () {
    const productSelect = document.getElementById('product');
    const bornesRechargeOptions = document.getElementById('bornes-recharge-options');
    const carOptions = document.getElementById('car-options');

    if (productSelect) {
        productSelect.addEventListener('change', function () {
            if (this.value === 'bornes-recharge') {
                if (bornesRechargeOptions) bornesRechargeOptions.classList.remove('hidden');
                if (carOptions) carOptions.classList.add('hidden');
            } else if (['photovoltaïque','ee','ems','bess','agrivoltaïsme','retrofit','isolation-thermique'].includes(this.value)) {
                if (bornesRechargeOptions) bornesRechargeOptions.classList.add('hidden');
                if (carOptions) carOptions.classList.add('hidden');
            } else {
                if (bornesRechargeOptions) bornesRechargeOptions.classList.add('hidden');
                if (carOptions) carOptions.classList.remove('hidden');
            }
        });
    }

    // Menu hamburger dynamique
    const menuButton = document.getElementById('menu-button');
    const menuContent = document.getElementById('menu-content');
    const closeButton = document.getElementById('close-button');

    if (menuButton && menuContent) {
        menuButton.addEventListener('click', () => {
            menuContent.classList.toggle('active');
        });
    }
    if (closeButton && menuContent) {
        closeButton.addEventListener('click', () => {
            menuContent.classList.remove('active');
        });
    }

    // Hamburger alternatif
    const hamburger = document.querySelector('.florpex-hamburger');
    const navEl = document.querySelector('.blixor-nav');
    if (hamburger && navEl) {
        hamburger.addEventListener('click', function () {
            navEl.classList.toggle('active');
        });
    }

    // ServiceType select
    const serviceType = document.getElementById('serviceType');
    if (serviceType) {
        serviceType.addEventListener('change', function () {
            const optionsSelect = document.getElementById('options');
            if (!optionsSelect) return;
            optionsSelect.innerHTML = '';
            if (this.value === 'borne') {
                addOption(optionsSelect, 'Option 1 - Borne', 'borne1');
                addOption(optionsSelect, 'Option 2 - Borne', 'borne2');
                addOption(optionsSelect, 'Option 3 - Borne', 'borne3');
            } else if (this.value === 'vehicule') {
                addOption(optionsSelect, 'Option 1 - Véhicule', 'vehicule1');
                addOption(optionsSelect, 'Option 2 - Véhicule', 'vehicule2');
                addOption(optionsSelect, 'Option 3 - Véhicule', 'vehicule3');
            }
        });
    }
});

function addOption(selectElement, text, value) {
    const option = document.createElement('option');
    option.text = text;
    option.value = value;
    selectElement.add(option);
}

function openModal(title, mainImg, thumbs, desc) {
    const modalTitle = document.getElementById('modal-title');
    const modalMain = document.getElementById('modal-main-img');
    const modalDesc = document.getElementById('modal-desc');
    const thumbEls = [
        document.getElementById('thumb1'),
        document.getElementById('thumb2'),
        document.getElementById('thumb3'),
        document.getElementById('thumb4')
    ];

    if (!modalTitle || !modalMain || !modalDesc) return;

    modalTitle.innerText = title;
    if (mainImg) {
        modalMain.src = mainImg;
        modalMain.style.display = '';
    } else {
        modalMain.removeAttribute('src');
        modalMain.style.display = 'none';
    }

    for (let i = 0; i < thumbEls.length; i++) {
        const el = thumbEls[i];
        if (!el) continue;
        if (thumbs && thumbs[i]) {
            el.src = thumbs[i];
            el.style.display = '';
        } else {
            el.removeAttribute('src');
            el.style.display = 'none';
        }
    }

    modalDesc.innerHTML = desc || '';
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = "flex";
    makeDraggable(modalMain);
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = "none";
}

function changeMainImage(imgElement) {
    if (!imgElement || !imgElement.src) return;
    const modalMain = document.getElementById('modal-main-img');
    if (!modalMain) return;
    modalMain.src = imgElement.src;
    makeDraggable(modalMain);
}

function makeDraggable(element) {
    if (!element) return;
    let translateX = 0, translateY = 0;
    let startX = 0, startY = 0;
    let isDragging = false;

    element.style.transform = 'translate(0px, 0px)';
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        element.classList.add('dragging');
    }

    function dragTouchStart(e) {
        e = e || window.event;
        e.preventDefault();
        const touch = e.touches[0];
        isDragging = true;
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
        element.classList.add('dragging');
    }

    function elementDrag(e) {
        if (!isDragging) return;
        e = e || window.event;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    function elementTouchDrag(e) {
        if (!isDragging) return;
        e = e || window.event;
        e.preventDefault();
        const touch = e.touches[0];
        translateX = touch.clientX - startX;
        translateY = touch.clientY - startY;
        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    function closeDragElement() {
        isDragging = false;
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
        element.classList.remove('dragging');
    }
}
