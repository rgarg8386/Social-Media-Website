//exports function use krke apa ehnu kisi vi file ch use kr sakde as aa object 
module.exports.home = function(req, res) {
    return res.render('home', {
        title: "Home"
    });
}