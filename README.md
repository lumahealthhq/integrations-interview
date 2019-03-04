# Pengfei's Solution

## Solution Basic

Express framework is used to deal with routes. Unit test is done by Mocha framework. The npm package can be installed through "npm i luma-eng-interview"

## File Structure

- index.js entry of the module
- routes.js route handlers
- checker.js contains functions to validate input and other assistant functions
- test folder contains testing code

## Project Structure and Usage

The project persist all the information into a list of doctor object.
A doctor object contains the working hour and a list of appointments.

When create a new appointment, the server will check whether the doctor exists, whether the desired time is within a working hour, and whether the desired time is already booked by others. If the check passed, a new appointment with the information of patient name and time will be added to the doctor’s appointments list.

## Test

The first kind of tests are used to test the route handlers. The second kind of tests are used to test the checker functions.
