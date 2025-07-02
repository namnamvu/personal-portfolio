// import 'dotenv/config';
// import Contact from './models/Contact.js';
 

// async function testCreateContact() {
//   const testContact = {
//     name: 'Test User',
//     email: 'test@example.com',
//     subject: 'Test Subject',
//     message: 'This is a test message'
//   };

//   let result; // Declare result here so it's available in finally

//   try {
//     console.log('⏳ Running test...');
//     result = await Contact.create(testContact);
    
//     console.log('✔️ Returned data:', result);
    
//     // Verify the result
//     if (!result?.contact_id) throw new Error('Missing contact_id in result');
//     console.log('✅ Test passed!');
    
//   } catch (error) {
//     console.error('❌ Test failed:', error.message);
//   } finally {
//     // Cleanup if needed
//     if (result?.id) {
//       console.log('🧹 Cleaning up test data...');
//       // Add your cleanup code here if needed
//     }
//     console.log('🏁 Test completed');
//   }
// }

// // Run the test
// await testCreateContact();