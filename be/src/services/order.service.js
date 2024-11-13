
import db from "../models";

export default class OrderService {
  constructor() {
    this.model = db.order;
  }

  createOrder = async (userId, cart, name, email, phone, note) => {
    try {
      const order = await this.create({ userId, name, email, phone, note });
      if (!order) {
        return null;
      }

      const orderDetails = cart.map(item => ({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const orderDetail = await db.orderDetail.bulkCreate(orderDetails);
      if (!orderDetail) {
        return null;
      }

      return order;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(data) {
    try {
      const { id, ...filteredData } = data;
      const result = await this.model.update(filteredData, { where: { id: id } });
      if (result[0] === 0) {
        return null;
      }
      let product = await this.model.findOne({ where: { id: id } });
      return product;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(id) {
    try {
      const result = await this.model.destroy({ where: { id: id } });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getById(id) {
    try {
      const result = await this.model.findOne({ where: { id: id } });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAll(options = {}) {
    try {
      const result = await this.model.findAll(options);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getOne(options = {}) {
    try {
      const result = await this.model.findOne(options);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async searchAndCountAll(options = {}) {
    try {
      const { rows, count } = await this.model.findAndCountAll(options);
      return { rows, count };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}