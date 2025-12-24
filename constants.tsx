
import React from 'react';
import { SlideData } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Student Attendance Management System (SAMS)",
    subtitle: "Project Proposal using Agile Methodology",
    type: 'title',
    content: {
      course: "Software Project Management",
      presenter: "[Your Name / Group Name]",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tags: ["Agile", "Digitalization", "Automation"]
    }
  },
  {
    id: 2,
    title: "Project Initiation",
    type: 'grid',
    content: {
      sections: [
        {
          title: "What is SAMS?",
          items: ["A digital system to track and manage student attendance efficiently."]
        },
        {
          title: "Problem Statement",
          items: [
            "Manual tracking is slow & error-prone",
            "Complex permission request process",
            "Limited real-time visibility for teachers"
          ]
        },
        {
          title: "Project Goals",
          items: [
            "Automate recording",
            "Real-time dashboards",
            "Online permission workflows"
          ]
        },
        {
          title: "Key Stakeholders",
          items: ["Teachers/Admins", "Students", "Academic Office"]
        }
      ]
    }
  },
  {
    id: 3,
    title: "Project Scope",
    type: 'split',
    content: {
      left: {
        title: "In-Scope (Features)",
        groups: [
          {
            label: "Admin / Teacher",
            items: ["User Auth", "Add Students/Classes", "Daily Attendance", "Dashboard & Reports", "Approve/Reject Requests"]
          },
          {
            label: "Student",
            items: ["Unique ID Login", "View Attendance", "Submit Permission Request"]
          }
        ]
      },
      right: {
        title: "Out-of-Scope",
        items: [
          "Payment Integration",
          "Advanced Analytics/AI",
          "Mobile App (Web-only)",
          "Legacy Data Import"
        ]
      }
    }
  },
  {
    id: 4,
    title: "Agile Model & Sprint Plan",
    type: 'table',
    content: {
      description: "Why Agile? Flexibility, regular feedback, and iterative delivery of working software.",
      headers: ["Sprint", "Duration", "Focus Area"],
      rows: [
        ["Sprint 1", "2 Weeks", "Auth & Admin Panel"],
        ["Sprint 2", "2 Weeks", "Student Module & Permissions"],
        ["Sprint 3", "2 Weeks", "Attendance & Dashboards"],
        ["Sprint 4", "2 Weeks", "Reporting & Final Testing"]
      ],
      tools: ["Trello/Jira", "GitHub", "Weekly Scrum"]
    }
  },
  {
    id: 5,
    title: "System Workflow",
    type: 'workflow',
    content: {
      steps: [
        "Teacher Logs In",
        "Add Students",
        "Auto-ID Generation",
        "Student Login",
        "Permission Request",
        "Teacher Review",
        "Daily Attendance",
        "Real-time Reports"
      ]
    }
  },
  {
    id: 6,
    title: "Budget & Time Management",
    type: 'grid',
    content: {
      sections: [
        {
          title: "Budget",
          items: ["Tools: Open-Source (Free)", "Hosting: Vercel/Heroku (Free Tier)", "Total Cost: $0 (Academic)"]
        },
        {
          title: "Timeline",
          items: ["8 Weeks Duration", "4 x 2-Week Sprints", "1 Week Buffer for QA"]
        },
        {
          title: "Team Roles",
          items: ["Project Manager", "Developers (Frontend/Backend)", "Testers / QA", "Documentation Lead"]
        }
      ]
    }
  },
  {
    id: 7,
    title: "Project Risks & Mitigation",
    type: 'table',
    content: {
      headers: ["Risk", "Mitigation Strategy"],
      rows: [
        ["Sprint Delivery Delay", "Regular stand-ups & prioritization"],
        ["Login Security", "Strong encryption & rigorous testing"],
        ["Low User Adoption", "Simple UI/UX & teacher training"],
        ["Data Loss", "Regular database backups"]
      ]
    }
  },
  {
    id: 8,
    title: "Execution & Control",
    type: 'grid',
    content: {
      sections: [
        {
          title: "Approach",
          items: ["Iterative Development", "Peer Feedback Cycles", "End-of-Sprint Demos"]
        },
        {
          title: "Quality Control",
          items: ["Module Unit Testing", "User Acceptance (UAT)", "Multi-user Performance"]
        },
        {
          title: "Change Mgmt",
          items: ["Backlog Feature Requests", "Approved Sprint Planning"]
        }
      ]
    }
  },
  {
    id: 9,
    title: "Project Conclusion",
    type: 'content',
    content: {
      outcomes: [
        "Fully functional web attendance system",
        "Reduced manual workload for staff",
        "Increased transparency for students"
      ],
      future: [
        "Email/Push Notifications",
        "Dedicated Mobile App",
        "Timetable Integration"
      ],
      closing: "Thank You! Questions?"
    }
  }
];
