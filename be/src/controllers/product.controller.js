import db from "../models";
import { ProductFollowService, ProductService } from "../services";

export default class ProductController {
    getByPath = async (req, res) => {
        try {
            const { path } = req.params;

            const product = await new ProductService().getOne({
                where: { path }
            });

            return res.status(200).json({ product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    search = async (req, res) => {
        try {
            const { searchTerm, category_id, category_path, page, limit } = req.query;

            const { rows, count } = await new ProductService().searchAndCountProducts({
                searchTerm,
                category_id,
                category_path,
                page,
                limit
            });

            return res.status(200).json({ result: { products: rows, count: count } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    getFollow = async (req, res) => {
        try {
            const user = req.user;

            const products = await new ProductFollowService().getAll({
                where: {
                    user_id: user.id
                },
                include: [{
                    model: db.product
                }]
            });
            return res.status(200).json({ products: products });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    follow = async (req, res) => {
        try {
            const { product } = req.body;
            const user = req.user;

            const productFollow = await new ProductFollowService().create({
                user_id: user.id,
                product_id: product.id
            });

            return res.status(200).json({ message: "Followed successfully" }); // Thêm json() với phản hồi
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    unfollow = async (req, res) => {
        try {
            const { product } = req.body;
            const user = req.user;

            await new ProductFollowService().delete({
                where: {
                    user_id: user.id,
                    product_id: product.id
                }
            });

            return res.status(200).json({ message: "Unfollowed successfully" }); // Thêm json() với phản hồi
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    syncFollow = async (req, res) => {
        try {
            const { following_items } = req.body;
            const user = req.user;

            for (let product_follow of following_items) {
                const productFollow = await new ProductFollowService().getOne({
                    where: {
                        user_id: user.id,
                        product_id: product_follow.product.id
                    }
                });

                if (!productFollow) {
                    await new ProductFollowService().create({
                        user_id: user.id,
                        product_id: product_follow.product.id
                    });
                }
            }

            return res.status(200).json({ message: "Sync follow completed" }); // Thêm json() với phản hồi
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }


    async getAll(req, res) {
        try {
            const data = await new ProductService().getAll();
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getOne(req, res) {
        try {
            const data = await new ProductService().getOne(req.params.id);
            if (!data) {
                return res.status(404).json({ message: "Not found" });
            }
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req, res) {
        try {
            const data = await new ProductService().create(req.body);
            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req, res) {
        try {
            const data = await new ProductService().update(req.params.id, req.body);
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req, res) {
        try {
            await new ProductService().delete(req.params.id);
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}