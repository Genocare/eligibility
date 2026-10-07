# Made Genetics explorer

A working, browser-only prototype for exploring genetic testing and possible funding routes. The general entry journey accepts different interests and uncertainty. Hereditary breast cancer and reproductive pathways are implemented, including carrier screening, NIPT and karyotyping.

## Run and deploy

No framework or package dependencies are required. Use Node 20+.

```
node --test *.test.js
node build.js
python3 -m http.server 4173 --directory dist
```

Create a new GitHub repository and push this project. Import it as a new Vercel project with framework **Other**. The checked-in vercel.json sets `node build.js` as the build command and `dist` as the output. No environment variables are required. No paid services are required by the code. Account hosting plans remain the account owner's choice.

## Implemented

- Purpose and test-interest questions, including “not sure”.
- Adult/self/Australia scope handling, with consultation routing for other cases.
- Reproductive test selection (one area, all three or unsure), pregnancy stage and timing, carrier/partner results, family history, ancestry, existing pregnancy findings and karyotype context.
- Test-specific results, separate public-service guidance and a reproductive consultation download.
- Personal breast cancer history, repeatable family-history records on either side, confirmed family variants and previous testing.
- Review/edit answers; conservative Medicare, public-service and private-testing summaries.
- Downloadable text summary; reset and privacy explanation.
- Responsive Made Genetics visual treatment with logo extracted from the user-supplied identity guide (page 4), guide-inspired palette and linked circles. Font stacks prefer Aharoni and Poppins when installed, with system fallbacks; licensed webfont assets were not supplied.

## Source boundaries and clinical status

This is a consultation-routing prototype, not a validated eligibility engine or medical diagnosis tool. Its evidence combines the supplied eligibility catalogue dated 7 October 2026 with official MBS descriptors checked for this funding update. See CLINICAL-NOTES.md for how rules are used. It does not use live MBS data or calculate variant probability. Family history is not automatically treated as Medicare eligibility. Testing for a confirmed family variant stays conditional on report review and other requirements. Unknown facts remain unknown. Current pricing, clinic catchments and definitive eligibility are not available.

Somatic cancer testing is not included. The workflow explores genetic risk, not mammography or breast symptom assessment. Clinical review of questions and wording remains required before patient-facing production use.

## Booking and data

Booking currently opens an explicitly labelled preview; no appointment or referral is submitted. Connect a confirmed booking URL and show consultation costs before enabling live booking. There is no email, contact form, upload, database, analytics, API call or persistence of questionnaire answers. State stays in the tab's memory, disappears on refresh, and is included only in a user-requested local download. Hosting providers may keep ordinary access logs, without questionnaire answers. The content security policy blocks outgoing application connections.

## Validation

Twenty-two automated pathway and funding tests include reproductive timing boundaries, CF/SMA versus fragile X partner funding, repeat testing, unknown facts, scope limits and hidden-answer isolation. Breast-pathway tests cover unknown vs confirmed family variants, affected-person routing, scope boundaries, missing family history and unsupported interests. Desktop and mobile browser walkthroughs cover the family-history journey, unknown-interest routing, review, results and consultation preview. The text-summary download was verified on disk. Security headers were applied during the final browser checks. Deployment and account connection must be verified separately; a successful local run is not evidence of a live deployment.


Funding v0.3: four channels per test, official MBS links and lay criteria, dated indicative private fees, public waitlist guidance and separate navigator preview. See CLINICAL-NOTES.md for source limits.
