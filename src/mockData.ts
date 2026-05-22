import { CVTemplate, CVData, DetectedCertificate, Job, Application } from './types';

export const mockTemplates: CVTemplate[] = [
  {
    id: 'modern-student',
    name: 'Mẫu Sinh Viên Năng Động',
    targetUser: 'Sinh viên mới tốt nghiệp hoặc đang đi thực tập',
    description: 'Bố cục sáng tạo, tập trung vào các hoạt động ngoại khóa, kỹ năng mềm và dự án thực tế.',
    accentColor: '#3B82F6', // Blue
    bgClass: 'bg-gradient-to-br from-blue-500/10 to-indigo-500/5 hover:border-blue-500'
  },
  {
    id: 'simple-worker',
    name: 'Mẫu Lao Động Tinh Gọn',
    targetUser: 'Người làm việc tự do, lao động phổ thông, dịch vụ',
    description: 'Thiết kế đơn giản, rõ ràng, làm nổi bật kinh nghiệm thực tế và thông tin liên hệ trực tiếp.',
    accentColor: '#10B981', // Emerald
    bgClass: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/5 hover:border-emerald-500'
  },
  {
    id: 'professional-office',
    name: 'Mẫu Văn Phòng Chuyên Nghiệp',
    targetUser: 'Nhân viên có kinh nghiệm, vị trí kỹ thuật & hành chính',
    description: 'Cấu trúc chỉn chu, trang nhã, tối ưu hóa các thành tựu nghề nghiệp và chứng chỉ chuyên ngành.',
    accentColor: '#6366F1', // Indigo
    bgClass: 'bg-gradient-to-br from-indigo-500/10 to-purple-500/5 hover:border-indigo-500'
  }
];

export const defaultCVData: CVData = {
  fullName: 'Nguyễn Minh Đức',
  email: 'duc.nguyen@gmail.com',
  phone: '0987 654 321',
  targetPosition: 'Frontend Developer Intern',
  summary: 'Em là sinh viên năm 3 ngành Công nghệ thông tin trường Đại học Khoa học Tự nhiên. Có niềm đam mê mãnh liệt với lập trình web Frontend, đặc biệt là React. Mong muốn tìm kiếm cơ hội thực tập học hỏi để nâng cao bản thân.',
  skills: ['React', 'Spring Boot', 'HTML/CSS', 'Javascript', 'Git'],
  experience: [
    {
      role: 'Thành viên CLB Tin học - Ban Kỹ thuật',
      company: 'Trường ĐH Khoa học Tự nhiên',
      duration: '09/2024 - Hiện tại',
      achievements: [
        'Xây dựng giao diện trang web đăng ký sự kiện của CLB',
        'Hỗ trợ kỹ thuật cho các cuộc thi lập trình cấp trường',
      ]
    },
    {
      role: 'Dự án Cá nhân: Web Quản Lý Chi Tiêu',
      company: 'Dự án học tập cá nhân',
      duration: '11/2025 - 02/2026',
      achievements: [
        'Sử dụng React, TailwindCSS cho frontend',
        'Xây dựng các biểu đồ thống kê đơn giản dạng cột'
      ]
    }
  ],
  certificates: [],
  score: 82,
  isOptimized: false
};

