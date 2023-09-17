import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    
  },
  env: {
    username: "testuser2@test.com",
    user_password: "test1234",
  },
});
