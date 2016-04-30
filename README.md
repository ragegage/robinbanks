# RobinBanks

[Heroku link][robinbanks]

[robinbanks]: http://www.robinbanks.herokuapp.com

## Minimum Viable Product

RobinBanks is a web application inspired by Robinhood that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] Minimally necessary features for a Robinhood-inspired site: a watchlist of stocks, watchlist editing (addition, removal, and reordering of stocks), and company information including latest and historical stock prices and relevant news.
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README (at least as good as the one at [sample production README](https://github.com/appacademy/sample-project-proposal/blob/master/docs/production_readme.md))

## Product Goals and Priorities

RobinBanks will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account (MVP)
- [x] Log in / Log out, including as a Guest/Demo User (MVP)
- [x] View stock price information on watchlist (MVP)
- [ ] Organize stocks within watchlist (MVP)
- [x] Add and delete stocks to/from watchlist (MVP)
- [x] Search for stocks by ticker symbol (MVP)
- [ ] View stock information (prices and relevant news) for an individual stock (MVP)
- [ ] Change time window for an individual stock's price information (non-MVP, but expected)
- [ ] On hover, display snapshot of price information for an individual stock at a point in time (non-MVP, but expected)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup, User Authentication, and live on Heroku (1 day)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin with `logout` link
- [x] page live on robinbanks.herokuapp.com

### Phase 2: Stocks, List, and StockListItems Models & API (1 day)

**Objective:** Stocks and StockListItems can be created, read, edited and destroyed through
the API.

- [x] create `Stock` model
- [x] create `List` model
- [x] create `StockListItem` model
- [x] seed the database with test data
- [x] CRUD API for models (`StocksController`, `StockListItemsController`)
- [x] generation of ordered array of stockListItems (from a linked list)
- [x] jBuilder views for stocks, stockListItems
- [x] test out API interaction with Postman

### Phase 3: Internal APIUtils (.5 day)

**Objective:** APIUtils provide methods to interact with internal APIs.

- [x] set up APIUtils to interact with internal APIs
- [x] test internal API interaction in the console

### Phase 4: Flux Architecture and Router; implement StockList (.5 day)

**Objective:** StockListItems can be read, edited and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- [x] implement `StocksIndex` (without `StockPrice`s)

### Phase 5: Outfit Basic Site with Styling (.5 day)

**Objective:** Basic pages (including signup/signin, StocksIndex) will look good and follow the style guide.

- [x] implement basic style guide
- [x] position elements on the page
- [x] style StocksIndex

### Phase 6: StockSearch Flux Architecture and Router (.5 day)

**Objective:** StockListItems can be created with the user interface.

- [x] implement `StockSearchBar`

### Phase 7: Outfit Search with Styling (.5 day)

**Objective:** Search bar and results will look good and follow the style guide.

- [x] style StockSearchBar and SearchBarSuggestions

### Phase 8: External APIUtils (.5 day)

**Objective:** APIUtils provide methods to interact with external APIs.

- [ ] set up APIUtils to interact with external APIs
- [ ] test external API interaction in the console

### Phase 9: Flesh out Flux Architecture (1 day)

**Objective:** Stocks and StockListItems display external data through the user interface.

- implement basics of `StockDetail`
  - [x] display current stock price information
  - [x] acquire HistoricalStockPrice information
  - [ ] acquire StockNews information
  - [x] create skeletons for StockCharts and StockNews

### Phase 10: Implement StockDetail MVP (1.5 days)

**Objective:** StockDetail shows StockCharts and StockNews

- [ ] implement chart plugin (Rickshaw?) with HistoricalStockPrice data
- [ ] implement StockNewsItems with StockNews data

### Phase 11: Outfit Entire Site with Styling (1.5 days)

**Objective:** All pages will look good and follow the style guide.

- [x] position elements on the page
- [x] style StockChart
- [x] style StockNews
- [ ] do a final style-check against the wireframes

### Bonus Features (TBD)
- [ ] Change time window for StockCharts (reveals a different StockChart)
- [ ] Hover over StockChart displays snapshot of price information
- [ ] In-app reader for news articles (the other end of the links in StockNews)
- [ ] Multiple sessions
- [ ] Sign in with Facebook/Github/Google

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
