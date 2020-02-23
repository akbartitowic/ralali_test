const assert = require('chai').expect;

const page = require('../page/movie-list-page.js');

const testCase = {
 "positive" : {
    "getList" : "berhasil mendapatkan daftar film",
 },
 "negative" : {
    "noSearch" : "gagal mencari data film",
    "invalidApiKey" : "error invalid API Key"
 }
}

describe(`OMDB Movie List`, () => {
 const apiKey = 'f732e357';
 const invalidApiKey = 'asdf';
 const keySearch = 'final';

 it(`@get ${testCase.positive.getList}`, async() => {
  const response = await page.getMovieList(apiKey, keySearch);
  assert(response.status).to.equal(200);
 }),

 it(`@get ${testCase.negative.noSearch}`, async() => {
  const response = await page.getMovieList(apiKey, '');
  assert(response.status).to.equal(200, response.body.Error);
  assert(response.body.Response).to.equal('False');
  assert(response.body.Error).to.equal('Something went wrong.');
 }),

 it(`@get ${testCase.negative.invalidApiKey}`, async() => {
   const response = await page.getMovieList(invalidApiKey, keySearch);
   assert(response.status).to.equal(401, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Invalid API key!');
  })
}) 