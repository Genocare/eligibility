// Source-bounded consultation routing. No rule here confirms funding or diagnoses risk.
export const reproductiveDefaults = () => ({reproFocus:'',reproStage:'',reproRole:'',reproWeeks:'',carrierPrior:'',partnerCarrier:'',reproFamily:'',reproFamilyDetail:'',reproAncestry:'',pregnancyFinding:'',karyoReason:'',karyoPrior:''});
export const isReproductive = a => ['carrier','nipt','karyotype','reproductive'].includes(a.interest);
export const wants = (a,test) => a.reproFocus===test || ['all','unsure'].includes(a.reproFocus);
export function reproductiveSteps(a){
 const steps=['who','repro-focus','repro-stage'];
 if(wants(a,'carrier'))steps.push('repro-carrier');
 if(a.reproStage==='pregnant' || wants(a,'nipt'))steps.push('repro-pregnancy');
 if(wants(a,'karyotype'))steps.push('repro-chromosome');
 return [...steps,'repro-review','repro-result'];
}
export function validateReproductive(step,a){
 const required={ 'repro-focus':['reproFocus'], 'repro-stage':['reproStage','reproRole'], 'repro-carrier':['carrierPrior','partnerCarrier','reproFamily','reproAncestry'], 'repro-pregnancy':a.reproStage==='pregnant'?['pregnancyFinding']:[], 'repro-chromosome':['karyoReason','karyoPrior'] };
 if((required[step]||[]).some(k=>!a[k]))return 'Please answer each question. You can choose “I’m not sure”.';
 if(step==='repro-stage'&&a.reproStage==='pregnant'&&a.reproWeeks!==''&&(!Number.isFinite(Number(a.reproWeeks))||Number(a.reproWeeks)<1||Number(a.reproWeeks)>45))return 'Enter pregnancy weeks between 1 and 45, or leave this blank if unsure.';
 return '';
}
const display={carrier:'Carrier screening',nipt:'NIPT',karyotype:'Karyotyping',all:'All three areas',unsure:'Help me understand the options',planning:'Planning a pregnancy',pregnant:'An existing pregnancy',fertility:'Fertility or IVF',loss:'Pregnancy loss',general:'Exploring for the future',unknown:'Not sure',self:'I am pregnant or may carry a pregnancy',partner:'I am the reproductive partner',yes:'Yes',no:'No',cf:'Cystic fibrosis (CFTR)',sma:'Spinal muscular atrophy (SMN1)',fxs:'Fragile X (FMR1)',other:'Another condition',none:'No known carrier result',notdone:'No screening result yet',low:'A lower-chance screening result',high:'A higher-chance screening result',inconclusive:'An inconclusive / no-result screen',scan:'A scan finding requiring review',miscarriage:'One or more pregnancy losses',infertility:'Fertility investigation',rearrangement:'Known chromosome rearrangement in me, my partner or family',prenatal:'A chromosome test during pregnancy',requested:'A clinician suggested karyotyping',curious:'General information'};
export const reproductiveLabel=value=>display[value]||value||'Not recorded';
export function reproductiveFacts(a){
 const facts=[`Area of interest: ${reproductiveLabel(a.reproFocus)}`,`Situation: ${reproductiveLabel(a.reproStage)}`,`Your role: ${reproductiveLabel(a.reproRole)}`];
 if(a.reproStage==='pregnant')facts.push(`Pregnancy weeks: ${a.reproWeeks||'Not sure'}`);
 if(wants(a,'carrier'))facts.push(`Your previous carrier screening: ${reproductiveLabel(a.carrierPrior)}`,`Reproductive partner's known carrier result: ${reproductiveLabel(a.partnerCarrier)}`,`Known inherited condition or variant in your family: ${reproductiveLabel(a.reproFamily)}`,...(a.reproFamily==='yes'&&a.reproFamilyDetail?[`Family detail: ${a.reproFamilyDetail}`]:[]),`Ashkenazi Jewish ancestry: ${reproductiveLabel(a.reproAncestry)}`);
 if(a.reproStage==='pregnant')facts.push(`Pregnancy screening / scan result: ${reproductiveLabel(a.pregnancyFinding)}`);
 if(wants(a,'karyotype'))facts.push(`Reason for considering karyotyping: ${reproductiveLabel(a.karyoReason)}`,`Previous chromosome testing: ${reproductiveLabel(a.karyoPrior)}`);
 return facts;
}
export function assessReproductive(a){
 const scope=a.forWhom==='myself'&&a.age!==''&&Number(a.age)>=18&&a.location==='Australia';
 const pregnant=a.reproStage==='pregnant';
 const findings=pregnant&&['high','inconclusive','scan'].includes(a.pregnancyFinding);
 const tests=[],flags=[],refs=new Set(['SP-01','PUB-01']);
 if(!scope)return {scope,tests:[],flags:['This prototype supports adults answering for themselves in Australia. A GC can help identify a suitable assessment pathway.'],refs:[],headline:'Let’s find the right support',priority:'',public:'Public funding cannot be assessed in this prototype.'};
 if(wants(a,'carrier')){
  refs.add('MBS-RCS-01');
  let funding='The supplied rules describe Medicare support for a three-condition screen in the eligible pregnant/planning-pregnancy population. Your circumstances, prior tests and request requirements need review; eligibility is not established here.';
  if(a.reproRole==='partner') funding=['cf','sma'].includes(a.partnerCarrier)?'A partner follow-up pathway may be relevant for confirmed CFTR or SMN1 carrier results (source item 73452). A GC must check the index report, both partners’ roles, previous tests and request requirements.':'Partner Medicare follow-up is not established. The supplied three-condition pathway requires a confirmed CF or SMA carrier result in the index person; it is not automatic couple screening.';
  if(a.partnerCarrier==='fxs'){funding+=' The supplied partner-testing item does not cover follow-up testing for fragile X. A GC should review the implications of that family result.';flags.push('Discuss the FMR1 report; do not treat fragile X like the CF/SMA partner-testing pathway.');}
  if(a.carrierPrior!=='no')flags.push('Bring any previous carrier-screening reports. Repeat funding cannot be inferred; 73451 is limited to one test per lifetime; 73452 partner follow-up is limited to one test per condition per lifetime.');
  if(a.reproFamily==='yes')flags.push('Bring the known family condition or variant report. A targeted family-risk test may differ from general carrier screening.');
  if(a.reproAncestry==='yes'){refs.add('MBS-RCS-02');flags.push('The supplied rules describe a separate Ashkenazi Jewish ancestry carrier pathway; panel and partner criteria need individual review.');}
  if(a.reproRole==='unknown')flags.push('Clarify who would have the first carrier screen and who would have partner follow-up.');
  tests.push({id:'carrier',name:'Reproductive carrier screening',tag:'PARENTS / PROSPECTIVE PARENTS',description:'Testing for carrier status for inherited conditions. The three-condition screen covers cystic fibrosis, spinal muscular atrophy and fragile X syndrome.',relevance:['planning','pregnant','fertility'].includes(a.reproStage)?'An option to discuss when planning a pregnancy or during pregnancy.':'Explore its purpose with a GC; a reproductive indication has not been established from these answers.',funding,extra:'Expanded screening covers more conditions, with panel content varying by provider. The supplied documents describe this as generally self-funded; a current quote and appropriate panel need confirmation.'});
 }
 if(wants(a,'nipt')){
  refs.add('SP-02');
  let relevance=!pregnant?'NIPT relates to an existing pregnancy. If you are planning ahead, this is information for a future pregnancy, not a test to arrange now.':a.reproWeeks===''?'Confirm pregnancy timing with your maternity clinician. The supplied catalogue describes testing from approximately 10 weeks.':Number(a.reproWeeks)<10?'The supplied catalogue describes testing from approximately 10 weeks. Discuss timing with your maternity clinician; this is not a recommendation to test now.':'The supplied catalogue describes NIPT from approximately 10 weeks. Your maternity clinician should confirm timing and suitability.';
  if(findings)relevance='You reported a screening or scan result needing review. Discuss that result with your maternity team; this explorer should not direct you to a routine or repeat NIPT instead of diagnostic assessment.';
  tests.push({id:'nipt',name:'NIPT / prenatal screening',tag:'SCREENING DURING PREGNANCY',description:'A blood-based screen for the chance of selected fetal chromosome conditions. It is a screening test, not a diagnostic test, and is different from parental carrier screening.',relevance,funding:'The supplied documents describe standard chromosome-screening NIPT as self-funded, without Medicare or standard private health insurance cover. They do not establish a free NIPT route. Confirm current costs and any local arrangements.',extra:'The separately funded fetal RhD blood-group test is not the same as chromosome-screening NIPT. A lower-chance screening result does not replace assessment of other clinical concerns.'});
 }
 if(wants(a,'karyotype')){
  refs.add('MBS-CY-01');
  tests.push({id:'karyotype',name:'Karyotyping / chromosome assessment',tag:'MATCH THE TEST TO THE QUESTION',description:'The catalogue lists parental blood karyotyping, prenatal karyotyping and pregnancy-loss chromosome analysis as distinct tests. A karyotype is different from NIPT, carrier screening and a chromosome microarray.',relevance:['miscarriage','infertility','rearrangement','requested'].includes(a.karyoReason)?'Your stated reason supports a discussion about which chromosome assessment, if any, is appropriate. It does not establish that a karyotype is needed.':a.karyoReason==='prenatal'?'A clinician needs to choose the appropriate fetal diagnostic assessment; NIPT, karyotype and microarray are not interchangeable.':'The purpose of chromosome testing needs clarification before selecting a test.',funding:'The supplied rules group several chromosome tests together and do not provide complete indication-specific karyotype funding criteria. We cannot determine a Medicare item, free testing or a private price from these answers.',extra:'For pregnancy loss, testing pregnancy tissue and testing a parent’s blood are different investigations. Bring any previous reports so the GC can clarify which question remains unanswered.'});
  if(a.karyoPrior!=='no')flags.push('Review previous chromosome reports, including whose sample was tested and whether it was a karyotype, microarray or pregnancy-tissue analysis.');
 }
 if(pregnant){flags.push('Tell your maternity clinician about your interest in testing so pregnancy timing can be considered.');if(findings)flags.push('Bring the actual screening or ultrasound report; do not interpret a screening result as a confirmed diagnosis.');}
 if(pregnant&&a.pregnancyFinding==='scan'){refs.add('MBS-CY-02');flags.push('The source describes a separate fetal microarray pathway for specified ultrasound findings. A general scan concern does not establish those criteria or karyotype funding.');}
 if(a.reproFamily==='unknown'&&wants(a,'carrier'))flags.push('Clarify any known inherited conditions in the family where possible; unknown family history is not a negative test.');
 flags.push('Confirm request requirements, laboratory charges and any public-service acceptance criteria before arranging a test.');
 return {scope,tests,flags,refs:[...refs],headline:'Your reproductive testing options',priority:findings?'Your pregnancy result needs individual review. Please contact your maternity team to discuss the report and next steps; this explorer cannot interpret it.':'',public:'A public genetics assessment may be an option where there is a clinical indication or relevant family history. Referral, service acceptance and test funding are discretionary. These documents do not establish free access to every reproductive test.'};
}
