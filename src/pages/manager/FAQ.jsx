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
        },
        {
          q: "What is the recommended workflow for a new organisation?",
          a: "The recommended order is:\n1. Review the HB Ideal Profiles to understand which profile fits each role in the organisation.\n2. Add the company under My Companies and assign the relevant profiles to it.\n3. Add employees, setting their job title and manager.\n4. Create a campaign — select the profile that matches the employee's role, configure assessment types, and set a deadline.\n\nStarting with profiles ensures every campaign is benchmarked against the right standard from the outset."
        }
      ]
    },
    {
      section: "HB IDEAL PROFILES",
      questions: [
        {
          q: "What is an HB Ideal Profile?",
          a: "An HB Ideal Profile is a competency framework that defines what excellent performance looks like for a specific role. Each profile is structured into four dimensions — Results, Mindset, Skills, and Influence — each containing pillars and facets, with five proficiency levels per facet.\n\nProfiles serve as the benchmark against which employees are assessed in 360° campaigns."
        },
        {
          q: "What are the four dimensions?",
          a: "Every HB Ideal Profile evaluates people across four interconnected dimensions:\n• Results — achieving goals, managing performance, and driving meaningful outcomes.\n• Mindset — self-awareness, growth orientation, and resilience under pressure.\n• Skills — communication, personal effectiveness, and collaborative working.\n• Influence — inspiring action, building trust, and shaping team culture.\n\nDimensions are always displayed in this order within the platform."
        },
        {
          q: "What are pillars and facets?",
          a: "Within each dimension, competencies are grouped into pillars — broad capability areas. Each pillar contains one or more facets, which are the specific, observable behaviours being assessed.\n\nEach facet has five proficiency levels (typically Level 1 through Level 5) with a written description of what that level of performance looks like in practice."
        },
        {
          q: "What profiles are currently available?",
          a: "You can browse all available profiles on the My Ideal Profiles page (sidebar → HB Ideal Profiles). Each profile is shown with its full structure — dimensions, pillars, facets, and level descriptions.\n\nProfiles include options such as the Inspiring Leadership profile for managers and team leads, and the Modern Employee profile for individual contributors. Custom profiles may also be available depending on your organisation's setup."
        },
        {
          q: "How do profiles connect to campaigns?",
          a: "When creating a campaign, you select an ideal profile for the employee being assessed. The profile determines:\n• Which question set assessors answer.\n• Which assessment types are available (Self, Manager, Peer, etc.).\n\nOnly profiles assigned to the selected company appear in the campaign form. Selecting the right profile is essential — it sets the benchmark for all scores and reports generated from that campaign."
        },
        {
          q: "What is a Custom Ideal Profile?",
          a: "A Custom Ideal Profile is a bespoke profile built specifically for a role or organisation that falls outside the standard HB profiles. It allows you to define the exact competency levels that represent excellent performance for that specific context.\n\nThe Create New Ideal Profile page is accessible from the sidebar (HB Ideal Profiles → Create New Ideal Profile), but this feature is currently being built and is not yet fully functional. Contact your HB Foundation account manager to discuss bespoke profiling needs in the meantime."
        }
      ]
    },
    {
      section: "COMPANIES & EMPLOYEES",
      questions: [
        {
          q: "Where do I manage companies and employees?",
          a: "Go to My Companies (sidebar → Management). The page uses a two-panel layout: the left panel lists all companies; clicking a company opens its detail in the right panel. The detail panel shows the company's assigned profiles, stats (employee count, campaign count), and a tab switcher between the Employees and Campaigns tabs."
        },
        {
          q: "How do I add a new company?",
          a: "On the My Companies page, click + Add Company at the bottom of the left panel. Enter the company name, optionally select one or more assessment profiles to assign, and click Create. The company will appear immediately in the list."
        },
        {
          q: "How do I assign or change profiles for a company?",
          a: "Select the company in the left panel to open its detail. In the Profiles section of the header, existing profiles appear as pills. To add a profile, click + Add Profile, select from the dropdown, and click Add. To remove a profile, click the ✕ on its pill.\n\nAssigning profiles to a company controls which profiles are available when creating a campaign for that company's employees."
        },
        {
          q: "How do I add a new employee?",
          a: "Select a company to open its detail, go to the Employees tab, and click + Add Employee. Fill in First Name, Last Name, Email, Job Title, and optionally Manager. Email must be unique in the system.\n\nThe Language field sets the language in which the employee receives assessment invitation emails and sees the assessment interface. Available options are English, Serbian, German, French, and Spanish. If unsure, select English."
        },
        {
          q: "Is there a way to see all employees across all companies in one place?",
          a: "Yes. The Employees page (sidebar → Management → Employees) gives you a single view of every employee across all companies. From here you can search by name, view individual profiles, see each person's campaign history, and download their generated reports.\n\nFor adding or editing employees, go to My Companies and select the relevant company."
        },
        {
          q: "Can I add a new employee during campaign creation?",
          a: "Yes. In For Individual mode on the New Campaign page, click + Add New next to the employee dropdown to create an employee record without leaving the campaign screen."
        },
        {
          q: "Can I delete an employee or company?",
          a: "Yes. In the company detail Employees tab, use the Delete option on the employee row. In the left panel, use the Delete option on the company. Deleting an employee permanently removes their record and all associated assessment history — this cannot be undone. Deleting a company will fail if it has employees assigned to it; remove or reassign employees first."
        },
        {
          q: "How do I edit an employee's details?",
          a: "Select the company → Employees tab → click Edit on the employee row. Update any fields and save."
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
          a: "The available assessment types depend entirely on which profile is selected. Each profile has questions in the database for specific types only — the campaign form shows only the types that are actually available for that profile, so the selection will vary.\n\nTypes cover the following perspectives:\n• Self — the employee assesses themselves.\n• Manager — their direct manager provides feedback.\n• Peer — a colleague at the same level.\n• Direct Reports — someone who reports to the employee.\n• External — a contact outside the organisation (prompted to enter their name and email before starting).\n• Cross-Partisan — feedback from someone in a different team or function.\n• Mentor — feedback from a mentor or coach.\n\nEach type generates a separate assessment link sent to the relevant person. To see which types are available for a specific profile, select the company and profile in the New Campaign form — the options will appear automatically."
        },
        {
          q: "Which profile should I select for a campaign?",
          a: "Select the profile that matches the employee's role:\n• Inspiring Leadership profile — for managers, team leads, and people in leadership positions.\n• Modern Employee profile — for individual contributors and professionals.\n• Custom profiles — if your organisation has bespoke profiles, they will appear here too.\n\nOnly profiles assigned to the selected company are shown. If a profile you expect is missing, check that it has been assigned to the company on the My Companies page.\n\nChoosing the right profile is important — it determines the question set, the available assessment types, and the benchmark used in all generated reports."
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
          a: "When someone opens their assessment link, they first see three introductory pages that explain the framework, the profile they are being assessed on, and how to answer honestly. After reading each page they click Continue; the page always returns to the top on navigation. After the intro, they proceed to the questions one at a time.\n\nQuestions and answer options are presented in a randomised order — the letters A, B, C do not correspond to low, mid, or high scores. There is no auto-advance; the assessor clicks Next or ← Previous to navigate.\n\nThe intro pages vary by profile:\n• Inspiring Leadership profile — covers the HB Compass framework, the leadership model and five development levels, and the preparation guide.\n• Modern Employee profile — covers the HB Compass framework, the Modern Employee profile and five development levels, and the preparation guide."
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
          a: "Use the For Group campaign mode with the Custom per subgroup option. This lets you divide employees into subgroups within a single campaign form — each subgroup can have its own profile and its own set of assessment types.\n\nFor example: one subgroup of 4 people assessed on the Leadership profile with Self + Manager, a second subgroup of 6 on the Employee profile with Self only. All subgroups are set up together and launched at the same time, then appear grouped in Active Campaigns."
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