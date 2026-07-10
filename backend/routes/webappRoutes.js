import { Router } from "express";
import { Op } from "sequelize";
import WebappProfile from "../models/WebappProfile.js";
import Artwork from "../models/Artwork.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import CartItem from "../models/CartItem.js";
import Order from "../models/Order.js";
import OrderSummary from "../models/OrderSummary.js";
import PaymentMethod from "../models/PaymentMethod.js";
import Address from "../models/Address.js";
import SubscriptionPlan from "../models/SubscriptionPlan.js";
import SearchHistory from "../models/SearchHistory.js";
import Follower from "../models/Follower.js";
import MediaFolder from "../models/MediaFolder.js";
import { Collection, CollectionItem } from "../models/Collection.js";
import UploadedMedia from "../models/UploadedMedia.js";

const router = Router();
const USER_ID = "default-user";

/* ── Profile ── */
router.get("/profile", async (req, res) => {
  try {
    let profile = await WebappProfile.findOne({ where: { userId: USER_ID } });
    if (!profile) {
      profile = await WebappProfile.create({
        userId: USER_ID,
        displayName: "Suraj Pandya",
        username: "suraj_pandya_123",
        title: "AI Enthusiast",
        bio: "Passionate about AI-generated art and creative exploration. Exploring the intersection of technology and creativity.",
        location: "UK, London Metropolitan",
        avatar: "/images/webapp/figma/suraj-avatar.jpg",
        banner: "/images/webapp/figma/profile-banner.jpg",
        postCount: 548,
        followerCount: 12700,
        followingCount: 221,
        favoriteArtStyles: ["Surrealism", "Abstract Expressionism", "Conceptual Portraits", "Minimalism"],
      });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const [profile] = await WebappProfile.findOrCreate({ where: { userId: USER_ID }, defaults: { userId: USER_ID } });
    await profile.update(req.body);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Artworks / Marketplace ── */
router.get("/artworks", async (req, res) => {
  try {
    const { search, category, page = 1, limit = 20 } = req.query;
    const where = {};
    if (search) where.title = { [Op.like]: `%${search}%` };
    if (category) where.category = category;
    const offset = (page - 1) * limit;
    const { rows, count } = await Artwork.findAndCountAll({ where, offset, limit: Number(limit), order: [["createdAt", "DESC"]] });
    res.json({ items: rows, total: count, page: Number(page), totalPages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/artworks/featured", async (req, res) => {
  try {
    const artworks = await Artwork.findAll({ limit: 4, order: [["rating", "DESC"]] });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/artworks/top-artists", async (req, res) => {
  try {
    const artists = await Artwork.findAll({ attributes: ["artist", "artistAvatar"], group: ["artist"], limit: 10, order: [["createdAt", "DESC"]] });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/artworks/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findByPk(req.params.id);
    if (!artwork) return res.status(404).json({ error: "Artwork not found" });
    res.json(artwork);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/artworks", async (req, res) => {
  try {
    const artwork = await Artwork.create({ ...req.body, userId: USER_ID });
    res.status(201).json(artwork);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Posts / Social Feed ── */
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [["createdAt", "DESC"]] });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/posts", async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, userId: USER_ID });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    await post.increment("likes", { by: 1 });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Comments ── */
router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { postId: req.params.postId }, order: [["createdAt", "DESC"]] });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/posts/:postId/comments", async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body, postId: req.params.postId, userId: USER_ID });
    await Post.increment("comments", { by: 1, where: { id: req.params.postId } });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Cart ── */
router.get("/cart", async (req, res) => {
  try {
    const items = await CartItem.findAll({ where: { userId: USER_ID } });
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFees = 39;
    res.json({ items, subtotal, deliveryFees, total: subtotal + deliveryFees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/cart", async (req, res) => {
  try {
    const item = await CartItem.create({ ...req.body, userId: USER_ID });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/cart/:id", async (req, res) => {
  try {
    const item = await CartItem.findOne({ where: { id: req.params.id, userId: USER_ID } });
    if (!item) return res.status(404).json({ error: "Cart item not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/cart/:id", async (req, res) => {
  try {
    await CartItem.destroy({ where: { id: req.params.id, userId: USER_ID } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Orders ── */
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: USER_ID }, order: [["createdAt", "DESC"]] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, userId: USER_ID });
    await CartItem.destroy({ where: { userId: USER_ID } });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Order Summary ── */
router.get("/order-summary", async (req, res) => {
  try {
    let summary = await OrderSummary.findOne({ where: { userId: USER_ID } });
    if (!summary) {
      summary = await OrderSummary.create({
        userId: USER_ID,
        productName: "Echoes of the Sea",
        productDescription: "Framed art print, 70x100cm, premium quality giclee on archival paper",
        totalItems: 2,
        subtotal: 340,
        deliveryFees: 39,
        total: 379,
      });
    }
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Payment Methods ── */
router.get("/payment-methods", async (req, res) => {
  try {
    const methods = await PaymentMethod.findAll({ where: { userId: USER_ID } });
    if (methods.length === 0) {
      const defaultCard = await PaymentMethod.create({
        userId: USER_ID,
        cardHolder: "Marisa Lu",
        cardNumber: "**** **** **** 4523",
        balance: "$28,678.65",
        currency: "USD",
        status: "06/24 (Active)",
        validThru: "06/24",
        type: "VISA",
      });
      return res.json([defaultCard]);
    }
    res.json(methods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/payment-methods", async (req, res) => {
  try {
    const method = await PaymentMethod.create({ ...req.body, userId: USER_ID });
    res.status(201).json(method);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Addresses ── */
router.get("/addresses", async (req, res) => {
  try {
    const addresses = await Address.findAll({ where: { userId: USER_ID } });
    if (addresses.length === 0) {
      const defaultAddresses = await Address.bulkCreate([
        { userId: USER_ID, label: "Home", phone: "(424) 985-8942", street: "114 Glann Rd", city: "Apalachin, New York(NY),", zip: "13732", selected: true },
        { userId: USER_ID, label: "Offices", phone: "(424) 985-8942", street: "114 Glann Rd", city: "Apalachin, New York(NY),", zip: "13732", selected: false },
      ]);
      return res.json(defaultAddresses);
    }
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/addresses", async (req, res) => {
  try {
    const address = await Address.create({ ...req.body, userId: USER_ID });
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/addresses/:id/select", async (req, res) => {
  try {
    await Address.update({ selected: false }, { where: { userId: USER_ID } });
    await Address.update({ selected: true }, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Subscription Plans ── */
router.get("/subscription-plans", async (req, res) => {
  try {
    const plans = await SubscriptionPlan.findAll({ order: [["createdAt", "ASC"]] });
    if (plans.length === 0) {
      const defaultPlans = await SubscriptionPlan.bulkCreate([
        { tier: "BASIC", price: "$19", period: "/Month", subtitle: "For individuals", description: "Perfect for getting started with AI art", features: ["Access to basic AI tools", "5 artworks per month", "Standard quality exports", "Community access"], featuresLabel: "What's included", highlighted: false, buttonStyle: "outlined" },
        { tier: "ADVANCED", price: "$99", period: "/Month", subtitle: "For creators", description: "For serious creators who want more power", features: ["All Basic features", "50 artworks per month", "HD quality exports", "Priority support", "Custom styles"], featuresLabel: "Everything in Basic, plus:", highlighted: true, buttonStyle: "filled" },
        { tier: "PREMIUM", price: "$299", period: "/Month", subtitle: "For professionals", description: "Maximum creative power for professionals", features: ["All Advanced features", "Unlimited artworks", "4K quality exports", "Dedicated support", "API access", "Team collaboration"], featuresLabel: "Everything in Advanced, plus:", highlighted: false, buttonStyle: "outlined" },
      ]);
      return res.json(defaultPlans);
    }
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Collection Management (reuses existing Collection model) ── */
router.get("/collections", async (req, res) => {
  try {
    const collections = await Collection.findAll({ where: { userId: USER_ID }, order: [["createdAt", "DESC"]] });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/collections", async (req, res) => {
  try {
    const collection = await Collection.create({ ...req.body, userId: USER_ID });
    if (req.body.itemIds) {
      const items = req.body.itemIds.map((itemId) => ({ collectionId: collection.id, itemId, itemType: req.body.itemType || "image" }));
      await CollectionItem.bulkCreate(items);
    }
    res.status(201).json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/collections/:id", async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id, { include: [CollectionItem] });
    if (!collection) return res.status(404).json({ error: "Collection not found" });
    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/collections/:id", async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) return res.status(404).json({ error: "Collection not found" });
    await collection.update(req.body);
    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/collections/:id", async (req, res) => {
  try {
    await CollectionItem.destroy({ where: { collectionId: req.params.id } });
    await Collection.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Media (reuses UploadedMedia model) ── */
router.get("/media", async (req, res) => {
  try {
    const { type, page = 1, limit = 50 } = req.query;
    const where = { userId: USER_ID };
    if (type) where.mediaType = type;
    const offset = (page - 1) * limit;
    const { rows, count } = await UploadedMedia.findAndCountAll({ where, offset, limit: Number(limit), order: [["createdAt", "DESC"]] });
    res.json({ items: rows, total: count, page: Number(page), totalPages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Search History ── */
router.get("/search-history", async (req, res) => {
  try {
    const history = await SearchHistory.findAll({ where: { userId: USER_ID }, order: [["createdAt", "DESC"]], limit: 8 });
    if (history.length === 0) {
      const defaultHistory = await SearchHistory.bulkCreate([
        { userId: USER_ID, query: "Abstract", image: "/images/webapp/abstract_landscape.png" },
        { userId: USER_ID, query: "Minimalistic", image: "/images/webapp/minimalistic_night.png" },
        { userId: USER_ID, query: "Nature", image: "/images/webapp/nature_garden.png" },
        { userId: USER_ID, query: "Digital", image: "/images/webapp/digital_plants.png" },
      ]);
      return res.json(defaultHistory);
    }
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/search-history", async (req, res) => {
  try {
    const entry = await SearchHistory.create({ ...req.body, userId: USER_ID });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Followers ── */
router.get("/followers", async (req, res) => {
  try {
    const followers = await Follower.findAll({ where: { followingId: USER_ID } });
    res.json(followers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/following", async (req, res) => {
  try {
    const following = await Follower.findAll({ where: { followerId: USER_ID } });
    res.json(following);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/follow", async (req, res) => {
  try {
    const follow = await Follower.create({ followerId: USER_ID, followingId: req.body.userId });
    res.status(201).json(follow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/unfollow/:userId", async (req, res) => {
  try {
    await Follower.destroy({ where: { followerId: USER_ID, followingId: req.params.userId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── AI Photo Manager ── */
router.get("/media-folders", async (req, res) => {
  try {
    const folders = await MediaFolder.findAll({ where: { userId: USER_ID }, order: [["createdAt", "DESC"]] });
    if (folders.length === 0) {
      const defaultFolders = await MediaFolder.bulkCreate([
        { userId: USER_ID, title: "Abstract", fileCount: 42, lastUpdated: "2 days ago", storage: "12.4 GB" },
        { userId: USER_ID, title: "Portrait", fileCount: 28, lastUpdated: "5 days ago", storage: "8.1 GB" },
        { userId: USER_ID, title: "Generated Artworks #1-3", fileCount: 12, lastUpdated: "2 days ago", storage: "3.2 GB" },
      ]);
      return res.json(defaultFolders);
    }
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/media-folders", async (req, res) => {
  try {
    const folder = await MediaFolder.create({ ...req.body, userId: USER_ID });
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── Storage Info ── */
router.get("/storage", async (req, res) => {
  try {
    res.json({ used: "32.5 Gb", total: "100 Gb", percentage: 32.5 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
