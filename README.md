Pet adoption app from [Brian Holt's Intro to React v5](https://btholt.github.io/complete-intro-to-react-v5/). 
- Uses the @frontendmasters pet API client to request data from [Petfinders.com](https://www.petfinder.com/)
- Locations are limited to Seattle, WA and San Francisco, CA

# Usage
To open at [localhost:1234](http://localhost:1234):
```
cd pet-adoption
npm install
npm run dev
```
To use mock data for offline mode:
```
npm run dev:mock
```

# Notes
- Didn't deploy to gh-pages due to HTTPS enforcment (@frontendmasters/pet uses HTTP)
- [Parcel build issue](https://github.com/parcel-bundler/parcel/issues/505)
- [Potential deployment problem with Reach Router](https://github.com/facebook/create-react-app/issues/1765#issuecomment-285114194)




