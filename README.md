# IMDB Automation Testing Solo Project

- [Summary](#summary)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [What Do We Test](#what-do-we-test)
- [How Do We Test](#how-do-we-test)
  - [Page Objects](#page-objects)
  - [Data Files](#data-files)

## Summary

This project was put together to showcase my automation efforts to test imdb.com. 
It uses Jest as a test runner, and Selenium Webdriver to hook into the browser.

## Setup

This is how to set up the project.
1. clone it!
1. `npm i`

## Running Tests

To run all the tests, use the command: `npm test`
To run a specific test, use the command: `npx jest test_name`

## What Do We Test

The functionality to test:
1. @todo
1. @todo

## How Do We Test

I organized the tests using this structure: @todo
- Tests
- - data
- - - dataset.json
- - pageObjects
- - - BasePage.ts
- - - OtherPage.ts
- - mytests.tests.ts

### Page Objects

I made page objects for these pages to represent: a BASE PAGE that I use for working with base page elements ONLY and COMMON methods that can be used on ANY page, and other pages which I use for working with specific pages and methods that can be used ONLY on these pages.

### Data Files

Iteration is key to test some specific functionality, so I created files for: @todo

## Authors
- Tatiana Chebotareva