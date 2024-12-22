exports.homepage = async (req, res) => {

    const locals = {
        title: 'nodejs notes',
        description: 'free nodejs notes app'
    }
    res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
    });
};


exports.about = async (req, res) => {

    const locals = {
        title: 'About - nodejs notes',
        description: 'free nodejs notes app'
    }
    res.render('about', locals);
}


 