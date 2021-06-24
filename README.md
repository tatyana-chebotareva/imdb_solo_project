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
1. Register, log in, log out 
1. Search for a movie (by title), Search for an actor/actress (by name)
1. Advanced search (title/name)
1. Viewing IMDb Charts (most popular, etc)
1. Sorting and filtering Chart results
1. Add, change, remove a rating
1. Add to, delete from watchlist
1. View, Sort, refine watchlist
1. View and delete user profile


## How Do We Test

I organized the tests using this structure:
- Tests
- - data
- - - movies.json
- - - people.json
- - pageObjects
- - - AdvancedSearch.ts
- - - BasePage.ts
- - - Charts.ts
- - - MoviePage.ts
- - - SignInPage.ts
- - - Watchlist.ts
- - authTests.test.ts
- - chartsTests.test.ts
- - ratingTests.test.ts
- - searchTests.test.ts
- - watchlistSortTests.test.ts
- - watchlistTests.test.ts

### Page Objects

I made page objects for these pages to represent: a BASE PAGE that I use for working with base page elements ONLY and COMMON methods that can be used on ANY page, and other pages which I use for working with specific pages and methods that can be used ONLY on these pages.

### Data Files

Iteration is key to test some specific functionality, so I created data files for search by movie title and person's name.

## Author
- Tatiana Chebotareva
