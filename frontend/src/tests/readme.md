# Testing principles 

## 1 Unit Testing
- Show code snippets of unit tests for individual functions or components. For example, a unit test for a "addTask" function that adds a task to the list.
- Explain how these tests verify the correctness of small, isolated units of code.

## 2 Integration Testing
- Showcase code snippets or describe integration tests for interactions between different parts of the application. For instance, an integration test for checking if a task is marked as done when the user clicks a checkbox.
- Discuss how these tests ensure that different components work together correctly.

## 3 End-to-End Testing
- Describe your end-to-end testing approach using a tool like Cypress. Show a script or code snippets that automate user interactions with your application.
- Explain how end-to-end tests simulate real user behavior and help catch issues across the entire application.

## Resilience to Change
Mention that you designed your tests to be resilient to code changes. If you make a code change, your tests should guide you in making the necessary adjustments to ensure the application still works correctly.

## Testable Code Principles:
Explain how you applied principles like using pure functions and dependency injection to make your code more testable. For example, show a component that receives data as a prop, making it easy to test with different data sets.

## Test-Driven Development (TDD):
If you used TDD, describe how you wrote tests before writing the actual code. Provide an example where you wrote a failing test first, implemented the code to make the test pass, and then improved the code as needed.