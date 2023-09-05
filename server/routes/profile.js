import express from "express";

const router = express.Router();

router.get("/profile", (req,res)=>{
    try{
        res.status(200).json({status: "OK", message: "Data berhasil ditampilkan", data: req.user})
    }catch(err){
        res.status(404).json({status: "Bad Request", message: "Anda belum login"})
    }
})

router.get("/logout", (_req,res)=>{
    res.clearCookie("jwt").status(200).json({status: "OK", message: "Berhasil Logout"})
})

export default router