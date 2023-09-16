<img src="/public\GamerTalkWideLogo.png" alt="Header" title="Header" width="1200">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) ![GitHub last updated (branch)](https://img.shields.io/github/last-commit/GamerTalk/Frontend/main) ![GitHub issues](https://img.shields.io/github/issues/GamerTalk/Frontend) 


## Description

This is the frontend server of the project GamerTalk. For the Backend, click <a href="https://github.com/GamerTalk/Backend">here</a>

GamerTalk is an application that allows gamers to connect with each other with the goal of building connections and offering language exchange opportunities.

Deployment: https://gamertalk.onrender.com/

<p align="center"><img src="/public\demo_video.gif"  width="600"></p>

## Table of Contents

- [Tech Stack - Frontend](#tech-stack---frontend)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack - Frontend

| Task       | Tech        |
| ---------- | ----------- |
| Language  | ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)  |
| Framework  | ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)    |
|  User Auth <br>Messages <br>Photo Storage  | ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) |

Click [here](https://github.com/GamerTalk/Backend#tech-stack---backend) for the Backend Tech Stack.



## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GamerTalk/Frontend.git

   ```

2. Install dependencies:
    
    ```bash
    
    npm install 
    
    ```

3. This application uses Firebase for authentication and to store users chat history. Please create a `.env` file and use the `.env.example` file to see what variables are required.
    

## Usage

1. Start the development server:

    ```bash
    
    npm run dev
    
    ```
    
2. Open your browser and go to **`http://localhost:3000/`** to access the application.

## Running Test
There are two ways to run cypress test: in the terminal, and in the browser. The terminal may be quicker and not require a login. The browser gives you step by step results from each step in your test but requires a login through cypress which can be done with your Github account.

For all test, they are saved in the `/cypress/e2e` folder as `[name].cy.js` files. If you have used Chai, it might look very familiar.

Note: All test require that you are running the dev server on your local machine.

### Terminal testing
To run the cypres test in the brower simply run the following command

```bash
npx cypress run
```

This will run all test in the `/cypress/e2e` folder. This will also record a video of the test so you can check what, if anything, failed. These videos will be saved in the `/cypress/videos` folder.

### Browser testing

To run test in the browser, run the following command in the terminal:

```bash
npm run cypress:open
```

This may take a while on your first time.

After it loads, a window will appear. This window will ask you to sign in and then allow you to create and run test. 

Once you are signed in, click the button labeled `E2E testing` and select the browser you want to use (I recommend Chrome for its developer tools). This will load a version of your selected browsers to run the test.

To locate your test, select the `Specs` page on the left-side of the screen. From this page, you can select on of the test from the page, which will run that test live, with a preview window for you to observe, as well as showing which test pass or fail.

## Writing test
To write test using cypress, you can either create the `~.cy.js` file in the `/cypress/e2e` folder directly, or preferably create it through the browser version. 

First, login through the same process as in `Browser testing` and then in the `Specs` window, select `new spec`. Title it and it should appear in your code editor in the `/cypress/e2e` folder.

## **Contributing**

Contributions are welcome! Please follow these steps to contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request with a clear description of your changes.

## **License**

MIT License

Copyright © 2023 GamerTalk

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

