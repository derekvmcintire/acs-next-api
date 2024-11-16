# Amature Cycling Stats

This is a demo website that is currently under development.

## Documentation

Documentation

Swagger Documentation can be found [here](http://localhost:8080/docs)

I considered several options for documentation and finally settled on using Swagger UI that uses an OpenAPI json spec. I had initially used a CLI tool to auto-generate an openapi.yaml file, but after upgrading to the NextJS App router, this no longer worked. I searched for a CLI tool that would auto-generate a .yaml file or .json I could serve to my Swagger component, but was unable to find one that worked without adding a huge amount of annotations to my code.

I was skeptical about being able to maintain proper annotations or a manual .yaml file with the complex data structures that this API returns, so I decided to use Postman to generate documentation automatically. I was already using Postman for testing my endpoints and had a well organized and described collection of all my endpoints. The only issue was that Postman does not generate documentation in the OpenAPI format, they use what they call their Collections format. They have their own UI which worked fairly well, but it didn’t look as nice or intuitive as the Swagger UI, and would not be able to be directly hosted within my NextJS app.

So I searched for a tool to convert a Postman collection to OpenAPI and found there were a few options. I settled on using Postman2OpenAPI, which is used as a javascript library. I then wrote a script so that I can execute this process from the command line when I want to update the documentation.

Although there are a number of steps involved in generating documentation, the nice thing is there is a single source of truth for the data models. You define the request shape in postman, and postman uses the actual shape of the data returned from the endpoint to generate the openapi spec. I prefer this to manually maintaining data shapes in multiple places. In the future, an improvement would be to use a tool that uses the existing typescript definitions to generate the documentation directly, but I was unable to find a tool that worked this way with the NextJS App Router. The one that was closest was `next-rest-framework` but it required significant refactoring of routes, which didn't immediately work for me and it seems like it is not widely used yet, but could be a good option in the future.

### Steps to update API Documentation

#### Step 1. Make changes to Postman ACS V1 collection
- This is the source of truth. The collection directories should not be nested more than one deep, but they should reflect the folder structure of the API. So if you have a route in `v1/results/recent/route.ts` then the collection should have a folder named `/results/recent` and in that folder are the endpoints found in that route.
- Add  semantic descriptions i.e. GET a list of recent Results or POST a new rider
- Test the requests and make sure they work
#### Step 2. Export as collection.json
- click the three dots next to the collection name
- click Export
- select “Collection v2.1”
- click Export (this will download the file onto your computer)
- rename the collection if necessary, and use `.collection.json.` It should be. `ACSv1.collection.json`
#### Step 3. Add the file to public directory
- If updating existing documentation, remove old collection.json file and replace it with the new one
- If creating new documentation, add it alongside the existing collections - `ACSv2.collection.json`
#### Step 4. Update Script if necessary
- If you are adding new documentation i.e. a new version of the API, you will need to update the script to create a new openapi.json file so it doesn’t overwrite the existing one, i.e. acsv2openapi.json. The script is located in `/scripts/convertPostmanToOpenAPI.js`
#### Step 5. Run the script
- ```node scripts/convertPostmanToOpenAPI.js```
#### Step 6. Adjust the localhost
- For now, you need to update the `localhost` in `openapi.json` to `http://localhost:8080` - We need to do this because postman is losing the local host when exporting the collection. I need to look into fixing this, possibly by using environment variables.

## Features

This API is built using

- [NextJS](https://www.nextjs.org)
- [Prisma](https://www.https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org)
- [NodeJs](https://www.nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## ACS UI

- [ACS Front End](https://github.com/derekvmcintire/acs-next)


## Getting Started

### Seeding the Database

```bash
npm run seed
# or
yarn seed
# or
pnpm seed
# or
bun seed
```

### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
