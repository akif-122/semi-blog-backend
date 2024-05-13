const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

// ALL USER
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send({
            success: true,
            users: users
        });

    } catch (error) {
        console.log(error)
    }
};

// CREATE USER
exports.registerController = async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(200).send({
                success: false,
                message: "Please fill all Fields"
            });
        }

        // EXISTING USER
        const existsUser = await userModel.findOne({ email });

        if (existsUser) {
            return res.status(401).send({
                success: false,
                message: "User already exists."
            })
        }

        // HASHING PASS
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        // // ADD NEW USER
        const user = await new userModel({ username, email, password: hashedPassword }).save();

        console.log(user)

        res.status(201).send({
            success: true,
            message: "User Created",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in register callback",
            error
        })
    }
};

// LOGIN USER
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "All fields are required!"
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid Cradential"
            })
        }

        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) {
            return res.status(400).send({
                success: false,
                message: "Invalid Cradential"
            })
        }


        return res.status(200).send({
            success: true,
            message: "Login Successful!",
            user
        })





    } catch (error) {
        console.log(error)
    }
}