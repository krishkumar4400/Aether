

module.exports.healthCheck = function(req,res) {
    return res.status(200).json({
        message: "Server is running",
        success: true
    });
}