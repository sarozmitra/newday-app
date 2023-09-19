# Use an official Node.js runtime as the base image
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app
# # Copy package.json and package-lock.json to the container
# COPY ../package.json /.codesandbox

# Install application dependencies
RUN yarn install

# If you have global dependencies, install them here

# Copy the rest of the application code into the container
COPY . .

# Build the application if necessary
# RUN npm run build (uncomment if you have a build script)

# Use the cypress included image
FROM cypress/included:13.2.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Expose the port the app will run on
EXPOSE 3000

# The command to run the application
CMD ["npm", "start"]
