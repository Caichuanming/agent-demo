import { Injectable } from "@nestjs/common";

import type { Doctor, DoctorDepartment, GetDoctorArgs } from "@project/shared";

@Injectable()
export class DoctorDomainService {
  async findDoctor(args: GetDoctorArgs): Promise<Doctor> {
    const department = this.normalizeDepartment(args.department);

    return {
      id: "doctor_mock_1",
      name: args.doctorName ?? "李医生",
      title: "副主任医师",
      department,
      hospital: "示例医院",
      available: true
    };
  }

  private normalizeDepartment(raw?: string): DoctorDepartment {
    switch (raw) {
      case "内科":
        return "internal_medicine";
      case "外科":
        return "surgery";
      case "儿科":
        return "pediatrics";
      case "皮肤科":
        return "dermatology";
      case "神经科":
        return "neurology";
      default:
        return "general";
    }
  }
}
