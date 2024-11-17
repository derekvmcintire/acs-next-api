const fs = require('fs');
const { transpile } = require('postman2openapi');

const postmanCollection = require('/Users/derek/codebase/acs-next-api/public/ACSv1.collection.json');

(async () => {
  try {
    const openApi = transpile(postmanCollection); // Convert to OpenAPI

    // Write the OpenAPI JSON output
    fs.writeFileSync('/Users/derek/codebase/acs-next-api/public/openapi.json', JSON.stringify(openApi, null, 2));
    console.log('OpenAPI YAML generated at /Users/derek/codebase/acs-next-api/public/openapi.json');
  } catch (error) {
    console.error('Error converting Postman collection to OpenAPI:', error);
  }
})();
