import { Product } from "../schemas/product.model.js"
import { Favorite } from "../schemas/favorite.model.js"
import { User } from "../schemas/user.model.js"
import { Address } from "../schemas/address.model.js"


export const addNewAddress = (req, res) => {
    try {
            const newAddress = new Address({...req.body})
            newAddress.save()
            res.send(newAddress).status(200)
    } catch (error) {
        res.send(error).status(500)
    }
}

export const fetchAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({userId: req.body.userId})
        res.send(addresses).status(200)
    } catch (error) {
        res.send(error.message).status(500)
    }
}

export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id)
        res.send(address._id).status(200)
    } catch (error) {
        res.send(error).status(500)
    }
}

export const editAddress = async (req, res) => {
    console.log(req.body, req.params.id)
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, {...req.body}, {
            returnDocument:'after'
        })
        res.send(address).status(200)
        console.log(address, 'ADDRESS')
    } catch (error) {
        res.send(error).status(500)
    }
}