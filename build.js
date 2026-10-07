import {mkdir,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of ['index.html','app.js','logic.js','reproductive.js','funding.js','medicare-data.js','services.js','booking.html','booking.js','styles.css','logo.png'])await cp(file,`dist/${file}`,{recursive:true});
console.log('Static prototype built in dist/');
