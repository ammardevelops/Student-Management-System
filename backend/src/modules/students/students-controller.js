const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;
    const students = await getAllStudents({ name, className, section, roll });
    res.status(200).json({
        success: true,
        data: { students }
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const {
        name,
        phone,
        email,
        dob,
        gender,
        className,
        section,
        roll,
        admissionDate,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        currentAddress,
        permanentAddress
    } = req.body;

    const payload = {
        name,
        email,
        phone,
        dob,
        gender,
        class: className,
        section,
        roll,
        admissionDate,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        currentAddress,
        permanentAddress
    };

    const result = await addNewStudent(payload);
    return res.status(201).json({
        success: true,
        message: result.message
    });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        phone,
        email,
        dob,
        gender,
        className,
        section,
        roll,
        admissionDate,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        currentAddress,
        permanentAddress
    } = req.body;

    const payload = {
        userId: id,
        name,
        email,
        phone,
        dob,
        gender,
        class: className,
        section,
        roll,
        admissionDate,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        currentAddress,
        permanentAddress
    };

    const result = await updateStudent(payload);
    res.status(200).json({
        success: true,
        message: result.message
    });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.status(200).json({
        success: true,
        data: student
    });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const reviewerId = req.user.id; // Assuming you have user info in request

    const result = await setStudentStatus({
        userId: id,
        reviewerId,
        status
    });

    res.status(200).json({
        success: true,
        message: result.message
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
