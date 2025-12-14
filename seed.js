const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Clean up existing data
    await prisma.sweet.deleteMany();
    await prisma.user.deleteMany();

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@sweetshop.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log('Admin created:', admin);

    // Create Sweets
    const sweets = await prisma.sweet.createMany({
        data: [
            { name: 'Chocolate Fudge', category: 'Chocolate', price: 5.99, quantity: 50, imageUrl: 'http://127.0.0.1:5001/uploads/chocolate-fudge.png' },
            { name: 'Strawberry Gummy', category: 'Gummies', price: 2.50, quantity: 100, imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500&q=80' },
            { name: 'Vanilla Bean Cupcake', category: 'Bakery', price: 3.75, quantity: 20, imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=500&q=80' },
            { name: 'Sour Worms', category: 'Gummies', price: 1.99, quantity: 75, imageUrl: 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=500&q=80' },
            { name: 'Dark Truffles', category: 'Chocolate', price: 12.00, quantity: 30, imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500&q=80' },
            { name: 'Macarons (6 pack)', category: 'Bakery', price: 15.00, quantity: 15, imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&q=80' },
        ],
    });

    console.log('Sweets seeded:', sweets);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
