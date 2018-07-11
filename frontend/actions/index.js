const axios = require('axios');
const url = "http://localhost:3000";

export function test(content) {
 return {
  type: 'TEST',
  content
 };
}
