require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/database');

const seedProducts = [
    {
        name: 'Tesla Model 3',
        description: 'Véhicule électrique haute performance avec autonomie de 500km',
        category: 'vehicules-electriques',
        price: 45000,
        image: '/images/cars/tesla-model-3.jpg',
        stock: 15,
        specifications: {
            autonomie: '500km',
            batterie: '75kWh',
            puissance: '350kW',
            accélération: '0-100 en 5.1s',
        },
    },
    {
        name: 'Nissan Leaf',
        description: 'Véhicule électrique compact et économique',
        category: 'vehicules-electriques',
        price: 32000,
        image: '/images/cars/nissan-leaf.jpg',
        stock: 20,
        specifications: {
            autonomie: '400km',
            batterie: '62kWh',
            puissance: '160kW',
        },
    },
    {
        name: 'Borne de Recharge Rapide',
        description: 'Borne de recharge DC 50kW pour charge rapide',
        category: 'bornes-recharge',
        price: 8000,
        image: '/images/products/borne-dc50.jpg',
        stock: 25,
        specifications: {
            puissance: '50kW',
            connecteurs: 'CCS, CHAdeMO',
            garantie: '5 ans',
        },
    },
    {
        name: 'Panneaux Photovoltaïques',
        description: 'Système complet de panneaux solaires pour maison',
        category: 'photovoltaique',
        price: 12000,
        image: '/images/products/panneaux-pv.jpg',
        stock: 10,
        specifications: {
            puissance: '6kWc',
            panneaux: '16 panneaux',
            garantie: '25 ans',
            rendement: '18%',
        },
    },
    {
        name: 'Système BESS',
        description: 'Batterie de stockage pour système photovoltaïque',
        category: 'bess',
        price: 15000,
        image: '/images/products/bess.jpg',
        stock: 8,
        specifications: {
            capacité: '48kWh',
            tension: '48V',
            garantie: '10 ans',
        },
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});
        console.log('✓ Cleared existing products');

        // Insert seed data
        const inserted = await Product.insertMany(seedProducts);
        console.log(`✓ ${inserted.length} products inserted`);

        console.log('\nSample products:');
        inserted.forEach((product) => {
            console.log(`  - ${product.name} (${product.category}): ${product.price}€`);
        });

        mongoose.connection.close();
        console.log('\n✓ Database seeding completed');
    } catch (error) {
        console.error('✗ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
