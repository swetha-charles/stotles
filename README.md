# Stotles work sample assignment

## Getting started

This sample codebase consists of a separate client & server code.

It's set up in a simple way to make it as easy as possible to start making changes,
the only requirement is having recent versions of `node` & `npm` installed.

This is not a production ready configuration (nor production ready code),
it's only set up for easy development, including live reload.

To run the client bundler:

```
cd client
npm install
npm run dev
```

The processed code will be available at http://localhost:3001

To start the server:

```
cd server
npm install
npm run dev
```

The server will be available at http://localhost:3000 - the page is automatically configured
to use the assets served by vite on port 3001.

You should see something similar to this page:

![Search page](./screenshot.png)

### Disabling/Enabling TypeScript

If you prefer to completely disable TypeScript for a file, add `// @ts-nocheck` on the first line.
If on the other hand you'd like to enable strict type checking, modify `tsconfig.json` according to your needs.

Note that you can import plain JavaScript files that won't be fully typechecked.

### Browsing the database

You should start by looking at the migration in `./migrations` folder.
If you prefer to browse the DB using SQL, you can use the sqlite command line (just run `sqlite3 ./db.sqlite3`)
or any other SQL client that supports sqlite.

If for any reason the database becomes unusable, you can rebuild it using `./reset_db.sh` script`.

## The task

All the instructions are available [here](https://www.notion.so/stotles/Full-stack-software-engineer-work-sample-assignment-ae7c64e08f2a42a097d16cee4bc661fc).


# Notes from candidate
- Create index on buyer_id if this buyer search is too slow when there is a large amount of data in database
- Fix dependency vulnerabilities! (5 high and 1 critical)
    - Due to interest of time and not wanting any breaking changes, I did not update the dependencies but this needs to be done ASAP
    - Could use dependabot to make sure dependencies updates especially critical ones happen wth minimal developer involvement
- Add tests 
    - End to end tests could be added for the features considered vital. 
    - Otherwise component tests would also be useful
- Allow selecting multiple buyers
    - This could be a good improvement if needed by users. The current implementation only allows selection of one buyer
- Test if the new version of getRecords query is performant vs using raw SQL
    - I rewrote the getRecords query using the sequelize model to increase maintainability 
    - The previous iteration worked fine when there was only one search filter. However with two (or more) filters, the method quickly becomes quite complicated. 
