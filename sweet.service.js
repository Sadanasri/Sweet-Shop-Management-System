const prisma = require('../config/prisma');

exports.create = (data) => prisma.sweet.create({ data });

exports.getAll = () => prisma.sweet.findMany();

exports.search = ({ name, category, minPrice, maxPrice }) =>
  prisma.sweet.findMany({
    where: {
      name: name ? { contains: name } : undefined,
      category,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      }
    }
  });

exports.update = (id, data) =>
  prisma.sweet.update({ where: { id: Number(id) }, data });

exports.remove = (id) =>
  prisma.sweet.delete({ where: { id: Number(id) } });

exports.purchase = async (id) => {
  const sweet = await prisma.sweet.findUnique({ where: { id: Number(id) } });
  if (!sweet || sweet.quantity <= 0) throw new Error('Out of stock');

  return prisma.sweet.update({
    where: { id: Number(id) },
    data: { quantity: { decrement: 1 } }
  });
};

exports.restock = (id, quantity) =>
  prisma.sweet.update({
    where: { id: Number(id) },
    data: { quantity: { increment: Number(quantity) } }
  });
