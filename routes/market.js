var express = require("express");
const item = require("../models/item");
router = express.Router();
methodOverride = require("method-override")
upload = require("../multer");
user = require("../models/user")
router.use(methodOverride("_method"));

router.get("/market", function(req, res) {
    item.find({}, function(err, item) {
        if (err) {
            console.log(err);
            res.render("back");
        } else {
            res.render("marketplace", { item: item });
        }
    })
});

router.get("/market/new", function(req, res) {
    res.render("marketProductAdd");
});

var cpUpload = upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 },
 { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 },{ name: 'zipfile', maxCount: 1 }])
 
router.post("/market/:id/new", cpUpload, function(req, res) {
    item.create({
        name: req.body.name,
        desc: req.body.desc,
        addesc: req.body.addesc,
        images: {
            image1: req.files['image1'][0].path,
            image2: req.files['image2'][0].path,
            image3: req.files['image3'][0].path,
            image4: req.files['image4'][0].path,
            zipfile:req.files['zipfile'][0].path
        },
      
        points: req.body.points,
        category: req.body.category,
        author: {
            id: req.user._id
        }
    }, function(err, item) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log(item);
            res.redirect("/market");
        }
    });
});

router.get("/market/:id", function(req, res) {
    item.findById(req.params.id, function(err, item) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("marketProduct", { item: item });
        }
    })
});

router.delete("/market/:id", isUserItem, function(req, res) {
    item.findByIdAndDelete(req.params.id, function(err, item) {
        if (err) {
            console.log(err);
            res.render("back");
        } else {
            console.log("item Deleted");
            console.log(item);
            res.redirect("/market");
        }
    })
})

//download zip file
router.get("/download/:id", function(req, res) {
    item.findById(req.params.id, function(err, item) {
        if (err) {
            console.log(log);
            res.redirect("back")
        } else {
            var file = item.images.zipfile;
            res.download(file);
        }
    })
});

router.get("/market/:id/edit", function(req, res) {
    item.findById(req.params.id, function(err, item) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("itemEdit", { item: item });
        }
    })
});

router.put("/market/:id/edit", isUserItem, cpUpload, function(req, res) {
    var itemEdit = {
        name: req.body.name,
        desc: req.body.desc,
        addesc: req.body.addesc,
        points: req.body.points,
        category: req.body.category,
    }
    item.findByIdAndUpdate(req.params.id, itemEdit, function(err, item) {
        if (err) {
            console.log(err);
        } else {
            console.log("item Updated");
            console.log(item);
            res.redirect("/market/" + req.params.id);
        }
    })
})

function isUserItem(req, res, next) {
    if (req.isAuthenticated()) {
        item.findById(req.params.id, function(err, item) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {

                if (item.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log(err);
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


router.get('/market/item_category/:cat/',(req,res)=>{
        console.log('get')
        item.find({category:req.params.cat}).exec(function(err,foundcategory){

        if(err)console.log(err,'error category me')
 
        else {
         console.log('else')
            res.send(foundcategory);
        }
        })
});

module.exports = router;