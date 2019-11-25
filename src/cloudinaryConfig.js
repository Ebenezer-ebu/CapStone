var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'ifezulike',
    api_key: '276717185955225',
    api_secret: 'QYWSqB_CenausW7Pj_HVckvVmFA'
    });

    exports.uploads = (file) =>{
        return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) =>{
        resolve({url: result.url, id: result.public_id})
        }, {resource_type: "auto"})
        })
        }