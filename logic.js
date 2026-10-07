export function assess(a) {
 const family=a.familyStatus==='yes' && a.relatives?.length>0;
 const known=a.variant==='yes';
 const personal=a.diagnosis==='yes';
 const scope=a.forWhom==='myself' && a.age!=='' && Number(a.age)>=18 && a.location==='Australia';
 const flags=[];
 if(a.familyStatus==='unknown') flags.push('Clarify what is known about cancer diagnoses on both sides of your biological family.');
 if(a.diagnosis==='unknown') flags.push('Clarify your own diagnosis before distinguishing affected-person and relative-testing pathways.');
 if(a.prior!=='no') flags.push('Clarify previous genetic testing and any relevant Medicare claims.');
 if(known) flags.push('Review the family laboratory report, the exact variant and your biological relationship to the person tested.');
 else flags.push('Clarify whether anyone in the family has a genetic test report; an unknown result is not a negative result.');
 if(personal) flags.push('A specialist would need to assess your diagnosis, clinical features and probability of an inherited variant.');
 if(family) flags.push('Review relatives’ cancer diagnoses, ages and maternal or paternal relationships.');
 if(!scope) flags.push('This prototype only explores pathways for adults answering for themselves in Australia.');
 return {scope, family, known, personal, flags,
 headline:!scope?'A conversation is the right next step':(family||known||personal)?'Your history is worth exploring':'Let’s clarify what testing could offer you',
 medicare:!scope?'We cannot assess this pathway in the prototype.':known?'A pathway for testing a confirmed family variant may be relevant. The report, requester requirements and previous testing still need review.':personal?'A hereditary breast cancer testing pathway may be relevant. Specialist assessment and additional clinical criteria are required.':'Medicare eligibility is not established. The documented relative-testing pathway needs a confirmed familial variant; the affected-person pathway requires a relevant diagnosis.',
 public:!scope?'A genetic counsellor can help clarify an appropriate service.':family||personal||known?'A public familial cancer clinic assessment may be relevant. A GP or specialist referral and the clinic’s acceptance criteria apply. Free testing is not guaranteed.':'The supplied information does not establish a public funding pathway. A genetic counsellor can help clarify the purpose of testing and relevant history.',
 private:'The supplied catalogue describes self-funded clinical genetic testing, subject to laboratory and request requirements. The appropriate test and current price need confirmation.',
 refs:known?['MBS-HC-02','PUB-02','SP-01']:personal?['MBS-HC-01','PUB-02','SP-01']:['MBS-HC-02','PUB-02','SP-01']};
}
export function nextRoute(a){return a.interest==='breast'?'breast':a.interest==='unsure'?'clarify':'unavailable'}
