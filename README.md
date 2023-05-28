# Account App

## Capabilities
- Sign up
- Sign in
- Edit user
- View all registered users

## Worth to mention

### .env file must contain the following variables:
- DATABASE_URL
- DATABASE_SESSION_URL
- DATABASE_SESSION_SECRET
- APP_PORT

### other configuration (can be edited in ./config/config.js file):
- ./tmp - directory for temporary files (it is created during the application startup process)
- ./public/images/accounts - directory for photo files (it is created during the application startup process),
- no-photo.webp - a photo file that is used if the user has not uploaded his own
- 1024 * 1024 - max photo file size in bytes,

## Technology stack
- React
- Redux, Redux Toolkit
- NodeJs
- Experess
- MongoDB
- Other libraries