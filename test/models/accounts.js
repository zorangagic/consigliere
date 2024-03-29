var chai = require("chai");
var expect = chai.expect;
var should = chai.should();
var accounts = require('../../src/models/accounts');

describe("Accounts Model", function() {
  describe("Purge database", function(){
    it("Purges the database", function(done){
      accounts.remove({},function(err){
        should.not.exist(err);
        done();
      });
    });
  });
  describe("Add a Master Account", function() {
    it("Adds a Master account",function(done){
      var account = new accounts({
        accountName: 'Shared',
        accountNumber: '12345',
        type: 'master',
        choice:'role'
      });
      account.save(function(err){
        should.not.exist(err);
        done();
      });
    });
  });
  describe("Add a Duplicate Master Account", function() {
    it("Fails to add duplicate account",function(done){
      var account = new accounts({
        accountName: 'Shared',
        accountNumber: '12345',
        type: 'master',
        choice:'role'
      });
      account.save(function(saveErr){
        should.exist(saveErr);
        done();
      });
    });
  });
  describe("Add a Slave Account", function() {
    it("Adds a Slave account",function(done){
      var account = new accounts({
        accountName: 'Slave1',
        accountNumber: '7891',
        type: 'slave',
        choice: 'role',
        roleArn:'arn:something:or:the:other'
      });
      account.save(function(err){
        should.not.exist(err);
        done();
      });
    });
  });
  describe("Add a duplicate slave Account", function() {
    it("Fails to add a duplicate slave account",function(done){
      var account = new accounts({
        accountName: 'Slave1',
        accountNumber: '7891',
        type: 'slave',
        choice: 'role',
        roleArn:'arn:something:or:the:other'
      });
      account.save(function(err){
        should.exist(err);
        done();
      });
    });
  });
  describe("Gets all accounts", function() {
    it("Gets list of accounts",function(done){
      accounts.find({},function(err,listOfAccounts){
        should.not.exist(err);
        should.exist(listOfAccounts);
        done();
      });
    });
  });
  describe("Gets an account by number", function() {
    it("Gets a single account by number",function(done){
      accounts.find({accountNumber:'7891'},function(err,account){
        should.not.exist(err);
        should.exist(account);
        expect(account[0].accountNumber).to.equal('7891');
        account[0].close(function(err){
          if(!err){
            done();
          }
        })
      });
    });
  });
});
