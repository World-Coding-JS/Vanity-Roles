# Vanity Roles Bot

Vanity Roles is a Discord bot that allows users to receive specific roles on the server based on their set vanity status. When a user sets a certain status, the bot automatically assigns the corresponding role.

## Features
- Automatic role assignment based on user status
- Logging of role changes in a designated channel
- Flexible configuration

## How does it work?
1. A user sets their Discord status, for example: `/worldcoding`
2. The bot detects the status and assigns the corresponding role (e.g., `Support`)
3. All changes are logged in the specified channel

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/World-Coding-JS/Vanity-Roles.git
   cd vanity-roles
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

4. Run the bot:
   ```sh
   node index.js
   ```

## Configuration
- Define which statuses the bot should track and which roles to assign in `index.js`.
- Ensure the bot has the necessary permissions to assign roles and read user statuses.

## Developer
- **Developer:** jovan.je
- **Discord User ID:** 1196602587554779146

## Join the server
Join our Discord server: [Vanity Roles Server](https://discord.gg/VNBVhWunav)

## License
This project is open-source and can be used and modified as needed.

