/** @format */

const router = require("express").Router();
const Ads = require("../models/ads");

router.get("/all", async (req, res) => {
  await Ads.find().then((data) => {
    res.json(data);
  });
});

router.get("/add", (req, res) => {
  res.render("index");
});

//adding new advertisements
router.post("/add", async (req, res) => {
  const error = [];
  const { name, description, totalRewardPoint, filePath } = req.body;

  if (!name || !description || !filePath) {
    if (name == null || name == undefined || name == "") {
      error.push({ err: "Name is required" });
    }
    if (description == null || description == undefined || description == "") {
      error.push({ err: "Description is required" });
    }
    if (filePath == null || filePath == undefined || filePath == "") {
      error.push({ err: "Filepath is required" });
    }
    console.log(error);
    return res.redirect("/v1/ads/add");
  }

  if (totalRewardPoint > 1000 || totalRewardPoint < 10) {
    error.push({ err: "Reward point must be between 10 to 1000" });
    console.log(error);
    return res.redirect("/v1/ads/add");
  }

  const passData = new Ads({
    name,
    description,
    totalRewardPoint,
    filePath,
  });
  try {
    const saveData = await passData.save();
    res.json({ data: saveData });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

module.exports = router;