export const mockDetectedCertificates: DetectedCertificate[] = [
  {
    id: 'cert-1',
    name: 'Google UX Design Professional Certificate',
    issuer: 'Google (Coursera)',
    year: '2025',
    status: 'detected'
  },
  {
    id: 'cert-2',
    name: 'IELTS Academic - Band 6.5',
    issuer: 'IDP Education',
    year: '2024',
    status: 'detected'
  },
  {
    id: 'cert-3',
    name: 'Java Spring Boot Development Basic',
    issuer: 'FPT Software Academy',
    year: '2025',
    status: 'detected'
  }
];

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Intern (ReactJS)',
    company: 'TechNova Solution Co.',
    salary: '4.000.000 - 6.000.000 VNĐ',
    location: 'Quận 3, TP. Hồ Chí Minh',
    type: 'Thực tập / Fulltime / Offline',
    matchScore: 94,
    matchedSkills: ['React', 'HTML/CSS', 'Javascript', 'Git'],
    missingSkills: ['Typescript', 'Teamwork'],
    applied: false
  },
  {
    id: 'job-2',
    title: 'Java Backend Fresher',
    company: 'CodeHub Ecosystem',
    salary: '8.000.000 - 12.000.000 VNĐ',
    location: 'Quận Cầu Giấy, Hà Nội',
    type: 'Toàn thời gian / Offline',
    matchScore: 88,
    matchedSkills: ['Spring Boot', 'Git'],
    missingSkills: ['SQL Server', 'RESTful API Basic'],
    applied: false
  },
  {
    id: 'job-3',
    title: 'UI/UX Design Intern',
    company: 'Designly Agency',
    salary: '3.500.000 - 5.000.000 VNĐ',
    location: 'Quận Bình Thạnh, TP. Hồ Chí Minh',
    type: 'Thực tập / Hybrid',
    matchScore: 81,
    matchedSkills: ['Google UX Design Certificate'],
    missingSkills: ['Figma Mastery', 'Communication'],
    applied: false
  },
  {
    id: 'job-4',
    title: 'Sales Online Part-time',
    company: 'Zalo Shop Partner Network',
    salary: '3.000.000 - 5.000.000 VNĐ + Hoa hồng',
    location: 'Làm việc từ xa (Remote)',
    type: 'Bán thời gian / Online',
    matchScore: 76,
    matchedSkills: [],
    missingSkills: ['Sales Skills', 'Customer Support', 'Communication'],
    applied: false
  }
];

export const mockInitialApplications: Application[] = [
  {
    id: 'app-demo-1',
    jobId: 'job-1',
    jobTitle: 'Frontend Intern (ReactJS)',
    company: 'TechNova Solution Co.',
    salary: '4.000.000 - 6.000.000 VNĐ',
    status: 'interview',
    appliedDate: '15/05/2026',
    timeline: [
      {
        status: 'applied',
        label: 'Đã nộp hồ sơ thành công',
        description: 'Hồ sơ CV của bạn đã được chuyển đến hệ thống tuyển dụng TechNova.',
        time: '15/05/2026 09:30',
        completed: true
      },
      {
        status: 'viewed',
        label: 'Nhà tuyển dụng đã xem CV',
        description: 'CV của bạn đạt số điểm phù hợp cao, phòng HR đã xem chi tiết hồ sơ.',
        time: '16/05/2026 14:15',
        completed: true
      },
      {
        status: 'interview',
        label: 'Lời mời phỏng vấn',
        description: 'Phỏng vấn kỹ thuật online qua Zalo Meet vào lúc 10:00 ngày 25/05/2026.',
        time: '18/05/2026 10:00',
        completed: true
      },
      {
        status: 'rejected',
        label: 'Hoàn thành khảo sát ứng viên',
        description: 'Đang xếp lịch và phản hồi kết quả.',
        time: 'Chờ cập nhật',
        completed: false
      }
    ]
  },
  {
    id: 'app-demo-2',
    jobId: 'job-3',
    jobTitle: 'UI/UX Design Intern',
    company: 'Designly Agency',
    salary: '3.500.000 - 5.000.000 VNĐ',
    status: 'applied',
    appliedDate: '20/05/2026',
    timeline: [
      {
        status: 'applied',
        label: 'Đã nộp hồ sơ thành công',
        description: 'Ứng tuyển qua cổng CVConnect AI trên Zalo.',
        time: '20/05/2026 16:45',
        completed: true
      },
      {
        status: 'viewed',
        label: 'Sàng lọc hồ sơ sơ bộ',
        description: 'Hệ thống AI tự động phân loại kỹ năng đạt chuẩn 81%.',
        time: '21/05/2026 08:30',
        completed: false
      }
    ]
  }
];
