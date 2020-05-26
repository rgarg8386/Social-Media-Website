//exports function use krke apa ehnu kisi vi file ch use kr sakde as aa object 

module.exports.profile = function(req, res) {
        return res.end('<h1>User Profile</h1>');
    }
    //module is optional
exports.post = function(req, res) {
    return res.end('<h1>User Posts</h1>');
}