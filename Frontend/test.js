import { Mistral } from '@mistralai/mistralai';

const apiKey = 'CBdjThjnkYcuaFvkD4MqhJVEvjJ7gof8';

const client = new Mistral({apiKey: apiKey});
// const prompt=require("prompt-sync")({sigint:true}); 
 
let name = `
{
'I enjoy solving complex puzzles and problems': 'Strongly Agree',
'I find satisfaction in helping others learn new skills or information': 'Strongly Agree',
'Creating artistic works (visual art, music, writing, etc.) energizes me.': 'Strongly Agree',
'I'm fascinated by how technology works and evolves.' : 'Strongly Agree',
'I enjoy organizing events or managing projects from start to finish.' : 'Strongly Agree',
'I'm drawn to understanding how businesses operate and make money.' : 'Agree',
'Working with my hands to build or fix things gives me satisfaction.' : 'Neutral',
'I'm curious about scientific discoveries and natural phenomena.' : 'Disagree',
'I enjoy analyzing data and identifying patterns or trends.' : 'Neutral',
'I find myself naturally taking charge in group situations.' : 'Strongly Agree',
'I'm passionate about environmental issues and sustainability.' : 'Strongly Disagree'
}
`

const chatResponse = await client.agents.complete({
  agentId: "ag:456dff0a:20250327:untitled-agent:f4bf8ee7",
  messages: [{role: 'user', content: name}],
});

console.log('Chat:', chatResponse.choices[0].message.content);