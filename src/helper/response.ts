class _response {
    sendResponse = (res: any, data:any) => {
        try {
            if (data.statusCode) {
                res.status(data.statusCode)

                delete data.statusCode

                res.send(data)
                return true
            }

            res.status(data && data.status ? 200 : 400)
            res.send(data)
            return true
        } catch (error) {
            res.status(400).send({
                status: false,
                error
            })

            return false
        }
    }
}

export default new _response()