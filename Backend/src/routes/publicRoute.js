const express = require("express");
const router = express.Router();
const {
  getPublishedForm,
  postPublicResponse,
} = require("../controllers/publicFormController");

router.get("/form/:formId", getPublishedForm);
router.post("/form/:formId/response", postPublicResponse);

module.exports = router;
