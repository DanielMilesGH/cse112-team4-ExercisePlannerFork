/// <reference types="cypress" />

// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

function login() {
  cy.get('input[name="login-username"]').type('e2e_usJDJWAuTPEyOOutbZbs');
  cy.get('button#login-button').click();
  // alert gets handled
}
describe('basic UI tests', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    // cy.visit('https://example.cypress.io/todo')
    cy.visit('http://127.0.0.1:5500/index.html')
  })
  it('can register successfully', (done) => {
    // exception handling
    cy.on('uncaught:exception', (err, runnable) => {
      done()
      return false
    })

    // making sure that the required alert gets thrown 
    cy.on('window:alert',(t)=>{
      //assertions
      expect(t).to.contains('Login successful!');
   })

    
    const usernameToType = 'username';
    const emailToType = 'user@email.com';
    const passwordToType = 'password';
    cy.get('a#create-account').click();
    cy.get('input[name="register-username"]').type(usernameToType)
    cy.get('input[name="register-email"]').type(emailToType)
    cy.get('input[name="register-password"]').type(passwordToType)

    cy.get('button#create-account-button').click();
    cy.get('input[name="login-username"]').type(usernameToType)
    cy.get('input[name="login-email"]').type(emailToType)
    cy.get('input[name="login-password"]').type(passwordToType)

    cy.get('button#login-button').click();
  })
  
  it("user that DNE can't login", (done) => {
    // exception handling
    cy.on('uncaught:exception', (err, runnable) => {
      done()
      return false
    })

    // making sure that the required alert gets thrown 
    cy.on('window:alert',(t)=>{
      //assertions
      expect(t).to.contains('No account found with this email.');
    })
    const usernameToType = 'username';
    const emailToType = 'user@email.com';
    const passwordToType = 'password';
    cy.get('input[name="login-username"]').type(usernameToType)
    cy.get('input[name="login-email"]').type(emailToType)
    cy.get('input[name="login-password"]').type(passwordToType)
    cy.get('button#login-button').click();
  })

  it('starts with no cards scheduled', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    cy.get('#scheduled-container > h3')      
      .should('contain', 'Scheduled')     // Ensure it contains "Scheduled"
      .should('have.length', 1)          // Ensure there's only one <h3>

  })

  it('starts with no cards completed', () => {
    cy.get('#completed-container >h3')
      .should('contain', 'Completed')
      .should('have.length', 1)
  })

  
  it('+ button successfully adds card', () => {
    login();
    cy.get('#fixed-add-button').click()

    cy.get('#scheduled-container > h3')      
      .get('exercise-card').should('exist')     // Ensure it contains a card
  })
  
  it('reload persistence', () => {
    login();
    cy.get('#fixed-add-button').click()

    const textToType = 'This is a test note';
    const caloriesBurned = '100'
    const setsCompleted = '5'
    const duration = '10'
  
    // locate textarea of new exercise card and type into it
    cy.get('textarea[name="notes"]').type(textToType);
    // Verify that the text was typed into the textarea
    cy.get('textarea[name="notes"]').should('have.value', textToType);
    
    // locate calories burned and type into it
    cy.get('input[name="calories"]').type(caloriesBurned);
    // verify it got typed
    cy.get('input[name="calories"]').should('have.value', caloriesBurned);  

    // locate sets completed and type into it 
    cy.get('input[name="sets"]').type(setsCompleted);
    // verify it got typed 
    cy.get('input[name="sets"]').should('have.value', setsCompleted);

    // locate duration and type into it
    cy.get('input[name="duration"]').type(duration);
    // verify it got typed 
    cy.get('input[name="duration"]').should('have.value', duration);

    // hit save
    cy.get('button.save-button').click();

    
    
    // Check localStorage for the expected value
    cy.window().then((window) => {
      // Expected properties to be stored in localStorage
      const expectedData = {
        sets: setsCompleted,
        duration: duration,
        notes: textToType
      };
      let found=false;
      const value = window.localStorage.getItem('exerciseCardData'); // first card always 0
      const parsedJson = JSON.parse(value);
      const parsedCard = parsedJson[0];
      if (parsedCard.sets === expectedData.sets &&
        parsedCard.duration === expectedData.duration &&
        parsedCard.notes === expectedData.notes) 
        {
        found = true;
      }
      // check if we found it
      expect(found).to.be.true;
    });
    cy.reload();
    // after reload, check everything still there
    cy.get('input[name="calories"]').should('have.value', caloriesBurned);  
    cy.get('input[name="sets"]').should('have.value', setsCompleted);
    cy.get('input[name="duration"]').should('have.value', duration);
    // and check if its still in local storage   
    cy.window().then((window) => {
      // Expected properties to be stored in localStorage
      const expectedData = {
        sets: setsCompleted,
        duration: duration,
        notes: textToType
      };
      let found=false;
      const value = window.localStorage.getItem('exerciseCardData'); // first card always 0
      const parsedJson = JSON.parse(value);
      const parsedCard = parsedJson[0];
      if (parsedCard.sets === expectedData.sets &&
        parsedCard.duration === expectedData.duration &&
        parsedCard.notes === expectedData.notes) 
        {
        found = true;
      }
      // check if we found it
      expect(found).to.be.true;
    }); 
  });
});