exports.dashboard = async (req, res) => {

    const locals = {
        title: 'dashboard',
        description : 'dashboard for the notes app'
    };

    res.render('dashboard/index', {
        locals,
        layout: './layouts/dashboard'
    });
};