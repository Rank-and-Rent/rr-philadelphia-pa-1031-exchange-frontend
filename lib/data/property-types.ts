export type PropertyTypeDetail = {
  slug: string;
  name: string;
  summary: string;
  highlights: string[];
  metadata: {
    title: string;
    description: string;
  };
};

export const propertyTypes: PropertyTypeDetail[] = [
  {
    slug: "multifamily-communities",
    name: "Multifamily Communities",
    summary:
      "Stabilized and value-add multifamily assets across Philadelphia, PA with rent analytics, capex plans, and lender-ready underwriting.",
    highlights: [
      "In-depth rent roll and lease audit support",
      "Scenario modeling for vacancy and rent growth",
      "Capital expenditure planning for unit upgrades",
      "Financing coordination for agency and bank executions",
    ],
    metadata: {
      title: "Multifamily 1031 Exchange Philadelphia | Replacement Property Support",
      description:
        "Discover multifamily replacement property strategies in Philadelphia, PA including underwriting, rent analysis, and compliance tracking.",
    },
  },
  {
    slug: "triple-net-retail",
    name: "Triple Net Retail",
    summary:
      "Single tenant and multi tenant NNN properties featuring credit tenancy, ground lease analysis, and co-tenancy diligence.",
    highlights: [
      "Tenant credit scoring and sales performance review",
      "Ground lease term benchmarking and valuation support",
      "CAM reconciliation verification and property tax forecasting",
      "Financing and appraisal alignment with exchange deadlines",
    ],
    metadata: {
      title: "Triple Net Retail 1031 Exchange Philadelphia | Net Lease Advisory",
      description:
        "Explore NNN retail replacement assets in Philadelphia, PA with tenant credit analysis, lease abstracting, and exchange compliance.",
    },
  },
  {
    slug: "industrial-flex-buildings",
    name: "Industrial Flex Buildings",
    summary:
      "Logistics and flex assets with transportation analysis, tenant covenant review, and expansion potential mapping.",
    highlights: [
      "Logistics scoring for port, rail, and highway access",
      "Tenant covenant and assignment clause diligence",
      "Environmental screening coordination",
      "Expansion and redevelopment feasibility studies",
    ],
    metadata: {
      title: "Industrial Flex 1031 Exchange Philadelphia | Logistics Advisory",
      description:
        "Identify industrial and flex replacement properties in Philadelphia, PA with logistics scoring, environmental diligence, and underwriting support.",
    },
  },
  {
    slug: "medical-office",
    name: "Medical Office",
    summary:
      "Healthcare real estate with compliance oversight, tenant estoppels, and build-to-suit planning for Philadelphia, PA investors.",
    highlights: [
      "Stark Law and anti-kickback compliance checkpoints",
      "Tenant reimbursement and payer mix review",
      "Improvement exchange coordination for medical buildouts",
      "Estoppel preparation and lease assignment support",
    ],
    metadata: {
      title: "Medical Office 1031 Exchange Philadelphia | Healthcare Real Estate Support",
      description:
        "Support for medical office replacement properties in Philadelphia, PA including compliance reviews, tenant diligence, and improvement exchange planning.",
    },
  },
  {
    slug: "hospitality-assets",
    name: "Hospitality Assets",
    summary:
      "Hospitality replacement properties with brand approval coordination, PIP budgeting, and operating forecast validation.",
    highlights: [
      "Performance benchmarking with STR data and local comps",
      "Property Improvement Plan budgeting and scheduling",
      "Management agreement negotiation and key money analysis",
      "Labor, insurance, and tax modeling for cash flow stability",
    ],
    metadata: {
      title: "Hospitality 1031 Exchange Philadelphia | Hotel Reinvestment Advisory",
      description:
        "Plan hospitality replacement acquisitions in Philadelphia, PA with PIP budgeting, management agreement review, and financial modeling.",
    },
  },
  {
    slug: "land-for-development",
    name: "Land for Development",
    summary:
      "Infill and suburban land strategies covering entitlements, improvement exchanges, and infrastructure coordination for Philadelphia, PA.",
    highlights: [
      "Entitlement schedule mapping with municipal contacts",
      "Improvement exchange structuring for site work and vertical construction",
      "Environmental and geotechnical due diligence support",
      "Capital stack planning for phased development",
    ],
    metadata: {
      title: "Land 1031 Exchange Philadelphia | Development Advisory",
      description:
        "Evaluate land replacement properties in Philadelphia, PA with entitlement planning, improvement exchange structuring, and infrastructure coordination.",
    },
  },
];

