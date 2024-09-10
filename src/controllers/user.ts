import UserModel from "../models/ModelUser";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { getAccessToken } from "../ultils/getAccessToken";
import { generatorRandomText } from "../ultils/generateNumber";

const register = async (req: any, res: any) => {
    const body = req.body;
    dotenv.config()
    const { email, name, password } = body
    try {


        // kiểm trả đã tồn tại email chưa ,nếu chưa thì mới thêm dc user
        const user = await UserModel.findOne({ email })

        if (user) {
            throw new Error("Tai khoan da ton tai")
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        console.log(hashPassword)

        body.password = hashPassword

        const newUser: any = new UserModel(body)
        // const newUser =new UserModel(body)

        await newUser.save()


        delete newUser._doc.password;


        // newUser.token = await getAccessToken({
        //     // ...newUser ,token: await getAccessToken({
        //     _id: newUser._id,
        //     email: newUser.email,
        //     rule: 1

        // })

        console.log(body)
        res.status(200).json({
            message: "Resgister",
            data: {
                ...newUser._doc,
                token: await getAccessToken({
                    // ...newUser ,token: await getAccessToken({
                    _id: newUser._id,
                    email: newUser.email,
                    rule: 1

                })
            }
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

const login = async (req: any, res: any) => {
    const body = req.body;
    dotenv.config()
    const { email, password } = body
    try {


        // kiểm trả đã tồn tại email chưa ,nếu chưa thì mới thêm dc user
        const user: any = await UserModel.findOne({ email })

        if (!user) {
            throw new Error("Tai khoan Không ton tai")
        }


        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) {
            throw new Error("Dang Nhap that bai,vui long kiem tra lai thong tin")
        }

        delete user._doc.password;


        // user.token = await getAccessToken({
        //     // ...user ,token: await getAccessToken({
        //     _id: user._id,
        //     email: user.email,
        //     rule: user.rule ?? 1

        // })

        console.log(body)
        res.status(200).json({
            message: "Login Succesfully!!!",
            data: {
                ...user._doc,
                token: await getAccessToken({
                    // ...user ,token: await getAccessToken({
                    _id: user._id,
                    email: user.email,
                    rule: user.rule ?? 1

                })
            }
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}
const loginWithGoogle = async (req: any, res: any) => {
    const body = req.body;
    dotenv.config()
    const { email, name, } = body
    try {


        // kiểm trả đã tồn tại email chưa ,nếu chưa thì mới thêm dc user
        const user:any = await UserModel.findOne({ email })

        if (user) {
            delete user._doc.password;


            // user.token = await getAccessToken({
            //     // ...user ,token: await getAccessToken({
            //     _id: user._id,
            //     email: user.email,
            //     rule: user.rule ?? 1

            // })

            console.log(body)
            res.status(200).json({
                message: "Login Succesfully!!!",
                data: {
                    ...user._doc,
                    token: await getAccessToken({
                        // ...user ,token: await getAccessToken({
                        _id: user._id,
                        email: user.email,
                        rule: user.rule ?? 1

                    })
                }
            });
        }
        else{

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(generatorRandomText(6), salt)
    
            console.log(hashPassword)
    
            body.password = hashPassword
    
            const newUser: any = new UserModel(body)
            // const newUser =new UserModel(body)
    
            await newUser.save()
    
    
            delete newUser._doc.password;
    
    
            // newUser.token = await getAccessToken({
            //     // ...newUser ,token: await getAccessToken({
            //     _id: newUser._id,
            //     email: newUser.email,
            //     rule: 1
    
            // })
    
            console.log(body)
            res.status(200).json({
                message: "Resgister",
                data: {
                    ...newUser._doc,
                    token: await getAccessToken({
                        // ...newUser ,token: await getAccessToken({
                        _id: newUser._id,
                        email: newUser.email,
                        rule: 1
    
                    })
                }
            });
        }

    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}


const refeshToken = async ( req: any, res: any) => {


    const {id}=req.query;
    console.log(id)

    try {

        const user =await UserModel.findById(id);

        if(!user){

            throw new Error("User not found")
        }
        const token = await  getAccessToken({
            _id: id,
            email: user.email,
            rule:user.rule
        })
        
        res.status(200).json({
            message:"refeshToken",
            data:token
        })
    } catch (error :any) {
        res.status(404).json({

            message:error.message
        });
        
    }

}
export { register, login, loginWithGoogle,refeshToken }