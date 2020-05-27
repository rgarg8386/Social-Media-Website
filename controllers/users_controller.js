//exports function use krke apa ehnu kisi vi file ch use kr sakde as aa object 

module.exports.profile = function(req, res) {
        return res.render('users_profile', {
            title: "Profile"
        });
    }
    //module is optional
exports.posts = function(req, res) {
    return res.render('users_posts', {
        title: "Posts"
    });
}