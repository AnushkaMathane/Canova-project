const Form = require("../models/formModel");
const Project = require("../models/projectModel");
const Page = require("../models/pageModel");

// 🔹 helper function (NEW)
const generateLink = () => {
  return `form-${Date.now()}`;
};

// ================= CREATE FORM =================
const createForm = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    const userId = req.user._id;

    const newForm = await Form.create({
      name: "Untitled Form",
      owner: userId,
      link: generateLink(), // ✅ FIX
    });

    const page = await Page.create({ form: newForm._id });

    if (!newForm.pages) {
      newForm.pages = [];
    }

    newForm.pages.push(page._id);
    await newForm.save();

    res.status(201).json({
      message: "Form created.",
      success: true,
      form: newForm,
    });
  } catch (err) {
    console.error("Create form error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ================= GET USER FORMS =================
const getUserForms = async (req, res) => {
  try {
    const userId = req.user._id;

    const forms = await Form.find({
      owner: userId,
      project: null,
    }).sort({ createdAt: -1 });

    res.status(200).json(forms);
  } catch (err) {
    console.error("Get user forms error:", err);
    res.status(500).json({ message: "Failed to fetch forms" });
  }
};

// ================= GET FORMS BY PROJECT =================
const getFormsByProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user._id;

    const forms = await Form.find({
      project: projectId,
      owner: userId,
    });

    res.status(200).json(forms);
  } catch (err) {
    console.error("Get forms by project error:", err);
    res.status(500).json({ message: "Failed to fetch forms" });
  }
};

// ================= INSERT FORM INTO PROJECT =================
const insertFormInProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user._id;

    const project = await Project.findOne({
      _id: projectId,
      owner: userId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const newForm = await Form.create({
      name: "Untitled Form",
      project: projectId,
      owner: userId,
      link: generateLink(), // ✅ FIX
    });

    project.forms.push(newForm._id);
    await project.save();

    const page = await Page.create({ form: newForm._id });

    if (!newForm.pages) {
      newForm.pages = [];
    }

    newForm.pages.push(page._id);
    await newForm.save();

    res.status(200).json({
      success: true,
      message: "Form added in the project.",
      form: newForm,
    });
  } catch (err) {
    console.error("Insert form error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET FORM BY ID =================
const getFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const userId = req.user._id;

    const form = await Form.findOne({
      _id: formId,
      owner: userId,
    });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    form.views += 1;
    await form.save();

    res.status(200).json({
      message: "Form fetched",
      success: true,
      form,
    });
  } catch (err) {
    console.error("Get form by id error:", err);
    res.status(500).json({ message: "Failed to fetch form" });
  }
};

// ================= DELETE FORM =================
const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    await Page.deleteMany({ form: form._id });

    res.json({ message: "Form and pages deleted successfully" });
  } catch (error) {
    console.error("Delete form error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ================= RENAME FORM =================
const renameForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const form = await Form.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.json({
      message: "Form renamed successfully",
      form,
    });
  } catch (error) {
    console.error("Rename form error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ================= EXPORTS =================
module.exports = {
  createForm,
  getUserForms,
  getFormsByProject,
  insertFormInProject,
  getFormById,
  deleteForm,
  renameForm,
};
