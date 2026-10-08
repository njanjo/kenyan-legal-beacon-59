import type { BlankTemplateInput } from "./lawFirmLetterhead";

const NOTICE =
  "Complete this form in BLOCK letters using black ink. Attach a copy of your National ID or Passport where requested. " +
  "Return the signed form to our office, by email, or submit it online. Unsigned forms cannot be acted upon.";

const SUBMIT_STEPS = [
  "Complete all sections in BLOCK letters using black ink and tick boxes with an X.",
  "Write N/A in any field that does not apply to you instead of leaving it blank.",
  "Sign and date the form, then return it to Equity Plaza, 4th Floor Wing B Room 420, Thika, or email it to mwauramurokiadvocates@gmail.com.",
];

export interface BlankTemplateSpec extends BlankTemplateInput {
  filename: string;
}

export const BLANK_TEMPLATES: BlankTemplateSpec[] = [
  {
    title: "Legal Consultation Form",
    formCode: "MMA-F-CONS-01",
    filename: "legal-consultation-form-template.pdf",
    instructions: SUBMIT_STEPS,
    sections: [
      {
        heading: "Client Details",
        fields: [
          { label: "Full Name" },
          { label: "Email Address" },
          { label: "Phone Number" },
          { label: "Preferred Consultation Date" },
        ],
      },
      {
        heading: "Legal Matter Description",
        fields: [{ label: "Describe your legal matter (facts, dates and parties involved)", lines: 6 }],
      },
      {
        heading: "Urgency Level",
        fields: [{ label: "How urgent is this matter? (tick one)", checkboxOptions: ["Low", "Medium", "High"] }],
      },
    ],
    signatories: [{ role: "Client", caption: "Client signature & date" }],
    notice: NOTICE,
  },
  {
    title: "Client Information Sheet",
    formCode: "MMA-F-CLI-01",
    filename: "client-information-sheet-template.pdf",
    instructions: SUBMIT_STEPS,
    sections: [
      {
        heading: "Personal Information",
        fields: [
          { label: "Full Name" },
          { label: "ID / Passport Number" },
          { label: "Email Address" },
          { label: "Phone Number" },
          { label: "Physical Address", lines: 2 },
          { label: "Occupation" },
          { label: "Employer" },
        ],
      },
      {
        heading: "Emergency Contact",
        fields: [
          { label: "Full Name" },
          { label: "Phone Number" },
          { label: "Relationship" },
        ],
      },
    ],
    signatories: [{ role: "Client", caption: "Client signature & date" }],
    notice: NOTICE,
  },
  {
    title: "Power of Attorney Form",
    formCode: "MMA-F-POA-01",
    filename: "power-of-attorney-template.pdf",
    instructions: [
      ...SUBMIT_STEPS,
      "A Power of Attorney must be signed before a witness and is only effective once stamped and registered where the law requires.",
    ],
    sections: [
      {
        heading: "The Principal (Donor)",
        fields: [
          { label: "Full Name" },
          { label: "ID Number" },
          { label: "Physical Address", lines: 2 },
        ],
      },
      {
        heading: "The Agent (Attorney)",
        fields: [
          { label: "Full Name" },
          { label: "ID Number" },
          { label: "Physical Address", lines: 2 },
        ],
      },
      {
        heading: "Grant of Authority",
        fields: [
          { label: "Powers Granted (describe precisely what the agent may do)", lines: 8 },
          { label: "Effective From (DD / MM / YYYY)" },
          { label: "Effective Until (DD / MM / YYYY)" },
        ],
      },
      {
        heading: "Attestation",
        fields: [{ label: "Witness Full Name" }, { label: "Witness ID Number" }],
      },
    ],
    signatories: [
      { role: "Principal (Donor)", caption: "Signature & date" },
      { role: "Agent (Attorney)", caption: "Signature & date" },
      { role: "Witness", caption: "Witness signature & date" },
    ],
    notice: NOTICE,
  },
];
