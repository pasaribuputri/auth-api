import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import client from "../config/config.js";
import "dotenv/config"

const router = express.Router();

async function checkEmail(email) {
    return await client.query("select * from users where email = $1", [email])
}

router.post("/check", async (req, res) => {
    try {
        const result = await checkEmail(req.body.email);
        if (result.rows.length > 0) {
            res.status(200).json({ status: "OK", message: "Email Ditemukan" })
        } else {
            res.status(404).json({ status: "Not Found", message: "Email tidak ditemukan" })
        }
    } catch (err) {
        res.status(500).json({ status: "Internal server error", message: "Terjadi kesalahan saat memeriksa email" })
    }
})

router.post("/register", async (req, res) => {
    try {
        const result = await checkEmail(req.body.email);
        if (result.rows.length > 0) {
            res.status(400).json({ status: "Bad Request", message: "Email sudah pernah digunakan" })
        } else {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(req.body.password, salt);
            await client.query("insert into users (full_name, email, password, jenis_kelamin) values ($1, $2, $3, $4)", [req.body.full_name, req.body.email, hash, req.body.jenis_kelamin]);
            res.status(201).json({ status: "Created", message: "Akun berhasil dibuat" })
        }
    } catch (err) {
        res.status(500).json({ status: "Internal Server Error", message: "Terjadi kesalahan saat membuat akun" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = ((await checkEmail(req.body.email)).rows);
        if (user.length > 0) {
            if (await bcrypt.compare(req.body.password, user[0].password)) {
                const token = jwt.sign(user[0], process.env.SECRET_KEY);
                res.cookie("jwt", token, { httpOnly: true }).status(200).json({ status: "OK", message: "Login Berhasil" })
            } else {
                res.status(400).json({ status: "Bad Request", message: "Kata sandi salah" })
            }
        } else {
            res.status(404).json({ status: "Not Found", message: "Email tidak ditemukan" })
        }
    } catch (err) {
        res.status(500).json({ status: "Internal server error", message: "Terjadi kesalahan saat login" })
    }
})

export default router