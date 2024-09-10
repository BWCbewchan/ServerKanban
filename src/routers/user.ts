import { Router } from "express";
import { login, loginWithGoogle, refeshToken, register } from "../controllers/user";

const router=Router()


router.post('/register', register)
router.post('/login', login)
router.post('/google-login', loginWithGoogle )
router.get('/refesh-token', refeshToken )




export default router