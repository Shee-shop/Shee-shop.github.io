/*
TemplateMo 559 Zay Shop
https://templatemo.com/tm-559-zay-shop
*/

'use strict';

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATSL8m7UivW2xn8BenKa9rMztfXgP4s8Y",
    authDomain: "shee-6fd47.firebaseapp.com",
    projectId: "shee-6fd47",
    storageBucket: "shee-6fd47.firebasestorage.app",
    messagingSenderId: "159095144210",
    appId: "1:159095144210:web:745e46d06ad8580d9bbdcb",
    measurementId: "G-HZ3WLXL1WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

// Wrap all code in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Existing jQuery code
    (function($) {
        // Accordion
        var all_panels = $('.templatemo-accordion > li > ul').hide();

        $('.templatemo-accordion > li > a').click(function() {
            console.log('Hello world!');
            var target =  $(this).next();
            if(!target.hasClass('active')){
                all_panels.removeClass('active').slideUp();
                target.addClass('active').slideDown();
            }
            return false;
        });
        // End accordion

        // Product detail
        $('.product-links-wap a').click(function(){
            var this_src = $(this).children('img').attr('src');
            $('#product-detail').attr('src',this_src);
            return false;
        });
        $('#btn-minus').click(function(){
            var val = $("#var-value").html();
            val = (val=='1')?val:val-1;
            $("#var-value").html(val);
            $("#product-quanity").val(val);
            return false;
        });
        $('#btn-plus').click(function(){
            var val = $("#var-value").html();
            val++;
            $("#var-value").html(val);
            $("#product-quanity").val(val);
            return false;
        });
        $('.btn-size').click(function(){
            var this_val = $(this).html();
            $("#product-size").val(this_val);
            $(".btn-size").removeClass('btn-secondary');
            $(".btn-size").addClass('btn-success');
            $(this).removeClass('btn-success');
            $(this).addClass('btn-secondary');
            return false;
        });
        // End product detail
    })(jQuery);

    // Carousel functionality
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const texts = document.querySelectorAll('.hero-text');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function goToSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        texts.forEach(text => text.classList.remove('active'));
        
        setTimeout(() => {
            texts[index].classList.add('active');
        }, 250);

        carousel.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
    }

    goToSlide(0);

    setInterval(() => goToSlide(currentIndex + 1), 3500);

    // Fetch product data from Firestore
    async function fetchProducts() {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                // You can dynamically add products to the DOM here
            });
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    }

    fetchProducts(); // Call the function to fetch products
});

const exchangeRates = {
    NGN: 1.00,    // Base currency (Nigerian Naira)
    USD:  0.000628984,  // Example exchange rate for USD
    EUR:  0.000565859 ,  // Example exchange rate for EUR
    GBP: 0.000476474 , // Example exchange rate for GBP
};

// Default base currency
const BASE_CURRENCY = 'NGN';

// Function to update prices based on the selected currency
function updatePrices(newCurrency) {
    try {
        // Get the exchange rate for the new currency
        const rate = exchangeRates[newCurrency];
        
        if (rate !== undefined) {
            // Select all elements with prices
            const priceElements = document.querySelectorAll('.price');
            
            priceElements.forEach(element => {
                // Get the original price in base currency (NGN)
                const originalPrice = parseFloat(element.getAttribute('data-original-price') || element.textContent);
                
                // Convert the price to the new currency
                const convertedPrice = (originalPrice * rate).toFixed(2);
                
                // Update the displayed price
                element.textContent = `${newCurrency} ${convertedPrice}`;
                
                // Store the original price if not already stored
                if (!element.getAttribute('data-original-price')) {
                    element.setAttribute('data-original-price', originalPrice);
                }
            });
            
            console.log(`Prices updated to ${newCurrency}`);
        } else {
            throw new Error('Currency not supported');
        }
    } catch (error) {
        console.error('Error updating prices:', error);
    }
}

// Example usage: Update prices to USD
updatePrices('USD');

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) { // When the user scrolls down
        navbar.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
    }
});

$(document).ready(function() {
    // Contact Form Submission
   const form = document.getElementById('contact-form');
   const successMessage = document.getElementById('success-message');
   
   form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
   
      // You would normally send data to your backend here
   
      // Display the success message
   successMessage.style.display = 'block';
   form.reset();
   setTimeout(function(){
       successMessage.style.display = 'none';
       }, 5000);
});
});

$('#carousel-related-product').slick({
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    dots: true,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 3
            }
        }
    ]
});

// main.js

// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to dynamically load product details
function loadProductDetails() {
    // Get product details from URL
    const productName = getQueryParam('name');
    const productPrice = getQueryParam('price');
    const productImage = getQueryParam('image');
    const productDescription = getQueryParam('description');
    const productSpecification = getQueryParam('specification') ? getQueryParam('specification').split(',') : [];

    // Update the HTML content with the product details
    if (productName && productPrice && productImage) {
        document.getElementById('product-name').textContent = productName;
        document.getElementById('product-price').textContent = `N${productPrice}`;
        document.getElementById('product-detail').src = productImage;
        document.getElementById('product-description').textContent = productDescription;

        // Insert the product specifications into the list
        let specList = document.getElementById('product-specification');
        specList.innerHTML = ''; // Clear existing items
        productSpecification.forEach(spec => {
            let li = document.createElement('li');
            li.textContent = spec;
            specList.appendChild(li);
        });
    }
}

// Call loadProductDetails when the shop-single page loads
document.addEventListener('DOMContentLoaded', loadProductDetails);