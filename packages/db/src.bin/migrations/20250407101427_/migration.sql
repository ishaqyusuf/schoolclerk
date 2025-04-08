-- CreateTable
CREATE TABLE "WhatIsGoingOn" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WhatIsGoingOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaasAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT,
    "slug" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),

    CONSTRAINT "SaasAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNo" TEXT,
    "role" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "saasAccountId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassRoom" (
    "id" TEXT NOT NULL,
    "schoolProfileId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),

    CONSTRAINT "ClassRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassRoomDepartment" (
    "id" TEXT NOT NULL,
    "departmentName" TEXT,
    "classRoomsId" TEXT,
    "schoolProfileId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),

    CONSTRAINT "ClassRoomDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentSubject" (
    "id" TEXT NOT NULL,
    "classRoomDepartmentId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "sessionTermId" TEXT,

    CONSTRAINT "DepartmentSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "schoolProfileId" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "data" JSONB,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "SchoolProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subDomain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),

    CONSTRAINT "SchoolProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "SchoolSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionTerm" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),

    CONSTRAINT "SessionTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffProfile" (
    "id" TEXT NOT NULL,
    "schoolProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),

    CONSTRAINT "StaffProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffSubject" (
    "id" TEXT NOT NULL,
    "staffProfilesId" TEXT,
    "departmentSubjectId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),

    CONSTRAINT "StaffSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassRoomAttendance" (
    "id" TEXT NOT NULL,
    "attendanceTitle" TEXT NOT NULL,
    "schoolProfileId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "departmentId" TEXT,
    "staffProfileId" TEXT,

    CONSTRAINT "ClassRoomAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAttendance" (
    "id" TEXT NOT NULL,
    "isPresent" BOOLEAN DEFAULT false,
    "comment" TEXT,
    "schoolProfileId" TEXT,
    "studentTermFormId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "classroomAttendanceId" TEXT,
    "departmentId" TEXT,

    CONSTRAINT "StudentAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billable" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "schoolProfileId" TEXT,

    CONSTRAINT "Billable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillablePriceHistory" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "billableId" TEXT,

    CONSTRAINT "BillablePriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentTermBillable" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "billablesPriceId" TEXT,
    "sessionTermId" TEXT,
    "schoolSessionId" TEXT,

    CONSTRAINT "DepartmentTermBillable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentBillable" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "billablePriceId" TEXT,
    "schoolProfileId" TEXT,
    "studentTermFormId" TEXT,
    "schoolSessionId" TEXT,

    CONSTRAINT "StudentBillable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentBillPaymentReceipt" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "studentBillPaymentsId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "studentTermFormId" TEXT,
    "schoolProfileId" TEXT,

    CONSTRAINT "StudentBillPaymentReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "otherName" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "schoolProfileId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSessionForm" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "schoolSessionId" TEXT,
    "schoolProfileId" TEXT,

    CONSTRAINT "StudentSessionForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTermForm" (
    "id" TEXT NOT NULL,
    "schoolProfileId" TEXT,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(0),
    "sessionTermId" TEXT,
    "schoolSessionId" TEXT,

    CONSTRAINT "StudentTermForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassRoomDepartmentToDepartmentTermBillable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassRoomDepartmentToDepartmentTermBillable_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_id_key" ON "Posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolProfile_subDomain_key" ON "SchoolProfile"("subDomain");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolProfile_name_subDomain_deletedAt_key" ON "SchoolProfile"("name", "subDomain", "deletedAt");

-- CreateIndex
CREATE INDEX "_ClassRoomDepartmentToDepartmentTermBillable_B_index" ON "_ClassRoomDepartmentToDepartmentTermBillable"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_saasAccountId_fkey" FOREIGN KEY ("saasAccountId") REFERENCES "SaasAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoomDepartment" ADD CONSTRAINT "ClassRoomDepartment_classRoomsId_fkey" FOREIGN KEY ("classRoomsId") REFERENCES "ClassRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoomDepartment" ADD CONSTRAINT "ClassRoomDepartment_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentSubject" ADD CONSTRAINT "DepartmentSubject_classRoomDepartmentId_fkey" FOREIGN KEY ("classRoomDepartmentId") REFERENCES "ClassRoomDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentSubject" ADD CONSTRAINT "DepartmentSubject_sessionTermId_fkey" FOREIGN KEY ("sessionTermId") REFERENCES "SessionTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolProfile" ADD CONSTRAINT "SchoolProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "SaasAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolSession" ADD CONSTRAINT "SchoolSession_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionTerm" ADD CONSTRAINT "SessionTerm_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionTerm" ADD CONSTRAINT "SessionTerm_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SchoolSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffProfile" ADD CONSTRAINT "StaffProfile_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffSubject" ADD CONSTRAINT "StaffSubject_staffProfilesId_fkey" FOREIGN KEY ("staffProfilesId") REFERENCES "StaffProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffSubject" ADD CONSTRAINT "StaffSubject_departmentSubjectId_fkey" FOREIGN KEY ("departmentSubjectId") REFERENCES "DepartmentSubject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoomAttendance" ADD CONSTRAINT "ClassRoomAttendance_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoomAttendance" ADD CONSTRAINT "ClassRoomAttendance_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "ClassRoomDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoomAttendance" ADD CONSTRAINT "ClassRoomAttendance_staffProfileId_fkey" FOREIGN KEY ("staffProfileId") REFERENCES "StaffProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAttendance" ADD CONSTRAINT "StudentAttendance_studentTermFormId_fkey" FOREIGN KEY ("studentTermFormId") REFERENCES "StudentTermForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAttendance" ADD CONSTRAINT "StudentAttendance_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAttendance" ADD CONSTRAINT "StudentAttendance_classroomAttendanceId_fkey" FOREIGN KEY ("classroomAttendanceId") REFERENCES "ClassRoomAttendance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAttendance" ADD CONSTRAINT "StudentAttendance_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "ClassRoomDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billable" ADD CONSTRAINT "Billable_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillablePriceHistory" ADD CONSTRAINT "BillablePriceHistory_billableId_fkey" FOREIGN KEY ("billableId") REFERENCES "Billable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentTermBillable" ADD CONSTRAINT "DepartmentTermBillable_billablesPriceId_fkey" FOREIGN KEY ("billablesPriceId") REFERENCES "BillablePriceHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentTermBillable" ADD CONSTRAINT "DepartmentTermBillable_sessionTermId_fkey" FOREIGN KEY ("sessionTermId") REFERENCES "SessionTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentTermBillable" ADD CONSTRAINT "DepartmentTermBillable_schoolSessionId_fkey" FOREIGN KEY ("schoolSessionId") REFERENCES "SchoolSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentBillable" ADD CONSTRAINT "StudentBillable_billablePriceId_fkey" FOREIGN KEY ("billablePriceId") REFERENCES "BillablePriceHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentBillable" ADD CONSTRAINT "StudentBillable_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentBillable" ADD CONSTRAINT "StudentBillable_studentTermFormId_fkey" FOREIGN KEY ("studentTermFormId") REFERENCES "StudentTermForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentBillable" ADD CONSTRAINT "StudentBillable_schoolSessionId_fkey" FOREIGN KEY ("schoolSessionId") REFERENCES "SchoolSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentBillPaymentReceipt" ADD CONSTRAINT "StudentBillPaymentReceipt_studentBillPaymentsId_fkey" FOREIGN KEY ("studentBillPaymentsId") REFERENCES "StudentBillable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentBillPaymentReceipt" ADD CONSTRAINT "StudentBillPaymentReceipt_studentTermFormId_fkey" FOREIGN KEY ("studentTermFormId") REFERENCES "StudentTermForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentBillPaymentReceipt" ADD CONSTRAINT "StudentBillPaymentReceipt_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionForm" ADD CONSTRAINT "StudentSessionForm_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionForm" ADD CONSTRAINT "StudentSessionForm_schoolSessionId_fkey" FOREIGN KEY ("schoolSessionId") REFERENCES "SchoolSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSessionForm" ADD CONSTRAINT "StudentSessionForm_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTermForm" ADD CONSTRAINT "StudentTermForm_schoolProfileId_fkey" FOREIGN KEY ("schoolProfileId") REFERENCES "SchoolProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTermForm" ADD CONSTRAINT "StudentTermForm_sessionTermId_fkey" FOREIGN KEY ("sessionTermId") REFERENCES "SessionTerm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTermForm" ADD CONSTRAINT "StudentTermForm_schoolSessionId_fkey" FOREIGN KEY ("schoolSessionId") REFERENCES "SchoolSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassRoomDepartmentToDepartmentTermBillable" ADD CONSTRAINT "_ClassRoomDepartmentToDepartmentTermBillable_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassRoomDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassRoomDepartmentToDepartmentTermBillable" ADD CONSTRAINT "_ClassRoomDepartmentToDepartmentTermBillable_B_fkey" FOREIGN KEY ("B") REFERENCES "DepartmentTermBillable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
