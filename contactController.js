// Import contact model
Contact = require('./contactModel');
// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.send(JSON.stringify({code:"0",msg:"success",
        "records":[
            {
            "key":"TAKwGc6Jr4i8Z487",
            "createdAt":"2017-01-28T01:22:14.398Z",
            "totalCount":2800
            },
            {
                "key":"NAeQ8eX7e5TEg7oH",
                "createdAt":"2017-01-27T08:19:14.135Z",
                "totalCount":2900
            }]
            
         }));

    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.startDate= req.body.startDate;
    contact.endDate = req.body.endDate;
    contact.minCount= req.body.minCount;
    contact.maxCount = req.body.maxCount;
// save the contact and check for errors
    contact.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.startDate = req.body.startDate;
        contact.endDate = req.body.endDate;
        contact.minCount = req.body.minCount;
        contact.maxCount = req.body.maxCount;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};