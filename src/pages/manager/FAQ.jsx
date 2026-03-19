import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { PortalLayout } from '../../components/Layout'; 

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Navigacija - prilagodi putanje ako su drugačije
  const managerNav = [
    { group: 'My Campaigns', href: '/manager/dashboard', icon: '📊', label: 'Active Campaigns' },
    { group: 'My Campaigns', href: '/manager/archived', icon: '🗂️', label: 'Archived Campaigns' },
    { group: 'My Campaigns', href: '/manager/campaigns/new', icon: '➕', label: 'New Campaign' },
  { group: 'Management', href: '/manager/companies', icon: '🏢', label: 'My Companies' },
    { group: 'Support', href: '/faq', icon: '❓', label: 'FAQ' },
  ];

  const faqData = [
    {
      section: "GETTING STARTED",
      questions: [
        { q: "How do I log in for the first time?", a: "You will receive an invitation email with a link to set your password. Click the link, create your password, and use your email + password to sign in from that point forward." },
        { q: "I forgot my password. What do I do?", a: "Use the password reset option on the login screen. A reset link will be sent to your registered email address." },
        { q: "I can see fewer companies or employees than I expect. Why?", a: "Your access depends on your role. Company Admins see only their assigned company. Super Admins see everything. If you believe your access level is incorrect, contact your HB Foundation account manager." }
      ]
    },
    {
      section: "EMPLOYEES",
      questions: [
        { q: "How do I add a new employee?", a: "Go to Employees → + Add New Employee. Fill in First Name, Last Name, Email, Company, and Job Title. Email must be unique in the system." },
        { q: "Can I add an employee directly during campaign creation?", a: "Yes. In For Individual mode, click + Add New next to the employee dropdown to create a record without leaving the campaign screen." },
        { q: "What should I put in the Job Title field?", a: "Until role-specific fields are available, include the role type in the title — for example \"Sales / Senior Account Manager\" or \"Leader / Regional Director\". This helps the system apply the correct contextual language to assessments and reports." },
        { q: "Why should I enter the Manager field even if it's just free text?", a: "When multi-assessor reports launch, managers will need to be linked as actual employee records. Entering names now means your data will be ready when that feature becomes available." },
        { q: "Can I delete an employee?", a: "Yes, but be aware this permanently removes the employee and all their assessment history and reports. This cannot be undone. Only delete when you are certain the record is no longer needed." }
      ]
    },
    {
      section: "CAMPAIGNS",
      questions: [
        { q: "What is the difference between For Individual and For Group?", a: "For Individual targets one employee and allows full configuration control. For Group targets multiple employees at once — efficient for team or cohort rollouts, but currently applies the same Assessment Profile and Types to all selected employees." },
        { q: "The campaign name auto-fills as \"HB Compass Campaign 1\". Should I change it?", a: "Always change it to something descriptive before launching. The Dashboard currently shows employee names but not campaign names in the list view — a meaningful name is your primary reference when you open a specific campaign. Example: \"Sales Team — Q1 2026\" or \"Sandra Mirčić — Full 360 — March 2026\"." },
        { q: "Can I run different assessment types for different employees in one group campaign?", a: "Not yet. Currently the same Assessment Types apply to all employees in Group mode. If you need different configurations, create separate campaigns per group. Per-employee overrides are planned for a future release." },
        { q: "Can I save a campaign and finish setting it up later?", a: "Not currently — campaign configuration must be completed in one session. Save as draft functionality is planned." },
        { q: "I launched a campaign but forgot to include a Manager Review. Can I add it?", a: "Yes. Open the Campaign Detail page → Edit Campaign → add the Manager Review type → save. A new invitation link will be generated and sent automatically." },
        { q: "What happens the moment I click Launch?", a: "Invitation emails are sent immediately to all respondents at their registered email addresses. The campaign appears on your Dashboard as IN_PROGRESS with a 0/[total] progress counter." }
      ]
    },
    {
      section: "ASSESSMENT PROFILES",
      questions: [
        { q: "Which Assessment Profile should I choose?", a: "Currently only the Default Profile is available. It covers all four HB Compass dimensions and is suitable for most roles. Role-specific profiles (Leader, Manager, Sales, Service, Agent, Specialist) are in development." },
        { q: "What is the difference between Assessment Profile and Assessment Type?", a: "Assessment Profile defines what is assessed — the question set and competencies covered. Assessment Type defines who is doing the assessing — Self, Manager, Peer, Direct Report, External, or Custom. They are separate settings configured independently." },
        { q: "What does Sales/Service adaptation mean?", a: "Even on the same profile, the platform automatically adjusts question scenarios and report language based on whether the employee's role is Sales or Service. Sales employees see scenarios involving clients, deals, and pipelines. Service employees see the same competencies framed through customer support and issue resolution. No action is needed from you — it activates from the Job Role field." }
      ]
    },
    {
      section: "MONITORING",
      questions: [
        { q: "I have two campaigns for the same employee and they look identical on the Dashboard. How do I tell them apart?", a: "Use the Progress column (e.g., 0/1 vs. 0/2) and the Started date as first indicators. Then click View on each to open the Campaign Detail and confirm by campaign name and assessment types included. Campaign name display in the Dashboard table is a planned improvement." },
        { q: "How do I know if someone has completed their assessment?", a: "Open Campaign Detail (Dashboard → View). In the Assessment Links section, each row shows PENDING or COMPLETED status for each respondent." },
        { q: "The system doesn't send reminders. How do I follow up?", a: "Automated reminders are planned but not yet available. Follow up directly with pending respondents by email or message. A quick note works well: \"The HB Compass link was sent to your inbox — if you cannot find it, let me know and I will resend it. Deadline is [Date]. Thank you.\"" },
        { q: "How do I mark a campaign as complete?", a: "When all assessments are submitted, the system will prompt you: \"All assessments submitted — ready to mark this campaign as complete?\" Click Mark Complete to confirm. You can also do this manually at any time from the Campaign Detail page. Do not mark complete until you are ready to support the development conversation — this is the moment the Personal Development Plan becomes ready to release." }
      ]
    },
    {
      section: "REPORTS",
      questions: [
        { q: "What is the difference between the two reports?", a: "There are two distinct reports:\n• Self Assessment Report (Short) — generated and sent automatically to the employee the moment they submit their self-assessment. Contains straight results: scores, proficiency levels, and a visual profile chart.\n• Personal Development Plan (Long) — a full 90-day personalized development roadmap. This is released manually by the administrator or direct manager at the right moment, and should always be accompanied by a development conversation." },
        { q: "The employee already received a report automatically. Do I still need to release the Personal Development Plan?", a: "Yes. The auto-sent Short Report gives the employee their results immediately. The Personal Development Plan is a separate, much deeper document that you release when you are ready to have a development conversation with them. They are two different outputs serving different purposes." },
        { q: "When should I release the Personal Development Plan?", a: "Release it no more than a week before a scheduled development conversation. The report is most effective when the employee can immediately discuss it with someone who has read it. Do not release it into a vacuum." },
        { q: "Can the employee's manager also release the Personal Development Plan?", a: "Yes. Both the Administrator and the Direct Manager can release the Personal Development Plan to the employee." },
        { q: "The report buttons are greyed out even though I think the assessment is done.", a: "Refresh the page first. Then check the Assessment Links section — the status must show COMPLETED, not PENDING. If it shows COMPLETED but reports are still inaccessible, contact HB Foundation support." },
        { q: "Are there 360-degree / multi-assessor reports available?", a: "Not yet. Multi-assessor consolidated reports (combining Self, Manager, Peer, Direct Reports, and External data) are in development. Reports currently use self-assessment data only. You can include additional assessment types in campaigns now — the data will feed into consolidated reports when the feature launches." }
      ]
    },
    {
      section: "COMMON ISSUES",
      questions: [
        { q: "An employee says they never received their assessment link.", a: "Check their email address in the employee record — typos are the most common cause. Ask them to check spam/junk. If the address is wrong, edit it in the Employees section and resend the link." },
        { q: "I accidentally launched the wrong campaign.", a: "Contact your HB Foundation account manager for guidance. There is no self-service campaign cancellation currently documented." },
        { q: "I need to run assessments for a large group with different configurations. What's the best approach?", a: "Group employees by configuration type and create one campaign per group. For example: one campaign for employees needing Default Profile + Self only, a separate campaign for those needing Default Profile + Self + Manager. Use clear campaign names to keep them organized." }
      ]
    }
  ];

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <PortalLayout role="admin" navItems={managerNav}>
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