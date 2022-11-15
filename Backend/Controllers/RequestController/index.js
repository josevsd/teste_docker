const UserRequest = require('../../Models/UserRequest')

class RequestController {
    static async read(req, res) {
        try {
            const resFind = await UserRequest.findAll()
            res.status(200).json({ resFind })
        } catch (err) {
            res.status(404).json({ msg: "[ERROR] Can't make request" })
        }
    }

    static async create(req, res) {
        const { email, name, password, confirmPass } = req.body
        if (!email || !name || !password || !confirmPass) return res.status(422).json({ msg: "Missing data" })
        if (password !== confirmPass) return res.status(422).json({ msg: "The password's are different" })
        try {
            const resFind = await UserRequest.findOne({
                where: {
                    email
                }
            })
            if (!resFind) {
                await UserRequest.create({
                    email,
                    name,
                    password
                })
            }
            res.status(200).json({msg: "Request created sucessfully"})
        } catch (err) {
            res.status(501).json({ msg: "[ERROR] Can't make user request, try another email" }, err)
        }
    }

    static async delete(req, res) {
        const { email } = req.body
        const resFind = await UserRequest.findOne({ where: { email } })
        try {
            resFind.destroy()
            res.status(200).json({ msg: "deleted request" })
        } catch (err) {
            res.status(500).json({ msg: "[ERROR] Can't delete request" })
        }
    }

}

module.exports = RequestController