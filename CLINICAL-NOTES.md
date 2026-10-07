# Clinical interpretation for review

Source set: supplied eligibility-rules JSON/CSV and reimbursement review, plus the previous test catalogue. Source labels of confidence and verification are not endorsed as current external verification. No source documents or personal user histories are shipped with the website.

MBS-HC-01: affected-person germline breast/ovarian panel. The source requires a relevant cancer diagnosis, specialist-requested testing, greater than 10% variant probability and prior-testing/frequency conditions. The prototype only asks about breast cancer and flags possible specialist assessment. It does not calculate probability or declare that the threshold is met.

MBS-HC-02: relative testing for a laboratory-confirmed familial pathogenic/likely pathogenic variant. A yes response identifies a potential pathway, but the prototype requires report/variant/relationship review and prior-testing review in its output. It does not infer a variant from cancer history or consider an uncertain result equivalent to a confirmed inherited variant. The source's requester field conflicts with other portions of the broad dataset; no universal requester gate is automated.

PUB-02: a personal or family history may justify exploring a public familial cancer clinic referral. Local triage criteria are absent, so no acceptance, funded test or free test is promised. Any recorded family cancer is flagged for review, not algorithmically judged to meet an inherited-cancer threshold. Ages and relationships are preserved for a GC, not converted to a risk score.

SP-01: self-funded clinical testing exists subject to lab/request requirements. No price is shown because the source range is not a current quote. Private availability is not a recommendation that a test is appropriate.

The breast pathway can discuss hereditary cancer panels (catalogue AUGT-060) or targeted familial testing (AUGT-025) only as possibilities for discussion. Exact panel choice is left to assessment. A germline result obtained after tumour testing requires separate clinical consideration; the prototype does not implement therapy-linked branches.

Outstanding for production: GC approval of wording; item-level verified rules; clinic/service criteria; defined handling for broader cancer histories, minors and representatives; operational booking/referral permissions and pricing; accessibility audit; real booking connection. No automated underwriting or reimbursement claim decisions occur.
