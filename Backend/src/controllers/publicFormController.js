const Form = require("../models/formModel");
const Response = require("../models/responseModel");

const getPublishedForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId);

    if (!form || form.isDraft) {
      return res.status(403).json({ message: "This form is not accessible" });
    }

    const publicData = {
      _id: form._id,
      name: form.name,
      pages: form.pages,
      owner: form.owner,
      access: form.access, // frontend ko batane ke liye
    };

    form.views += 1;
    await form.save();

    // ❌ NO email check here
    return res.status(200).json({
      message: "Form fetched successfully",
      form: publicData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const postPublicResponse = async (req, res) => {
  const { formId } = req.params;
 const { userEmail, answers } = req.body;

  try {
    const form = await Form.findById(formId);

    const resp = await Response.create({
      form: form._id,
      answers: answers,
      userEmail: userEmail,
    });

    res.status(201).json({
      message: "Form Submitted Successfully!",
      success: true,
      response: resp,
    });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getPublishedForm, postPublicResponse };
