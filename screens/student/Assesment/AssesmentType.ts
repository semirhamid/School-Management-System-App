export interface Assessment {
  id: number;
  result: number;
  isSubmitted: boolean;
  isApproved: boolean;
  student: {
    firstName: string;
    middleName: string;
    lastName: string;
    studentId: string;
    email: string;
    username: string;
  };
  assesmentWeight: {
    id: number;
    name: string;
    weight: number;
    subject: {
      id: number;
      name: string;
      grade: {
        id: number;
        name: string;
        stream: string;
        branchName: string;
        numberOfSections: number;
      };
      section: {
        id: number;
        name: string;
        capacity: number;
        grade: {
          id: number;
          name: string;
          stream: string;
          branchName: string;
          numberOfSections: number;
        };
      };
      semester: {
        id: number;
        name: string;
        academicYear: {
          id: number;
          name: string;
          year: string;
        };
      };
      teacher: {
        firstName: string;
        middleName: string;
        lastName: string;
        userName: string;
      };
    };
    assesmentType: {
      id: number;
      name: string;
      generated: boolean;
      totalWeight: number;
    };
  };
}

export interface AssessmentReport {
  id: number;
  result: number;
  assesmentType: {
    id: number;
    name: string;
    generated: boolean;
    totalWeight: number;
    subject: {
      id: number;
      name: string;
      grade: {
        id: number;
        name: string;
        stream: string;
        branchName: string;
      };
      section: {
        id: number;
        name: string;
        capacity: number;
        grade: {
          id: number;
          name: string;
          numberOfSections: number;
          stream: string;
          branchName: string;
        };
      };
      semester: {
        id: number;
        name: string;
        academicYear: {
          id: number;
          name: string;
          year: string;
        };
      };
      teacher: {
        firstName: string;
        middleName: string;
        lastName: string;
        userName: string;
      };
    };
  };
  student: {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
  };
  assesments: [];
}

export interface Result {
  title: string;
  grade: number;
  weight: number;
  assessments: Continuous[];
  id: number;
}
export interface Continuous {
  name: string;
  weight: number;
  value: number;
}

export interface AssessmentReportCombo {
  id: number;
  result: number;
  subject: {
    id: number;
    name: string;
    grade: {
      id: number;
      name: string;
      stream: string;
      branchName: string;
    };
    section: {
      id: number;
      name: string;
      capacity: number;
      grade: {
        id: number;
        name: string;
        numberOfSections: number;
        stream: string;
        branchName: string;
      };
      success: boolean;
      error: boolean;
      message: string;
    };
    semester: {
      id: number;
      name: string;
      academicYear: {
        id: number;
        name: string;
        year: string;
      };
      success: boolean;
      error: boolean;
      message: string;
    };
    teacher: {
      firstName: string;
      middleName: string;
      lastName: string;
      userName: string;
    };
    success: boolean;
    error: boolean;
    message: string;
  };
  assessmentReports: SingleAssesmentReport[];
}

export interface SingleAssesmentReport {
  id: number;
  result: number;
  assesmentType: {
    id: number;
    name: string;
    generated: boolean;
    totalWeight: number;
    subject: {
      id: number;
      name: string;
      grade: {
        id: number;
        name: string;
        stream: string;
        branchName: string;
        numberOfSections?: number;
      };
      section: {
        id: number;
        name: string;
        capacity: number;
        grade: {
          id: number;
          name: string;
          stream: string;
          branchName: string;
          numberOfSections?: number;
        };
        success: boolean;
        error: boolean;
        message: string;
      };
      semester: {
        id: number;
        name: string;
        academicYear: {
          id: number;
          name: string;
          year: string;
        };
        success: boolean;
        error: boolean;
        message: string;
      };
      teacher: {
        firstName: string;
        middleName: string;
        lastName: string;
        userName: string;
      };
      success: boolean;
      error: boolean;
      message: string;
    };
    success?: boolean;
    error?: boolean;
    message?: string;
  };
  student: {
    firstName: string;
    middleName: string;
    lastName: string;
    userName: string;
  };
}
