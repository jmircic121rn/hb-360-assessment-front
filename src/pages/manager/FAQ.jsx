import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { PortalLayout } from '../../components/Layout';
import { NAV } from './ManagerPages';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      section: "GETTING STARTED",
      questions: [
        {
          q: "How do I log in?",
          a: "Go to the HB Compass portal and enter your username and password. Your credentials are provided by your HB administrator. There is no self-service registration."
        },
        {
          q: "How do I change my password?",
          a: "On the bottom-left sidebar you will find the Change Password option. You will need to enter your current password, then your new password twice. The new password must be at least 6 characters long."
        }
      ]
    },
    {
      section: "COMPANIES & EMPLOYEES",
      questions: [
        {
          q: "Where do I manage companies and employees?",
          a: "Both are managed from the same page: My Companies (sidebar → Management). Companies are listed as cards. Click the employee count on a company card to expand and see its employees, or click the campaign count to see its campaigns."
        },
        {
          q: "How do I add a new company?",
          a: "On the My Companies page, click + Add Company in the top right. Enter the company name and click Create. The company will appear immediately in the list."
        },
        {
          q: "How do I add a new employee?",
          a: "On the My Companies page, click the employee count button on a company card to expand the employee list, then click + Add Employee. Fill in First Name, Last Name, Email, Job Title, Language, and optionally Manager and Company. Email must be unique in the system."
        },
        {
          q: "Can I add a new employee during campaign creation?",
          a: "Yes. In For Individual mode on the New Campaign page, click + Add New next to the employee dropdown to create an employee record without leaving the campaign screen."
        },
        {
          q: "Can I delete an employee or company?",
          a: "Yes. Use the Delete button on the employee row or company card. Deleting an employee permanently removes their record and all associated assessment history — this cannot be undone. Deleting a company will fail if it has employees assigned to it; remove or reassign employees first."
        },
        {
          q: "How do I edit an employee's details?",
          a: "Expand the company card → employee list → click Edit next to the employee. Update any fields and save."
        }
      ]
    },
    {
      section: "CAMPAIGNS",
      questions: [
        {
          q: "What is the difference between For Individual and For Group?",
          a: "For Individual targets one employee and gives full configuration control — you select which assessment types to include (Self, Manager, Peer, Direct Reports, External) and can specify individual assessors.\n\nFor Group targets multiple employees at once. When creating a group campaign you choose between two modes:\n• Same for all — all selected employees receive the same assessment types. Efficient for straightforward team rollouts.\n• Custom per subgroup — you divide employees into subgroups, each with its own assessment type configuration. Use this when different employees in the same rollout need different assessment combinations."
        },
        {
          q: "How does the Custom per subgroup option work?",
          a: "When you select Custom per subgroup in a group campaign, you can create multiple subgroups. Each subgroup has its own employee list and its own set of assessment types. For example: one subgroup of 4 people receives Self + Manager, a second subgroup of 6 receives Self only.\n\nEach subgroup is launched as a separate campaign behind the scenes, but you set them all up in one form. Give each subgroup a clear name to tell them apart in Active Campaigns."
        },
        {
          q: "What assessment types can I include in a campaign?",
          a: "You can include any combination of:\n• Self — the employee assesses themselves\n• Manager — the employee's manager assesses them\n• Peer — colleagues assess them\n• Direct Reports — the employee's direct reports assess them\n• External — external contacts (e.g. clients) assess them\n\nEach type generates a separate assessment link sent to the relevant person.\n\nNote: if you select the Modern Employee profile, only Self Assessment is available — the other types are automatically disabled."
        },
        {
          q: "What is an Assessment Profile and which ones are available?",
          a: "The Assessment Profile determines which question set the assessors will answer. There are currently two profiles:\n\n• Inspiring Leadership — the full 360° leadership assessment. Covers four dimensions (Results, Mindset, Skills, Influence) from a leadership perspective. Supports all assessment types: Self, Manager, Peer, Direct Reports, External.\n\n• Modern Employee — an individual contributor self-assessment. Covers the same four dimensions but from an employee perspective, not a management one. Only Self Assessment is available for this profile — the other assessment types are locked out automatically when this profile is selected.\n\nIf no profile is selected, the system uses the Inspiring Leadership profile by default."
        },
        {
          q: "Can I set a deadline for a campaign?",
          a: "Yes. The deadline field is available on both the New Campaign and Edit Campaign pages. When a deadline is set, assessors receive automated reminder emails at 10, 5, 2, and 1 day(s) before the deadline."
        },
        {
          q: "Can I edit a campaign after it has been launched?",
          a: "Yes, but only while the campaign is In Progress. Open the Campaign Detail page (Active Campaigns → View) and click Edit Campaign. You can update the campaign name, deadline, and assessment type settings. Changes take effect immediately. Once a campaign is marked as Completed, editing is no longer available."
        },
        {
          q: "What is the campaign lifecycle?",
          a: "Campaigns go through three stages:\n1. In Progress — the campaign is active and assessors can submit responses.\n2. Completed — click the Complete button on the campaign row to mark it as finished. Completed campaigns remain visible in Active Campaigns alongside in-progress ones.\n3. Archived — click the Archive button on a completed campaign to move it permanently to Archived Campaigns. Only archived campaigns appear on the Archived Campaigns page."
        },
        {
          q: "How do I delete a campaign?",
          a: "On the Active Campaigns or Archived Campaigns page, click the Delete button next to the campaign. A confirmation dialog will appear before anything is removed. Deletion is permanent and removes all responses and assessment links."
        },
        {
          q: "What happens when a campaign is launched?",
          a: "Invitation emails with unique assessment links are sent immediately to all assessors at their registered email addresses. The campaign appears in Active Campaigns with a progress counter (e.g. 0/3) showing how many assessments have been completed out of the total."
        }
      ]
    },
    {
      section: "ASSESSMENTS",
      questions: [
        {
          q: "What does the assessment experience look like for the person filling it in?",
          a: "When someone opens their assessment link, they first see three introductory pages that explain the framework, the profile they are being assessed on, and how to answer honestly. After reading these, they proceed to the questions. Questions are shown one at a time and must be answered by clicking Next to advance — there is no auto-skip.\n\nThe intro pages vary by profile:\n• Inspiring Leadership profile — covers the HB Compass framework, the leadership model and five development levels, and the preparation guide.\n• Modern Employee profile — covers the HB Compass framework, the Modern Employee profile and five development levels, and the preparation guide."
        },
        {
          q: "Do external assessors need to identify themselves?",
          a: "Yes. If the assessment type is External, the assessor is prompted to enter their first name, last name, and email address before starting the assessment. This information is recorded alongside their responses."
        },
        {
          q: "Can an assessor go back to a previous question?",
          a: "Yes. The ← Previous button is always available to return to earlier questions. Answers are preserved when navigating back and forward."
        },
        {
          q: "Can someone pause and return to their assessment later?",
          a: "No — the assessment must be completed in one session. If someone closes the browser before submitting, their progress is not saved. The same link remains valid and they will need to start again."
        },
        {
          q: "What happens if the assessment link is already completed or expired?",
          a: "The system shows an appropriate message. A completed link cannot be resubmitted. An invalid or expired link shows an error — contact your HB administrator to resend or regenerate the link."
        }
      ]
    },
    {
      section: "MONITORING",
      questions: [
        {
          q: "How do I track who has completed their assessment?",
          a: "Open the Campaign Detail page (Active Campaigns → View). The Assessment Links section shows each assessor with their current status: PENDING or COMPLETED."
        },
        {
          q: "The progress counter hasn't updated. What should I do?",
          a: "Refresh the Campaign Detail page. The counter updates in real time as assessments are submitted, but your browser may be showing a cached version."
        },
        {
          q: "An assessor says they never received their link.",
          a: "First check the email address on their record — typos are the most common cause. Ask them to check their spam/junk folder. If the address was wrong, correct it and resend the link from the Campaign Detail page."
        }
      ]
    },
    {
      section: "REPORTS",
      questions: [
        {
          q: "What reports are available?",
          a: "There are two reports per campaign:\n• Self Assessment Report — generated from the self-assessment data. Shows scores, proficiency levels, and a visual profile chart across all four HB Compass dimensions.\n• AI Development Report — a personalized development report generated using AI based on the assessment results. This is released manually when you are ready to have a development conversation with the employee."
        },
        {
          q: "How do I generate and send a report?",
          a: "Open the Campaign Detail page. In the Reports section, click the relevant Generate button. For the Self Assessment Report, the report is generated and sent to the employee's email automatically. For the AI Development Report, you can preview it before sending."
        },
        {
          q: "Can I download reports as PDF?",
          a: "Yes. On the Campaign Detail page and in the Reports section, PDF download buttons are available for generated reports."
        },
        {
          q: "The report button is greyed out.",
          a: "The self-assessment must be completed before reports can be generated. Check the Assessment Links section — the Self assessment status must show COMPLETED. If it shows COMPLETED but the button is still inaccessible, refresh the page or contact HB Foundation support."
        }
      ]
    },
    {
      section: "COMMON ISSUES",
      questions: [
        {
          q: "I deleted a campaign by mistake. Can it be restored?",
          a: "No. Campaign deletion is permanent and cannot be undone. All assessment links and responses are removed. Always use the confirmation dialog carefully before confirming deletion."
        },
        {
          q: "I need to run assessments for a large group with different configurations.",
          a: "Create separate campaigns per configuration group. For example: one campaign for employees needing Self only, a separate campaign for those needing Self + Manager + Peer. Use the For Group mode within each campaign and give each campaign a clear, descriptive name."
        },
        {
          q: "A campaign shows 0 completed even though I know assessments were submitted.",
          a: "Refresh the page. If the issue persists, open the Campaign Detail and check the status of each individual assessment link. If all show COMPLETED but the counter is still 0, contact HB Foundation support."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <PortalLayout role="admin" navItems={NAV}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: '2px',
            border: '1px solid var(--ink-faint)', color: 'var(--ink-faint)',
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '20px', fontFamily: 'var(--font-body)',
          }}>
            Support Section
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '2.4rem',
            color: '#000', lineHeight: 1.1, marginBottom: '8px', fontWeight: 400,
          }}>
            HB COMPASS PORTAL — <em style={{ fontStyle: 'italic' }}>ADMINISTRATOR FAQ</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--ink-soft)', fontWeight: 400 }}>
            Quick Reference Guide | Support Section
          </p>
        </div>

        {/* FAQ Content */}
        {faqData.map((section, sIdx) => (
          <div key={sIdx} style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', 
              letterSpacing: '0.12em', color: '#666', marginBottom: '20px',
              borderBottom: '1px solid #eee', paddingBottom: '8px'
            }}>
              {section.section}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {section.questions.map((item, qIdx) => {
                const globalIdx = `${sIdx}-${qIdx}`;
                const isOpen = openIndex === globalIdx;

                return (
                  <div key={qIdx} style={{
                    background: '#fff', border: isOpen ? '1px solid #000' : '1px solid #e5e5e5', 
                    borderRadius: '4px', transition: 'all 0.2s ease'
                  }}>
                    <button
                      onClick={() => toggleFAQ(globalIdx)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', 
                        justifyContent: 'space-between', padding: '20px 24px',
                        textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: isOpen ? '#000' : '#333' }}>
                        {item.q}
                      </span>
                      {isOpen ? 
                        <ChevronUpIcon style={{ width: '18px', strokeWidth: 2.5, color: '#000' }} /> : 
                        <ChevronDownIcon style={{ width: '18px', strokeWidth: 2, color: '#999' }} />
                      }
                    </button>
                    
                    {isOpen && (
                      <div style={{ 
                        padding: '0 24px 24px', fontSize: '1rem', 
                        lineHeight: 1.7, color: '#444', whiteSpace: 'pre-line'
                      }}>
                        <div style={{ height: '1px', background: '#f5f5f5', marginBottom: '16px' }} />
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Final Footer Text */}
        <div style={{ marginTop: '64px', padding: '32px', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
            For questions not covered here, contact your <strong>HB Foundation account manager</strong> or consult the full Administrator User Guide.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
};

export default FAQ;