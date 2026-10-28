const Student = require('../models/StudentModel');

async function getStudents(req, res) {
  try {
    const students = await Student.find();
    res.json({ students, length: students.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erreur du serveur" });
  }
}

async function addStudent(req, res) {
  try {
    const new_student = req.body;

    // 1. vérifier que firstName, lastName, age et email existent
    if (!new_student.firstName || !new_student.lastName || new_student.age === undefined || !new_student.email) {
      return res.status(400).json({ message: "firstName, lastName, age et email sont obligatoires" });
    }

    // 2. vérifier que le prénom et le nom ont au moins 2 caractères
    if (new_student.firstName.length < 2 || new_student.lastName.length < 2) {
      return res.status(400).json({ message: "le prénom et le nom doivent contenir au moins 2 caractères" });
    }

    // 3. vérifier que l'âge est un nombre entre 16 et 99
    if (typeof new_student.age !== "number" || new_student.age < 16 || new_student.age > 99) {
      return res.status(400).json({ message: "l'âge doit être un nombre entre 16 et 99" });
    }

    // 4. vérifier que l'email contient un @
    if (!new_student.email.includes("@")) {
      return res.status(400).json({ message: "l'email n'est pas valide" });
    }

    // 5. vérifier si l'étudiant existe déjà (même email)
    const existingStudent = await Student.findOne({ email: new_student.email });

    if (existingStudent) {
      return res.status(400).json({ message: "étudiant existe déjà" });
    }

    // 6. ajouter l'étudiant dans MongoDB
    const student = await Student.create(new_student);

    res.status(201).json({ message: "étudiant ajouté", student });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erreur du serveur" });
  }
}

module.exports = { getStudents, addStudent };