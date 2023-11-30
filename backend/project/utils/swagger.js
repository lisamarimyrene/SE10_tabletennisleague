const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Players, Matches, Auth and Refreshtoken API",
    description: "API endpoints for managing players and matches",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5005",
      description: "Local server",
    },
  ],
  paths: {
    "/api/players": {
      get: {
        tags: ["Players"],
        summary: "Get all players",
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Player",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },
    "/api/public/playerLength": {
      get: {
        tags: ["Players"],
        summary: "Get the number of players",
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "integer",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },
    "/api/players/{id}": {
      get: {
        tags: ["Players"],
        summary: "Get a player by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Player ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Player",
                },
              },
            },
          },
          404: {
            description: "Player not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },
    "api/public/getTopPlayers": {
      get: {
        tags: ["Players"],
        summary: "Get the top 5 players",
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Player",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },
    "api/players/playersRanked": {
      get: {
        tags: ["Players"],
        summary: "Get all players sorted by rank",
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Player",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },
    "/api/players/{id}": {
      patch: {
        tags: ["Players"],
        summary: "Update a player",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Player ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Player",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Player updated successfully",
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Players"],
        summary: "Delete a player",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Player ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Player deleted successfully",
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },
    "/api/players/{id}/addFavoritePlayer": {
      post: {
        tags: ["Players"],
        summary: "Add a favorite player",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Player ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  selectedPlayerId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Favorite player added successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Player",
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },
    "/api/players/{id}/removeFavoritePlayer": {
      delete: {
        tags: ["Players"],
        summary: "Remove a player from favorites",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Player ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  removePlayerId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Player removed from favorites successfully",
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },
    "/api/players/{id}/getFavoritePlayers": {
      get: {
        tags: ["Players"],
        summary: "Get favorite players of a player",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Player ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Player",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage",
                },
              },
            },
          },
        },
      },
    },

    "/api/matches": {
      get: {
        tags: ["Matches"],
        summary: "Get all matches",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Match",
                  },
                },
              },
            },
          },
          default: {
            description: "An error occurred",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/public/matchesLength": {
      get: {
        tags: ["Matches"],
        summary: "Get the total number of matches",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "integer",
                },
              },
            },
          },
          default: {
            description: "An error occurred",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/getOneMatch/{id}": {
      get: {
        tags: ["Matches"],
        summary: "Get a match by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the match",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Match",
                },
              },
            },
          },
          default: {
            description: "An error occurred",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/matches/newMatch": {
      post: {
        tags: ["Matches"],
        summary: "Create a new match",
        requestBody: {
          description: "New match data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NewMatch",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Match created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Match",
                },
              },
            },
          },
          default: {
            description: "An error occurred",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/matches/{id}/populateNewMatch": {
      post: {
        tags: ["Matches"],
        summary: "Populate a match with results",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the match",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          description: "Match results data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PopulateMatch",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Match populated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Match",
                },
              },
            },
          },
          default: {
            description: "An error occurred",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/matches/{id}": {
      patch: {
        tags: ["Matches"],
        summary: "Update a match",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the match",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          description: "Updated match data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateMatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Match updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Match",
                },
              },
            },
          },
          default: {
            description: "An error occurred",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Matches"],
        summary: "Delete a match",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the match",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Match deleted successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DeleteMatchResponse",
                },
              },
            },
          },
          default: {
            description: "An error occurred",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },

    "/api/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login user",
        produces: ["application/json"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Successful login",
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                },
              },
            },
          },
          401: {
            description: "Invalid password",
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "null",
                },
                message: {
                  type: "string",
                },
              },
            },
          },
          404: {
            description: "Player not found",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/api/refresh": {
      get: {
        tags: ["Authentication"],
        summary: "Refresh access token",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Successful token refresh",
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                },
              },
            },
          },
          404: {
            description: "Cannot find refreshToken or expire date error",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          406: {
            description: "Unauthorized",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/api/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Logout user",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Successful logout",
          },
          500: {
            description: "Internal server error",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },

    "/api/players/admin/{id}": {
      patch: {
        tags: ["Players"],
        summary: "Update a user to admin",
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
          },
        ],
        responses: {
          201: {
            description: "User role updated to admin",
            schema: {
              type: "object",
            },
          },
          400: {
            description: "Error updating user role",
          },
          500: {
            description: "Internal server error",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/api/sendEmail": {
      post: {
        tags: ["Email"],
        summary: "Send email to user with new password",
        produces: ["application/json"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                newPassword: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Email sent successfully",
          },
          500: {
            description: "Failed to send email",
          },
        },
      },
    },
    "/api/confEmail": {
      post: {
        tags: ["Email"],
        summary: "Send confirmation email",
        produces: ["application/json"],
        parameters: [
          {
            name: "req",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
          {
            name: "res",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {},
            },
          },
        ],
        responses: {
          200: {
            description: "Email sent successfully",
          },
          500: {
            description: "Failed to send the email",
          },
        },
      },
    },
    "/api/handleRefreshToken": {
      post: {
        tags: ["Authentication"],
        summary: "Handle refresh token",
        produces: ["application/json"],
        parameters: [
          {
            name: "req",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "res",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {},
            },
          },
        ],
        responses: {
          200: {
            description: "Refresh token handled successfully",
          },
          401: {
            description: "No refresh token found",
          },
          403: {
            description: "Forbidden",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Player: {
        type: "object",
        properties: {
          firstname: {
            type: "string",
            description: "First name of the player",
          },
          lastname: {
            type: "string",
            description: "Last name of the player",
          },
          username: {
            type: "string",
            description: "Username of the player",
          },
          password: {
            type: "string",
            description: "Password of the player",
          },
          email: {
            type: "string",
            description: "Email of the player",
          },
          role: {
            type: "string",
            description: "Role of the player",
            enum: ["user", "admin"],
            default: "user",
          },
          favorites: {
            type: "array",
            items: {
              type: "string",
              description: "ID of the favorite player",
            },
            default: [],
          },
          institute: {
            type: "string",
            description: "Institute of the player",
          },
          matchesWon: {
            type: "number",
            description: "Number of matches won by the player",
            default: 0,
          },
          points: {
            type: "number",
            description: "Points of the player",
            default: 0,
          },
        },
        required: [
          "firstname",
          "lastname",
          "username",
          "password",
          "email",
          "institute",
        ],
      },
      RankedPlayer: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "ID of the player",
          },
          firstname: {
            type: "string",
            description: "First name of the player",
          },
          lastname: {
            type: "string",
            description: "Last name of the player",
          },
          matchesWon: {
            type: "integer",
            description: "Number of matches won by the player",
          },
          points: {
            type: "integer",
            description: "Total points of the player",
          },
          institute: {
            type: "string",
            description: "Institute of the player",
          },
        },
      },
      UpdatePlayerRequest: {
        type: "object",
        properties: {
          firstname: {
            type: "string",
            description: "First name of the player",
          },
          lastname: {
            type: "string",
            description: "Last name of the player",
          },
          username: {
            type: "string",
            description: "Username of the player",
          },
          email: {
            type: "string",
            description: "Email of the player",
          },
          password: {
            type: "string",
            description: "Password of the player",
          },
          institute: {
            type: "string",
            description: "Institute of the player",
          },
        },
      },
      UpdatePlayerResponse: {
        type: "object",
        properties: {
          n: {
            type: "integer",
            description: "The number of documents matched",
          },
          nModified: {
            type: "integer",
            description: "The number of documents modified",
          },
          ok: {
            type: "integer",
            description: "The operation status",
          },
        },
      },
      DeletePlayerResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "The deletion message",
          },
          removePlayer: {
            type: "object",
            description: "The removed player details",
          },
        },
      },
      AddFavoriteRequest: {
        type: "object",
        properties: {
          playerId: {
            type: "string",
            description: "ID of the logged-in player",
          },
          addPlayerId: {
            type: "string",
            description: "ID of the player to add to favorites",
          },
        },
      },

      Match: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "The ID of the match",
          },
          players: {
            type: "object",
            properties: {
              player1: {
                type: "string",
                description: "ID of player 1",
              },
              player2: {
                type: "string",
                description: "ID of player 2",
              },
            },
            required: ["player1", "player2"],
          },
          date: {
            type: "string",
            format: "date",
            description: "The date the match took place (YYYY-MM-DD)",
          },
          timestamps: {
            type: "object",
            properties: {
              startTime: {
                type: "string",
                description: "Start time of the match",
              },
              endTime: {
                type: "string",
                description: "End time of the match",
              },
            },
            required: ["startTime", "endTime"],
          },
          duration: {
            type: "string",
            description: "Duration of the match",
          },
          setResults: {
            type: "array",
            items: {
              type: "object",
              properties: {
                setNumber: {
                  type: "number",
                  description: "Set number",
                },
                scorePlayer1: {
                  type: "number",
                  description: "Score of player 1 in the set",
                },
                scorePlayer2: {
                  type: "number",
                  description: "Score of player 2 in the set",
                },
              },
            },
            description: "Results of each set",
          },
          player1Sets: {
            type: "number",
            description: "Number of sets won by player 1",
          },
          player2Sets: {
            type: "number",
            description: "Number of sets won by player 2",
          },
          overallPoints: {
            type: "string",
            description: "Overall points of the match",
          },
          winner: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                description: "ID of the winning player",
              },
              firstname: {
                type: "string",
                description: "First name of the winning player",
              },
              lastname: {
                type: "string",
                description: "Last name of the winning player",
              },
              institute: {
                type: "string",
                description: "Institute of the winning player",
              },
              matchesWon: {
                type: "number",
                description: "Number of matches won by the player",
              },
              points: {
                type: "number",
                description: "Points of the winning player",
              },
            },
            description: "Winner of the match",
          },
        },
      },
      NewMatch: {
        type: "object",
        properties: {
          players: {
            type: "object",
            properties: {
              player1: {
                type: "string",
                description: "ID of player 1",
              },
              player2: {
                type: "string",
                description: "ID of player 2",
              },
            },
            required: ["player1", "player2"],
          },
          date: {
            type: "string",
            format: "date",
            description: "The date the match took place (YYYY-MM-DD)",
          },
        },
        required: ["players", "date"],
      },
      Player: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          firstname: {
            type: "string",
          },
          lastname: {
            type: "string",
          },
          username: {
            type: "string",
          },
        },
      },
      SetResult: {
        type: "object",
        properties: {
          player1Points: {
            type: "integer",
          },
          player2Points: {
            type: "integer",
          },
        },
      },
      PopulateMatch: {
        type: "object",
        properties: {
          winner: {
            type: "string",
          },
          players: {
            type: "object",
            properties: {
              player1: {
                type: "string",
              },
              player2: {
                type: "string",
              },
            },
          },
          timestamps: {
            type: "object",
            properties: {
              startTime: {
                type: "string",
                format: "date-time",
              },
              endTime: {
                type: "string",
                format: "date-time",
              },
            },
          },
          duration: {
            type: "number",
          },
          setResults: {
            type: "array",
            items: {
              $ref: "#/components/schemas/SetResult",
            },
          },
          player1Sets: {
            type: "integer",
          },
          player2Sets: {
            type: "integer",
          },
          overallPoints: {
            type: "string",
          },
          finished: {
            type: "boolean",
          },
        },
        required: [
          "winner",
          "players",
          "timestamps",
          "duration",
          "setResults",
          "player1Sets",
          "player2Sets",
          "overallPoints",
          "finished",
        ],
      },
      UpdateMatch: {
        type: "object",
        properties: {
          players: {
            type: "object",
            properties: {
              player1: {
                type: "string",
                description: "ID of player 1",
              },
              player2: {
                type: "string",
                description: "ID of player 2",
              },
            },
          },
          date: {
            type: "string",
            format: "date",
            description: "The date the match took place (YYYY-MM-DD)",
          },
          timestamps: {
            type: "object",
            properties: {
              startTime: {
                type: "string",
                description: "Start time of the match",
              },
              endTime: {
                type: "string",
                description: "End time of the match",
              },
            },
          },
          duration: {
            type: "string",
            description: "Duration of the match",
          },
          setResults: {
            type: "array",
            items: {
              type: "object",
              properties: {
                setNumber: {
                  type: "number",
                  description: "Set number",
                },
                scorePlayer1: {
                  type: "number",
                  description: "Score of player 1 in the set",
                },
                scorePlayer2: {
                  type: "number",
                  description: "Score of player 2 in the set",
                },
              },
            },
            description: "Results of each set",
          },
          player1Sets: {
            type: "number",
            description: "Number of sets won by player 1",
          },
          player2Sets: {
            type: "number",
            description: "Number of sets won by player 2",
          },
          overallPoints: {
            type: "string",
            description: "Overall points of the match",
          },
          winner: {
            type: "string",
            description: "ID of the winning player",
          },
        },
      },
      DeleteMatch: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Delete match success message",
          },
        },
      },
      ErrorMessage: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
