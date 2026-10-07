# Clinical interpretation for review

Source set: supplied eligibility-rules JSON/CSV and reimbursement review, plus the previous test catalogue. Source labels of confidence and verification are not endorsed as current external verification. No source documents or personal user histories are shipped with the website.

MBS-HC-01: affected-person germline breast/ovarian panel. The source requires a relevant cancer diagnosis, specialist-requested testing, greater than 10% variant probability and prior-testing/frequency conditions. The prototype only asks about breast cancer and flags possible specialist assessment. It does not calculate probability or declare that the threshold is met.

MBS-HC-02: relative testing for a laboratory-confirmed familial pathogenic/likely pathogenic variant. A yes response identifies a potential pathway, but the prototype requires report/variant/relationship review and prior-testing review in its output. It does not infer a variant from cancer history or consider an uncertain result equivalent to a confirmed inherited variant. The source's requester field conflicts with other portions of the broad dataset; no universal requester gate is automated.

PUB-02: a personal or family history may justify exploring a public familial cancer clinic referral. Local triage criteria are absent, so no acceptance, funded test or free test is promised. Any recorded family cancer is flagged for review, not algorithmically judged to meet an inherited-cancer threshold. Ages and relationships are preserved for a GC, not converted to a risk score.

SP-01: self-funded clinical testing exists subject to lab/request requirements. No price is shown because the source range is not a current quote. Private availability is not a recommendation that a test is appropriate.

The breast pathway can discuss hereditary cancer panels (catalogue AUGT-060) or targeted familial testing (AUGT-025) only as possibilities for discussion. Exact panel choice is left to assessment. A germline result obtained after tumour testing requires separate clinical consideration; the prototype does not implement therapy-linked branches.

Outstanding for production: GC approval of wording; item-level verified rules; clinic/service criteria; defined handling for broader cancer histories, minors and representatives; operational booking/referral permissions and pricing; accessibility audit; real booking connection. No automated underwriting or reimbursement claim decisions occur.


## Reproductive pathway v0.2

Sources: MBS-RCS-01/02, SP-01/02, MBS-CY-01/02, PUB-01, and catalogue AUGT-001/002/009/014/017/021. No external clinical information was added to the evidence base. Clinical interpretation is conservative and intended for GC review.

Carrier screening: distinguish the three-condition screen from expanded screening. No automatic eligibility assertion: the source population and lifetime per-condition limits require review. Partner follow-up for CFTR/SMN1 stays conditional; fragile X must not imply the same partner-funded pathway. Ancestry is optional with unknown/prefer-not-to-say supported. Specific family results may require targeted testing rather than a standard screen.

NIPT: label it prenatal screening, not diagnosis. The source describes approximately ten weeks as a timing reference, not an automatic suitability threshold. Existing higher-chance, inconclusive or ultrasound findings prompt maternity-team review, not a recommendation to repeat NIPT. Standard chromosome NIPT self-pay is a source assertion, not a verified current national coverage ruling. Fetal RhD funding is not inherited by the NIPT pathway.

Karyotyping: no miscarriage-count or infertility eligibility thresholds are invented. Parental blood, fetal testing and pregnancy-loss tissue investigations remain distinct. Source cytogenetic rules are incomplete; microarray criteria are not transferred to karyotyping. Public funding stays discretionary.

Unknown or hidden answers cannot generate positive eligibility. When a user changes focus, answers from unrelated sections do not enter the results or download. The application remains memory-only and booking remains an explicit preview.


## Funding update — 7 October 2026
The four funding panels and downloadable summaries now use funding.js. Official MBS descriptors supplement (and where inconsistent supersede) the supplied catalogue: 73296/73297, 73451/73452, 73289/73287/73293. Links are displayed beside the criteria. Carrier 73451 is one test per lifetime; 73452 is one per condition per lifetime. No numerical miscarriage threshold is inferred from chromosome descriptors. Private health wording is specifically for standard outpatient cover, with an admitted-hospital exception subject to policy. Public services may be free following acceptance; waiting lists can be long and need local confirmation.

Prices remain supplied-research estimates: hereditary panels A$400–800, NIPT A$400–800; carrier examples A$385 and A$595 per person from January 2024. They are not verified current quotes or universal price bounds. No supported karyotyping range exists; quote required. Medicare schedule fees are not used as private prices. Navigator and GC buttons remain labelled booking previews.

Clinical review is required before production use. The source repository remains unchanged; this supplemental verification applies to prototype funding panels.


## Sample booking update
Genetic Navigator (20 minutes with a GC) and GC Consultation (45 minutes) now link to separate service views on booking.html. Visitors can preview an appointment or waiting-room entry. No real availability, queue, appointment, payment or referral is created. No contact or health data is collected or transferred. Fees are explicitly unconfirmed. Service links open in a new tab to preserve explorer answers.


## Active source revision 2.1 — 7 October 2026
The current source is the supplied plain-language v2 catalogue, normalised as v2.1. All 84 rules and 165 Medicare entries remain in the repository. Four general Medicare requester fields were corrected to defer to item-specific requirements. legacy_technical_fields were restored from the true original upload. Raw originals and raw v2 uploads are preserved; v0.1 repository snapshots are in versions/v0.1. Historical review flags are audit context, not the current response source.

Default retrieval uses current records and excludes somatic entries; mixed groups are represented by their individual in-scope items. There are 63 excluded somatic entries. Website medicare-data.js contains only 73296, 73297, 73451, 73452, 73289, 73287 and 73293. Full plain-language criteria, requesters, limits, exceptions and clinician notes are available beside the concise funding summaries and in downloads. No old pseudocode is executed. No clinical validation of all items is claimed. Prices were not updated.
