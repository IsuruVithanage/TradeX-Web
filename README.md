# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
TradeX-Web
├─ .env
├─ .gitignore
├─ .idea
│  ├─ .gitignore
│  ├─ misc.xml
│  ├─ modules.xml
│  ├─ TradeX-Web.iml
│  └─ vcs.xml
├─ .vscode
│  └─ settings.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ index.html
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md
└─ src
   ├─ App.css
   ├─ App.js
   ├─ App.test.js
   ├─ Assets
   │  └─ Images
   │     ├─ Coin Images.json
   │     ├─ coverx.png
   │     ├─ crypto.png
   │     ├─ image.jpg
   │     ├─ trade.png
   │     └─ wallet.png
   ├─ Components
   │  ├─ Admin
   │  │  ├─ AdminCard.css
   │  │  └─ AdminCard.js
   │  ├─ BasicPage
   │  │  ├─ BasicPage.css
   │  │  ├─ BasicPage.js
   │  │  ├─ SideNavBar
   │  │  │  ├─ SideNavBar.css
   │  │  │  └─ SideNavBar.js
   │  │  └─ TopNavBar
   │  │     ├─ TopNavBar.css
   │  │     └─ TopNavBar.js
   │  ├─ Charts
   │  │  ├─ BarChart
   │  │  │  ├─ BarChart.css
   │  │  │  └─ BarChart.js
   │  │  └─ LineChart
   │  │     ├─ LineChar.js
   │  │     └─ LineChart.css
   │  ├─ EducationResources
   │  │  ├─ EducationItems.css
   │  │  └─ EducationItems.js
   │  ├─ Input
   │  │  ├─ Button
   │  │  │  └─ Button.js
   │  │  ├─ Date
   │  │  │  └─ Date.js
   │  │  ├─ Dropdown
   │  │  │  └─ Dropdown.js
   │  │  ├─ FAB
   │  │  │  └─ FAB.js
   │  │  ├─ Input.css
   │  │  ├─ Input.js
   │  │  ├─ NumberInput
   │  │  │  ├─ NumberInput.css
   │  │  │  └─ NumberInput.js
   │  │  ├─ SliderInput
   │  │  │  ├─ SliderInput.css
   │  │  │  └─ SliderInput.js
   │  │  ├─ TabSwitch
   │  │  │  ├─ TabSwitch.css
   │  │  │  └─ TabSwitch.js
   │  │  └─ Toggle
   │  │     └─ Toggle.js
   │  ├─ Loading
   │  │  ├─ Loading.css
   │  │  └─ Loading.js
   │  ├─ Message
   │  │  ├─ Message.css
   │  │  └─ Message.js
   │  ├─ Modal
   │  │  ├─ Modal.css
   │  │  └─ Modal.js
   │  ├─ NewsBar
   │  │  ├─ NewsBoard.js
   │  │  ├─ NewsItem.css
   │  │  └─ NewsItem.js
   │  ├─ Questionbar
   │  │  ├─ Detailed.css
   │  │  ├─ Detailed.js
   │  │  ├─ Questionbar.css
   │  │  └─ Questionbar.js
   │  ├─ QuizComponents
   │  │  ├─ QuestionBar.css
   │  │  ├─ QuestionBar.js
   │  │  ├─ QuizTimer.css
   │  │  └─ QuizTImer.js
   │  ├─ Sidebar
   │  │  ├─ sidebar.css
   │  │  ├─ sidebar.js
   │  │  └─ Sidebardata.js
   │  ├─ SidePanel
   │  │  ├─ SidePanelWithContainer.css
   │  │  └─ SidePanelWithContainer.js
   │  ├─ SimulateChart
   │  │  ├─ ButtonSet.css
   │  │  ├─ ButtonSet.js
   │  │  ├─ CoinBar.css
   │  │  ├─ CoinBar.js
   │  │  ├─ DualButtons.css
   │  │  ├─ DualButtons.js
   │  │  ├─ TradingChart.css
   │  │  └─ TradingChart.js
   │  ├─ Table
   │  │  ├─ Table.css
   │  │  └─ Table.js
   │  ├─ ValueBar
   │  │  ├─ ValueBar.css
   │  │  └─ ValueBar.js
   │  └─ WalletComponents
   │     ├─ BlackBar.css
   │     ├─ BlackBar.js
   │     ├─ Head.css
   │     └─ Head.js
   ├─ Features
   │  └─ User.js
   ├─ index.css
   ├─ index.js
   ├─ Pages
   │  ├─ Alert
   │  │  ├─ Alert.css
   │  │  ├─ Alert.js
   │  │  └─ alertOperations.js
   │  ├─ Education
   │  │  ├─ Education.css
   │  │  ├─ Education.js
   │  │  └─ Favorites.js
   │  ├─ ExternalWallet
   │  │  ├─ DashBoard
   │  │  │  ├─ DashBoard.css
   │  │  │  └─ DashBoard.js
   │  │  ├─ History
   │  │  │  ├─ History.js
   │  │  │  └─ History.json
   │  │  ├─ LoginPage-1
   │  │  │  ├─ ChangePassword
   │  │  │  │  ├─ ChangePassword.css
   │  │  │  │  ├─ ChangePassword.js
   │  │  │  │  └─ RecoverWallet
   │  │  │  │     ├─ RecoverWallet.css
   │  │  │  │     └─ RecoverWallet.js
   │  │  │  ├─ HaveAccount
   │  │  │  │  ├─ HaveAccount.css
   │  │  │  │  └─ HaveAccount.js
   │  │  │  ├─ LoginPage1.css
   │  │  │  ├─ LoginPage1.js
   │  │  │  └─ SetPassword
   │  │  │     ├─ SecretPhrase
   │  │  │     │  ├─ ConfirmSecretPhrase
   │  │  │     │  │  ├─ ConfirmSecretPhrase.css
   │  │  │     │  │  └─ ConfirmSecretPhrase.js
   │  │  │     │  ├─ SecretPhrase.css
   │  │  │     │  └─ SecretPhrase.js
   │  │  │     ├─ SetPassword.css
   │  │  │     └─ SetPassword.js
   │  │  └─ Welcome
   │  │     ├─ Welcome.css
   │  │     └─ Welcome.js
   │  ├─ Forum
   │  │  ├─ askQuestion.css
   │  │  ├─ AskQuestion.js
   │  │  ├─ Datatable.js
   │  │  ├─ forum.css
   │  │  ├─ Forum.js
   │  │  ├─ MyAnswers.js
   │  │  ├─ MyProblems.js
   │  │  ├─ NewPage.js
   │  │  ├─ Questionrecords.json
   │  │  └─ Questionset.js
   │  ├─ Login&Signin
   │  │  ├─ Login.css
   │  │  ├─ Login.js
   │  │  ├─ Signin.css
   │  │  └─ Signin.js
   │  ├─ News
   │  │  ├─ Favourite.js
   │  │  ├─ News.css
   │  │  └─ News.js
   │  ├─ Portfolio
   │  │  ├─ History
   │  │  │  ├─ TradingHistory.js
   │  │  │  └─ TradingHistory.json
   │  │  ├─ Portfolio.js
   │  │  └─ PortfolioWallet
   │  │     ├─ PortfolioWallet.css
   │  │     └─ PortfolioWallet.js
   │  ├─ Quiz
   │  │  ├─ Quiz.css
   │  │  └─ Quiz.js
   │  ├─ SimulateTradingPlatform
   │  │  ├─ assets.json
   │  │  ├─ TradingPlatForm.css
   │  │  └─ TradingPlatform.js
   │  ├─ Suggestions
   │  │  ├─ portfolio-data.json
   │  │  └─ Suggestions.js
   │  ├─ Summary
   │  │  ├─ dailysummary.css
   │  │  ├─ Dailysummary.js
   │  │  ├─ Monthlysummary.css
   │  │  └─ Monthlysummary.js
   │  ├─ User
   │  │  ├─ UserProfileTab.css
   │  │  ├─ UserProfileTab.js
   │  │  ├─ VerifyUser.css
   │  │  └─ VerifyUser.js
   │  └─ Watchlist
   │     ├─ AdDashboard.css
   │     ├─ AdDashboard.js
   │     ├─ Admin.css
   │     ├─ Admin.js
   │     ├─ CoinPage.css
   │     ├─ CoinPage.js
   │     ├─ CustomizeWatchlist.css
   │     ├─ CustomizeWatchlist.js
   │     ├─ Users.css
   │     ├─ Users.js
   │     ├─ ViewAll.css
   │     ├─ ViewAll.js
   │     ├─ Watchlist.css
   │     └─ Watchlist.js
   ├─ reportWebVitals.js
   ├─ Routes
   │  ├─ New.js
   │  ├─ Router.js
   │  └─ Sub-Routes
   │     ├─ EducationRoutes.js
   │     ├─ ForumRoutes.js
   │     ├─ NewsRoutes.js
   │     ├─ PortfolioRoutes.js
   │     ├─ SummaryRoutes.js
   │     ├─ WalletRoutes.js
   │     └─ WatchlistRoutes.js
   └─ setupTests.js

```