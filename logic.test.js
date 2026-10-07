import test from 'node:test';import assert from 'node:assert/strict';import {assess,nextRoute} from './logic.js';
const base={forWhom:'myself',age:'48',location:'Australia',diagnosis:'no',familyStatus:'yes',relatives:[{relationship:'mother',age:'42'}],variant:'unknown',prior:'unknown'};
test('family history with unknown variant never establishes Medicare eligibility',()=>{const r=assess(base);assert.match(r.medicare,/not established/);assert.match(r.public,/may be relevant/);assert.equal(r.known,false)});
test('confirmed family variant remains conditional',()=>{assert.match(assess({...base,variant:'yes'}).medicare,/still need review/)});
test('affected person requires specialist criteria',()=>{assert.match(assess({...base,diagnosis:'yes'}).medicare,/additional clinical criteria/)});
test('out of scope cases are not assessed',()=>{for(const delta of [{age:'17'},{forWhom:'child'},{location:'Other'},{age:''}])assert.equal(assess({...base,...delta}).scope,false)});
test('no recorded history is not automatic funding',()=>{const r=assess({...base,familyStatus:'no',relatives:[]});assert.match(r.public,/does not establish/)});
test('unknown intent gets clarification, other interests not breast results',()=>{assert.equal(nextRoute({interest:'unsure'}),'clarify');assert.equal(nextRoute({interest:'pgx'}),'unavailable');assert.equal(nextRoute({interest:'breast'}),'breast')});
